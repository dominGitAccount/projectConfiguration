// 要使用 Redux 的组件----------1.传统Class组件
import React, { Component } from 'react'
import { connect } from "react-redux"
import { initCity, changeCity } from "../../redux/actions/city"

class City extends Component {
  // 使Redux中的State数据映射到Props上
  function mapStateToProps(state)   {
      return {
          city: state.city
      }
  }
  // 使Redux中的Action操作映射到Props上
  function mapDispatchToProps(dispatch)   {
      return {
          changeCity: (city) => { dispatch(changeCity(city)) }
      }
  }
  render() {
    return (
      <div>
        <p>{ city.cityName }</p><!-- 北京 -->
        <button onClick={() => {this.props.changeCity("成都")} }></button>
      </div>
    )
  }
}
export default connext(mapStateToProps, mapDispatchToProps)(City)
