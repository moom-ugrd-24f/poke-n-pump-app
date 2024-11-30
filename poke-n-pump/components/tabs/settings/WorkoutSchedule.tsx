import { StyleSheet } from 'react-native';
import { ThemedView } from '../../themedComponents/ThemedView';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../../themedComponents/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// interface IWorkoutSchedule {
//     sun: boolean;
//     mon: boolean;
//     tue: boolean;
//     wed: boolean;
//     thu: boolean;
//     fri: boolean;
//     sat: boolean;
// }

// interface IWorkoutSession {
//     day: string;
//     workoutSession: boolean;
//     color?: string;
// }

export default function WorkoutSchedule({workoutDays, setWorkoutDays}) {
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

    const getWorkoutSchedule = (workoutDays: [number]) => {
        return [
            { day: 'S', workoutSession: workoutDays.includes(0), color: 'red' },
            { day: 'M', workoutSession: workoutDays.includes(1) },
            { day: 'T', workoutSession: workoutDays.includes(2) },
            { day: 'W', workoutSession: workoutDays.includes(3) },
            { day: 'T', workoutSession: workoutDays.includes(4) },
            { day: 'F', workoutSession: workoutDays.includes(5) },
            { day: 'S', workoutSession: workoutDays.includes(6), color: 'blue' },
        ];
    } 

    const [workoutSchedule, setWorkoutSchedule] = useState(getWorkoutSchedule(workoutDays));

    useEffect(() => {
        setWorkoutDays(getWorkoutSchedule(workoutDays));
    }, [workoutDays.length]);

    // const loadWorkoutSchedule = async () => {
    //     try {
    //         const scheduleString = await AsyncStorage.getItem('workout-schedule');
    //         const schedule = scheduleString !== null ? JSON.parse(scheduleString) : emptySchedule;
    //         setWorkoutSchedule(getWorkoutDayList(schedule));
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }

    const toggleWorkoutSession = async (index: number) => {
        setWorkoutDays((prevWorkoutDays: [number]) => {
            if (prevWorkoutDays.includes(index)) {
                return prevWorkoutDays.filter((day) => day !== index);
            } else {
                return [...prevWorkoutDays, index];
            }
        });
        // await storeWorkoutSchedule(workoutSchedule);
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

// const storeWorkoutSchedule = async (workoutSchedule: Array<IWorkoutSession>) => {
//     const schedule = {
//         "sun": workoutSchedule[0].workoutSession,
//         "mon": workoutSchedule[1].workoutSession,
//         "tue": workoutSchedule[2].workoutSession,
//         "wed": workoutSchedule[3].workoutSession,
//         "thu": workoutSchedule[4].workoutSession,
//         "fri": workoutSchedule[5].workoutSession,
//         "sat": workoutSchedule[6].workoutSession,
//     }
//     try {
//         const value = JSON.stringify(schedule);
//         await AsyncStorage.setItem('workout-schedule', value);
//         console.log('Workout schedule updated', schedule);
//     } catch (e) {
//         console.error(e);
//     }
// }
