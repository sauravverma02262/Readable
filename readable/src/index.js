import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/main.css';
import App from './Components/App';
import {createStore, applyMiddleware, compose} from 'redux'
import {BrowserRouter} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import reducers from './Store/index'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
let middleware = applyMiddleware(thunk, logger)

const store = createStore(
  reducers,
  compose (middleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)

ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>
    <App/>
  </Provider>
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
