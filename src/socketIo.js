import VueSocketIo from 'vue-socket.io';
import Vue from 'vue';

const option = { connection: 'http://localhost:5000' };
const client = new VueSocketIo(option);

Vue.use(client);
