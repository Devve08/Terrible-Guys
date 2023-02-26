import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/SimpleLineIcons";

export default function Footer() {
  return (
    <View style={{ width: "100%", height: 50 , marginTop: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "50%",
          marginHorizontal: 80,
        }}
      >
        <Icon name="facebook-f" size={25} color={'#D7AF43'} />
        <Icon name="instagram" size={25} color={'#D7AF43'}  />
        <Icon2 name="globe" size={25} color={'#D7AF43'}  />
      </View>
    </View>
  );
}
