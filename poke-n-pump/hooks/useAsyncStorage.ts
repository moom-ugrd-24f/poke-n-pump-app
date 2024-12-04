import { BASE_URL } from "@/constants/url";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserData {
    _id: string;
    inviteCode: string;
    nickname: string;
    shamePostSettings: Object;
    workoutPlan: Object;
    expoPushToken: string;
    visibility: string;
    profilePicture: any;
    xp: number;
    friends: [string];
}

export const updateXp = async (xp: number) => {
    const prevXp = await AsyncStorage.getItem('xp');
    const newXP = parseInt(prevXp || '0') + xp;
    await AsyncStorage.setItem('xp', newXP.toString());
}

export const updateUser = async (data: UserData) => {
    await AsyncStorage.setItem('user', JSON.stringify(data));
}

export const getUser = async () => {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

export const getUserId = async () => {
    const user = await getUser();
    return user?._id;
}

export const getExpoToken = async () => {
    const user = await getUser();
    return user?.expoPushToken;
}

export const getUserProfilePicture = async () => {
    const user = await getUser();
    return BASE_URL + '/' + user?.profilePicture;
}