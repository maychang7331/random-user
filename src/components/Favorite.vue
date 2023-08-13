<script setup>
import { storeToRefs } from 'pinia';

import CardView from '../components/CardView.vue';
import { useUserStore } from '../store/UserStore.js';
const userStore = useUserStore();
const { state } = storeToRefs(userStore);
</script>

<template lang="pug">
p FavTabb
CardView(v-for="user in state.favoriteUsers" :key="user.login.uuid" :user="user")
</template>
