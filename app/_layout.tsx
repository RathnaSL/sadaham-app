import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
 
export default function RootLayout() {
  const colorScheme = useColorScheme();
const [fontsLoaded] = useFonts({
 
 Basuru: require("../assets/fonts/Basuru.ttf"),
  Arjun: require("../assets/fonts/fm_4u_arjun.ttf"),
  Bindu: require("../assets/fonts/fm-Ganganee.ttf"),
}); 

  if (fontsLoaded) {
    SplashScreen.hideAsync();
  }


if (!fontsLoaded) {
  return null;
}
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
