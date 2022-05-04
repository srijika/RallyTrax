import React from 'react'
import { StyleSheet, View, Text, Image } from "react-native";
import images from '../constants/Images';

export default function NotificationScreen() {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 30, paddingVertical: 10 }}>
                <Image source={images.logo} style={{ height: 80, width: 80 }} />
                <View style={{ paddingVertical: 5, marginTop:6, paddingRight: 5}}>
                    <Text style={{ color: "white", fontSize: 14, color: 'white', paddingRight: 10 }}>In publishing and graphic design, Lorem ipsum is a placeholder text </Text>
                    <Text style={{ color: "white", fontSize: 12, color: "silver" }}>10 min ago </Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#040404',
    },


});