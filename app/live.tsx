import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import * as ScreenOrientation from 'expo-screen-orientation';
type LiveItem = {
  id: string;
  title: string;
  channel?: string;
};

const API_BASE = 'https://sadaham-backend-production.up.railway.app';

export default function LiveScreen() {
  const [selectedLive, setSelectedLive] = useState<LiveItem | null>(null);
  const [results, setResults] = useState<LiveItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('සජීවී වැඩසටහන් සොයන්න.');

  const searchLive = async () => {
    try {
      setLoading(true);
      setMessage('');
      setResults([]);

      const res = await fetch(`${API_BASE}/api/live/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      if (!data?.ok || !Array.isArray(data.results) || data.results.length === 0) {
        setMessage('දැනට සජීවී වැඩසටහන් හමු නොවුණි.');
        return;
      }

      setResults(data.results);
    } catch {
      setMessage('Network error. Backend / Internet connection බලන්න.');
    } finally {
      setLoading(false);
    }
  };

  const clearLive = () => {
    setResults([]);
    setMessage('සජීවී වැඩසටහන් සොයන්න.');
  };
    const openVideo = async (item: LiveItem) => {
  setSelectedLive(item);
  await ScreenOrientation.unlockAsync();
};

const closeVideo = async () => {
  setSelectedLive(null);
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
};
  const renderItem = ({ item }: { item: LiveItem }) => (
    <TouchableOpacity style={styles.card} onPress={() => openVideo(item)}>
      <Image
        source={{ uri: `https://img.youtube.com/vi/${item.id}/hqdefault.jpg` }}
        style={styles.thumbnail}
      />

      <View style={styles.cardBody}>
        <Text style={styles.liveBadge}>🔴 LIVE</Text>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.channel}>{item.channel || 'YouTube Live'}</Text>
        <Text style={styles.playText}>App එක ඇතුළේ බලන්න</Text>
      </View>
    </TouchableOpacity>
  );

  return ( 
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={{
    fontFamily: "Basuru",
    fontSize: 40,
    color:   "#e61010",   
    textAlign: "center",
  }}
>
 iÂù jevigyka
</Text>

        <View style={styles.topBox}>
          <Text style={styles.helpText}>
            අද live යන බෞද්ධ බණ / පිරිත් / ධර්ම වැඩසටහන් සොයන්න.
          </Text>

          <TouchableOpacity style={styles.searchButton} onPress={searchLive} disabled={loading}>
            <Text style={styles.searchButtonText}>
              {loading ? 'සොයමින්...' : 'Live සොයන්න'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.clearButton} onPress={clearLive} disabled={loading}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>

        {loading && (
          <View style={styles.loadingRow}>
            <ActivityIndicator size="small" color="#0B2A3A" />
            <Text style={styles.loadingSmallText}>Live videos සොයමින්...</Text>
          </View>
        )}

        {results.length > 0 ? (
          <FlatList
            data={results}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>{message}</Text>
          </View>
        )}

        <Modal

                 
          visible={selectedLive !== null}
          animationType="slide"
          onRequestClose={closeVideo}
        >
          
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedLive?.title}</Text>

              <TouchableOpacity style={styles.closeButton}onPress={closeVideo} >
                <Text style={styles.closeText}>වසන්න</Text>
              </TouchableOpacity>
            </View>
                  
            {selectedLive && (
              <WebView
                style={styles.webview}
                source={{ uri: `${API_BASE}/youtube.html?v=${selectedLive.id}` }}
                javaScriptEnabled
                domStorageEnabled
                allowsFullscreenVideo
                startInLoadingState
                renderLoading={() => (
                  <View style={styles.loadingBox}>
                    <Text style={styles.loadingText}>Live video load වෙමින්...</Text>
                  </View>
                )}
              />
            )}
          </SafeAreaView>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0B2A3A',
    marginBottom: 18,
    textAlign: 'center',
  },
  topBox: {
    backgroundColor: '#F4F8F6',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DDE7E1',
  },
  helpText: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  searchButton: {
    height: 48,
    backgroundColor: '#0B2A3A',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  clearButton: {
    height: 44,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  loadingSmallText: {
    color: '#0B2A3A',
    fontSize: 15,
    fontWeight: '700',
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#F2F6FA',
    marginBottom: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: 185,
    backgroundColor: '#DDDDDD',
  },
  cardBody: {
    padding: 14,
  },
  liveBadge: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C62828',
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  channel: {
    fontSize: 15,
    color: '#666666',
    marginBottom: 8,
  },
  playText: {
    fontSize: 15,
    color: '#0B2A3A',
    fontWeight: '700',
  },
  emptyBox: {
    backgroundColor: '#FFF8E1',
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F2D27B',
  },
  emptyText: {
    color: '#6D4C41',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: '700',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  modalHeader: {
    backgroundColor: '#0B2A3A',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeText: {
    color: '#0B2A3A',
    fontSize: 16,
    fontWeight: 'bold',
  },
  webview: {
    flex: 1,
    backgroundColor: '#000000',
  },
  loadingBox: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});