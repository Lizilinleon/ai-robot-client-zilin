/*
 * @Description: 本地存储
 * @Author: LinHengJi
 * @Date: 2024-05-10
 * @LastEditTime: 2024-05-10 09:56:50
 * @LastEditors: LinHengJi
 * @E-mail: hengji.lin@richinfoai.com
 */

import AsyncStorage from '@react-native-community/async-storage';

// 设置本地存储
const setAsyncStorage = async (key: any, value: any) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};

// 获取本地存储
const getAsyncStorage = async (key: any) => {
  let value = null;
  try {
    value = await AsyncStorage.getItem(key);
  } catch (e) {
    console.error(e);
  }
  return value;
};

// 删除本地存储
const removeAsyncStorage = async (key: any) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(e);
  }
};

export {setAsyncStorage, getAsyncStorage, removeAsyncStorage};
