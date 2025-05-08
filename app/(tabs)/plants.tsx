import React, { useState } from 'react';
import { StyleSheet, ScrollView, Dimensions, TouchableOpacity, View } from 'react-native';
import { Card, Button, Searchbar, Chip } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Sample plant data
const PLANTS = [
  { 
    id: 1, 
    name: 'Tomato', 
    type: 'Vegetable', 
    sunlight: 'Full Sun', 
    water: 'Regular', 
    difficulty: 'Easy',
    growthTime: '70-85 days',
    description: 'Tomatoes are the most popular garden vegetable to grow. They require relatively little space and can yield a large harvest.',
    image: 'https://example.com/tomato.jpg'
  },
  { 
    id: 2, 
    name: 'Basil', 
    type: 'Herb', 
    sunlight: 'Full Sun', 
    water: 'Moderate', 
    difficulty: 'Easy',
    growthTime: '50-70 days',
    description: 'Basil is a popular culinary herb. It grows quickly and can be harvested multiple times throughout the growing season.',
    image: 'https://example.com/basil.jpg'
  },
  { 
    id: 3, 
    name: 'Lavender', 
    type: 'Flower', 
    sunlight: 'Full Sun', 
    water: 'Low', 
    difficulty: 'Moderate',
    growthTime: '90-200 days',
    description: 'Lavender is a beautiful and fragrant perennial that attracts pollinators and can be used in cooking, crafts, and aromatherapy.',
    image: 'https://example.com/lavender.jpg'
  },
  { 
    id: 4, 
    name: 'Carrot', 
    type: 'Vegetable', 
    sunlight: 'Full Sun/Partial Shade', 
    water: 'Moderate', 
    difficulty: 'Moderate',
    growthTime: '70-80 days',
    description: 'Carrots are root vegetables that are relatively easy to grow in loose, sandy soil. They are packed with nutrients.',
    image: 'https://example.com/carrot.jpg'
  },
  { 
    id: 5, 
    name: 'Mint', 
    type: 'Herb', 
    sunlight: 'Partial Shade', 
    water: 'Regular', 
    difficulty: 'Easy',
    growthTime: '70-90 days',
    description: "Mint is a fast-growing, aromatic herb that spreads quickly. It's best grown in containers to prevent it from taking over your garden.",
    image: 'https://example.com/mint.jpg'
  },
];

// Plant categories for filtering
const CATEGORIES = ['All', 'Vegetable', 'Herb', 'Flower'];

export default function PlantsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const onChangeSearch = (query: string) => setSearchQuery(query);
  
  const filteredPlants = PLANTS.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || plant.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderPlantCard = (plant: any) => (
    <Card key={plant.id} style={styles.plantCard}>
      <Card.Content>
        <View style={styles.plantHeader}>
          <ThemedText type="defaultSemiBold" style={styles.plantName}>{plant.name}</ThemedText>
          <Chip style={styles.typeChip}>{plant.type}</Chip>
        </View>
        
        <View style={styles.plantDetails}>
          <View style={styles.detailItem}>
            <MaterialCommunityIcons name="weather-sunny" size={16} color="#FF9800" />
            <ThemedText style={styles.detailText}>{plant.sunlight}</ThemedText>
          </View>
          <View style={styles.detailItem}>
            <MaterialCommunityIcons name="water" size={16} color="#2196F3" />
            <ThemedText style={styles.detailText}>{plant.water}</ThemedText>
          </View>
          <View style={styles.detailItem}>
            <MaterialCommunityIcons name="sprout" size={16} color="#4CAF50" />
            <ThemedText style={styles.detailText}>{plant.growthTime}</ThemedText>
          </View>
        </View>
        
        <ThemedText numberOfLines={2} style={styles.description}>
          {plant.description}
        </ThemedText>
      </Card.Content>
      <Card.Actions>
        <Button mode="text" onPress={() => {}}>Details</Button>
        <Button mode="contained" style={styles.addButton} onPress={() => {}}>
          Add to Garden
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={true}
      alwaysBounceVertical={true}
      bounces={true}
      overScrollMode="always"
    >
      <ThemedView style={styles.searchContainer}>
        <Searchbar
          placeholder="Search plants"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchbar}
        />
      </ThemedView>
      
      <View style={styles.categoriesWrapper}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={true} 
          style={styles.categoriesContainer}
        >
          {CATEGORIES.map(category => (
            <Chip
              key={category}
              selected={category === selectedCategory}
              onPress={() => setSelectedCategory(category)}
              style={styles.categoryChip}
              selectedColor="#FFFFFF"
              textStyle={category === selectedCategory ? styles.selectedChipText : {}}
            >
              {category}
            </Chip>
          ))}
        </ScrollView>
      </View>
      
      <ThemedView style={styles.plantsContainer}>
        {filteredPlants.length > 0 ? (
          filteredPlants.map(renderPlantCard)
        ) : (
          <ThemedText style={styles.noResults}>No plants found matching your criteria</ThemedText>
        )}
      </ThemedView>
      
      <TouchableOpacity style={styles.addNewPlant}>
        <MaterialCommunityIcons name="plus" size={24} color="#FFFFFF" />
        <ThemedText style={styles.addNewPlantText}>Add New Plant</ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 100, // Increased padding to ensure content is fully scrollable
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  searchbar: {
    elevation: 0,
    backgroundColor: '#F5F5F5',
  },
  categoriesWrapper: {
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryChip: {
    marginRight: 8,
    backgroundColor: '#E8F5E9',
  },
  selectedChipText: {
    color: '#FFFFFF',
  },
  plantsContainer: {
    padding: 16,
  },
  plantCard: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  plantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  plantName: {
    fontSize: 18,
  },
  typeChip: {
    backgroundColor: '#E8F5E9',
    height: 24,
  },
  plantDetails: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    fontSize: 12,
    marginLeft: 4,
  },
  description: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#4CAF50',
  },
  noResults: {
    textAlign: 'center',
    marginTop: 32,
    color: '#757575',
  },
  addNewPlant: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    margin: 16,
  },
  addNewPlantText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontWeight: 'bold',
  },
});
