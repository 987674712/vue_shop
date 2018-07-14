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
  }
}
