<script setup>
const props = defineProps({
  user: {
    type: Object,
    default: () => ({}),
  },

  isCardMode: {
    type: Boolean,
    default: true,
  },
});
</script>

<template lang="pug">
li(@click="$emit('open-modal',user)" :class="isCardMode?'flex-col':'flex-row'" class="p-2 xs:p-4 sm:p-1 lg:p-4").flex.rounded-lg.border-solid.border-2.border-neutral-300.items-center
  figure(:class="isCardMode ?'mb-2':'mr-4'" class="xs:w-28 xs:h-28 sm:w-20 sm:h-20 lg:w-22 lg:h-22").rounded-full.overflow-hidden.w-20.h-20
    img(:src="user.picture.large" :alt="`${user.name.first} ${user.name.last}`").w-full.h-full.object-cover
  div(:class="isCardMode ?'mx-auto mb-2':'mr-auto'").flex.flex-col
    p(:class="isCardMode ?'text-center sm:text-sm':'text-left sm:text-base'" class="text-sm font-semibold mb-1 xs:text-lg xs:mb-2 sm:font-medium lg:text-base lg:mb-2 lg:font-semibold") {{ user.name.first }} {{ user.name.last }}
    ul(class="text-xs xs:text-sm xs:gap-1 sm:gap-0").flex.flex-col.items-start.justify-center
      li.flex.items-center.justify-start
        div.block.pr-0_5.py-0_5.mr-1.self-start
          svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4")
            path( stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z")
            path( stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z") 
        //- span {{user.location.state}},{{ user.location.country }}
        span {{ user.location.country }}
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
          a(:href="'mailto:' + user.email" target="_blank" rel="noopener noreferrer").link email me
  div(:class="isCardMode ? 'mb-2 self-end':'mr-2 items-center'").flex
      button(@click="$emit('toggle-like', user)")
        template(v-if="user.isLiked")
          svg(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5")
            path(d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z")
        template(v-else)
          svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5")
            path(stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z")
</template>
