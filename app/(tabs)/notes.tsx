import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

export default function NotesScreen() {
  const [note, setNote] = useState("");
  const [savedNotes, setSavedNotes] = useState<string[]>([]);

  const saveNote = () => {
    if (!note.trim()) {
      Alert.alert("සටහනක් ලියන්න");
      return;
    }

    setSavedNotes([note, ...savedNotes]);
    setNote("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>සටහන්</Text>

      <TextInput
        style={styles.input}
        multiline
        placeholder="ඔබගේ සටහන ලියන්න..."
        value={note}
        onChangeText={setNote}
      />

      <TouchableOpacity style={styles.button} onPress={saveNote}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      <ScrollView style={styles.notesArea}>
        {savedNotes.map((item, index) => (
          <View key={index} style={styles.noteCard}>
            <Text style={styles.noteText}>{item}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },

  title: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },

  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    minHeight: 120,
    padding: 15,
    fontSize: 18,
    textAlignVertical: "top",
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#2F8A35",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  notesArea: {
    flex: 1,
  },

  noteCard: {
    backgroundColor: "#F3F3F3",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },

  noteText: {
    fontSize: 18,
    color: "#333333",
    lineHeight: 28,
  },
});