import { useFonts } from "expo-font";
import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
export default function SingleNewsScreen({ image, navigation, route: item }) {
  const [fontsLoaded] = useFonts({
    "Myriad-Regular": require("../assets/fonts/MYRIADPRO-REGULAR.otf"),
    "Myriad-Bold": require("../assets/fonts/MYRIADPRO-BOLD.otf"),
  });

  return (
    <View style={{ padding: 20, backgroundColor: "black", flex: 1 }}>
      <TouchableOpacity
        style={{ paddingVertical: 20 }}
        onPress={() => navigation.goBack()}
      >
        <Ionicon color={"#D7AF43"} name="arrow-back-outline" size={30} />
      </TouchableOpacity>
      <Image
        style={{ width: 150, height: 150, alignSelf: "center" }}
        source={{ uri: item.params.item.news_profile }}
      />
      <Text
        style={{
          fontSize: 20,
          fontFamily: 'Myriad-Bold',
          alignSelf: "center",
          paddingVertical: 20,
          color: "#D7AF43",
        }}
      >
        {item.params.item.ln_news_title}
      </Text>

      <Text style={{ fontSize: 16, alignSelf: "center", color: "#D7AF43", fontFamily: 'Myriad-Regular' }}>
        {item.params.item.ln_news_content}
      </Text>
    </View>
  );
}
