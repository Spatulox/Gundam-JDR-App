import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    padding: 0,
  },
  buttonPrimary: {
    backgroundColor: '#6c47ff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 22,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondary: {
    backgroundColor: '#f3f4f7',
    borderRadius: 7,
    paddingVertical: 9,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#23272f',
  },
  textSubtitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#23272f',
  },
  textMuted: {
    color: '#7a7f8c',
    fontSize: 14,
  },
  iconPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#e6e7eb',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  input: {
    backgroundColor: '#f7f8fa',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 4,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});