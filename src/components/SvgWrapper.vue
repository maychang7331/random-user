<script setup>
const { props } = defineProps({
  svgIcon: {
    type: Object,
  },
});
</script>
<template lang="pug">
div(class="block w-4 h-4 xs:w-5 xs:h-5 lg:w-6 lg:h-6")
  svg(
    xmlns="http://www.w3.org/2000/svg"
    :fill="svgIcon.fill || 'currentColor'"
    viewBox="0 0 24 24"
    :stroke-width="svgIcon.strokeWidth || '2'"
    :stroke="svgIcon.stroke || 'currentColor'"
    class="w-full h-full")
    path(v-for="(path, index) in svgIcon.paths" :key="index" :d="path" stroke-linejoin="round")
</template>
