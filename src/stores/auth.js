import { useLocalStorage, StorageSerializers } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  // const user = ref(null);
  const user = useLocalStorage('auth/user', null, {
    serializer: StorageSerializers.object,
  });
  const isAuthenticated = computed(() => !!user.value);

  const setUser = userData => {
    user.value = userData;

    if (user.value) {
      user.value = {
        uid: userData.uid,
        photoURL: userData.photoURL,
        displayName: userData.displayName,
        email: userData.email,
        emailVerified: userData.emailVerified,
      };
    } else {
      user.value = null;
    }
  };

  return { user, setUser, isAuthenticated };
});
