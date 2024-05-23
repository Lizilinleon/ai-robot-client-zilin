/*
 * @Description: 存放一些简单的工具类方法
 * @Author: LinHengJi
 * @Date: 2024-05-16
 * @LastEditTime: 2024-05-16 10:44:09
 * @LastEditors: LinHengJi
 * @E-mail: hengji.lin@richinfoai.com
 */

// 生成随机二进制编码
const newGuid = () => {
  let s4 = () => ((65536 * (1 + Math.random())) | 0).toString(16).substring(1);
  return `${s4() + s4()}-${s4()}-4${s4().substr(0, 3)}-${s4()}-${s4() + s4() + s4()}`.toUpperCase();
};

export {newGuid};
