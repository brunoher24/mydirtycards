<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <!-- <ion-title>{{ $route.params.id }}</ion-title> -->
        <ion-title>Accueil</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <div id="container">
        <div v-if="gameId" class="custom-btn full-btn">
          <router-link :to="{name: 'gameInProgress', params:{id: gameId}}">
            Partie en cours
          </router-link>
        </div>
        <div v-else>
          <div class="custom-btn empty-btn">
            <router-link to="invitations">
              Invitations en attente
            </router-link>
          </div>
          <div class="custom-btn full-btn">
            <router-link class="custom-router-link" to="nouvelle-partie">
              Nouvelle partie
            </router-link>
          </div> 
        </div>
        <!-- <button @click="openModalPopup">Test popup</button> -->
        <NotificationPopup :shouldGet="['gameId', 'userSession']"  />
      </div>
      
    </ion-content>
  </ion-page>
</template>

<script>
import {mapGetters} from "vuex";
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import  GamePlayerService from "../models/GamePlayer";
import NotificationPopup from "../components/NotificationPopup";

export default {
  name: 'Home',
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    NotificationPopup,
  },
  data(){
    return {
      randId: "",
      userSession: "",
      gameId: "",
      currentGameUsers : []   
    }
  },
  computed: {
    // ...mapGetters("game", {
    //   getGameId: "getGameId",
    // }),
    ...mapGetters("user", {
      getUserSession: "getUserSession",
    })
  },
  mounted() {
    (async () => {
      const gamePlayerService = new GamePlayerService();
      this.currentGameUsers = await gamePlayerService.read();
      if(this.currentGameUsers[0]) this.gameId = this.currentGameUsers[0].game_id;
      this.userSession = this.getUserSession();
    })();
    
  }
}
</script>

<style scoped>
#container {
  position: absolute;
  left: 0;
  right: 0;
  top: 40px;
  background: linear-gradient(var(--custom-pale-brown), var(--custom-yellow));
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.full-btn {
  background-color: var(--custom-yellow);
  box-shadow: 1px 1px 4px var(--custom-yellow);
}

.empty-btn {
  border: 2px solid var(--custom-black);
  background-color: transparent;
}

.custom-btn a {
  text-decoration: none;
  color: var(--custom-black);
}

</style>