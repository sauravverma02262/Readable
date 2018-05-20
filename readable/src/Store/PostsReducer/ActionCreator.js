import {
  GET_POST, 
  SORT_POST_BY, 
  BASE_HOST,
  HEADERS} from '../../Constants'

export const getAllPost = (path) => {
  let url = path === '' ? 'posts': `${path}/posts`  
  return dispatch => {
    return fetch(BASE_HOST+url, HEADERS)
      .then(res => res.status === 200 && res.json())
      .then(posts => dispatch({type: GET_POST, posts}))
  }
}

export const updatePost = ({postId, body, path}) => {
  return dispatch => {
    return fetch(BASE_HOST + `posts/${postId}`,{method: 'PUT',
      body: JSON.stringify(body),
      headers: {'Authorization': 'new', 'Content-Type':'application/json'}
     }).then(() => dispatch(getAllPost(path)))
  }
}

export const addPost = ({body, path}) => {
  return dispatch => {
    return fetch(BASE_HOST + `posts`,{method: 'POST',
      body: JSON.stringify(body),
      headers: {'Authorization': 'new', 'Content-Type':'application/json'}
     }).then(() => dispatch(getAllPost(path)))
  }
}
export const deletePostById = ({postId, path}) => {
  return dispatch => {
    return fetch(BASE_HOST+`posts/${postId}`, {
      method: 'DELETE',
      body: {},
      headers: {'Authorization': 'new', 'Content-Type':'application/json'}
    }).then(() => dispatch(getAllPost(path)))
  }
}

export const getPostById = (postId) => {
  let posts = []
  return dispatch => {
    return fetch(BASE_HOST+`posts/${postId}`, HEADERS)
      .then(res => res.status === 200 && res.json())
      .then(post => {
        if(post.title) {posts.push(post)}
        dispatch({type: GET_POST, posts})
      })
    }
}

export const upDatePostsVote = ({postId, vote, path}) => {
  return dispatch => {
    return fetch(BASE_HOST+`posts/${postId}`,{method: 'POST',
    body: JSON.stringify({option: vote}),
    headers: {'Authorization': 'new', 'Content-Type':'application/json'}})
    .then(() => dispatch(getAllPost(path)))
  }
}

export const setPostFilter = (filter) => {
  return {
    type: SORT_POST_BY,
    filter,
  }
}
