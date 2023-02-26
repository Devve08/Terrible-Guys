import React, { useEffect, useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";

import { Octicons, Ionicons, Fontisto } from "@expo/vector-icons";
import KeyboardAvoidingWrapper from "../Styles/KeyboardAvoidingWrapper";

import { View, Image, KeyboardAvoidingView, ScrollView, Text } from "react-native";
import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  RightIcon,
  StyledTextInput,
  StyledButton,
  ButtonText,
  StyledInputLabel,
  Colors,
  MsgBox,
} from "../Styles/styles";

import SessionContext from "../context/SessionContext";
import logo from "../assets/images/t_logo.png";



export default function Login({ navigation }) {
  const [hidePassword, setHidePassword] = useState(true);
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const {
    actions: { Login },
    error,
  } = useContext(SessionContext);

  return (
    <KeyboardAvoidingView
      style={{ backgroundColor: "#D7AF43", height: "100%" }}
    >
      <ScrollView style={{ backgroundColor: "#D7AF43", height: "100%" }}>
        <View style={{ backgroundColor: "#D7AF43", height: "100%" }}>
          <StatusBar style="dark" />
          <InnerContainer>
            <Image
              style={{ width: 250, height: 200, resizeMode: "contain" }}
              source={logo}
            />
            <SubTitle>Account Login</SubTitle>

            <StyledFormArea>
              <MyTextInput
                label={"I'M TERRIBLE TOO:"}
                icon="U:"
                placeholderTextColor={"grey"}
                onChangeText={text => setUserName(text)}
                keyBoardType="email-address"
              />

              <MyTextInput
                icon="L:"
                placeholderTextColor={"grey"}
                onChangeText={text => setPassword(text)}
                secureTextEntry={hidePassword}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
                isPassword={true}
              />
              {error && <MsgBox>Something went wrong, try again!</MsgBox>}
              <StyledButton onPress={() => Login(username, password)}>
                <ButtonText>Login</ButtonText>
              </StyledButton>

              <StyledButton
                google={true}
                onPress={() => navigation.replace("Welcome")}
              >
                <ButtonText>Skip</ButtonText>
              </StyledButton>
            
              
            </StyledFormArea>
            <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 50 }} >WELCOME. WHERE TO GO?</Text>
          </InnerContainer>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const MyTextInput = ({
  icon,
  label,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Text style={{color: "#D7AF43", fontWeight: "bold"}}>{icon}</Text>
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "md-eye-off" : "md-eye"}
            size={30}
            color={'#D7AF43'}
          />
        </RightIcon>
      )}
    </View>
  );
};
