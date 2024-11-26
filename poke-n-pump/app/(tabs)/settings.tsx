import { ThemedButton } from '@/components/ThemedButton';
import { StyleSheet } from 'react-native';
import VisibilityOption from '@/components/tabs/settings/VisibilityOption';
import WorkoutSchedule from '@/components/WorkoutSchedule';
import ShameOption from '@/components/tabs/settings/ShameOption';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const themeColor = Colors[colorScheme ?? 'light'];

  const reset = async () => {
    AsyncStorage.clear();
    router.replace('/(login)');
  }

  return (
    <ThemedView style={styles.settingsView} >
      <VisibilityOption />
      <WorkoutSchedule />
      <ShameOption />
      <ThemedButton 
      title="Reset"
      lightColor={themeColor.alert}
      darkColor={themeColor.alert}
      lightBorderColor={themeColor.alert}
      darkBorderColor={themeColor.alert}
      lightTextColor={themeColor.white}
      darkTextColor={themeColor.white}
      onPress={reset} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  settingsView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '15%',
    paddingBottom: '5%',
  }
});
