import React, { useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";

export default function PirithAudioScreen() {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [playing, setPlaying] = useState("");

  const audioList = [
    { title: "රතන සූත්‍රය", file: require("../assets/audio/rathana-suthraya.mp3") },
    { title: "තෙරුවන් වන්දනාව", file: require("../assets/audio/theruwan-wandanawa.mp3") },
    { title: "ජයමංගල ගාථා", file: require("../assets/audio/jayamangala-gatha.mp3") },
  ];

  const playAudio = async (title: string, file: any) => {
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      const { sound } = await Audio.Sound.createAsync(file);
      soundRef.current = sound;
      setPlaying(title);
      await sound.playAsync();
    } catch (error) {
      console.log(error);
    }
  };

  const stopAudio = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      setPlaying("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Audio</Text>

      {audioList.map((item, index) => (
        <View style={styles.card} key={index}>
          <Text style={styles.audioTitle}>{item.title}</Text>
          <TouchableOpacity style={styles.playButton} onPress={() => playAudio(item.title, item.file)}>
            <Text style={styles.buttonText}>Play</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.stopButton} onPress={stopAudio}>
        <Text style={styles.buttonText}>Stop Audio</Text>
      </TouchableOpacity>

      {playing ? <Text style={styles.playing}>Playing: {playing}</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  content: { padding: 22, paddingBottom: 80 },
  title: { fontSize: 36, fontWeight: "900", textAlign: "center", marginBottom: 24, color: "#C62828" },
  card: { backgroundColor: "#F3F6FA", borderRadius: 16, padding: 18, marginBottom: 14 },
  audioTitle: { fontSize: 24, fontWeight: "900", marginBottom: 16, color: "#111" },
  playButton: { backgroundColor: "#2E7D32", paddingVertical: 15, borderRadius: 12, alignItems: "center" },
  stopButton: { backgroundColor: "#9E9E9E", paddingVertical: 16, borderRadius: 12, alignItems: "center", marginTop: 12 },
  buttonText: { color: "#FFF", fontSize: 22, fontWeight: "900" },
  playing: { marginTop: 16, fontSize: 18, fontWeight: "700", textAlign: "center" },
});