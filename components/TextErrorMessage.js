import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default function TextErrorMessage({ error,customMarignLeft }) {

    const CapitalizeFirstLetter = (str) => {
        return str?.length ? str.charAt(0).toUpperCase() + str.slice(1) : str
    }

    return (
        <Text style={[styles.errMsg, { paddingLeft: customMarignLeft ? customMarignLeft : 20   }]} > {CapitalizeFirstLetter(error)}  </Text>
    )
}

const styles = StyleSheet.create({
    errMsg: {
        color: 'red',  marginTop: -10
    }
})