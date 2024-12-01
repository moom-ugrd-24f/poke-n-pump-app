import { ThemedSwitch } from "../themedComponents/ThemedSwitch";

export default function ShameToggle({shame, setShame}) {
    const toggleSwitch = () => {
        setShame(!shame);
    }
    return (
        <ThemedSwitch onValueChange={toggleSwitch} value={shame} />
    );
}
