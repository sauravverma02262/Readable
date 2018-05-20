import React, { Component } from 'react'
import { setHeaderTitle } from '../../Store/HeaderReducer/ActionCreator'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import {Link} from 'react-router-dom'


class Header extends Component {
  componentDidMount() {
    this.props.setHeaderTitle(this.props.title)
  }

  render() {
    const { headerTitle } = this.props
    console.log("headerTitle", headerTitle)
    return (
      <AppBar position="static" color="default" className="app-bar">
        <Toolbar>
          <Typography variant="title" className="flex">
            <Link to='/' >{headerTitle}</Link>
          </Typography>
        </Toolbar>
        <Helmet>
          <title>{headerTitle}</title>
        </Helmet>
      </AppBar>
    )
  }
}
function mapStateToProps(state) {
  const { Header } = state
  return {
    headerTitle: Header.title,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    setHeaderTitle: (data) => dispatch(setHeaderTitle(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
