import { StyleSheet, Dimensions } from 'react-native';
import { globalStyles } from './globalStyle';

const screenWidth = Dimensions.get('window').width;

export const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(44,62,80,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 28,
    minWidth: 320,
    width: screenWidth > 600 ? 600 : '95%',
    maxWidth: 400,
    gap: 10,
    position: 'relative',
  },
  closeX: {
    position: 'absolute',
    top: 12,
    right: 16,
    zIndex: 2,
  },
  title: {
    ...globalStyles.textSubtitle,
    marginBottom: 8,
  },
  input: {
    ...globalStyles.input,
  },
  uploadBtn: {
    marginVertical: 4,
    alignSelf: 'flex-start',
  },
  preview: {
    width: 90,
    height: 60,
    borderRadius: 8,
    marginVertical: 6,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 10,
  },
  cancelBtn: {
    ...globalStyles.buttonSecondary,
  },
  createBtn: {
    ...globalStyles.buttonPrimary,
  },
});
