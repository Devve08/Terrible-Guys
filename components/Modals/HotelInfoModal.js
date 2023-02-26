import React from "react";
import Modal from "react-native-modal";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function HotelInfoModal({ modalOpen, closeModal, item }) {
  const openPDF = link => {
    try {
      Linking.openURL(link);
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(item);
  return (
    <Modal
      isVisible={modalOpen}
      onBackdropPress={closeModal}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <View style={styles.container}>
        <ScrollView>
          <Image
            style={{
              width: 150,
              height: 150,
              marginVertical: 20,
              alignSelf: "center",
            }}
            source={{ uri: item.hotel_profile }}
          />
          {item.h_hotel_name && (
            <Text style={styles.hotelName}>{item.h_hotel_name}</Text>
          )}
          {item.h_hotel_city && (
            <Text style={styles.city}>{item.h_hotel_city}</Text>
          )}
          {item.h_hotel_description && (
            <Text style={styles.description}>{item.h_hotel_description}</Text>
          )}
          {item.h_hotel_email && (
            <Text style={styles.email}>{item.h_hotel_email}</Text>
          )}
          {item.h_hotel_phone && (
            <Text style={styles.email}>{item.h_hotel_phone}</Text>
          )}
          {item.h_hotel_website && (
            <Text
              onPress={() => openPDF(item.h_hotel_website)}
              style={styles.website}
            >
              {item.h_hotel_website}
            </Text>
          )}
          {item.h_map_url && (
            <Text
              onPress={() => openPDF(item.h_map_url)}
              style={styles.address}
            >
              {item.h_hotel_address}
            </Text>
          )}
          <View style={styles.socials}>
            <TouchableOpacity>
              <FontAwesome
                onPress={() => openPDF(item.h_instagram_account)}
                size={30}
                name="instagram"
                color={'#D7AF43'}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome
                onPress={() => openPDF(item.h_twitter_account)}
                name="twitter-square"
                size={30}
                color={'#D7AF43'}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome
                onPress={() => openPDF(item.h_facebook_account)}
                name="facebook-official"
                size={30}
                color={'#D7AF43'}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  description: {
    fontSize: 16,
    marginBottom: 40,
    paddingHorizontal: 20,
    textAlign: "center",
    color: 'white'
  },
  email: {
    fontSize: 16,
    marginBottom: 5,
    paddingHorizontal: 10,
    textAlign: "center",
    color: '#D7AF43'
  },
  website: {
    fontSize: 16,
    paddingHorizontal: 10,
    textAlign: "center",
    textDecorationLine: "underline",
    color: '#D7AF43'
  },
  address: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
    textAlign: "center",
    textDecorationLine: "underline",
    color: '#D7AF43'
  },
  hotelName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    paddingHorizontal: 10,
    textAlign: "center",
    color: '#D7AF43'
  },
  city: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    paddingHorizontal: 10,
    textAlign: "center",
    color: '#D7AF43'
  },
  container: {
    width: "100%",
    height: "90%",
    backgroundColor: "#1c1b1b",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  socials: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    width: "50%",
    paddingVertical: 10,
  },
});
