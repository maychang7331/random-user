<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { useUserStore } from '../store/UserStore.js';
import CardView from './CardView.vue';
import Pagination from './Pagination.vue';
const userStore = useUserStore();
const { fetchUserData, toggleLike } = useUserStore();
const { state } = storeToRefs(userStore);

// Fetch users from the API on component mount
onMounted(async () => {
  await fetchUserData();
});

const changeTab = function (newCurrentTab) {
  state.value.pagination.currentTab = newCurrentTab;
  state.value.pagination.currentPage = 1; // Reset page when changing tabs
};

const isCardMode = ref(false);
const setCardMode = () => (isCardMode.value = true);
const setListMode = () => (isCardMode.value = false);

const paginatedData = computed(() => {
  if (!state.value[state.value.pagination.currentTab]) return '';

  const start =
    (state.value.pagination.currentPage - 1) *
    state.value.pagination.itemsPerPage; // 0;
  const end =
    state.value.pagination.currentPage * state.value.pagination.itemsPerPage; // 9
  return state.value[state.value.pagination.currentTab].slice(start, end);
});

const totalPages = computed(() => {
  if (!state.value[state.value.pagination.currentTab]) return 1;
  else
    return Math.ceil(
      state.value[state.value.pagination.currentTab].length /
        state.value.pagination.itemsPerPage,
    );
});

const handlePageChange = (newPage) => {
  state.value.pagination.currentPage = newPage;
};

const handleToggleLike = (user) => {
  toggleLike(user);
};
</script>

<template lang="pug">
.px-4.mx-auto.h-screen
  header.h-6.flex.items-center.justify-between.mx-2.my-3
    div
      button(@click="changeTab('all')") All
      button(@click="changeTab('favorites')") Favorite
    div.flex.items-center
      select(v-model.number="state.pagination.itemsPerPage")
        option(value=10) 10
        option(value=30) 30
        option(value=50) 50
      button(@click="setCardMode")
        svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6")
          path(stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z")
      button(@click="setListMode")
        svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6")
          path(stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5")
  main
    ul(:class="isCardMode ? 'grid-cols-2 sm:grid-cols-5' : 'grid-cols-1'").grid.gap-4
      CardView(v-for="user in paginatedData" :key="user.login.uuid" :user="user" @toggle-like="handleToggleLike(user)" :is-card-mode="isCardMode")
    Pagination(:current-page="state.pagination.currentPage" :total-pages="totalPages" @page-change="handlePageChange")
</template>
