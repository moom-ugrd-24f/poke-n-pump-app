import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import ThemedButton from "@/components/ThemedButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sendFriendRequest } from "@/hooks/useAPI";
import { useState } from "react";

export default function FriendRequest() {

  const [friendCode, setFriendCode] = useState('');

  const addFriend = () => {
    AsyncStorage.getItem('id').then((userId) => {
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
