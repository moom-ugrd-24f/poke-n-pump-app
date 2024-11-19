import { StyleSheet } from 'react-native';
import { ThemedView } from '../ThemedView';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import WorkoutSchedule from '../WorkoutSchedule';

export default function ProfileInfos() {
  const colorScheme = useColorScheme();

  const themeColor = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={styles.visibilityView}>
        <ThemedText type='title'>Choose your visibility setting</ThemedText>
        <WorkoutSchedule />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
    visibilityView: {
        height: '40%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});
