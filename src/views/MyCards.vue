<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <!-- <ion-title>{{ $route.params.id }}</ion-title> -->
        <ion-title>Mes cartes</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div id="container" class="background-color-black">
        <header class="questons-answers-toggle">
          <button
            v-bind:class="{ underlined: carousselItem === 'questions' }"
            @click="toggleQuestionAnswer('questions')"
          >
            Questions
          </button>
          <button
            v-bind:class="{ underlined: carousselItem === 'answers' }"
            @click="toggleQuestionAnswer('answers')"
          >
            Réponses
          </button>
        </header>
        <ConfirmPopup
          v-if="showConfirmPopup"
          :confirmText="confirmPopupText"
          :data="itemToDeleteInfos"
          v-on:confirmed-action="confirmDelete($event)"
          v-on:canceled-action="cancelDelete($event)"
        />

        <Caroussel
          :noItemsMessage="carousselNoItemsMessage"
          :items="carousselItems"
          v-on:edit-caroussel-item="displayEditFormPopup($event)"
        />
        <AnswerEditFormPopup
          v-if="editFormShouldShow && carousselItem === 'answers'"
          v-on:close-edit-form="closeEditForm"
          v-on:updated="answerWasUpdated($event)"
          v-on:delete-item="deleteItem($event)"
          :answer="answerToEdit"
        />
        <QuestionEditFormPopup
          v-if="editFormShouldShow && carousselItem === 'questions'"
          v-on:close-edit-form="closeEditForm"
          v-on:updated="questionWasUpdated($event)"
          v-on:delete-item="deleteItem($event)"
          :question="questionToEdit"
        />
        <div v-if="carousselItem === 'questions'" class="new-answer-ctnr">
          <h2>Créer une question</h2>
          <form @submit.prevent>
            <div class="new-question-textarea">
              <p>
                <span v-for="(part, i) in newQuestionParts" :key="i">{{
                  part.text
                }}</span>
              </p>
              <div class="new-question-text-input-ctnr">
                <input
                  type="text"
                  class="new-question-input"
                  v-model="newQuestionPartText"
                />
                <button @click="addPartInQuestion">
                  <ion-icon
                    :ios="checkmarkOutline"
                    :md="checkmarkOutline"
                  ></ion-icon>
                </button>
                <button @click="removePartInQuestion">
                  <ion-icon :ios="closeOutline" :md="closeOutline"></ion-icon>
                </button>
              </div>
            </div>
          </form>
          <button
            class="custom-btn empty-btn new-question-submit-btn"
            @click="onNewQuestionSubmit"
          >
            Envoyer
          </button>
        </div>
        <div v-else class="new-answer-ctnr">
          <h2>Créer une réponse</h2>
          <form @submit.prevent="onNewAnswerSubmit">
            <textarea
              name="new-answer-textarea"
              v-model="newAnswerCard.text"
              id="new-answer-textarea"
            >
            </textarea>
            <input
              class="custom-btn empty-btn new-question-submit-btn"
              type="submit"
              value="Envoyer"
            />
          </form>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="js">
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon
} from "@ionic/vue";
import { closeOutline, checkmarkOutline } from "ionicons/icons";

import Caroussel from "../components/Caroussel";
import QuestionEditFormPopup from "../components/QuestionEditFormPopup";
import AnswerEditFormPopup from "../components/AnswerEditFormPopup";
import ConfirmPopup from "../components/ConfirmPopup";


import Answer from '../models/Answer';
import Question from '../models/Question';

import { ADD_PART_IN_QUESTION, REMOVE_PART_IN_QUESTION } from '../services/question';

export default {
  name: "MyCards",
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    Caroussel,
    AnswerEditFormPopup,
    QuestionEditFormPopup,
    ConfirmPopup,
    IonIcon
  },
  setup() {
    return {
      closeOutline,
      checkmarkOutline
    };
  },
  data() {
    return {
      pageTitle: "Connexion",
      carousselItem: "answers",
      carousselItems: [],
      carousselNoItemsMessage: "Allez, crée des nouvelles cartes ! On va rire.",
      editFormShouldShow: false,
      answerToEdit: {},
      questionToEdit : {},
      newAnswerCard: {text: ""},
      newQuestionParts:[],
      newQuestionPartText: "",
      numberOfSpaces: 0,
      questions: [],
      answers : [],
      firstTimeLoaded: false,
      confirmPopupText: "En suprimant ou en éditant cette carte, elle perdra ses likes ! Tu es sûr de vouloir poursuivre ?",
      showConfirmPopup: false,
      itemToDeleteInfos: {}
    };
  },

  mounted() {
    const answerManager = new Answer();
    answerManager.read().then(answers => {
      this.answers = answers;
      this.carousselItems = this.answers;
    });
  },

  methods: {
    toggleQuestionAnswer(carousselItem) {
      this.carousselItem = carousselItem;
      this.carousselItems = carousselItem === "questions" ? this.questions : this.answers;

      if(!this.firstTimeLoaded) {
        const questionManager = new Question();
        questionManager.read().then(questions => {
          this.questions = questions;
          this.carousselItems = this.questions;
          this.firstTimeLoaded = true;
        });
      } 
    },
    displayEditFormPopup($evt) {
      this.carousselItem === "questions" ? this.questionToEdit = $evt : this.answerToEdit = $evt;
      this.editFormShouldShow = true;
    },
    closeEditForm(){
       window.setTimeout(() => {
          this.editFormShouldShow = false;
        }, 1000);
    
    },
    answerWasUpdated($evt) {
      const answerManager = new Answer();
      answerManager.update($evt.id, $evt.text).then(() => {
        this.answers[$evt.index].text = $evt.text;
        this.carousselItems[$evt.index].text = $evt.text;
        window.setTimeout(() => {
          this.editFormShouldShow = false;
        }, 1000);      });
    },
    questionWasUpdated($evt) {
      const questionManager = new Question();
      questionManager.update($evt.id, $evt.text).then(() => {
        this.questions[$evt.index].text = $evt.text;
        this.carousselItems[$evt.index].text = $evt.text;
        window.setTimeout(() => {
          this.editFormShouldShow = false;
        }, 1000);
      });
    },
    addPartInQuestion() {
      [this.newQuestionParts, this.newQuestionPartText, this.numberOfSpaces] = ADD_PART_IN_QUESTION(this.newQuestionParts, this.newQuestionPartText, this.numberOfSpaces);
     
    },
    removePartInQuestion() {
      [this.newQuestionParts, this.newQuestionPartText, this.numberOfSpaces] = REMOVE_PART_IN_QUESTION(this.newQuestionParts, this.newQuestionPartText, this.numberOfSpaces);
    },
    onNewQuestionSubmit() {
      const text = this.newQuestionParts.map(part => part.text).join(" ");
      const question = new Question();
      question.create(text);
      this.questions.push({text});
      this.newQuestionParts = [];
    }, 
    onNewAnswerSubmit() {
      const text = this.newAnswerCard.text;
      const answer = new Answer();
      answer.create(text);
      this.answers.push({text});
      this.newAnswerCard.text = "";
    },

    deleteItem({id, index}) {
      this.itemToDeleteIndex = index;
      this.itemToDeleteInfos = {id, index};
      this.showConfirmPopup = true;
    },

    confirmDelete() {
      const manager = this.carousselItem === "questions" ? new Question(): new Answer();
      
      manager.delete(this.itemToDeleteInfos.id).then(() => {
        console.log(this.itemToDeleteInfos);
        this[this.carousselItem].splice(this.itemToDeleteInfos.index, 1);
      });

      this.itemToDeleteId = 0;
      this.itemToDeleteIndex = -1;
      window.setTimeout(() => {
        this.showConfirmPopup = false;
        this.editFormShouldShow = false;
      }, 1000);
    },

    cancelDelete() {
      this.itemToDeleteId = 0;
      this.itemToDeleteIndex = -1;
      window.setTimeout(() => {
        this.showConfirmPopup = false;
      }, 1000);
    }
  }
};
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 45px;
  min-height: 100vh;
}

.questons-answers-toggle {
  display: flex;
}

.questons-answers-toggle > button {
  width: 50%;
  box-sizing: border-box;
  padding: 25px 0 10px 0;
  text-align: center;
  border: none;
  background-color: transparent;
  color: var(--custom-pale-yellow);
  font-size: 20px;
}

.questons-answers-toggle > button.underlined {
  border-bottom: 2px solid var(--custom-yellow);
}

.background-color-black {
  background-color: var(--custom-black);
}

.new-answer-ctnr > h2 {
  padding-top: 30px;
  width: 70vw;
  margin: 40px auto;
  /* border-top: 2px solid var(--custom-yellow); */
  color: var(--custom-yellow);
}

.new-answer-ctnr textarea,
.new-question-textarea {
  display: flex;
  margin: 20px auto;
  color: var(--custom-black);
  width: 70vw;
  height: 100vw;
  border-radius: 8px;
  box-shadow: 1px 1px 4px var(--custom-yellow);
  resize: none;
  background-color: var(--custom-yellow);
  box-sizing: border-box;
  padding: 30px;
  font-size: 27px;
  text-align: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.new-question-textarea p {
  width: 100%
}

.new-question-text-input-ctnr {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}

.new-question-text-input-ctnr input {
  background-color: transparent;
  width: 80%;
  border: 2px solid var(--custom-black);
  border-radius: 6px;
  height: 30px;
}

.new-question-text-input-ctnr button {
  background-color: transparent;
  color: var(--custom-black);
}

.new-question-submit-btn {
  color: var(--custom-yellow);
}
</style>