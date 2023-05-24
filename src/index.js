import React from 'react';
import './styles/global.css';
import App from './App';
import ReactDOM from 'react-dom/client';
import registerServiceWorker from './registerServiceWorker';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
registerServiceWorker();
