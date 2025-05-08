import React, { useState } from 'react';
import { StyleSheet, ScrollView, Dimensions, TouchableOpacity, View, ImageBackground } from 'react-native';
import { Card, Button, Divider, ProgressBar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Sample meditation data
const MEDITATIONS = [
  {
    id: 1,
    title: 'Garden Mindfulness',
    duration: '10 min',
    category: 'Mindful Gardening',
    description: 'Connect with nature while tending to your garden. Focus on the sensations of soil, plants, and the environment around you.',
    benefits: ['Stress reduction', 'Increased focus', 'Connection with nature'],
    completed: false,
    image: 'https://example.com/garden-meditation.jpg'
  },
  {
    id: 2,
    title: 'Morning Harvest',
    duration: '5 min',
    category: 'Gratitude',
    description: "Practice gratitude while harvesting from your garden. Appreciate the growth cycle and the nourishment provided by your plants.",
    benefits: ['Gratitude practice', 'Mindful eating', 'Present moment awareness'],
    completed: true,
    image: 'https://example.com/harvest-meditation.jpg'
  },
  {
    id: 3,
    title: 'Seed to Sprout',
    duration: '15 min',
    category: 'Growth Mindset',
    description: 'Reflect on growth and transformation while planting seeds. Connect with the potential within each seed and within yourself.',
    benefits: ['Patience development', 'Growth mindset', 'Acceptance'],
    completed: false,
    image: 'https://example.com/seed-meditation.jpg'
  },
  {
    id: 4,
    title: 'Nature Sounds',
    duration: '20 min',
    category: 'Sound Meditation',
    description: 'Listen to the natural sounds in your garden environment. Focus on birds, insects, wind, and other elements of the natural soundscape.',
    benefits: ['Auditory focus', 'Stress reduction', 'Environmental awareness'],
    completed: false,
    image: 'https://example.com/nature-sounds.jpg'
  },
];

// Sample mindfulness tips
const MINDFULNESS_TIPS = [
  {
    id: 1,
    title: 'Mindful Watering',
    tip: 'When watering your plants, focus completely on the task. Notice the sound of the water, the darkening of the soil, and the response of the plants.',
  },
  {
    id: 2,
    title: 'Sensory Garden Walk',
    tip: 'Take a slow walk through your garden using all five senses. What do you see, hear, smell, feel, and taste?',
  },
  {
    id: 3,
    title: 'Gratitude Harvesting',
    tip: "Before harvesting, take a moment to express gratitude for the plant's growth and the nourishment it will provide.",
  },
];

// Sample mindfulness streak data
const STREAK_DATA = {
  current: 5,
  longest: 12,
  thisWeek: 4,
  totalSessions: 28,
  totalMinutes: 342,
};

export default function MindfulnessScreen() {
  const [activeTab, setActiveTab] = useState('meditations');
  
  const renderMeditationCard = (meditation: any) => (
    <View key={meditation.id} style={styles.meditationCardWrapper}>
      <Card style={styles.meditationCard}>
        <View style={styles.cardContentWrapper}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }}
            style={styles.meditationImage}
            imageStyle={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
          >
            <View style={styles.meditationOverlay}>
              <ThemedText style={styles.meditationCategory}>{meditation.category}</ThemedText>
              <ThemedText style={styles.meditationDuration}>{meditation.duration}</ThemedText>
            </View>
          </ImageBackground>
          
          <Card.Content style={styles.meditationContent}>
            <ThemedText type="defaultSemiBold" style={styles.meditationTitle}>
              {meditation.title}
            </ThemedText>
            
            <ThemedText style={styles.meditationDescription}>
              {meditation.description}
            </ThemedText>
            
            <View style={styles.benefitsContainer}>
              {meditation.benefits.map((benefit: string, index: number) => (
                <View key={index} style={styles.benefitItem}>
                  <MaterialCommunityIcons name="check-circle" size={14} color="#4CAF50" />
                  <ThemedText style={styles.benefitText}>{benefit}</ThemedText>
                </View>
              ))}
            </View>
          </Card.Content>
          
          <Card.Actions>
            <Button 
              mode="contained" 
              style={styles.startButton}
              icon="play"
              onPress={() => {}}
            >
              Start
            </Button>
          </Card.Actions>
        </View>
    </Card>
    </View>
  );

  const renderTipCard = (tip: any) => (
    <Card key={tip.id} style={styles.tipCard}>
      <Card.Content>
        <ThemedText type="defaultSemiBold" style={styles.tipTitle}>
          {tip.title}
        </ThemedText>
        <ThemedText style={styles.tipText}>
          {tip.tip}
        </ThemedText>
      </Card.Content>
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
      <ThemedView style={styles.headerContainer}>
        <ThemedText type="title" style={styles.headerTitle}>Mindful Gardening</ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          Connect with nature and nurture your mind
        </ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.streakContainer}>
        <View style={styles.streakHeader}>
          <View>
            <ThemedText type="defaultSemiBold">Current Streak</ThemedText>
            <ThemedText style={styles.streakCount}>{STREAK_DATA.current} days</ThemedText>
          </View>
          <MaterialCommunityIcons name="meditation" size={40} color="#4CAF50" />
        </View>
        
        <Divider style={styles.divider} />
        
        <View style={styles.streakStats}>
          <View style={styles.statItem}>
            <ThemedText style={styles.statValue}>{STREAK_DATA.longest}</ThemedText>
            <ThemedText style={styles.statLabel}>Longest</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={styles.statValue}>{STREAK_DATA.thisWeek}</ThemedText>
            <ThemedText style={styles.statLabel}>This Week</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={styles.statValue}>{STREAK_DATA.totalSessions}</ThemedText>
            <ThemedText style={styles.statLabel}>Sessions</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={styles.statValue}>{STREAK_DATA.totalMinutes}</ThemedText>
            <ThemedText style={styles.statLabel}>Minutes</ThemedText>
          </View>
        </View>
        
        <View style={styles.weekProgress}>
          <ThemedText style={styles.weekProgressLabel}>This Week's Progress</ThemedText>
          <ProgressBar progress={0.57} color="#4CAF50" style={styles.progressBar} />
          <ThemedText style={styles.weekProgressText}>4 of 7 days completed</ThemedText>
        </View>
      </ThemedView>
      
      <ThemedView style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'meditations' && styles.activeTab]}
          onPress={() => setActiveTab('meditations')}
        >
          <ThemedText 
            style={[styles.tabText, activeTab === 'meditations' && styles.activeTabText]}
          >
            Meditations
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'tips' && styles.activeTab]}
          onPress={() => setActiveTab('tips')}
        >
          <ThemedText 
            style={[styles.tabText, activeTab === 'tips' && styles.activeTabText]}
          >
            Mindfulness Tips
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
      
      <ThemedView style={styles.contentSection}>
        {activeTab === 'meditations' ? (
          <>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Garden Meditations
            </ThemedText>
            {MEDITATIONS.map(renderMeditationCard)}
          </>
        ) : (
          <>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Mindful Gardening Tips
            </ThemedText>
            {MINDFULNESS_TIPS.map(renderTipCard)}
            
            <Card style={styles.journalCard}>
              <Card.Content>
                <View style={styles.journalHeader}>
                  <MaterialCommunityIcons name="book-open-variant" size={24} color="#4CAF50" />
                  <ThemedText type="defaultSemiBold" style={styles.journalTitle}>
                    Gardening Journal
                  </ThemedText>
                </View>
                <ThemedText style={styles.journalDescription}>
                  Record your thoughts, observations, and feelings about your garden. 
                  Journaling is a powerful mindfulness practice that helps you connect 
                  more deeply with your garden and yourself.
                </ThemedText>
              </Card.Content>
              <Card.Actions>
                <Button mode="contained" style={styles.journalButton} onPress={() => {}}>
                  Open Journal
                </Button>
              </Card.Actions>
            </Card>
          </>
        )}
      </ThemedView>
      
      <ThemedView style={styles.quoteContainer}>
        <MaterialCommunityIcons name="format-quote-open" size={24} color="#4CAF50" />
        <ThemedText style={styles.quote}>
          "The garden is a mirror of the heart. What we plant with attention and care will grow and flourish."
        </ThemedText>
        <ThemedText style={styles.quoteAuthor}>— Garden Wisdom</ThemedText>
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
  meditationCardWrapper: {
    marginBottom: 16,
  },
  cardContentWrapper: {
    overflow: 'hidden',
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
  streakContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  streakHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  streakCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  divider: {
    backgroundColor: '#E0E0E0',
    marginVertical: 12,
  },
  streakStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: 12,
    color: '#757575',
  },
  weekProgress: {
    marginTop: 8,
  },
  weekProgressLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  weekProgressText: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4,
    textAlign: 'right',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#4CAF50',
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  contentSection: {
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  meditationCard: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  meditationImage: {
    height: 120,
    justifyContent: 'space-between',
  },
  meditationOverlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  meditationCategory: {
    color: '#FFFFFF',
    backgroundColor: 'rgba(76, 175, 80, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
  },
  meditationDuration: {
    color: '#FFFFFF',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
  },
  meditationContent: {
    padding: 12,
  },
  meditationTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  meditationDescription: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 12,
  },
  benefitsContainer: {
    marginTop: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  benefitText: {
    fontSize: 12,
    color: '#757575',
    marginLeft: 4,
  },
  startButton: {
    backgroundColor: '#4CAF50',
    marginLeft: 'auto',
  },
  tipCard: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  tipTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#757575',
  },
  journalCard: {
    marginTop: 16,
    backgroundColor: '#E8F5E9',
  },
  journalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  journalTitle: {
    fontSize: 18,
    marginLeft: 8,
  },
  journalDescription: {
    fontSize: 14,
    color: '#757575',
  },
  journalButton: {
    backgroundColor: '#4CAF50',
    marginLeft: 'auto',
  },
  quoteContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    alignItems: 'center',
  },
  quote: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 8,
  },
  quoteAuthor: {
    fontSize: 14,
    color: '#757575',
  },
});
