<script setup>
import { ref, onMounted, computed, reactive, watch } from 'vue';
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

const currentTab = ref('all');
const changeTab = function (newCurrentTab) {
  currentTab.value = newCurrentTab;
  state.value.currentPage = 1; // Reset page when changing tabs
};

const paginatedData = computed(() => {
  if (!state.value[currentTab.value]) return '';

  const start = (state.value.currentPage - 1) * state.value.itemsPerPage; // 0;
  const end = state.value.currentPage * state.value.itemsPerPage; // 9
  return state.value[currentTab.value].slice(start, end);
});

const totalPages = computed(() => {
  if (!state.value[currentTab.value]) return 1;
  else
    return Math.ceil(
      state.value[currentTab.value].length / state.value.itemsPerPage,
    );
});

const handlePageChange = (newPage) => {
  state.value.currentPage = newPage;
};

const handleToggleLike = (user) => {
  toggleLike(user);
};
</script>

<template lang="pug">
header
	button(@click="changeTab('all')") All
	button(@click="changeTab('favorites')") Favorite
	select(v-model.number="state.itemsPerPage")
		option(value=10) 10
		option(value=30) 30
		option(value=50) 50
main
	CardView(v-for="user in paginatedData" :key="user.login.uuid" :user="user" @toggle-like="handleToggleLike(user)")
	Pagination(:current-page="state.currentPage" :total-pages="totalPages" @page-change="handlePageChange")
</template>
