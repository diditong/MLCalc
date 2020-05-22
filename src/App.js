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
    return <h1> I'm KM </h1>;
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
  }else if (selected === "FG") {
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