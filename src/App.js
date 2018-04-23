import React from 'react';
import logo from './logo.svg';
import './App.css';
import Editor from './Editor';
import config from './config';
import FirebaseDao from './FirebaseDao';

class App extends React.Component {
  constructor() {
    super();
    this.dao = new FirebaseDao(config);
    this.submit = this.submit.bind(this);
    this.state = {
      articles: []
    }
  }

  componentDidMount = () => {
    this.dao.list(25).on('value', snapShotList => {
      var items = [];
      snapShotList.forEach((snapshot) => {
        items.push(snapshot.val());
      });
      if (items && items.length > 0) {
        console.log(items);
        this.setState({
          articles: items.reverse(),
        })
      }
    })
  }

  submit(article) {
    if (article) {
      let key = this.dao.newKey();
      let updated = this.dao.update(key, article);
      return updated;
    }
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
          submit={this.submit} />
        <ul>
          {this.state.articles.map((article) =>
            <li key={article.key}>
              {article.content}
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
