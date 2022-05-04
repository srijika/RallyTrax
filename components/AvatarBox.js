import React from 'react'
import { View, StyleSheet, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import images from '../constants/Images';
export const AvatarBox = () => {
    return (
        <View style={styles.avatarBox} >
            {/* <Icon name="user" style={styles.icon} /> */}
            <Image source={images.logo} style={{ height: 120, width: 120 }} />
        </View>
    )
}

const styles = StyleSheet.create({
   
    avatarBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 20
    },
    icon: {
        fontSize: 60, color: "white", backgroundColor: "silver", padding: 20, paddingHorizontal: 30, borderRadius: 60
    }
   
});