// 要使用 Redux 的组件----------2. 函数式组件
import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { initCity, changeCity } from "../../stores/actions"
import { Button } from 'antd';

export default function User() {
  const dispatch = useDispatch();
  // 使用 Redux 的state
  const city = useSelector(state => state.city);
  // city = {cityName: "北京"}

  useEffect(() => {
    dispatch(initCity())
  }, [dispatch])

  function onCityEvent(city) {
    // 使用Redux 的action
    dispatch(changeCity(city))
  }
  return (
    <div>
      <p>{city.cityName}</p>
      <Button onClick={() => onCityEvent("成都")}>changeCity</Button>
    </div>
  )
}
