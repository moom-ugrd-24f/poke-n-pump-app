import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';
import VisibilityOption from '@/components/tabs/settings/VisibilityOption';
import WorkoutSchedule from '@/components/WorkoutSchedule';
import ShameOption from '@/components/tabs/settings/ShameOption';

export default function SettingsScreen() {
  return (
    <ThemedView style={styles.settingsView}>
      <ThemedText type='header'>Settings</ThemedText>
      <VisibilityOption />
      <WorkoutSchedule />
      <ShameOption />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  settingsView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
