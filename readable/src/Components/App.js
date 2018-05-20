import React, { Component } from 'react';
import '../Styles/App.css';
import Community from './Community/Community'
import {Route} from 'react-router-dom'

//import NOTFOUND from '../Components/NotFound/NotFound'
class App extends Component {
  render() {
    return (
      <div className="App">
          <Route exact path="/" render={() => <Community path=""/>}/>
          <Route exact path="/react" render={() => <Community path="react"/>}/>
          <Route exact path="/redux" render={() => <Community path="redux"/>}/>
          <Route exact path="/udacity" render={() => <Community path="udacity"/>}/>
          <Route exact path="/react/:postId" render={() => <Community hasPost postId={window.location.pathname.split('/')[2]} path={'react'}/>}/>
          <Route exact path="/redux/:postId" render={() => <Community hasPost postId={window.location.pathname.split('/')[2]} path="redux"/>}/>
          <Route exact path="/udacity/:postId" render={() => <Community hasPost postId={window.location.pathname.split('/')[2]} path="udacity"/>}/>
          {/* <Route component={NOTFOUND} /> */}
      </div>
    );
  }
}

export default App
