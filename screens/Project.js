import { useFonts } from "expo-font";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const data = [
  { name: "Shooting 1", location: "location", date: "10:00AM" },
  { name: "Shooting 2", location: "location2", date: "12:00AM" },
  { name: "Shooting 3", location: "location3", date: "7:00AM" },
];

export default function Project({navigation, route}) {
  let project_id = route.params.project_id
  const [fontsLoaded] = useFonts({
    "Myriad-Regular": require("../assets/fonts/MYRIADPRO-REGULAR.otf"),
    "Myriad-Bold": require("../assets/fonts/MYRIADPRO-BOLD.otf"),
  });
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => index}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("ProjectFiles", {project_id})}
            style={styles.btnProject}
          >
            <View>
              <Text style={styles.titleText}>{item.name}</Text>
              <Text style={{ fontSize: 16, paddingHorizontal: 10, fontFamily: 'Myriad-Regular' }}>{item.location}</Text>
            </View>

            <Text style={{ fontSize: 16, paddingHorizontal: 10, fontFamily: 'Myriad-Regular' }}>
              {item.date}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  btnProject: {
    borderTopColor: "black",
    borderTopWidth: 1,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "100%",
    height: 60,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
  container: {
    marginTop: 10,
    backgroundColor: "white",
    height: "100%",
    width: "100%",
  },
  titleText: {
    fontSize: 17,
   fontFamily: 'Myriad-Bold',
    paddingHorizontal: 10,
  },
});
