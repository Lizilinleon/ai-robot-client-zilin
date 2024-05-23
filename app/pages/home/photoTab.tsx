/*
 * @Description: 视频控制的tab页
 * @Author: LinHengJi
 * @Date: 2024-05-15
 * @LastEditTime: 2024-05-15 11:17:42
 * @LastEditors: LinHengJi
 * @E-mail: hengji.lin@richinfoai.com
 */
import React, {FC, useState} from 'react';
import {Flex, View, WingBlank} from '@ant-design/react-native';
import style from './style.ts';
import {
  Text,
  Image,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';

const PhotoTab: FC<any> = (props: any) => {
  const {takePhoto, recordVideo, stopRecordVideo} = props;

  // 引入图标
  const photo2 = require('../../assets/icon/photo2.png');
  const videoOn = require('../../assets/icon/video-on.png');
  const [isRecording, setIsRecording] = useState<any>(false); // 录制状态

  // 请求权限
  async function requestPermissions() {
    if (Platform.OS === 'android') {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ];
      const grantResults =
        await PermissionsAndroid.requestMultiple(permissions);
      return !Object.values(grantResults).includes(
        PermissionsAndroid.RESULTS.DENIED,
      );
    }
    return true;
  }

  return (
    <WingBlank>
      <View style={style.tabView}>
        <Flex justify={'center'}>
          <TouchableOpacity
            onPress={() => {
              requestPermissions().then((granted: boolean) => {
                // 权限通过
                if (granted) {
                  takePhoto();
                  setIsRecording(true);
                }
              });
            }}
            style={style.takePhoto}>
            <Image source={photo2} style={style.photoButton} />
            <Text style={style.photoButtonText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (!isRecording) {
                // 录制视频
                requestPermissions().then((granted: boolean) => {
                  // 权限通过
                  if (granted) {
                    try {
                      recordVideo().then((res: any) => {
                        if (res === 'started') {
                          setIsRecording(true);
                        } else {
                          setIsRecording(false);
                        }
                      });
                    } catch (error) {}
                  }
                });
              } else {
                // 停止录制
                try {
                  stopRecordVideo();
                  setIsRecording(false);
                } catch (error) {
                  setIsRecording(true);
                }
              }
            }}
            style={style.VideoPhoto}>
            <Image source={videoOn} style={style.photoButton} />
            <Text style={style.photoButtonText}>
              {isRecording ? 'stopVideoRecording' : 'videoRecording'}
            </Text>
          </TouchableOpacity>
        </Flex>
      </View>
    </WingBlank>
  );
};
export default PhotoTab;
