import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themedComponents/ThemedView';
import { ThemedText } from '@/components/themedComponents/ThemedText';
import { useState, useEffect } from 'react';
import WorkoutSchedule from '@/components/tabs/settings/WorkoutSchedule';

export default function WorkoutInfos({workoutDays, setWorkoutDays}) {

  return (
    <ThemedView style={styles.visibilityView}>
        <ThemedText type='title'>When do you workout</ThemedText>
        <WorkoutSchedule workoutDays={workoutDays} setWorkoutDays={setWorkoutDays}/>
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
