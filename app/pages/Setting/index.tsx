/*
 * @Description: 关于我
 * @Author: LinHengJi
 * @Date: 2024-05-14
 * @LastEditTime: 2024-05-14 15:01:51
 * @LastEditors: LinHengJi
 * @E-mail: hengji.lin@richinfoai.com
 */
import React, {FC} from 'react';
import {Button, WhiteSpace, WingBlank} from '@ant-design/react-native';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import BackgroundImage from '../../components/backgroundImage.tsx';

const ForMe: FC = (props: any) => {
  // 基本信息==============================
  const {navigation} = props;
  // React元素=============================
  return (
    <BackgroundImage>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.robotName}>Rich Ebo</Text>
        </View>
      </View>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.title}>安防</Text>
          </TouchableOpacity>
          <WhiteSpace />
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate('Reminder')}>
            <Text style={styles.title}>小助手</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.title}>备忘录</Text>
          </TouchableOpacity>
          <WhiteSpace />
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate('Device_Setting')}>
            <Text style={styles.title}>设备设置</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate('关于 EBO')}>
            <Text style={styles.title}>关于机器人</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  scrollView: {
    flex: 1,
  },
  option: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderBottomColor: '#ccc',
    borderColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    color: 'black',
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  header: {
    paddingTop: 10,
    alignItems: 'center',
  },

  robotName: {
    fontSize: 16,
    color: '#000',
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default ForMe;
