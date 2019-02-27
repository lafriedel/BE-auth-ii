import React, { Component } from 'react';
import Authenticate from './components/authenticate';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Authenticate match={this.props.match} history={this.props.history} />
      </div>
    );
  }
}

export default App;
