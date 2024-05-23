import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {View, Text, Platform, PermissionsAndroid} from 'react-native';
import {captureRef} from 'react-native-view-shot';
import {
  RTCView,
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  mediaDevices,
} from 'react-native-webrtc';
import {newGuid} from '../../utils/utils.ts';
import style from './style.ts';
import RNFS from 'react-native-fs';

const RemoteVideoComponent: any = forwardRef((props: any, ref) => {
  const meId = newGuid(); // 用户id
  const sessionId = newGuid();
  const peerid = 'QNKJ-00-7XX8-0O0Y-00000011'; // 硬件ID
  const urls = 'webrtc.niubotech.com:58443'; //niubot
  const wsuri = 'wss://' + urls + '/wswebclient/' + meId; // 硬件厂商的WebSocket
  const heartbeatInterval = 2000; // 心跳间隔，单位：毫秒
  const retryInterval: number = 5000; // 重连间隔5秒
  const retryTimeout = useRef<any>(null); // 超时时间
  const ws = useRef<any>(null); // WebSocket实例
  const [remoteStream, setRemoteStream] = useState<any>(null); // 远程视频流状态
  const peerConnection = useRef<any>(null); // RTCPeerConnection 对象状态
  const [configurationInfo, setConfigurationInfo] = useState<any>(null); // configuration值
  const [showVideo, setShowVideo] = useState<any>(true);
  const rtcViewRef = useRef<any>(null);

  // 使用 useImperativeHandle 将方法暴露给父组件
  useImperativeHandle(ref, () => ({
    openVideo: () => {
      setupWebSocket();
      setShowVideo(true);
    },
    closeVideo: () => {
      // 关闭WebSocket连接
      if (ws.current) {
        ws.current.close();
      }
      // 清除重连定时器
      if (retryTimeout.current) {
        clearTimeout(retryTimeout.current);
      }
      // 关闭PeerConnection并清理事件处理函数
      if (peerConnection.current) {
        peerConnection.current.close();
        handleRelease();
      }
      // 清空远程视频流
      setRemoteStream(null);
      // 停止显示视频
      setShowVideo(false);
    },
    screenshotSave: takeScreenshot,
    videoSave: saveVideo,
  }));

  // 截图并保存到本地
  const takeScreenshot = async () => {
    try {
      // 确保在Android平台请求存储权限
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'This application needs access to your storage to save screenshots.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        // 如果用户未授权，则退出函数
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage permission denied');
          return;
        }
      }

      // 使用captureRef方法从rtcViewRef中捕获截图
      const uri = await captureRef(rtcViewRef.current, {
        format: 'jpg',
        quality: 0.8,
      });
      console.log('=============', uri);

      // 指定新的存储路径
      const newPath = `${RNFS.PicturesDirectoryPath}/screenshot_${Date.now()}.jpg`;

      // 将文件从临时路径移动到新路径
      await RNFS.moveFile(uri, newPath);

      console.log(`Screenshot saved to ${newPath}`);
    } catch (error) {
      console.error('Failed to take screenshot', error);
    }
  };

  // 保存视频到本地
  const saveVideo = async () => {
    if (remoteStream) {
      // 捕获RTCView的视频流
      const uri = remoteStream.toURL();
      // 移动视频文件到指定路径
      const newPath = `${RNFS.ExternalDirectoryPath}/video.mp4`;
      RNFS.moveFile(uri, newPath)
        .then(() => {
          console.log('Video saved to', newPath);
        })
        .catch((error: any) => {
          console.log('Error saving video:', error);
        });
    }
  };

  // 发送消息到服务器
  const sendToServer = (message: any) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  };
  // 心跳
  const heartbeat = () => {
    sendToServer({eventName: '__ping', data: {}});
  };
  // 硬件连接请求
  const robotConnect = () => {
    let info: any = {
      eventName: '__connectto',
      data: {
        sessionId: sessionId,
        sessionType: 'IE',
        messageId: newGuid(),
        from: meId,
        to: peerid,
      },
    };
    sendToServer(info);
  };

  // ICE candidate 事件处理函数
  const handleIceCandidateEvent = (event: any) => {
    if (event.candidate) {
      // 发送 ICE candidate 到服务器
      sendToServer({
        eventName: '__ice_candidate',
        data: {
          sessionId: sessionId,
          sessionType: 'IE',
          messageId: newGuid(),
          to: peerid,
          from: meId,
          label: event.candidate.sdpMLineIndex,
          candidate: event.candidate.candidate,
        },
      });
    }
  };
  // 重置连接
  const handleRelease = () => {
    if (peerConnection.current) {
      peerConnection.current.onicecandidate = null;
      peerConnection.current.onaddstream = null;
      peerConnection.current.ontrack = null;
      peerConnection.current.onsignalingstatechange = null;
      peerConnection.current.onicegatheringstatechange = null;
      peerConnection.current = null;
    }
  };

  const handleIceConnectionStateChangeEvent = () => {
    if (peerConnection.current) {
      switch (peerConnection.current.iceConnectionState) {
        case 'closed':
          handleRelease();
          break;
        case 'failed':
        case 'disconnected':
          break;
        case 'connected':
          console.log(6657);
          break;
      }
    }
  };
  // 发送连接信息
  const sendDisconnect = () => {
    sendToServer({eventName: '__post_message', data: {type: 1, value: 1}});
  };

  // 创建 PeerConnection
  const createPeerConnection = async () => {
    const pc: any = new RTCPeerConnection(configurationInfo || null);
    pc.ontrack = handleAddStream;
    pc.onicecandidate = handleIceCandidateEvent;
    pc.oniceconnectionstatechange = handleIceConnectionStateChangeEvent;
    pc.onicegatheringstatechange = () => {};
    pc.onsignalingstatechange = () => {};
    peerConnection.current = pc;

    // 获取本地媒体流
    const stream = await mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    // 将本地媒体流添加到 PeerConnection 中
    stream.getTracks().forEach(track => {
      pc.addTrack(track, stream);
    });
  };
  // 返还硬件的信息（执行一次就行）
  const callBackCreat = (configuration: any) => {
    let info = {
      eventName: '__call',
      data: {
        sessionId: sessionId,
        sessionType: 'IE',
        messageId: newGuid(),
        from: meId,
        to: peerid,
        mode: 'live',
        source: 'MainStream',
        datachannel: 'true',
        audio: 'sendrecv',
        video: 'sendrecv',
        user: 'admin',
        pwd: '123456',
        iceservers: JSON.stringify(configuration),
      },
    };
    sendToServer(info);
  };
  // 接收硬件webscoket回传的消息后的操作
  const remoteVideoCreat = (data: any) => {
    if (data.state === 'online' || data.state === 'sleep') {
      if (data.iceServers) {
        const configuration: any =
          typeof data.iceServers === 'object'
            ? JSON.parse(JSON.stringify(data.iceServers))
            : JSON.parse(data.iceServers);
        setConfigurationInfo(configuration);
        callBackCreat(configuration);
      } else {
        // callBackCreat(null);
      }
    }
  };
  // 处理远程 offer
  const remoteVideoOffer = async (data: any) => {
    // 创建连接
    createPeerConnection().then(() => {
      sendDisconnect();
    });
    // 收到远端 offer，设置为远端的描述
    await peerConnection.current.setRemoteDescription(
      new RTCSessionDescription({type: 'offer', sdp: data.sdp}),
    );
    // 创建 answer
    const answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answer);
    // 发送 answer 到服务器
    sendToServer({
      eventName: '__answer',
      data: {
        sessionId: sessionId,
        sessionType: 'IE',
        messageId: newGuid(),
        from: meId,
        to: peerid,
        type: answer.type,
        sdp: answer.sdp,
      },
    });
  };
  // 处理远程 answer
  const remoteAnswer = async (data: any) => {
    // 收到远端 answer，设置为远端的
    await peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(data.answer),
    );
  };
  // 处理远程 ICE candidate
  const remoteIceCandidate = (data: any) => {
    let obj = JSON.parse(data.candidate);
    // 收到远端 ICE candidate，添加到本地 PeerConnection 中
    const candidate = new RTCIceCandidate({
      sdpMLineIndex: obj.sdpMLineIndex,
      candidate: obj.candidate,
    });
    if (peerConnection.current) {
      peerConnection.current.addIceCandidate(candidate);
    } else {
      console.error('PeerConnection 不存在');
    }
  };
  // 根据指令做出操作
  const distributeCommand = (data: any) => {
    console.log('data.eventName', data.eventName);
    switch (data.eventName) {
      case '_create': // 开启视频流
        remoteVideoCreat(data.data);
        break;
      case '_offer':
        remoteVideoOffer(data.data);
        break;
      case '_answer':
        remoteAnswer(data.data);
        break;
      case '_ice_candidate':
        remoteIceCandidate(data.data);
        break;
      case '_post_message':
        break;
      case '_connectinfo':
        break;
      case '_session_failed':
        break;
      case '_ping':
        break;
      default:
        console.log('Got default message', data);
        break;
    }
  };

  // 启动WebSocket连接
  const setupWebSocket = () => {
    let heartbeatTimer: any = null;
    // 创建连接
    ws.current = new WebSocket(wsuri);
    // 开启连接的回调
    ws.current.onopen = () => {
      // 硬件连接请求
      robotConnect();
      // 建立连接后立即发送一次心跳消息
      heartbeat();
      // // 设置定时器，定期发送心跳消息
      heartbeatTimer = setInterval(() => {
        heartbeat();
      }, heartbeatInterval);
    };
    // 连接错误回调
    ws.current.onerror = (error: any) => {
      console.log('WebSocket错误:', error);
      ws.current.close(); // 关闭当前连接
      // 清除心跳定时器
      clearInterval(heartbeatTimer);
      // 设置重连
      retryTimeout.current = setTimeout(() => {
        setupWebSocket();
      }, retryInterval);
    };
    // 接收消息回调
    ws.current.onmessage = (event: any) => {
      distributeCommand(JSON.parse(event.data));
    };
    // 关闭连接的回调
    ws.current.onclose = () => {
      console.log('WebSocket关闭');
      // 清除心跳定时器
      clearInterval(heartbeatTimer);
    };
  };

  // 处理远程流的添加事件
  const handleAddStream = (event: any) => {
    setRemoteStream(event.streams[0]);
  };

  useEffect(() => {
    // 组件挂载时初始化 WebSocket 连接
    setupWebSocket();

    // 组件卸载时关闭 WebSocket 连接和 RTCPeerConnection
    return () => {
      // 清理实例
      if (ws.current) {
        ws.current.close();
      }
      if (retryTimeout.current) {
        clearTimeout(retryTimeout.current);
      }
      if (peerConnection.current) {
        peerConnection.current.close();
        handleRelease();
        setRemoteStream(null);
      }
    };
  }, []);

  return (
    <>
      {remoteStream && showVideo ? (
        <RTCView
          streamURL={remoteStream.toURL()}
          style={style.rtcViewStyle}
          objectFit={'cover'}
          ref={rtcViewRef}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>No video stream</Text>
        </View>
      )}
    </>
  );
});

export default RemoteVideoComponent;
