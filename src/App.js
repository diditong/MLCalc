import React from 'react';
import './App.css';
import ReactDOM from 'react-dom';

import Navibar from './components/Navibar'
import Calc from './components/Calc'

import 'bootstrap/dist/css/bootstrap.min.css';

import { findAllByDisplayValue } from '@testing-library/react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selected: "KM"};
    this.selectModule = this.selectModule.bind(this);
  }

  selectModule (mod) {
    this.setState({selected: mod});
  }

  render () {
    var selected = this.state.selected;
    return (
      <div id='wrap'>
        <Navibar selected={selected} selectModule={this.selectModule}/>
        <Calc selected={selected}/>
      </div>
    );
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root'));

export default App;