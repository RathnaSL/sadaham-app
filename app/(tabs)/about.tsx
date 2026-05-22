import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <Text style={styles.title}>සදහම් සරණ</Text>

      <Image
        source={require("../../assets/images/mudra.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.version}>Version 2.0</Text>

      <Text style={styles.appName}>Smart Buddhist App</Text>

      <Text style={styles.description}>

        <Text style={styles.description}>
        කේ.එචි. ජෝන් සමරසේකර  සහ
          කුසුමා ජයනෙත්ති ආරච්චි
          මවුපියන් දෙපල{"\n\n"} සහ{"\n\n"} මියගිය සියලුම
          නැදෑ හිතමිතුරු ආදීන්ට පිංපිණිස
          {"\n\n"}
          රේණුකා දමයන්ති සමරසේකර {"\n\n"}
          රත්න සමරසේකර{"\n\n"} 
          යන දූ දරුවන් වන්
          විසින්{"\n\n"}
           බෞද්ධ
          සැදැහැවතුන් වෙත සැදැහැසිතින්
          පිරිනමන වගයි.
          </Text>
           {"\n\n"}
           
        බුදු දහම, පිරිත්, ධර්ම දේශනා සහ සතිපට්ඨාන
        සූත්‍ර ඇතුළු වටිනා ධර්ම අන්තර්ගතයන්
        මෙම යෙදුම තුළින් 
        ලබාගත හැක.
      {"\n\n"}
</Text>
      <Text style={styles.footer}>
        Developed by 
        Rathna Samarasekara
      </Text>
        
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 30,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#F5F5F5",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#D84315",
    marginBottom: -0,
  },

  logo: {
    width: 480,
    height: 480,
    marginBottom:-150,
  },

  version: {
    fontSize: 20,
    fontWeight: "900",
    color: "#6A1B9A",
    marginBottom: 2,
  },

  appName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1565C0",
    marginBottom:10,
  },

  description: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 20,
    color: "#333",
    marginBottom: 0,
  },

  footer: {
    fontSize: 18,
    color: "#777",
  },
});