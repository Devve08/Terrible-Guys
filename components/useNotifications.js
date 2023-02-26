import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useContext } from "react";
import SessionContext from "../context/SessionContext";

export const useNotifications = () => {
  const { session, pushNotification } = useContext(SessionContext);
  async function registerForPushNotificationsAsync(id) {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;

      if (id) {
        pushNotification(id, token);
      }
      console.log("tokenss", id);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  const handleNotification = noti => {};

  const handleNotificationResponse = noti => {
    console.log("noti", noti);
  };

  return {
    registerForPushNotificationsAsync,
    handleNotification,
    handleNotificationResponse,
  };
};
