import {FETCH_CATEGORY} from '../../Constants'

export const getAllCategories = () => {

  return dispatch => {
    return fetch('http://localhost:3001/categories', { headers: { 'Authorization': 'Category' } })
    .then(res => res.status === 200 && res.json())
    .then(categories =>dispatch({
      type: FETCH_CATEGORY,
      payload: categories,
    }))
    
  }
}