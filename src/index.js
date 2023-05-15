import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import items from "./Store";

import 'bootstrap/dist/js/bootstrap.min.js';
import './assets/bootstrap/css/bootstrap.css';


import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={items}>
            <App/>
        </Provider>
    </React.StrictMode>
);
