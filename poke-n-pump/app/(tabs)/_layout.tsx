import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
        headerShown: false,
        tabBarStyle: { 
          backgroundColor: '#307676', 
          borderTopColor: "#307676", 
          marginLeft: 10, 
          marginRight: 10, 
          padding: 10, 
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
          tabBarIcon: ({ size, focused }) => <Ionicons name="trophy" size={size} color={focused ? 'yellow' : 'white'} />,
          tabBarLabel: ({ focused }) => <Text style={{ color: focused ? 'yellow' : 'white', fontSize: 10 }}>Ranking</Text>
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ size, focused }) => <Ionicons name="settings" size={size} color={focused ? 'yellow' : 'white'} />,
          tabBarLabel: ({ focused }) => <Text style={{ color: focused ? 'yellow' : 'white', fontSize: 10 }}>Settings</Text>
        }}
      />
    </Tabs>
  );
}
