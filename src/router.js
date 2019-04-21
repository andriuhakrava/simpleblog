import Vue from 'vue'
import Router from 'vue-router'
import PostsList from './views/PostsList.vue'
import Signin from './views/Signin.vue'
import Signup from './views/Signup.vue'
import NewPost from './views/NewPost.vue'
import UsersList from './views/UsersList.vue'
import store from './store'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'postslist',
      component: PostsList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/new',
      name: 'newpost',
      component: NewPost,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/userslist',
      name: 'userslist',
      component: UsersList,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(localStorage.getItem('jwt')){
      store.dispatch('verifyToken');
      next(); 
    } else {
      next('/signin');  
    }
  } else {
    next();
  }
});