/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#307676';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    default: '#fff',
    text: '#11181C',
    background: '#164748',
    tint: tintColorLight,
    icon: '#FFE33E',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    default: '#000',
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
