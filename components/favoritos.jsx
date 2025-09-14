import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const productosFavoritos = [
  { id: '1', nombre: 'Producto A', descripcion: 'Descripción del producto A' },
  { id: '2', nombre: 'Producto B', descripcion: 'Descripción del producto B' },
  { id: '3', nombre: 'Producto C', descripcion: 'Descripción del producto C' },
];

export default function Favoritos() {
  const removeFavorito = (id) => {
    // Lógica para quitar el producto de favoritos
    console.log('Quitar producto con id:', id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Favoritos</Text>
      <FlatList
        data={productosFavoritos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.producto}>
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.descripcion}>{item.descripcion}</Text>
            <TouchableOpacity
              style={styles.botonQuitar}
              onPress={() => removeFavorito(item.id)}
            >
              <Text style={styles.textoQuitar}>Quitar</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.vacio}>No tienes productos favoritos.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    flex: 1,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  producto: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  nombre: {
    fontSize: 18,
    fontWeight: '600',
  },
  descripcion: {
    fontSize: 14,
    color: '#555',
  },
  botonQuitar: {
    marginTop: 8,
    backgroundColor: '#ff6666',
    padding: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  textoQuitar: {
    color: '#fff',
    fontWeight: 'bold',
  },
  vacio: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
    fontSize: 16,
  },
});
