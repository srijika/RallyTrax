import { ADDEVENT, GETEVENT, ADDEVENTBOOKING, ALLEVENTBOOKING, BUSSINESSBOOKINGHISTORY } from '../actions/event';

const initialState = {
  events: [],
  
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADDEVENT:
      return {
        ...state,
        //events: action.events
      };
    case GETEVENT:

      return {
        ...state,
        events: action.events
      };
    case ADDEVENTBOOKING:

        return {
          ...state,
          bookingNumber: action.bookingNumber
        };
    case ALLEVENTBOOKING:

        return {
          ...state,
          allBooking: action.allBooking
        };

    case BUSSINESSBOOKINGHISTORY:

        return {
          ...state,
          bookingHistory: action.bookingHistory
        };
  


    default:
      return state;
  }
};
