# Random User

A contact card application([Live Demo](https://front-random-user.netlify.app/)) build with Vite, uses Vue 3 (Composition API) as framework, featuring the following tech stack:

- [**Tailwind**](https://tailwindcss.com/) - for CSS styling
- **Pug** - for simplified HTML sytax
- [**Pinia**](https://pinia.vuejs.org/) - for states storing and sharing

## Project Setup

```
$ git clone https://github.com/maychang7331/random-user.git
$ npm install
```

Where `npm install` reaches into the package.json file, and install the all dependencies needed. (See "Start from scratch" if you want to set up each dependency individually.)

#### Compile and development

```
$ npm run dev
```

#### Production

```
$ npm run build
```

#### Preview the build locally

```
$ npm run preview
```

#### Deploy

This application is deployed using [Netlify](https://www.netlify.com/):

1. Add new site, select Deploy manually
2. Create a file named `netlify.toml` in the dist folder and the root folder with following content:
   ```
   [[redirects]]
   from = "/*"
   to = "/index.html"
   status = 200
   ```
3. Drag-n-drop the dist folder for deployment

## Start From Scratch

#### Environment

1. [Install Tailwind CSS with Vite using Vue](https://tailwindcss.com/docs/guides/vite#vue)
2. Install [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) for sorting Tailwind classes automatically
3. Install pug using `npm i vue-cli-plugin-pug` ([reference](https://medium.com/itsems-frontend/adding-pug-sass-to-your-project-a77668123f6b))
4. `npm i -D @vue/language-plugin-pug` (Vscode warning, solves "CardView import but not used") ([reference](https://www.npmjs.com/package/@vue/language-plugin-pug))
5. `npm install axios` for fetching API
6. `npm install pinia`

## Q & A

1. Missuse reactive to declare state properties in Pinia.

   ##### Problem Reproduction

   ```js
      // UserStore.js
      import { reactive } from 'vue';
      import { defineStore } from 'pinia';
      import axios from 'axios';

      export const useUserStore = defineStore('userStore', () => {
      const state = reactive({
         users: [],
         favorites: [],
         currentPage: 1,
         itemsPerPage: 10,
      });
   ```

   ```js
      // Home.vue
   	const userStore = useUserStore();
   	const { state } = storeToRefs(userStore);
   	const tabName = ref('all');
   	const data = computed(() => {
   	switch (tabName.value) {
   		case 'all':
   			return state.all;
   		case 'favorites':
   			return state.favorites;
   		default:
   			return state.all;
     }
   });

      console.log(state);            // ObjectRefImpl
      console.log(state.all);        // undefined
      console.log(state.value.all);  // Proxy(Array)
      console.log(data);             // ComputedRefImpl

      <template lang="pug">
      p {{state}}            // { "all": [], "favorites": [] }
      p {{state.all}}        // []
      p {{state.value.all}}  // NOTHING RENDERED
      p {{data}}             // NOTHING RENDERED
      </template>
   ```

   ##### Note

   - `ref` : returns RefImpl, need `.value` to access value
   - `reactive` : returns Proxy, NO need `.value` to access value
     But why do we need `.value` to access data when using reactive inside a pinia? Is it possible that we use reactive to declare state properties? Since no example can be found, and also said in the documentation that `ref` is used to declare the state properties, I decide NOT to use reactive in pinia store.

2. ModalOpen being triggered by clicking the like button and email link ☞ sol: check the element of which the event is originated using `e.target.tagName` together with Guard clause

3. Why does the favorites and pagination fails to persist between re-fresh if the `init` function is written in the `onMount` of `Home.vue` ⨯ NOT yet figured out
4. Modal closing isn't smooth, i.e., the transtion seems to be only apply when modal open. ☞ sol: [Issue#436](https://github.com/saadeghi/daisyui/issues/436)
