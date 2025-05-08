import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { Text, Button, TextInput, Avatar, Divider, Switch, List } from 'react-native-paper';
import { useAuth } from '@/context/AuthContext';
import { useGarden } from '@/context/GardenContext';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const { 
    currentStreak, 
    longestStreak, 
    sessionsThisWeek, 
    totalSessions,
    gardenPlots,
    plants,
    tasks,
    meditationSessions
  } = useGarden();
  
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  
  // Stats for the profile
  const totalPlantsInGarden = plants.filter(p => p.inGarden).length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = tasks.filter(t => !t.completed).length;
  
  const handleSaveProfile = () => {
    // In a real app, you would update the user profile in the backend
    Alert.alert('Success', 'Profile updated successfully');
    setIsEditing(false);
  };
  
  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          onPress: signOut,
          style: 'destructive',
        },
      ]
    );
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Image 
          size={100} 
          source={{ uri: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user?.fullName || 'User') }} 
          style={styles.avatar}
        />
        
        {isEditing ? (
          <View style={styles.editForm}>
            <TextInput
              label="Full Name"
              value={fullName}
              onChangeText={setFullName}
              style={styles.input}
              mode="outlined"
              outlineColor="#4CAF50"
              activeOutlineColor="#4CAF50"
            />
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              mode="outlined"
              outlineColor="#4CAF50"
              activeOutlineColor="#4CAF50"
              disabled
            />
            <View style={styles.buttonRow}>
              <Button 
                mode="outlined" 
                onPress={() => setIsEditing(false)}
                style={[styles.button, styles.cancelButton]}
              >
                Cancel
              </Button>
              <Button 
                mode="contained" 
                onPress={handleSaveProfile}
                style={[styles.button, styles.saveButton]}
              >
                Save
              </Button>
            </View>
          </View>
        ) : (
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user?.fullName}</Text>
            <Text style={styles.email}>{user?.email}</Text>
            <Button 
              mode="outlined" 
              onPress={() => setIsEditing(true)}
              style={styles.editButton}
              icon="pencil"
            >
              Edit Profile
            </Button>
          </View>
        )}
      </View>
      
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Your Garden Stats</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{gardenPlots.length}</Text>
            <Text style={styles.statLabel}>Garden Plots</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalPlantsInGarden}</Text>
            <Text style={styles.statLabel}>Plants Growing</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{completedTasks}</Text>
            <Text style={styles.statLabel}>Tasks Completed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{pendingTasks}</Text>
            <Text style={styles.statLabel}>Tasks Pending</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.streakContainer}>
        <Text style={styles.sectionTitle}>Mindfulness Journey</Text>
        <View style={styles.streakGrid}>
          <View style={styles.streakItem}>
            <Text style={styles.streakValue}>{currentStreak}</Text>
            <Text style={styles.streakLabel}>Current Streak</Text>
          </View>
          <View style={styles.streakItem}>
            <Text style={styles.streakValue}>{longestStreak}</Text>
            <Text style={styles.streakLabel}>Longest Streak</Text>
          </View>
          <View style={styles.streakItem}>
            <Text style={styles.streakValue}>{sessionsThisWeek}</Text>
            <Text style={styles.streakLabel}>This Week</Text>
          </View>
          <View style={styles.streakItem}>
            <Text style={styles.streakValue}>{totalSessions}</Text>
            <Text style={styles.streakLabel}>Total Sessions</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.settingsContainer}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <List.Item
          title="Push Notifications"
          description="Receive reminders about garden tasks"
          left={props => <List.Icon {...props} icon="bell" />}
          right={props => 
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              color="#4CAF50"
            />
          }
        />
        <Divider />
        <List.Item
          title="Dark Mode"
          description="Use dark theme throughout the app"
          left={props => <List.Icon {...props} icon="theme-light-dark" />}
          right={props => 
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              color="#4CAF50"
            />
          }
        />
        <Divider />
        <List.Item
          title="Privacy Policy"
          description="Read our privacy policy"
          left={props => <List.Icon {...props} icon="shield-account" />}
          onPress={() => {}}
        />
        <Divider />
        <List.Item
          title="Terms of Service"
          description="Read our terms of service"
          left={props => <List.Icon {...props} icon="file-document" />}
          onPress={() => {}}
        />
        <Divider />
      </View>
      
      <Button 
        mode="contained" 
        onPress={handleSignOut}
        style={styles.signOutButton}
        icon="logout"
        buttonColor="#f44336"
      >
        Sign Out
      </Button>
      
      <View style={styles.footer}>
        <Text style={styles.version}>Paxton's Garden v1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatar: {
    marginBottom: 16,
    backgroundColor: '#4CAF50',
  },
  profileInfo: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 16,
  },
  editButton: {
    borderColor: '#4CAF50',
    borderWidth: 1,
  },
  editForm: {
    width: '100%',
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  cancelButton: {
    borderColor: '#757575',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  statsContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333333',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
  },
  streakContainer: {
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  streakGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  streakItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  streakValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  streakLabel: {
    fontSize: 14,
    color: '#666666',
  },
  settingsContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  signOutButton: {
    margin: 20,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  version: {
    color: '#9E9E9E',
    fontSize: 12,
  },
});
