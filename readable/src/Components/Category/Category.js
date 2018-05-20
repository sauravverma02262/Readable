import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllCategories} from '../../Store/CategoriesReducer/ActionCreators'
import Paper from 'material-ui/Paper'
import '../../Styles/HomePage.css'
import {Link} from 'react-router-dom'

class Category extends  Component {
  componentDidMount () {
    this.props._getAllCategories()
  }
  componentWillMount(){
    console.log('path', this.props)
  }
  render() {
    const {_categories, path} = this.props
    return(
        <Paper elevation={4} className="categories">
          <div>
            <Link to={'/'} className={`tab-style ${path === '' && 'active'}`} style={{width:`${99.9/(_categories.length+1)}%`}}>All</Link>
            {_categories.map((category, index) =>  <Link key={`link-${index}`} to={`/${category.path}`} className={`tab-style ${category.path === path && 'active'}`} style={{width:`${99.9/(_categories.length+1)}%`}}>{category.name}</Link>) }</div>
        </Paper>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  const { Categories } = state
  return {
    _categories: Categories.Categories
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    _getAllCategories: (data) => {dispatch(getAllCategories(data))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Category)