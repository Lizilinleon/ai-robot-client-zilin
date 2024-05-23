import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, Text, TouchableOpacity, Button, Switch, ScrollView, StyleSheet } from 'react-native';
const AddAlarmScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedHour, setSelectedHour] = useState('15');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [label, setLabel] = useState('');

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <ScrollView >
      <View style={styles.row}></View>

      <View style={styles.row}>
        <Text style={styles.label}>时间</Text>
        <Picker
          selectedValue={selectedHour}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSelectedHour(itemValue)}>
          {Array.from({ length: 24 }, (_, i) => (
            <Picker.Item key={i} label={i.toString().padStart(2, '0')} value={i.toString().padStart(2, '0')} />
          ))}
        </Picker>
        <Picker
          selectedValue={selectedMinute}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSelectedMinute(itemValue)}>
          {Array.from({ length: 60 }, (_, i) => (
            <Picker.Item key={i} label={i.toString().padStart(2, '0')} value={i.toString().padStart(2, '0')} />
          ))}
        </Picker>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>重复</Text>

      </View>
      <View style={styles.row}>
        <Text style={styles.label}>通知</Text>
        <Switch
          trackColor={{ false: "grey", true: "blue" }}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View> 
      </ScrollView>
      <TouchableOpacity style={styles.exit}>
        <Text style={styles.exitText}>删除</Text>
      </TouchableOpacity>
   </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    flex: 3,
    padding: 8,
    marginRight: 10,
  },
  picker: {
    width: 100,
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

export default AddAlarmScreen;
