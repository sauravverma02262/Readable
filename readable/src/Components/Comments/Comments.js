import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar'
import {connect} from 'react-redux'
import Dislike from '@material-ui/icons/ThumbDown'
import Like from '@material-ui/icons/ThumbUp'
import Edit from '@material-ui/icons/Edit'
import Vote from '@material-ui/icons/ThumbsUpDown'
import Delete from '@material-ui/icons/Delete'
import IconButton from 'material-ui/IconButton'
import Badge from 'material-ui/Badge';
import TextField from 'material-ui/TextField'
import {getCommentsByPostID, addCommentsByPostID, voteComments, deleteComment, editComment, getNewCommentObject } from '../../Store/CommentsReducer/ActionCreator'
import {uuidv4} from '../../Services/common'

class Comments extends Component {
  constructor () {
    super()
    this.state = {
      add: false,
      isEdit: '',
      body: ''
    }
    this.textInput = React.createRef();
    this.addComment = this.addComment.bind(this)
    this.fetchComments = this.fetchComments.bind(this)
    this.vote = this.vote.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange = (e,type) => {
    this.setState({[e.target.name]: e.target.value})
  }
  
  fetchComments = () => {
    this.props._getCommentsByPostID({postId:this.props.postId, community:this.props.community})
  }
  addComment = () => {
    this.props._getNewCommentObject()
    let NewComment = Object.assign({},this.props._newCommnet)
    NewComment.id =  uuidv4()
    NewComment.body = this.textInput.current.value
    NewComment.author = this.props.author
    NewComment.parentId = this.props.postId
    NewComment.timestamp = Date.parse(new Date())
    this.props._addCommentsByPostID({NewComment: NewComment, community: this.props.community})
    this.textInput.current.value = ""    
    this.setState({add:true})
  }
  edit = (commentId, CommentBody) => {
    if(CommentBody !== this.state.body){
      this.props._editComment({
        commentId,
        body:{body: this.state.body, timestamp: Date.parse(new Date())},
        community: this.props.community,
        postId: this.props.postId
      });
    }
    this.setState({isEdit: ''})
  }
  delete = (commentId) => {
    this.props._deleteComment({
      commentId,
      community: this.props.community,
      postId: this.props.postId
    })
  }

  vote = (vote, commentId) => {
    if (commentId !== '') {
      this.props._voteComments({
        commentId: commentId,
        vote:vote,
        community:this.props.community, 
        postId:this.props.postId
      })
    }
  }
  componentDidMount() {
    this.props.view &&
    (this.props.expand === this.props.postId) && 
    !this.state.add && 
    this.fetchComments() 
  }
  render() {

    const {_comments, postId, expand, author,community, commentCount} = this.props
    const {isEdit, body} = this.state
    console.log(expand, postId)
     let path = community === '' ? 'all': community 
    return (
      <div className="comments-box">
        {postId === expand && _comments[path].length > 0 && _comments[path].map((comment, index) =>  <div key={comment.id} className="comment">
          <div className="author-details">
            <div className="avatar">
              <Avatar aria-label="avatar">{comment.author.toUpperCase().charAt(0)}</Avatar>
            </div>
            <div className="author-name">
              <IconButton className="vote"><Badge badgeContent={comment.voteScore} color="primary" ><Vote  /></Badge></IconButton>
              <IconButton className="vote"><Dislike onClick={() => this.vote('downVote', comment.id)}/></IconButton>
              <IconButton className="vote"><Like onClick={() => this.vote('upVote', comment.id)}/></IconButton>
              <IconButton className="vote"><Edit onClick={() => this.setState({isEdit: comment.id, body: comment.body})}/></IconButton>
              <IconButton className="vote"><Delete onClick={() => this.delete(comment.id)} /></IconButton>
              <div>Posted by : {comment.author} on : {new Date(comment.timestamp).toLocaleDateString()}</div>
              {isEdit !== comment.id && <div className="com-body">{comment.body}</div>}
              {isEdit === comment.id && <div className="com-body">
              <TextField
                  multiline
                  rowsMin="4"
                  id="body"
                  label="write your comment here ..."
                  value={body}
                  name="body"
                  className="inputFields"
                  onChange={(e) => this.handleChange(e,'body')}
                  margin="normal"/>
                  <button onClick={() => this.edit(comment.id, comment.body)}>Post</button>
              </div>}
            </div>
          </div>
        </div>)}
        {commentCount === 0 && <div>No Comments yets...</div>}
        <div className="add-comment"> 
          <Avatar className="avatar" style={{background: 'red'}}>
            {author.toUpperCase().charAt(0)}
          </Avatar>
          <input type="text" ref={this.textInput}  placeHolder="Comment here..." /> 
          <button onClick={() => this.addComment()}>Post</button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const {Comments} = state
  return {
    _comments: Comments.comment,
    _newCommnet: Comments.newComment,
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    _getCommentsByPostID: (data) => {dispatch(getCommentsByPostID(data))},
    _addCommentsByPostID : (data) => {dispatch(addCommentsByPostID(data))},
    _voteComments: (data) => {dispatch(voteComments(data))},
    _deleteComment: (data) => {dispatch(deleteComment(data))},
    _editComment: (data) => {dispatch(editComment(data))},
    _getNewCommentObject: () => {dispatch(getNewCommentObject())}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Comments)
