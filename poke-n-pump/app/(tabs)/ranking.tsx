import { ThemedText } from '@/components/themedComponents/ThemedText';
import { ThemedView } from '@/components/themedComponents/ThemedView';
import { StyleSheet } from 'react-native';
import RankingList from '@/components/tabs/ranking/RankingList';
import { useFocusEffect } from 'expo-router';
import { useState, useCallback } from 'react';
import { Colors } from '@/constants/Colors';

export default function RankingScreen() {
  const [update, setUpdate] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setUpdate(true);
    }, [])
  );

  return (
    <ThemedView style={styles.rankingView}>
      <ThemedText type='header'>
        Weekly Ranking
      </ThemedText>
      <RankingList update={update} setUpdate={setUpdate} />
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
