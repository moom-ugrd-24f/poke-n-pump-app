import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/themedComponents/ThemedView";
import { ThemedText } from "@/components/themedComponents/ThemedText";
import { ThemedTextInput } from "@/components/themedComponents/ThemedTextInput";
import ThemedButton from "@/components/themedComponents/ThemedButton";
import { sendFriendRequest } from "@/hooks/useAPI";
import usePushNotifications from "@/hooks/usePushNotifications";
import { useState } from "react";
import { getUserId } from "@/hooks/useAsyncStorage";
import Toast from 'react-native-root-toast';

export default function FriendRequest() {

  const [friendCode, setFriendCode] = useState('');
  const { sendNotification } = usePushNotifications();

  const addFriend = () => {
    getUserId().then((userId) => {
      if (userId) {
        sendFriendRequest(userId, friendCode).then((res) => {
          sendNotification(res.data.expoPushToken, { 
            title: 'PokeNPump', 
            body: 'You have a new friend request! Check out the notification board.' 
          });
        });
        Toast.show('Sent a friend request!', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
          shadow: true,
          animation: true,
          hideOnPress: true,
        });
      }
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
