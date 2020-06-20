import React from 'react';
import './App.css';
import ReactDOM from 'react-dom';

import { Nav, Navbar, NavDropdown, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faMinus, faPlusCircle, faMinusSquare, faRedo, faPlay, faStepForward, faStepBackward, faFastBackward, faFastForward, faEye, faKey } from '@fortawesome/free-solid-svg-icons'
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
        <Navi selected={selected} selectModule={this.selectModule}/>
        <Calc selected={selected}/>
      </div>
    );
  }
}

class Navi extends React.Component {
  render () {
    return (
      <Navbar className="navi" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">MLCalc - ML Calculator 0.1.1</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Clustering" id="nav-dropdown">
                <NavDropdown.Item eventKey="c.1" onClick={()=>this.props.selectModule("KM")}>K-Means</NavDropdown.Item>
                <NavDropdown.Item eventKey="c.2" onClick={()=>this.props.selectModule("GM")}>Gaussian Mixture</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Regression" id="nav-dropdown">
                <NavDropdown.Item eventKey="r.1" onClick={()=>this.props.selectModule("LR")}>Linear Regression</NavDropdown.Item>
                <NavDropdown.Item eventKey="r.2" onClick={()=>this.props.selectModule("LogR")}>Logistic Regression</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Graph" id="nav-dropdown">
                <NavDropdown.Item eventKey="g.1" onClick={()=>this.props.selectModule("BN")}>Bayesian Network</NavDropdown.Item>
                <NavDropdown.Item eventKey="g.2" onClick={()=>this.props.selectModule("HM")}>Hidden Markov</NavDropdown.Item>
                <NavDropdown.Item eventKey="g.3" onClick={()=>this.props.selectModule("FG")}>Factor Graph</NavDropdown.Item>
              </NavDropdown>
          </Nav>
          <Nav>
            <NavDropdown title="Language" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">English</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">日本語</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">中文</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#feedback">Feedback</Nav.Link>
            <Nav.Link href="#help">Help</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}


class Calc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: [[2,2],[4,4],[2,4],[4,2],[-2,-2],[-2,-4],[-4,-2],[-4,-4]], 
                  centers: [[[1,1],[-1,-1],[10.0,10.0]],[[1.5,1.5],[-1.5,-1.5],[10.0,10.0]]], currIteration: 0};
    this.addPoint = this.addPoint.bind(this);
    this.deletePoint = this.deletePoint.bind(this);
    this.editPoint = this.editPoint.bind(this);
    this.setIteration = this.setIteration.bind(this);
    this.updateCenters = this.updateCenters.bind(this);
  }

  setIteration (iteration) {
    console.log("entered setIteration");
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

  updateCenters (centers) {
    var newCenters = centers;
    console.log("UPDATECENTERS: ", newCenters);
    this.setState({centers: this.state.centers.concat([newCenters])});
    console.log("updated centers are ", this.state.centers);
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

  render () {
    var selected = this.props.selected;
    if (selected === "KM") {
      var data = this.state.data;
      var centers = this.state.centers;
      var currIteration = this.state.currIteration;
      var sidebar = <Sidebar selected={selected} data={data} centers={centers} currIteration={currIteration} 
                      addPoint={this.addPoint} deletePoint={this.deletePoint} 
                      editPoint={this.editPoint} updateCenters={this.updateCenters}
                      setIteration={this.setIteration}
                      />;
      var canvas = <Canvas selected={selected} data={data} centers={centers} currIteration={currIteration}/>;
    }

    return (
      <div id='calc'>
        <div className='column left'>
          {sidebar}
        </div>
        <div className='column right'>
          {canvas}
        </div>
      </div>
    );
  }
}


class Sidebar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {selected: "KM"};
  }
  render () {
    const selected = this.props.selected;
    var tools = undefined;
    if (selected === "KM") {
      tools = <KMTools data={this.props.data} centers={this.props.centers} currIteration={this.props.currIteration}
              addPoint={this.props.addPoint} deletePoint={this.props.deletePoint} 
              editPoint={this.props.editPoint} updateCenters={this.props.updateCenters}
              setIteration={this.props.setIteration}/>; 
    } else if (selected === "GM") {
      tools = <h1> I'm GM </h1>;
    } else if (selected === "LR") {
      tools = <h1> I'm LR </h1>;
    } else if (selected === "LogR") {
      tools = <h1> I'm LogR </h1>;
    } else if (selected === "BN") {
      tools = <h1> I'm BN </h1>;
    } else if (selected === "HM") {
      tools = <h1> I'm HM </h1>;
    } else if (selected === "FG") {
      tools = <h1> I'm FG </h1>;
    } else {
      tools = <h1> I'm Nothing </h1>;
    }

    return (
      tools
    );
  }
}

function KMTools(props) {
  return (
    <div id='KMTools'>
        <KMengine data={props.data} centers={props.centers} currIteration={props.currIteration}
        updateCenters={props.updateCenters} setIteration={props.setIteration}/> 
      <div className="KMtable1">
        <Table tableType="data" data={props.data} addPoint={props.addPoint} deletePoint={props.deletePoint} editPoint={props.editPoint}/>
      </div>
      <div className="KMtable2">
        <Table tableType="center" centers={props.centers} currIteration={props.currIteration} addPoint={props.addPoint} deletePoint={props.deletePoint} editPoint={props.editPoint}/>
      </div>
    </div>
  );
}


class KMengine extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
    this.computeNextStep = this.computeNextStep.bind(this);
    this.computeNextIteration = this.computeNextIteration.bind(this);
    this.accessPreviousIteration = this.accessPreviousIteration.bind(this);
  }

  computeNextStep () {
    
  }
  
  accessPreviousIteration () {
    if (this.props.currIteration != 0) {
      this.props.setIteration(this.props.currIteration-1);
    }
  }

  computeNextIteration () {
    var data = this.props.data;
    var currCenters = this.props.centers[this.props.currIteration];
    var currDataPoint = null;
    if (this.props.currIteration < this.props.centers.length-1) {
      this.props.setIteration(this.props.currIteration+1);
    } else {
      var newCenters = [];
      var dictForUpdateCenters = {};
      for (var i=0; i<currCenters.length; i++) {
        dictForUpdateCenters[i] = [];
      }
      
      
      for (var i=0; i<data.length; i++) {
        currDataPoint = data[i];
        var minDistance = Number.MAX_VALUE;
        var minIndex = 0;
        var currDistance = null;
        for (var j=0; j<currCenters.length; j++) {
          currDistance = Math.pow((currDataPoint[0]-currCenters[j][0]),2)+Math.pow((currDataPoint[1]-currCenters[j][1]),2);
          if (currDistance < minDistance) {
            minDistance = currDistance;
            minIndex = j;
          }
        }
        dictForUpdateCenters[minIndex].push([currDataPoint[0], currDataPoint[1]]);
      }
      var values = Object.values(dictForUpdateCenters);
      for (var i=0; i<values.length; i++) {
        var currGroup = values[i];
        var groupLength = currGroup.length;
        if (groupLength) {
          var currPoint = null;
          var xSum = 0;
          var ySum = 0;
          for (var j=0; j<groupLength; j++) {
            currPoint = currGroup[j];
            xSum += currPoint[0];
            ySum += currPoint[1];
          }
          newCenters.push([xSum/groupLength, ySum/groupLength]);
        } else {
          console.log("reached here");
          newCenters.push(currCenters[i]);
        }
      }
      console.log("new centers are ", newCenters);
      this.props.updateCenters(newCenters);
      this.props.setIteration(this.props.currIteration+1);
    }
  }


  render () {
    return (
      <div className="outer-menu">
        <div className="bar">
          <ul>
            <li data-title="Start Over"> 
              <FontAwesomeIcon icon={faRedo} />
            </li>
            <li data-title="Autoplay"> 
              <FontAwesomeIcon icon={faPlay} />
            </li>
            <li data-title="Prev. Step">
              <FontAwesomeIcon icon={faStepBackward} />
            </li>
            <li data-title="Next Step"> 
              <FontAwesomeIcon icon={faStepForward} />
            </li>
            <li data-title="Prev. Iter.">
              <FontAwesomeIcon icon={faFastBackward} onClick={this.accessPreviousIteration}/>
            </li>
            <li data-title="Next Iter.">
              <FontAwesomeIcon icon={faFastForward} onClick={this.computeNextIteration}/>
            </li>
            <li data-title="Final Result">
              <FontAwesomeIcon icon={faKey} />
            </li>
            <li data-title="View">
                <FontAwesomeIcon icon={faEye} />
                <ul>
                    <li data-title="Hide Shadows">
                      <FontAwesomeIcon icon={faEye} />
                    </li>
                    <li data-title="Hide Lines">
                      <FontAwesomeIcon icon={faEye} />
                    </li>
                </ul>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

class Table extends React.Component {
  constructor (props) {
    super(props);
    this.state = {inputX: '', inputY: ''};
    this.editX = this.editX.bind(this);
    this.editY = this.editY.bind(this);
    this.navigateTable = this.navigateTable.bind(this);
  }

  editX (event) {
    this.setState({inputX: event.target.value});
  }

  editY (event) {
    this.setState({inputY: event.target.value});
  }

  navigateTable (event) {

    var arrow = {
      left: 37,
      up: 38,
      right: 39,
      down: 40
    };

    var input = event.target;

    var id = event.target.id;
    var typeId = id[0];
    var rowId = id.slice(1, id.length-1);
    var colId = id[id.length-1];
    var key = event.keyCode;
    var newId = id;
    var start = null;
    var end = null;
    var newInput = null;
    var inputLength = null;
    if (this.props.tableType==='data') {
      inputLength = (this.props.data.length).toString();
    } else if (this.props.tableType==='center') {
      inputLength = (this.props.centers.length).toString();
    }

    switch (key) {
      case arrow.left:
        { 
          if ((colId==='1') && (input.selectionStart==0)) { 
            newId = typeId + rowId + '0';
            newInput = document.getElementById(newId);
            start = newInput.value.length;
            end = newInput.value.length;
        }
          break;
        }
      case arrow.right:
        {
          if ((colId === '0') && (input.selectionEnd==input.value.length)) {
            newId = typeId + rowId + '1';
            newInput = document.getElementById(newId);
            start = 0;
            end = 0;
          }
          break;
        }
      case arrow.up:
        {
          if (rowId !== '0') {
            newId = typeId + (parseInt(rowId)-1) + colId;
            newInput = document.getElementById(newId);
            start = input.selectionStart;
            end = input.selectionStart;
          }
          break;
        }
      case arrow.down:
        {
          if (rowId !== inputLength) {
            newId = typeId + (parseInt(rowId)+1) + colId;
            newInput = document.getElementById(newId);
            start = input.selectionStart;
            end = input.selectionStart;
          }
          break;
        }
    }

    if (newId !== id) {
      event.preventDefault();
      newInput.focus();
      newInput.selectionStart = start;
      newInput.selectionEnd = end;
    }
  }

  render () {
    var tableType = this.props.tableType;
    var points = null;
    var title = null;
    var type = null;
    if (tableType == "data") {
      points = this.props.data;
      title = "Data Points";
      type = "p";
    } else if (tableType == "center") {
      points = this.props.centers[this.props.currIteration];
      title = "Cluster Centers";
      type = "c";
    }

    var list = [];
    for (var i=0; i<points.length; i++){
      list.push(
        <tr key={'tr'+i}>
          <td >
            <input id={type+(i+1)+"0"} className="formInput" autoComplete="off" type="text" value={points[i][0]} 
            onChange={e=>this.props.editPoint(tableType, e.target.id, e.target.value)} 
            onKeyDown={this.navigateTable} />
          </td>
          <td >
            <input id={type+(i+1)+"1"} className="formInput" autoComplete="off" type="text" value={points[i][1]} 
            onChange={e=>this.props.editPoint(tableType, e.target.id, e.target.value)} 
            onKeyDown={this.navigateTable} />
          </td>
          <td >
            <span id={'d'+i} className="delBtn" onClick={(e)=>this.props.deletePoint(tableType, e.target.id)}>
              <FontAwesomeIcon icon={faMinusSquare}/>
            </span>
          </td>
        </tr>
      );
    }
    return (
      <div className="table-container" id={tableType}>
        <h4>{title}</h4>
        <table className="table">
          <tbody>
            <tr>
              <td>
                <input id={type+"00"} name="inputX" className="formInput" autoComplete="off" type="text" placeholder="Enter X" 
                onChange={this.editX} onKeyDown={this.navigateTable}/>
              </td>
              <td>
                <input id={type+"01"} name="inputY" className="formInput" autoComplete="off" type="text" placeholder="Enter Y" 
                onChange={this.editY} onKeyDown={this.navigateTable}/>
              </td>
              <td>
                <span className="addBtn" onClick={()=>this.props.addPoint(tableType, this.state.inputX, this.state.inputY)}>
                  <FontAwesomeIcon icon={faPlusSquare}/>
                </span>
              </td>
            </tr>
            {list}
          </tbody>
        </table>
      </div>
    );
  }
}

class Canvas extends React.Component {
  constructor (props) {
    super(props);
    this.state = {selected: "KM"};
  }

  render () {
    const selected = this.props.selected;
    if (selected === "KM") {
      return <XYcoord data={this.props.data} centers={this.props.centers} currIteration={this.props.currIteration}/>;
    } else if (selected === "GM") {
      return <XYcoord data={this.props.data} centers={this.props.centers} currIteration={this.props.currIteration}/>;
    } else if (selected === "LR") {
      return <XYcoord data={this.props.data} centers={this.props.centers} currIteration={this.props.currIteration}/>;
    } else if (selected === "LogR") {
      return <XYcoord data={this.props.data} centers={this.props.centers} currIteration={this.props.currIteration}/>;
    } else if (selected === "BN") {
      return <h1> Fill me with BN </h1>;
    } else if (selected === "HM") {
      return <h1> Fill me with HM </h1>;
    } else if (selected === "FG") {
      return <h1> Fill me with FG </h1>;
    } else {
      return <h1> Fill me with Nothing </h1>;
    }
  }
}

class XYcoord extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      W: window.innerWidth-Math.floor(window.innerWidth/4),
      H: window.innerHeight-56,
      cX: (window.innerWidth-Math.floor(window.innerWidth/4))/2,
      centerX: (window.innerWidth-Math.floor(window.innerWidth/4))/2,
      cY: (window.innerHeight-56)/2,
      centerY: (window.innerHeight-56)/2,
      gS: 18,
      gridSize: 18,
      nS: 4,
      co: 2,
      exp: 0,
      zoom: 0,
      dragging: false,
      dragStartX: 0,
      dragStartY: 0,
      X: 0,
      Y: 0,
      oX: Math.floor(window.innerWidth/4),
      oY: 56,
    };

    this.scrollZoom = this.scrollZoom.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.updateUnitLength = this.updateUnitLength.bind(this);
    this.updateGridSize = this.updateGridSize.bind(this);
    this.updateCenter = this.updateCenter.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.generateTick = this.generateTick.bind(this);
    this.generateGrids = this.generateGrids.bind(this);
    this.generateData = this.generateData.bind(this);
    this.generateCenters = this.generateCenters.bind(this);
    this.showCoord = this.showCoord.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions () {
    this.setState({W: window.innerWidth-Math.ceil(window.innerWidth/4), H: window.innerHeight-57});
  }

  updateUnitLength (zoom) {
    if (zoom === 1) {
      if (this.state.co === 1) {
        this.setState(()=>({co: 5}));
        this.setState(()=>({exp: this.state.exp-1}));
      } else if (this.state.co === 2) {
        this.setState(()=>({co: 1}));
      } else if (this.state.co === 5) {
        this.setState(()=>({co: 2}));
      }
    }
    else if (zoom === -1) {
      if (this.state.co === 5) {
        this.setState(()=>({co: 1}));
        this.setState(()=>({exp: this.state.exp+1}));
      } else if (this.state.co === 1) {
        this.setState(()=>({co: 2}));
      } else if (this.state.co === 2) {
        this.setState(()=>({co: 5}));
      }
    }
  }

  updateGridSize (gridSize, zoom, coeff) {
    if (zoom === 1) { //zoom in
      if ((gridSize > 20) && (coeff === 5)) { //coefficient is 5
        this.setState(()=>({gS: 10}));
        this.setState(()=>({nS: 4}));
        this.updateUnitLength(zoom);
      } else if ((gridSize > 25) && (coeff === 2)) { //coefficient is 2
        this.setState(()=>({gS: 10}));
        this.setState(()=>({nS: 5}));
        this.updateUnitLength(zoom);
      } else if ((gridSize > 20) && (coeff === 1)) { //coefficient is 1
        this.setState(()=>({gS: 10}));
        this.setState(()=>({nS: 5}));
        this.updateUnitLength(zoom);
      }
    }
    else if (zoom === -1) { //zoom out
      if ((gridSize < 10) && (coeff === 5)) { //coefficient is 5
        this.setState(()=>({gS: 20}));
        this.setState(()=>({nS: 5}));
        this.updateUnitLength(zoom);
      } else if ((gridSize < 10) && (coeff === 2)) { //coefficient is 2
        this.setState(()=>({gS: 20}));
        this.setState(()=>({nS: 5}));
        this.updateUnitLength(zoom);
      } else if ((gridSize < 10) && (coeff === 1)) { //coefficient is 1
        this.setState(()=>({gS: 25}));
        this.setState(()=>({nS: 4}));
        this.updateUnitLength(zoom);
      }
    }
  }

  updateCenter (Xc, Yc) {
    this.setState(()=>({cX: Xc-this.state.oX-this.state.X*(this.state.gS*this.state.nS)/(this.state.co*Math.pow(10,this.state.exp))}));
    this.setState(()=>({cY: Yc-this.state.oY+this.state.Y*(this.state.gS*this.state.nS)/(this.state.co*Math.pow(10,this.state.exp))}));
    this.setState(()=>({centerX: this.state.cX}));
    this.setState(()=>({centerY: this.state.cY}));
  }

  scrollZoom(evt) {
    var cursorX = evt.clientX;
    var cursorY = evt.clientY;
    var delta = -evt.deltaY/1200;

    this.setState(()=>({gS: this.state.gS+delta}));
    var zoom = Math.sign(delta);
    this.updateGridSize(this.state.gS, zoom, this.state.co);
    this.updateCenter(cursorX, cursorY);
  }

  mouseDown(evt) {
    var clientX = evt.clientX;
    var clientY = evt.clientY;
    this.setState(()=>({dragging: true}));
    this.setState(()=>({dragStartX: clientX}));
    this.setState(()=>({dragStartY: clientY}));
  }

  mouseMove(evt) {
    var cursorX = evt.clientX;
    var cursorY = evt.clientY;
    this.setState(()=>({X: (cursorX-this.state.cX-this.state.oX)/(this.state.gS*this.state.nS)*(this.state.co*Math.pow(10,this.state.exp))}));
    this.setState(()=>({Y: (this.state.cY-cursorY+this.state.oY)/(this.state.gS*this.state.nS)*(this.state.co*Math.pow(10,this.state.exp))}));

    if (this.state.dragging) {
      this.setState(()=>({cX: this.state.centerX+cursorX-this.state.dragStartX}));
      this.setState(()=>({cY: this.state.centerY+cursorY-this.state.dragStartY}));
    }
  }

  mouseUp(evt) {
    this.setState(()=>({dragging: false}));
    this.setState(()=>({centerX: this.state.cX}));
    this.setState(()=>({centerY: this.state.cY}));
  }

  generateTick(j) {
    if (j < 0) {
      j = -j;
      var negative = true;
    } else {
      var negative = false;
    }
    
    var digits = (this.state.co*(j/this.state.nS)).toString();
    var shift = this.state.exp;
    var mag = shift+digits.length-1;
    while (digits[digits.length-1] === '0') {
      digits = digits.slice(0,-1);
      shift += 1;
    }
    if ((mag>0) && (mag<=4)) {
      var tick = digits+'0'.repeat(shift);
    } else if ((mag<=0) && (mag>=-4)) {
      var numZeros = -mag;
      if (numZeros>0) {
        var tick = '0.'+'0'.repeat(numZeros-1)+digits;
      } else if (numZeros==0 && shift==0) {
        var tick = digits;
      } else {
        var tick = digits.slice(0,(-numZeros+1))+'.'+digits.slice((-numZeros+1),digits.length);
      }
    } else {
      shift += digits.length-1;
      if (digits.length == 1) { 
        var tick = digits +'×10' + shift;
      } else {
        var tick = digits[0] + '.' + digits.slice(1,digits.length) +'×10' + shift;
      }
    }
    if (negative) {
      return '-'+tick;
    } else {
      return tick;
    }
  }

  generateGrids() {
    
    var grids = [];
    var xaxis = <line key='xa' id='x-axis' x1='0' y1={this.state.cY} x2={this.state.W} y2={this.state.cY} strokeWidth='1' stroke='black'/>;
    var yaxis = <line key='ya' id='y-axis' x1={this.state.cX} y1='0' x2={this.state.cX} y2={this.state.H} strokeWidth='1' stroke='black'/>;
    var otick = <text key='ot' className='tick' x={this.state.cX-3} y={this.state.cY+12} fill='black' fontSize='10pt' textAnchor='end' fontFamily="math">{0}</text>

    grids.push(xaxis);
    grids.push(yaxis);
    grids.push(otick);

    var xu = -Math.floor(this.state.cY/this.state.gS);
    var xd = Math.floor((this.state.H-this.state.cY)/this.state.gS);
    var yl = -Math.floor(this.state.cX/this.state.gS);
    var yr = Math.floor((this.state.W-this.state.cX)/this.state.gS);

    for (var i=xu; i<=xd; i++) {
      var y = this.state.cY + i*this.state.gS;
      if (i % this.state.nS === 0) {
        grids.push(<line key={'hl'+i} className='x-grids' x1='0' y1={y} x2={this.state.W} y2={y} strokeWidth='0.5' stroke='#666666'/>);
        if (i !== 0) {
        grids.push(<text key={'ht'+i} className='tick' x={this.state.cX-3} y={y+5} fill='black' fontSize='10pt' textAnchor='end' fontFamily="math">{this.generateTick(-i)}</text>);
        }
      }
      else {
        grids.push(<line key={'hl'+i} className='x-grids' x1='0' y1={y} x2={this.state.W} y2={y} strokeWidth='0.5' stroke='#CCCCCC'/>);
      }
    }

    for (i=yl; i<=yr; i++) {
      var x = this.state.cX + i*this.state.gS;
      if (i % this.state.nS === 0) {
        grids.push(<line key={'vl'+i} className='x-grids' x1={x} y1='0' x2={x} y2={this.state.H} strokeWidth='0.5' stroke='#666666'/>);
        if (i !== 0) {
          grids.push(<text key={'vt'+i} className='tick' x={x} y={this.state.cY+12} fill='black' fontSize='10pt' textAnchor='middle' fontFamily="math">{this.generateTick(i)}</text>);
        }
      }
      else {
        grids.push(<line key={'vl'+i} className='x-grids' x1={x} y1='0' x2={x} y2={this.state.H} strokeWidth='0.5' stroke='#CCCCCC'/>);
      }
    }
    return grids;
  }

  generateData(){
    var points = [];
    for (var i=0; i<this.props.data.length; i++) {
      var x = this.props.data[i][0];
      var y = this.props.data[i][1];
      var currX = x*(this.state.gS*this.state.nS)/(this.state.co*Math.pow(10,this.state.exp))+this.state.cX;
      var currY = this.state.cY-y*(this.state.gS*this.state.nS)/(this.state.co*Math.pow(10,this.state.exp));
      points.push(<circle key={'d'+i} xy={[x, y]} cx={currX} cy={currY} r="4" fill="blue" onMouseOver={this.showCoord}/>);
    }
    return points;
  }

  generateCenters(){
    var centers = [];
    var currCenters = this.props.centers[this.props.currIteration];
    var polyPoints = [[0,-11.264],[-6.6,9.416],[9.9,-3.784],[-9.9,-3.784],[6.6,9.416]];
    for (var i=0; i<currCenters.length; i++) {
      var points = "";
      var x = currCenters[i][0];
      var y = currCenters[i][1];
      var currX = x*(this.state.gS*this.state.nS)/(this.state.co*Math.pow(10,this.state.exp))+this.state.cX;
      var currY = this.state.cY-y*(this.state.gS*this.state.nS)/(this.state.co*Math.pow(10,this.state.exp));
      for (var j=0; j<5; j++) {
        var polyPointX = polyPoints[j][0];
        var polyPointY = polyPoints[j][1];
        points += (polyPointX+currX)+","+(polyPointY+currY)+" ";   
      }
      centers.push(<polygon points={points} key={'c'+i} fill="red" fill-opacity="0.5"/>);
    } //9.9,12.364
    return centers;
  }

  showCoord(event) {
    var coord = event.target.attributes.getNamedItem('xy').value;
    var coord = "(" + coord + ")";
  }

  render () {

  var grids = this.generateGrids();
  var data = this.generateData();
  var centers = this.generateCenters();
  var coordsys = <svg className='coordsys' onWheel={this.scrollZoom} onMouseMove={this.mouseMove} onMouseUp={this.mouseUp} onMouseDown={this.mouseDown}>
                  <g id='b'>
                    {grids.concat(centers,data)}
                  </g>
                </svg>

    return (
      coordsys
    );
  }
}


/*
App
  Nav
  Calc
    Sidebar
      KMtools
        Table
        Table
        Toolbar
      GMtools
        Table
        Table
        Toolbar
    
    Canvas
      KMvis
        XYcoord
        Points
      GMvis
        XYcoord
        Points
      LRvis
        XYcoord
        Points
      LogRvis
        XYcoord
        Points
      HMvis
        Graphsys
      FGvis
        Graphsys

    Engine
      KMengine
      GMengine
      
      
*/

ReactDOM.render(
  <App />,
  document.getElementById('root'));

export default App;