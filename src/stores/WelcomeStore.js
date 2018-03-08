import { observable } from "mobx";
import firebase from "firebase";
import { storeItem, getItem } from "../helpers/CacheHelper";

class WelcomeStore {
  @observable firebaseConfigured = false;
  @observable emailAuthEnabled = false;
  @observable friendsAdded = false;
  @observable projectId = null;
  @observable currentStep = 1;

  isFirebaseConfigured() {
    try {
      firebase.database();
      const projectId = firebase.app().options.projectId;
      this.firebaseConfigured = true;
      this.projectId = projectId;
      this.currentStep = 2;
    } catch (err) {
      this.firebaseConfigured = false;
    }
  }

  isEmailAuthEnabled() {
    console.log("isEmailAuthEnabled()");

    if (!this.firebaseConfigured) {
      console.log("not configged");

      return false;
    }
    const authEnabledForApp =
      firebase.app().options.projectId + "_emailAuthEnabled";

    getItem(authEnabledForApp, (err, emailAuthVerified) => {
      console.log("emailAuthVer?", emailAuthVerified);

      if (emailAuthVerified) {
        this.emailAuthEnabled = true;
        return;
      }

      const testEmail = "comsttests@combust.com";
      firebase
        .auth()
        .createUserWithEmailAndPassword(testEmail, "sparky")
        .then(() => {
          console.log("success signing in");

          storeItem(authEnabledForApp, true);
          this.emailAuthEnabled = true;
          this.currentStep = 4;
        })
        .catch(error => {
          console.log("err trying sign in:", error);

          this.emailAuthEnabled = error.code === "auth/email-already-in-use";
          this.currentStep = this.emailAuthEnabled ? 3 : 2;
          storeItem(authEnabledForApp, this.emailAuthEnabled);
        })
        .then(() => {
          const user = firebase.auth().currentUser;
          if (user && user.email === testEmail) {
            user.delete();
          }
        });
    });
  }
}

const welcomeStore = new WelcomeStore();

export default welcomeStore;
