<script setup>
import { storeToRefs } from 'pinia';

import CardView from '../components/CardView.vue';
import { useUserStore } from '../store/UserStore.js';
const userStore = useUserStore();
const { state } = storeToRefs(userStore);
</script>

<template lang="pug">
//- ol
//-     li(v-if="users === undefined") Loading...
//-     //- li(v-else-if="users.length === 0") No users available.
//-     each user in users
//-       li {{ user.name.first }} {{ user.name.last }}
//- li(v-if="{{users.length()}} === 0") Loading...
//- p {{users}}
p All Tab !!!
CardView(v-for="user in state.users" :key="user.login.uuid" :user="user")
</template>
