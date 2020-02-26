import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
//懒加载
const Home = () => import('../views/Home/Home')
const Cart = () => import('../views/Cart/Cart')
const Category = () => import('../views/Category/Category')
const Profile = () => import('../views/Profile/Profile')
const Detail = () => import('../views/Detail/Detail')

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/category',
      component:Category
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/detail/:iid',  /*iid从vue.devtool中看到*/
      component: Detail
    }
  ],
  mode:'history'
})
