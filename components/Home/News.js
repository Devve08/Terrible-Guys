import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import SessionContext from "../../context/SessionContext";
import { RowSpaceContainer } from "../../Styles/styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import FlatlistComponent from "./FlatlistComponent";

export default function News({ navigation }) {
  const { getNewsInfo } = useContext(SessionContext);
  const [news, setNews] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getNewsInfo();
      setNews(res.news_array);
    })();
  }, []);
  return (
    <View>
      <RowSpaceContainer>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 5,
            color: "#D7AF43",
          }}
        >
          News
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("AllNews")}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Text style={{ color: "#D7AF43" }}>View all</Text>
          <Icon color={"#D7AF43"} name="arrow-right-alt" size={22} />
        </TouchableOpacity>
      </RowSpaceContainer>
      <View style={styles.flatListView}>
        {news && (
          <FlatList
            horizontal={true}
            style={{ width: "100%", height: "100%" }}
            data={news}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => (
              <FlatlistComponent
                onPress={() => navigation.navigate("SingleNews", { item })}
                title={item.ln_news_title}
                image={item.news_profile}
              />
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flatListView: {
    height: 160,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
});
