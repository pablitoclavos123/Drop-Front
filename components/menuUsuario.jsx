import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


export default function MenuUsuario({ onLogin, onRegister }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Usuario</Text>
      <TouchableOpacity style={styles.boton} onPress={onLogin}>
        <Text style={styles.textoBoton}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.boton} onPress={onRegister}>
        <Text style={styles.textoBoton}>Crear cuenta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "60vh",
    backgroundColor: "#28b87eff",
    padding: 24,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    minHeight: 180,
    alignItems: 'center',
  },
  titulo: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  boton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginVertical: 8,
    width: '80%',
    alignItems: 'center',
  },
  textoBoton: {
    color: "#28b87eff",
    fontSize: 16,
    fontWeight: 'bold',
  },
});
