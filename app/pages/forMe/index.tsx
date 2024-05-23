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
} from 'react-native';
import BackgroundImage from '../../components/backgroundImage.tsx';

const ForMe: FC = () => {
  // 基本信息==============================

  // React元素=============================
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.title}>流量监控</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.title}>订阅管理</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.title}>通用</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.title}>隐私政策</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.title}>关于</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity style={styles.exit}>
        <Text style={styles.buttonText}>退出登录</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
  },
  option: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    color: 'black',
  },
  detail: {
    fontSize: 16,
    color: 'grey',
  },
  exit: {
    backgroundColor: 'red',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ForMe;
