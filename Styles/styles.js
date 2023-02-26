import styled from "styled-components";
import { View, Image, Text, TextInput, TouchableOpacity } from "react-native";




//colors 
export const Colors = {
    primary : '#f7ba00',
    secondary: '#272727',
    light : '#edf5e1',
    darkLight: '#272727',
    orange: '#ff8450',
    white: "#FFFFFF",
    black: "#000000",
    lightGrey: "#d5d5d5"
}

const { primary, secondary, light, darkLight, white, black} = Colors;


export const Container = styled.View`
    flex: 1;
    height: 100%;
    padding: 20px 20px;
    background-color: black;
    justify-content: space-between
`
export const StyledContainer = styled.View`
    padding: 40px 25px;
    paddingBottom: 60px;
    background-color: black;
    height: 100%
`

export const RowSpaceContainer = styled.View`
     flex-direction: row;
     align-items: center;
     justify-content: space-between ;
`

export const InnerContainer = styled.View`
    width: 100%;
    align-items: center;
    height: 100%;
   
`

export const PageLogo = styled.Image`
    width: 200px;
    height: 200px;
`

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${primary};
    padding: 10px;
`

export const SubTitle = styled.Text`
    font-size: 15px;
    margin-bottom: 40px;
    margin-top: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: black;
`

export const StyledFormArea = styled.View`
    width: 90%;
`

export const StyledTextInput = styled.TextInput`
    background-color : black;
    padding: 15px 55px;
    border-radius: 5px;
    font-size: 16px;
    height: 50px;
    margin-bottom: 10px;
    color: #D7AF43;
`

export const StyledInputLabel = styled.Text`
    color: black;
    font-size: 13px;
    text-align: left;
`

export const LeftIcon = styled.View`
    left: 15px;
    top:30px;
    position: absolute;
    z-index: 1;
`

export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top:30px;
    position: absolute;
    z-index: 1;
`

export const StyledButton = styled.TouchableOpacity`
    padding: 10px;
    background-color: black;
    justify-content: center;
    border-radius: 5px;
    height: 50px;
    align-items: center;
    margin-top: 30px;
   
`

export const ButtonText = styled.Text`
    color: #D7AF43;
    font-weight: bold;
    font-size: 17px;
    ${(props)=> props.google == true ? `
    padding-left: 25px;
    ` : ''}

`

export const MsgBox = styled.Text`
    text-align: center;
    font-size: 13px;
    color: red;
`

export const Line= styled.View`
    height: 1px;
    width: 100%;
    background-color: ${light};
   
`

export const ExtraView= styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
`

export const ExtraText= styled.Text`
    justify-content: center;
    align-items: center;
    color: ${darkLight};
    font-size: 15px;
`

export const TextLink = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;

`

export const TextLinkContent = styled.Text`
    color: ${primary};
    font-size: 15px;
    font-weight : bold;
    padding: 5px;
`