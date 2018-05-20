import { GET_COMMENT_FOR_POST, GET_COMMENT_OBJECT } from '../../Constants'

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & (0x3 | 0x8));
    return v.toString(16);
  });
}

let addComment = () => {
  return {
    id: uuidv4(),
    timestamp: Date.parse(new Date()),
    body: '',
    author: '',
    parentId: '',
    parentDeleted: false,
    voteScore: 1,
    deleted: false,
  }
}

const initialState = {
  comment: {
    all:[],
    react: [],
    redux: [],
    udacity: [],
  },
  newComment: {},

  
}
function CommentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENT_FOR_POST: {
      return {
        ...state,
        comment: {...state.comment, [action.community]: action.comments },
      }
    }
    case GET_COMMENT_OBJECT: {
      return {
        ...state,
        newComment: addComment(),
      }
    }
    default: 
      return state
  }
}

export default CommentReducer