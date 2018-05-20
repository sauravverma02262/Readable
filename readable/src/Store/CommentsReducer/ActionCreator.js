import { GET_COMMENT_FOR_POST ,GET_COMMENT_OBJECT, BASE_HOST} from '../../Constants'
import {getAllPost} from '../PostsReducer/ActionCreator'

export const getCommentsByPostID = ({postId, community}) => {
  return dispatch => {
    return fetch(BASE_HOST+`posts/${postId}/comments`, 
    {headers: {'Authorization': 'new', 'Content-Type':'application/json'}})
    .then(res => res.status === 200 && res.json())
    .then(comments => dispatch({type: GET_COMMENT_FOR_POST, comments, community}))
  }
}
export const addCommentsByPostID = ({NewComment,community}) => {
  return dispatch => {
    return fetch(BASE_HOST+'comments',{
      method: 'post',
      body: JSON.stringify(NewComment),
      headers: {'Authorization': 'new', 'Content-Type':'application/json'}
     }).then(res => {
       dispatch(getCommentsByPostID({postId:NewComment.parentId, community}))
       dispatch(getAllPost(community))
    })
  } 
}

export const voteComments = ({commentId,vote, community, postId}) => {
  return dispatch => {
    return fetch(BASE_HOST+`comments/${commentId}`,{method: 'post',
    body: JSON.stringify({option: vote}),
    headers: {'Authorization': 'new', 'Content-Type':'application/json'}
     }).then(res => dispatch(getCommentsByPostID({postId, community})))
  } 
}

export const deleteComment = ({commentId, community, postId}) => {
  return dispatch => {
    return fetch(BASE_HOST+`comments/${commentId}`,{method: 'delete',
    body: {},
    headers: {'Authorization': 'new', 'Content-Type':'application/json'}
     }).then(res => {
      dispatch(getCommentsByPostID({postId, community}))
      dispatch(getAllPost(community))
    })
  } 
}

export const editComment = ({commentId, body, community, postId}) => {
  return dispatch => {
    return fetch(`http://localhost:3001/comments/${commentId}`,{method: 'put',
    body: JSON.stringify(body),
    headers: {'Authorization': 'new', 'Content-Type':'application/json'}
  }).then(res => dispatch(getCommentsByPostID({postId, community})))
  } 
}
export const getNewCommentObject = () => {
  return {
    type: GET_COMMENT_OBJECT,
  }
}