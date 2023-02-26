import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Image, Text, View } from "react-native";
import Login from "./../screens/Login";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import Welcome from "../screens/Welcome";
import * as React from "react";
import DrawerContent from "../root/Drawer";
import * as Notifications from "expo-notifications";
import { Colors } from "../Styles/styles";
import CityGuide from "../screens/CityGuide";
import Projects from "../screens/Projects";
import Calendar from "../screens/Calendar";
import Project from "../screens/Project";
import ProjectFiles from "../screens/ProjectFiles";
import Contacts from "../screens/Contacts";
import { useContext, useState, useEffect } from "react";
import Loading from "../screens/Loading";
import SessionContext from "../context/SessionContext";
import SingleNewsScreen from "../screens/SingleNewsScreen";
import AllNews from "../screens/AllNews";
import HotelsList from "../screens/HotelsList";
import SubCategories from "../screens/SubCategories";
import terriblelisbon from "../assets/images/t_lisbon.png";
import terribleGuys from "../assets/images/t_guys_h.png";
import { Dimensions, PixelRatio } from "react-native";
import { useNotifications } from "../components/useNotifications";
import messaging from '@react-native-firebase/messaging';
import { useFonts } from "expo-font";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerStack({ navigation }) {
  const { isLoading, isLoggedIn } = useContext(SessionContext);
  const { width, height } = Dimensions.get("window");
  const [fontsLoaded] = useFonts({
    "Myriad-Regular": require("../assets/fonts/MYRIADPRO-REGULAR.otf"),
    "Myriad-Bold": require("../assets/fonts/MYRIADPRO-BOLD.otf"),
  });

  const wp = number => {
    let givenWidth = typeof number === "number" ? number : parseFloat(number);
    return PixelRatio.roundToNearestPixel((width * givenWidth) / 100);
  };

  const hp = number => {
    let givenHeight = typeof number === "number" ? number : parseFloat(number);
    return PixelRatio.roundToNearestPixel((height * givenHeight) / 100);
  };
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        drawerActiveBackgroundColor: "black",
        drawerActiveTintColor: "#D7AF43",
        drawerInactiveTintColor: Colors.black,
        drawerLabelStyle: {
          fontSize: 20,
        },
      }}
      drawerContent={props => (
        <DrawerContent navigation={navigation} {...props} />
      )}
    >
      {isLoggedIn && (
        <>
          <Drawer.Screen
            name="Films"
            component={Welcome}
            options={{
              drawerLabelStyle:{fontFamily: 'Myriad-Bold', fontSize: 18},
              // drawerIcon: ({ color }) => (
              //   <Ionicons name="home-outline" size={22} color={color} />
              // ),
              headerTitle: () => {
                return (
                  <Image
                    source={terribleGuys}
                    style={{ width: wp("70%"), height: hp("10%") }}
                  />
                );
              },
              headerStyle: {
                backgroundColor: "#D7AF43",
                height: hp("20%"),
              },
            }}
          />
          <Drawer.Screen
            name="City Guide"
            component={CityGuide}
            
            options={{
              drawerLabelStyle:{fontFamily: 'Myriad-Bold', fontSize: 18},
              // drawerIcon: ({ color }) => (
              //   <FontAwesome name="city" size={22} color={color} />
              // ),
              headerTitle: () => {
                return (
                  <Image
                    source={terriblelisbon}
                    style={{ width: wp("55%"), height: hp("10%") }}
                  />
                );
              },
              headerStyle: {
                backgroundColor: "#D7AF43",
                height: hp("20%"),
              },
            }}
          />
          <Drawer.Screen
            name="Projects"
            component={isLoggedIn ? Projects : Login}
            options={{
              title: "Projects",
              headerShown: true,
              // drawerIcon: ({ color }) => (
              //   <FontAwesome name="project-diagram" size={22} color={color} />
              // ),
             drawerLabelStyle:{fontFamily: 'Myriad-Bold', fontSize: 18},
              headerTitle: () => {
                return (
                  <Image
                    source={terribleGuys}
                    style={{ width: wp("70%"), height: hp("10%") }}
                  />
                );
              },
              headerStyle: {
                backgroundColor: "#D7AF43",
                height: hp("20%"),
                
              },
            }}
          />
          <Drawer.Screen
            name="AllNews"
            component={AllNews}
            options={{
              drawerLabelStyle:{fontFamily: 'Myriad-Bold', fontSize: 18},
              title: "News",
              headerShown: true,
              // drawerIcon: ({ color }) => (
              //   <FontAwesome name="newspaper" size={22} color={color} />
              // ),
              headerTitle: () => {
                return (
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>News</Text>
                );
              },
              headerStyle: {
                backgroundColor: "#D7AF43",
              },
            }}
          />
        </>
      )}
      {!isLoggedIn && (
        <>
          <Drawer.Screen
            name="City Guide"
            component={CityGuide}
            options={{
              // drawerIcon: ({ color }) => (
              //   <FontAwesome name="city" size={22} color={color} />
              // ),
              headerTitle: () => {
                return (
                  <Image
                    source={terriblelisbon}
                    style={{ width: 140, height: 50 }}
                  />
                );
              },
              headerStyle: {
                backgroundColor: "#D7AF43",
              },
            }}
          />
          <Drawer.Screen
            name="Login"
            component={Login}
            options={{
              title: "Login",
              headerShown: false,
              // drawerIcon: ({ color }) => (
              //   <FontAwesome name="sign-in-alt" size={22} color={color} />
              // ),
              headerTitle: () => {
                return <Text>Login</Text>;
              },
              headerStyle: {
                backgroundColor: "#D7AF43",
              },
            }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
}

export default function RootStack() {
  const { isLoading, isLoggedIn } = useContext(SessionContext);
  const { width, height } = Dimensions.get("window");
 const [fontsLoaded] = useFonts({
  "Myriad-Regular": require("../assets/fonts/MYRIADPRO-REGULAR.otf"),
  "Myriad-Bold": require("../assets/fonts/MYRIADPRO-BOLD.otf"),
});


  const wp = number => {
    let givenWidth = typeof number === "number" ? number : parseFloat(number);
    return PixelRatio.roundToNearestPixel((width * givenWidth) / 100);
  };

  const hp = number => {
    let givenHeight = typeof number === "number" ? number : parseFloat(number);
    return PixelRatio.roundToNearestPixel((height * givenHeight) / 100);
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage=>{
      Alert.alert('A new FCM message arrived!')
      console.log(JSON.stringify(remoteMessage))
    });
    return unsubscribe;
   }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoading ? (
          <Stack.Screen
            options={{ headerShown: false }}
            name="Loading"
            component={Loading}
          />
        ) : isLoggedIn ? (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Welcome"
              component={DrawerStack}
            />
            <Stack.Screen
              options={{
                headerShown: true,
                headerTitle: () => {
                  return (
                    <Image
                      source={terribleGuys}
                      style={{ width: wp("70%"), height: hp("10%") }}
                    />
                  );
                },
                headerStyle: {
                  backgroundColor: "#D7AF43",
                  height: hp("20%"),
                },
              }}
              name="Calendar"
              component={Calendar}
            />
            <Stack.Screen
              options={{
                headerShown: true,
                headerTitle: () => {
                  return (
                    <Image
                      source={terribleGuys}
                      style={{ width: wp("70%"), height: hp("10%") }}
                    />
                  );
                },
                headerStyle: {
                  backgroundColor: "#D7AF43",
                  height: hp("20%"),
                },
              }}
              name="Project"
              component={Project}
            />
            <Stack.Screen
              options={{
                headerShown: true,
                headerTitle: () => {
                  return (
                    <Image
                      source={terriblelisbon}
                      style={{ width: wp("55%"), height: hp("10%") }}
                    />
                  );
                },
                headerStyle: {
                  backgroundColor: "#D7AF43",
                  height: hp("20%"),
                },
              }}
              name="SubCategories"
              component={SubCategories}
            />
            <Stack.Screen
              options={{
                headerShown: true,
                headerTitle: () => {
                  return (
                    <Image
                      source={terriblelisbon}
                      style={{ width: wp("55%"), height: hp("10%") }}
                    />
                  );
                },
                headerStyle: {
                  backgroundColor: "#D7AF43",
                  height: hp("20%"),
                },
              }}
              name="HotelsList"
              component={HotelsList}
            />
            <Stack.Screen
              options={{
                headerShown: true,
                headerTitle: () => {
                  return (
                    <Image
                      source={terribleGuys}
                      style={{ width: wp("70%"), height: hp("10%") }}
                    />
                  );
                },
                headerStyle: {
                  backgroundColor: "#D7AF43",
                  height: hp("20%"),
                },
              }}
              name="ProjectFiles"
              component={ProjectFiles}
            />
            <Stack.Screen
              options={{
                headerShown: true,
                headerTitle: () => {
                  return (
                    <Image
                      source={terribleGuys}
                      style={{ width: wp("70%"), height: hp("10%") }}
                    />
                  );
                },
                headerStyle: {
                  backgroundColor: "#D7AF43",
                  height: hp("20%"),
                },
              }}
              name="Contacts"
              component={Contacts}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="SingleNews"
              component={SingleNewsScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{
                headerShown: false,
                headerStyle: {
                  backgroundColor: "#D7AF43",
                },
                headerTitle: () => {
                  return (
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        textDecorationLine: "line-through",
                      }}
                    >
                      Login
                    </Text>
                  );
                },
              }}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Welcome"
              component={DrawerStack}
            />

            <Stack.Screen
              options={{
                headerShown: true,
                headerTitle: () => {
                  return (
                    <Image
                      source={terriblelisbon}
                      style={{ width: wp("55%"), height: hp("10%") }}
                    />
                  );
                },
                headerStyle: {
                  backgroundColor: "#D7AF43",
                  height: hp("20%"),
                },
              }}
              name="SubCategories"
              component={SubCategories}
            />
            <Stack.Screen
              options={{
                headerShown: true,
                headerTitle: () => {
                  return (
                    <Image
                      source={terriblelisbon}
                      style={{ width: wp("55%"), height: hp("10%") }}
                    />
                  );
                },
                headerStyle: {
                  backgroundColor: "#D7AF43",
                  height: hp("20%"),
                },
              }}
              name="HotelsList"
              component={HotelsList}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
