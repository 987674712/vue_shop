export default {
  // 获取
  getLocal (key) {
    return JSON.parse(window.localStorage.getItem(key))
  },
  // 设置用
  setLocal (res, key) {
    //第三个参数是true的话,会增加数据而不是重新设置,res必须是数组
    return window.localStorage.setItem(res,JSON.stringify(key))
  },
  // 获取
  getLocalString (key) {
    return window.localStorage.getItem(key)
  },
  // 设置用
  setLocalString (res, key) {
    //第三个参数是true的话,会增加数据而不是重新设置,res必须是数组
    return window.localStorage.setItem(res,key)
  },
  getTime(timestamp) {
    var date = new Date(timestamp);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    M.toString().length === 2?M = "0"+M:'';
    D.toString().length === 2?D = "0"+D:'';
    h.toString().length === 2?h = "0"+h:'';
    m.toString().length === 2?m = "0"+m:'';
    s.toString().length === 1?s = "0"+s:'';
    return Y+M+D+h+m+s;
  }
}
