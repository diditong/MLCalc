import React from 'react';
import './App.css';
import './tick.css'
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
    return <h1> I'm KM </h1>;
  } else if (selected === "GM") {
    return <XYcoord />;
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
    this.state = {selected: "KM"};
  }
  render () {
    const selected = this.state.selected;
    return (
      <Card>
        <Card.Header>
          <Nav variant="tabs">
            <NavDropdown title="Clustering" id="nav-dropdown">
              <NavDropdown.Item eventKey="c.1" onClick={()=>this.setState({selected: "KM"})}>K-Means</NavDropdown.Item>
              <NavDropdown.Item eventKey="c.2" onClick={()=>this.setState({selected: "GM"})}>Gaussian Mixture</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Regression" id="nav-dropdown">
              <NavDropdown.Item eventKey="r.1" onClick={()=>this.setState({selected: "LR"})}>Linear Regression</NavDropdown.Item>
              <NavDropdown.Item eventKey="r.2" onClick={()=>this.setState({selected: "LogR"})}>Logistic Regression</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Graph" id="nav-dropdown">
              <NavDropdown.Item eventKey="g.1" onClick={()=>this.setState({selected: "BN"})}>Bayesian Network</NavDropdown.Item>
              <NavDropdown.Item eventKey="g.2" onClick={()=>this.setState({selected: "HM"})}>Hidden Markov</NavDropdown.Item>
              <NavDropdown.Item eventKey="g.3" onClick={()=>this.setState({selected: "FG"})}>Factor Graph</NavDropdown.Item>
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
      W: window.innerWidth,
      H: window.innerHeight,
      cX: 500,
      centerX: 500,
      cY: 300,
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
    console.log(this.state.W, this.state.H);
    var grids = [];
    var xaxis = <line id='x-axis' x1='0' y1={this.state.cY} x2={this.state.W} y2={this.state.cY} strokeWidth='1' stroke='black'/>;
    var yaxis = <line id='y-axis' x1={this.state.cX} y1='0' x2={this.state.cX} y2={this.state.H} strokeWidth='1' stroke='black'/>;
    var otick = <text className='tick' x={this.state.cX-3} y={this.state.cY+12} fill='black' fontSize='10pt' textAnchor='end' fontFamily="math">{0}</text>

    grids.push(xaxis);
    grids.push(yaxis);
    grids.push(otick);

    var xu = -Math.floor(this.state.cY/this.state.gS);
    var xd = Math.floor((this.state.H-this.state.cY)/this.state.gS);
    var yl = -Math.floor(this.state.cX/this.state.gS);
    var yr = Math.floor((this.state.W-this.state.cX)/this.state.gS);

    for (var i=xu; i<=xd; i++) {
      console.log(i)
      var y = this.state.cY + i*this.state.gS;
      if (i % this.state.nS === 0) {
        grids.push(<line className='x-grids' x1='0' y1={y} x2={this.state.W} y2={y} strokeWidth='0.5' stroke='#666666'/>);
        if (i !== 0) {
          var yval = this.state.co*Math.pow(10,this.state.exp)*(-i/this.state.nS);
          if (Math.abs(this.state.exp) >= 6) {
              yval = yval.toExponential();
          }
          grids.push(<text className="tick" x={this.state.cX-3} y={y+5} fill='black' fontSize='10pt' textAnchor='end' fontFamily="math">{yval}</text>);
        }
      }
      else {
        grids.push(<line className='x-grids' x1='0' y1={y} x2={this.state.W} y2={y} strokeWidth='0.5' stroke='#CCCCCC'/>);
      }
    }

    for (i=yl; i<=yr; i++) {
      var x = this.state.cX + i*this.state.gS;
      
      if (i % this.state.nS === 0) {
        grids.push(<line className='x-grids' x1={x} y1='0' x2={x} y2={this.state.H} strokeWidth='0.5' stroke='#666666'/>);
        if (i !== 0) {
          var xval = this.state.co*Math.pow(10,this.state.exp)*(i/this.state.nS);
          if (Math.abs(this.state.exp) >= 6) {
              xval = xval.toExponential();
          }
          grids.push(<text className='tick' x={x} y={this.state.cY+12} fill='black' fontSize='10pt' textAnchor='middle' fontFamily="math">{xval}</text>);
        }
      }
      else {
        grids.push(<line className='x-grids' x1={x} y1='0' x2={x} y2={this.state.H} strokeWidth='0.5' stroke='#CCCCCC'/>);
      }
    }

    var coordsys = <svg width='100%' height='100' className='coordsys' onWheel={this.scrollZoom} onMouseMove={this.mouseMove} onMouseUp={this.mouseUp} onMouseDown={this.mouseDown}>
                    <g id='b' width='100%' height='100%'>
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
      <XYcoord />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root'));

export default App;