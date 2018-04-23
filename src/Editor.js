import React from 'react';
import './Editor.css';
import Profile from './Profile.js';
import Article from './Article';

class Editor extends React.Component {

    /*사용되는 메쏘드들을 모두 this 로 사용할 수 있도록 바인딩 해 준다.*/
    constructor(props) {
        super(props);
        this.state = {
            embedlyUrl: undefined,
            content: undefined,
            // test: "kkka",
        };
        this.onPaste = this.onPaste.bind(this);
        this.editorChange = this.editorChange.bind(this);
        this.getCard = this.getCard.bind(this);
        this.hasValue = this.hasValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // componentDidMount = () => {
    //   const rootRef = firebase.database().ref().child('test');
    //   rootRef.on('value',snap=>{
    //       this.setState({
    //           test : snap.val()
    //       })
    //   });
    // }


    onPaste(event) {
        event.clipboardData.items[0].getAsString(text => {
            if (this.detectURL(text)) {
                this.setState({ 
                    embedlyUrl: text, 
                    content: this.state.content 
                });
            }
        });
    }

    editorChange(event) {
        let checkText = this.detectURL(event.currentTarget.textContent);
        if (!this.state.embedlyUrl &&
            (event.keyCode === 32 || event.keyCode === 13) &&
            checkText) {
            this.setState({ 
                embedlyUrl: checkText, 
                content: event.currentTarget.textContent 
            });
        } else {
            this.setState({ 
                content: event.currentTarget.textContent 
            });
        }
    }

    detectURL(text) {
        var urls = text.match(/(https?:\/\/[^\s]+)/g) || text.match(/(www.[^\s]+)/g);
        if (urls !== null && urls.length > 0) return urls[0];
        else return undefined;
    }

    getCard(embedlyUrl) {
        if (embedlyUrl) {
            return (
                <div>{embedlyUrl}</div>
            );
        } else {
            return (<div />);
        }
    }

    hasValue(value) {
        if ((value && (typeof value) === "string"))
            return (!value) ? false : (value.trim() === "" ? false : true);
        else return false;
    }

    handleSubmit(event) {
        let article = Object.assign({}, Article());
        article.user = "lee";
        article.content = this.state.content;
        article.urls[0].url = this.state.embedlyUrl;
        console.log(article);
        console.log(this.props.submit);
        this.props.submit(article);
    }

    render() {
        return (
            <div className="wrapEditor">
                <Profile isAnonymous={this.props.isAnonymous} />
                <div className="textEditor">
                    <div className="innerEdit"
                        contentEditable="true"
                        placeholder="글쓰기..."
                        onPaste={this.onPaste}
                        onKeyUp={this.editorChange}></div>
                    {this.getCard(this.state.embedlyUrl)}
                </div>
                <div className="actionBar">
                    <button className="upload"
                        disabled={!this.hasValue(this.state.content)}
                        onClick={this.handleSubmit}>
                        <span>standup</span>
                    </button>
                </div>
                {/* <div>
                    <h1>{this.state.test}</h1>
                </div> */}
            </div>
        );
    }
}

export default Editor;