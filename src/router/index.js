import Vue from 'vue'
import VueRouter from 'vue-router'
import Post from '../views/Post.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/post/:id',
    name: 'Post',
    component: Post
  },
  /*{
    path: '/product/:name',
    name: 'About',
    component: () => import('../views/About.vue')
  },*/
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
