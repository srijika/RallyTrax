import { Dimensions, PixelRatio, Platform } from "react-native";


//export const BASEURL = "http://nodetest.plenumnetworks.com/api/"; //  latest backend
// export const BASEURL = "http://rallytrax.plenumnetworks.com/api/"; //  latest backend
// export const BASEURL = "http://192.168.29.10:9500/api/";
export const BASEURL = "http://192.168.29.211:9500/api/";


export const isEmpty = ['', undefined, 'undefined', null];

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;

export const normalizeFont = (size) => {
    const {
        width: SCREEN_WIDTH, 
        height: SCREEN_HEIGHT
    } = Dimensions.get('window')

    const scale = SCREEN_WIDTH / 375


    function normalize(size) {
        const newSize = size * scale;
        if(Platform.OS == "ios") {
            return Math.round(PixelRatio.roundToNearestPixel(newSize))
        }else {
            return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
        }
    }

    return normalize(size);
}