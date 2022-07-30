<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <img src="../assets/cards.png" alt="" />
        <h1>Bienvenue</h1>
        <p>Identifie-toi avant de t'amuser, s'il te plait.</p>

        <button class="custom-btn empty-btn" @click="displaySignupForm">
          Créer un compte
        </button>
        <button class="custom-btn full-btn" @click="displayLoginForm">
          Se connecter
        </button>

        <div v-if="shouldDisplaySignupForm">
          <form @submit.prevent="signup" class="login-signup-form">
            <button
              class="close-form-btn"
              @click="shouldDisplaySignupForm = false"
            >
              <ion-icon
                :ios="closeCircleOutline"
                :md="closeCircleOutline"
              ></ion-icon>
            </button>

            <h2>Allez, viens !</h2>
            
            <div class="login-signup-form-field">
              <label for="alias-input">Pseudo</label>
              <input
                name="alias-input"
                v-model="user.alias"
                id="alias-input"
                type="text"
                placeholder="ex: James Ussay"
                autocomplete="off"
              />
              <div v-if="errors.alias" class="input-subtitle error-msg">
                Rappelle-toi comment tu t'appelles enfin !
              </div>
            </div>
            <div class="login-signup-form-field">
              <label for="email-input">Email</label>
              <input
                name="email"
                v-model="user.email"
                id="email-input"
                type="email"
                placeholder="ex: mail@amoi.fort"
                autocomplete="email"
              />
              <div v-if="errors.email" class="input-subtitle error-msg">
                Ouh là ! On n'essaierait pas de nous arnaquer avec un faux mail ? 
              </div>
            </div>
            <div class="login-signup-form-field">
              <label for="pwd-input">Mot de passe</label>
              <input
                name="pwd"
                 v-model="user.pwd"
                id="pwd-input"
                :type="inputPwdType"
                placeholder="Mot de passe"
                autocomplete="new-password"
              />
              <ion-icon
                v-if="!showPassword"
                @click="toggleShowPassword"
                class="pwd-eye-icon"
                name="eye-outline"
                :ios="eyeOutline"
                :md="eyeOutline"
              ></ion-icon>
              <ion-icon
                v-if="showPassword"
                @click="toggleShowPassword"
                class="pwd-eye-icon"
                name="eye-off-outline"
                :ios="eyeOffOutline"
                :md="eyeOffOutline"
              ></ion-icon>
              <div v-if="errors.pwd" class="input-subtitle error-msg">
                6 caractères minimum et 1 majuscule
              </div>
            </div>

            <div class="login-signup-form-field">
              <label for="pwd-confirm-input">Confirmer mot de passe</label>
              <input
                name="pwd"
                 v-model="pwdConfirm"
                id="pwd-confirm-input"
                :type="inputPwdType"
                placeholder=""
                autocomplete="off"
              />
              <div v-if="errors.differentPwds" class="input-subtitle error-msg">
                Mots de passes différents : concentre-toi bon sang !
              </div>
            </div>
            <input v-if="!isSignedUp" class="custom-btn submit-input" type="submit" value="On va être bien bien bien !">
            <div v-else class="custom-btn submit-input fake-submit-input">Regarde tout ce qu"on peut faire</div>
          </form>
        </div>

        <div v-if="shouldDisplayLoginForm">
          <form @submit.prevent="login" class="login-signup-form">
            <button
              class="close-form-btn"
              @click="shouldDisplayLoginForm = false"
            >
              <ion-icon
                :ios="closeCircleOutline"
                :md="closeCircleOutline"
              ></ion-icon>
            </button>
            <h2>Connecte-toi</h2>
             <div class="login-signup-form-field">
              <label for="alias-input">Pseudo</label>
              <input
                name="alias-input"
                v-model="user.alias"
                id="alias-input"
                type="text"
                placeholder="ex: James Ussay"
                autocomplete="off"
              />
            </div>
            <div class="login-signup-form-field">
              <label for="pwd-input">Mot de passe</label>
              <input
                name="pwd"
                 v-model="user.pwd"
                id="pwd-input"
                :type="inputPwdType"
                placeholder="Mot de passe"
                autocomplete="current-password"
              />
              <ion-icon
                v-if="!showPassword"
                @click="toggleShowPassword"
                class="pwd-eye-icon"
                name="eye-outline"
                :ios="eyeOutline"
                :md="eyeOutline"
              ></ion-icon>
              <ion-icon
                v-if="showPassword"
                @click="toggleShowPassword"
                class="pwd-eye-icon"
                name="eye-off-outline"
                :ios="eyeOffOutline"
                :md="eyeOffOutline"
              ></ion-icon>
            </div>
            <input class="custom-btn submit-input" type="submit" value="Connexion">
          </form>
        </div>

        <div class="freepik-license">
          Icons made by
          <a href="https://www.freepik.com" title="Freepik">Freepik</a> from
          <a href="https://www.flaticon.com/" title="Flaticon"
            >www.flaticon.com</a
          >
        </div>

        <ModalPopup 
        :data_="modalPopupData" 
        v-on:close-and-ok="closeModalPopup"/>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="js">
import { IonContent, IonPage, IonIcon } from "@ionic/vue";
import { closeCircleOutline, eyeOutline, eyeOffOutline } from "ionicons/icons";

import ModalPopup from "../components/ModalPopup";


import Auth from '../services/auth';
import {mapActions} from "vuex";


export default {
  name: "Login",
  components: {
    IonContent,
    IonPage,
    IonIcon,
    ModalPopup
  },
  setup() {
    return {
      closeCircleOutline,
      eyeOutline,
      eyeOffOutline
    };
  },
  data() {
    return {
      modalPopupData: null,
      shouldDisplayLoginForm: false,
      shouldDisplaySignupForm: false,
      user: {
        alias: "",
        email: "",
        pwd: "",
      },
      pwdConfirm: "",
      showPassword: false,
      inputPwdType: "password",
      isSignedUp: false,
      errors: {
        alias: false,
        email: false,
        pwd: false,
        differentPwds: false
      } 
    };
  },

  methods: {
    ...mapActions("user", {
        setUserSession: "setUserSession",
    }),
    displaySignupForm() {
      this.shouldDisplayLoginForm = false;
      this.shouldDisplaySignupForm = true;
    },
    displayLoginForm() {
      this.shouldDisplayLoginForm = true;
      this.shouldDisplaySignupForm = false;
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
      this.inputPwdType = this.showPassword ? "text" : "password";
    },
    signup() {
      for(const key in this.errors) {
        this.errors[key] = false;
      }
      
      if(this.user.alias.trim().length < 2) {
        this.errors.alias = true
        return;
      }

      if(!this.user.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        this.errors.email = true;
        return;
      }

      // if(!this.user.pwd.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/)) {
      //   this.errors.pwd = true;
      //   return;
      // } else if(this.user.pwd !== this.pwdConfirm) {
      //   this.errors.differentPwds = true;
      //   return;
      // }

      const auth = new Auth();
      auth.signup(this.user).then(() => {
        this.isSignedUp = true;
        window.setTimeout(() => {
          this.isSignedUp = false;
          this.$router.push("accueil");
        }, 1000);
      });
    },
    login() {
      const auth = new Auth();
      auth.login(this.user).then(userSession => {
        this.setUserSession({...userSession, alias: this.user.alias});
        console.log({...userSession, alias: this.user.alias})
        this.isSignedUp = true;
        window.setTimeout(() => {
          this.isSignedUp = false;
          this.$router.push("accueil");
        }, 1000);
      }).catch(err => {
        console.log(err);
        this.openModal("Erreur", err[1][1]);
      });

    },
    closeModalPopup() {
      this.modalPopupData = null;
    },
    openModal(title, mess) {
      this.modalPopupData = {
        title,
        body: mess,
        ok: "Fermer",
      };
    },
  },
};
</script>

<style scoped>
#container {
  background-color: var(--custom-black);
  padding-bottom: 30px;
  min-height: 100vh;
  position: relative;
}

#container > h1 {
  color: var(--custom-red);
  text-align: center;
}

#container > p {
  color: white;
  margin: 0 auto;
  width: 230px;
  text-align: center;
}

#container a {
  text-decoration: none;
}

#container img {
  display: block;
  width: 70%;
  margin: 0 auto;
}

.full-btn {
  background-color: var(--custom-yellow);
  color: var(--custom-black);
}

.empty-btn {
  color: var(--custom-yellow);
  border-color: var(--custom-yellow);
}

.login-signup-form {
  padding: 20px;
  box-sizing: border-box;
  position: absolute;
  top: 100vh;
  width: 100%;
  border-radius: 25px;
  background-color: var(--custom-pale-yellow);
  animation: bottom-appear 0.5s forwards;
  z-index: 2;
  color: var(--custom-black);
  box-shadow: 1px 1px 4px var(--custom-pale-yellow);  
}

.close-form-btn {
  background-color: transparent;
  color: var(--custom-red);
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 20px;
}

.login-signup-form-field {
  position: relative;
  width: 100%;
  height: 95px;
}

.login-signup-form-field label {
  margin-left: 20px;
  padding: 5px;
  font-size: 14px;
  background-color: var(--custom-pale-yellow);
  z-index: 1;
  position: relative;
}

.login-signup-form-field input {
  border: 1px solid var(--custom-black);
  border-radius: 6px;
  padding: 15px;
  background-color: transparent;
  width: 100%;
  margin-top: -9px;
  z-index: 0;
  position: relative
}

.pwd-eye-icon {
  position: absolute;
  top: 26px;
  right: 20px;
}

.submit-input {
  background-color: var(--custom-black);
  color: var(--custom-yellow);
  box-shadow: 1px 1px 4px var(--custom-black);
}

.fake-submit-input {
  animation: color-appear 2s;
  font-size: 12px;
  text-align: center;
}


.freepik-license {
  position: absolute;
  bottom: 0;
  left: 0;
  display: block;
  color: white;
  font-size: 14px;
}

.error-msg {
  color: var(--custom-red);
  font-weight: bolder;
  font-size: 12px;
}


@keyframes color-appear {
  from {
    color: transparent;
  }

  to {
    color: var(--custom-yellow);
  }
}
</style>