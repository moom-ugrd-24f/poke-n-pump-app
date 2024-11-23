import AsyncStorage from "@react-native-async-storage/async-storage";

export const updateXp = async (xp: number) => {
    const prevXp = await AsyncStorage.getItem('xp');
    const newXP = parseInt(prevXp || '0') + xp;
    await AsyncStorage.setItem('xp', newXP.toString());
}