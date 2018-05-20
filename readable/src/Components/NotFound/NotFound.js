import React from 'react'
import Header from '../Header/Header'
import '../../Styles/HomePage.css'
import Category from '../Category/Category'

const PageNotFound = () => {
  return(
    <div>
      <Header title="Page Not Found" />
      <Category />
      <h1>Page Not Found</h1>
    </div>
  )
}

export default PageNotFound