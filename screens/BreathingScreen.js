import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { primaryColor } from "../helpers/Colors";
// import Triangle from 'react-native-triangle';

// import { SvgCss } from 'react-native-svg';
import SvgImg from '../assets/images/triangles.svg'
// import SvgImg from '../assets/logo.svg' ; 


export default function BreathingScreen() {

    

    return (
        <View style={styles.centeredView}>
            <View style={{ padding: 20}}>
            {/* <Text style={{ fontSize: 30, color: "white"}}> Hiii </Text> */}
                    <View style={{ borderWidth: 3, borderColor : "white", height: 300, width: 300 }}>



                        <SvgImg height={100} width={100} />                   
                    </View>
            </View>
        </View>
    );
};

// export default UserTypeScreen;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: '#356f8c'
    },
    TriangleShapeCSS: {
        width: 0,
        height: 0,
        borderLeftWidth: 146,
        borderRightWidth: 150,
        borderBottomWidth: 240,
        borderStyle: 'solid',
        position: 'absolute',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#00BCD4', 
    } 
});