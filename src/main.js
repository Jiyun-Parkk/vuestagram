import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import mitt from 'mitt';
import '@fortawesome/fontawesome-free/js/all.js';
import './registerServiceWorker';
let emitter = mitt();
let app = createApp(App);
//global 변수
app.config.globalProperties.emitter = emitter;
app.use(store).use(router).mount('#app');
