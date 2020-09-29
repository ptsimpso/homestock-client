import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modal: {
    marginLeft: 20,
    marginRight: 20,
    minWidth: 250,
  },
  header: {
    textAlign: 'center',
    marginBottom: 5,
  },
  code: {
    textAlign: 'center',
    marginBottom: 30,
  },
});
