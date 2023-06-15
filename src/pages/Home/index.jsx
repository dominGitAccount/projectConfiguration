import React, { useEffect } from "react";
import axios from 'axios';
import "./index.less";

export default function Home() {
  const getCaptcha = () => {
    axios.get('/sys/menu/nav').then(res => {
      console.log("/sys/menu/nav")
      console.log(res)
    })
    axios.get('/article/list').then(res => {
      console.log("/article/list")
      console.log(res)
    })
  }
  useEffect(() => { 
    getCaptcha()
  }, [])
  return <h1 className="home-title">Home~~~</h1>;
}
