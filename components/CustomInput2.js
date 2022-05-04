import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { addTripInputLabelColor, headerBgColor, primaryColor } from '../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5'
import RNElementInput from './RNElementInput';
import { CheckBox, Input, Button, } from 'react-native-elements'

const dropDownIcon = <Icon name='caret-down' size={24} color='silver' />


export default function CustomInput2(props) {

    const { onBlur, onChange, value, placeholder, error, label } = props;

    return (
        <Input
            label={label}
            placeholder={placeholder}
            rightIcon={dropDownIcon}
            labelStyle={styles.inputLabelStyle}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorStyle={styles.errorStyle}
        />
    )
}

const styles = StyleSheet.create({
    inputLabelStyle: { padding: 1, fontSize: 14, color: "silver" },
    inputContainerStyle: { borderBottomWidth: 0, padding: 0, backgroundColor: "#e3e7ed", borderRadius: 15, padding: 8, },
    inputStyle: { paddingLeft: 10 },
    dateInputsContainer: { flexDirection: 'row', paddingHorizontal: 5, justifyContent: 'space-between' },
    toggleSwitchView: {
        marginTop: 10, flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 4
    },
    radioView: {
        marginTop: -10, flexDirection: 'row', paddingHorizontal: 4
    },
    multipleInputView: { justifyContent: 'center', flexDirection: "row", alignItems: 'center' }, 
    errorStyle: { color: 'red' }
})