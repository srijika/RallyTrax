export const ADDEVENT = 'ADDEVENT';
export const GETEVENT = 'GETEVENT';
export const ADDEVENTBOOKING = 'ADDEVENTBOOKING';
export const ALLEVENTBOOKING = 'ALLEVENTBOOKING';
export const BUSSINESSBOOKINGHISTORY = 'BUSSINESSBOOKINGHISTORY';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASEURL } from '../../constants/Helper';
import axios from 'axios';
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
    SafeAreaView,
    Button,
    Platform
  
  
  } from 'react-native';

export const addEvent = data => {
    //return false ;


    return async dispatch => {
        let userData = await AsyncStorage.getItem('userAuthData');

        let dataUser = JSON.parse(userData);

        const token = dataUser.token;


        
        const response = await fetch(BASEURL + 'create-live-event', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': "application/json",
                'Authorization': 'Bearer ' + token,
            },
            body: data,
        });

        const resData = await response.json();


        if (!response.ok) {

            throw new Error('something went wrong');
        }





    };
};
export const getEvents = data => {
    //return false ;


    return async dispatch => {


        try {

            const response = await axios.post(`${BASEURL}get-all-live-events`, {})

            if (!response.data.status) {

                throw new Error(response.data.message);

            } else {


                let e = response.data.events;

                dispatch({ type: GETEVENT, events: e });

            }

        } catch (e) {
            console.log('erro --------------', e)
         
        }


    };
};
export const getEventsByBusiness = data => {
    //return false ;


    return async dispatch => {


        try {
            let userData = await AsyncStorage.getItem('userAuthData');

            let dataUser = JSON.parse(userData);

            const token = dataUser.token;
            let user_id = dataUser?.user?._id;

            if (!user_id) {
                user_id = dataUser?.user;
            }

            const response = await axios.post(`${BASEURL}get-all-live-events-by-business`,
                {
                    user_id: user_id,

                },
                {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                }

            )

            if (!response.data.status) {

                throw new Error(response.data.message);

            } else {


                let e = response.data.events;

                dispatch({ type: GETEVENT, events: e });

            }

        } catch (e) {
            console.log('erro --------------', e)
        }


    };
};
export const addEventBooking = data => {
    //return false ;

    
    return async dispatch => {
        try {
            let userData = await AsyncStorage.getItem('userAuthData');

            let dataUser = JSON.parse(userData);

            const token = dataUser.token;
            const response = await axios.post(`${BASEURL}add-user-booking`,
                {
                    data

                },
                {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                }

            )
            

            if (response.data.status == 400) {

                 throw new Error(response.data.message);

            } else {

                let bookingNumber = response.data.bookingNumber;
                dispatch({ type: ADDEVENTBOOKING, bookingNumber:bookingNumber });
                return bookingNumber;
            }

        } catch (e) {
            //console.log('error ', e.message)
            Alert.alert("error", e.message)
        }


    };
};
export const getMyallEvents = data => {
    
    
    return async dispatch => {
        try {
            
            let userData = await AsyncStorage.getItem('userAuthData');

            let dataUser = JSON.parse(userData);
          
            let user_id = dataUser?.user?._id;
            const token = dataUser.token;
            const response = await axios.post(`${BASEURL}get-user-events`,
                {
                    user_id

                },
                {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                }

            )
            

            if (response.data.status == 400) {

                 throw new Error(response.data.message);

            } else {
               let expiredBooking = response.data.expiredBooking;
               let currentBooking = response.data.currentBooking;
               let allBooking = [ currentBooking, expiredBooking ]

             
                              
                dispatch({ type: ALLEVENTBOOKING, allBooking: allBooking });
               
                return allBooking;
            }

        } catch (e) {
            //console.log('error ', e.message)
            Alert.alert("error", e.message)
        }


    };
};
export const getBusinessHistory = data => {
    
    
    return async dispatch => {
        try {
            
            let userData = await AsyncStorage.getItem('userAuthData');

            let dataUser = JSON.parse(userData);
          
            let user_id = dataUser?.user?._id;
            const token = dataUser.token;
            const response = await axios.post(`${BASEURL}get-bussiness-history`,
                {
                    user_id

                },
                {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                }

            )
            

            if (response.data.status == 400) {

                 throw new Error(response.data.message);

            } else {
               let bookingHistory = response.data.bookingHistory;
          
                dispatch({ type: BUSSINESSBOOKINGHISTORY, bookingHistory: bookingHistory });
               
                return bookingHistory;
            }

        } catch (e) {
            //console.log('error ', e.message)
            Alert.alert("error", e.message)
        }


    };
};



// Async storage function
const saveOtpDataStorage = (otp, email = null, type) => {
    //console.log("otpdatastorage is" ,otp,email,type)
    AsyncStorage.setItem('otpData', JSON.stringify({

        otp: otp,
        email: email,
        type: type

    }));

}

const saveUserDataStorage = (token, user) => {
    AsyncStorage.setItem('userAuthData', JSON.stringify({
        token: token,
        user: user
    }));
}

