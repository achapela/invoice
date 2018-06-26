import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './redux/store';

const ReduxProvider = (
	<Provider store={store}>
		<App />
	</Provider>
)

ReactDOM.render(ReduxProvider, document.getElementById('root'));
registerServiceWorker();
