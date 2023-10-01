<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import Card from './Card.vue';
import ListView from './ListView.vue';
import { useUserStore } from '../store/UserStore.js';

const userStore = useUserStore();
const { state } = storeToRefs(userStore);

const displayedFav = computed(() => {
  const start = (state.value.pagination.currentPage - 1) * state.value.pagination.itemsPerPage; // 0;
  const end = state.value.pagination.currentPage * state.value.pagination.itemsPerPage; // 9
  return (state.value.displayed = state.value.favorite?.slice(start, end) ?? '');
});
</script>

<template lang="pug">
template(v-if="!displayedFav.length") 
  p(class="text-center text-xl font-bold text-neutral-400 py-8") Click the like button to store favorites!
template(v-else)
  section(v-if="state.pagination.isCardMode === true" class="grid-cols-2 sm:grid-cols-5 grid gap-4 xs:gap-8 sm:gap-4 lg:gap-10")
    Card(v-for="user in displayedFav" :user="user" :key="user.login.uuid" @toggle-like="$emit('toggle-like', $event)" @modal-open="$emit('modal-open', $event)")
  section(v-else class="grid-cols-1 grid gap-4 sm:gap-4 lg:gap-8")
    ListView(v-for="user in displayedFav" :user="user" :key="user.login.uuid" @toggle-like="$emit('toggle-like', $event)" @modal-open="$emit('modal-open', $event)")
</template>
