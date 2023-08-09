import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useUsersStore = defineStore('users', () => {
  const users = ref({});
  const favoriteUsers = ref([]);
  const pageSize = ref(10);

  // Fetch user data
  const createUserObject = function (data) {
    const usersWithIsLiked = data.results.map((user) => ({
      ...user,
      isLiked: false,
    }));
    users.value = usersWithIsLiked;
  };

  const fetchUserData = async function (url) {
    try {
      const res = await axios.get(
        // `https://randomuser.me/api/?results=3010&seed=test`,
        `http://jsonblob.com/api/1138688680960843776`,
      );
      createUserObject(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleLike = function (user) {
    user.isLiked = !user.isLiked;

    if (favoriteUsers.value.includes(user)) {
      const index = favoriteUsers.value.findIndex(
        (el) => el.login.uuid === user.login.uuid,
      );
      favoriteUsers.value.splice(index, 1);
    } else {
      favoriteUsers.value.push(user);
    }
  };

  return { users, favoriteUsers, pageSize, fetchUserData, toggleLike };
});
