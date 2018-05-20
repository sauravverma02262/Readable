import { FETCH_CATEGORY } from '../../Constants'

const initialState = {
  Categories: [],
  currentCategory: ''
}
function CategoriesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORY: {
      return {
        ...state,
        Categories: action.payload.categories && action.payload.categories,
      }
    }
    default: 
      return state
  }
}

export default CategoriesReducer