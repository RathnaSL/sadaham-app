import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Image,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Linking } from "react-native";
type VideoItem = {
  title: string;
  id: string;
  category?: string;
  source?: string;
};

const API_BASE = 'https://sadaham-backend-production.up.railway.app';
console.log(API_BASE);
export default function DharmaScreen() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const searchVideos = async () => {
    const q = searchText.trim();

    if (!q) {
      setMessage('කරුණාකර නමක් හෝ මාතෘකාවක් ලියන්න.');
      return;
    }

    try {
      setLoading(true);
      setMessage('');
      setSearchResults([]);

      const res = await fetch(`${API_BASE}/api/dharma/youtube-search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      });

      const data = await res.json();

      if (!data?.ok || !Array.isArray(data.results) || data.results.length === 0) {
        setMessage(data?.message || 'වීඩියෝ හමු නොවුණි.');
        return;
      }

      setSearchResults(data.results);
    } catch {
      setMessage('Search failed. Internet/backend connection බලන්න.');
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchText('');
    setSearchResults([]);
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text
        
  style={{
    fontFamily: "Basuru",
    fontSize: 40,
    color: "#e61010", 
    textAlign: "center",
  }}
  
>
   O¾ufoaYkd
   
</Text>
      
        <View style={styles.searchBox}>
          <TextInput
            style={styles.input}
            value={searchText}
            onChangeText={setSearchText}
          
            placeholderTextColor="#777777"
          />

          <View style={styles.searchButtonRow}>
            <TouchableOpacity style={styles.searchButton} onPress={searchVideos}>
              <Text style={styles.searchButtonText}>බණ සොයන්න</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>

        {loading && (
          <View style={styles.loadingRow}>
            <ActivityIndicator size="small" color="#0B2A3A" />
            <Text style={styles.loadingSmallText}>වීඩියෝ සොයමින්...</Text>
          </View>
        )}

        {message ? <Text style={styles.messageText}>{message}</Text> : null}

        {searchResults.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>ප්‍රතිඵල</Text>

            {searchResults.map((video, index) => (
              <TouchableOpacity
                key={`${video.id}-${index}`}
                style={styles.videoCard}
                onPress={() => setSelectedVideo(video)}
              >
                <Image
                  source={{ uri: `https://img.youtube.com/vi/${video.id}/hqdefault.jpg` }}
                  style={styles.thumbnail}
                />

                <View style={styles.videoInfo}>
                  <Text style={styles.videoTitle}>{video.title}</Text>
                  <Text style={styles.videoSub}>App එක ඇතුළේ බලන්න</Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>ඔබට අවශ්‍ය බණ දේශනාවක් සොයන්න</Text>
          </View>
        )}
      </ScrollView>

      <Modal
        visible={selectedVideo !== null}
        animationType="slide"
        onRequestClose={() => setSelectedVideo(null)}
      >
        <SafeAreaView style={styles.modalSafe}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{selectedVideo?.title}</Text>
 
            <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedVideo(null)}>
              <Text style={styles.closeText}>වසන්න</Text>
            </TouchableOpacity>
          </View>

        {selectedVideo && (
  <TouchableOpacity
  style={styles.watchButton}
  onPress={() =>
    Linking.openURL(`https://www.youtube.com/watch?v=${selectedVideo.id}`)
  }
>
  <Text style={styles.watchButtonText}>
    Fullscreen Open
  </Text>
</TouchableOpacity>
  
)}
</SafeAreaView>
</Modal>
</SafeAreaView>
);
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
watchButton: {
  backgroundColor: "#d32f2f",
  paddingVertical: 16,
  borderRadius: 12,
  alignItems: "center",
  marginTop: 20,
},

watchButtonText: {
  color: "#fff",
  fontSize: 20,
  fontWeight: "bold",
},
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 25,
    paddingBottom: 40,
  },

  video: {
    width: "100%",
    height: 250,
    backgroundColor: "#000",
  },
  video: {
  width: "100%",
  height: 250,
  backgroundColor: "#000",
},
  title: {
    fontSize: 32,
    fontWeight: 'bold', 
    color: "#e61010", 
    textAlign: 'center',
    marginBottom: 22,
    fontFamily: "Basuru"

    
  },
  searchBox: {
    backgroundColor: '#F4F8F6',
    borderRadius: 16,
    padding: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#DDE7E1',
  },
  input: {
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#111111',
    borderWidth: 1,
    borderColor: '#D6DEE8',
  },
  searchButtonRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
  searchButton: {
    flex: 1,
    height: 46,
    backgroundColor: '#0B2A3A',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  clearButton: {
    width: 90,
    height: 46,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: { color: '#333333', fontSize: 15, fontWeight: 'bold' },
  loadingRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  loadingSmallText: { color: '#0B2A3A', fontSize: 15, fontWeight: '700' },
  messageText: { color: '#C62828', fontSize: 15, marginBottom: 14, fontWeight: '700' },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', color: '#111111', marginBottom: 16 },
  videoCard: {
    backgroundColor: '#F2F6FA',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  thumbnail: { width: '100%', height: 185, backgroundColor: '#DDDDDD' },
  videoInfo: { padding: 14 },
  videoTitle: { fontSize: 18, color: '#111111', fontWeight: 'bold', marginBottom: 6 },
  videoSub: { fontSize: 15, color: '#666666' },
  emptyBox: {
    backgroundColor: '#FFF8E1',
    padding: 18,
    borderRadius: 14,
    marginBottom: 16,
  },
  emptyText: { fontSize: 16, color: '#6D4C41', textAlign: 'center' },
  modalSafe: { flex: 1, backgroundColor: '#000000' },
  modalHeader: {
    backgroundColor: '#0B2A3A',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  modalTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  closeButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeText: { color: '#0B2A3A', fontSize: 16, fontWeight: 'bold' },
  webview: { flex: 1, backgroundColor: '#000000' },
  videoLoadingBox: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoLoadingText: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
});