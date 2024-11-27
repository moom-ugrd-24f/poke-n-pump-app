import { StyleSheet } from 'react-native';
import { ThemedView } from '../../themedComponents/ThemedView';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../../themedComponents/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IWorkoutSchedule {
    sun: boolean;
    mon: boolean;
    tue: boolean;
    wed: boolean;
    thu: boolean;
    fri: boolean;
    sat: boolean;
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
        "sun": false,
        "mon": false,
        "tue": false,
        "wed": false,
        "thu": false,
        "fri": false,
        "sat": false,
    };

    const getWorkoutDayList = (scheduleJson: IWorkoutSchedule) => {
        return [
            { day: 'S', workoutSession: scheduleJson.sun, color: 'red' },
            { day: 'M', workoutSession: scheduleJson.mon },
            { day: 'T', workoutSession: scheduleJson.tue },
            { day: 'W', workoutSession: scheduleJson.wed },
            { day: 'T', workoutSession: scheduleJson.thu },
            { day: 'F', workoutSession: scheduleJson.fri },
            { day: 'S', workoutSession: scheduleJson.sat, color: 'blue' },
        ];
    } 

    const [workoutSchedule, setWorkoutSchedule] = useState(getWorkoutDayList(emptySchedule));

    useEffect(() => {
        loadWorkoutSchedule();
    }, []);

    const loadWorkoutSchedule = async () => {
        try {
            const scheduleString = await AsyncStorage.getItem('workout-schedule');
            const schedule = scheduleString !== null ? JSON.parse(scheduleString) : emptySchedule;
            setWorkoutSchedule(getWorkoutDayList(schedule));
        } catch (e) {
            console.error(e);
        }
    }

    const toggleWorkoutSession = async (index: number) => {
        setWorkoutSchedule((prevSchedule) =>
            prevSchedule.map((session, i) =>
                i === index ? { ...session, workoutSession: !session.workoutSession } : session
            )
        );
        await storeWorkoutSchedule(workoutSchedule);
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
        "sun": workoutSchedule[0].workoutSession,
        "mon": workoutSchedule[1].workoutSession,
        "tue": workoutSchedule[2].workoutSession,
        "wed": workoutSchedule[3].workoutSession,
        "thu": workoutSchedule[4].workoutSession,
        "fri": workoutSchedule[5].workoutSession,
        "sat": workoutSchedule[6].workoutSession,
    }
    try {
        const value = JSON.stringify(schedule);
        await AsyncStorage.setItem('workout-schedule', value);
        console.log('Workout schedule updated', schedule);
    } catch (e) {
        console.error(e);
    }
}
