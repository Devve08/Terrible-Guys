import { Platform } from "react-native";
import { useFonts } from "expo-font";

// const [fontsLoaded] = useFonts({
//   "Myriad-Regular": require("../assets/fonts/MYRIADPRO-REGULAR.otf"),
//   "Myriad-Bold": require("../assets/fonts/MYRIADPRO-BOLD.otf"),
// });

// const fontNames = {
//   myriadRegular:
//     Platform.OS == "ios" ? "MYRIADPRO REGULAR" : "MYRIADPRO-REGULAR",
//   myriadBold: Platform.OS == "ios" ? "MYRIADPRO BOLD" : "MYRIADPRO-BOLD",
// };

const getFontFamily = key => {
  switch (key) {
    case "myriad-regular":
      return "Myriad-regular";
    case "myriad-bold":
      return "Myriad-Bold";

    default:
      return "Myriad-Regular";
  }
};

export default getFontFamily;
