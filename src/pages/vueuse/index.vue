<template>
  <q-page padding>
    <div class="text-h4">useAsyncState</div>
    <q-separator spaced />

    <p>isReady: {{ isReady }}</p>
    <p>isLoading: {{ isLoading }}</p>

    <button @click="handleButton">execute</button>

    <p>state: {{ state }}</p>
    <p>error: {{ error }}</p>
  </q-page>
</template>

<script setup>
import axios from 'axios';
import { useAsyncState } from '@vueuse/core';

const { state, isLoading, error, isReady, execute } = useAsyncState(
  axios
    .get('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => res.data),
  { name: '무명이' },
  {
    immediate: false,
  },
);

const handleButton = () => {
  execute(1000);
};
</script>

<style lang="scss" scoped></style>
