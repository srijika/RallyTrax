import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

export const SplashScreen = () => {
    return (
        <Image style={{height: 750 }} source={require('../../assets/images/splash.png')} />   
    )
}
