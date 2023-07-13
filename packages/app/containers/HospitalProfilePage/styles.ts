import { StyleSheet, Dimensions } from 'react-native';
import { themePatient } from '../App/themes';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  bodyContainer: {
    // flex: 1,
    backgroundColor: 'white'
    // borderWidth: 1,
    // borderColor: 'red'
  },
  bottomHeader: {
    alignItems: 'center',
    // backgroundColor: themePatient.colors.primary,
    height: 62
  },
  imageMargin: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 70,
    width: 134,
    height: 134
  },
  image: {
    width: 115,
    height: 115,
    borderRadius: 70
  },
  space: {
    height: 7,
    backgroundColor: '#eeeeee',
    marginTop: 15
  },
  bookAppointmentSection: {
    marginTop: 20,
    alignItems: 'center'
  },
  bookAppointmentText: {
    marginBottom: 10,
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold'
  },
  timesSection: {
    width: 100 + '%'
  },
  timesSectionBody: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 15,
    width: 100 + '%',
    marginHorizontal: 15
  },
  timesButtons: {
    marginTop: 10,
    marginLeft: 10,
    alignSelf: 'flex-start'
  },
  timesText: {
    fontSize: 14,
    color: 'gray'
  },
  timesButtons2: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginHorizontal: 5,
    backgroundColor: '#ebebeb',
    justifyContent: 'flex-start'
  },
  timesText2: {
    color: 'black'
  },
  LoadingIndicatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal: {
    flex: 1,
    margin: 0
  },
  surfaceSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
  surface: {
    paddingHorizontal: 12,
    paddingVertical: 15,
    height: 240,
    width: 330,
    elevation: 7
  },
  surfaceBody: {
    alignItems: 'flex-start',
    marginTop: 15,
    marginBottom: 13
  },
  surfaceBody2: {
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 13
  },
  surfaceText: {
    fontSize: 18
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flex: 1,
    paddingHorizontal: 10
  },
  button: {
    alignItems: 'flex-end'
  },
  mapMainContainer: {
    flex: 1,
    width,
    position: 'relative'
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0
  },
  viewDirection: {
    position: 'absolute',
    bottom: 30,
    right: width / 2 - 100
    // width: 300
  },
  bookYourLessonContent: {
    width: 200
  }
});
