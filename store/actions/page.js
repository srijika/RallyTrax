import axios from 'react-native-axios'
import { BASEURL } from "../../constants/Helper";
export const GET_PAGE = 'GET_PAGE';


export const getPage = () => {
    return async (dispatch, getState) => {
        try {
            
             const response = await axios.post(`http://3.145.117.190/api/getAll-html-pages`, { });
             //  const response = await axios.post(`${BASEURL}getAll-html-pages`, { });
            dispatch({ type: GET_PAGE, data : response.data.data })
        } catch (e) {
            console.log(e);
        }
    };
};

