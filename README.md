
# 瑞奇机器人PRD-V0.1

## 1.项目前言
- 请先确保你已安装好了React Native 所需的依赖环境
- node版本：20.13.0

## 2.技术栈
- **JavaScript框架：** react native
- **网络请求工具：** axios
- **UI组件库：** antd-mobile UI
- **路由导航：** react-navigation
- **代码检测工具** Eslint + prettierrc



## 2.如何运行
- 启动metro
>yarn start
- 启动模拟器
> yarn ios

## 3.能给出现问题的你一些帮助
- 如果是MAC系统，最好配置一下终端代理，不然会在网络上浪费很多时间
- 建议直接使用yarn安装，npm安装项目会出现版本不兼容的报错，需要npm install -force强制安装，yarn没有这种情况
- 建议在运行模拟器的时候不要挂梯子，保证模拟器和mac在同一个网络下运行，否则可能出现模拟器报红的情况
- android studio第一次运行时gradle下载依赖非常非常慢，建议直接去https://mirrors.cloud.tencent.com/gradle/下载对应的版本放到dist文件夹里
- jdk版本最好>=17<=20
- **错误: 程序包android.support.v4.content不存在：** AndroidX 是对 android.support.xxx 包的整理后产物。由于之前的 support 包过于混乱，所以，Google 推出了AndroidX。（v4包、v7包什么的都不用了，直接用androidx代替了），报错原因是这个插件版本比较低，还在用support包；要么把引用改为androidx，要么把android/gradle.properties文件里的android.useAndroidX=true给去了
- 不要试图使用react-native-router-flux作为路由插件，react-native-router-flux的坑非常多，较新的react-native的ViewPropTypes属性被移动到了prop-types库中，而flux插件没做对应的更新，导致了版本不兼容的问题
- 不要试图使用react-native-audio，新版本android studio和Gradle已经废弃了里边的compile()等方法，最新版的react-native-audio还在用，会有兼容性问题
- 不要试图使用react-native-community/cameraroll插件，不兼容新版本的安卓
- react-native迭代的版本很多，会导致一些插件不兼容，哪个插件报错就把哪个插件更新到最新版本试试
