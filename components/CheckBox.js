
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { normalizeFont } from '../constants/Helper'
import {
  StyleSheet,
  Text,
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

const CheckBox = ({ plName }) => {
  const [myPlayers, setMyPlayers] = useState(plName);

  const { id } = myPlayers;
 // console.log("myPlayers", myPlayers);
  const [selected, setSelected] = useState(false);

  const selectCheck=()=>{
setSelected(!selected)
  }
  return (
    <ScrollView>
    
           <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Icon
              size={21}
              color={selected ? "white" : "#d6c9c8"}
              name={selected ? "check-box" : "check-box-outline-blank"}
              onPress={selectCheck}
              
            />
            <Text
              style={{
                paddingLeft: 5,
                color: selected ? "white" : "#d6c9c8",
                fontSize: normalizeFont(16),
                fontWeight: "300",
              }}
              key={id}
            >
                {myPlayers.length ==0?<Text style={{ color:'white' }}>no player foond</Text>:myPlayers.name}
            </Text>
          </View> 
    </ScrollView>
  );
};

export default CheckBox;
