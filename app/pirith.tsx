import React, { useState, useRef } from "react";
import {
  ActivityIndicator,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { Audio } from "expo-av";
import { router } from "expo-router";
const soundRef = useRef<Audio.Sound | null>(null);

const playAudio = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require("../assets/audio/maha-satipatthana-sutta.mp3")
  );
   
  soundRef.current = sound;
  await sound.playAsync();
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

const API_BASE = "https://sadaham-backend-production.up.railway.app";

export default function PirithScreen() {
  const [query, setQuery] = useState("");
  const [title, setTitle] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    const q = query.trim();

    if (!q) {
      setTitle("");
      setResult("කරුණාකර ගාථාව / පිරිත් නම type කරන්න.");
      return;
    }

    try {
      Keyboard.dismiss();
      setLoading(true);
      setTitle("");
      setResult("");

      const res = await fetch(`${API_BASE}/api/pirith/text`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });

      const data = await res.json();

      if (data?.ok) {
        setTitle(data.title || q);
        setResult(data.text || "පිරිත් / ගාථාව ලැබුණේ නැත.");
      } else {
        setTitle(data?.title || q);
        setResult(data?.message || "මෙම පිරිත් / ගාථාව සොයාගත නොහැකි විය.");
      }
    } catch {
      setTitle("Network error");
      setResult("Backend / Internet connection බලන්න.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setTitle("");
    setResult("");
    Keyboard.dismiss();
  };

  const handleCopy = async () => {
    if (result) {
      await Clipboard.setStringAsync(result);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}> msß;a$.d:d</Text>

      <TextInput
        style={styles.input}
        placeholder="ගාථාව / පිරිත් නම ලියන්න..."
        placeholderTextColor="#888"
        value={query}
        onChangeText={setQuery}
        multiline
      />

      <TouchableOpacity
        style={styles.searchButton}
        onPress={handleSearch}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "සොයමින්..." : "ගාථාව / පිරිත් සොයන්න"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
 
>
  <Text style={styles.buttonText}>පිරිත් Audio</Text>
</TouchableOpacity>
<TouchableOpacity
  style={styles.audioButton}
  onPress={() => router.push("/online-pirith")}
>
  <Text style={styles.buttonText}>Online Audio</Text>
</TouchableOpacity>
    <TouchableOpacity
  style={styles.audioButton}
  onPress={() => router.push("/pirith-audio")}
>
  <Text style={styles.buttonText}>පිරිත් Audio</Text>
</TouchableOpacity>

      <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
        <Text style={styles.clearText}>ඉවත් කරන්න</Text>
      </TouchableOpacity>

      {loading && (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="small" color="#0B2A3A" />
          <Text style={styles.loadingText}>AI / verified list වෙතින් සොයමින්...</Text>
        </View>
      )}

      <View style={styles.resultBox}>
        {title ? <Text style={styles.resultTitle}>{title}</Text> : null}

        <Text style={styles.resultText}>
          {result || "ඔබට අවශ්‍ය ගාථාව / පිරිත් නම type කර සොයන්න."}
        </Text>

        {result ? (

          
          <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
            <Text style={styles.copyText}>Copy</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
audioButton: {
  backgroundColor: "#6A1B9A",
  paddingVertical: 16,
  borderRadius: 14,
  alignItems: "center",
  marginBottom: 14,
},
  content: {
    padding: 22,
    paddingBottom: 60,
  },

  title: {
    fontFamily: "Basuru",
    fontSize: 45,
    color: "#e61010", 
    textAlign: "center",
    marginBottom: 25,
  },

  input: {
    minHeight: 110,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 14,
    padding: 18,
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    backgroundColor: "#FAFAFA",
    textAlignVertical: "top",
    marginBottom: 16,
  },

  searchButton: {
    backgroundColor: "#0B2A3A",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
  },

  clearButton: {
    backgroundColor: "#A9A9A9",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 20,
  },

  clearText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
  },

  loadingBox: {
    alignItems: "center",
    marginVertical: 14,
  },

  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: "#666",
    fontWeight: "700",
    textAlign: "center",
  },

  resultBox: {
    backgroundColor: "#F3F6FA",
    borderRadius: 14,
    padding: 22,
    borderWidth: 1,
    borderColor: "#E2E6EE",
  },

  resultTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#111",
    marginBottom: 18,
    textAlign: "center",
  },

  resultText: {
    fontSize: 24,
    lineHeight: 44,
    fontWeight: "700",
    color: "#333",
  },

  copyButton: {
    backgroundColor: "#2F8A35",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },

  copyText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
  },
});