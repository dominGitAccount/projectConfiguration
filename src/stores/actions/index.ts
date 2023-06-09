// src/actions/city.js
import { ACTION_TYPE } from '../actionTypes';

export const initCity = (cityName?: string) => {
    return {
        type: ACTION_TYPE.INIT_CITY,
        cityName
    }
}

export const changeCity = (cityName?: string) => {
    return {
        type: ACTION_TYPE.CHANGE_CITY,
        cityName
    }
}
