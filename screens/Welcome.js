
import React, { useState, useContext } from "react";
import { ScrollView, View } from "react-native";
import Footer from "../components/Footer/Footer";
import CityGuideList from "../components/Home/CityGuideList";
import News from "../components/Home/News";
import RecentWork from "../components/Home/RecentWork";
import SessionContext from "../context/SessionContext";
import { Container } from "../Styles/styles";
import CityGuide from "./CityGuide";
import Loading from "./Loading";

export default function Welcome({ navigation }) {

const {isLoading, isLoggedIn} = useContext(SessionContext)
  return (
    
      
        <Container >
          
          {isLoggedIn? (
            <ScrollView >
            <RecentWork navigation={navigation} />
            <CityGuideList navigation={navigation} />
            <News navigation= {navigation} />
            <Footer />
            </ScrollView>
          ): 
          <CityGuide navigation={navigation} />
           }
            
        </Container>
      
    
  );
}
