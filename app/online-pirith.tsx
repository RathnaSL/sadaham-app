import React, { useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Audio } from "expo-av";

export default function OnlinePirithScreen() {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [playing, setPlaying] = useState("");

  const onlineList = [
    {
      title: "Online පිරිත් 1",
      uri: "https://YOUR_MP3_LINK.mp3",
    },

    {
      title: "Online පිරිත් 2",
      uri: "https://YOUR_MP3_LINK.mp3",
    },
  ];

  const playAudio = async (title: string, uri: string) => {
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      const { sound } = await Audio.Sound.createAsync({
        uri,
      });

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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>Online Pirith</Text>

      {onlineList.map((item, index) => (
        <View style={styles.card} key={index}>
          <Text style={styles.audioTitle}>{item.title}</Text>

          <TouchableOpacity
            style={styles.playButton}
            onPress={() => playAudio(item.title, item.uri)}
          >
            <Text style={styles.buttonText}>Play Online</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
        style={styles.stopButton}
        onPress={stopAudio}
      >
        <Text style={styles.buttonText}>Stop Audio</Text>
      </TouchableOpacity>

      {playing ? (
        <Text style={styles.playing}>
          Playing: {playing}
        </Text>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  content: {
    padding: 22,
    paddingBottom: 80,
  },

  title: {
    fontSize: 34,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 24,
    color: "#C62828",
  },

  card: {
    backgroundColor: "#F3F6FA",
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
  },

  audioTitle: {
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 16,
    color: "#111",
  },

  playButton: {
    backgroundColor: "#1565C0",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  stopButton: {
    backgroundColor: "#9E9E9E",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "900",
  },

  playing: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
});