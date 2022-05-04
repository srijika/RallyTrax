import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { Button, Text, Overlay } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import { normalizeFont } from "../../constants/Helper";
import { useNavigation, StackActions } from "@react-navigation/native";
import ArrowBack from "../../components/ArrowBack";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const UserBookingConfirmScreen = ({ route }) => {
  const [visible, setVisible] = useState(false);
  const [icon_name, setIcon_name] = useState(false);
  const bookingNumber = route.params.bookingNumber;
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.wrapper1}>
        <View style={styles.wrapper2}>
          <Image
            style={{ marginTop: -windowHeight / 55.15 }}
            source={require("../../assets/images/f1.png")}
          />
        </View>
        <View style={{ alignItems: "center", marginTop: windowHeight / 6 }}>
          <Icon name={"check-circle"} size={130} color="#5b0b0b" />
          <Text
            style={{
              color: "white",
              fontSize: normalizeFont(20),
              paddingTop: 15,
              fontWeight: "100",
            }}
          >
            Your Seat has been Reserved
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: normalizeFont(20),
              paddingTop: 18,
              fontWeight: "700",
            }}
          >
            Your booking Id
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: normalizeFont(20),
              paddingVertical: 5,
              fontWeight: "700",
            }}
          >
            {bookingNumber}
          </Text>
        </View>
        {
          <TouchableOpacity
            style={[styles.loginButton]}
            onPress={() => {
              navigation.navigate("Setting", {
                screen: "UserEventHistoryScreen",
              });
              navigation.dispatch(
                StackActions.replace('Home', { screen: 'Home' })
            )
            }}
          >
            <Text style={[styles.buttonText, { color: "white" }]}>
              
              Continue
            </Text>
          </TouchableOpacity>
        }
      </View>
    </>
  );
};

export default UserBookingConfirmScreen;

const styles = StyleSheet.create({
  wrapper1: {
    flex: 1,
    backgroundColor: "#232727",
  },
  wrapper2: {
    //  position: "absolute",
    zIndex: 1,
    alignItems: "center",
    borderBottom: 2,
    alignSelf: "center",
  },

  loginButton: {
    width: "95%",
    alignSelf: "center",
    borderRadius: 30,
    backgroundColor: "#5b0b0b",
    padding: windowWidth / 18,
    marginTop: windowHeight / 5.5,
    fontWeight: "700",
  },
  buttonText: {
    textAlign: "center",
    fontSize: normalizeFont(16),
    fontWeight: "700",
  },
});
