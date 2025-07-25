import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

const app = createApp(App);
const pinia = createPinia(); // ✅ Solo una vez

app.use(pinia);              // ✅ Usa esta
app.use(router);

app.mount('#app');
