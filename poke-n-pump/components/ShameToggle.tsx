import { useEffect, useState } from "react";
import { ThemedSwitch } from "./ThemedSwitch";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ShameToggle() {

    const [isShamePostAllowed, setIsShamePostAllowed] = useState(false);
    
    useEffect(() => {
        loadShameToggle()
    }, []);

    const loadShameToggle = async () => {
        try {
            const shameToggleString = await AsyncStorage.getItem('shame-toggle');
            const shameToggle = shameToggleString !== null ? JSON.parse(shameToggleString) : false;
            setIsShamePostAllowed(shameToggle);
        } catch (e) {
            console.error(e);
        }
    }

    const storeShameToggle = async (value: boolean) => {
        try {
            await AsyncStorage.setItem('shame-toggle', JSON.stringify(value));
        } catch (e) {
            console.error(e);
        }
    }

    const toggleSwitch = () => {
        storeShameToggle(!isShamePostAllowed);
        setIsShamePostAllowed(previousState => !previousState);
    }
    return (
        <ThemedSwitch onValueChange={toggleSwitch} value={isShamePostAllowed} />
    );
}
