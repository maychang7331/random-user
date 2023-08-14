import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('userStore', () => {
  // reactive ?
  const state = ref({
    all: [],
    favorites: [],
    pagination: {
      currentTab: 'all',
      currentPage: 1,
      itemsPerPage: 10,
    },
  });

  const init = function () {
    const storedFavorites =
      JSON.parse(localStorage.getItem('piniaStateFavorites')) || [];
    const storedPagination = JSON.parse(
      localStorage.getItem('piniaStatePagination'),
    ) || {
      currentTab: 'all',
      currentPage: 1,
      itemsPerPage: 10,
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

  const fetchUserData = async function (url) {
    try {
      const res = await axios.get(
        `https://randomuser.me/api/?results=34&seed=test2`,
        // `http://jsonblob.com/api/1138688680960843776`,
      );
      createUserObject(res.data);
    } catch (err) {
      console.error(err);
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

  watch(
    [state.value.favorites],
    ([favorites]) => {
      console.log('Fav Save~~~~~');
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
  };
});
