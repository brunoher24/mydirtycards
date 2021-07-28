<template>
  <div v-bind:class="{ appear, disappear: !appear  }" class="confirm-popup-ctnr">
      <p>{{ confirmText || "Fais pas le fou! Tu es sûr?" }}</p>
      <div class="confirm-btns-ctnr">
          <button @click="confirmed">Oui</button>
          <button @click="canceled">Non</button>
      </div>
  </div>
</template>

<script>

export default {
  name: "ConfirmPopup",

//   components: {
//   },
  setup() {
    return {
    };
  },
  mounted() {
      this.appear = true;
  },
  props: ["confirmText", "data"],
  // watch: {
  //   answer(obj){
  //     console.log(obj);
  //     this.answerToEdit = {...obj};
  //   }
  // },

  data() {
    return {
      appear: true
    };
  },

  methods: {
    confirmed() {
        this.appear = false;
        this.$emit("confirmedAction", this.data);
    },

    canceled() {
        this.appear = false;
        this.$emit("canceledAction");
    }
  },
};
</script>

<style scoped>
    .confirm-popup-ctnr {
        color: white;
        background-color: #2E2F33;
        height: 120px;
        top: -40px;
        width: 100%;
        position: fixed;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 6;
        flex-direction: column;
    }

    .appear {
        animation: appear-top 0.3s linear forwards;
    }

    .disappear {
        animation: disappear-top 0.3s linear forwards;
    }

    .confirm-popup-ctnr > p {
        margin: 0;
    } 

    .confirm-popup-ctnr > .confirm-btns-ctnr {
        display: flex;
        align-items: center;
    }

    .confirm-popup-ctnr button {
        color: var(--custom-pale-yellow);
        border: 2px solid;
        border-radius: 8px;
        background-color: transparent;
        width: 125px;
        height: 35px;
        margin: 0 8px;
    }

    @keyframes appear-top {
        from{
            top: -120px;
        }
        to{
            top: 55px;
        }
    }

    @keyframes disappear-top {
        from{
            top: 55px;
        }
        to{
            top: -120px;
        }
    }

</style>