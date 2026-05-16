import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/title-sadaham.png")}
        style={styles.titleImage}
      />
              
      <View style={styles.imageWrap}>
        <Image
          source={require("../../assets/images/mudra.png")}
          style={styles.image}
        />
      </View>
         
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.dharmaButton]}
          onPress={() => router.push("/dharma")}
        >
          <Text style={{ fontFamily: "Basuru", fontSize: 30, color: "#FFFFFF"  }}> O¾ufoaYkd </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.liveButton]}
          onPress={() => router.push("/live")}
        >
          <Text
  style={{
    fontFamily: "Basuru",
    fontSize: 30,
    color: "#FFFFFF",
  }}
>
  iÂú
</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.pirithButton]}
          onPress={() => router.push("/pirith")}
          
        >
          <Text style={{ fontFamily: "Basuru", fontSize: 30, color: "#FFFFFF"  }}> msß;a </Text>
        </TouchableOpacity>
       
        <TouchableOpacity
          style={[styles.button, styles.aiButton]}
          onPress={() => router.push("/assistant")}
        >
          
         <Text style={{ fontFamily: "Basuru", fontSize: 30, color: "#FFFFFF"  }}> iydhl </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: "#FFFFFF",
  alignItems: "center",
  paddingHorizontal: 10,
  justifyContent: "flex-start",
  paddingTop: -60,
  },

  titleImage: {
  width: 600,
  height:510,
  resizeMode: "contain",
  marginTop: -120,
  marginBottom: -40,


  },

  imageWrap: {
    width: "100%",
    height:10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 55,
  },

  image: {
    width: 760,
    height: 760,
    resizeMode: "contain",
  },

  buttonContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginTop:0,
  },

  button: {
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  dharmaButton: {
    backgroundColor: "#8E44AD",
    width: "65%",
  },

  liveButton: {
    backgroundColor: "#3B78C2",
    width: "78%",
  },

  pirithButton: {
    backgroundColor: "#EDB52F",
    width: "62%",
  },

  aiButton: {
    backgroundColor: "#2F8A35",
    width: "48%",
  },

  buttonText: {
  fontFamily: "Basuru",
  color: "#FFD700",
  fontSize: 22,
  textAlign: "center",
  },
});