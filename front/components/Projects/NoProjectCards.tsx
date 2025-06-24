import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/globalStyle';
import { noProjectsStyles } from './css/noProjectStyles';

type Props = {
  onCreate: () => void;
};

globalStyles

export default function NoProjectsCard({ onCreate }: Props) {
  return (
    <View style={noProjectsStyles.card}>
      <View style={globalStyles.iconPlaceholder}>
        <Text style={{ fontSize: 40, color: '#b0b5c3' }}>📄</Text>
      </View>
      <Text style={noProjectsStyles.noProjectsTitle}>No projects yet</Text>
      <Text style={noProjectsStyles.noProjectsDesc}>
        Create your first project for a D&D campaign to get started
      </Text>
      <TouchableOpacity style={noProjectsStyles.createBtnMain} onPress={onCreate}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>+ Create Your First Project</Text>
      </TouchableOpacity>
    </View>
  );
}