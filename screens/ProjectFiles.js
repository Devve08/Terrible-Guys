import React, { useState, useEffect, useContext } from "react";
import Fontisto from "react-native-vector-icons/Fontisto";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import SessionContext from "../context/SessionContext";
import { useFonts } from "expo-font";

export default function ProjectFiles(props) {
  const { getListOfProjectFiles } = useContext(SessionContext);
  const [projectFiles, setProjectFiles] = useState([]);
  let project_id = props.route.params.project_id;
  const [fontsLoaded] = useFonts({
    "Myriad-Regular": require("../assets/fonts/MYRIADPRO-REGULAR.otf"),
    "Myriad-Bold": require("../assets/fonts/MYRIADPRO-BOLD.otf"),
  });

  useEffect(() => {
    (async () => {
      let res = await getListOfProjectFiles(project_id);
      setProjectFiles(res.project_files_array);
    })();
  }, []);

  const openPDF = link => {
    try {
      Linking.openURL(link);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <View style={styles.container}>
      {projectFiles && (
        <FlatList
          keyExtractor={(item, index) => index}
          data={projectFiles}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => openPDF(item.project_img_logo)}
              style={styles.btnProject}
            >
              <View>
                <Text style={styles.titleText}>{item.pf_file_label}</Text>

                {item.pf_creation_date ? (
                  <Text style={{ fontSize: 16, paddingHorizontal: 10, fontFamily: 'Myriad-Regular' }}>
                    {item.pf_creation_date ? item.pf_creation_date : null}
                  </Text>
                ) : null}
              </View>
              <View>
                <Fontisto name="download" size={30} />
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  btnProject: {
    height: "auto",
    width: 320,
    paddingVertical: 10,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#D7AF43",
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: "black",
    alignItems: "center",
  },
  titleText: {
    width: 250,
    fontSize: 16,
    fontFamily: 'Myriad-Regular'
  },
});
