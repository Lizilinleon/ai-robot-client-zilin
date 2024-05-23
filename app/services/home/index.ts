/*
 * @Description: home接口
 * @Author: LinHengJi
 * @Date: 2024-05-22
 * @LastEditTime: 2024-05-22 14:23:48
 * @LastEditors: LinHengJi
 * @E-mail: hengji.lin@richinfoai.com
 */
import {request} from '../request.ts';
export function getUserInfo(data: any) {
  return request({
    url: 'https://robot.richinfoai.com/api/sapi/dql?code=user_info',
    method: 'POST',
    data: data,
  });
}

//设备信息查询
export function getDeviceInfo(data: any) {
  return request({
    url: 'https://robot.richinfoai.com/api/sapi/dql?code=device_info',
    method: 'POST',
    data: data,
  });
}

//提醒配置列表
export function getNotification_list(data: any) {
  return request({
    url: 'https://robot.richinfoai.com/api/sapi/dql?code=notification_lis',
    method: 'POST',
    data: data,
  });
}