import { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";

const API_BASE_URL = "https://sadaham-backend-production.up.railway.app";

type ChatMessage = {
  role: "user" | "ai";
  text: string;
};

export default function AssistantScreen() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<ScrollView | null>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 150);
  };

  const getAnswerMode = (text: string) => {
    const lower = text.toLowerCase();

    if (
      text.includes("විස්තර") ||
      text.includes("දිගට") ||
      text.includes("පැහැදිලි") ||
      text.includes("සම්පූර්ණ") ||
      lower.includes("detail") ||
      lower.includes("long") ||
      lower.includes("explain")
    ) {
      return "long";
    }

    return "short";
  };

  const handleAsk = async () => {
    const q = question.trim();
    if (!q || loading) return;

    Keyboard.dismiss();

    const userMsg: ChatMessage = { role: "user", text: q };
    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setQuestion("");
    setLoading(true);
    scrollToBottom();

    try {
      const res = await fetch(`${API_BASE_URL}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
  question: `
ඔබ බෞද්ධ AI සහායකයෙකි.
පරිශීලකයා අසන ප්‍රශ්න වලට
දිග, පැහැදිලි, කරුණු සහිත,
බෞද්ධ උදාහරණ සහිත
පිළිතුරු ලබාදෙන්න.

අවම වශයෙන් වාක්‍ය 10-15ක් ලියන්න.

ප්‍රශ්නය:
${q}
`,
  history: updatedMessages.slice(-10),
  answerMode: getAnswerMode(q),
}),
       
      });

      let data: any = null;

      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok) {
        throw new Error("Backend error");
      }

      const answer =
        data?.answer ||
        data?.reply ||
        data?.message ||
        "පිළිතුර ලබාගත නොහැකි විය.";

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: String(answer).trim(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Backend / Internet connection බලන්න. නැවත උත්සාහ කරන්න.",
        },
      ]);
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  };

  const handleClear = () => {
    Keyboard.dismiss();
    setQuestion("");
    setMessages([]);
  };
 
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 20}
    >
     <Text style={styles.basuruTitle}>O¾u iydhl</Text>

      <ScrollView
        ref={scrollRef}
        style={styles.chatBox}
        contentContainerStyle={styles.chatContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
        onContentSizeChange={scrollToBottom}
      >
        {messages.length === 0 ? (
          <Text style={styles.emptyText}>ඔබගේ ධර්ම ප්‍රශ්නය අසන්න.</Text>
        ) : (
          messages.map((msg, index) => (
            <View
              key={`${msg.role}-${index}`}
              style={[
                styles.messageBubble,
                msg.role === "user" ? styles.userBubble : styles.aiBubble,
              ]}
            >
              <Text style={styles.messageLabel}>
                {msg.role === "user" ? "ඔබ" : "සහායක"}
              </Text>
              <Text style={styles.messageText}>{msg.text}</Text>
            </View>
          ))
        )}

        {loading && (
          <View style={[styles.messageBubble, styles.aiBubble]}>
            <ActivityIndicator />
            <Text style={styles.loadingText}>පිළිතුර සකස් කරමින්...</Text>
          </View>
        )}
      </ScrollView>

      <TextInput
        style={styles.input}
        placeholder="ඔබගේ ප්‍රශ්නය ටයිප් කරන්න..."
        placeholderTextColor="#888"
        value={question}
        onChangeText={setQuestion}
        multiline
        editable={!loading}
        textAlignVertical="top"
        returnKeyType="default"
      />

      <TouchableOpacity
        style={[styles.askButton, loading && styles.disabledButton]}
        onPress={handleAsk}
        disabled={loading}
        activeOpacity={0.8}
      >
        <Text style={styles.askButtonText}>
          {loading ? "කරුණාකර රැඳී සිටින්න" : "අසන්න"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.clearButton, loading && styles.disabledButton]}
        onPress={handleClear}
        disabled={loading}
        activeOpacity={0.8}
      >
        <Text style={styles.clearButtonText}>Chat ඉවත් කරන්න</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 35,
    
  },
basuruTitle: {
  fontFamily: "Basuru",
  fontSize: 45,
  color: "#d32f2f",
  textAlign: "center",
  marginBottom: 20,

},
 title: {
  fontSize: 42,
  color: "#d32f2f",
  textAlign: "center",
  marginBottom: 20,
  fontFamily: "Basuru",
  },
  chatBox: { 
    flex: 1,
    backgroundColor: "#F2F2F2",
    marginBottom: 14,
    borderRadius: 12,
    
  },
  chatContent: {
    padding: 12,
    paddingBottom: 24,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginTop: 30,
    lineHeight: 28,
  },
 
   messageBubble: {
  padding: 16,
  marginBottom: 14,
  borderRadius: 16,
  width: "100%",
},

userBubble: {
  backgroundColor: "#DDEBFF",
  alignSelf: "flex-end",
  maxWidth: "100%",
},

aiBubble: {
  backgroundColor: "#FFFFFF",
  alignSelf: "flex-start",
  maxWidth: "100%",

  },
  messageLabel: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 6,
  },
  messageText: {
  fontSize: 20,
  color: "#333",
  lineHeight: 34,
  
  textAlign: "left",
  width: "100%",
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: "#666",
  }, 
  input: {
  width: "100%",
  minHeight: 60,
  maxHeight: 95,
  borderWidth: 1,
  borderColor: "#CCCCCC",
  borderRadius: 12,
  paddingHorizontal: 15,
  paddingVertical: 10,
  fontSize: 18,
  color: "#000",
  backgroundColor: "#F8F8F8",
  marginBottom: 8,

  },
  askButton: {
    width: "100%",
    height: 54,
    backgroundColor: "#2F8A35",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 12,
  },
  askButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  clearButton: {
  width: "100%",
  height: 46,
  backgroundColor: "#999999",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 45,
  borderRadius: 12,
  

  },
  clearButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.6,
  },
responseText: {
  fontSize: 20,
  lineHeight: 34,
  color: "#222",
  textAlign: "left",
  width: "100%",
  fontFamily: undefined,
  fontWeight: "normal",


},
responseBox: {
  width: "100%",
  backgroundColor: "#f5f5f5",
  borderRadius: 20,
  padding: 14,
  alignSelf: "center",
},

});