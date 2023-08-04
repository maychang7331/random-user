<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";

const users = ref([]);
const usersPerPage = ref(10);
const isCardView = ref(true);

// Fetch users from the API on component mount
onMounted(async () => {
  await fetchUserData();
});

// Fetch user data
const fetchUserData = async function (url) {
  try {
    const res = await axios.get(`https://randomuser.me/api/?results=3010`);
    users.value = res.data.results;
  } catch (err) {
    console.error(err);
  }
};

// Functions to change view
const setCardView = () => {
  isCardView.value = true;
};

const setListView = () => {
  isCardView.value = false;
};
</script>

<template lang="pug">
nav
	RouterLink(to="/all") All
	RouterLink(to="/favorite") Favorite

select(v-model.number="usersPerPage")
	option(value=10) 10
	option(value=30) 30
	option(value=50) 50

button(@click="setCardView")
	svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6")
		path(stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z")
button(@click="setListView")
	svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6")
		path(stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5")

RouterView
</template>
