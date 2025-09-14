import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';
import { useState, useEffect } from "react";
import Header from './components/header'
import MainBar from './components/mainBar'
import MenuUbicacion from './components/menuUbicacion'
import Carrito from './components/carrito'
import Home from './components/home'
import Favoritos from './components/favoritos'
import MenuUsuario from './components/menuUsuario'
import Login from './components/login'
import Register from './components/register'

export default function App() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [carritoVisible, setCarritoVisible] = useState(false);
  const [favoritosVisible, setFavoritosVisible] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("home");
  const [favoritos, setFavoritos] = useState([]);
  const [menuUsuarioVisible, setMenuUsuarioVisible] = useState(false);
  const [usuarioScreen, setUsuarioScreen] = useState("menu");
  const [user, setUser] = useState(null); // <- estado de sesión

  const API_URL = "http://localhost:3000"; // tu backend

  // 🔹 Verificar sesión al iniciar la app
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(`${API_URL}/me`, { credentials: "include" });
        const data = await res.json();
        if (data.logueado) setUser(data.user);
      } catch (err) {
        console.error("Error verificando sesión:", err);
      }
    };
    checkSession();
  }, []);

  const toggleMenu = () => setMenuVisible(!menuVisible);
  const closeMenu = () => setMenuVisible(false);

  const openCarrito = () => {
    setFavoritosVisible(false);
    setCarritoVisible(true);
    setMenuUsuarioVisible(false);
  };
  const closeCarrito = () => setCarritoVisible(false);

  const openFavoritos = () => {
    setCarritoVisible(false);
    setFavoritosVisible(true);
    setMenuUsuarioVisible(false);
  };
  const closeFavoritos = () => setFavoritosVisible(false);

  const goHome = () => {
    setMenuVisible(false);
    setCarritoVisible(false);
    setFavoritosVisible(false);
    setCurrentScreen("home");
    setMenuUsuarioVisible(false);
  };

  const handleLogin = () => setUsuarioScreen("login");
  const handleRegister = () => setUsuarioScreen("register");
  const handleBackUsuario = () => setUsuarioScreen("menu");

  // 🔹 Solo abre el menú si NO hay usuario logueado
  const openMenuUsuario = () => {
    if (user) return; // ya logueado, no abrir menú
    setMenuUsuarioVisible(true);
    setUsuarioScreen("menu");
  };

  const closeMenuUsuario = () => {
    setMenuUsuarioVisible(false);
    setUsuarioScreen("menu");
  };

  // 🔹 Función de login dentro de App.js
  const loginUser = async (correo, contrasena) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ correo, contrasena }),
      });
      const data = await res.json();
      if (!data.error) {
        setUser(data.user);
        closeMenuUsuario();
      }
      return data;
    } catch (err) {
      console.error("Error login:", err);
      return { error: "Error de servidor" };
    }
  };

  // 🔹 Función de logout dentro de App.js
  const logoutUser = async () => {
    try {
      await fetch(`${API_URL}/logout`, { method: "POST", credentials: "include" });
      setUser(null);
    } catch (err) {
      console.error("Error logout:", err);
    }
  };

  const addFavorito = (producto) => {
    setFavoritos((prev) => {
      if (prev.find(p => p.id === producto.id)) return prev;
      return [...prev, producto];
    });
  };

  const removeFavorito = (productoId) => {
    setFavoritos((prev) => prev.filter(p => p.id !== productoId));
  };

  return (
    <>
      {currentScreen === "home" && (
        <Home 
          onPressUbicacion={toggleMenu}
          onCarritoPress={openCarrito}
          favoritos={favoritos}
          addFavorito={addFavorito}
          removeFavorito={removeFavorito}
        />
      )}

      {menuVisible && (
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.overlayContainer}>
            <View style={styles.overlay} />
            <TouchableWithoutFeedback>
              <View style={styles.menuUbiContainer}>
                <MenuUbicacion />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}

      {carritoVisible && (
        <TouchableWithoutFeedback onPress={closeCarrito}>
          <View style={styles.carritoOverlayContainer}>
            <View style={styles.overlay} />
            <TouchableWithoutFeedback>
              <View style={styles.carritoContainer}>
                <Carrito />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}

      {favoritosVisible && (
        <TouchableWithoutFeedback onPress={closeFavoritos}>
          <View style={styles.favoritosOverlayContainer}>
            <View style={styles.overlay} />
            <TouchableWithoutFeedback>
              <View style={styles.favoritosContainer}>
                <Favoritos 
                  favoritos={favoritos}
                  removeFavorito={removeFavorito}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}

      {menuUsuarioVisible && (
        <TouchableWithoutFeedback onPress={closeMenuUsuario}>
          <View style={styles.menuUsuarioOverlayContainer}>
            <View style={styles.overlay} />
            <TouchableWithoutFeedback>
              <View style={styles.menuUsuarioContainer}>
                {usuarioScreen === "menu" && (
                  <MenuUsuario 
                    onLogin={handleLogin} 
                    onRegister={handleRegister} 
                  />
                )}
                {usuarioScreen === "login" && (
                  <Login 
                    onRegister={handleRegister} 
                    onClose={closeMenuUsuario} 
                    onLoginSuccess={loginUser} // pasa la función de login
                  />
                )}
                {usuarioScreen === "register" && (
                  <Register onClose={closeMenuUsuario} />
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}

      <View style={styles.mainBarContainer}>
        <MainBar 
          onCarritoPress={openCarrito}
          onHomePress={goHome}
          onFavoritosPress={openFavoritos}
          onUsuarioPress={openMenuUsuario}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  // tus estilos actuales...
  main: {
    width: "100%",
    flex: 1
  },
  overlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 10,
    justifyContent: "flex-end",
  },
  menuUbiContainer: {
    width: "100%",
    zIndex: 11,
  },
  carritoOverlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 20, // mayor que el mainBar
    justifyContent: "flex-end",
  },
  carritoContainer: {
    width: "100%",
    position: "absolute",
    height: "100%",
    top: 0,
    zIndex: 21,
  },
  favoritosOverlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 25,
    justifyContent: "flex-end",
  },
  favoritosContainer: {
    width: "100%",
    position: "absolute",
    height: "100%",
    top: 0,
    zIndex: 26,
  },
  menuUsuarioOverlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 29, // menor que el mainBar
    justifyContent: "flex-end",
    borderTopWidth: 0, // Set to 0 or your desired value
  },
  menuUsuarioContainer: {
    width: "100%",
    position: "absolute",
    height: "100%",
    top: 0,
    zIndex: 29,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  mainBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: 30, // SIEMPRE visible, por encima de overlays pero debajo del carrito
  },
});