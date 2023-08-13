<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    default: 1,
  },
  totalPages: {
    type: Number,
  },
});

const emit = defineEmits(['page-change']);

const goToPage = (newPage) => {
  if (newPage >= 1 && newPage <= props.totalPages) {
    emit('page-change', newPage);
  }
};
</script>

<template lang="pug">
div
    button(@click="goToPage(currentPage - 1)" :disabled="currentPage === 1") &lt;
    button(v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="{ active: page === currentPage }") {{ page }}
    button(@click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages") &gt;
</template>
