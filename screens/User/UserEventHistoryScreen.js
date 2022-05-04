import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
//import * as userActions from '../store/actions/users';
import EventCard from "../../components/EventCard";
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
  TouchableOpacityBase,
} from "react-native";
import { normalizeFont } from "../../constants/Helper";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import * as eventAction from '../../store/actions/event';

const UserEventHistoryScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [isLoading, setIsloading] = useState(false);
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const user_data = state?.user?.user;
  const [currentBooking, setCurrentBooking] = useState();
  const [expiredBooking, setExpiredBooking] = useState();
 
  //console.log("user_data",user_data)

  useEffect(() => {
    if(isFocused){
      getMyallEvents();
    }
   

  },[isFocused])

  const getMyallEvents = async() => {
    setIsloading(true)
    const result =  await dispatch(eventAction.getMyallEvents(user_data))

    if(result){
      setCurrentBooking(result[0])
      setExpiredBooking(result[1]);
    
    }

    setIsloading(false)
  }

  return (
    <>
      <View style={styles.wrapper1}>
        <View style={styles.wrapper2}>
          <Image
            style={{ marginTop: -windowHeight / 55.15 }}
            source={require("../../assets/images/f1.png")}
          />
        </View>

        <ScrollView style={{ marginTop: windowHeight / 9.5 }}>
          <View style={{
            minHeight:!currentBooking?.length>0?windowHeight/2.8:10
          }}>
          <Text
            style={{
              color: "white",
              marginTop: windowHeight / 15,
              marginLeft: windowWidth / 30,
              fontSize: normalizeFont(22),
            }}
          >
            Currently Booked
          </Text>
          {currentBooking?.length>0?<Text></Text>:<Text style={{
            color:"white",
            marginLeft: windowWidth / 30,
            fontSize: normalizeFont(14),
            marginTop:20
        }} >No Current Booking!</Text>}
          </View>
          
         
          {
          
            currentBooking?.map((item) => { 
          
            return (

              <EventCard
              key={item._id}
              data={item}
              event_name = {item.events[0].event_name}
              event_photo={item.events[0].event_photo}
              //event_date = {item.events[0].event_date}
              amount={item.booking_amount}
              event_detail={item.events[0].event_detail}
            
            screenName={"UserReseveConfirmScreen"} />
            )
             
            })
          }


     
        <View>
          <Text
            style={{
              color: "white",
              marginTop: windowHeight / 15,
              marginLeft: windowWidth / 30,
              fontSize: normalizeFont(22),
            }}
          >
           Poker run History
          </Text>
          
          {expiredBooking?.length>0?<Text></Text>:<Text style={{
            color:"white",
            marginLeft: windowWidth / 30,
            fontSize: normalizeFont(14),
            marginTop:20
        }} >No Poker History!</Text>}
          </View>
          {
          
          expiredBooking?.map((item) => { 
        
          return (

            <EventCard
            key={item._id}
            data={item}
            event_name = {item.events[0].event_name}
            event_photo={item.events[0].event_photo}
            event_date = {item.events[0].event_date}
            amount={item.booking_amount}
            event_detail={item.events[0].event_detail}
          
          //screenName={"UserReseveConfirmScreen"}
           />
          )
           
          })
        }
        </ScrollView>
      </View>
    </>
  );
};

export default UserEventHistoryScreen;

const styles = StyleSheet.create({
  wrapper1: {
    flex: 1,
    backgroundColor: "#121515",
  },
  wrapper2: {
    position: "absolute",
    zIndex: 1,
    alignItems: "center",
    borderBottom: 2,
    alignSelf: "center",
  },
  //   cardImage:{
  //     marginTop:windowHeight/20,
  //     alignItems: 'center',
  //   },
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
    marginBottom: windowHeight / 35,
  },
  setText: {
    margin: windowWidth / 110,
    paddingLeft: 10,
  },
  dateCard: {
    backgroundColor: "#3c4343",
    padding: 6,
    borderRadius: 10,
    position: "absolute",
    right: windowWidth / 25,
    bottom: windowHeight / 6,
  },
});
