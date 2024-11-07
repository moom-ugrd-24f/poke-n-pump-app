import { StyleSheet, Text, View } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.settingsView}>
      <Text>Settings Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  settingsView: {
    backgroundColor: '#164847',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
