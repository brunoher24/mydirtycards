<template>
  <div class="caroussel-ctnr">
    <div v-if="items && items.length > 0">
      <nav class="btns-ctnr">
        <button @click="moveLeft">
          <ion-icon
            class="caroussel-chevron"
            :ios="chevronBackOutline"
            :md="chevronBackOutline"
          ></ion-icon>
        </button>
        <button @click="moveRight">
          <ion-icon
            class="caroussel-chevron"
            :ios="chevronForwardOutline"
            :md="chevronForwardOutline"
          ></ion-icon>
        </button>
      </nav>
      <ul v-bind:style="{ transform: 'translateX(' + translateX + 'vw)' }">
        <li v-for="(item, i) in items" :key="i" @click="editItem(i)">
          <p>{{ item.text }}</p>
        </li>
      </ul>
    </div>
    
    <div v-else class="no-items-message">
       <p>{{  noItemsMessage }}</p>
    </div>
   
  </div>
</template>

<script>
import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/vue";

export default {
  name: "Caroussel",

  components: {
    IonIcon,
  },

  props: ["items", "noItemsMessage"],

  setup() {
    return {
      chevronBackOutline,
      chevronForwardOutline,
    };
  },

  data() {
    return {
      translateX: 0,
      currentItem: 0,
      canSlide: true,
    };
  },

  watch: {
    items() {
      this.translateX = 0;
      this.currentItem = 0;
    },
  },
  methods: {
    moveRight() {
      if (!this.canSlide || this.currentItem === this.items.length - 1) return;
      this.canSlide = false;
      const finalTranslation = this.translateX - 45;
      const interval = window.setInterval(() => {
        this.translateX -= 4;
        if (this.translateX <= finalTranslation) {
          this.canSlide = true;
          this.currentItem++;
          this.translateX = finalTranslation;
          window.clearInterval(interval);
        }
      }, 20);
    },
    moveLeft() {
      if (!this.canSlide || this.currentItem === 0) return;
      this.canSlide = false;
      const finalTranslation = this.translateX + 45;
      const interval = window.setInterval(() => {
        this.translateX += 4;
        if (this.translateX >= finalTranslation) {
          this.currentItem--;
          this.canSlide = true;
          this.translateX = finalTranslation;
          window.clearInterval(interval);
        }
      }, 20);
    },
    editItem(index) {
      const item = {...this.items[index], index};
      this.$emit("editCarousselItem", item);
    },
  },
};
</script>

<style scoped>
.caroussel-ctnr {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
  height: 300px;
  overflow: hidden;
}

.caroussel-ctnr ul {
  list-style-type: none;
  padding-left: 0;
  display: flex;
  position: relative;
  z-index: 1;
}

.caroussel-ctnr li {
  margin: 2vw;
  border: 2px solid var(--custom-yellow);
  border-radius: 8px;
  box-shadow: 1px 1px 4px var(--custom-yellow);
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

}

.caroussel-ctnr li > p {
  color: var(--custom-yellow);
  width: 40vw;

}

nav.btns-ctnr {
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: calc(50% - 15px);
  left: 0;
  width: 100%;
  z-index: 2;
}

nav.btns-ctnr > button {
  background-color: transparent;
}

.caroussel-chevron {
  color: var(--custom-pale-yellow);
  font-size: 30px;
}

.no-items-message {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.no-items-message > p {
    color: var(--custom-yellow);
    text-align: center;
    width: 70vw;
    font-size: 6vw;
  }
</style>