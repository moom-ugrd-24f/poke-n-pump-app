import { StyleSheet, Text, View } from 'react-native';

export default function RankingScreen() {
  return (
    <View style={styles.rankingView}>
      <Text>Ranking Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rankingView: {
    backgroundColor: '#164847',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
