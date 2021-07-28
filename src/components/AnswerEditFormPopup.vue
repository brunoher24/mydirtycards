<template>
  <div class="edit-card-form-ctnr">
    <form @submit.prevent="onSubmit" v-if="answerToEdit" v-bind:class="{ appear, disappear: !appear  }">
      <button class="close-form-btn" @click="closeEditForm">
        <ion-icon :ios="closeCircleOutline" :md="closeCircleOutline"></ion-icon>
      </button>
      <div class="edit-card-form-field">
        <textarea
          name="text-textarea"
          v-model="answerToEdit.text"
          id="text-textarea"
          class="edit-textarea"
        >
        </textarea>
        <div
          v-if="answerToEdit.text && answerToEdit.text.trim().length > 110"
          class="input-subtitle error-msg"
        >
          C'est trop long ! (titre)
        </div>
        <div
          v-if="answerToEdit.text && answerToEdit.text.trim().length < 5"
          class="input-subtitle error-msg"
        >
          C'est trop court ! (comme ta ...)
        </div>
      </div>

      <input class="custom-btn submit-input" type="submit" value="Modifier" />
    </form>
    <button v-bind:class="{ appear, disappear: !appear  }" class="custom-btn delete-btn" @click="deleteItem">Supprimer</button>

  </div>
</template>

<script>
import { closeCircleOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/vue";

export default {
  name: "AnswerEditFormPopup",

  components: {
    IonIcon,
  },
  setup() {
    return {
      closeCircleOutline,
    };
  },
  mounted() {
    this.answerToEdit = { ...this.answer };
  },
  props: ["answer"],
  // watch: {
  //   answer(obj){
  //     console.log(obj);
  //     this.answerToEdit = {...obj};
  //   }
  // },

  data() {
    return {
      formShouldClose: false,
      answerToEdit: {},
      appear: true
    };
  },

  methods: {
    onSubmit() {
      this.appear = false;
      this.$emit("updated", this.answerToEdit);
    },
    deleteItem() {
      this.appear = false;
      this.$emit("deleteItem", {id: this.answerToEdit.id, index: this.answerToEdit.index});
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
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 380px;
    padding-bottom: 60px;
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

.edit-card-form-field {
  position: relative;
  width: 100%;
  height: 50%;
  margin-bottom: 40px;
}

.edit-card-form-field textarea {
  display: block;
  margin: 20px auto;
  color: var(--custom-yellow);
  width: 90%;
  border: 2px solid var(--custom-yellow);
  border-radius: 8px;
  box-shadow: 1px 1px 4px var(--custom-yellow);
  resize: none;
  background-color: var(--custom-black);
  box-sizing: border-box;
  padding: 15px;
  font-size: 3vh;
  text-align: center;
  height: 100%;
}

.submit-input {
  background-color: var(--custom-black);
  color: var(--custom-yellow);
  box-shadow: 1px 1px 4px var(--custom-black);
}

.delete-btn {
  background-color: var(--custom-red);
  color: white;
  box-shadow: 1px 1px 4px var(--custom-red);
  position: absolute;
  bottom: 0;
  left: 5%;
  z-index: 2;
}

.error-msg {
  color: var(--custom-red);
  font-weight: bolder;
  font-size: 12px;
}
</style>