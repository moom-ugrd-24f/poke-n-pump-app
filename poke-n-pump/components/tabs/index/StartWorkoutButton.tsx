import ThemedButton from '@/components/themedComponents/ThemedButton';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { USER_URL } from '@/constants/url';
import { useState, useEffect } from 'react';
import { completeWorkout } from '@/hooks/useAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';
import { updateXp } from '@/hooks/useAsyncStorage';

export default function StartWorkoutButton({setDidWorkout}) {
    const colorScheme = useColorScheme();
    const [user_id, setUserId] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('id').then((res) => {
            setUserId(res || '');
        });
    }, []);

    function onWorkoutButtonPressed() {
        if (user_id === '') {
            return;
        }
        
        completeWorkout(user_id);
        let toast = Toast.show('Congratulations! Earned 10XP by working out.', {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
            hideOnPress: true,
            shadow: true,
            animation: true,
        });
        setDidWorkout(true);
        updateXp(10);
    }

    return (
        <ThemedButton
            title="Start Workout"
            lightBorderColor={Colors[colorScheme ?? 'light'].sub}
            darkBorderColor={Colors[colorScheme ?? 'light'].sub}
            onPress={() => onWorkoutButtonPressed()}
        />
    );
}
