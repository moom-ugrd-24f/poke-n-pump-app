import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';

export default function RankingScreen() {
  return (
    <ThemedView style={styles.rankingView}>
      <ThemedText>Ranking Screen</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  rankingView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
