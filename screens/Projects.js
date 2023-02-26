import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useState, useEffect } from "react";
import defaultImage from "../assets/images/project.png"
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  ImageBackground
} from "react-native";
import SessionContext from "../context/SessionContext";
import Entypo from "react-native-vector-icons/Entypo"
import { Colors } from "../Styles/styles";

export default function Projects({ navigation }) {
  const { projectsList, getProjectsList } = useContext(SessionContext);
  const [view, setView] = useState(0)

  useEffect(() => {
    getProjectsList()
    console.log('projects', projectsList)
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
      <Pressable style={styles.tab} onPress={()=>setView(0)}>
        <Entypo name="list" color={view === 0 ? Colors.primary : 'white'} size={40} />
      </Pressable>
        <Pressable style={styles.tab}  onPress={()=>setView(1)}>
        <Entypo name="grid" color={view === 1 ? Colors.primary : 'white'} size={40} />
      </Pressable>
      </View> 
      {view === 0 ? projectsList && (
        <FlatList
          keyExtractor={(item, index) => index}
          data={projectsList.projects_array}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Calendar", { pp_id: item.pp_id })
              }
              style={styles.btnProject}
            >
              <Text style={styles.titleText}>{item.pp_project_label}</Text>
              <Text style={{ fontSize: 16, paddingHorizontal: 10 }}>
                {item.pp_project_description}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <FlatList
          key={"_"}
          keyExtractor={(item, _index) => _index}
          numColumns={2}
          data={projectsList.projects_array}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Calendar", { pp_id: item.pp_id })
              }
              style={styles.thumbnail}
            >
              <ImageBackground source={{uri: item.project_img_logo}} style={{ width: "100%", height: "100%" }}>
                <LinearGradient
                  colors={["#00000000", "#000011"]}
                  style={styles.linear}
                >
                  <View
                    style={styles.textView}
                  >
                    <View>
                      <Text
                        style={{ color: '#D7AF43', fontSize: 18, fontWeight: "bold" }}
                      >
                        {item.pp_project_label}
                      </Text>

                    </View>
                  </View>
                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>
          )} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  btnProject: {
    
    width: "100%",
    height: 70,
    marginVertical:10 ,
    justifyContent: "center",
    backgroundColor: '#D7AF43'
  },
  container: {
    paddingTop: 20,
    backgroundColor: 'black',
    height: "100%",
    width: "100%",
  },
  titleText: {
    fontSize: 17,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  linear: {
    height: "100%",
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  icon: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 3,
    marginHorizontal: 5,
  },
  textView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 10,
  },
  thumbnail: {
    width: 180,
    height: 200,
    paddingHorizontal: 20
  },
  tabs:{ 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    paddingHorizontal: 20,
    marginBottom:20,
    paddingVertical: 10
  },
  tab:{
    alignItems: "center",
    justifyContent: "center",
    width: "50%"
  }
});
