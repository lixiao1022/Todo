import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(Router);

const router = new Router({
    routes: [{
        path: '/',
        name: 'home',
        component: Home
    }, {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
    }, {
        path: '/404',
        name: '404',
        component: () => import('../views/404.vue')
    }, {
        path: '/*',
        redirect: '/404'
    }]
});

router.beforeEach((to, from, next) => {
    const user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {};
    if (to.path == '/login') {
        if (user._id) {
            // 已经登录过了，跳转到首页
            next('/');
        } else {
            // 没有登录，访问login
            next();
        }
    } else {
        if (user._id) {
            // 已经登录过了，跳转到首页
            next();
        } else {
            // 没有登录想访问其他的，跳转到登录页面
            next('/login');
        }
    }
});

export default router;