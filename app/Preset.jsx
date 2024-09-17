import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

const data = [
  { id: '1', title: 'Card 1' },
  { id: '2', title: 'Card 2' },
  { id: '3', title: 'Card 3' },
  { id: '4', title: 'Card 4' },
  { id: '5', title: 'Card 5' },
];

const renderItem = ({ item }) => (
  <View style={styles.card}>
    {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
    <Text style={styles.title}>{item.title}</Text>
  </View>
);

const Preset = () => (
  <FlatList
    data={data}
    renderItem={renderItem}
    keyExtractor={(item) => item.id}
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={false}
    snapToAlignment="center"
    decelerationRate="fast"
    contentContainerStyle={styles.container}
  />
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#0f0f36',   //0A0A2C   1A1A51
    borderRadius: 20,
    borderWidth: 1,
    borderColor:'#363670',
    width: viewportWidth - 120,
    height:400,
    marginHorizontal: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Preset;