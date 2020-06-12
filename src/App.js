import React from 'react';
import './App.css';
import ReactDOM from 'react-dom';

import { Nav, Navbar, NavDropdown, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

function App() {
  return (
    <div id='wrap'>
      <Navi />
      <Calc />
    </div>
  );
}

class Navi extends React.Component {
  render () {
    return (
      <Navbar style={{height:'5%'}} collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">MLCalc - machine learning calculator 0.1.1</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
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
    this.state = {selected:'KM', data: []};
    this.addPoint = this.addPoint.bind(this);
    this.deletePoint = this.deletePoint.bind(this);
    this.selectModule = this.selectModule.bind(this);

  }

  selectModule (mod) {
    this.setState({selected: mod});
  }

  addPoint (inputX, inputY) {
    this.setState({data: [[parseFloat(inputX), parseFloat(inputY)]].concat(this.state.data)});
  }

  deletePoint (id) {
    var newData = [];
    for (var i=0; i<this.state.data.length; i++) {
      if (i !== parseInt(id)) {
        newData.push(this.state.data[i]);
      }
    }

    this.setState({data: newData});
  }

  render () {
    var selected = this.state.selected;
    var data = this.state.data;
    return (
      <div id='calc'>
        <div className='column left'>
          <Sidebar selected={selected} data={data} selectModule={this.selectModule} addPoint={this.addPoint} deletePoint={this.deletePoint} />
        </div>
        <div className='column right'>
          <Canvas selected={selected} data={data} />
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
      tools = <KMTools data={this.props.data} addPoint={this.props.addPoint} deletePoint={this.props.deletePoint}/>;
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
      <Card className="sidebar rounded-0">
        <Card.Header>
          <Nav variant="tabs">
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
        </Card.Header>
        <Card.Body>
          {tools}
        </Card.Body>
      </Card>
    );
  }
}

function KMTools(props) {
  return (
    <div id='KMTools'>
      <Table data={props.data} addPoint={props.addPoint} deletePoint={props.deletePoint}/>
    </div>
  );
}

class Table extends React.Component {
  constructor (props) {
    super(props);
    this.state = {inputX: '', inputY: ''};
    this.editX = this.editX.bind(this);
    this.editY = this.editY.bind(this);
  }

  editX (event) {
    this.setState({inputX: event.target.value});
  }

  editY (event) {
    this.setState({inputY: event.target.value});
  }

  render () {
    var list = [];
    for (var i=0; i<this.props.data.length; i++){
      list.push(
        <tr>
          <td className="col-xs-3">
            <input className="form-control border-0" type="text" value={this.props.data[i][0]} />
          </td>
          <td className="col-xs-3">
            <input className="form-control border-0" type="text" value={this.props.data[i][1]} />
          </td>
          <td className="col-xs-1 text-center">
            <span className="delBtn">
              <FontAwesomeIcon id={i} icon={faMinus} onClick={e=>this.props.deletePoint(e.target.id)}/>
            </span>
          </td>
        </tr>
      );
    }
    
    return (
      <div className = "table-container">
        <table className="table">
          <thead>
            <tr>
              <th>X</th>
              <th>Y</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="col-xs-3">
                <input className="form-control addX" name="inputX" type="text" placeholder="Enter X" onChange={this.editX}/>
              </td>
              <td className="col-xs-3">
                <input className="form-control addY" name="inputY" type="text" placeholder="Enter Y" onChange={this.editY}/>
              </td>
              <td className="col-xs-1 text-center">
                <span >
                  <FontAwesomeIcon className="addBtn" icon={faPlus} onClick={()=>this.props.addPoint(this.state.inputX, this.state.inputY)}/>
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
      return <XYcoord />;
    } else if (selected === "GM") {
      return <XYcoord />;
    } else if (selected === "LR") {
      return <XYcoord />;
    } else if (selected === "LogR") {
      return <XYcoord />;
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
      W: window.innerWidth,
      H: window.innerHeight,
      cX: window.innerWidth/2,
      centerX: 500,
      cY: window.innerHeight/2,
      centerY: 300,
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
      Y: 0
    };

    this.scrollZoom = this.scrollZoom.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.updateUnitLength = this.updateUnitLength.bind(this);
    this.updateGridSize = this.updateGridSize.bind(this);
    this.updateCenter = this.updateCenter.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions () {
    this.setState({W: window.innerWidth, H: window.innerHeight});
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
    this.setState(()=>({cX: Xc-this.state.X*(this.state.gS*this.state.nS)/(this.state.co*Math.pow(10,this.state.exp))}));
    this.setState(()=>({cY: Yc+this.state.Y*(this.state.gS*this.state.nS)/(this.state.co*Math.pow(10,this.state.exp))}));
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
    this.setState(()=>({X: (cursorX-this.state.cX)/(this.state.gS*this.state.nS)*(this.state.co*Math.pow(10,this.state.exp))}));
    this.setState(()=>({Y: (this.state.cY-cursorY)/(this.state.gS*this.state.nS)*(this.state.co*Math.pow(10,this.state.exp))}));
  
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

  render () {
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
          var yval = this.state.co*Math.pow(10,this.state.exp)*(-i/this.state.nS);
          if (Math.abs(this.state.exp) >= 6) {
              yval = yval.toExponential();
          }
          grids.push(<text key={'ht'+i} className='tick' x={this.state.cX-3} y={y+5} fill='black' fontSize='10pt' textAnchor='end' fontFamily="math">{yval}</text>);
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
          var xval = this.state.co*Math.pow(10,this.state.exp)*(i/this.state.nS);
          if (Math.abs(this.state.exp) >= 6) {
              xval = xval.toExponential();
          }
          grids.push(<text key={'vt'+i} className='tick' x={x} y={this.state.cY+12} fill='black' fontSize='10pt' textAnchor='middle' fontFamily="math">{xval}</text>);
        }
      }
      else {
        grids.push(<line key={'vl'+i} className='x-grids' x1={x} y1='0' x2={x} y2={this.state.H} strokeWidth='0.5' stroke='#CCCCCC'/>);
      }
    }

    var coordsys = <svg className='coordsys' onWheel={this.scrollZoom} onMouseMove={this.mouseMove} onMouseUp={this.mouseUp} onMouseDown={this.mouseDown}>
                    <g id='b'>
                      {grids}
                    </g>
                  </svg>

    return (
      coordsys
    );
  }
}

class Points extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {type: 'points'}
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