import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/login/login.vue';
import Home from '@/components/home/home.vue';
import Blogs from '@/components/blogs/blogs.vue';
import BlogEdit from '@/components/blogs/blogEdit.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children:[
        {
          name: 'blogs',
          path: 'blogs',
          component: Blogs
        },
        {
          path: 'blog/:id',
          component: BlogEdit
        }
      ]
    }
  ],
});
