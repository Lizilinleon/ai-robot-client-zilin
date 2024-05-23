/*
 * @Description: 首页
 * @Author: LinHengJi
 * @Date: 2024-05-14
 * @LastEditTime: 2024-05-14 14:16:12
 * @LastEditors: LinHengJi
 * @E-mail: hengji.lin@richinfoai.com
 */

import React, {FC, useRef, useState, useEffect} from 'react';
import {
  WhiteSpace,
  WingBlank,
  Flex,
  View,
  Badge,
  Icon,
  Switch,
  Tabs,
  Toast,
} from '@ant-design/react-native';
import {Text, Image, TouchableOpacity, Pressable} from 'react-native';
import style from './style.ts';
import {captureScreen} from 'react-native-view-shot';
import RecordScreen from 'react-native-record-screen';
import RNFS from 'react-native-fs';
import {getUserInfo} from '../../services/home/index.ts';
// 组件引入
import BackgroundImage from '../../components/backgroundImage.tsx';
import RemoteTab from './remoteTab.tsx';
import PhotoTab from './photoTab.tsx';
import MicTab from './micTab.tsx';
import Inspection from './inspection.tsx';
import RemoteVideoComponent from './rtcVideo.tsx';

const Home: FC = (props: any) => {
  // 基本信息==============================
  const {navigation} = props; // 路由

  // 引入图标
  const setImg = require('../../assets/icon/set.png');
  const remote = require('../../assets/icon/remote.png');
  const remoteOn = require('../../assets/icon/remote-on.png');
  const photo = require('../../assets/icon/photo.png');
  const photoOn = require('../../assets/icon/photo-on.png');
  const mic = require('../../assets/icon/mic.png');
  const micOn = require('../../assets/icon/mico-on.png');

  // useRef与useState=====================
  const [activeTab, setActiveTab] = useState(0); // 切换标签页
  const retVideoRef = useRef<any>(); // 使用video组件导出的方法
  const remoteRef = useRef<any>(); // 使用遥控组件导出的方法

  // 功能=====================

  // 切换标签页
  const onChangeTab = (tab: any, index: any) => {
    setActiveTab(index);
  };

  // 屏幕截图
  const takePhoto = async () => {
    captureScreen({
      format: 'jpg', // 或 'png'
      quality: 0.8, // 0 到 1，只对 jpg 有效
    })
      .then(
        uri => {
          console.log('Screenshot saved to', uri);
          // 可以在这里添加将图片保存到相册的代码
          // 例如使用 react-native-fs 移动文件
          const newPath = `${RNFS.PicturesDirectoryPath}/screenshot_${Date.now()}.jpg`;
          RNFS.moveFile(uri, newPath)
            .then(() => {
              Toast.info({
                content: '图片已保存',
              });
              console.log(`Image moved to ${newPath}`);
            })
            .catch(err => console.error('Failed to move image', err));
        },
        error => console.error('Oops, snapshot failed', error),
      )
      .catch(error => console.error('Snapshot promise failed', error));
  };

  // 屏幕录制
  const recordVideo = async () => {
    try {
      const res = await RecordScreen.startRecording({
        mic: true,
      });
      console.log('Recording started', res);
      return res;
    } catch (error) {
      console.error('Start recording failed', error);
    }
  };

  // 停止屏幕录制并保存
  const stopRecordVideo = async () => {
    try {
      const res: any = await RecordScreen.stopRecording();
      const uri = res.result.outputURL;
      const newPath = `${RNFS.PicturesDirectoryPath}/video_${Date.now()}.mp4`;
      await RNFS.moveFile(uri, newPath).then(() => {
        Toast.info({
          content: '录像已保存',
        });
      });
      console.log(`Video saved to ${newPath}`);
    } catch (error) {
      console.error('Stop recording failed', error);
    }
  };

  // 用户信息查询
  const getUser = () => {
    getUserInfo({
      userId: 'delta',
    }).then((res: any) => {
      if (res.code === '0') {
        // 数据获取成功
        console.log(res.elementList);
      } else {
        // 打印错误
        console.log(res.message);
      }
    });
  };

  // 卸载录制内容
  useEffect(() => {
    return () => {
      RecordScreen.stopRecording().catch(error =>
        console.error('Failed to stop recording', error),
      );
    };
  }, []);

  // 基础信息查询
  useEffect(() => {
    getUser();
  }, []);

  // React元素=============================
  return (
    <BackgroundImage>
      {/*头部：机器名称与设置按钮*/}
      <WingBlank>
        <Flex justify="end">
          <Flex style={style.titleInfo}>
            <Text style={style.titleName}>Rich Ebo</Text>
            <Icon name={'caret-down'} style={{color: 'black'}} />
          </Flex>
          <Badge text={5}>
            <Image source={setImg} style={style.setButton} />
          </Badge>
          <Pressable
            onPress={() => navigation.navigate('Setting')}
            style={{padding: 10}}>
            <Image source={setImg} style={style.setButton} />
          </Pressable>
        </Flex>
      </WingBlank>
      <WhiteSpace />
      <WhiteSpace />
      {/*视频播放区*/}
      <WingBlank>
        <View style={style.videoCard}>
          <RemoteVideoComponent ref={retVideoRef} />

          <View>
            <Switch
              style={style.videoSwitch}
              defaultChecked={true}
              onChange={(open: boolean) => {
                if (open) {
                  retVideoRef.current.openVideo();
                } else {
                  retVideoRef.current.closeVideo();
                }
              }}
            />
          </View>
        </View>
      </WingBlank>
      <WhiteSpace />
      <WhiteSpace />
      {/*四个按钮*/}
      <WingBlank>
        <Flex justify="between">
          <TouchableOpacity
            onPress={() => {
              setActiveTab(0);
            }}>
            <Image
              source={activeTab === 0 ? remoteOn : remote}
              style={style.tabButton}
            />
            <Text style={style.tabButtonText}>Remote</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab(1)}>
            <Image
              source={activeTab === 1 ? photoOn : photo}
              style={style.tabButton}
            />
            <Text style={style.tabButtonText}>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab(2)}>
            <Image
              source={activeTab === 2 ? photoOn : photo}
              style={style.tabButton}
            />
            <Text style={style.tabButtonText}>Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab(3)}>
            <Image
              source={activeTab === 3 ? micOn : mic}
              style={style.tabButton}
            />
            <Text style={style.tabButtonText}>Voice</Text>
          </TouchableOpacity>
        </Flex>
      </WingBlank>
      <WhiteSpace />
      <WhiteSpace />
      {/*按钮对应的tab页*/}
      <View style={{flex: 1}}>
        <Tabs
          tabs={[
            {title: 'Tab 1'},
            {title: 'Tab 2'},
            {title: 'Tab 3'},
            {title: 'Tab 4'},
          ]}
          initialPage={0}
          page={activeTab}
          swipeable={false} // 禁止滑动切换
          renderTabBar={() => {
            return null;
          }}
          onChange={(tab, index) => {
            remoteRef.current.moveControls(index); // 切换其他tab的时候断开遥控的连接，切到遥控再重新打开连接
            onChangeTab(tab, index);
          }}>
          <RemoteTab ref={remoteRef} />
          <Inspection />
          <PhotoTab
            takePhoto={takePhoto}
            recordVideo={recordVideo}
            stopRecordVideo={stopRecordVideo}
          />
          <MicTab />
        </Tabs>
      </View>
    </BackgroundImage>
  );
};

export default Home;
