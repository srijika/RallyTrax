import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet } from 'react-native'
import { primaryColor, secondaryColor } from '../constants/Colors';

export default function AuthStackGradientContainer({children}) {
    return (
        <LinearGradient
            colors={[secondaryColor, secondaryColor]}
            start={{ x: 0.0, y: 0.25 }}
            end={{ x: 0.5, y: 1.0 }}
            style={styles.centeredView}
        >
            
            {children}

        </LinearGradient>
    )
}



const styles = StyleSheet.create({
    centeredView: {
      //  flex: 1,
        borderBottomLeftRadius:30,
        borderBottomRightRadius: 30,
      
    },
});
