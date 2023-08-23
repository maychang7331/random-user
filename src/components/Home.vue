<script setup>
import { ref, onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useUserStore } from '../store/UserStore.js';
import CardView from './CardView.vue';
import Pagination from './Pagination.vue';
import Modal from './Modal.vue';
const userStore = useUserStore();
const { fetchUserData, toggleLike } = useUserStore();
const { state } = storeToRefs(userStore);

const isCardMode = ref(true);
const isModalOpen = ref(false);
const selectedUser = ref(null);
const errMessage = ref('');

onMounted(async () => {
  try {
    await fetchUserData();
  } catch (err) {
    console.error(`${err}`);
    errMessage.value = `Error fetching User Data. ${err.response.status}`;
  }
});

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

const changeTab = function (newCurrentTab) {
  state.value.pagination.currentTab = newCurrentTab;
  state.value.pagination.currentPage = 1; // Reset page when changing tabs
};

const handleItemsPerPageChange = () => (state.value.pagination.currentPage = 1);

const setCardMode = () => (isCardMode.value = true);
const setListMode = () => (isCardMode.value = false);

const handlePageChange = (newPage) => {
  state.value.pagination.currentPage = newPage;
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};

const handleToggleLike = (user) => {
  toggleLike(user);
};

const handleModalOpen = (e, user) => {
  // prevent modalOpen being triggered by like button and email link
  if (
    e.target.tagName.toLowerCase() === 'path' ||
    e.target.tagName.toLowerCase() === 'svg' ||
    e.target.tagName.toLowerCase() === 'a'
  )
    return;
  isModalOpen.value = true;
  selectedUser.value = user;
};

const handleModalClose = () => {
  isModalOpen.value = false;
  selectedUser.value = null;
};
</script>

<template lang="pug">
div.h-screen.z-0.mx-auto.px-4.xs_px-8.sm_px-2.lg_px-8
  header.h-6.flex.items-center.justify-between.mx-2.my-6
    div.flex.gap-2.font-medium
      a(href="" @click.prevent="changeTab('all')" :class="state.pagination.currentTab === 'all' && 'active'").link All
      a(href="" @click.prevent="changeTab('favorites')" :class="state.pagination.currentTab === 'favorites' && 'active'").link Favorite
    div.flex.gap-2.items-center
      select(@change="handleItemsPerPageChange" v-model.number="state.pagination.itemsPerPage")
        option(value=10) 10
        option(value=30) 30
        option(value=50) 50
      button(@click="setCardMode" :class="isCardMode ? 'text-red-600':''")
        svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6")
          path(stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z")
      button(@click="setListMode" :class="isCardMode ? '':'text-red-600'")
        svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6")
          path(stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5")
  main
    template(v-if="errMessage")
      p.text-center.font-bold.text-gray-500.text-xl.py-8 {{errMessage}}
    template(v-else)
      template(v-if="!paginatedData.length && state.pagination.currentTab === 'all'")
        p.text-center.font-bold.text-gray-500.text-xl.py-8 Loading ...
      template(v-else-if="!paginatedData.length && state.pagination.currentTab === 'favorites'")
        p.text-center.font-bold.text-gray-500.text-xl.py-8 Click the like button to store favorites !
      template(v-else)
        ul(:class="isCardMode ? 'grid-cols-2 sm:grid-cols-5' : 'grid-cols-1'").grid.gap-4
          CardView(v-for="user in paginatedData" :key="user.login.uuid" :user="user" @toggle-like="handleToggleLike(user)" @click="(e) => handleModalOpen(e, user)" :is-card-mode="isCardMode")
        Pagination(:current-page="state.pagination.currentPage" :total-pages="totalPages" @page-change="handlePageChange")
  div(v-if="isModalOpen" @click="handleModalClose" :class="isModalOpen?'fixed top-0 left-0 w-screen h-screen z-10 bg-black/40 backdrop-blur-sm opacity-100 visible transition-all duration-500':'opacity-0 invisible'")
  Modal(v-if="isModalOpen" @close-modal="handleModalClose" :user="selectedUser" :is-modal-open="isModalOpen")
</template>
