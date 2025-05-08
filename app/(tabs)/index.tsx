import { Image } from 'expo-image';
import { useState } from 'react';
import { Platform, StyleSheet, ScrollView, TouchableOpacity, Dimensions, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Card, Button } from 'react-native-paper';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [markedDates, setMarkedDates] = useState({});
  
  // Sample garden plots
  const gardenPlots = [
    { id: 1, name: 'Vegetable Garden', size: '10x10 ft', plants: 12 },
    { id: 2, name: 'Herb Garden', size: '5x5 ft', plants: 8 },
    { id: 3, name: 'Flower Bed', size: '8x3 ft', plants: 6 }
  ];

  // Sample upcoming tasks
  const upcomingTasks = [
    { id: 1, task: 'Water vegetable garden', date: '2025-05-09', completed: false },
    { id: 2, task: 'Harvest basil', date: '2025-05-10', completed: false },
    { id: 3, task: 'Plant tomato seedlings', date: '2025-05-12', completed: false },
  ];
  
  const handleDateSelect = (day: { dateString: string }) => {
    const dateString = day.dateString;
    setSelectedDate(dateString);
    
    // Mark the selected date
    const updatedMarkedDates = {
      ...markedDates,
      [dateString]: { selected: true, marked: true, selectedColor: '#4CAF50' }
    };
    setMarkedDates(updatedMarkedDates);
  };

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
        <Image
          source={require('@/assets/images/paxton_icon.png')}
          style={styles.headerImage}
        />
        <ThemedText type="title" style={styles.headerTitle}>Paxton's Garden</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">My Garden Plots</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.plotsContainer}>
          {gardenPlots.map((plot) => (
            <View key={plot.id} style={styles.cardWrapper}>
              <Card style={styles.plotCard}>
                <View style={styles.cardContentWrapper}>
                  <Card.Content>
                    <ThemedText type="defaultSemiBold">{plot.name}</ThemedText>
                    <ThemedText>Size: {plot.size}</ThemedText>
                    <ThemedText>Plants: {plot.plants}</ThemedText>
                  </Card.Content>
                  <Card.Actions>
                    <Button mode="text" onPress={() => {}}>View</Button>
                  </Card.Actions>
                </View>
              </Card>
            </View>
          ))}
          <TouchableOpacity style={styles.addPlotCard}>
            <ThemedText type="defaultSemiBold" style={styles.addPlotText}>+ Add New Plot</ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </ThemedView>
      
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Garden Calendar</ThemedText>
        <Calendar
          onDayPress={handleDateSelect}
          markedDates={markedDates}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#4CAF50',
            selectedDayBackgroundColor: '#4CAF50',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#4CAF50',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#4CAF50',
            selectedDotColor: '#ffffff',
            arrowColor: '#4CAF50',
            monthTextColor: '#4CAF50',
          }}
        />
      </ThemedView>
      
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Upcoming Tasks</ThemedText>
        {upcomingTasks.map((task) => (
          <View key={task.id} style={styles.taskCardWrapper}>
            <Card style={styles.taskCard}>
              <View style={styles.cardContentWrapper}>
                <Card.Content style={styles.taskContent}>
                  <ThemedText>{task.task}</ThemedText>
                  <ThemedText type="defaultSemiBold">{task.date}</ThemedText>
                </Card.Content>
              </View>
            </Card>
          </View>
        ))}
        <Button 
          mode="contained" 
          style={styles.addButton}
          onPress={() => {}}
        >
          Add New Task
        </Button>
      </ThemedView>
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
  headerContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    marginBottom: 16,
  },
  headerImage: {
    height: 110,
    width: 110,
    position: 'absolute',
    opacity: 0.8,
    resizeMode: 'contain',
  },
  headerTitle: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  plotsContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  plotCard: {
    width: width * 0.6,
    marginRight: 12,
    backgroundColor: '#E8F5E9',
  },
  addPlotCard: {
    width: width * 0.6,
    height: 120,
    backgroundColor: '#DCEDC8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPlotText: {
    color: '#4CAF50',
  },
  taskCard: {
    marginBottom: 8,
    backgroundColor: '#E8F5E9',
  },
  taskContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    marginTop: 12,
    backgroundColor: '#4CAF50',
  },
  cardWrapper: {
    marginRight: 12,
  },
  cardContentWrapper: {
    overflow: 'hidden',
    borderRadius: 8,
  },
  taskCardWrapper: {
    marginBottom: 8,
  },
});
