import ThemedButton from '@/components/ThemedButton';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { USER_URL } from '@/constants/url';

export default function StartWorkoutButton() {
    const colorScheme = useColorScheme();

    function postWorkoutComplete() {
        const user_id = '672b3de2613125bee0cdee3d';
        const workout_complete_url = USER_URL + '/' + user_id + '/workout-complete';
        fetch(workout_complete_url, { method: 'POST' })
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
