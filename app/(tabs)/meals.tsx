import React, { useState } from 'react';
import { StyleSheet, ScrollView, Dimensions, Image, View } from 'react-native';
import { Card, Button, Searchbar, Chip, Divider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Sample meal/recipe data
const RECIPES = [
  {
    id: 1,
    name: 'Garden Fresh Salad',
    category: 'Lunch',
    prepTime: '15 min',
    difficulty: 'Easy',
    ingredients: [
      'Fresh lettuce', 'Cherry tomatoes', 'Cucumber', 'Red onion', 
      'Bell pepper', 'Olive oil', 'Balsamic vinegar', 'Salt and pepper'
    ],
    gardenIngredients: ['lettuce', 'tomatoes', 'cucumber'],
    instructions: 'Wash and chop all vegetables. Mix in a large bowl. Drizzle with olive oil and balsamic vinegar. Season with salt and pepper to taste.',
    nutritionInfo: {
      calories: 120,
      protein: '2g',
      carbs: '10g',
      fat: '8g',
      fiber: '3g'
    },
    image: 'https://example.com/garden-salad.jpg'
  },
  {
    id: 2,
    name: 'Herb Roasted Vegetables',
    category: 'Dinner',
    prepTime: '45 min',
    difficulty: 'Medium',
    ingredients: [
      'Carrots', 'Potatoes', 'Zucchini', 'Red onion', 
      'Fresh rosemary', 'Fresh thyme', 'Olive oil', 'Salt and pepper', 'Garlic'
    ],
    gardenIngredients: ['carrots', 'zucchini', 'rosemary', 'thyme'],
    instructions: 'Preheat oven to 425°F. Chop vegetables into similar-sized pieces. Toss with olive oil, minced garlic, and chopped herbs. Roast for 30-35 minutes, stirring halfway through.',
    nutritionInfo: {
      calories: 180,
      protein: '3g',
      carbs: '25g',
      fat: '7g',
      fiber: '5g'
    },
    image: 'https://example.com/roasted-vegetables.jpg'
  },
  {
    id: 3,
    name: 'Tomato Basil Pasta',
    category: 'Dinner',
    prepTime: '30 min',
    difficulty: 'Easy',
    ingredients: [
      'Pasta', 'Fresh tomatoes', 'Fresh basil', 'Garlic', 
      'Olive oil', 'Parmesan cheese', 'Salt and pepper'
    ],
    gardenIngredients: ['tomatoes', 'basil'],
    instructions: 'Cook pasta according to package directions. In a pan, sauté minced garlic in olive oil. Add chopped tomatoes and cook until softened. Stir in torn basil leaves. Toss with pasta and top with grated Parmesan.',
    nutritionInfo: {
      calories: 320,
      protein: '10g',
      carbs: '50g',
      fat: '9g',
      fiber: '3g'
    },
    image: 'https://example.com/tomato-basil-pasta.jpg'
  },
  {
    id: 4,
    name: 'Mint Infused Water',
    category: 'Beverage',
    prepTime: '5 min',
    difficulty: 'Easy',
    ingredients: [
      'Water', 'Fresh mint leaves', 'Cucumber slices', 'Lemon slices'
    ],
    gardenIngredients: ['mint', 'cucumber'],
    instructions: 'Combine all ingredients in a pitcher. Let sit for at least 1 hour in the refrigerator before serving for flavors to infuse.',
    nutritionInfo: {
      calories: 5,
      protein: '0g',
      carbs: '1g',
      fat: '0g',
      fiber: '0g'
    },
    image: 'https://example.com/mint-water.jpg'
  },
];

// Recipe categories for filtering
const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Beverage', 'Snack'];

export default function MealsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const onChangeSearch = (query: string) => setSearchQuery(query);
  
  const filteredRecipes = RECIPES.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderRecipeCard = (recipe: any) => (
    <View key={recipe.id} style={styles.recipeCardWrapper}>
      <Card style={styles.recipeCard}>
        <View style={styles.cardContentWrapper}>
          <Card.Content>
            <View style={styles.recipeHeader}>
              <ThemedText type="defaultSemiBold" style={styles.recipeName}>{recipe.name}</ThemedText>
              <Chip style={styles.categoryChip}>{recipe.category}</Chip>
            </View>
            
            <View style={styles.recipeDetails}>
              <View style={styles.detailItem}>
                <MaterialCommunityIcons name="clock-outline" size={16} color="#FF9800" />
                <ThemedText style={styles.detailText}>{recipe.prepTime}</ThemedText>
              </View>
              <View style={styles.detailItem}>
                <MaterialCommunityIcons name="chef-hat" size={16} color="#2196F3" />
                <ThemedText style={styles.detailText}>{recipe.difficulty}</ThemedText>
              </View>
            </View>
            
            <ThemedText style={styles.sectionTitle}>Garden Ingredients:</ThemedText>
            <View style={styles.ingredientsList}>
              {recipe.gardenIngredients.map((ingredient: string, index: number) => (
                <Chip key={index} style={styles.ingredientChip}>
                  {ingredient}
                </Chip>
              ))}
            </View>
            
            <ThemedText numberOfLines={2} style={styles.instructions}>
              {recipe.instructions}
            </ThemedText>
          </Card.Content>
          <Card.Actions>
            <Button mode="text" onPress={() => {}}>Nutrition Info</Button>
            <Button mode="contained" style={styles.viewButton} onPress={() => {}}>
              View Recipe
            </Button>
          </Card.Actions>
        </View>
      </Card>
    </View>
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
      <ThemedView style={styles.headerContainer}>
        <ThemedText type="title" style={styles.headerTitle}>Garden to Table</ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          Healthy recipes using ingredients from your garden
        </ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.searchContainer}>
        <Searchbar
          placeholder="Search recipes"
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
              style={styles.filterChip}
              selectedColor="#FFFFFF"
              textStyle={category === selectedCategory ? styles.selectedChipText : {}}
            >
              {category}
            </Chip>
          ))}
        </ScrollView>
      </View>
      
      <ThemedView style={styles.recipesContainer}>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map(renderRecipeCard)
        ) : (
          <ThemedText style={styles.noResults}>No recipes found matching your criteria</ThemedText>
        )}
      </ThemedView>
      
      <ThemedView style={styles.featuredSection}>
        <ThemedText type="subtitle" style={styles.featuredTitle}>
          Seasonal Recommendations
        </ThemedText>
        <Divider style={styles.divider} />
        <View style={styles.featuredWrapper}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={true}
          >
            {RECIPES.map(recipe => (
              <Card key={recipe.id} style={styles.featuredCard}>
                <Card.Content>
                  <ThemedText type="defaultSemiBold">{recipe.name}</ThemedText>
                  <ThemedText style={styles.featuredCategory}>{recipe.category}</ThemedText>
                </Card.Content>
                <Button mode="text" onPress={() => {}}>View</Button>
              </Card>
            ))}
          </ScrollView>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  recipeCardWrapper: {
    marginBottom: 16,
  },
  cardContentWrapper: {
    overflow: 'hidden',
    borderRadius: 8,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 100, // Increased padding to ensure content is fully scrollable
  },
  headerContainer: {
    padding: 16,
    backgroundColor: '#4CAF50',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'white',
    opacity: 0.8,
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
  filterChip: {
    marginRight: 8,
    backgroundColor: '#E8F5E9',
  },
  selectedChipText: {
    color: '#FFFFFF',
  },
  recipesContainer: {
    padding: 16,
  },
  recipeCard: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  recipeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recipeName: {
    fontSize: 18,
    flex: 1,
  },
  categoryChip: {
    backgroundColor: '#E8F5E9',
    height: 24,
  },
  recipeDetails: {
    flexDirection: 'row',
    marginBottom: 12,
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
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ingredientsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  ingredientChip: {
    backgroundColor: '#E8F5E9',
    margin: 2,
    height: 24,
  },
  instructions: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
  },
  viewButton: {
    backgroundColor: '#4CAF50',
  },
  noResults: {
    textAlign: 'center',
    marginTop: 32,
    color: '#757575',
  },
  featuredSection: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 16,
  },
  featuredWrapper: {
    width: '100%',
  },
  featuredTitle: {
    marginBottom: 8,
  },
  divider: {
    backgroundColor: '#E0E0E0',
    marginBottom: 16,
  },
  featuredCard: {
    width: width * 0.6,
    marginRight: 12,
    backgroundColor: '#E8F5E9',
  },
  featuredCategory: {
    fontSize: 12,
    color: '#757575',
  },
});
