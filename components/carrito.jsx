import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";

export default function Carrito() {
  const [productos, setProductos] = useState([
    { id: "1", nombre: "Huevada cosmica", categoria: "Hamburguesa", precio: 3999, cantidad: 1 },
    { id: "2", nombre: "Nombre producto", categoria: "Categoría", precio: 3200, cantidad: 1 },
  ]);

  const incrementar = (id) => {
    setProductos(productos.map(p =>
      p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
    ));
  };

  const decrementar = (id) => {
    setProductos(productos.map(p =>
      p.id === id && p.cantidad > 1 ? { ...p, cantidad: p.cantidad - 1 } : p
    ));
  };

  const total = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  const renderItem = ({ item }) => (
    <View style={styles.producto}>
      <View style={styles.imagen}>
        <Text style={{ color: "#fff", textAlign: "center" }}>Imagen{"\n"}producto</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.categoria}>{item.categoria}</Text>
        <Text style={styles.precio}>${item.precio}</Text>
      </View>

      <View style={styles.cantidad}>
        <TouchableOpacity onPress={() => decrementar(item.id)}>
          <Text style={styles.boton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.numero}>{item.cantidad}</Text>
        <TouchableOpacity onPress={() => incrementar(item.id)}>
          <Text style={styles.boton}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <Text style={styles.editar}>Editar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header carrito */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Tu carrito</Text>
        <Text style={styles.total}>Total: ${total}</Text>
      </View>

      {/* Lista productos */}
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      {/* Botón confirmar */}
      <TouchableOpacity style={styles.botonPago}>
        <Text style={styles.textoPago}>Confirmar Pago</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
  },
  total: {
    fontSize: 22,
    fontWeight: "bold",
  },
  producto: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    marginBottom: 5,
    padding: 10,
    borderRadius: 5,
  },
  imagen: {
    width: 80,
    height: 80,
    backgroundColor: "#aaa",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontWeight: "bold",
    fontSize: 14,
  },
  categoria: {
    color: "#666",
    fontSize: 12,
  },
  precio: {
    fontWeight: "bold",
    marginTop: 5,
  },
  cantidad: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  boton: {
    fontSize: 20,
    paddingHorizontal: 8,
  },
  numero: {
    fontSize: 16,
    marginHorizontal: 5,
  },
  editar: {
    color: "blue",
  },
  botonPago: {
    position: "absolute",
    bottom: 60,
    left: 0,
    width: "100%",
    backgroundColor: "#4CD6A4",
    padding: 25,
    borderRadius: 5,
    alignItems: "center",
    height: 70
  },
  textoPago: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
