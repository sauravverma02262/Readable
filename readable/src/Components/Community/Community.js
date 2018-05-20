import React, {Component} from 'react'
import {connect} from 'react-redux'
import Header from '../Header/Header'
import '../../Styles/Community.css'
import {getAllPost, setPostFilter, upDatePostsVote, updatePost, addPost, deletePostById, getPostById} from '../../Store/PostsReducer/ActionCreator'
import Category from '../Category/Category'
import Posts from '../Posts/Posts'
import Grid from 'material-ui/Grid'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import ActionBox from '../ActionBox/ActionBox'
import ToolTip from 'material-ui/Tooltip'
import SortBy from 'sort-by'

class Community extends Component {
  constructor () {
    super()
    this.state = {
      postAction: '',
      post: null,
    }
    this.actionHandler = this.actionHandler.bind(this)
  }
  componentDidMount() {
    this.props.hasPost ? this.props._getPostById(this.props.postId) :this.props._getAllPost(this.props.path)
    
  }
  
  actionHandler = (postAction, post) => {
      this.setState({postAction, post})
  }
  
  render() {
    const {path, _posts, _getAllPost, _sortFilter, _sortBy, _setPostFilter, _updatePost, _addPost, _deletePostById, _upDatePostsVote} = this.props
    const {postAction, post} = this.state
    let sortedPosts = _sortBy === '' ? _posts : _posts.sort(SortBy(_sortBy))
    return (
      <div className="community">
        <Header title={path}/>
        <Category path={path}/>
        <Grid container spacing={24}>
        {postAction === '' && <Grid container spacing={24}>
        <Grid item xs={3} sm={2}></Grid>
        <Grid item xs={12} sm={8} >
            {_sortFilter.map((category, index) => <button key={index} className={`sort-action-button ${(category.type === _sortBy || category.type === ('-'+_sortBy))  && 'active'}`} onClick={(e) => _setPostFilter(e.target.value === _sortBy ? ('-'+_sortBy) : e.target.value)} value={category.type}> {category.name}</button>)}    
            <Button variant="fab" className="addPost" onClick={() => this.actionHandler('add','')}><ToolTip title="Add new post"><AddIcon /></ToolTip></Button>
            <Posts
              posts={sortedPosts}
              path={path}
              postCommentUpdate={_getAllPost} 
              vote={_upDatePostsVote}
              actionHandler={this.actionHandler}
              />
          </Grid></Grid>}
        {postAction === 'add' && <Grid container spacing={24}>
        <Grid item xs={3} sm={4}></Grid>
        <Grid item xs={6} sm={4}>
          <ActionBox 
            path={path}
            updatePost={_addPost} 
            actionHandler={this.actionHandler}/>
        </Grid></Grid>}
        {postAction === 'edit' && <Grid container spacing={24}>
        <Grid item xs={3} sm={4}></Grid>
        <Grid item xs={6} sm={4}>
          <ActionBox edit 
            path={path}
            post={post}
            updatePost={_updatePost}  
            actionHandler={this.actionHandler}/>
        </Grid></Grid>}
        {postAction === 'delete' && <Grid container spacing={24}>
        <Grid item xs={3} sm={4}></Grid>
        <Grid item xs={6} sm={4}>
          <ActionBox deletePost 
            path={path}
            post={post}
            updatePost={_deletePostById}  
            actionHandler={this.actionHandler}/>
        </Grid></Grid>}
        </Grid>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    _getAllPost: (data) => {dispatch(getAllPost(data))},
    _setPostFilter: (data) => {dispatch(setPostFilter(data))},
    _upDatePostsVote: (data) => {dispatch(upDatePostsVote(data))},
    _updatePost: (data) => {dispatch(updatePost(data))},
    _addPost: (data) => {dispatch(addPost(data))},
    _deletePostById: (data) => {dispatch(deletePostById(data))},
    _getPostById: (data) => {dispatch(getPostById(data))},
  }
}
const mapStateToProps = (state, ownProps) => {
  const {Posts} = state
  return {
    _posts: Posts.posts,
    _sortFilter: Posts.sortCategory,
    _sortBy: Posts.sortBy
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Community)