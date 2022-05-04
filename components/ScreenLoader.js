import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

export default function ScreenLoader() {
    return (
        <View style={styles.loading}>
            <ActivityIndicator size={"large"} />
        </View>
    )
}


const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 10,
        opacity: 0.3,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    }
})