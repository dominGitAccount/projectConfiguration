import React from "react";
import axios from 'axios';

export default function About() {
  axios.get("/goods/goodsList", {   //这个是通过get发送的
    params: {
      limit: 5,  //一页有5条数据
      page: 1   //第几页
    }
  }).then((data) => {
    console.log(data);
  });

  axios.post('/postdata1', {
    params: {
      name: 'jack'
    }
  })
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  return <h1>About~~~</h1>;
}
