import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import ThemedButton from "@/components/ThemedButton";

export default function FriendRequest() {
  return (
    <ThemedView style={styles.container}>
        <ThemedText type='subtitle'>Friend Request</ThemedText>
        <ThemedView style={styles.friendInput}>
            <ThemedTextInput />
            <ThemedButton title='ADD' type='tiny' />
        </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    friendInput: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        width: 100,
    },
});
