import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].icon,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].default,
        tabBarStyle: { 
          backgroundColor: Colors[colorScheme ?? 'light'].tint,
          borderTopColor: Colors[colorScheme ?? 'light'].tint,
          marginLeft: 10, 
          marginRight: 10, 
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0
        },
    }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ size, focused }) => <Ionicons name="home" size={size} color={focused ? 'yellow' : 'white'} />,
          tabBarLabel: ({ focused }) => <Text style={{ color: focused ? 'yellow' : 'white', fontSize: 10 }}>Home</Text>
        }}
      />
      <Tabs.Screen
        name="ranking"
        options={{
          title: 'Ranking',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'trophy' : 'trophy-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

