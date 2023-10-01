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
    'w-10',
    'h-10',
    'p-2',
    'md:w-12',
    'md:h-12',
    'md:p-4',
    'md:border-1_8',
    'rounded-md',
    'bg-transparent',
    'border-1_4',
    props.disabled ? 'cursor-not-allowed text-neutral-400' : 'cursor-pointer',
    props.isActive ? 'border-violet-600 text-violet-600' : 'border-neutral-300',
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
