import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import userList from './views/admin/userList'
import orderList from './views/admin/orderList'
import daili from './views/admin/daili'
import caiwu from './views/admin/caiwu'
import zhijinji from './views/admin/zhijinji'
import fenxi from './views/admin/fenxi'

let routes = [
  {
    path: '/login',
    component: Login,
    name: '',
    hidden: true
  },
  {
    path: '/404',
    component: NotFound,
    name: '',
    hidden: true
  },
  //{ path: '/main', component: Main },
  {
    path: '/',
    component: Home,
    name: '订单管理',
    iconCls: 'el-icon-menu',//图标样式class
    leaf: true,//只有一个节点
    children: [
      // { path: '/main', component: Main, name: '主页', hidden: true },
      {path: '/orderList', component: orderList, name: '订单管理'}
    ]
  },
  {
    path: '/',
    component: Home,
    name: '代理会员',
    iconCls: 'el-icon-menu',//图标样式class
    leaf: true,//只有一个节点
    children: [
      // { path: '/main', component: Main, name: '主页', hidden: true },
      {path: '/daili', component: daili, name: '代理会员'}
    ]
  },
  {
    path: '/',
    component: Home,
    name: '财务管理',
    iconCls: 'el-icon-menu',//图标样式class
    leaf: true,//只有一个节点
    children: [
      // { path: '/main', component: Main, name: '主页', hidden: true },
      {path: '/caiwu', component: caiwu, name: '财务管理'}
    ]
  },
  {
    path: '/',
    component: Home,
    name: '纸巾机',
    iconCls: 'el-icon-menu',//图标样式class
    leaf: true,//只有一个节点
    children: [
      // { path: '/main', component: Main, name: '主页', hidden: true },
      {path: '/zhijinji', component: zhijinji, name: '纸巾机'}
    ]
  },
  {
    path: '/',
    component: Home,
    name: '数据分析',
    iconCls: 'el-icon-menu',//图标样式class
    leaf: true,//只有一个节点
    children: [
      // { path: '/main', component: Main, name: '主页', hidden: true },
      {path: '/fenxi', component: fenxi, name: '数据分析'}
    ]
  },
  // {
  //     path: '/',
  //     component: Home,
  //     name: '导航二',
  //     iconCls: 'fa fa-id-card-o',
  //     children: [
  //         { path: '/page4', component: Page4, name: '页面4' },
  //         { path: '/page5', component: Page5, name: '页面5' }
  //     ]
  // },
  // {
  //     path: '/',
  //     component: Home,
  //     name: '',
  //     iconCls: 'fa fa-address-card',
  //     leaf: true,//只有一个节点
  //     children: [
  //         { path: '/page6', component: Page6, name: '导航三' }
  //     ]
  // },
  // {
  //     path: '/',
  //     component: Home,
  //     name: 'Charts',
  //     iconCls: 'fa fa-bar-chart',
  //     children: [
  //         { path: '/echarts', component: echarts, name: 'echarts' }
  //     ]
  // },
  {
    path: '*',
    hidden: true,
    redirect: {path: '/404'}
  }
];

export default routes;