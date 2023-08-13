import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('userStore', () => {
  // reactive ?
  const state = ref({
    all: [],
    favorites: [],
    currentPage: 1,
    itemsPerPage: 10,
  });

  const createUserObject = function (data) {
    const usersWithIsLiked = data.results.map((user) => ({
      ...user,
      isLiked: false,
    }));
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

  return {
    state,
    fetchUserData,
    toggleLike,
  };
});
