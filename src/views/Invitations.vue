<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <!-- <ion-title>{{ $route.params.id }}</ion-title> -->
        <ion-title>Invitations</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div id="container">
        <ul v-if="invitations" class="invitations-list">
          <li 
          v-for="(invitation, index) in invitations" :key="invitation.id"
          v-bind:style="{ animationDelay: index + '00ms' }"
          >
            <img v-if="invitation.imgNumber" :src="require('@/assets/profile-pic/fake-profile-pic-'+ invitation.imgNumber +'.jpeg')" alt="Monstrueux" />
            <span>{{ invitation.user_alias }}</span>
            <!-- <button @click="openConfirmAcceptModal(invitation.id, index)">Rejoindre</button> -->
            <button @click="accept(invitation, index)">Rejoindre</button>            
            <button @click="decline(invitation, index)">Refuser</button>
          </li>
        </ul>
        <h2 v-if="invitations && invitations.length === 0" class="no-result">Aucune invitation pour le moment</h2>

        <div v-if="gameInProgress">
          <h2>Partie en cours</h2>
          <div class="game-in-progress">
            <span>{{ gameInProgress.userAlias }}</span>
            <button @click="quitGame">Quitter la partie</button>
          </div>
        </div>

        <!-- <ModalPopup 
        :data_="modalPopupData" 
        v-on:close-and-ok="closeModalPopup"/> -->
        <!-- v-on:close-and-cancel="closeModalPopupWithCancelAction" -->
      </div>

    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";

import { mapGetters } from "vuex";

import GamePlayer from "../models/GamePlayer";
// import ModalPopup from "../components/ModalPopup";

// import { GET_RANDOM_INT_BETWEEN } from "../services/helpers";

export default {
  name: "Invitations",
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    // ModalPopup
  },
  data() {
    return {
      invitations: [],
      gameInProgress: null,
      // modalPopupData: null,
      // selectedInvitationId: null,
      // selectedInvitationIndex: null,
    };
  },

  computed: {
    ...mapGetters("user", {
      getUserSession: "getUserSession",
    }),
     ...mapGetters("game", {
      getGameId: "getGameId",
    }),
  },

  methods: {
    // closeModalPopup() {
    //   this.modalPopupData = null;
    //   this.accept();
    // },
    // closeModalPopupWithCancelAction() {
    //   this.modalPopupData = null;
    // },
    // openConfirmAcceptModal(id, index) {
    //   this.modalPopupData = {
    //     title: "Accepter et quitter la partie en cours ?",
    //     body: "Si tu acceptes cette nouvelle invitation, tu quiterras ta partie en cours.",
    //     ok: "Oui je quitte",
    //     cancel: "Non, je reste"
    //   };
    //   this.selectedInvitationId = id
    //   this.selectedInvitationIndex = index;
    // },

    async accept(invitation, index) {
      const gamePlayerManager = new GamePlayer();
      await gamePlayerManager.acceptInvitation(invitation.id);
      this.invitations.splice(index, 1);
    },

    async decline(invitation, index) {
      const gamePlayerManager = new GamePlayer();
      console.log(invitation);
      await gamePlayerManager.delete(invitation.game_id, invitation.user_id);
      this.invitations.splice(index, 1);
    },

    async getInvitations() {
      try {
        const gamePlayerManager = new GamePlayer();
        const invitations = await gamePlayerManager.readInvitations();
        this.invitations = invitations;
      } catch(err) {
        console.error(err);
      }
    }
  },

  mounted() {
    this.getInvitations();
  }
};
</script>



<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 40px;
  background: linear-gradient(var(--custom-red), var(--custom-yellow));
  min-height: 100vh;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li, .game-in-progress {
  background-color: var(--custom-black);
  border-radius: 20px;
  height: 34px;
  width: 90%;
  margin: 25px auto;
  display: flex;
  color: white;
  justify-content: space-between;
  align-items: center;
  box-shadow: 1px 1px 4px var(--custom-black);
  animation: right-appear 0.2s forwards;
  transform: translateX(1000px);
}

li > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    border: 4px solid white;
    margin-top: -1px;
    margin-left: -4px;
}

li > span, .game-in-progress > span {
    font-size: 14px;
    width: 60%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

li > button, .game-in-progress > button {
  border: none;
  color: var(--custom-black);
  height: 30px;
  border-radius: 18px;
  width: 23%;
  margin-right: 2px;
  font-size: 14px;
}

li > button, .game-in-progress > button {
    background-color: white;
}

.no-result {
  animation: right-appear 0.2s forwards;
  transform: translateX(1000px);
  margin-top: 200px;
}

@keyframes right-appear {
  from {
    transform: translateX(1000px);
  }

  to {
    transform: translateX(0);
  }
}

</style>