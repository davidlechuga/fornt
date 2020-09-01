import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
// css and frameworks ( GLOBAL STYLES ).
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

serviceWorker.unregister();
