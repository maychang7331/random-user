import { ref, watch } from 'vue';
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
    favorites: [],
    pagination: {
      currentTab: CURRENT_TAB,
      currentPage: 1,
      itemsPerPage: ITEMS_PER_PAGE,
      isCardMode: IS_CARD_MODE,
    },
  });

  const init = function () {
    // init the state with locoal storage
    const storedFavorites =
      JSON.parse(localStorage.getItem('piniaStateFavorites')) || [];
    const storedPagination = JSON.parse(
      localStorage.getItem('piniaStatePagination'),
    ) || {
      currentTab: CURRENT_TAB,
      currentPage: 1,
      itemsPerPage: ITEMS_PER_PAGE,
      isCardMode: IS_CARD_MODE,
    };
    state.value.favorites = storedFavorites;
    state.value.pagination = storedPagination;
  };
  init();

  const createUserObject = function (data) {
    const usersWithIsLiked = data.results.map((user) => {
      const isLiked = state.value.favorites.some(
        (item) => item.login.uuid === user.login.uuid,
      );
      return {
        ...user,
        isLiked,
      };
    });
    state.value.all = usersWithIsLiked;
  };

  const fetchUserData = async function () {
    try {
      const res = await axios.get(
        `${API_URL}?results=${NUM_OF_DATA}&seed=${SEED}`,
      );
      createUserObject(res.data);
    } catch (err) {
      throw err;
    }
  };

  const toggleLike = function (user) {
    user.isLiked = !user.isLiked;

    if (user.isLiked) {
      addToFavorites(user);
    } else {
      removeFromFavorites(user);
    }
  };

  const addToFavorites = function (user) {
    if (!state.value.favorites.includes(user)) {
      state.value.favorites.push(user);
    }
  };

  const removeFromFavorites = function (user) {
    if (state.value.favorites.includes(user)) {
      const index = state.value.favorites.findIndex(
        (el) => el.login.uuid === user.login.uuid,
      );
      state.value.favorites.splice(index, 1);
    }
  };

  const setCardMode = () => (state.value.pagination.isCardMode = true);
  const setListMode = () => (state.value.pagination.isCardMode = false);

  watch(
    [state.value.favorites],
    ([favorites]) => {
      localStorage.setItem('piniaStateFavorites', JSON.stringify(favorites));
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
  };
});
