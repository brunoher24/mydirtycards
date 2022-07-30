<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <!-- <ion-title>{{ $route.params.id }}</ion-title> -->
        <ion-title>Nouvelle partie</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div id="container">
        <div class="searchbar-ctnr">
          <input v-model="searchText" type="text" placeholder="Vaz-y, cherche !">
          <button @click="searchUsers" class="search-btn">
            <ion-icon :ios="search" :md="search"></ion-icon>
          </button>
        </div>
        <ul v-if="searchedUsers" class="searched-users-list">
          <li 
          v-for="(user, index) in searchedUsers" :key="index"
          v-bind:style="{ animationDelay: index + '00ms' }"
          >
            <img v-if="user.imgNumber" :src="require('@/assets/profile-pic/fake-profile-pic-'+ user.imgNumber +'.jpeg')" alt="Monstrueux" />
            <span>{{ user.alias }}</span>
            <button v-if="!user.invited" @click="invite(user.id, user.id_push, user.alias, index)">Ajouter</button>
            <div v-else class="invited">Invité(e)</div>
          </li>
        </ul>
        <h2 v-if="noResults" class="no-result">Faux, zéro, nul !</h2>

        <div v-if="usersToInvite.length > 0">
          <h2>Invité<span v-if="usersToInvite.length > 1">s</span></h2>
          <ul class="users-to-invite-list">
            <li v-for="(user, index) in usersToInvite" :key="user.id_push">
              <span>{{ user.alias }}</span>
              <button @click="cancelGamePlayer(user.id_push, index)">Annuler</button>
            </li>
          </ul>
        </div>

        <button v-if="usersToInvite.length > 2" class="custom-btn" @click="startNewGame">Démarrer partie</button>
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

import { IonIcon } from '@ionic/vue';
import { search } from "ionicons/icons";

import { mapGetters } from "vuex";


import User from "../models/User";
import Game from "../models/Game";
import GamePlayer from "../models/GamePlayer";


import { GET_RANDOM_INT_BETWEEN } from "../services/helpers";

export default {
  name: "NewGame",
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonIcon
  },
  data() {
    return {
      searchedUsers: [],
      searchText: "",
      noResults: false,
      usersToInvite: []
    };
  },
  setup() {
    return {
      search
    }
  },

  computed: {
    ...mapGetters("user", {
      getUserSession: "getUserSession",
    })
  },

  methods: {
    searchUsers() {
      this.noResults = false;
      if(this.searchText.trim().length < 2) return;
      const userManager = new User();
      userManager.search(this.searchText, this.getUserSession().id).then(searchedUsers => {
        this.noResults = searchedUsers.length === 0;
        this.searchedUsers = searchedUsers.map(user => {
          user.imgNumber = GET_RANDOM_INT_BETWEEN(1, 8);
          const index = this.usersToInvite.findIndex(userToInvite => userToInvite.id_push === user.id_push);
          user.invited = index > -1; 
          return user;
        });
      });
    },
    invite(id, id_push, alias, index) {
      this.searchedUsers[index].invited = this.searchedUsers[index].invited ? false : true;
      this.usersToInvite.push({id, id_push, alias});
    },
    cancelGamePlayer(id_push, index) {
      const index_ = this.searchedUsers.findIndex(user => user.id_push === id_push);
      if(index_ > -1) {
        this.searchedUsers[index_].invited = false;
      }
      this.usersToInvite.splice(index, 1);
    },
    async startNewGame() {
      try {
        const userId = this.getUserSession().id;
        
        const gameManager = new Game();
        const gameId = await gameManager.create(userId);

        const gamePlayerManager = new GamePlayer();
        const usersToInvite = userId + "," + this.usersToInvite.map(user => user.id).join(",");
        const response = await gamePlayerManager.create(usersToInvite, gameId);
        console.log(response);
      } catch(err) {
        console.error(err);
      }
    }
  },
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

.searchbar-ctnr {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}

.searchbar-ctnr > input {
  border: none;
  height: 40px;
  width: 70%;
  padding-left: 18px;
  background-color: var(--custom-yellow);
  color: var(--custom-black);
  border-radius: 20px;
  margin-right: 20px;
  outline: none;
}

.searchbar-ctnr > button {
  border: none;
  height: 40px;
  width: 40px;
  background-color: var(--custom-yellow);
  color: var(--custom-black);
  border-radius: 50%;
  padding-top: 4px;
  padding-right: 6px;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
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

li > span {
    font-size: 14px;
    width: 60%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

li > button, li > .invited {
  border: none;
  color: var(--custom-black);
  height: 30px;
  border-radius: 18px;
  width: 23%;
  margin-right: 2px;
  font-size: 14px;
}

li > button {
    background-color: white;
}

li > .invited {
    background-color: rgb(211, 209, 209);
    display: flex;
    align-items: center;
    justify-content: center;
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