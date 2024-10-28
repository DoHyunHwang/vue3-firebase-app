import { boot } from 'quasar/wrappers';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useAuthStore } from 'src/stores/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBfLvnMZq5uGbaBxqlqC-ROdc2-ZfFl_yo',
  authDomain: 'dh-vue3-firebase-app-b44ac.firebaseapp.com',
  projectId: 'dh-vue3-firebase-app-b44ac',
  storageBucket: 'dh-vue3-firebase-app-b44ac.appspot.com',
  messagingSenderId: '1867252012',
  appId: '1:1867252012:web:268e2c0f9160a9623b2c89',
  measurementId: 'G-P2396ZPWGF',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };

export default boot(async (/* { app, router, ... } */) => {
  const authStore = useAuthStore();

  onAuthStateChanged(auth, user => {
    console.log('### user: ', user);
    authStore.setUser(user);
  });
});
