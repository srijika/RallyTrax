import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as eventAction from '../../../store/actions/event'
import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
  Button,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { normalizeFont } from '../../../constants/Helper'
import UserEventDetailScreen from '../UserEventDetailScreen'
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import EventCard from '../../../components/EventCard'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const UserHomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isEvent, setIsEvent] = useState(false);
  const isFocused = useIsFocused();
  const state = useSelector(state => state);
  let events = state?.event?.events;


  const setEventStatus = () => {

    if (events.length > 0) {
      setIsEvent(true)
    }
  }

  useEffect(() => {
    //get listing 
    getData();
    setEventStatus();
  }, [isFocused]);

  const getData = async () => {
    await dispatch(eventAction.getEvents());
  }


  return (


    <View style={styles.wrapper1}>
      <View style={styles.wrapper2}>
        <Image
          style={{ marginTop: -windowHeight / 54.15, }}
          source={require('../../../assets/images/f1.png')} />
        <Icon name="search" size={30} color="white" style={{ position: 'absolute', right: windowWidth / 5, top: windowHeight / 10.8 }} />
      </View>

      <ScrollView style={{ marginTop: windowHeight / 12.5 }}>
        <View style={{ marginTop: windowHeight / 12.5 }}>
          {
            events?.map((item) => {

              return (
                <EventCard
                  key={item._id}
                  data={item}
                  event_name={item.event_name}
                  event_photo={item.event_photo}
                  amount={item.amount}
                  event_detail={item.event_detail}
                  no_of_vacant_seat={item.no_of_vacant_seat} 
                  screenName={"UserEventDetailScreen"}
                />
              )


            })
          }
        </View>



      </ScrollView>
    </View>



  )
}

export default UserHomeScreen;

const styles = StyleSheet.create({
  wrapper1: {
    flex: 1,
    backgroundColor: '#121515',
  },
  wrapper2: {
    position: "absolute",
    zIndex: 1,
    alignItems: 'center',
    borderBottom: 2,
    alignSelf: 'center'


  },
  cardImage: {
    marginTop: windowHeight / 20,
    alignItems: 'center',
  },
  image: {
    width: windowWidth / 2.8,
    height: windowWidth / 2.8,
    borderWidth: 2,
    borderRadius: windowWidth / 30,
  },
  card: {

    flexDirection: 'row',
    backgroundColor: '#232727',
    marginLeft: windowWidth / 36,
    marginRight: windowWidth / 36,
    borderRadius: windowWidth / 30,
    marginBottom: windowHeight / 35
  },
  setText: {
    margin: windowWidth / 110,
    paddingLeft: 10


  }
})