/**
 * 获取地址栏参数
 * @param {*} name
 */
export function getQueryString(name) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURI(r[2]);
  }
  return '';
}
/**
 * 替换指定传入参数的值,paramName为参数,replaceWith为新值
 * @param {*} paramName
 * @param {*} replaceWith
 */
export function replaceParamVal(paramName, replaceWith) {
  const state = { title: '', url: window.location.href };
  window.history.pushState(state, '', `${window.location.pathname}?${paramName}=${replaceWith}`);
}
/**
  * 获取本地存储
  * @param key 键
  * @param data 数据
  * @param expires 有效期
  * @returns {*}
  */
export function localStore(key, data, expires) {
  /**
   * 基于本地存储的缓存模块
   *
   * @param {String} key 键名
   * @param {any} data 数据
   * @param {Number} expires 有效期(秒), 0永久
   * @returns {any}
   *
   * 使用例子：
   * localStore('aaa', { a: 1 }); //  永久存储
   * localStore('bbb', { b: 2 }, 3); //  存储3秒
   *
   * setTimeout(function() {
   *     console.log(localStore('aaa'), localStore('bbb')); //  {a: 1} {b: 2}
   * }, 1000);
   *
   * setTimeout(function() {
   *     console.log(localStore('aaa'), localStore('bbb')); //  {a: 1} undefined
   * }, 4000);
   */
  const localStorage = window.localStorage;
  //  不兼容返回空
  if (!localStorage) {
    return undefined;
  }
  const now = +new Date(); //  当前时间戳
  //  有值则存储数据
  if (data) {
    const storeData = {
      data,
      expires: 0, //  有效期
    };
    if (expires) {
      storeData.expires = now + (expires * 1000); //  到期时间戳
    }
    //  无法存入情况
    try {
      return localStorage.setItem(key, JSON.stringify(storeData));
    } catch (er) {
      //  不做处理统一返回
    }
  } else {
    //  获取数据
    try {
      const storeData = JSON.parse(localStorage.getItem(key));
      if (storeData.expires === 0 || now <= storeData.expires) {
        return storeData.data;
      }
      return localStorage.removeItem(key); //  清理过期数据
    } catch (er) {
      //  不做处理统一返回
    }
  }
  return undefined;
}
