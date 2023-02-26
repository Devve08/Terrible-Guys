import { useFonts } from "expo-font";
import React, { useEffect, useContext } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import image from "../../assets/images/project.png";
import SessionContext from "../../context/SessionContext";
import { RowSpaceContainer } from "../../Styles/styles";
import FlatlistComponent from "./FlatlistComponent";

const data = ["Title 1", "Title 2", "Title 3", "Title 4"];

export default function RecentWork({ navigation }) {
  const { projectsList, getProjectsList } = useContext(SessionContext);
  const [fontsLoaded] = useFonts({
    "Myriad-Regular": require("../../assets/fonts/MYRIADPRO-REGULAR.otf"),
    "Myriad-Bold": require("../../assets/fonts/MYRIADPRO-BOLD.otf"),
  });

  useEffect(() => {
    getProjectsList();
  }, []);

  return (
    <View>
      <RowSpaceContainer>
        <Text style={{ fontSize: 20, fontFamily: 'Myriad-Bold', marginBottom: 5, color: '#D7AF43' }}>
          Recent Work
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Projects")}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Text style={{color: '#D7AF43', fontFamily: 'Myriad-Regular'}}>View all</Text>
          <Icon color={'#D7AF43'} name="arrow-right-alt" size={22} />
        </TouchableOpacity>
      </RowSpaceContainer>
      <View style={styles.flatListView}>
        {projectsList && (
          <FlatList
            horizontal={true}
            style={{ width: "100%", height: "100%" }}
            data={projectsList.projects_array}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => (
              
                <FlatlistComponent onPress={()=> navigation.navigate("Calendar", { pp_id: item.pp_id })} title={item.pp_project_label} image={item.project_img_logo}  />
            
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
