<script setup>
import SvgWrapper from './SvgWrapper.vue';
const { props } = defineProps({
  svgIcon: {
    type: Object,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  mail: {
    type: String,
    default: '',
  },
});
</script>
<template lang="pug">
li(class="flex items-center gap-2")
  SvgWrapper(:svgIcon="svgIcon")
  span(v-if="!mail") {{ text }}
  span(v-else)
    a(:href="'mailto:' + mail" target="_blank" rel="noopener noreferrer" class="text-violet-600 underline") {{text}}
</template>
