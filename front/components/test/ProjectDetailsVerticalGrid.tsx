import React from 'react';
import { FlatList, View } from 'react-native';
import ProjectDetailsVerticalCard, { ProjectDetailsCardProps } from './ProjectDetailsVerticalCard';
import { Character, Shop } from '../../screens/ProjectScreen';


type Props = {
  data: Shop | Character[];
  onPressCard: (item: Shop | Character[]) => void;
};

export default function ProjectDetailsVerticalGrid({ data, onPressCard }: Props) {
    let cards: ProjectDetailsCardProps[];
    console.log('AdventureGrid data:', data);
    if (Array.isArray(data) && 'price' in (data[0] || {})) {
        cards = [{
            type: 'shop',
            data: data as Shop,
            onPress: () => onPressCard(data),
        }];
    } else {
        cards = [{
            type: 'characters',
            data: data as Character[],
            onPress: () => onPressCard(data),
        }];
    }

    return (
        <View>
            <FlatList
            data={cards}
            keyExtractor={(_, idx) => idx.toString()}
            numColumns={3}
            renderItem={({ item }) => <ProjectDetailsVerticalCard {...item} />}
            contentContainerStyle={{ padding: 12 }}
            />
        </View>
    );
}
