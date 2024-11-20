import { StyleSheet } from 'react-native';
import { ThemedView } from '../../ThemedView';
import { ThemedText } from '../../ThemedText';
import VisibilityToggle from '@/components/VisibilityToggle';

export default function VisibilityOption() {

  return (
    <ThemedView style={styles.visibilityView}>
        <ThemedText type='subtitle'>Visibility setting</ThemedText>
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
