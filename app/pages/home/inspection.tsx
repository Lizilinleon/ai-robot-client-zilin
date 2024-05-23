/*
 * @Description: 巡检控制tab页
 * @Author: LinHengJi
 * @Date: 2024-05-21
 * @LastEditTime: 2024-05-21 18:15:21
 * @LastEditors: LinHengJi
 * @E-mail: hengji.lin@richinfoai.com
 */

import React, {FC, useState} from 'react';
import {View, WingBlank, Flex, Button} from '@ant-design/react-native';
import style from './style.ts';

const Inspection: FC<any> = () => {
  return (
    <WingBlank>
      <View style={style.tabView}>
        <Flex direction={'column'} style={{height: '100%'}}>
          <Flex justify={'end'} style={{width: '100%'}}>
            <View style={style.inspectionTitle}>标题</View>

            <View style={style.inspectionSet}>设置</View>
          </Flex>
          <Flex direction={'column'} style={style.inspectionBtnList}>
            <Flex style={[style.inspectionPoint, style.InspectionListItem]}>
              <View style={style.InspectionListItemTitle}>定点安防</View>
              <Button style={style.inspectionAddbtn}>+</Button>
            </Flex>
            <Flex style={[style.inspectionCruise, style.InspectionListItem]}>
              <View style={style.InspectionListItemTitle}>巡航安防</View>
              <Button style={style.inspectionAddbtn}>+</Button>
            </Flex>
            <Flex style={[style.inspectionRandom, style.InspectionListItem]}>
              <View style={style.InspectionListItemTitle}>随机安防</View>
              <Button style={style.inspectionAddbtn}>+</Button>
            </Flex>
          </Flex>
        </Flex>
      </View>
    </WingBlank>
  );
};
export default Inspection;
