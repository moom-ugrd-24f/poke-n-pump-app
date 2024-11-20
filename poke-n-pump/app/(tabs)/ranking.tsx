import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';
import RankingList from '@/components/tabs/ranking/RankingList';

export default function RankingScreen() {
  return (
    <ThemedView style={styles.rankingView}>
      <ThemedText 
        type='header'
        style={styles.titleText}
      >
        Weekly Ranking
      </ThemedText>
      <RankingList />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleText: {
    top: 50,
  },
  rankingView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
