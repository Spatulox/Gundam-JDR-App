import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import ProjectList from '../components/Projects/ProjectList';
import CreateProjectModal from '../components/Projects/CreateProjectModal';
import NoProjectsCard from '../components/Projects/NoProjectCards';
import { globalStyles } from '../styles/globalStyle';
import { useNavigation } from '@react-navigation/native';


export type Project = {
    id: string,
    title: string,
    description: string,
    characters: number,
    date: string,
    image?: string,
}

export type ProjectCreate = {
    title: string,
    description: string,
    image?: string | undefined,
}


const initialProjects = [
  {
    id: '1',
    title: 'The Lost Mines of Phandelver',
    description: 'A classic D&D adventure following a group of adventurers as they explore the Sword Coast and uncover ancient dwarven secrets.',
    characters: 5,
    date: '15/01/2024',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '2',
    title: 'Curse of Strahd Campaign',
    description: 'A dark gothic horror campaign set in the mysterious land of Barovia, where the players must face the legendary vampire Count Strahd.',
    characters: 4,
    date: '10/01/2024',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '3',
    title: 'Homebrew: Kingdom of Eldara',
    description: 'A custom campaign in a high-fantasy setting where magic and technology coexist. Players are part of an elite group protecting the realm.',
    characters: 6,
    date: '05/01/2024',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
  },
];

export default function ProjectScreen() {
  const [projects, setProjects] = useState<Project[] | null>();
  const [modalVisible, setModalVisible] = useState(false);
  const hasProjects = projects && projects.length > 0;
  const navigation = useNavigation();

  const handleCreate = (project: ProjectCreate) => {
    if(projects){
      setProjects([
        ...projects,
        {
          ...project,
          id: (projects.length + 1).toString(),
          characters: 0,
          date: new Date().toLocaleDateString('fr-FR'),
        }
      ]);
    } else {
      const proj: Project = {
        ...project,
        id: "0",
        characters: 0,
        date: new Date().toLocaleDateString('fr-FR'),
      }
      setProjects([proj])
    }
  };

  const handleDelete = (project: Project) => {
    if(projects){
      setProjects(projects.filter(p => p.id !== project.id));
    }
  };
  
  const handleEdit = (project: Project) => {
    //navigation.navigate('ProjectDetail', { id: project.id });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f7f8fa' }}>
      <StatusBar barStyle="light-content" />
      <View>
        <View style={[globalStyles.card, styles.headerRow]}>
          <Text style={styles.title}>My Projects</Text>
          <TouchableOpacity style={styles.createBtn} onPress={() => setModalVisible(true)}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>+ Create New Project</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          {hasProjects ? (
            <View>
              <ProjectList projects={projects} onDelete={handleDelete} onEdit={handleEdit} />
              <TouchableOpacity style={[styles.createBtn, {alignSelf: 'center'}]} onPress={() => setModalVisible(true)}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>+ Create New Project</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <NoProjectsCard onCreate={() => setModalVisible(true)} />
          )}
        </View>
      </View>
      <CreateProjectModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreate={handleCreate}
      />
    </SafeAreaView>
  );
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
