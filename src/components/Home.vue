<script setup>
import { ref, onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useUserStore } from '../store/UserStore.js';
import SvgWrapper from './SvgWrapper.vue';
import All from './All.vue';
import Favorite from './Favorite.vue';
import Pagination from './Pagination.vue';
import Modal from './Modal.vue';
const userStore = useUserStore();
const {
  fetchUserData,
  toggleLike,
  setCardMode,
  setListMode,
  tabChange,
  pageChange,
  itemsPerPageChange,
} = useUserStore();
const { state } = storeToRefs(userStore);

const isModalOpen = ref(false);
const selectedUser = ref(null);
const errMessage = ref('');
const cardSvg = {
  paths: [
    'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z',
  ],
  stroke: 'none',
};

const listSvg = {
  paths: [
    'M5,7h2h12c1.1,0,2-0.9,2-2s-0.9-2-2-2H7H5C3.9,3,3,3.9,3,5S3.9,7,5,7z',
    'M19,10h-3H5c-1.1,0-2,0.9-2,2s0.9,2,2,2h11h3c1.1,0,2-0.9,2-2S20.1,10,19,10z',
    'M19,17h-6H5c-1.1,0-2,0.9-2,2s0.9,2,2,2h8h6c1.1,0,2-0.9,2-2S20.1,17,19,17z',
  ],
  stroke: 'none',
};

onMounted(async () => {
  try {
    await fetchUserData();
  } catch (err) {
    console.error(`${err}`);
    errMessage.value = `Error fetching User Data. ${err.response.status}`;
  }
});

const totalPages = computed(() => {
  if (!state.value[state.value.pagination.currentTab]) return 1;
  else
    return Math.ceil(
      state.value[state.value.pagination.currentTab].length / state.value.pagination.itemsPerPage,
    );
});

const handlePageChange = (newPage) => {
  pageChange(newPage);
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};

const handleToggleLike = (user) => {
  toggleLike(user);
};

const handleModalOpen = (user) => {
  isModalOpen.value = true;
  selectedUser.value = user;
};

const handleModalClose = () => {
  isModalOpen.value = false;
  selectedUser.value = null;
};
</script>

<template lang="pug">
header(class="h-16 xs:h-20 sm:h-24 md:h-32 flex items-center justify-between px-4 md:px-8 text-lg sm:text-2xl font-normal")
  div(class="flex gap-4 text-violet-500 font-semibold")
    button(@click.prevent="tabChange('all')" :class="`${state.pagination.currentTab === 'all'? 'border-b border-violet-900 text-violet-900': 'border-transparent'} transition-all border-b-2`") All
    button(@click.prevent="tabChange('favorite')" :class="`${state.pagination.currentTab === 'favorite' ? 'border-b border-violet-900 text-violet-900': 'border-transparent'} transition-all border-b-2`") Favorite
  div(class="flex gap-2 items-center")
    select(@change="itemsPerPageChange" v-model.number="state.pagination.itemsPerPage" class="border-1_4 rounded-md focus:outline-0")
      option(value=10) 10
      option(value=30) 30
      option(value=50) 50
    button(@click="setCardMode" :class="`${(state.pagination.isCardMode===true) ? 'text-violet-400' : 'text-neutral-400' }`")
      SvgWrapper(:svgIcon="cardSvg" class="w-6 h-6 xs:w-8 xs:h-8 lg:w-8 lg:h-8")
    button(@click="setListMode" :class="`${(state.pagination.isCardMode===false) ? 'text-violet-400' : 'text-neutral-400' }`")
      SvgWrapper(:svgIcon="listSvg" class="w-6 h-6 xs:w-8 xs:h-8 lg:w-8 lg:h-8")
main(class="px-4 xs:px-8 sm:px-4 lg:px-10 pb-10")
  p(v-if="errMessage" class="text-center text-xl font-bold text-red-600 py-8") {{errMessage}}
  All(v-if="state.pagination.currentTab === 'all'" @toggle-like="handleToggleLike($event)" @modal-open="handleModalOpen($event)")
  Favorite(v-else @toggle-like="handleToggleLike($event)" @modal-open="handleModalOpen($event)")
  Pagination(:current-page="state.pagination.currentPage" :total-pages="totalPages" @page-change="handlePageChange")
div(v-if="isModalOpen" @click="handleModalClose" :class="isModalOpen?'fixed top-0 left-0 w-screen h-screen z-10 bg-black/40 backdrop-blur-sm opacity-100 visible transition-all duration-500':'opacity-0 invisible'")
Modal(v-if="isModalOpen" @close-modal="handleModalClose" :user="selectedUser" :is-modal-open="isModalOpen")
</template>
