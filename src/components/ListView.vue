<script setup>
import VLazy from 'v-lazy-image';
import InfoItem from './InfoItem.vue';
import SvgWrapper from './SvgWrapper.vue';

const props = defineProps({
  user: {
    type: Object,
    default: () => ({}),
  },
});

const locationSvg = {
  paths: [
    'M15 10.5a3 3 0 11-6 0 3 3 0 016 0z',
    'M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z',
  ],
  fill: 'none',
};

const phoneSvg = {
  paths: [
    'M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z',
  ],
  fill: 'none',
};

const emailSvg = {
  paths: [
    'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75',
  ],
  fill: 'none',
};

const likeSvg = {
  paths: [
    'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z',
  ],
};

const moreSvg = {
  paths: [
    'M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z',
  ],
  fill: 'none',
};
</script>
<template lang="pug">
div(class="relative w-full grid grid-cols-1_5 justify-center items-center rounded-lg bg-white shadow pr-8 md:pr-16")
  div(class="flex justify-center m-1 md:m-2")
    VLazy(:src="user.picture.large" :src-placeholder="user.picture.thumbnail" class="w-16 h-16 xs:w-20 xs:h-20 border-2 md:border-4 md:w-28 md:h-28 lg:w-28 lg:h-28 rounded-full border-violet-100")
  div(class="p-1 grid grid-cols-3_1 justify-start items-center text-left")
    p(class="text-lg font-medium sm:font-semibold md:text-2xl") {{ user.name.first }} {{ user.name.last }}
    span(class="text-sm md:text-xl lg:text-2xl") {{user.location.country}}
    span(class="text-sm md:text-xl lg:text-2xl") {{user.phone}}
    InfoItem(:svgIcon="emailSvg" :mail="user.email")
  div(class="absolute top-0 right-0 w-fit flex p-1")
    button(@click="$emit('modal-open', user)")
      SvgWrapper(:svgIcon="moreSvg")
  div(class="absolute bottom-0 right-0 w-fit flex p-1")
    button(@click="$emit('toggle-like', user)" :class="`z-10 flex justify-center items-center ${user.isLiked ? 'text-violet-600' : 'text-neutral-400' }`")
      SvgWrapper(:svgIcon="likeSvg" class="w-5 h-5 xs:w-6 xs:h-6 lg:w-8 lg:h-8")
</template>
