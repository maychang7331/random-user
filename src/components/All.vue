<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import Card from './Card.vue';
import ListView from './ListView.vue';
import { useUserStore } from '../store/UserStore.js';

const userStore = useUserStore();
const { state } = storeToRefs(userStore);

const displayedAll = computed(() => {
  const start = (state.value.pagination.currentPage - 1) * state.value.pagination.itemsPerPage; // 0;
  const end = state.value.pagination.currentPage * state.value.pagination.itemsPerPage; // 9
  return (state.value.displayed = state.value.all?.slice(start, end) ?? '');
});
</script>

<template lang="pug">
section(v-if="state.pagination.isCardMode === true" class="grid-cols-2 sm:grid-cols-5 grid gap-4 xs:gap-8 sm:gap-4 lg:gap-10")
  Card(v-for="user in displayedAll" :user="user" :key="user.login.uuid" @toggle-like="$emit('toggle-like', $event)" @modal-open="$emit('modal-open', $event)")
section(v-else class="grid-cols-1 grid gap-4 sm:gap-4 lg:gap-8")
  ListView(v-for="user in displayedAll" :user="user" :key="user.login.uuid" @toggle-like="$emit('toggle-like', $event)" @modal-open="$emit('modal-open', $event)")
</template>
