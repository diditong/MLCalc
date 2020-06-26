import React from 'react';
import './App.css';
import ReactDOM from 'react-dom';

import Navibar from './components/Navibar'
import Calc from './components/Calc'

import 'bootstrap/dist/css/bootstrap.min.css';

import { findAllByDisplayValue } from '@testing-library/react';

import { AppContextProvider } from "./AppContext";

const App = () => {
  return (
    <AppContextProvider>
      <div id='wrap'>
        <Navibar/>
        <Calc selected="KM"/>
      </div>
    </AppContextProvider>

  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root'));

export default App;