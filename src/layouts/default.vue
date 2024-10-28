<template>
  <q-layout view="lHh Lpr lff" class="bg-gray-2">
    <q-header bordered class="bg-white text-grey-9">
      <q-toolbar>
        <q-btn flat dense to="/">
          <q-toolbar-title>
            <q-avatar>
              <img src="/logo.jpeg" />
            </q-avatar>
            무명 클럽
          </q-toolbar-title>
        </q-btn>
        <q-space />

        <q-btn stretch flat label="Home" to="/home" />
        <q-btn
          stretch
          flat
          label="수강하기"
          href="https://google.com"
          target="_blank"
        />
        <q-btn
          stretch
          flat
          label="온라인 강의"
          href="https://edu.gymcoding.co"
          target="_blank"
        />
        <q-btn
          stretch
          flat
          label="유튜브"
          href="https://youtube.com"
          target="_blank"
        />
        <q-separator class="q-my-md q-mr-md" vertical />
        <q-btn
          v-if="!authStore.isAuthenticated"
          unelevated
          rounded
          color="primary"
          label="로그인 / 회원가입"
          @click="openDialog"
        />
        <q-btn v-if="authStore.isAuthenticated" flat round>
          <q-avatar>
            <img
              :src="
                authStore.user.photoURL ||
                generateDefaultPhotoURL(authStore.user.uid)
              "
            />
          </q-avatar>
          <q-menu>
            <q-list style="min-width: 140px">
              <q-item
                v-if="authStore.user.emailVerified"
                clickable
                v-close-popup
                to="/mypage/profile"
              >
                <q-item-section>프로필</q-item-section>
              </q-item>
              <q-item v-else clickable v-close-popup @click="verifyEmail">
                <q-item-section class="text-red">
                  이메일을 인증해주세요.
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="handleLogOut">
                <q-item-section>로그아웃</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container :style="pageContainerStyles">
      <router-view />
    </q-page-container>
    <AuthDialog v-model="authDialog" />
  </q-layout>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from 'src/stores/auth';
import { useQuasar } from 'quasar';
import {
  logout,
  generateDefaultPhotoURL,
  sendVerificationEmail,
} from 'src/services';

import AuthDialog from 'src/components/auth/AuthDialog.vue';

const $q = useQuasar();

const authStore = useAuthStore();

const route = useRoute();
// debugger;
const pageContainerStyles = computed(() => ({
  maxWidth: route.meta?.width || '1080px',
  margin: '0 auto',
}));

const authDialog = ref(false);
const openDialog = () => (authDialog.value = true);

const handleLogOut = async () => {
  await logout();
  $q.notify('로그아웃 되었습니다.');
};

const verifyEmail = async () => {
  await sendVerificationEmail();
  $q.notify('이메일을 확인해주세요.');
};
</script>
