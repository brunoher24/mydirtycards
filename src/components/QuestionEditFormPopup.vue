<template>
  <div class="edit-card-form-ctnr">
    <form @submit.prevent v-if="questionToEditParts" v-bind:class="{ appear, disappear: !appear  }">
      <button class="close-form-btn" @click="closeEditForm">
        <ion-icon :ios="closeCircleOutline" :md="closeCircleOutline"></ion-icon>
      </button>
      <div class="question-to-edit-textarea">
        <p>
          <span v-for="(part, i) in questionToEditParts" :key="i">{{
            part.text
          }}</span>
        </p>
        <div class="edit-question-text-input-ctnr">
            <input
              type="text"
              class="edit-question-input"
              v-model="questionToEditPartText"
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
    @click="onSubmit" 
    class="custom-btn submit-input"
    v-bind:class="{ appear, disappear: !appear  }">Modifier</button>
    <button 
    class="custom-btn delete-btn" 
    @click="deleteItem"
    v-bind:class="{ appear, disappear: !appear  }"
    >Supprimer</button>
  </div>
</template>

<script>
import { closeCircleOutline, closeOutline, checkmarkOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/vue";

import { SPLIT_QUESTION_IN_PARTS, ADD_PART_IN_QUESTION, REMOVE_PART_IN_QUESTION } from '../services/question';


export default {
  name: "QuestionEditFormPopup",

  components: {
    IonIcon,
  },
  setup() {
    return {
      closeCircleOutline,
      closeOutline,
      checkmarkOutline
    };
  },
  mounted() {
   [this.questionToEditParts, this.numberOfSpaces] = SPLIT_QUESTION_IN_PARTS(this.question.text);
   this.appear = true;
  },
  props: ["question"],
  // watch: {
  //   answer(obj){
  //     console.log(obj);
  //     this.answerToEdit = {...obj};
  //   }
  // },

  data() {
    return {
      formShouldClose: false,
      questionToEditParts:[],
      questionToEditPartText: "",
      numberOfSpaces: 0,
      appear: true
    };
  },

  methods: {
    addPartInQuestion() {
      [this.questionToEditParts, this.questionToEditPartText, this.numberOfSpaces] = ADD_PART_IN_QUESTION(this.questionToEditParts, this.questionToEditPartText, this.numberOfSpaces);
    },
    removePartInQuestion() {
      [this.questionToEditParts, this.questionToEditPartText, this.numberOfSpaces] = REMOVE_PART_IN_QUESTION(this.questionToEditParts, this.questionToEditPartText, this.numberOfSpaces);
      console.log(this.questionToEditParts);
    },
    onSubmit() {
      this.appear = false;
      this.$emit("updated", {
        text: this.questionToEditParts.map(part=>part.text).join(" "), 
        id: this.question.id, 
        index: this.question.index
      });
    },
     deleteItem() {
       this.appear = false;
      this.$emit("deleteItem", {
        id: this.question.id, 
        index: this.question.index
      });
    },
    closeEditForm() {
      this.appear = false;
      this.$emit("closeEditForm");
    },
  },
};
</script>

<style scoped>
.edit-card-form-ctnr {
    position: fixed;
    z-index: 5;
    width: 100%;
    height: 100vh;
    left: 0;
    top: 0;
}

.edit-card-form-ctnr > form {
    padding: 20px 0;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 390px;
    border-top-left-radius: 25px;
    background-color: var(--custom-pale-yellow);
    z-index: 2;
    color: var(--custom-black);
    box-shadow: 1px 1px 4px var(--custom-pale-yellow);
    border-top-right-radius: 25px;
}

.appear {
   -webkit-animation: bottom-appear-translation linear 0.4s;
    animation: bottom-appear-translation linear 0.4s;
}

.disappear {
   -webkit-animation: bottom-disappear-translation 0.4s linear forwards;
    animation: bottom-disappear-translation 0.4s linear forwards;
}

.close-form-btn {
  background-color: transparent;
  color: var(--custom-red);
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 20px;
}

.question-to-edit-textarea {
  display: block;
  margin: 20px auto;
  color: var(--custom-yellow);
  width: 90%;
  border: 2px solid var(--custom-yellow);
  border-radius: 8px;
  box-shadow: 1px 1px 4px var(--custom-yellow);
  background-color: var(--custom-black);
  box-sizing: border-box;
  padding: 15px;
  font-size: 15px;
  text-align: center;
  height: 65%;
}

.edit-question-text-input-ctnr {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}

.edit-question-text-input-ctnr input {
  background-color: transparent;
  width: 80%;
  border: 2px solid var(--custom-yellow);
  border-radius: 6px;
  height: 30px;
}

.edit-question-text-input-ctnr button {
  background-color: transparent;
  color: var(--custom-yellow);
}

.submit-input {
  background-color: var(--custom-black);
  color: var(--custom-yellow);
  box-shadow: 1px 1px 4px var(--custom-black);
  position: absolute;
  bottom: 45px;
  left: 5%;
  z-index: 2;
}

.delete-btn {
  background-color: var(--custom-red);
  color: white;
  box-shadow: 1px 1px 4px var(--custom-red);
  position: absolute;
  bottom: -10px;
  left: 5%;
  z-index: 2;
}

.error-msg {
  color: var(--custom-red);
  font-weight: bolder;
  font-size: 12px;
}
</style>