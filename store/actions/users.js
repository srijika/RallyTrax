import axios from 'react-native-axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASEURL } from "../../constants/Helper";
export const EDIT_PROFILE = 'EDIT_PROFILE';
export const GET_USER = 'GET_USER';


export const getUser = (user_id) => {
    return async (dispatch, getState) => {

        try {
        const token = getState().auth.token;  
        let userData = await AsyncStorage.getItem('userAuthData');
        let dataUser = JSON.parse(userData);
        let user_id = dataUser?.user?._id;

            const response = await axios.post(`${BASEURL}get-user-detail`,
                
                {
                    user_id: user_id,

                },
                {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                }

                );
    
            let user = response.data.user;

          

            dispatch({ type: GET_USER, user });

        } catch (e) {
            console.log(e);
        }
    };
};


export const editProfile = (profileData) => {
  
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        //const userId = getState().auth.userId;

        const response = await fetch(BASEURL + 'user/updateprofile', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': "application/json",
                'Authorization': 'Bearer ' + token,
            },
            body: profileData,
        });

        const resData = await response.json();

       

        if (!response.ok) {

            throw new Error('something went wrong');
        }

        


        dispatch({ type: EDIT_PROFILE, resData });
        return resData;

    }
}









