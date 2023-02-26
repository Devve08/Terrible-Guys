import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import RootStack from './root/RootStack';
import SessionProvider from "./context/SessionProvider";

import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const requestUserPermission = async() => {
    const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
  }

  const storeFCMToken = async(token) =>{
    try {
      await AsyncStorage.setItem('fcmToken', token);
    } catch (error) {
      console.log('saving to storage', error)
    }
  }

  useEffect(()=>{
    if(requestUserPermission()){
      messaging().getToken().then(token => {
        storeFCMToken(token)
        console.log('fcm', token)
      })
    }

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, [])
 
  return (
    <SessionProvider>
      <RootStack />
      </SessionProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
