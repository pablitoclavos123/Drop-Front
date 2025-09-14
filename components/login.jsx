import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Alert, Platform } from "react-native";
import Checkbox from "expo-checkbox";

export default function Login({ onRegister, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setChecked] = useState(false);

  const showMsg = (title, msg) => {
    if (Platform.OS === "web") {
      window.alert(`${title}: ${msg}`);
    } else {
      Alert.alert(title, msg);
    }
  };

  const enviarFormulario = () => {
    // IMPORTANTE: credentials: 'include' para mandar/recibir cookie de sesión
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ correo: email, contrasena: password })
    })
      .then(async res => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          const msg = data?.error || `Error HTTP ${res.status}`;
          showMsg("Error", msg);
          return;
        }
        showMsg("Éxito", data.mensaje || "Logueado");
        setEmail('');
        setPassword('');
        setChecked(false);

        // (Opcional) Consultar el estado de sesión
        return fetch('http://localhost:3000/me', { credentials: 'include' })
          .then(r => r.json())
          .then(d => console.log("Estado de sesión:", d));
      })
      .catch(err => {
        console.log("❌ Error en fetch:", err);
        showMsg("Error", err.message);
      });
  };

  return (
    <View style={styles.login}>
      <TouchableOpacity style={styles.cerrarBoton} onPress={onClose}>
        <Text style={styles.cerrarTexto}>✕</Text>
      </TouchableOpacity>
      <Text style={styles.titulo}>Iniciar Sesión</Text>
      <View style={styles.inputs}>
        <TextInput
          style={styles.formInput}
          placeholder="Ingresa tu correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.formInput}
          placeholder="Ingresa tu contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.iniciarSesionBoton} onPress={enviarFormulario}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <Text> o</Text>
      <TouchableOpacity style={styles.registroBoton} onPress={onRegister}>
        <Text style={{ textAlign: 'center' }}>Crear una cuenta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  login: {
    width: 250,
    height: 350,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 16,
    gap: 8,
    backgroundColor: "#ffffff",
    marginTop: "25vh",
    alignSelf: "center",
    position: "relative"
  },
  cerrarBoton: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 10,
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cerrarTexto: {
    fontSize: 32,
    color: "#b9adadff",
    fontWeight: "bold",
    textAlign: "center",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    width: "90%",
    marginTop: 8,
  },
  inputs: {
    width: "100%",
    alignItems: "center",
    marginTop: 16,
    gap: 10
  },
  formInput: {
    width: "90%",
    height: 36,
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 8
  },
  iniciarSesionBoton: {
    width: "65%",
    height: 36,
    backgroundColor: "#28b87e",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    justifyContent: "center"
  },
  registroBoton: {
    width: "65%",
    height: 36,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    justifyContent: "center"
  },

});
