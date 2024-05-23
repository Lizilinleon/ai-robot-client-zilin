import React ,{useEffect} from 'react';
import {Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
    View,
  } from '@ant-design/react-native';
import { getNotification_list } from '../../services/home/index.ts';
const setImg = require('../../assets/icon/set.png');

const Reminder = (props : any) => {

    const {navigation} = props;
    const bubbles = [
        { id: 1, label: '喝水' ,title:'喝水提醒'},
        { id: 2, label: '睡觉' ,title:'睡觉提醒'},
        { id: 3, label: '运动' ,title:'运动提醒'},
        { id: 4, label: '外卖' ,title:'外卖提醒'},
        { id: 5, label: '降温' ,title:'降温提醒'},
        { id: 6, label: '会议' ,title:'会议提醒'},
        { id: 7, label: '出门' ,title:'出门提醒'},
        { id: 8, label: '有雨' ,title:'有雨提醒'},
        { id: 9, label: '起床' ,title:'起床提醒'},
      ];  
const getNotification = () => {
    getNotification_list({parameters:{}}).then((res: any) => {
      if (res.code === '0') {
        console.log(res.data.elementList);
          //setDeviceData(res.data.elementList[0]);
      
      } else {
        console.log(res.data.message);
      }
    });
  }
 useEffect(() => {
  getNotification();
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>智能提醒</Text>
        <TouchableOpacity style={{padding: 10}} onPress={() => navigation.navigate('智能提醒')}>
            <Image source={setImg} style={styles.setButton} />
        </TouchableOpacity>
      </View>
      <View style={styles.grid}>
        {bubbles.map(bubble => (
          <TouchableOpacity key={bubble.id} style={styles.bubble} onPress={() => navigation.navigate(bubble.title)}>
            <Text style={styles.text}>{bubble.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '100%',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  headerButton: {
    backgroundColor: '#ddd',  // 临时颜色，可以根据设计调整
    padding: 10,
    borderRadius: 15,
  },
  headerButtonText: {
    fontSize: 18,
    color: '#333',
  },
  title: {
    fontSize: 16,
    color: 'black',
  },

  robotName: {
    fontSize: 16,
    color: '#000',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  bubble: {
    width: 100,
    height: 70,
    borderRadius: 10,  // 圆形气泡
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'center',
    color: '#333',
  },
  setButton: {
    width: 30,
    height: 30,
    marginLeft: 15,
  },
});

export default Reminder;
