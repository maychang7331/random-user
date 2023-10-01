import { ref, watch, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import {
  API_URL,
  NUM_OF_DATA,
  SEED,
  CURRENT_TAB,
  ITEMS_PER_PAGE,
  IS_CARD_MODE,
} from '../config.js';

export const useUserStore = defineStore('userStore', () => {
  // reactive ?
  const state = ref({
    all: [],
    // displayed: [],
    favorite: [],
    pagination: {
      currentTab: CURRENT_TAB,
      currentPage: 1,
      itemsPerPage: ITEMS_PER_PAGE,
      isCardMode: IS_CARD_MODE,
    },
  });

  const createUserObject = function (data) {
    const usersWithIsLiked = data.results.map((user) => {
      const isLiked = state.value.favorite.some((item) => item.login.uuid === user.login.uuid);
      return {
        ...user,
        isLiked,
      };
    });
    state.value.all = usersWithIsLiked;
  };

  const fetchUserData = async function () {
    try {
      const res = await axios.get(`${API_URL}?results=${NUM_OF_DATA}&seed=${SEED}`);
      createUserObject(res.data);
    } catch (err) {
      throw err;
    }
  };

  const init = async function () {
    // init the state with locoal storage
    const storedFavorite = JSON.parse(localStorage.getItem('piniaStateFavorite')) || [];
    const storedPagination = JSON.parse(localStorage.getItem('piniaStatePagination')) || {
      currentTab: CURRENT_TAB,
      currentPage: 1,
      itemsPerPage: ITEMS_PER_PAGE,
      isCardMode: IS_CARD_MODE,
    };
    state.value.favorite = storedFavorite;
    state.value.pagination = storedPagination;
    // try {
    //   console.log('Fetch!!!');
    //   await fetchUserData();
    // } catch (err) {
    //   console.error(`${err}`);
    //   // errMessage.value = `Error fetching User Data. ${err.response.status}`;
    // }
  };
  init();

  const toggleLike = function (user) {
    user.isLiked = !user.isLiked;

    if (user.isLiked) {
      addToFavorite(user);
    } else {
      removeFromFavorite(user);
    }
  };

  const addToFavorite = function (user) {
    if (!state.value.favorite.includes(user)) {
      state.value.favorite.push(user);
    }
  };

  const removeFromFavorite = function (user) {
    if (state.value.favorite.includes(user)) {
      const index = state.value.favorite.findIndex((el) => el.login.uuid === user.login.uuid);
      state.value.favorite.splice(index, 1);
    }
  };

  const setCardMode = () => (state.value.pagination.isCardMode = true);
  const setListMode = () => (state.value.pagination.isCardMode = false);
  const tabChange = (newTab) => {
    state.value.pagination.currentTab = newTab;
    state.value.pagination.currentPage = 1; // Reset page when changing tabs
  };
  const pageChange = (newPage) => {
    state.value.pagination.currentPage = newPage;
  };

  const itemsPerPageChange = () => (state.value.pagination.currentPage = 1);

  watch(
    [state.value.favorite],
    ([favorite]) => {
      localStorage.setItem('piniaStateFavorite', JSON.stringify(favorite));
    },
    { deep: true },
  );

  watch(
    [state.value.pagination],
    ([pagination]) => {
      localStorage.setItem('piniaStatePagination', JSON.stringify(pagination));
    },
    { deep: true },
  );

  return {
    state,
    fetchUserData,
    toggleLike,
    setCardMode,
    setListMode,
    tabChange,
    pageChange,
    itemsPerPageChange,
  };
});
