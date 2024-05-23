/*
 * @Description: 巡检控制tab页
 * @Author: LinHengJi
 * @Date: 2024-05-21
 * @LastEditTime: 2024-05-21 18:15:21
 * @LastEditors: LinHengJi
 * @E-mail: hengji.lin@richinfoai.com
 */

import React, {FC, useState} from 'react';
import {
  View,
  WingBlank,
  Flex,
  Button,
  Accordion,
  List,
  SwipeAction,
} from '@ant-design/react-native';
import {ScrollView} from 'react-native';
import style from '../style.ts';

const Inspection: FC<any> = () => {
  const [activeSections, setActiveSections] = useState<any>([2, 0]);
  const inspectionPoint = (
    <Flex style={style.InspectionListItem}>
      <View style={style.InspectionListItemTitle}>定点安防</View>
      <Button style={style.inspectionAddbtn}>+</Button>
    </Flex>
  );
  const inspectionCruise = (
    <Flex style={style.InspectionListItem}>
      <View style={style.InspectionListItemTitle}>巡航安防</View>
      <Button style={style.inspectionAddbtn}>+</Button>
    </Flex>
  );

  const inspectionRandom = (
    <Flex style={style.InspectionListItem}>
      <View style={style.InspectionListItemTitle}>随机安防</View>
      <Button style={style.inspectionAddbtn}>+</Button>
    </Flex>
  );

  // 右滑显示按钮
  const right = [
    {
      text: <View style={{color: 'white', fontSize: 28}}>x</View>,
      onPress: () => console.log('delete'),
      backgroundColor: 'red',
    },
  ];

  return (
    <WingBlank>
      <View style={style.tabView}>
        <Flex direction={'column'} style={{height: '100%'}}>
          <Flex justify={'end'} style={{width: '100%'}}>
            <View style={style.inspectionTitle}>标题</View>
            <View style={style.inspectionSet}>设置</View>
          </Flex>

          <Flex direction={'column'} style={style.inspectionBtnList}>
            <ScrollView>
              <Accordion
                onChange={(val: any) => {
                  setActiveSections(val);
                }}
                activeSections={activeSections}
                styles={{
                  arrow: {display: 'none'},
                  header: style.accordionHeader,
                  // container: {width: '100%', backgroundColor: 'red'},
                }}>
                <Accordion.Panel header={inspectionPoint}>
                  <List>
                    <SwipeAction
                      right={right}
                      onSwipeableOpen={() => console.log('open')}
                      onSwipeableClose={() => console.log('close')}>
                      <List.Item>
                        <View style={{height: 50, fontSize: 20}}>
                          Simple example: left and right buttons
                        </View>
                      </List.Item>
                    </SwipeAction>
                    <SwipeAction
                      right={right}
                      onSwipeableOpen={() => console.log('open')}
                      onSwipeableClose={() => console.log('close')}>
                      <List.Item>
                        <View style={{height: 50, fontSize: 20}}>
                          Simple example: left and right buttons
                        </View>
                      </List.Item>
                    </SwipeAction>
                  </List>
                </Accordion.Panel>
                <Accordion.Panel header={inspectionCruise}>
                  this is panel content2 or other
                </Accordion.Panel>
                <Accordion.Panel header={inspectionRandom}>
                  Text text text text text text text text text text text text
                  text text text
                </Accordion.Panel>
              </Accordion>
            </ScrollView>
          </Flex>
        </Flex>
      </View>
    </WingBlank>
  );
};
export default Inspection;
