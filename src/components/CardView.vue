<script setup>
import { useUsersStore } from '../store/user.js';
const { toggleLike } = useUsersStore();

const props = defineProps({
  user: {
    type: Object,
    default: () => ({}),
  },
});

// const toggleLikeAndUpdateFavorites = function (user) {
//   toggleLike();
//   updateFavoriteUsers(user);
// };
</script>
<template lang="pug">
div
	figure
		img(:src="user.picture.medium" :alt="`${user.name.first} ${user.name.last}`")
	h4 {{ user.name.first }} {{ user.name.last }}
	p {{user.email}}
	ul
		li {{user.location.state}},{{ user.location.country }}
		li {{user.phone}}
			//- a(:href="mailto:" + user.email target="_blank" rel="noopener noreferrer") mail
	button(@click="()=>(toggleLike(user))") {{user.isLiked? "♥︎":'♡'}}
</template>
