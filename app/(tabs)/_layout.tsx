import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const iconSize = 24;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Garden',
          headerTitle: "Paxton's Garden",
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="flower" size={iconSize} color={color} />,
        }}
      />
      <Tabs.Screen
        name="plants"
        options={{
          title: 'Plants',
          headerTitle: 'Plant Library',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="sprout" size={iconSize} color={color} />,
        }}
      />
      <Tabs.Screen
        name="meals"
        options={{
          title: 'Meals',
          headerTitle: 'Healthy Meals',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="food-apple" size={iconSize} color={color} />,
        }}
      />
      <Tabs.Screen
        name="mindfulness"
        options={{
          title: 'Mindful',
          headerTitle: 'Mindfulness',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="meditation" size={iconSize} color={color} />,
        }}
      />
    </Tabs>
  );
}
