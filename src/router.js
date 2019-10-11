import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.publicPath,
  routes: [
    {
      path: '/home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import('./views/Editor.vue'),
    },
    {
      path: '/examples',
      name: 'examples',
      component: () => import('./views/Examples.vue'),
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('./views/Blog.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./components/Authentication/Login/Login.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./components/Authentication/Signup/Signup.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./components/Profile/Profile.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/404',
      component: () => import('./components/NotFound/NotFound.vue'),
    },
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '*',
      redirect: '/404',
    },
  ],
  // eslint-disable-next-line
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});
