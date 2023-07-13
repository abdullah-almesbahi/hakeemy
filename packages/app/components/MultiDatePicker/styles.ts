import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white'
  },
  search: {
    margin: 10
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20
  },
  checkBoxLine: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderColor: '#d8d8d8'
  },
  listOptions: {
    marginLeft: 30,
    fontSize: 17
  },
  surface: {
    paddingHorizontal: 7,
    paddingVertical: 15,
    height: 400,
    width: 330,
    justifyContent: 'space-between',
    elevation: 7
  }
});
