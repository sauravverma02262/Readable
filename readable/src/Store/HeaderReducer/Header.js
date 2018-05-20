import { HEADER_TITLE, APP_TITLE } from '../../Constants'

const initialState = {
  loading: false,
  title: "Communities",
}
function HeaderReducer(state = initialState, action) {
  switch (action.type) {
    case HEADER_TITLE: {
      return {
        ...state,
        title: APP_TITLE + " | " + (action.title.length > 0 ?  action.title.toUpperCase(): 'HOME'),
      }
    }
    default: 
      return state
  }
}

export default HeaderReducer