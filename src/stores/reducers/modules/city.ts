// 路径src/reducers/city.js
import { ACTION_TYPE } from '../../actionTypes';
import { ICity } from '../../types/layout-types';

const defaultState = {
  cityName: "北京"
}
export default function city(state = defaultState, action: ICity) {
  const { type, cityName } = action;
  switch (type) {
    case ACTION_TYPE.INIT_CITY:
      return {
        ...state,
        cityName: state.cityName
      };
    case ACTION_TYPE.CHANGE_CITY:
      return {
        ...state,
        cityName: cityName
      };
    default:
      return state;
  }
}
