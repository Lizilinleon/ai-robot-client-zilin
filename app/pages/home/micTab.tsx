/*
 * @Description: 语音控制的tab页
 * @Author: LinHengJi
 * @Date: 2024-05-15
 * @LastEditTime: 2024-05-15 11:17:42
 * @LastEditors: LinHengJi
 * @E-mail: hengji.lin@richinfoai.com
 */
import React, {FC, useState} from 'react';
import {Flex, View, WingBlank, Slider} from '@ant-design/react-native';
import style from './style.ts';
import {Text, TouchableOpacity, Image} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import axios from 'axios';
const audioRecorderPlayer = new AudioRecorderPlayer();

const MicTab: FC<any> = () => {
  // 引入图标
  const micOff = require('../../assets/icon/mic.png');
  const micOn = require('../../assets/icon/mico-on.png');
  const trumpet = require('../../assets/icon/trumpet.png');

  // 速度进度条控制
  const [speed, setSpeed] = useState<any>(70);
  const [isRecording, setIsRecording] = useState<any>(false);

  const speedOnChange = (val: any) => {
    setSpeed(Math.round(val));
  };

  const onButtonPress = async (prompt: any) => {
    if (!isRecording) {
      // 开始录音
      const result = await audioRecorderPlayer.startRecorder();
      audioRecorderPlayer.addRecordBackListener(e => {
        console.log('recording', e);
        return;
      });
      console.log(result);
    } else {
      // 停止录音并上传
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      console.log(result);

      // 使用FormData上传文件
      const formData = new FormData();
      formData.append('file', {
        uri: result,
        type: 'audio/mp3',
        name: 'upload.mp3',
      });

      axios
        .post(
          'https://robot.richinfoai.com/api/upload?prompt=' + prompt,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        .then(response => {
          // 播放返回的音频文件
          console.log('Playing response audio');
          const downloadPath = response.data.data; // 服务器返回的音频路径
          audioRecorderPlayer.startPlayer(downloadPath);
          audioRecorderPlayer.addPlayBackListener(e => {
            console.log('playing', e);
            return;
          });
        })
        .catch(error => console.log('upload error', error));
    }
    setIsRecording(!isRecording);
  };

  return (
    <WingBlank>
      <View style={style.tabView}>
        <Flex justify={'center'} style={{marginBottom: 40}}>
          <TouchableOpacity
            onPress={() => {
              onButtonPress('请将如下内容翻译成英文');
            }}
            style={style.takePhoto}>
            <Image
              source={isRecording ? micOn : micOff}
              style={style.photoButton}
            />
            <Text style={style.photoButtonText}>
              {!isRecording ? '翻译1' : '结束'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onButtonPress('请用英文回答');
            }}
            style={style.takePhoto}>
            <Image
              source={isRecording ? micOn : micOff}
              style={style.photoButton}
            />
            <Text style={style.photoButtonText}>
              {!isRecording ? '对话' : '结束'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={style.VideoPhoto}>
            <Image source={trumpet} style={style.photoButton} />
            <Text style={style.photoButtonText}>Trumpet</Text>
          </TouchableOpacity>
        </Flex>
        <View style={style.speed}>
          <Flex justify={'between'}>
            <Text>Movement Speed</Text>
            <Text>{speed}</Text>
          </Flex>
          <Slider max={100} defaultValue={70} onChange={speedOnChange} />
        </View>
      </View>
    </WingBlank>
  );
};
export default MicTab;
