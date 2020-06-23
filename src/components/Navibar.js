import React from 'react';
import { Nav, Navbar, NavDropdown, Card } from 'react-bootstrap';

class Navibar extends React.Component {
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

// Must export!
export default Navibar;