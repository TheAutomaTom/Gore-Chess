import "./infra/styles/index.scss";
import {createApp} from "vue";
import App from "/@/App.vue";
const _app = createApp(App);

import { createPinia } from "pinia";
_app.use(createPinia());

import router from "./infra/router";
_app.use(router);

// Prime Faces...
// import PrimeVue from "primevue/config";
// import primes from "./infra/components/prime-components";
// _app.use(PrimeVue);
// primes.forEach((element) => {
  // _app.component(element.name, element.component);
// });

_app.mount("#app");
