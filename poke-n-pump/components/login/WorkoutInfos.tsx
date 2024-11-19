import { StyleSheet } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import WorkoutSchedule from '../WorkoutSchedule';

export default function ProfileInfos() {

  return (
    <ThemedView style={styles.visibilityView}>
        <ThemedText type='title'>Choose your visibility setting</ThemedText>
        <WorkoutSchedule />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
    visibilityView: {
        height: '40%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});
