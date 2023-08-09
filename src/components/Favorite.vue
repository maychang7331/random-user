<script setup>
import { storeToRefs } from "pinia";

import CardView from "../components/CardView.vue";
import { useUsersStore } from "../store/user.js";
const usersStore = useUsersStore();
const { favoriteUsers } = storeToRefs(usersStore);
</script>

<template lang="pug">
CardView(v-for="user in favoriteUsers" :key="user.login.uuid" :user="user")
</template>
