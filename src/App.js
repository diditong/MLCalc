import React from 'react';
import './App.css';
import ReactDOM from 'react-dom';

import { Nav, Navbar, NavDropdown, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Navi extends React.Component {
  render () {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
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

function Template (props) {
  const selected = props.selected;
  if (selected === "KM") {
    return <XYcoord />;
  } else if (selected === "GM") {
    return <h1> I'm GM </h1>;
  } else if (selected === "LR") {
    return <h1> I'm LR </h1>;
  } else if (selected === "LogR") {
    return <h1> I'm LogR </h1>;
  } else if (selected === "BN") {
    return <h1> I'm BN </h1>;
  } else if (selected === "HM") {
    return <h1> I'm HM </h1>;
  } else if (selected === "FG") {
    return <h1> I'm FG </h1>;
  }
  return <h1> I'm Nothing </h1>;
}

class Calc extends React.Component {

  constructor (props) {
    super(props);
    this.setKM = this.setKM.bind(this);
    this.setGM = this.setGM.bind(this);
    this.setLR = this.setLR.bind(this);
    this.setLogR = this.setLogR.bind(this);
    this.setBN = this.setBN.bind(this);
    this.setHM = this.setHM.bind(this);
    this.setFG = this.setFG.bind(this);
    this.state = {selected: "KM"};
  }

  setKM() {
    this.setState({selected: "KM"});
  }

  setGM() {
    this.setState({selected: "GM"})
  }

  setLR() {
    this.setState({selected: "LR"})
  }

  setLogR() {
    this.setState({selected: "LogR"})
  }

  setBN() {
    this.setState({selected: "BN"})
  }

  setHM() {
    this.setState({selected: "HM"})
  }

  setFG() {
    this.setState({selected: "FG"})
  }

  render () {
    const selected = this.state.selected;
    return (
      <Card>
        <Card.Header>
          <Nav variant="tabs">
            <NavDropdown title="Clustering" id="nav-dropdown">
              <NavDropdown.Item eventKey="c.1" onClick={this.setKM}>K-Means</NavDropdown.Item>
              <NavDropdown.Item eventKey="c.2" onClick={this.setGM}>Gaussian Mixture</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Regression" id="nav-dropdown">
              <NavDropdown.Item eventKey="r.1" onClick={this.setLR}>Linear Regression</NavDropdown.Item>
              <NavDropdown.Item eventKey="r.2" onClick={this.setLogR}>Logistic Regression</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Graph" id="nav-dropdown">
              <NavDropdown.Item eventKey="g.1" onClick={this.setBN}>Bayesian Network</NavDropdown.Item>
              <NavDropdown.Item eventKey="g.2" onClick={this.setHM}>Hidden Markov</NavDropdown.Item>
              <NavDropdown.Item eventKey="g.3" onClick={this.setFG}>Factor Graph</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Template selected={selected} />
        </Card.Body>
      </Card>
    );
  }
}

class XYcoord extends React.Component {
  
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      W: 1000,
      H: 600,
      cX: 500,
      centerX: 375,
      cY: 300,
      centerY: 200,
      gS: 18,
      gridSize: 18,
      nS: 4,
      co: 2,
      exp: 0,
      zoom: 0
    };
    this.scrollZoom = this.scrollZoom.bind(this);
  }

  redraw () {
    
  }

  scrollZoom(evt) {
    console.log(evt.clientX);
  }

  mouseDown(evt) {
    var dragStartX = evt.offsetX;
    var dragStartY = evt.offsetY;
    var dragging = true;
    evt.persist();
    console.log(evt);
    //console.log(cursorX, cursorY);
  }
/*
  mouseMove(evt) {
    var cursorX = evt.offsetX;
    var cursorY = evt.offsetY;

    var X = (cursorX-cX)/(gS*nS)*(co*Math.pow(10,exp));
    var Y = (cY-cursorY)/(gS*nS)*(co*Math.pow(10,exp));

    if (dragging) {
        cX = centerX+cursorX-dragStartX;
        cY = centerY+cursorY-dragStartY;
    }
  }

  mouseUp(evt) {
      dragging = false;
      centerX = cX;
      centerY = cY;
  }
*/
  render () {
    var grids = [];
    var xaxis = <line id='x-axis' x1='0' y1={this.state.cY} x2={this.state.W} y2={this.state.cY} strokeWidth='1' stroke='black'/>;
    var yaxis = <line id='y-axis' x1={this.state.cX} y1='0' x2={this.state.cX} y2={this.state.H} stroke-width='1' stroke='black'/>;

    var xu = -Math.floor(this.state.cY/this.state.gS);
    var xd = Math.floor((this.state.H-this.state.cY)/this.state.gS);
    var yl = -Math.floor(this.state.cX/this.state.gS);
    var yr = Math.floor((this.state.W-this.state.cX)/this.state.gS);
    
    var lines = [];
    var ticks = [];

    for (var i=xu; i<=xd; i++) {
      var y = this.state.cY + i*this.state.gS;
      if (i % this.state.nS == 0){
          var line = <line class='x-grids' x1='0' y1={y} x2={this.state.W} y2={y} stroke-width='0.5' stroke='#666666'/>;
          if (i != 0) {
              var yval = this.state.co*Math.pow(10,this.state.exp)*(-i/this.state.nS);
              if (Math.abs(this.state.exp) >= 6){
                  yval = yval.toExponential();
              }
              var ytick = <text x={this.state.cX-3} y={y+3} fill='black' font-size='6pt' text-anchor='end' font-family="math">{yval}</text>;
          }
      }
      else {
          var line = <line class='x-grids' x1='0' y1={y} x2={this.state.W} y2={y} stroke-width='0.5' stroke='#CCCCCC'/>;
      }
      grids.push(line);
      grids.push(ytick);
    }

    for (var i=yl; i<=yr; i++) {
      var x = this.state.cX + i*this.state.gS;
      if (i % this.state.nS == 0){
          var line = <line class='x-grids' x1={x} y1='0' x2={x} y2={this.state.H} stroke-width='0.5' stroke='#666666'/>;
          if (i != 0) {
              var xval = this.state.co*Math.pow(10,this.state.exp)*(i/this.state.nS);
              if (Math.abs(this.state.exp) >= 6){
                  xval = xval.toExponential();
              }
              var xtick = <text x={x} y={this.state.cY+8} fill='black' font-size='6pt' text-anchor='middle' font-family="math">{xval}</text>;
          }
      }
      else {
          var line = <line class='x-grids' x1={x} y1='0'z x2={x} y2={this.state.H} stroke-width='0.5' stroke='#CCCCCC'/>;
      }
      grids.push(line);
      grids.push(xtick);
    }

    grids.push(xaxis);
    grids.push(yaxis);


    var coordsys = <svg id='coordsys' style={{"width": this.state.W, "height": this.state.H}} onWheel={this.scrollZoom} onMouseMove={this.mouseMove} onMouseUp={this.mouseUp} onMouseDown={this.mouseDown}>
                    <g id='b' style={{width:"100%"}}>
                      {grids}
                    </g>
                  </svg>
    
    return (
      coordsys
    );
  }
}



function App() {
  return (
    <div>
      <Navi />
      <Calc />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root'));

export default App;