import axios from 'axios'
import store from '@/vuex/store.js'
import router from '../router'

const api = axios.create();
// 正式域名
api.defaults.baseURL = 'http://www.nazoubei.com';
// api.defaults.baseURL = '/api';
// api.defaults.params = {userId:localStorage.getItem('userId')};
// api.defaults.data = {userId:localStorage.getItem('userId')};
// api.defaults.timeout = 5000;
// api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// api.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'

// 请求拦截
api.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // store.commit('SET_LOADING',true);
    // 如果有token,添加到请求报文 后台会根据该报文返回status
    // if(store.state.login.token) {
    //   config.headers.Authorization = `token ${store.state.login.token}`;
    // }
  function randomString(len) {
    len = len || 32;
    let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    let maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }
  let appId = randomString(32);
  let nonce = randomString(32);
  config.headers.appId = appId;
  config.headers.nonce = nonce;
  config.headers.sign = md5(appId+nonce+'nazoubeicom').toUpperCase();
  if(config.method === 'get'){
    if(localStorage.getItem('user')){
      config.params = Object.assign({userId:JSON.parse(localStorage.getItem('user')).id},config.params)
    }
  }
  if(config.method === 'post'){
    if(localStorage.getItem('user')){
      config.data = Object.assign({userId:JSON.parse(localStorage.getItem('user')).id},config.data)
    }
  }
    return config;

  }, function (error) {
    // 对请求错误做些什么
    alert('网络错误,请稍后再试');

    store.commit('SET_LOADING',false);

    return Promise.reject(error);
  });

// 添加响应拦截器
api.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // 加到时器主要是为了 展示Loading效果 项目中应去除
    setTimeout(()=>{
      store.commit('SET_LOADING',false);
    },300)

    return response;

  }, function (error) {
    // 对响应错误做点什么
    store.commit('SET_LOADING',false);

    if(error.response) {

      if(error.response.status== 401) {
          // 如果返回401 即没有权限，跳到登录页重新登录
        store.commit('CHANGE_TOKEN',0);

        alert('请重新登录');

        router.replace({
          path: 'login',
          query: {redirect: router.currentRoute.fullPath}
        })

      }
    }

    return Promise.reject(error);
  });
export default api
