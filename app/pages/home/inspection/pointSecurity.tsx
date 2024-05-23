import React, {useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {
  Flex,
  WingBlank,
  Button,
  List,
  DatePicker,
  Picker,
  Switch,
} from '@ant-design/react-native';
import moment from 'moment';

const InspectionPage = () => {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [repeatFrequency, setRepeatFrequency] = useState<any>([]);
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  const repeatOptions = [
    {label: '永不重复', value: 'never'},
    {label: '每天', value: 'daily'},
    {label: '每周', value: 'weekly'},
    {label: '每月', value: 'monthly'},
  ];

  const handleSave = () => {
    const data = {
      startTime: moment(startTime).format('HH:mm'),
      endTime: moment(endTime).format('HH:mm'),
      repeatFrequency: repeatFrequency.length ? repeatFrequency[0] : null,
      notificationEnabled,
    };

    // 模拟保存逻辑
    const success = true; // 假设保存成功
    if (success) {
      Alert.alert('保存成功', JSON.stringify(data));
      // 重置状态
      setStartTime(new Date());
      setEndTime(new Date());
      setRepeatFrequency([]);
      setNotificationEnabled(false);
    } else {
      Alert.alert('保存失败', '请重试');
    }
  };

  return (
    <WingBlank style={{flex: 1}}>
      <Flex justify="between" style={{padding: 10}}>
        <Button onPress={() => console.log('返回')}>返回</Button>
        <Text style={{fontSize: 18}}>巡航安防</Text>
        <Button onPress={handleSave}>保存</Button>
      </Flex>
      <List>
        <DatePicker
          value={startTime}
          precision="minute"
          onChange={setStartTime}
          format="HH:mm">
          <List.Item arrow="horizontal">开始时间</List.Item>
        </DatePicker>
        <DatePicker
          value={endTime}
          precision="minute"
          onChange={setEndTime}
          format="HH:mm">
          <List.Item arrow="horizontal">结束时间</List.Item>
        </DatePicker>
        <Picker
          data={repeatOptions}
          cols={1}
          value={repeatFrequency}
          onChange={setRepeatFrequency}>
          <List.Item arrow="horizontal">重复频率</List.Item>
        </Picker>
        <List.Item
          extra={
            <Switch
              checked={notificationEnabled}
              onChange={setNotificationEnabled}
            />
          }>
          通知
        </List.Item>
      </List>
    </WingBlank>
  );
};

export default InspectionPage;
