import { combineReducers } from 'redux';
import Header from '../Store/HeaderReducer/Header'
import Categories from '../Store/CategoriesReducer/Categories'
import Posts from '../Store/PostsReducer/Posts'
import Comments from '../Store/CommentsReducer/Comments'
let rootReducer = combineReducers({
  Header,
  Categories,
  Posts,
  Comments,
});
export default rootReducer