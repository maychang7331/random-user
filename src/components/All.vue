<script setup>
import { storeToRefs } from 'pinia';

import CardView from '../components/CardView.vue';
import { useUsersStore } from '../store/user.js';
const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);
</script>

<template lang="pug">
//- ol
//-     li(v-if="users === undefined") Loading...
//-     //- li(v-else-if="users.length === 0") No users available.
//-     each user in users
//-       li {{ user.name.first }} {{ user.name.last }}
//- li(v-if="{{users.length()}} === 0") Loading...
//- p {{users}}
CardView(v-for="user in users" :key="user.login.uuid" :user="user")
</template>
