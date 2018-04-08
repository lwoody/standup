import React from 'react';
import logo from './logo.svg';
import './App.css';
import Editor from './Editor';
import config from './config';

console.log(config.apiKey);

class App extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    console.log(this, e);
  }

  isAnonymous() {
    return true;
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">스탠드업 페이지</h1>
        </div>
        <p className="App-intro">
          react로 스탠드업 페이지 개발
        </p>
        <Editor isAnonymous={this.isAnonymous}
                handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default App;
