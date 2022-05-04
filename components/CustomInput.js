import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { addTripInputLabelColor, headerBgColor, primaryColor } from '../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5'
import RNElementInput from './RNElementInput';


export default function CustomInput(props) {

    const { label, icon, placeholder, error, number, multiline, dynamic_height } = props;

    return (
        <View>
            <Text style={{ color: addTripInputLabelColor }}> {label} </Text>
            <View style={styles.inputContainer}>

                <Icon style={styles.icon} name={icon} size={20} color="#373839" />
                <TextInput
                    keyboardType={number}
                    style={[styles.input, { paddingLeft: icon ? 40 : 20, height: dynamic_height ? dynamic_height : 45 , textAlignVertical: 'top' }]}
                    // style={{ height:200, textAlignVertical: 'top',}}
                    placeholder={placeholder}
                    multiline={multiline}
                    numberOfLines={5}
                />
            </View>
            <Text style={styles.errMsg}> {error} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headContainer: {
        backgroundColor: headerBgColor, flexDirection: 'row', justifyContent: 'space-between', borderColor: primaryColor, borderWidth: 0, shadowOpacity: 0, elevation: 0,
    },
    inputContainer: {
        justifyContent: 'center',
        backgroundColor: '#e3e7ed',
        borderRadius: 15,
    },
    input: {
        fontSize: 16, 
    },
    icon: {
        position: 'absolute',
        left: 10,
        padding: 4
    },
    errMsg: {
        color: 'red'
    }
})