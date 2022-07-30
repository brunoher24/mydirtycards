<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <!-- <ion-title>{{ $route.params.id }}</ion-title> -->
        <ion-title>Partie en cours</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <div id="container">
        
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import GamePlayerService from "../models/GamePlayer";

export default {
  name: 'GameInProgress',
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar
  },
  data(){
    return {
      currentGameUsers : []  
    }
  },
  computed: {
    // ...mapGetters("user", {
    //   getUserSession: "getUserSession",
    // })
  },
  mounted() {
    (async () => {
      const gamePlayerService = new GamePlayerService();
      this.currentGameUsers = await gamePlayerService.readByGameId(this.$route.params.id);
      console.log(this.currentGameUsers);
      // this.userSession = this.getUserSession();
    })();
    
  }

}
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container a {
  text-decoration: none;
}
</style>