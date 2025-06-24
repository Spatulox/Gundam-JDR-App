
import { StyleSheet, Dimensions } from 'react-native';
import { globalStyles } from '../../../styles/globalStyle';
const screenWidth = Dimensions.get('window').width;

export const noProjectsStyles = StyleSheet.create({
  card: {
    ...globalStyles.card,
    paddingVertical: 48,
    paddingHorizontal: 24,
    alignItems: 'center',
    minHeight: 320,
    marginTop: 40,
    alignSelf: 'center',
    width: screenWidth > 800 ? 800 : '90%',
    maxWidth: 800,
    position: 'relative',
  },
  createBtnTop: {
    ...globalStyles.buttonPrimary,
    position: 'absolute',
    right: 24,
    top: 24,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  noProjectsTitle: {
    ...globalStyles.textSubtitle,
    marginBottom: 8,
    textAlign: 'center',
  },
  noProjectsDesc: {
    color: '#7a7f8c',
    fontSize: 15,
    marginBottom: 32,
    textAlign: 'center',
    maxWidth: 320,
  },
  createBtnMain: {
    ...globalStyles.buttonPrimary,
    paddingVertical: 12,
    paddingHorizontal: 28,
    marginTop: 8,
  },
});