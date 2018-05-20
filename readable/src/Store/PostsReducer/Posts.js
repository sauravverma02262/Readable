import {GET_POST, SORT_POST_BY} from '../../Constants'

const initialState = {
  posts: [],
  sortCategory:[{
    name: 'TimeStamp',
    type: 'timestamp',
  }, {
    name: 'Vote Score',
    type: 'voteScore',
  }],
  sortBy: ''
}
function PostReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POST: {
      return {
        ...state,
        posts: action.posts,
      }
    }
    case SORT_POST_BY: {
      return {
        ...state,
        sortBy: action.filter,
      }
    }
    default: 
      return state
  }
}

export default PostReducer