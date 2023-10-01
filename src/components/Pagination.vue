<script setup>
import { computed } from 'vue';
import Button from './Button.vue';

const props = defineProps({
  currentPage: {
    type: Number,
    default: 1,
  },
  totalPages: {
    type: Number,
  },
});

const renderPages = computed(() => {
  if (props.currentPage >= props.totalPages - 2)
    return [1, '...', props.totalPages - 2, props.totalPages - 1, props.totalPages];
  else if (props.currentPage <= 3) return [1, 2, 3, '...', props.totalPages];
  else
    return [
      1,
      '...',
      props.currentPage - 1,
      props.currentPage,
      props.currentPage + 1,
      '...',
      props.totalPages,
    ];
});

const emit = defineEmits(['page-change']);

const goToPage = (newPage) => {
  if (newPage >= 1 && newPage <= props.totalPages) {
    emit('page-change', newPage);
  }
};
</script>

<template lang="pug">
div(v-if="totalPages" class="flex gap-x-2 mx-auto my-0 justify-center text-lg md:text-2xl")
    Button(@click="goToPage(currentPage - 1)" :disabled="currentPage === 1") &lt;
    template(v-if="totalPages >=5" v-for="page in renderPages")
      Button(v-if="typeof page === 'number'" @click="goToPage(page)" :is-active="currentPage === page") {{ page }}
      span(v-else class=" flex items-end justify-center w-8 h-8") ...
    template(v-else)
      Button(v-for="page in totalPages" :key="page" @click="goToPage(page)" :is-active="page === currentPage") {{ page }}
    Button(@click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages") &gt;
</template>
