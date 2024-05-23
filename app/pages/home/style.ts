import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  titleInfo: {
    marginRight: 'auto',
  },
  titleName: {
    fontSize: 18,
    marginRight: 3,
  },
  videoCard: {
    width: '100%',
    height: 175,
    justifyContent: 'flex-end', // 垂直方向底部对齐
    backgroundColor: '#96CDCD',
    position: 'relative',
    borderRadius: 15,
  },
  videoSwitch: {
    width: 35,
    height: 20,
    position: 'absolute',
    bottom: 15,
    left: 15,
  },
  setButton: {
    width: 30,
    height: 30,
    marginLeft: 15,
  },
  tabButton: {
    width: 50,
    height: 50,
    marginBottom: 3,
  },
  tabButtonText: {
    textAlign: 'center',
  },
  tabView: {
    backgroundColor: '#fff',
    borderRadius: 15,
    height: '97%',
  },
  remoteButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '5%',
  },
  remoteImg: {
    height: '100%',
    aspectRatio: 1, // 保持1:1的宽高比
  },
  remoteArrow: {
    height: '33.33%',
  },
  remoteArrowIcon1: {
    width: '33.3%',
    height: '100%',
    paddingTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  remoteArrowIcon2: {
    width: '33.3%',
    height: '100%',
    paddingLeft: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  remoteArrowIcon3: {
    width: '33.3%',
    height: '100%',
    paddingRight: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  remoteArrowIcon4: {
    width: '33.3%',
    height: '100%',
    paddingBottom: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  speed: {
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    flexBasis: 'auto',
  },
  photoButton: {
    width: 80,
    height: 80,
    marginBottom: 3,
  },
  photoButtonText: {
    textAlign: 'center',
  },
  takePhoto: {
    marginTop: 30,
    marginRight: 25,
  },
  VideoPhoto: {
    marginTop: 30,
    marginLeft: 25,
  },
  rtcViewStyle: {
    flex: 1,
    borderRadius: 15,
  },
  // 巡航
  inspectionTitle: {
    flex: 1,
    height: 40,

    borderWidth: 2,
    borderColor: '#96CDCD',
    borderStyle: 'solid',
  },
  inspectionSet: {
    height: 40,
    borderWidth: 2,
    borderColor: '#96CDCD',
    borderStyle: 'solid',
  },
  inspectionBtnList: {
    flex: 1,
    width: '100%',
  },
  InspectionListItem: {
    width: '100%',
    height: '30%',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  InspectionListItemTitle: {
    flex: 1,
    fontSize: 17,
  },
  inspectionAddbtn: {
    width: 50,
    height: 40,
    borderRadius: 15,
  },
  inspectionPoint: {
    backgroundColor: '#83C0C1',
  },
  inspectionCruise: {
    backgroundColor: '#83C0C1',
  },
  inspectionRandom: {
    backgroundColor: '#83C0C1',
  },
});
export default style;
