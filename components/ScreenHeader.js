import React from 'react'
import { View, StyleSheet, Image, Text, Platform } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export const ScreenHeader = (props) => {
    return (
        <View style={styles.avatarBox} >
        
           <Text style={styles.title}>{props.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
   
    avatarBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop:Platform.OS==="ios"?30:0,
        
       
    },
    title:{
        color:'white',
       // fontFamily:'roboto',
        fontSize: 26,
      
      

    }
   
   
});