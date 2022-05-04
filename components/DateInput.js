import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { addTripInputLabelColor, headerBgColor, primaryColor } from '../constants/Colors';
import DatePicker from 'react-native-datepicker'

const customeDateStyle = {dateInput:{borderWidth: 0, backgroundColor: '#e3e7ed', borderRadius: 15, height: 45, marginTop: 10}}

export default function DateInput(props) {

    const { label, error } = props;

    return (
        <View style={styles.dateInputView}>
            <Text style={styles.dateLabel}> {label} </Text>
            <DatePicker
                style={styles.dateInputStyle}
                customStyles={customeDateStyle}
                mode="date"
                format="MMM DD, YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    dateInputView: {
        flexDirection: "column"
    },
    dateLabel: {
        color: addTripInputLabelColor
    }
    ,
    dateInputStyle: {
        width: 150, fontSize: 16,
    }

})