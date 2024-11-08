import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';

export default function SettingsScreen() {
  return (
    <ThemedView style={styles.settingsView}>
      <ThemedText>Settings Screen</ThemedText>
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
