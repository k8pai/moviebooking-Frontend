import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './common/common.css';
import 'typeface-roboto';
import registerServiceWorker from './registerServiceWorker';
import Controller from './screens/Controller';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Controller />);
// ReactDOM.createRoot(<Controller />, document.getElementById('root'));
registerServiceWorker();
