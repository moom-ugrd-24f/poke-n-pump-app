import ThemedButton from '@/components/ThemedButton';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { USER_URL } from '@/constants/url';
import { useState, useEffect } from 'react';
import { completeWorkout } from '@/hooks/useAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StartWorkoutButton() {
    const colorScheme = useColorScheme();
    const [user_id, setUserId] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('id').then((res) => {
            setUserId(res || '');
        });
    }, []);

    function postWorkoutComplete() {
        if (user_id === '') {
            return;
        }
        completeWorkout(user_id);
    }

    return (
        <ThemedButton
            title="Start Workout"
            lightBorderColor={Colors[colorScheme ?? 'light'].sub}
            darkBorderColor={Colors[colorScheme ?? 'light'].sub}
            onPress={() => postWorkoutComplete()}
        />
    );
}
