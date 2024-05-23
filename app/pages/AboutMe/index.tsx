import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import BackgroundImage from '../../components/backgroundImage.tsx';
import { getDeviceInfo } from '../../services/home/index.ts';

const Aboutme = () => {
  const [deviceData, setDeviceData] = useState({
    code: "0",
    fsn: "010ABHY23120402",
    macAddress: "60:fb:00:5f:4b:5e",
    firmwareVersion: "v0.0.15-0-gd5902c3",
    hardwareVersion: "Release",
    ipcVersion: "v2.5.2-3-g1eec4509",
    ipAddress: "192.168.110.47",
    model: "Rich Air",
    deviceType: "",
    sdCard: "26.9 GB 可用 / 29.1 GB",
    wifiName: "RichAI",
    sn: "",
    message: null,
    requestId: "630df547-0d0f-4b50-95cc-ee977cb4b332",
    version: null
  });

  const bubbles = [
    { id: 1, label: '设备直连' },
    { id: 2, label: '问题反馈' },
    { id: 3, label: '设备升级' },
  ];

  useEffect(() => {
    getDevice();
  }, []);

  const getDevice = () => {
    getDeviceInfo({parameters:{ deviceId: "QNKJ-00-7XX8-0O0Y-00000011" }}).then((res: any) => {
      if (res.code === '0') {
        console.log(res.data.elementList);
          // 更新设备数据
          setDeviceData(res.data.elementList[0]);
      
      } else {
        console.log(res.data.message);
      }
    });
  }

  return (
    <BackgroundImage style={styles.container}>
      <View style={styles.grid}>
        {bubbles.map(bubble => (
          <TouchableOpacity key={bubble.id} style={styles.bubble}>
            <Text style={styles.text}>{bubble.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView >
        <View style={styles.section}>
          <Text style={styles.title}>昵称</Text>
          <Text style={styles.value}>{deviceData.deviceType}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>型号</Text>
          <Text style={styles.value}>{deviceData.model}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>SN</Text>
          <Text style={styles.value}>{deviceData.sn}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>FSN</Text>
          <Text style={styles.value}>{deviceData.fsn}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>IPC 版本</Text>
          <Text style={styles.value}>{deviceData.ipcVersion}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>固件版本</Text>
          <Text style={styles.value}>{deviceData.firmwareVersion}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>硬件版本</Text>
          <Text style={styles.value}>{deviceData.hardwareVersion}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>SD 卡</Text>
          <Text style={styles.value}>{deviceData.sdCard}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Wi-Fi 名称</Text>
          <Text style={styles.value}>{deviceData.wifiName}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>IP 地址</Text>
          <Text style={styles.value}>{deviceData.ipAddress}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>MAC 地址</Text>
          <Text style={styles.value}>{deviceData.macAddress}</Text>
        </View>
      </ScrollView>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  title: {
    fontSize: 16,
    color: 'gray'
  },
  value: {
    fontSize: 16,
    color: 'black'
  },
  bubble: {
    width: 100,
    height: 70,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'center',
    color: '#333',
  },
});

export default Aboutme;
