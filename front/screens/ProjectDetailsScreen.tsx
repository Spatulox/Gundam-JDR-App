import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Project } from './ProjectScreen';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList, ScreenList } from './ScreenList';
import { globalStyles } from '../styles/globalStyle';
import AdventureGrid from '../components/test/AdventureGrid';


export type ProjectDetailsType = {
  project: Project,
};

type ProjectDetailsRouteProp = RouteProp<RootStackParamList, ScreenList.ProjectDetails>;

export default function ProjectDetails() {
  const route = useRoute<ProjectDetailsRouteProp>();
  const [modalVisible, setModalVisible] = React.useState(false);
  const { project } = route.params
  console.log(project)

  function onPress(project: any) {
    console.log('Project pressed:', project);
  }

  return <>
    <View style={[globalStyles.card, styles.headerRow]}>
      <Text style={styles.title}>{project.title}</Text>
      <TouchableOpacity style={styles.createBtn} onPress={() => setModalVisible(true)}>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>+ Create New Thing</Text>
      </TouchableOpacity>
    </View>
    <View>
      {project.characters && project.characters.length > 0 && (
        <AdventureGrid
          data={project.characters}
          onPressCard={onPress}
        />
      )}
      {project.shop && project.shop.length > 0 && (
        <AdventureGrid
          data={project.shop}
          onPressCard={onPress}
        />
      )}
    </View>
  </>
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 18, paddingTop: 10 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, padding: 10, borderRadius: 0 },
  title: { fontWeight: 'bold', fontSize: 24 },
  createBtn: {
    backgroundColor: '#6c47ff',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    elevation: 2,
    width: 200
  },
});