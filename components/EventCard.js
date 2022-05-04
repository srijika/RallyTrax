import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
  Button,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { normalizeFont } from "../constants/Helper";
//import EventDetailScreen from '../EventDetailScreen'
import { useNavigation } from "@react-navigation/native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const EventCard = (props) => {
  const event_photo = props?.event_photo
    ? { uri: props.event_photo }
    : require("../assets/images/card.jpeg");

  const navigation = useNavigation();
  return (
    <>
      {props.screenName ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(props.screenName, {
              data: props.data,
            });
          }}
        >
          <View style={[styles.card, { marginTop: windowHeight / 35 }]}>
            <Image
              style={styles.image}
              source={event_photo}
              resizeMode={"cover"}
            />

            <View style={[styles.setText, { width: windowWidth*6/10 }]}>
                {props?.event_date?
              <View style={styles.dateCard}>                  
                <Text style={{ color: "white", fontSize: normalizeFont(11) }}>
                 {props.event_date}
                </Text>
              </View>:<Text></Text>
                }
              {props?.event_name?<Text
                style={{
                  color: "white",
                  fontSize: normalizeFont(20),
                  paddingVertical: 3,
                }}
              >
                {props.event_name}
              </Text>:<Text></Text>
              
              }
           
              {props.amount?<Text
                style={{
                  color: "white",
                  fontSize: normalizeFont(15),
                  paddingVertical: 3,
                }}
              >
                Buy in:${props.amount}
              </Text>:<Text></Text>
                }
              {props.event_detail?<Text
                numberOfLines={2}
                style={{ color: "white", fontSize: normalizeFont(13), width:windowWidth/2 }}
              >
                {props.event_detail}
              </Text>:<Text></Text>
            }

            {props.no_of_vacant_seat?  <Text
                style={{
                  color: "white",
                  paddingVertical: 5,
                  fontSize: normalizeFont(13),
                }}
              >
                Vacant seats: {props.no_of_vacant_seat}
              </Text>
              :<Text></Text>
            }
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={[styles.card, { marginTop: windowHeight / 35 }]}>
          <Image
            style={styles.image}
            source={event_photo}
            resizeMode={"cover"}
          />

          <View style={[styles.setText, { width: windowWidth*6/10 }]}>
          {props?.event_date?
              <View style={styles.dateCard}>                  
                <Text style={{ color: "white", fontSize: normalizeFont(11) }}>
                 {props.event_date}
                </Text>
              </View>:<Text></Text>
                }
            <Text
              style={{
                color: "white",
                fontSize: normalizeFont(20),
                paddingVertical: 3,
              }}
            >
              {props.event_name}
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: normalizeFont(15),
                paddingVertical: 3,
              }}
            >
              Buy in:${props.amount}
            </Text>
            <Text
              numberOfLines={2}
              style={{ color: "white", fontSize: normalizeFont(13) }}
            >
              {props.event_detail}
            </Text>

            {
            props.no_of_vacant_seat? <Text
              style={{
                color: "white",
                paddingVertical: 5,
                fontSize: normalizeFont(13),
              }}
            >
              Vacant seats: {props.no_of_vacant_seat}
            </Text> : <Text></Text>
            }
          </View>
        </View>
      )}
    </>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  image: {
    width: windowWidth / 2.8,
    height: windowWidth / 2.8,
    borderWidth: 2,
    borderRadius: windowWidth / 30,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#232727",
    marginLeft: windowWidth / 30,
    marginRight: windowWidth / 30,
    borderRadius: windowWidth / 30,
    marginBottom: windowHeight / 200,
  },
  setText: {
    margin: windowWidth / 110,
    paddingLeft: 10,
  },
  plusIcon: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: windowWidth / 20,
    bottom: windowHeight / 20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#232727",
  },
  dateCard:{
    width:windowWidth*1/3.9,  backgroundColor:'#3c4343',padding:6,borderRadius:20,position:'absolute',right: windowWidth/25,bottom:windowHeight/6.6
    }
});
