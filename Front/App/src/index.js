import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import axios from 'axios';
import { setBaseUrlApi } from './config/Global';

axios.get("/config.json").then(res => {
  setBaseUrlApi(res.data.baseUrlApi); 
  ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));}
);

