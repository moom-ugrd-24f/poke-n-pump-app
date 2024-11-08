import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.homeView}>
      <ThemedText>Home Screen</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  homeView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
