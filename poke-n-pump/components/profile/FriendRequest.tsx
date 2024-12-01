import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/themedComponents/ThemedView";
import { ThemedText } from "@/components/themedComponents/ThemedText";
import { ThemedTextInput } from "@/components/themedComponents/ThemedTextInput";
import ThemedButton from "@/components/themedComponents/ThemedButton";
import { sendFriendRequest } from "@/hooks/useAPI";
import { useState } from "react";
import { getUserId } from "@/hooks/useAsyncStorage";

export default function FriendRequest() {

  const [friendCode, setFriendCode] = useState('');

  const addFriend = () => {
    getUserId().then((userId) => {
        if (userId) sendFriendRequest(userId, friendCode);
    });
  };

  return (
    <ThemedView style={styles.container}>
        <ThemedText type='subtitle'>Friend Request</ThemedText>
        <ThemedView style={styles.friendInput}>
            <ThemedTextInput value={friendCode} onChangeText={(text) => setFriendCode(text)} />
            <ThemedButton title='ADD' onPress={addFriend}/>
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
