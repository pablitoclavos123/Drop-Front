import React, { useRef, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

const data = [
  { id: "1", title: "Card 1" },
  { id: "2", title: "Card 2" },
  { id: "3", title: "Card 3" },
  { id: "4", title: "Card 4" },
  { id: "5", title: "Card 5" },
  { id: "6", title: "Card 6" },
];

const cardWidth = 190;
const cardSpacing =10;

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < data.length - 3) { // -3 porque se ven 3 a la vez
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      flatListRef.current.scrollToIndex({ index: newIndex, animated: true });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      flatListRef.current.scrollToIndex({ index: newIndex, animated: true });
    }
  };

  return (
    <View style={styles.mainWrapper}>
      {/* Flecha izquierda */}
      {currentIndex > 0 && (
        <TouchableOpacity style={styles.arrowLeft} onPress={handlePrev}>
          <Text style={styles.arrowText}>◀</Text>
        </TouchableOpacity>
      )}

      {/* Contenedor de cards */}
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>{item.title}</Text>
          </View>
        )}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: cardWidth + cardSpacing,
          offset: (cardWidth + cardSpacing) * index,
          index,
        })}
        contentContainerStyle={{ gap: cardSpacing }}
        style={{ width: cardWidth * 3 + cardSpacing * 2 }} // ancho fijo para 3 cards
      />

      {/* Flecha derecha */}
      {currentIndex < data.length - 3 && (
        <TouchableOpacity style={styles.arrowRight} onPress={handleNext}>
          <Text style={styles.arrowText}>▶</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  arrowLeft: {
    position: "absolute",
    left: 0,
    top: "50%",
    transform: [{ translateY: -14 }],
    zIndex: 1,
    padding: 10,
  },
  arrowRight: {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: [{ translateY: -14 }],
    zIndex: 1,
    padding: 10,
  },
  arrowText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  card: {
    width: cardWidth,
    height: 120,
    borderRadius: 12,
    backgroundColor: "#00c877",
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
