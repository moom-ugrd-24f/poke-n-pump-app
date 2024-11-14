import { StyleSheet } from 'react-native';
import { ThemedView } from '../../ThemedView';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../../ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function WorkoutSchedule() {
    const colorScheme = useColorScheme();

    const themeColor = Colors[colorScheme ?? 'light'];

    const [workoutSchedule, setWorkoutSchedule] = useState([
        { day: 'S', workoutSession: false, color: 'red' },
        { day: 'M', workoutSession: false },
        { day: 'T', workoutSession: false },
        { day: 'W', workoutSession: false },
        { day: 'T', workoutSession: false },
        { day: 'F', workoutSession: false },
        { day: 'S', workoutSession: false, color: 'blue' },
    ]);

    const toggleWorkoutSession = (index: number) => {
        setWorkoutSchedule((prevSchedule) =>
        prevSchedule.map((session, i) =>
            i === index ? { ...session, workoutSession: !session.workoutSession } : session
        )
        );
    };

    return (
        <ThemedView>
            <ThemedText type='subtitle'>Workout Schedule</ThemedText>
            <ThemedView style={styles.workoutSchedule} lightBorderColor={themeColor.mainDark} darkBorderColor={themeColor.mainDark}>
                {workoutSchedule.map((session, index) => (
                    <ThemedView key={index}>
                        <ThemedText type='title' lightColor={session.color}>{session.day}</ThemedText>
                        <Ionicons 
                        name={session.workoutSession ? 'checkbox-outline' : 'stop-outline'} 
                        size={50} color={themeColor.sub} 
                        onPress={() => toggleWorkoutSession(index) }/>
                    </ThemedView>
                ))}
            </ThemedView>
        </ThemedView> 
    );
}

const styles = StyleSheet.create({
    workoutSchedule: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'dashed',
        borderWidth: 2,
        borderRadius: 20,
        padding: 10,
    }
});
