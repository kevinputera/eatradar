import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './AppContainer';
import * as serviceWorker from './serviceWorker';
import { FocusStyleManager } from '@blueprintjs/core';

// Blueprint
import 'normalize.css/normalize.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';

import './index.css';

FocusStyleManager.onlyShowFocusOnTabs();
ReactDOM.render(<AppContainer />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
