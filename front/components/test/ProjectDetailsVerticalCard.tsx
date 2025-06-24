import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/globalStyle';
import { Ionicons } from '@expo/vector-icons';
import { Character, Shop } from '../../screens/ProjectScreen';

const CARD_MARGIN = 12;
const CARD_COLUMNS = 3;
const CARD_WIDTH = (Dimensions.get('window').width - CARD_MARGIN * (CARD_COLUMNS + 1)) / CARD_COLUMNS;

export type ProjectDetailsCardProps =
  | { type: 'shop'; data: Shop; onPress: () => void }
  | { type: 'characters'; data: Character[]; onPress: () => void };

export default function ProjectDetailsVerticalCard(props: ProjectDetailsCardProps) {
  let title = '';
  let count = 0;
  let label = '';
  let icon: any = null;
  console.log(props);
  if (props.type === 'shop') {
    title = 'Boutique';
    count = props.data.length;
    label = `${count} items`;
    icon = <Ionicons name="cart-outline" size={16} color="#64748b" />;
  } else if (props.type === 'characters') {
    title = 'Personnages';
    count = props.data.length;
    label = `${count} characters`;
    icon = <Ionicons name="people-outline" size={16} color="#64748b" />;
  }

  return (
    <TouchableOpacity style={styles.card} onPress={props.onPress} activeOpacity={0.9}>
      <Image source={{ uri: "https://logo-marque.com/wp-content/uploads/2020/09/Linux-Logo.png" }} style={styles.cover} resizeMode="cover" />
      <View style={styles.content}>
        <Text style={[globalStyles.textSubtitle, styles.title]} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.footer}>
          <View style={styles.row}>
            {icon}
            <Text style={styles.footerText}>{label}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    ...globalStyles.card,
    width: CARD_WIDTH,
    margin: CARD_MARGIN / 2,
    padding: 0,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    minHeight: 330,
    elevation: 2,
  },
  cover: {
    width: '100%',
    height: 200,
    backgroundColor: '#e6e7eb',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#23272f',
    marginBottom: 8,
  },
  description: {
    color: '#475569',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 12,
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerText: {
    color: '#64748b',
    fontSize: 14,
    marginLeft: 6,
  },
});
