import { StyleSheet, Dimensions } from 'react-native';
import { globalStyles } from '../../styles/globalStyle';

const screenWidth = Dimensions.get('window').width;

export const projectListStyles = StyleSheet.create({
  card: {
    ...globalStyles.card,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 18,
    marginBottom: 18,
    alignSelf: 'center',
    width: screenWidth > 600 ? 600 : '95%',
    maxWidth: 600,
    position: 'relative',
    gap: 16,
  },
  img: {
    width: 110,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#e6e7eb',
    marginRight: 12,
  },
  info: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#23272f',
  },
  systemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 2,
  },
  systemIcon: {
    fontSize: 14,
  },
  systemText: {
    color: '#7a7f8c',
    fontSize: 14,
  },
  desc: {
    color: '#444',
    fontSize: 14,
    marginBottom: 7,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 18,
    marginTop: 4,
  },
  meta: {
    color: '#7a7f8c',
    fontSize: 13,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    position: 'absolute',
    right: 18,
    bottom: 18,
  },
  actionBtn: {
    ...globalStyles.buttonSecondary,
    paddingVertical: 7,
    paddingHorizontal: 9,
  },
});
