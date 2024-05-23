/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Router from './app/routers/router.tsx';
import {Provider} from '@ant-design/react-native'; // 这个是ant-design生效的关键
function App(): React.JSX.Element {
  return (
    <Provider>
      <Router />
    </Provider>
  );
}

export default App;
