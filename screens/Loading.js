import { useFonts } from 'expo-font';
import React from 'react'
import { View, Text } from 'react-native'

export default function Loading() {
  const [fontsLoaded] = useFonts({
    "Myriad-Regular": require("../assets/fonts/MYRIADPRO-REGULAR.otf"),
    "Myriad-Bold": require("../assets/fonts/MYRIADPRO-BOLD.otf"),
  });
  return (
    <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontFamily: 'Myriad-Bold'}}>Loading...</Text>
    </View>
  )
}
