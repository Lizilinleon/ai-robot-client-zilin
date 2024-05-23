import React, { useState } from 'react';
import {View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import {WhiteSpace, } from '@ant-design/react-native';
const Device_Setting = () => {
  const [isEnabledWifi, setIsEnabledWifi] = useState(false);
  const [isEnabledBluetooth, ] = useState(false);

  const switch1 = () => setIsEnabledWifi(previousState => !previousState);

  return (
  <View style={styles.container}>
    <ScrollView style={styles.container}>
    <WhiteSpace />
    <WhiteSpace />
      <TouchableOpacity style={styles.item}>
        <Text style={styles.title}>Wi-Fi</Text>
        <Text style={styles.subtitle}>RichAI</Text>
      </TouchableOpacity>
        <WhiteSpace />
        <WhiteSpace />
      <View style={styles.item}>
        <Text style={styles.title}>蓝牙</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabledBluetooth ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={switch1}
          value={isEnabledBluetooth}
        />
      </View>
        <WhiteSpace />
        <WhiteSpace />
      <View style={styles.item}>
        <Text style={styles.title}>表情灯</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabledWifi ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={switch1}
          value={isEnabledWifi}
        />
      </View>
        <WhiteSpace />
        <WhiteSpace />
      <TouchableOpacity style={styles.item}>
        <Text style={styles.title}>免打扰</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabledWifi ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={switch1}
          value={isEnabledWifi}
        />
      </TouchableOpacity>
        <WhiteSpace />
        <WhiteSpace />
      <TouchableOpacity style={styles.item}>
        <Text style={styles.title}>视频编码标准</Text>
        <Text style={styles.subtitle}>H.265</Text>
      </TouchableOpacity>
    </ScrollView>      
    <TouchableOpacity style={styles.exit}>
        <Text style={styles.exitText}>解绑并删除</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
      },
      header: {
        fontSize: 22,
        fontWeight: 'bold',
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0'
      },
      item: {    
        backgroundColor:'white',
        borderRadius:10,
        padding: 20,
        borderWidth:1,
        borderBottomColor: '#ccc',
        borderColor:'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      title: {
        fontSize: 16,
        color: '#000',
      },
      subtitle: {
        fontSize: 16,
        color: '#888'
      },
      button: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        alignItems: 'center',
        marginTop: 10
      },
      exitText: {
        fontSize: 15,
        color: 'red',
      },
  exit: {
    backgroundColor: 'white',
    justifyContent:'center',
    borderRadius:10,
    padding: 20,
    borderWidth:1,
    borderBottomColor: '#ccc',
    borderColor:'white',
    flexDirection: 'row',

  },
});

export default Device_Setting;