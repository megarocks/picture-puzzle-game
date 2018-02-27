import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App fieldSideSize={500} puzzlesPerSide={4} />, document.getElementById('root'));
registerServiceWorker();
