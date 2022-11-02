import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Provider } from 'react-redux';
import '../assets/css/bikiran.css';
import '../assets/css/bikiran.responsive.css';
import '../assets/css/style.admin.css';
import '../assets/css/style.admin.responsive.css';
import '../assets/css/style.header.css';
import '../assets/css/style.header.responsive.css';
import '../assets/css/style.search-bar.css';
import '../assets/css/style.search-bar.responsive.css';
import '../assets/css/style.system.responsive.css';
import '../assets/css/style.web.css';
import '../assets/css/top-box.css';

import RouteHandler from './RouteHandler';
import store from './store';

function App() {
    return (
        <Provider store={store}>
            <RouteHandler />
        </Provider>
    );
}

export default App;
