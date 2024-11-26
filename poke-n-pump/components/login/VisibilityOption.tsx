import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themedComponents/ThemedView';
import { ThemedText } from '@/components/themedComponents/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import VisibilityToggle from '@/components/tabs/settings/VisibilityToggle';

export default function ProfileInfos() {
  const colorScheme = useColorScheme();
  
  const themeColor = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={styles.visibilityView}>
        <ThemedText type='title'>Choose your visibility setting</ThemedText>
        <ThemedText type='subtitle' lightColor={themeColor.default} darkColor={themeColor.default}>You can change your setting anytime</ThemedText>
        <VisibilityToggle />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
    visibilityView: {
        height: '40%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    optionView: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        padding: 10,
        width: 150,
        borderWidth: 2.5,
        borderRadius: 10,
    }
});
