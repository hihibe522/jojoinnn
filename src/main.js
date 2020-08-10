// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import store from './store'
import './bus';
import Toasted from 'vue-toasted';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'

// import VueSocketio from 'vue-socket.io';
// import socketio from 'socket.io-client';
// Vue.use(VueSocketio, socketio('ws://127.0.0.1:4000'));//与websocket服务端链接
// Vue.use(VueSocketio, socketio('http://localhost:4000'));//与websocket服务端链接

import VueSocketIO from 'vue-socket.io'
import socketio from "socket.io-client"

const url = `http://localhost:5000`;

router.afterEach((to, from) => {
  window.scrollTo(0,0);
})

Vue.use(new VueSocketIO({
    debug: true,
    connection: socketio(url),
}))

axios.defaults.baseURL="/api"
axios.defaults.withCredentials = true;
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);


const Options={
  theme: "bubble", 
  position: "top-center", 
  duration : 3000,
  className:"toasted_style"
}
Vue.use(Toasted,Options);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
