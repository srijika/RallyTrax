import { defineAnimation } from "react-native-reanimated";
import { EDIT_PROFILE, GET_USER } from "../actions/users";


const initialState = {
    user: {},
  
}

export default (state = initialState, action) => {

    switch (action.type) {
       
        case GET_USER : 
        return {
            ...state, 
            user: action.user
        }

        default:
            return state;
    }

}