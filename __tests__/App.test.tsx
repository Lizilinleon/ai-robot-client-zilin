/*
 * @Description: 代码测试文件 多半没用
 * @Author: LinHengJi
 * @Date: 2024-05-07
 * @LastEditTime: 2024-05-07 17:48:13
 * @LastEditors: LinHengJi
 * @version: 1.0
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});
