import { View, StyleSheet, TouchableOpacity, Text, TextInput, Alert } from "react-native";
import React, { useState } from "react";

export default function Register({ onClose }) {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confirmar, setConfirmar] = useState('');
    const [error, setError] = useState('');
    const [tipo, setTipo] = useState('usuario'); // 'usuario' o 'local'

    const enviarFormulario = async () => {
        if (contrasena !== confirmar) {
            setError("Las contraseñas no coinciden");
            return;
        }
        try {
            const res = await fetch("http://localhost:3000/registrar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, correo, contrasena, rol: tipo }),
            });

            const data = await res.json();

            if (res.ok) {
                Alert.alert("Éxito", "Registro exitoso 🚀");
                setNombre("");
                setCorreo("");
                setContrasena("");
                setConfirmar("");
                setError("");
            } else {
                setError(data.error || "Error en el registro");
            }
        } catch (err) {
            console.error("Error en el registro:", err);
            setError("No se pudo conectar al servidor");
        }
    };

    return (
        <View style={styles.register}>
            <TouchableOpacity style={styles.cerrarBoton} onPress={onClose}>
                <Text style={styles.cerrarTexto}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.titulo}>Registrarse</Text>
            <View style={styles.inputs}>
                {/* Checklist tipo usuario/local */}
                <View style={styles.checklistContainer}>
                    <TouchableOpacity style={styles.checklistItem} onPress={() => setTipo('usuario')}>
                        <View style={[styles.radio, tipo === 'usuario' && styles.radioSelected]} />
                        <Text style={styles.radioLabel}>Usuario</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.checklistItem} onPress={() => setTipo('local')}>
                        <View style={[styles.radio, tipo === 'local' && styles.radioSelected]} />
                        <Text style={styles.radioLabel}>Local</Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={styles.formInput}
                    placeholder="Nombre de usuario"
                    value={nombre}
                    onChangeText={setNombre}
                />
                <TextInput
                    style={styles.formInput}
                    placeholder="Correo electrónico"
                    value={correo}
                    onChangeText={setCorreo}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.formInput}
                    placeholder="Contraseña"
                    value={contrasena}
                    onChangeText={setContrasena}
                    secureTextEntry
                />
                <TextInput
                    style={styles.formInput}
                    placeholder="Confirmar contraseña"
                    value={confirmar}
                    onChangeText={setConfirmar}
                    secureTextEntry
                />
                {error ? <Text style={styles.error}>{error}</Text> : null}
            </View>
            <TouchableOpacity style={styles.registrarseBoton} onPress={enviarFormulario}>
                <Text style={{ color: "white", textAlign: "center" }}>Registrarse</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    register: {
        width: 300,
        height: 400,
        borderWidth: 2,
        borderRadius: 10,
        alignItems: "center",
        padding: 10, 
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
        marginTop: 20,
        textAlign: "center",
    },
    inputs: {
        width: "100%",
        alignItems: "center",
        marginTop: 20,
        gap: 10,
    },
    formInput: {
        width: "90%",
        height: 40,
        borderWidth: 2,
        borderRadius: 5,
        textAlign: "center",
        marginBottom: 5,
    },
    registrarseBoton: {
        width: "65%",
        height: 40,
        backgroundColor: "#28b87eff",
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 20,
        justifyContent: "center",
    },
    error: {
        color: "red",
        marginTop: 5,
        fontSize: 14,
    },
    checklistContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        gap: 20,
    },
    checklistItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#28b87e',
        backgroundColor: '#fff',
        marginRight: 4,
    },
    radioSelected: {
        backgroundColor: '#28b87e',
        borderColor: '#28b87e',
    },
    radioLabel: {
        fontSize: 16,
        color: '#222',
    },
});
