import ThemedButton from '@/components/themedComponents/ThemedButton';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useState, useEffect } from 'react';
import { completeWorkout } from '@/hooks/useAPI';
import { getUserId } from '@/hooks/useAsyncStorage';
import Toast from 'react-native-root-toast';
import { incrementXp } from '@/hooks/useAPI';

export default function StartWorkoutButton({setDidWorkout}) {
    const colorScheme = useColorScheme();
    const [userId, setUserId] = useState('');

    useEffect(() => {
        getUserId().then((res) => {
            setUserId(res || '');
        });
    }, []);

    function onWorkoutButtonPressed() {
        if (userId === '') {
            return;
        }
        
        completeWorkout(userId);
        let toast = Toast.show('Congratulations! Earned 10XP by working out.', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            hideOnPress: true,
            shadow: true,
            animation: true,
        });
        setDidWorkout(true);
        incrementXp(userId, 10);
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
