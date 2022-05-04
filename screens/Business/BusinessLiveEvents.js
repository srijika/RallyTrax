import React from 'react'
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
import { normalizeFont } from '../../constants/Helper'
import EventCard from '../../components/EventCard'
import { useNavigation } from '@react-navigation/native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BusinessLiveEvents = ({ allevents }) => {
  const navigation = useNavigation();
 
  return (
    <>

      <View style={styles.wrapper1}>
       
        <View style={styles.wrapper2}>
          <Image
            style={{ marginTop: -windowHeight / 55.15, }}
            source={require('../../assets/images/f1.png')} />
          {/* <Icon onPress={() => {
                  navigation.navigate('EventDetailScreen');
                }} name="search" size={30} color="white" style={{ position:'absolute',right:windowWidth/5,top:windowHeight/10.8}} /> */}
        </View>

        <ScrollView style={{ marginTop: windowHeight / 9.5 }}>
          
          <View style={{ marginTop: windowHeight / 10 }}>
            <Text style={{ color: 'white', marginLeft: windowWidth / 30, fontSize: normalizeFont(20) }}>Live Events</Text>
          </View>
          
          {
             allevents.map((item) => {
             
              return(
                
                <EventCard 
                screenName={"BusinessEventDetails"}
                key={item._id}
                data={item}
                event_name={item.event_name}
                event_photo={item.event_photo}
                amount={item.amount}
                event_detail={item.event_detail}
                no_of_vacant_seat={item.no_of_vacant_seat}
              />
              )
            
             
            })
          }






        </ScrollView>
        <View style={styles.plusIcon}>
          <TouchableOpacity onPress={() => navigation.navigate('BusinessPokerRun')}>
            <Icon name="plus" size={50} color="white" />

          </TouchableOpacity>

        </View>

      </View>

    </>

  )
}

export default BusinessLiveEvents;

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

  image: {
    width: windowWidth / 2.8,
    height: windowWidth / 2.8,
    borderWidth: 2,
    borderRadius: windowWidth / 30,
  },
  card: {

    flexDirection: 'row',
    backgroundColor: '#232727',
    marginLeft: windowWidth / 30,
    marginRight: windowWidth / 30,
    borderRadius: windowWidth / 30,
    marginBottom: windowHeight / 35
  },
  setText: {
    margin: windowWidth / 110,
    paddingLeft: 10


  },
  plusIcon: {
    justifyContent: 'center', alignItems: 'center', position: 'absolute', right: windowWidth / 20, bottom: windowHeight / 20, width: 80, height: 80, borderRadius: 40, backgroundColor: '#232727',
  }
})