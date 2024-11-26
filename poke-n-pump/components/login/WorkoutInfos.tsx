import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themedComponents/ThemedView';
import { ThemedText } from '@/components/themedComponents/ThemedText';
import WorkoutSchedule from '@/components/tabs/settings/WorkoutSchedule';

export default function ProfileInfos() {

  return (
    <ThemedView style={styles.visibilityView}>
        <ThemedText type='title'>When do you workout</ThemedText>
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
