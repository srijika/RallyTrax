import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import {buttonColor, secondaryColor} from '../../constants/Colors'
import * as Animatable from 'react-native-animatable';

export default function RegistrationScreen({navigation}) {



    return (
      
            <View style={styles.centeredView}>
               
                <View style={styles.topBox}>
                   
                    <Image style={{ flex: 1 }} source={require('../../assets/images/reg_log.png')} />
                   
                </View>
             

                <Animatable.View animation="fadeInUp" style={styles.footerBox}>
                    <TouchableOpacity style={styles.signUpButton} onPress={() => { navigation.navigate('RegisterScreen') }}>
                        <Text style={[styles.buttonText, { color: "white" }]}> Sign Up </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.loginButton} onPress={() => { navigation.navigate('LoginScreen') }}>
                        <Text style={[styles.buttonText, { color: "white" }]}> Log In </Text>
                    </TouchableOpacity>
                </Animatable.View>
            </View>
     
    );
};



const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor: "silver",
    },
    topBox: {
        flex:  1 , 
        backgroundColor: secondaryColor,
        alignItems: 'center', 
        height: 20, width: 20, 
        zIndex: 1000,
        padding: 100
    },
    mainHeading: {
        fontSize: 70, 
        textTransform: "uppercase", 
        fontWeight: "700", 
        color: "grey"
    },
    childHeading: {
        fontSize: 30,
        fontWeight: "700", 
        color: "grey"
    },
    footerBox: {
        flex: 0.3, 
        backgroundColor: secondaryColor, 
        paddingHorizontal: 40
    },
    signUpButton: {
        borderRadius: 50, 
        padding: 20, 
        backgroundColor: buttonColor, 
        marginTop: -26
    },
    loginButton: {
        borderRadius: 50, 
        backgroundColor: buttonColor, 
        padding: 20, 
        marginTop: 15,
        fontWeight:'700',
        
    },
    buttonText: {
        textAlign: "center", 
        fontSize: 16, 
        fontWeight: "bold"
    },common: {

        color: '#ffffff',
        paddingTop: 20,
      },
      tinyLogo: {
    
        flexDirection: 'row',
        marginTop: 15,
    
      },
      bottomButton: {
    
        backgroundColor: buttonColor,
        justifyContent: 'center',
    
        width: "112%",
        height: 80
    
      }

});