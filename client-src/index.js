import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import './style/index.css';

import Header from './component/header'

class App extends React.Component {
    render() {
        return (
            <Header/>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('root'));