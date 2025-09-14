import { View, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function MainBar({ onCarritoPress, onHomePress, onFavoritosPress, onUsuarioPress }) {
    return(
        <View style={styles.mainBar}>
            <TouchableOpacity style={styles.botonBar} onPress={onHomePress}>
                <Image source={require("../assets/logoHome.png")} style={styles.imgBotonBar} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonBar} onPress={onFavoritosPress}>
                <Image source={require("../assets/logoFav.png")} style={styles.imgBotonBar} />     
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonBar} onPress={onCarritoPress}>
                <Image source={require("../assets/logoCarrito.png")} style={styles.imgBotonBar} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonBar} onPress={onUsuarioPress}>
                <Image source={require("../assets/logoUsuario.png")} style={styles.imgBotonBar} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainBar: {
        position: "absolute",
        flexDirection: "row",
        width: "100%",
        height: 60,
        backgroundColor: "#f7f7f7ff",
        bottom: 0,
        borderTopWidth: 1,
    },
    botonBar: {
        width: "25%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    imgBotonBar: {
        width: 60,
        height: 60,
    }
})