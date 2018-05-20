import reducers from '../../reducers';

test('reducers', () => {
  let state;
  state = reducers({Header:{loading:false,title:'Communities'},Categories:{Categories:[],currentCategory:''}}, {type:'HEADER_TITLE',title:'Home'});
  expect(state).toEqual({Header:{loading:false,title:'Communities | Home'},Categories:{Categories:[],currentCategory:''}});
});