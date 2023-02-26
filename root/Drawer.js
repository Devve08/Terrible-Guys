import {
    DrawerContentScrollView,
    DrawerItemList,
  } from "@react-navigation/drawer";
  import React, { useContext } from "react";
  
  import { StyleSheet, View, Text, ImageBackground, Image } from "react-native";
  import { Colors } from "../Styles/styles";
  import { StatusBar } from "expo-status-bar";
  import { TouchableOpacity } from "react-native-gesture-handler";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import SessionContext from "../context/SessionContext";
  
  export default function DrawerContent(props) {
    const {
      actions: { Logout },
      isLoggedIn
    } = useContext(SessionContext);
  
    return (
      <View style={{ backgroundColor: '#D7AF43', flex: 1 }}>
        <StatusBar style="dark" />
        <DrawerContentScrollView {...props}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 20,
              
            }}
          >
            <Image
              source={require("../assets/images/t_logo.png")}
              style={{
                width: 170,
                height: 150,
                borderRadius:10,
                marginBottom: 10,
                resizeMode: 'contain'
              }}
            />
          </View>
  
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
       {isLoggedIn?  <View style={{ padding: 20 }}>
          <TouchableOpacity onPress={Logout} style={{ paddingVertical: 15 }}>
            <View style={{ flexDirection: "row" }}>
              {/* <Ionicons name="exit-outline" size={22} color={Colors.darkLight} /> */}
              <Text
                style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold', color: 'black' }}
              >
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>: null}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    logoutSection: {
      paddingLeft: 40,
    },
  });
  