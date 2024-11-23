import { StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from 'expo-router/build/global-state/router-store';

interface IWorkoutSchedule {
    mon: boolean;
    tue: boolean;
    wed: boolean;
    thu: boolean;
    fri: boolean;
    sat: boolean;
    sun: boolean;
}

interface IWorkoutSession {
    day: string;
    workoutSession: boolean;
    color?: string;
}

export default function WorkoutSchedule() {
    const colorScheme = useColorScheme();
    const themeColor = Colors[colorScheme ?? 'light'];
    const emptySchedule = {
        "mon": false,
        "tue": false,
        "wed": false,
        "thu": false,
        "fri": false,
        "sat": false,
        "sun": false
    };

    const [workoutSchedule, setWorkoutSchedule] = useState([
        { day: 'S', workoutSession: emptySchedule.mon, color: 'red' },
        { day: 'M', workoutSession: emptySchedule.tue },
        { day: 'T', workoutSession: emptySchedule.wed },
        { day: 'W', workoutSession: emptySchedule.thu },
        { day: 'T', workoutSession: emptySchedule.fri },
        { day: 'F', workoutSession: emptySchedule.sat },
        { day: 'S', workoutSession: emptySchedule.sun, color: 'blue' },
    ]);

    useEffect(() => {
        loadWorkoutSchedule();
    }, []);

    const loadWorkoutSchedule = async () => {
        try {
            const scheduleString = await AsyncStorage.getItem('workout-schedule');
            const schedule = scheduleString !== null ? JSON.parse(scheduleString) : emptySchedule;
            setWorkoutSchedule(
                [
                    { day: 'S', workoutSession: schedule.mon, color: 'red' },
                    { day: 'M', workoutSession: schedule.tue },
                    { day: 'T', workoutSession: schedule.wed },
                    { day: 'W', workoutSession: schedule.thu },
                    { day: 'T', workoutSession: schedule.fri },
                    { day: 'F', workoutSession: schedule.sat },
                    { day: 'S', workoutSession: schedule.sun, color: 'blue' },
                ]
            );
        } catch (e) {
            console.error(e);
        }
    }

    const toggleWorkoutSession = (index: number) => {
        setWorkoutSchedule((prevSchedule) =>
            prevSchedule.map((session, i) =>
                i === index ? { ...session, workoutSession: !session.workoutSession } : session
            )
        );
        storeWorkoutSchedule(workoutSchedule);
    };

    return (
        <ThemedView style={styles.workoutView}>
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
    workoutView: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
    },
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

const storeWorkoutSchedule = async (workoutSchedule: Array<IWorkoutSession>) => {
    const schedule = {
        "mon": workoutSchedule[0].workoutSession,
        "tue": workoutSchedule[1].workoutSession,
        "wed": workoutSchedule[2].workoutSession,
        "thu": workoutSchedule[3].workoutSession,
        "fri": workoutSchedule[4].workoutSession,
        "sat": workoutSchedule[5].workoutSession,
        "sun": workoutSchedule[6].workoutSession
    }
    try {
        const value = JSON.stringify(schedule);
        await AsyncStorage.setItem('workout-schedule', value);
    } catch (e) {
        console.error(e);
    }
}
