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
      title: "මෝර පිරිත",
      uri: "https://github.com/RathnaSL/sadaham-app/raw/refs/heads/main/assets/audio/-%20Mora%20Piritha.mp3",
    },
    {
      title: "බෝධි පූජා කවි",
      uri: "https://raw.githubusercontent.com/RathnaSL/sadaham-app/main/assets/audio/bodhi-pooja-kavi.mp3",
    },
    {
      title: "මහා සතිපට්ඨාන සූත්‍රය",
      uri: "https://raw.githubusercontent.com/RathnaSL/sadaham-app/main/assets/audio/maha-satipatthana-sutta.mp3",
    },
     {
  title: " සීවලී පිරිත",
  uri: "https://raw.githubusercontent.com/RathnaSL/sadaham-app/main/assets/audio/seevali-piritha.mp3",
},
  {
  title: "අටවිසි පිරිත",

  uri: "https://raw.githubusercontent.com/RathnaSL/sadaham-app/main/assets/audio/atavisi-piritha.mp3",
},
{
  title: "කරනීයමෙත්ත සූත්‍රය",

  uri: "https://raw.githubusercontent.com/RathnaSL/sadaham-app/main/assets/audio/Karaniya-Meththa-Suthraya.mp3",
},



  ];

 const playAudio = async (title: string, uri: string) => {
  try {
    // paused audio continue කරන්න
    if (soundRef.current && playing === title) {
      const status = await soundRef.current.getStatusAsync();

      if (status.isLoaded && status.isPlaying === false) {
        await soundRef.current.playAsync();
        return;
      }
    }

    // old audio remove
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }

    const { sound } = await Audio.Sound.createAsync({ uri });

    soundRef.current = sound;

    setPlaying(title);

    await sound.playAsync();
  } catch (error) {
    console.log(error);
  }
};
const pauseAudio = async () => {
  try {
    if (soundRef.current) {
      await soundRef.current.pauseAsync();
    }
  } catch (error) {
    console.log(error);
  }
};
  const stopAudio = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.setPositionAsync(0);
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
      <Text style={styles.title}>Online Pirith</Text>

      {onlineList.map((item, index) => (
        <View style={styles.card} key={index}>
          <Text style={styles.audioTitle}>{item.title}</Text>

          <View style={styles.controlRow}>
            <TouchableOpacity
              style={[styles.controlButton, styles.playButton]}
              onPress={() => playAudio(item.title, item.uri)}
            >
            
              <Text style={styles.controlText}>Play</Text>
            </TouchableOpacity>

           <TouchableOpacity
  style={[styles.controlButton, styles.pauseButton]}
  onPress={pauseAudio}
>
  <Text style={styles.controlText}>Pause</Text>
</TouchableOpacity>
            <TouchableOpacity
              style={[styles.controlButton, styles.stopSmallButton]}
              onPress={stopAudio}
            >
              <Text style={styles.controlText}>Stop</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {playing ? <Text style={styles.playing}>Playing: {playing}</Text> : null}
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
    marginBottom: 18,
  },
  audioTitle: {
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 16,
    color: "#111",
  },
  controlRow: {
    flexDirection: "row",
    gap: 8,
  },
  controlButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  playButton: {
    backgroundColor: "#2E7D32",
  },
  pauseButton: {
    backgroundColor: "#F9A825",
  },
  stopSmallButton: {
    backgroundColor: "#C62828",
  },
  controlText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "900",
  },
  playing: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
});