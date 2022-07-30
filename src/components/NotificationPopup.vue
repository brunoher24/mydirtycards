<template>
  <div>
    <EventEmiter v-if="displayEventEmiter" v-on:trigger="init" />
    <div
      v-if="notificationText"
      v-bind:class="{ appear, disappear: !appear }"
      class="notification-popup-ctnr"
    >
      <p>{{ notificationText }}</p>
      <div class="notification-btn-ctnr">
        <button @click="close">ok</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import EventEmiter from "./EventEmiter.vue";

export default {
  name: "NotificationPopup",
  components: { EventEmiter },
  mounted() {
    this.initPusher(this.$pusher);

    setTimeout(() => {
      this.displayEventEmiter = true;
    }, 2000);
  },
  props: ["shouldGet"],
  data() {
    return {
      notificationText: "",
      chanels: {},
      gameId: "",
      userId: "",
      displayEventEmiter: false,
      appear: true,
    };
  },

  computed: {
    ...mapGetters("pusher", {
      getChanel: "getChanel",
    }),
    ...mapGetters("game", {
      getGameId: "getGameId",
    }),
    ...mapGetters("user", {
      getUserSession: "getUserSession",
    }),
  },

  methods: {
    ...mapActions("pusher", {
      initPusher: "initPusher",
      addChanel: "addChanel",
    }),
    init() {
      this.shouldGet.forEach(item => {
        switch (item) {
          case "userSession":
            this.userSession = this.getUserSession();
            break;
          case "gameId":
            this.gameId = this.getGameId();
        }
      });
      this.subscribeToChannels();
    },
    async subscribeToChannels() {
      try {
        if (this.userSession) {
          const chanelName = "user-" + this.userSession.id;
          let invitationChanel = this.getChanel(chanelName);

          if (!invitationChanel) {
            console.log("invitationChanel created !");

            await this.addChanel(chanelName);
            invitationChanel = this.getChanel(chanelName);
          }
          invitationChanel.bind("invitation", (event) => {
            console.log("Evénement notification d'invitation : ", event);
            this.notificationText = "Vous avez reçu une invitation.";
          });
        }
        if (this.gameId) {
          const chanelName = "game-" + this.gameId;
          let gameChanel = this.getChanel(chanelName);

          if (!gameChanel) {
            console.log("gameChanel created !");

            await this.addChanel(chanelName);
            gameChanel = this.getChanel(chanelName);
          }
          gameChanel.bind("changed", (event) => {
            console.log("Evénement notification de partie : ", event);
            this.notificationText = `Du nouveau dans la patie ${this.gameId}`;
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    close() {
      this.appear = false;
      setTimeout(() => {
        this.notificationText = "";
      }, 1000);
    },
  },
};
</script>

<style scoped>
.notification-popup-ctnr {
  color: white;
  background-color: #2e2f33;
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

.notification-popup-ctnr > p {
  margin: 0;
}

.notification-popup-ctnr > .notification-btn-ctnr {
  display: flex;
  align-items: center;
}

.notification-popup-ctnr button {
  color: var(--custom-pale-yellow);
  border: 2px solid;
  border-radius: 8px;
  background-color: transparent;
  width: 125px;
  height: 35px;
  margin: 0 8px;
}

@keyframes appear-top {
  from {
    top: -120px;
  }
  to {
    top: 55px;
  }
}

@keyframes disappear-top {
  from {
    top: 55px;
  }
  to {
    top: -120px;
  }
}
</style>