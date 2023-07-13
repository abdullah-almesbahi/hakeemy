import { StyleSheet } from 'react-native';
import { themeHospital } from '../App/themes';
export default StyleSheet.create({
  container: {
    // minHeight: '100%',
    flex: 1,
    width: '100%',
    backgroundColor: 'white'
  },
  bodyContainer: {
    width: '100%',
    paddingTop: 20
  },
  typeContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center'
  },
  typeBody: {
    flex: 1
  },
  dispensaryButton: {
    marginTop: 7,
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0
  },
  clinicPolyClinicButton: {
    marginTop: 7,
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0
  },
  hospitalButton: {
    marginTop: 7,
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  },
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  }
  // errorText: {
  //   marginBottom: 10,
  //   color: "red"
  // }
  // contentStyleButton: {
  //   width: "100%",
  //   height: 45
  // },
  // button: {
  //   marginTop: 5,
  //   marginBottom: 5,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   height: 50
  // }
});
