import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { projectListStyles } from './ProjectListStyles';
import { globalStyles } from '../../styles/globalStyle';

type Props = {
    projects: any,
    onEdit: (project: any) => void,
    onDelete: (project: any) => void,
}

const icons = {
  dnd: '📖',
  custom: '🛠️',
};

export default function ProjectList({ projects, onEdit, onDelete }: Props) {
  return (
    <FlatList
      data={projects}
      keyExtractor={item => item.id}
      contentContainerStyle={{ gap: 18, paddingBottom: 30 }}
      renderItem={({ item }) => (
        <View style={projectListStyles.card}>
          <Image source={{ uri: item.image }} style={projectListStyles.img} />
          <View style={projectListStyles.info}>
            <Text style={projectListStyles.title}>{item.title}</Text>
            <View style={projectListStyles.systemRow}>
              <Text style={projectListStyles.systemIcon}>
                {item.system === 'D&D 5th Edition' ? icons.dnd : icons.custom}
              </Text>
              <Text style={projectListStyles.systemText}>{item.system}</Text>
            </View>
            <Text style={projectListStyles.desc}>{item.description}</Text>
            <View style={projectListStyles.metaRow}>
              <Text style={projectListStyles.meta}>👥 {item.characters} characters</Text>
              <Text style={projectListStyles.meta}>📅 {item.date}</Text>
            </View>
          </View>
          <View style={projectListStyles.actions}>
            <TouchableOpacity onPress={() => onEdit(item)} style={projectListStyles.actionBtn}>
              <Text>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(item)} style={projectListStyles.actionBtn}>
              <Text>🗑️</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}