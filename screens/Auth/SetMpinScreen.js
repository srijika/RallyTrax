import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import { AvatarBox } from '../../components/AvatarBox';
import AuthStackGradientContainer from '../../components/AuthStackGradientContainer';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { Button } from 'react-native-elements';
import { primaryColor } from '../../constants/Colors';

export default function SetMpinScreen({ navigation }) {


  return (
    <AuthStackGradientContainer>
      <View style={[styles.avatarView, { marginTop: -100 }]}>
        <AvatarBox />
      </View>

      <View style={{ flex: 0.6 }}>
        <View style={[styles.inputContainer, { marginTop: 20 }]}>
          <Text style={styles.inputLabel}>  Mpin  </Text>
          <OTPInputView
            style={[styles.inputView]}
            pinCount={6}
            codeInputFieldStyle={styles.textBoxDesign}
            secureTextEntry={true}
            onCodeFilled={(code) => {
              handleCode(code)
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}> Confirm Mpin  </Text>
          <OTPInputView
            style={[styles.inputView]}
            pinCount={6}
            codeInputFieldStyle={styles.textBoxDesign}
            secureTextEntry={true}
            onCodeFilled={(code) => {
              handleCode(code)
            }}
          />
        </View>
      </View>

      <View style={{ paddingHorizontal: 40 }}>
        <Button
          onPress={() => { navigation.navigate('ChangePasswordScreen') }}
          title="SET MPIN"
          buttonStyle={{
            backgroundColor: 'white',
            borderRadius: 30,
            padding: 20
          }}
          titleStyle={{ fontWeight: 'bold', color: "#72de75" }}
        />
      </View>

    </AuthStackGradientContainer>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 20, justifyContent: 'center', alignItems: "center"
  },
  inputLabel: {
    fontSize: 20, 
    color: "#ffffff", 
    marginLeft: 10,
    // fontWeight: "bold",
    textTransform: "uppercase"
  },
  inputView: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    color: "black", fontSize: 40, marginTop: -40
  },

  textBoxDesign: {
    height: 60,
    width: 40,
    backgroundColor: "white",
    borderRadius: 10,
    // borderWidth: 0,
    // borderBottomWidth: 2,
    color: primaryColor,
    fontSize: 30
  },

});
