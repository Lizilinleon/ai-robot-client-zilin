/*
 * @Description: 移动控制的tab页
 * @Author: LinHengJi
 * @Date: 2024-05-15
 * @LastEditTime: 2024-05-15 11:17:42
 * @LastEditors: LinHengJi
 * @E-mail: hengji.lin@richinfoai.com
 */
import React, {
  FC,
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  Flex,
  View,
  WingBlank,
  Icon,
  Slider,
  Toast,
} from '@ant-design/react-native';
import style from './style.ts';
import {ImageBackground, TouchableWithoutFeedback, Text} from 'react-native';

const RemoteTab: FC<any> = forwardRef((props: any, ref) => {
  const ws = useRef<any>(null); // WebSocket实例
  const socketUrl: string =
    'wss://robot.richinfoai.com/api/robot-websocket?deviceId=UUID&deviceVersion=APP_0.1'; // rich云端的WebSocket
  const retryTimeout = useRef<any>(null); // 超时时间
  const retryInterval: number = 5000; // 重连间隔5秒
  const heartbeatInterval = 2000; // 心跳间隔，单位：毫秒
  // 获取图标
  const circle = require('../../assets/images/circle.png');
  // 按钮控制
  const [holdTimeoutUp, setHoldTimeoutUp] = useState<any>(null);
  const [holdTimeoutDown, setHoldTimeoutDown] = useState<any>(null);
  const [holdTimeoutLeft, setHoldTimeoutLeft] = useState<any>(null);
  const [holdTimeoutRight, setHoldTimeoutRight] = useState<any>(null);
  // 速度进度条控制
  const [speed, setSpeed] = useState<any>(30);

  // 使用 useImperativeHandle 将方法暴露给父组件
  useImperativeHandle(ref, () => ({
    moveControls: (type: number) => {
      if (type === 0) {
        setupWebSocket(); // 启动连接
      } else {
        // 清理实例
        if (ws.current) {
          ws.current.close();
        }
        if (retryTimeout.current) {
          clearTimeout(retryTimeout.current);
        }
      }
    },
  }));

  // 发送移动指令
  const moveSend = (actX: any, actY: any) => {
    sendToServer({
      command: 'MOVE_RELATIVE',
      action: 'START',
      data: {X: actX, Y: actY},
      deviceId: 'QNKJ-00-7XX8-0O0Y-00000011',
      deviceVersion: 'APP_0.1',
    });
  };

  // 发送消息到服务器
  const sendToServer = (message: any) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  };

  const speedOnChange = (val: any) => {
    if (val > 70) {
      Toast.info({
        content: '移动速度过快，请小心驾驶',
      });
    }
    setSpeed(Math.round(val));
  };
  // 按下与松开按钮-上
  const onPressInUp = () => {
    setHoldTimeoutUp(
      setInterval(() => {
        moveSend(speed / 100, 0);
        // 这里可以替换为发送提示的逻辑
      }, 200),
    );
  };
  // 按下与松开按钮-下
  const onPressInDown = () => {
    setHoldTimeoutDown(
      setInterval(() => {
        moveSend(-(speed / 100), 0);
      }, 200),
    );
  };
  // 按下与松开按钮-左
  const onPressInLeft = () => {
    setHoldTimeoutLeft(
      setInterval(() => {
        moveSend(0, 90);
      }, 200),
    );
  };
  // 按下与松开按钮-右
  const onPressInRight = () => {
    setHoldTimeoutRight(
      setInterval(() => {
        moveSend(0, -90);
      }, 200),
    );
  };

  // 松开就停止
  const onPressOut = () => {
    moveSend(0, 0);
    if (holdTimeoutUp) {
      clearTimeout(holdTimeoutUp);
    }
    if (holdTimeoutDown) {
      clearTimeout(holdTimeoutDown);
    }
    if (holdTimeoutLeft) {
      clearTimeout(holdTimeoutLeft);
    }
    if (holdTimeoutRight) {
      clearTimeout(holdTimeoutRight);
    }
  };

  // 启动WebSocket连接
  const setupWebSocket = () => {
    let heartbeatTimer: any = null;
    // 创建连接
    ws.current = new WebSocket(socketUrl);
    // 开启连接的回调
    ws.current.onopen = () => {
      console.log('WebSocket连接');
      // 建立连接后立即发送一次心跳消息
      heartbeat();
      // 设置定时器，定期发送心跳消息
      heartbeatTimer = setInterval(() => {
        heartbeat();
      }, heartbeatInterval);
    };
    // 连接错误回调
    ws.current.onerror = (error: any) => {
      console.log('WebSocket错误:', error);
      ws.current.close(); // 关闭当前连接
      // 设置重连
      retryTimeout.current = setTimeout(() => {
        setupWebSocket();
      }, retryInterval);
    };
    // 接收消息回调
    ws.current.onmessage = (event: any) => {
      console.log('接收消息', event);
    };
    // 关闭连接的回调
    ws.current.onclose = () => {
      console.log('WebSocket关闭');
      // 清除心跳定时器
      clearInterval(heartbeatTimer);
    };
  };
  // 心跳
  const heartbeat = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({eventName: '__ping', data: {}}));
    }
  };

  // 清空计时器
  useEffect(() => {
    return () => {
      if (holdTimeoutUp) {
        clearTimeout(holdTimeoutUp);
      }
      if (holdTimeoutDown) {
        clearTimeout(holdTimeoutDown);
      }
      if (holdTimeoutLeft) {
        clearTimeout(holdTimeoutLeft);
      }
      if (holdTimeoutRight) {
        clearTimeout(holdTimeoutRight);
      }
    };
  }, [holdTimeoutUp, holdTimeoutDown, holdTimeoutLeft, holdTimeoutRight]);

  useEffect(() => {
    return () => {
      // 清理实例
      if (ws.current) {
        ws.current.close();
      }
      if (retryTimeout.current) {
        clearTimeout(retryTimeout.current);
      }
    };
  }, [setupWebSocket]);

  return (
    <WingBlank>
      <Flex style={style.tabView} direction={'column'} justify={'between'}>
        <View style={style.remoteButton}>
          <ImageBackground
            source={circle}
            style={style.remoteImg}
            resizeMode="cover">
            <Flex justify={'center'} style={style.remoteArrow}>
              <TouchableWithoutFeedback
                onPressIn={onPressInUp}
                onPressOut={onPressOut}>
                <View style={style.remoteArrowIcon1}>
                  <Icon name={'caret-up'} size={30} />
                </View>
              </TouchableWithoutFeedback>
            </Flex>
            <Flex justify={'between'} style={style.remoteArrow}>
              <TouchableWithoutFeedback
                onPressIn={onPressInLeft}
                onPressOut={onPressOut}>
                <View style={style.remoteArrowIcon2}>
                  <Icon name={'caret-left'} size={30} />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPressIn={onPressInRight}
                onPressOut={onPressOut}>
                <View style={style.remoteArrowIcon3}>
                  <Icon name={'caret-right'} size={30} />
                </View>
              </TouchableWithoutFeedback>
            </Flex>
            <Flex justify={'center'} style={style.remoteArrow}>
              <TouchableWithoutFeedback
                onPressIn={onPressInDown}
                onPressOut={onPressOut}>
                <View style={style.remoteArrowIcon4}>
                  <Icon name={'caret-down'} size={30} />
                </View>
              </TouchableWithoutFeedback>
            </Flex>
          </ImageBackground>
        </View>
        <View style={style.speed}>
          <Flex justify={'between'}>
            <Text>速度</Text>
            <Text>每秒{speed}cm</Text>
          </Flex>
          <Slider max={100} defaultValue={30} onChange={speedOnChange} />
        </View>
      </Flex>
    </WingBlank>
  );
});
export default RemoteTab;
