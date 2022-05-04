import React from "react";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput } from "react-native";
import UserAvatar from 'react-native-user-avatar';

export default function UnlockScreen() {

    return (
        <View style={styles.centeredView}>
            <View style={styles.topBox}>
                <Text style={styles.mainHeading}> Enter Password </Text>
            </View>

            <View style={styles.avatarBox} >
                <UserAvatar size={100} src="https://uifaces.co/our-content/donated/6MWH9Xi_.jpg" />
            </View>
            <Text style={styles.name}> Abhishek Kuma </Text>
            <Text style={styles.name}> abhishekkumar@gmail.com </Text>

            <View style={{ paddingHorizontal: 20, paddingVertical: 40 }}>

            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "limegreen",
    },
    topBox: {
        paddingTop: 60,
        alignItems: 'center'
    },
    mainHeading: {
        fontSize: 18, fontWeight: "700", color: "white", textAlign: "center"
    },
    avatarBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 20
    },
    name: {
        fontSize: 12, fontWeight: "700", color: "white", textAlign: "center", paddingTop: 6
    },
    input: {
        height: 40,
        margin: 12,
        textAlign: 'center',
        backgroundColor: "lightgreen",
        marginTop: 4,
        color: "white",
    },
    loginButton: {
        borderRadius: 30, backgroundColor: "white", padding: 10, marginTop: 15,
    },
    buttonText: {
        textAlign: "center", fontSize: 16
    },
    link: {
        color: "white", marginLeft: 10, textAlign: "center"
    },
    otpView: {
        width: '80%',
        height: 200,
        color: 'black',
    },
    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
        color: 'black',
        borderBottomColor: '#17BED0',
    },

});