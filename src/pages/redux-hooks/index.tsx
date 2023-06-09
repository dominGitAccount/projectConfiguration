// 要使用 Redux 的组件----------2. 函数式组件
import React from 'react'
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../stores/types';
import { initCity, changeCity } from "../../stores/actions"
import { Button } from 'antd';
import { ICity } from '../../stores/types/layout-types';

export default function User() {
  const dispatch = useAppDispatch();
  // 使用 Redux 的state
  const city = useAppSelector((state: any) => state.city as ICity);
  // city = {cityName: "北京"}

  useEffect(() => {
    dispatch(initCity())
  }, [dispatch])

  function onCityEvent(cityName: string) {
    // 使用Redux 的action
    dispatch(changeCity(cityName))
  }
  return (
    <div>
      <p>{city.cityName}</p>
      <Button onClick={() => onCityEvent("成都")}>changeCity</Button>
    </div>
  )
}
