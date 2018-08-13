import axios from 'axios';
import { Message } from 'element-ui';
let base = 'http://www.nazoubei.com/';
// let base = '/api/';
// let base = 'http://' + location.host + '/cmsapi/v1/';
let devBase = '';


export const $axios = axios;

export const $url = base;

export const $get = function (url, data, headers,event) {
  headers = headers || {};
  headers.token = sessionStorage.getItem('token')?JSON.parse(sessionStorage.getItem('token')):null;
  let postUrl = base + url;
  return axios({
    method: 'get',
    url: postUrl,
    params: data,
    headers: headers
  }).then(res => {
    if(res.data.code === 1013){
      window.location.href = './#/login'
    }if(res.data.code === 1000){
      if(res.data.data !== undefined&&res.data.data !== 'undefined'){
        if(res.data.data.startRow !== undefined&&res.data.data.startRow !== 'undefined'){
          // res.data.data.startRow++
          for (let i = 0;i<res.data.data.list.length;i++){
            res.data.data.list[i].index = res.data.data.startRow++
          }
        }
      }
      return res.data
    }else{
      Message({
        message: res.data.message,
        type: 'error'
      });
      if(event){
        event.editLoading = false;
        event.addLoading = false;
        event.listLoading = false;
      }
      return false
    }
  })
};

export const $post = function (url, data, headers,event) {
  // return axios.post(`${base}/login`, params).then(res => res.data);
  headers = headers || {};
  headers.token = sessionStorage.getItem('token')?JSON.parse(sessionStorage.getItem('token')):null;
  let postUrl = base + url;
  console.log(postUrl)
  delete data.index;
  return axios({
    method: 'post',
    url: postUrl,
    data: data,
    headers: headers
  }).then(res => {
    if(res.data.code === 1013){
      window.location.href = './#/login'
    }if(res.data.code === 1000){
      if(res.data.data !== undefined&&res.data.data !== 'undefined'){
        if(res.data.data.startRow !== undefined&&res.data.data.startRow !== 'undefined'){
          // res.data.data.startRow++
          for (let i = 0;i<res.data.data.list.length;i++){
            res.data.data.list[i].index = res.data.data.startRow++
          }
        }
      }
      return res.data
    }else{
      Message({
        message: res.data.message,
        type: 'error'
      });
      if(event){
        event.editLoading = false;
        event.addLoading = false;
        event.listLoading = false;
      }
      console.log('服务请求异常')
      console.log('错误代码：',res.data.code)
      console.log('错误信息：',res.data.message)
      throw 0;
    }
  })
};