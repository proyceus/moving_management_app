import React from 'react';
import './index.css';
import App from './App';
import { BrowserRouter} from 'react-router-dom';
import ReactDOM from "react-dom/client";


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
<BrowserRouter>
  <App />
</BrowserRouter>
)