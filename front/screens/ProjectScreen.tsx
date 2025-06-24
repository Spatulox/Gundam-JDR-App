import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import ProjectList from '../components/Projects/ProjectList';
import CreateProjectModal from '../components/Projects/CreateProjectModal';
import NoProjectsCard from '../components/Projects/NoProjectCards';
import { globalStyles } from '../styles/globalStyle';
import { useNavigation } from '@react-navigation/native';
import { Navigation, ProjectDetailsNavigation, ScreenList } from './ScreenList';

export type Shop = Items[]
export type Items = {
    id: string,
    name?: string,
    description?: string,
    image?: string,
    price: number | undefined,
}

export type Character = {
    id: string,
    name?: string,
    description?: string,
    lore?: string,
    level?: number,
    informations?: object,
    image?: string,
    statistiques?: object
    items: Items[],
}

export type Project = {
    id: string,
    title: string,
    description: string,
    date: string,
    image?: string,
    characters: Character[],
    shop: Shop,
}

export type ProjectCreate = {
    title: string,
    description: string,
    image?: string | undefined,
}

const initialShop: Shop = [
  {
    id: '3',
    name: 'Healing Potion',
    description: 'Restores 20 HP when consumed.',
    image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=400&q=80',
    price: 50,
  },
  {
    id: '4',
    name: 'Mana Potion',
    description: 'Restores 15 MP when consumed.',
    image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=400&q=80',
    price: 75,
  }
]

const initialCharacters: Character[] = [
  {
    id: '1',
    name: 'Elara the Brave',
    description: 'A fearless warrior from the northern tribes, known for her unmatched combat skills and unwavering loyalty.',
    lore: 'Elara hails from the Frostpeak Mountains, where she trained under the legendary warrior, Thorgar. She is driven by a desire to protect her homeland from invaders and to prove herself as the greatest warrior of her generation.',
    level: 5,
    image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=400&q=80',
    statistiques: {
      strength: 18,
      dexterity: 14,
      constitution: 16,
      intelligence: 10,
      wisdom: 12,
      charisma: 8,
    },
    items: [
      {
        id: '1',
        name: 'Frostbite Sword',
        description: 'A magical sword that deals extra cold damage to enemies.',
        image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=400&q=80',
        price: 150,
      }
    ]
  },
  {
    id: '2',
    name: 'Thalion the Wise',
    description: 'A skilled mage with a deep understanding of the arcane arts, Thalion is known for his wisdom and powerful spells.',
    lore: 'Thalion studied at the Arcane Academy in Eldoria, where he mastered the art of magic. He seeks to uncover ancient secrets and protect the world from dark forces that threaten to disrupt the balance of magic.',
    level: 7,
    image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=400&q=80',
    statistiques: {
      strength: 8,
      dexterity: 12,
      constitution: 10,
      intelligence: 20,
      wisdom: 16,
      charisma: 14,
    },
    items: [
      {
        id: '2',
        name: 'Staff of Arcane Power',
        description: 'A powerful staff that enhances the wielder\'s magical abilities and allows them to cast spells more effectively.',
        image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=400&q=80',
        price: 200,
      }
    ]
  }
]

const initialProjects: Project[] = [
  {
    id: '1',
    title: 'The Lost Mines of Phandelver',
    description: 'A classic D&D adventure following a group of adventurers as they explore the Sword Coast and uncover ancient dwarven secrets.',
    date: '15/01/2024',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    characters: initialCharacters,
    shop: initialShop,
  },
  {
    id: '2',
    title: 'Curse of Strahd Campaign',
    description: 'A dark gothic horror campaign set in the mysterious land of Barovia, where the players must face the legendary vampire Count Strahd.',
    date: '10/01/2024',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    characters: [],
    shop: initialShop,
  },
  {
    id: '3',
    title: 'Homebrew: Kingdom of Eldara',
    description: 'A custom campaign in a high-fantasy setting where magic and technology coexist. Players are part of an elite group protecting the realm.',
    date: '05/01/2024',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    characters: initialCharacters,
    shop: [],
  },
];

export default function ProjectScreen() {
  const [projects, setProjects] = useState<Project[] | null>();
  const [modalVisible, setModalVisible] = useState(false);
  const hasProjects = projects && projects.length > 0;
  const navigation = useNavigation<Navigation>();

  useEffect(() => {
    setProjects(initialProjects);
  }, []);

  const handleCreate = (project: ProjectCreate) => {
    if(projects){
      setProjects([
        ...projects,
        {
          ...project,
          id: (projects.length + 1).toString(),
          date: new Date().toLocaleDateString('fr-FR'),
          characters: initialCharacters,
          shop: initialShop,
        } 
      ]);
    } else {
      const proj: Project = {
        ...project,
        id: "0",
        date: new Date().toLocaleDateString('fr-FR'),
        characters: initialCharacters,
        shop: initialShop,
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
    navigation.navigate(ScreenList.ProjectDetails, { project });
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
