import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
//按需加载,当渲染其他页面时才加载其组件,并缓存,减少首屏加载时间
// const Index = resolve => require(['@/views/Index.vue'], resolve)
// const Category = resolve => require(['@/views/Category.vue'], resolve)
// const CategoryMain = resolve => require(['@/components/category/main.vue'], resolve)
// const Car = resolve => require(['@/views/Car.vue'],resolve)
// const User = resolve => require(['@/views/User.vue'], resolve)
// const Detail = resolve => require(['@/views/Detail.vue'], resolve)
// const Search = resolve => require(['@/views/Search.vue'], resolve)
// const Pay = resolve => require(['@/components/car/pay/pay.vue'], resolve)
// const Login = resolve => require(['@/views/login.vue'], resolve)
// const Order = resolve => require(['@/views/Order.vue'], resolve)
// const Address = resolve => require(['@/views/Address.vue'], resolve)
// const bindMobile = resolve => require(['@/views/bindMobile.vue'], resolve)
// const orderDetail = resolve => require(['@/views/orderDetail.vue'], resolve)
// const yaoqing = resolve => require(['@/views/yaoqing.vue'], resolve)
import Index from '@/views/Index.vue'
import Category from '@/views/Category.vue'
import CategoryMain from '@/components/category/main.vue'
import Car from '@/views/Car.vue'
import User from '@/views/User.vue'
import Detail from '@/views/Detail.vue'
import Search from '@/views/Search.vue'
import Pay from '@/components/car/pay/pay.vue'
import Login from '@/views/login.vue'
import Order from '@/views/Order.vue'
import Address from '@/views/Address.vue'
import bindMobile from '@/views/bindMobile.vue'
import orderDetail from '@/views/orderDetail.vue'
import yaoqing from '@/views/yaoqing.vue'
import active from '@/views/active.vue'


export default new Router({
  routes: [{
      path: '/',
      name: '首页',
      component: Index,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
    },
    }, {
      path: '/category',
      name: '分类页',
      redirect: '/category/all',
      component: Category,
      children: [{
        path: '/category/:tab',
        component:CategoryMain
      }]
    }, {
      path: '/car',
      name: '购物车页',
      component: Car
    }, {
      path: '/car/pay/:id',
      name: '支付页',
      component: Pay
    },
    {
      path: '/user',
      name: '用户页',
      component: User,
      meta: {
           requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
       },
    }, {
      path: '/detail/:id',
      name: '详情页',
      component: Detail
    }, {
      path: '/search',
      name: '搜索页',
      component: Search
    },{
      path: '/login',
      name: '登录页',
      component: Login
    },{
      path: '/order',
      name: '订单页',
      component: Order
    },{
      path: '/address',
      name: '地址页',
      component: Address
    },{
      path: '/bindMobile',
      name: '手机绑定页',
      component: bindMobile
    },{
      path: '/orderDetail/:id',
      name: '订单详情页',
      component: orderDetail
    },{
      path: '/yaoqing',
      name: '邀请码页',
      component: yaoqing
    },{
      path: '/active',
      name: '活动页',
      component: active
    }
  ]
})
