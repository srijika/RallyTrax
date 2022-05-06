import {  GET_PAGE } from "../actions/page";


const initialState = {
    page: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PAGE:            
            return {
                ...state,
                page: action.data
            };

        default:
            return state;
    }

}