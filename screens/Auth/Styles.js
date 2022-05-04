import { StyleSheet } from "react-native"
import { primaryColor, secondaryColor } from "../../constants/Colors"
import { Dimensions, PixelRatio, Platform } from "react-native";

const WindowWidth = Dimensions.get('window').width;
const WindowHeight = Dimensions.get('window').height;
//console.log("WindowWidth--",WindowWidth);
export default StyleSheet.create({
    input: {
      padding:WindowHeight/50,
        margin: WindowHeight/70,
        borderRadius: 10,
        backgroundColor: '#761D1D' ,
        paddingLeft: WindowWidth/9.85,
        marginTop: WindowHeight/142,
        color: "#ffffff",
        fontWeight: "bold",
        width:'90%',
    },
    textInputLabel: {
        color: "#ffffff", 
        marginLeft: 10,
        fontWeight: "bold",
        marginTop: 5, 
        marginLeft: 20
    },
})