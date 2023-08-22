<script setup>
import { computed } from 'vue';
const props = defineProps({
  key: Number,
  disabled: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
});

const btnClasses = computed(() =>
  [
    'flex',
    'items-center',
    'justify-center',
    'w-8',
    'h-8',
    props.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    props.isActive ? 'bg-teal-100' : 'bg-gray-200',
  ].join(' '),
);
</script>

<template lang="pug">
button(@click="$emit('click')" 
		:key="key" 
		:disabled="disabled"
    :class="btnClasses")
  slot
</template>
