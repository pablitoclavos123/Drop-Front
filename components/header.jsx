import { View, StyleSheet, TextInput, TouchableOpacity, Text, Image } from "react-native";
import { useState } from "react";

export default function Header({ onPressUbicacion }) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.header}>
      <View style={styles.top}>
        <TouchableOpacity style={styles.botonUbicacion} onPress={onPressUbicacion}>
          <Image source={require("../assets/ubicacion.png")} style={styles.imgUbicacion} />
          <Text style={styles.direccion}>Av Alvear 144</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonPuntaje} onPress={() => alert("Boton Puntaje")}>
          <Image source={require("../assets/puntaje.png")} style={styles.imgPuntaje} />
          <Text style={styles.puntaje}>9999</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={[
          styles.barraBusqueda,
          { textAlign: isFocused || value !== "" ? "left" : "center" },
        ]}
        placeholder={isFocused ? "" : "Que pedís hoy?"}
        placeholderTextColor="#787878ff"
        value={value}
        onChangeText={setValue}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />


    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#28b87eff",
    height: 130,
    width: "100%",
    alignItems: "center",
  },
  top: {
    marginTop: 20,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  botonUbicacion: { 
    width: "40%",
    flexDirection: "row",
    alignItems: "center",
  },
  imgUbicacion: { 
    width: 30,
    height: 30,
  },
  direccion: { 
    color: "white", 
    fontSize: 16,
  },
  botonPuntaje: { 
    width: "15%",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  puntaje: { 
    color: "white", 
    fontSize: 16,
  },
  imgPuntaje: {
    width: 20,
    height: 20,
    marginTop: 3,
  },
  barraBusqueda: {
    marginTop: 30,
    height: 40,
    width: "85%",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 10,
    outlineStyle: "none",
  },
});
