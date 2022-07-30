<template>
  <div>
    <div
      v-if="data_"
      v-bind:class="{ appear, disappear: !appear }"
      class="modal-popup-ctnr"
    >
        <header class="modal-popup-header"><h2>{{ data_.title }}</h2></header>
        <div class="modal-popup-body">
            <p>{{ data_.body }}</p>
        </div>
        <footer class="modal-popup-footer">
            <button v-if="data_.cancel" class="cancel-btn" @click="close('Cancel')">{{ data_.cancel }}</button>            
            <button class="ok-btn" @click="close('Ok')">{{ data_.ok || "ok"}}</button>
        </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalPopup",
  props: ["data_"],
  watch: {
    // Whenever the movie prop changes, fetch new data
    data_() {
      this.appear = true;
    },
  },
  data() {
    return {
      appear: true,
    };
  },
  methods: {
    close(okOrCancel) {
      this.appear = false;
      setTimeout(() => {
        this.$emit("closeAnd" + okOrCancel);
      }, 500);
    },
  },
};
</script>

<style scoped>
.modal-popup-ctnr {
  color: #585858;
  background-color: white;
  top: 20vh;
  right: -120%;
  width: 80%;
  position: fixed;
  box-sizing: border-box;
  z-index: 5;
  border-radius: 4px;
  box-shadow: 1px 1px 6px silver;
}

.appear {
  animation: appear-right 0.18s linear forwards;
}

.disappear {
  animation: disappear-right 0.18s linear forwards;
}

.modal-popup-header > h2 {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid silver;
  margin: 0;
}

.modal-popup-body > p {
  text-align: center;
  padding: 10px;
}

.modal-popup-footer {
  padding: 8px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #f0f1f1;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.modal-popup-footer > button {
  color: var(--custom-pale-yellow);
  margin: 0 5px;
  font-size: 17px;
  height: 40px;
}

.modal-popup-footer > .ok-btn {
  border: 2px solid;
  border-radius: 8px;
  background-color: var(--custom-black);
  color: white;
  padding: 0 20px;
}

.modal-popup-footer > .cancel-btn {
  border: none;
  background-color: transparent;
  color: var(--custom-black);
}

@keyframes appear-right {
  from {
    right: -120%;
  }
  to {
    right: 10%;
  }
}

@keyframes disappear-right {
  from {
    right: 10%;
  }
  to {
    right: -120%;
  }
}
</style>