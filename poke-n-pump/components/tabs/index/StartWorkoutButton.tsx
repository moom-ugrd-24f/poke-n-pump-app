import ThemedButton from '@/components/ThemedButton';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function StartWorkoutButton() {
    const colorScheme = useColorScheme();

    return (
        <ThemedView style={styles.startWorkoutButton}>
            <ThemedButton
                title="Start Workout"
                lightBorderColor={Colors[colorScheme ?? 'light'].subLight}
                darkBorderColor={Colors[colorScheme ?? 'light'].subLight}
                onPress={() => console.log('Starting workout...')}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    startWorkoutButton: {
        width: '90%'
    }
});
