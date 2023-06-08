// src/actions/city.js
import ACTION_TYPE from '../actionTypes';

export function initCity(cityName) {
    return {
        type: ACTION_TYPE.INIT_CITY,
        cityName
    }
}

export function changeCity(cityName) {
    return {
        type: ACTION_TYPE.CHANGE_CITY,
        cityName
    }
}
