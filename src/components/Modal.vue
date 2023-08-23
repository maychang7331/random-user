<script setup>
const props = defineProps({
  user: {
    type: Object,
    default: () => ({}),
  },

  isModalOpen: {
    type: Boolean,
    default: false,
  },
});
</script>

<template lang="pug">
div(:class="isModalOpen?'fixed top-1_2 left-1_2 -translate-x-1_2 -translate-y-1_2 w-fit h-fit z-50 bg-white overflow-y-auto rounded-lg shadow-lg opacity-100 visible transition-all duration-500':'invisible opacity-0'")
  button(@click="$emit('close-modal')" ).cursor-pointer.absolute.top-2.right-2.text-3xl &times;
  div(class="flex flex-col gap-4 items-center px-3 py-4 text-center xs:flex-row xs:text-start xs:px-4 xs:py-6 sm:gap-8")
    figure(class="rounded-md w-20 h-20").rounded-lg.overflow-hidden.w-32.h-32
      img(:src="user.picture.large" :alt="`${user.name.first} ${user.name.last}`").w-full.h-full.object-cover
    div.flex.flex-col.w-fit
      p(class="text-base font-medium mb-1 sm:text-xl sm:font-semibold") {{ user.name.first }} {{ user.name.last }}
      ul(class="text-xs sm:text-sm").flex.flex-col.items-start.justify-center.text-start
        li.flex.items-center.justify-start
          div.block.pr-0_5.py-0_5.mr-1.self-start
            svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4")
              path( stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z")
              path( stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z") 
          span {{user.location.street.number}}, {{user.location.street.name}}, {{user.location.city}}, {{user.location.state}} {{user.location.postcode}}, {{ user.location.country }} 
        li.flex.items-center.justify-start
          div.block.pr-0_5.py-0_5.mr-1.self-start
            svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4")
              path(stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z")
          span {{user.phone}}
        li.flex.items-center.justify-start
          div.block.pr-0_5.py-0_5.mr-1.self-start
            svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4")
              path(stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75")
          span
            a(:href="'mailto:' + user.email" target="_blank" rel="noopener noreferrer").link {{user.email}}
</template>
