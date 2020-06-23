import React from 'react';
import Sidebar from './Sidebar.js';
import Canvas from './Canvas.js';

class Calc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {SVGHeight: window.innerHeight-56, 
                  currIteration: 0,
                  data: [], 
                  centers: [[1,1],[-1,1],[0,0]], 
                  results: []};
    this.clearPoints = this.clearPoints.bind(this);
    this.addPoint = this.addPoint.bind(this);
    this.deletePoint = this.deletePoint.bind(this);
    this.editPoint = this.editPoint.bind(this);
    this.setIteration = this.setIteration.bind(this);
    this.updateResults = this.updateResults.bind(this);
    this.updateHeight = this.updateHeight.bind(this);
    this.resetEngine = this.resetEngine.bind(this);
    //this.createRandomData = this.createRandomData.bind(this);
  }
  
  componentWillMount () {
    var randomData = [];
    var r = null;
    var t = null;
    for (var i=0; i<60; i++) {
      r = Math.random()*5;
      t = Math.random()*360;
      randomData.push([r*Math.cos(t)+4, r*Math.sin(t)+4]);
    }
    for (var i=0; i<50; i++) {
      r = Math.random()*5;
      t = Math.random()*360;
      randomData.push([r*Math.cos(t)-4, r*Math.sin(t)+4]);
    }
    for (var i=0; i<50; i++) {
      r = Math.random()*5;
      t = Math.random()*360;
      randomData.push([r*Math.cos(t), r*Math.sin(t)-4]);
    }
    this.setState({data: randomData});
  }

  clearPoints () {
    this.setState({data: []});
  }

  setIteration (iteration) {
    this.setState({currIteration: iteration});
  }

  editPoint (type, id, val) {
    var idx = id.slice(1,-1)-1;
    var coord = id.charAt(id.length-1);
    if (type === "data") {
      var newData = [...this.state.data];
      newData[idx][coord] = val;
      this.setState({data: newData});
    } else if (type === "center") {
      var newCenters = [...this.state.centers];
      newCenters[idx][coord] = val;
      this.setState({centers: newCenters});
    }
  }

  updateResults (centers) {
    var newCenters = centers;
    this.setState({results: this.state.results.concat([newCenters])});
  }

  addPoint (type, inputX, inputY) {
    if (type === "data") {
      this.setState({data: [[inputX, inputY]].concat(this.state.data)});
    } else if (type === "center") {
      this.setState({centers: [[inputX, inputY]].concat(this.state.centers)});
    }
  }

  deletePoint (type, id) {
    if (type === "data") {
      var newData = [];
      for (var i=0; i<this.state.data.length; i++) {
        if (("d"+i) !== id) {
          newData.push(this.state.data[i]);
        }
      }
      this.setState({data: newData});
    } else if (type === "center") {
      var newCenters = [];
      for (var i=0; i<this.state.centers.length; i++) {
        if (("d"+i) !== id) {
          newCenters.push(this.state.centers[i]);
        }
      }
      this.setState({centers: newCenters});
    }
  }

  updateHeight() {
    this.setState({SVGHeight: window.innerHeight-56});
  }

  resetEngine() {
    this.setState({results: [], currIteration: 0});
  }

  render () {

    var selected = this.props.selected;
    if (selected === "KM") {
      var data = this.state.data;
      var centers = this.state.centers;
      var results = this.state.results;
      var currIteration = this.state.currIteration;
      var sidebar = <Sidebar selected={selected} data={data} centers={centers} results={results}
                      addPoint={this.addPoint} deletePoint={this.deletePoint} 
                      editPoint={this.editPoint} updateResults={this.updateResults}
                      currIteration={currIteration} setIteration={this.setIteration} 
                      resetEngine={this.resetEngine} clearPoints={this.clearPoints}
                      />;
      var canvas = <Canvas selected={selected} data={data} centers={centers} results={results} 
                           currIteration={currIteration}/>;
    }

    var columnStyle = {
      float: 'left',
      padding: '0px',
      height: '100%',
      flex: '1'
    }
    
    var leftStyle = {
      width: '25%',
      overflow: 'auto',
      boxShadow: '-6px 0 5px 5px #333',
      height: this.state.SVGHeight
    }

    var rightStyle = {
      width: '75%',
      height: this.state.SVGHeight
    }

    window.addEventListener('resize', this.updateHeight);

    return (
      <div id='calc'>
        <div id='leftColumn' style={Object.assign({}, columnStyle, leftStyle)}>
          {sidebar}
        </div>
        <div id='rightColumn' style={Object.assign({}, columnStyle, rightStyle)}>
          {canvas}
        </div>
      </div>
    );
  }
}

// Must export!
export default Calc;