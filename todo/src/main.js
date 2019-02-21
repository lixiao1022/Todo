import Vue from 'vue';
import App from './App.vue';
import router from './router/';
import store from './store/';

import extend from './utils/extend';

Vue.config.productionTip = false;

extend(Vue.prototype);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');