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
          <button v-bind:class="{ underlined: carousselItem === 'questions' }" @click="toggleQuestionAnswer('questions')">Questions</button>
          <button v-bind:class="{ underlined: carousselItem === 'answers' }" @click="toggleQuestionAnswer('answers')">Réponses</button>
        </header>
        <Caroussel :items="carousselItems"  v-on:edit-caroussel-item="displayCarousselItem($event)"/>
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
} from "@ionic/vue";

import Caroussel from "../components/Caroussel";
import { CONVERT_QUESTION_PARTS_IN_TEXT } from "../services/helpers";

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
    Caroussel
  },
  data() {
    return {
      pageTitle: "Connexion",
      carousselItem: "answers",
      carousselItems: [],
      questions: [
        {part1: "Contre le mal de crâne rien de tel que"},
        {part1: "L'avantage de travailler dans une maternelle c'est", part2: "et"},
        {part2: " ... c'est pour ça que les noirs nous en veulent !"},
         {part1: "Contre le mal de crâne rien de tel que"},
        {part1: "L'avantage de travailler dans une maternelle c'est", part2: "et"},
        {part2: " ... c'est pour ça que les noirs nous en veulent !"},
         {part1: "Contre le mal de crâne rien de tel que"},
        {part1: "L'avantage de travailler dans une maternelle c'est", part2: "et"},
        {part2: " ... c'est pour ça que les noirs nous en veulent !"},
         {part1: "Contre le mal de crâne rien de tel que"},
        {part1: "L'avantage de travailler dans une maternelle c'est", part2: "et"},
        {part2: " ... c'est pour ça que les noirs nous en veulent !"},
         {part1: "Contre le mal de crâne rien de tel que"},
        {part1: "L'avantage de travailler dans une maternelle c'est", part2: "et"},
        {part2: " ... c'est pour ça que les noirs nous en veulent !"}
      ],
      answers : [
        {text: "Un zizi oreille"},
        {text: "ma bite"},
        {text: "une sodomie suprise"},
        {text: "quand tu crois que tu vas juste péter et quand tu t'aperçois que tu vas chier, t'as déjà chié"}
      ]
    };
  },

  mounted() {
    this.carousselItems = this.answers;
  },

  methods: {
    toggleQuestionAnswer(carousselItem) {
      this.carousselItem = carousselItem;
      this.carousselItems = carousselItem === "questions" ? this.questions.map(question => CONVERT_QUESTION_PARTS_IN_TEXT(question)) : this.answers;
    },
    displayCarousselItem($event) {
      console.log($event);
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
</style>