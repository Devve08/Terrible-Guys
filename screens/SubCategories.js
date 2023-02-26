import { useFonts } from 'expo-font';
import React, {useContext, useEffect, useState} from 'react'
import { Text, FlatList, TouchableOpacity, Image, StyleSheet, View } from 'react-native'
import SessionContext from '../context/SessionContext';

export default function SubCategories({navigation, route}) {
  const [subCategories, setSubCategories] = useState([])
  const { getCategoriesList, getListPlaces } = useContext(SessionContext);
  const categories = route.params.subCategories
  const [fontsLoaded] = useFonts({
    "Myriad-Regular": require("../assets/fonts/MYRIADPRO-REGULAR.otf"),
    "Myriad-Bold": require("../assets/fonts/MYRIADPRO-BOLD.otf"),
  });

  const getCatInfo = async (id, hotelName) => {
    console.log('lskadklslkj')
    let res = await getListPlaces(id)
    navigation.navigate('HotelsList', {hotels: res.hotels_array, hotelName})
    
  }

  

  return (
    <View style={styles.container}>
        {categories.length > 0 ? <FlatList 
        style={{width: '100%'}}
        data={categories}
        keyExtractor={(item, _index)=> _index}
        renderItem={({item, index})=> (
            <TouchableOpacity onPress={()=>getCatInfo(item.pv_id, item.pv_category_title)}  key={index} style={styles.newsContainer}>
                <Image style={styles.image} source={{uri: item.pv_profile}} />
                <Text style={{fontSize: 16, fontFamily: 'Myriad-Bold'}}>{item.pv_category_title}</Text>
            </TouchableOpacity>
        )}
        /> : <Text style={{paddingHorizontal: 20, textAlign: 'center'}}>There are no available places in this category at the moment</Text>}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      flex: 1,
      backgroundColor: 'black'
  },
  newsContainer: {
      backgroundColor: '#D7AF43', 
      height: 75, width: '100%', 
      marginVertical: 10,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingLeft: 20,
  },
  image: {
      width: 50,
      height: 50,
      marginRight: 20,

  }
})