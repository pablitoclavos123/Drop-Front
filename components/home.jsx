import { ScrollView, View } from "react-native";
import Header from "./header";
import SliderMenu from "./sliderMenu";
import Slider from "./slider";

export default function Home({ onPressUbicacion, onCarritoPress }) {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header onPressUbicacion={onPressUbicacion} />
      <SliderMenu />
      <Slider />
      <View style={{ height: 80 }} /> {/* Espacio para MainBar */}
    </ScrollView>
  );
}
