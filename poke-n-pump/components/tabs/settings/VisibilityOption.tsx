import { StyleSheet } from 'react-native';
import { ThemedView } from '../../themedComponents/ThemedView';
import { ThemedText } from '../../themedComponents/ThemedText';
import VisibilityToggle from '@/components/tabs/settings/VisibilityToggle';

export default function VisibilityOption({visibility, setVisibility}) {

  return (
    <ThemedView style={styles.visibilityView}>
        <ThemedText type='subtitle'>Visibility setting</ThemedText>
        <VisibilityToggle 
          orientation={'row'}
          visibility={visibility}
          setVisibility={setVisibility}
        />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
    visibilityView: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
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
