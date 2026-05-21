import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

     <Tabs.Screen
  name="notes"
  options={{
    title: "Notes",
    tabBarIcon: ({ color }) => (
      <Ionicons name="book" size={26} color={color} />
    ),
  }}
/>
<Tabs.Screen
  name="about"
  options={{
    title: "About",
    tabBarIcon: ({ color }) => (
      <Ionicons name="information-circle" size={26} color={color} />
    ),
  }}
/>
    
    </Tabs>
  );
}