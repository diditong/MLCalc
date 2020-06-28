import React, {useContext} from 'react';


const KMCalc = () => {

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



  //



  return (

  );
}

// Must export!
export default KMCalc;

/*

  this.clearPoints = this.clearPoints.bind(this);
  this.addPoint = this.addPoint.bind(this);
  this.deletePoint = this.deletePoint.bind(this);
  this.editPoint = this.editPoint.bind(this);
  this.setIteration = this.setIteration.bind(this);
  this.updateResults = this.updateResults.bind(this);
  this.updateHeight = this.updateHeight.bind(this);
  this.resetEngine = this.resetEngine.bind(this);
  //this.createRandomData = this.createRandomData.bind(this);

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

*/