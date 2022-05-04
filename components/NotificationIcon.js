import React from 'react'
import { View,  StyleSheet } from 'react-native';
import { Avatar, Badge, } from 'react-native-elements';

export default function NotificationIcon({source, bgColor}) {
    return (
        <View style={styles.iconBox}>
            <Avatar
                rounded
                source={source}
                containerStyle={[styles.iconAvatar, { backgroundColor: bgColor }]}
                size={46}
            />
            <Badge
                status="error"
                value={7}
                containerStyle={styles.badgeIcon}
            />
        </View>
    )
}



const styles = StyleSheet.create({
   
    iconBox: {
        marginTop: 20, marginRight: 10
    },
    iconAvatar: {
        padding: 14
    },
    badgeIcon: {
        position: 'absolute', left: 34
    },
})