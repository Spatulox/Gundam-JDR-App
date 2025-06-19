import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
    onProfilePress?: any
}

export default function Header({ onProfilePress }: Props) {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoIcon}>🎲</Text>
        <Text style={styles.logoText}>JDR Campaign Manager</Text>
      </View>
      <TouchableOpacity style={styles.profileIcon} onPress={onProfilePress}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>👤</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    backgroundColor: '#23272f',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
  logoContainer: { flexDirection: 'row', alignItems: 'center' },
  logoIcon: { fontSize: 22, marginRight: 8 },
  logoText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  profileIcon: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#3d4250',
    alignItems: 'center', justifyContent: 'center'
  }
});