import ThemedButton from '@/components/ThemedButton';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';

export default function StartWorkoutButton() {
    return (
        <ThemedView style={styles.startWorkoutButton}>
            <ThemedButton
                title="Start Workout"
                onPress={() => console.log('Starting workout...')}
                titleStyle={{ fontSize: 20 }}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    startWorkoutButton: {
        width: '90%'
    }
});
