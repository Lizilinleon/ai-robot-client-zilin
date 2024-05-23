/*
 * @Description: 背景框架样式，路由页面必须引入（react-navigation不支持配置背景，直接每个页面单独引入）
 * @Author: LinHengJi
 * @Date: 2024-05-14
 * @LastEditTime: 2024-05-14 19:11:29
 * @LastEditors: LinHengJi
 * @E-mail: hengji.lin@richinfoai.com
 */
import React from 'react';
import {ImageBackground} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context'; // 安全区
const BackgroundImage = ({children}: any) => {
  // 基本信息==============================
  const homeBg = require('../assets/images/homeBg.png');

  return (
    <ImageBackground source={homeBg} style={{flex: 1}} resizeMode="cover">
      <SafeAreaProvider>
        <SafeAreaView style={{flex: 1}}>{children}</SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
};
export default BackgroundImage;
