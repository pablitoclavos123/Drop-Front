import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';
import { useState, useEffect, useRef } from "react"; // añadir useRef
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
  const lastDragAt = useRef(0); // añadir useRef para registrar el tiempo del último drag

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

  // función que marca el tiempo del último drag
  const handleMenuDragEnd = () => {
    lastDragAt.current = Date.now();
  };

  const closeMenu = () => {
    // si el usuario acaba de arrastrar, ignoramos el tap que podría cerrar inmediatamente
    if (Date.now() - lastDragAt.current < 500) return;
    setMenuVisible(false);
  };

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
    if (Date.now() - lastDragAt.current < 500) return;
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
        <View style={styles.overlayContainer}>
          <TouchableWithoutFeedback onPress={closeMenu}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
          <View style={styles.menuUbiContainer}>
            <MenuUbicacion onClose={closeMenu} onDragEnd={handleMenuDragEnd} />
          </View>
        </View>
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
        <View style={styles.menuUsuarioOverlayContainer}>
          <TouchableWithoutFeedback onPress={closeMenuUsuario}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
          <View style={styles.menuUsuarioContainer}>
            {usuarioScreen === "menu" && (
              <MenuUsuario 
                onLogin={handleLogin} 
                onRegister={handleRegister} 
                onClose={closeMenuUsuario}
                onDragEnd={handleMenuDragEnd}
              />
            )}
            {usuarioScreen === "login" && (
              <Login 
                onRegister={handleRegister} 
                onClose={closeMenuUsuario} 
                onLoginSuccess={loginUser}
              />
            )}
            {usuarioScreen === "register" && (
              <Register onClose={closeMenuUsuario} />
            )}
          </View>
        </View>
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
    height: "100%",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
    zIndex: 11,
    position: "absolute",
    bottom: 0,
    left: 0,
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
    zIndex: 29,
    justifyContent: "flex-end",
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
    zIndex: 1000,
  },
});