import React, {Component} from 'react'
import Card, {CardHeader, CardContent} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import Badge from 'material-ui/Badge';
import Comments from '../Comments/Comments'
import ToolTip from 'material-ui/Tooltip'
import VoteCount from '@material-ui/icons/ThumbsUpDown'
import Comment from '@material-ui/icons/Comment'
import ThumbDown from '@material-ui/icons/ThumbDown'
import ThumbUp from '@material-ui/icons/ThumbUp'
import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
import View from '@material-ui/icons/Visibility'
import ViewOff from '@material-ui/icons/VisibilityOff'
import PostLink from '@material-ui/icons/Link'
import {Link} from 'react-router-dom'

class Posts extends Component {
  constructor () {
    super()
    this.state = {
      expandedPanal: '',
      view: false,
    }
    this.commentViewhandler = this.commentViewhandler.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  commentViewhandler = (postId) => {
    this.setState((prevState)=>({expandedPanal: (prevState.expandedPanal === postId ? '': postId ), view: !this.state.view}))
  }
  handleClose = (type,val) => {
    this.props.actionHandler(type, val)
  }
  
  render() {
    const {posts, postCommentUpdate, vote} = this.props
    const {expandedPanal, view} = this.state
    
    console.log("Posts : ", posts)
    return (
      <div className="posts">
        { posts.length > 0 && posts.map((post, index) => {return (!view || (view && expandedPanal === post.id))  && <Card key={post.id}>
          <CardHeader
            avatar={
              <Avatar aria-label="avatar" style={{background: 'red'}}>
                {post.author.toUpperCase().charAt(0)}
              </Avatar>
            }
            action={<span className="post-action-buttons">
                <ToolTip title="Edit">
                  <IconButton key={1}>
                    <Edit onClick={() => this.handleClose('edit', post)}/>
                  </IconButton>
                </ToolTip>
                <ToolTip title="Delete">
                  <IconButton key={3}>
                    <Delete onClick={() => this.handleClose('delete', post.id)}/>
                  </IconButton>
                </ToolTip>
                <ToolTip title="Veiw Post details">
                  <IconButton key={4}>
                    {!view && <View onClick={() => {this.commentViewhandler(post.id); this.setState({view: !view})}} />}
                    {view && <ViewOff onClick={() => {this.commentViewhandler(post.id)}} />}
                  </IconButton>
                </ToolTip>
                <ToolTip title="View Comments for the Post">
                  <IconButton key={6} onClick={() => this.commentViewhandler(post.id)}>
                  <Badge badgeContent={post.commentCount} color="primary"><Comment /></Badge>
                  </IconButton>
                </ToolTip>
                <ToolTip title="I Like the This post ">
                  <IconButton key={7} onClick={() => vote({postId:post.id,vote: 'upVote', path:this.props.path})}>
                      <ThumbUp />
                  </IconButton>
                </ToolTip>
                <ToolTip title="I dislike the This post">
                  <IconButton key={8} onClick={() => vote({postId:post.id,vote: 'downVote', path:this.props.path})}>
                      <ThumbDown />
                  </IconButton>
                </ToolTip>
                <ToolTip title="Total Vote Count">
                  <IconButton key={5}>
                      <Badge badgeContent={post.voteScore} color="primary" ><VoteCount /></Badge>
                  </IconButton>
                </ToolTip>
                <ToolTip title="View Post Details Link">
                  <IconButton key={10}>
                    <Link to={`${post.category}/${post.id}`}><PostLink /></Link>
                  </IconButton>
                </ToolTip>
              </span>
            }
            title={post.title.length > 0 && post.title}
            subheader={`Posted by: ${post.author.length > 0 && post.author.toUpperCase()} - ${new Date(post.timestamp).toLocaleDateString()}`}
          />
          <CardContent>
            <div className="post-body"><div className="post-category">Category: {post.category}</div><div>{post.body.length > 0 && post.body}</div></div>
          {expandedPanal === post.id && <div>
             <Comments 
                postId={post.id} 
                expand={expandedPanal}
                view={view} 
                author={post.author} 
                community={post.category} 
                postCommentUpdate={postCommentUpdate} 
                commentCount={post.commentCount}/>
          </div>}</CardContent>
        </Card>})}
        {posts.length === 0 && <Card>
          <CardContent>
            <h1>No Post to display</h1>
          </CardContent>
          </Card>}
      </div>
    )
  }
}

export default Posts