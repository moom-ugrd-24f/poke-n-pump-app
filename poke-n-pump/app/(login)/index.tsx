import { StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import ProfileInfos from '@/components/login/ProfileInfos';
import VisibilityOption from '@/components/login/VisibilityOption';
import WorkoutInfos from '@/components/login/WorkoutInfos';
import ThemedButton from '@/components/themedComponents/ThemedButton';
import { ThemedView } from '@/components/themedComponents/ThemedView';
import ShameOption from '@/components/login/ShameOption';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addUser, addAndStoreUser } from '@/hooks/useAPI';
import usePushNotifications from '@/hooks/usePushNotifications';
import { updateUser } from '@/hooks/useAsyncStorage';

enum LOGIN_STAGE {
  PROFILE = 'PROFILE',
  VISIBILITY = 'VISIBILITY',
  WORKOUT = 'WORKOUT',
  SHAME = 'SHAME'
}

export default function LoginScreen() {
  const [stage, setStage] = useState<LOGIN_STAGE>(LOGIN_STAGE.PROFILE);

  const [isLoading, setIsLoading] = useState(true);

  const [enableCompleteButton, setEnableCompleteButton] = useState(true);
  const notificationToken = usePushNotifications().expoPushToken;

  const [workoutDays, setWorkoutDays] = useState([]);

  function finishOnboarding() {
    AsyncStorage.multiGet(['username', 'shame-toggle', 'shame-streak', 'visibility', 'profilePicture']).then((res) => {
      const nickname = res[0][1] || 'John Doe';
      // const workoutScheduleJson = JSON.parse(res[1][1]? res[1][1] : '{}');
      // const workoutSchedule = [];
      // if (workoutScheduleJson.sun) workoutSchedule.push(0);
      // if (workoutScheduleJson.mon) workoutSchedule.push(1);
      // if (workoutScheduleJson.tue) workoutSchedule.push(2);
      // if (workoutScheduleJson.wed) workoutSchedule.push(3);
      // if (workoutScheduleJson.thu) workoutSchedule.push(4);
      // if (workoutScheduleJson.fri) workoutSchedule.push(5);
      // if (workoutScheduleJson.sat) workoutSchedule.push(6);
      const shameToggle = res[1][1] || 'false';
      const shameStreak = res[2][1] || '1';
      const workoutPlan = { "daysOfWeek": workoutDays};
      const visibility = res[3][1] || 'friend';
      const profilePicture = res[4][1] || '';

      const data = {
        nickname: nickname,
        shamePostSettings: {
          isEnabled: shameToggle === 'true',
          noGymStreak: shameStreak
        },
        workoutPlan: workoutPlan,
        expoPushToken: notificationToken,
        visibility: visibility,
        // profilePicture: profilePicture
      };

      // Temporarily store user data 2 times
      addUser(data).then((res) => {
        AsyncStorage.multiSet([
          ["nickname", res.data.nickname],
          ["inviteCode", res.data.inviteCode],
          ["xp", JSON.stringify(res.data.xp)],
          // ["profilePicture", res.data.profilePicture],
          ["shamePostSettings", JSON.stringify(res.data.shamePostSettings)],
          ["workoutPlan", JSON.stringify(res.data.workoutPlan)],
          ["todayAttendance", JSON.stringify(res.data.todayAttendance)],
          ["noGymStreak", JSON.stringify(res.data.noGymStreak)],
          ["friends", JSON.stringify(res.data.friends)],
          ["id", res.data._id],
          ["visibility", res.data.visibility],
          ["expoPushToken", notificationToken],
        ]);
        updateUser(res.data);
        router.replace('/(tabs)')
      });

      // addAndStoreUser(data).then((res) => {
      //   router.replace('/(tabs)')
      // });
    });
  }

  useEffect(() => {
    AsyncStorage.getItem('username').then((res) => {
      if (res) {
        router.replace('/(tabs)');
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <ThemedView style={styles.container}  >
      {
        stage === LOGIN_STAGE.PROFILE ? 
        <ProfileInfos enableCompleteButton={setEnableCompleteButton}/> : 
        stage === LOGIN_STAGE.VISIBILITY ? 
        <VisibilityOption orientation={'column'} /> : 
        stage === LOGIN_STAGE.WORKOUT ? 
        <WorkoutInfos workoutDays={workoutDays} setWorkoutDays={setWorkoutDays}/> :
        <ShameOption />
      }
      <ThemedButton 
        title="Complete"
        disabled={!enableCompleteButton}
        onPress={() => {
          stage === LOGIN_STAGE.PROFILE ? setStage(LOGIN_STAGE.VISIBILITY) :
          stage === LOGIN_STAGE.VISIBILITY ? setStage(LOGIN_STAGE.WORKOUT) :
          stage === LOGIN_STAGE.WORKOUT ? setStage(LOGIN_STAGE.SHAME) :
          finishOnboarding();
        }} 
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
