/*
 * @Description: 路由根目录
 * @Author: LinHengJi
 * @Date: 2024-05-08
 * @LastEditTime: 2024-05-08 11:01:08
 * @LastEditors: LinHengJi
 * @version: 1.0yan
 */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Button, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../pages/home';
import ForMe from '../pages/forMe';
import Discover from '../pages/discover';
import Aboutme from '../pages/AboutMe';
import Setting from '../pages/Setting';
import Device_Setting from '../pages/Device_Setting';
import Reminder from '../pages/Reminder';
import Zhineng from '../pages/Reminder/zhineng';
import Heshui from '../pages/Reminder/heshui';
import Shuijiao from '../pages/Reminder/shuijiao';
import Yundong from '../pages/Reminder/yundong';
import Waimai from '../pages/Reminder/waimai';
import Jiangwen from '../pages/Reminder/jiangwen';
import Huiyi from '../pages/Reminder/huiyi';
import Chumen from '../pages/Reminder/chumen';
import Youyu from '../pages/Reminder/youyu';
import Qichuang from '../pages/Reminder/qichuang';
import AddAlarm from '../pages/AddAlarm';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
// 引入图标
const bgCompassOn = require('../assets/icon/bg-compass-on.png');
const bgCompass = require('../assets/icon/bg-compass.png');
const home = require('../assets/icon/home.png');
const homeOn = require('../assets/icon/home-on.png');
const user = require('../assets/icon/user.png');
const userOn = require('../assets/icon/user-on.png');

// home组件的路由
const HomeStack = () => {
  const reminderScreens = [
    {name: '智能提醒', com: Zhineng, title: '智能提醒'},
    {name: '喝水提醒', com: Heshui, title: '喝水提醒'},
    {name: '睡觉提醒', com: Shuijiao, title: '睡觉提醒'},
    {name: '运动提醒', com: Yundong, title: '运动提醒'},
    {name: '外卖提醒', com: Waimai, title: '外卖提醒'},
    {name: '降温提醒', com: Jiangwen, title: '降温提醒'},
    {name: '会议提醒', com: Huiyi, title: '会议提醒'},
    {name: '出门提醒', com: Chumen, title: '出门提醒'},
    {name: '有雨提醒', com: Youyu, title: '有雨提醒'},
    {name: '起床提醒', com: Qichuang, title: '起床提醒'},
  ];

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Device_Setting" component={Device_Setting} />
      <Stack.Screen name="Reminder" component={Reminder} />
      {reminderScreens.map(({name, com, title}) => (
        <Stack.Screen
          key={name}
          name={name}
          component={com}
          options={({navigation}) => ({
            title: title,
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('编辑闹钟')}
                title="+"
              />
            ),
          })}
        />
      ))}
      <Stack.Screen
        name="编辑闹钟"
        component={AddAlarm}
        options={() => ({
          title: '编辑闹钟',
          headerRight: () => <Button title="保存" />,
        })}
      />
      <Stack.Screen name="关于 EBO" component={Aboutme} />
    </Stack.Navigator>
  );
};

// Discover组件路由
const DiscoverStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Discover"
        component={Discover}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: 'transparent'},
        }}
      />
    </Stack.Navigator>
  );
};

// ForMe路由组件
const ForMeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ForMe"
        component={ForMe}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: 'transparent'},
        }}
      />
    </Stack.Navigator>
  );
};

// 主入口
const RouterComponent = () => {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused}) => {
              let icon;
              switch (route.name) {
                case 'HomeStack':
                  icon = focused ? homeOn : home;
                  break;
                case 'DiscoverStack':
                  icon = focused ? bgCompassOn : bgCompass;
                  break;
                case 'ForMeStack':
                  icon = focused ? userOn : user;
                  break;
                default:
                  icon = home;
              }
              return (
                <Image
                  source={icon}
                  style={{
                    width: 24,
                    height: 24,
                    flex: 1,
                    resizeMode: 'contain',
                  }}
                />
              );
            },
            tabBarActiveTintColor: 'rgb(0,0,0)',
            headerShown: false,
          })}>
          <Tab.Screen name="HomeStack" component={HomeStack} />
          <Tab.Screen name="DiscoverStack" component={DiscoverStack} />
          <Tab.Screen name="ForMeStack" component={ForMeStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default RouterComponent;
