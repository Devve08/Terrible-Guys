import { useFonts } from "expo-font";
import React, { useEffect, useContext, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/Fontisto";
import SessionContext from "../context/SessionContext";
import { Colors } from "../Styles/styles";

export default function Contacts(props) {
  let project_id = props.route.params.project_id;
  const { getListOfContacts } = useContext(SessionContext);
  const { isLoading, setIsLoading } = useState(false);
  const { error, setError } = useState(false);
  const [contacts, setContacts] = useState([]);
  const [fontsLoaded] = useFonts({
    "Myriad-Regular": require("../assets/fonts/MYRIADPRO-REGULAR.otf"),
    "Myriad-Bold": require("../assets/fonts/MYRIADPRO-BOLD.otf"),
  });
  useEffect(() => {
    (async () => {
      let res = await getListOfContacts(project_id);
      setContacts(res.contact_array);
    })();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Project Contacts</Text>
      <View>
        <FlatList
          keyExtractor={(item, index) => index}
          data={contacts}
          renderItem={({ item }) => (
            <View style={styles.btnProject}>
              <View>
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-start" }}
                >
                  <Text style={styles.titleText}>{item.pc_first_name}</Text>
                  <Text style={styles.titleText}>{item.pc_last_name}</Text>
                </View>

                <Text
                  style={{
                    fontSize: 16,
                    paddingHorizontal: 10,
                    fontFamily: "Myriad-Regular",
                  }}
                >
                  {item.pc_occupation}
                </Text>
              </View>
              <View style={styles.iconsContainer}>
                <TouchableOpacity
                  onPress={() => Linking.openURL(`mailto:${item.pc_email}`)}
                  style={{ marginRight: 20 }}
                >
                  <Icon name="email" size={25} color={"black"} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => Linking.openURL(`tel:${item.pc_mobile}`)}
                >
                  <Icon name="phone" size={23} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnProject: {
    backgroundColor: "#D7AF43",
    width: "80%",
    height: 60,
    marginHorizontal: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    paddingHorizontal: 5,
  },
  container: {
    backgroundColor: "black",
    height: "100%",
    width: "100%",
  },
  titleText: {
    fontSize: 17,
    fontFamily: "Myriad-Regular",
    paddingHorizontal: 3,
  },
  title: {
    borderTopColor: "#000000",
    borderBottomColor: "#000000",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 10,
    fontFamily: "Myriad-Bold",
    textAlign: "center",
    width: "100%",
    marginBottom: 20,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
