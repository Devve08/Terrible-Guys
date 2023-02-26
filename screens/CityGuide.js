import { useFonts } from "expo-font";
import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
} from "react-native";
import SessionContext from "../context/SessionContext";

export default function CityGuide({ navigation }) {
  const [categories, setCategories] = useState([]);
  const { getCategoriesList, getListPlaces } = useContext(SessionContext);
  const [fontsLoaded] = useFonts({
    "Myriad-Regular": require("../assets/fonts/MYRIADPRO-REGULAR.otf"),
    "Myriad-Bold": require("../assets/fonts/MYRIADPRO-BOLD.otf"),
  });
  const getCatInfo = async (id, hotelName) => {
  
    let res = await getCategoriesList(id);
    navigation.navigate("SubCategories", {
      subCategories: res.categories_array,
      hotelName,
    });
  };

  useEffect(() => {
   
    (async () => {
      const res = await getCategoriesList(0);
      setCategories(res.categories_array);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={categories}
        keyExtractor={(item, _index) => _index}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => getCatInfo(item.pv_id, item.pv_category_title)}
            key={index}
            style={styles.newsContainer}
          >
            <Image style={styles.image} source={{ uri: item.pv_profile }} />
            <Text style={{ fontSize: 16, fontFamily: 'Myriad-Bold' }}>
              {item.pv_category_title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flex: 1,
    backgroundColor: "black",
  },
  newsContainer: {
    backgroundColor: "#D7AF43",
    height: 75,
    width: "100%",
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 20,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
});
