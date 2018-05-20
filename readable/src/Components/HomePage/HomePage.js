import React, {Component} from 'react'
import Header from '../Header/Header'
import '../../Styles/HomePage.css'
import Category from '../Category/Category'

class HomePage extends  Component {
  render() {
    return(
      <div>
        <Header title="Home" />
        <Category />
      </div>
    )
  }
}

export default HomePage