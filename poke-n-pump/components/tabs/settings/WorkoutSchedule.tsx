import { StyleSheet } from 'react-native';
import { ThemedView } from '../../themedComponents/ThemedView';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../../themedComponents/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function WorkoutSchedule({workoutDays, setWorkoutDays}) {
    const colorScheme = useColorScheme();
    const themeColor = Colors[colorScheme ?? 'light'];

    const emptyWorkoutSchedule = [
        { day: 'S', workoutSession: false, color: 'red' },
        { day: 'M', workoutSession: false },
        { day: 'T', workoutSession: false },
        { day: 'W', workoutSession: false },
        { day: 'T', workoutSession: false },
        { day: 'F', workoutSession: false },
        { day: 'S', workoutSession: false, color: 'blue' },
    ];

    const workoutDaysHash = (workoutDays: [number]) => {
        let hash = 0;
        if (!workoutDays) return hash;

        for (let i = 0; i < workoutDays.length; i++) {
            hash += workoutDays[i] * Math.pow(2, i);
        }
        return hash;
    }

    const getWorkoutSchedule = (workoutDays: [number]) => {
        if (!workoutDays) return emptyWorkoutSchedule;
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
    const getWorkoutDays = (workoutSchedule) => {
        const workoutDays = [];
        for (let i = 0; i < workoutSchedule.length; i++) {
            if (workoutSchedule[i].workoutSession === true) {
                workoutDays.push(i);
            }
        }
        return workoutDays;
    }

    const [workoutSchedule, setWorkoutSchedule] = useState(getWorkoutSchedule(workoutDays));

    useEffect(() => {
        console.log('Workout Days updated: ', workoutDays);
        setWorkoutSchedule(getWorkoutSchedule(workoutDays));
    }, [workoutDays]);

    const toggleWorkoutSession = async (index: number) => {
        setWorkoutSchedule((prevSchedule) => {
            const newSchedule = prevSchedule.map((session, i) => 
                i === index 
                ? { ...session, workoutSession: !session.workoutSession } 
                : session
            );
            setWorkoutDays(getWorkoutDays(newSchedule));
            return newSchedule;
        });
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
                        onPress={() => toggleWorkoutSession(index)}/>
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
