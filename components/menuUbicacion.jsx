import { View, Text, TouchableOpacity, StyleSheet } from "react-native";




export default function menuUbicacion() {

    return(
        <View style={styles.menuUbi}>
            <TouchableOpacity style={styles.agregarUbi}> 
                <Text style={styles.botonUbi}>+</Text>
                <Text style={styles.textoUbi}>Nueva ubicacion</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    menuUbi: {
        width: "100vw",
        height: "60vh",
        backgroundColor: "#f5f5f5ff",
        position: "absolute",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        bottom: 0
    },
    agregarUbi: {
        flexDirection: "row",
        marginTop: 20,
        marginLeft: 30,
        gap: 10
    },
    botonUbi: {
        borderRadius: 50,
        backgroundColor: "#e3e3e3ff",
        width: 30,
        height: 30,
        textAlign: "center",
        justifyContent: "center",
        fontSize: 20
    },
    textoUbi: {
        fontSize: 17
    }

});