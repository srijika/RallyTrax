import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as eventAction from '../../store/actions/event'
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
import { useNavigation } from '@react-navigation/native';
//import BusinessPoketDetails from '../BusinessPoketDetails'
import BusinessLiveEvents from './BusinessLiveEvents'
import { useIsFocused } from '@react-navigation/native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function BussinessHomeScreen(props) {
    const dispatch = useDispatch();
    const styles = props.design;
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
        await dispatch(eventAction.getEventsByBusiness());
    }


    const navigation = useNavigation();
    return (
        <>
            {
                events && events.length > 0 ? <BusinessLiveEvents allevents={events} />
                    :
                    <View style={styles.wrapper1}>
                        <View style={styles.wrapper2}>
                            <Image style={{ marginTop: -windowHeight / 55.15 }} source={require('../../assets/images/f1.png')} />
                        </View>
                        <View style={styles.imageIcon}>
                            <TouchableOpacity onPress={() => navigation.navigate('BusinessPokerRun')}>
                                <Icon style={[styles.icon, { marginTop: windowHeight / 13.66 }]} name="plus" size={windowHeight / 5.69} color="#232727" />
                            </TouchableOpacity>
                            <Text style={{ color: '#7a7c7c', marginBottom: windowHeight / 17.085, fontSize: normalizeFont(25) }}>Create a poker fun</Text>
                        </View>
                    </View>
            }


        </>
    )
}

