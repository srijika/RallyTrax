export const RESETPASSWORD = 'RESETPASSWORD';
export const FORGOTPASSWORD = 'FORGOTPASSWORD';
export const SENDOTP = 'SENDOTP';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AUTO_L = 'SET_DID_TRY_AUTO_L';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASEURL } from '../../constants/Helper';
import axios from 'axios';
export const setDidTryAL = () => {
    return { type: SET_DID_TRY_AUTO_L }
}

export const authenticate = (userId, token) => {
    return dispatch => {
        dispatch({ type: AUTHENTICATE, userId: userId, token: token });
    };
};


export const signup = signupdata => {
   
    return async dispatch => {


        const response = await axios.post(`${BASEURL}signup`, {
            name: signupdata.name,
            email: signupdata.email,
            password: signupdata.password,
            mobile_number: signupdata.phone,
            roleType: signupdata.role,
        });

      
        saveUserDataStorage(response.data.accessToken, response.data.user);
        dispatch(authenticate(response.data.user_id, response.data.accessToken));
    };
};

export const signin = logindata => {
    //return false ;

    return async dispatch => {
     

        const response = await axios.post(`${BASEURL}user/login`, {

            username: logindata.email,
            password: logindata.password,
        });
     
        if (!response.data.status) {
            console.log('res', response)
            throw new Error(response.data.message);

        } else {

            
            saveUserDataStorage(response.data.accessToken, response.data.user);

            dispatch(authenticate(response.data.user._id, response.data.accessToken));

        }


    };
};

export const sendOtp = otpdata => {
    //return false ;

    return async dispatch => {

        const response = await axios.post(`${BASEURL}send-otp`,

            {
                email: otpdata.email,
                type: otpdata.type
            },

        )
        console.log('try', response?.data);

        saveOtpDataStorage(response.data.Otp, otpdata.email, otpdata.type);
        dispatch({ type: SENDOTP });
    };
};

export const forgotPassword = data => {
    //return false ;
    return async dispatch => {

        const response = await axios.post(`${BASEURL}resetPassword/mobile`, {
            username: data.username,
        });


        dispatch({ type: FORGOTPASSWORD });
    };
};

export const resetPassord = data => {

    return async dispatch => {

        const response = await axios.post(`${BASEURL}user/resetPassword`, {
            email: data.email,
            password: data.password,
        });


        dispatch({ type: RESETPASSWORD });
    };
};

export const logout = () => {

    AsyncStorage.removeItem('userAuthData');
    return { type: LOGOUT };

}



// Async storage function
const saveOtpDataStorage = (otp, email = null, type) => {
    //console.log("otpdatastorage is" ,otp,email,type)
    AsyncStorage.setItem('otpData', JSON.stringify({

        otp: otp,
        email: email,
        type: type

    }));

}

const saveUserDataStorage = async (token, user) => {
 
    try {

        let data = JSON.stringify({
                token: token,
                user: user
            })

      
        AsyncStorage.setItem("userAuthData", data).then(
            () => AsyncStorage.getItem("userAuthData")
                  .then((result)=>console.log("result",result))
         )

        
    }catch(e) {
        console.log('async erro r ----------    --', e);
    }
}

