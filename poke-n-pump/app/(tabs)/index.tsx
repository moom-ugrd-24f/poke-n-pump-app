import { StyleSheet, View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.homeView}>
      <Text>Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  homeView: {
    backgroundColor: '#164847',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
