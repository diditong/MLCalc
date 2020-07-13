import React, { useContext } from 'react';
import { Nav, Navbar, NavDropdown, Card } from 'react-bootstrap';
import { AppContext } from "../AppContext";

const Navibar = () => {
  const {module, setModule, language, setLanguage, dictionary} = useContext(AppContext);
  console.log("Dictionary: ", dictionary);
  return (
    <Navbar className="navi" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">MLCalc - ML Calculator 0.1.1 (Under Development)</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Clustering" id="nav-dropdown">
              <NavDropdown.Item eventKey="c.1" onClick={()=>setModule("KM")}>K-Means</NavDropdown.Item>
              <NavDropdown.Item eventKey="c.2" onClick={()=>setModule("GM")}>Gaussian Mixture</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Regression" id="nav-dropdown">
              <NavDropdown.Item eventKey="r.1" >Linear Regression</NavDropdown.Item>
              <NavDropdown.Item eventKey="r.2" >Logistic Regression</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Graph" id="nav-dropdown">
              <NavDropdown.Item eventKey="g.1" >Bayesian Network</NavDropdown.Item>
              <NavDropdown.Item eventKey="g.2" >Hidden Markov</NavDropdown.Item>
              <NavDropdown.Item eventKey="g.3" >Factor Graph</NavDropdown.Item>
            </NavDropdown>
        </Nav>
        <Nav>
          <NavDropdown title="Language" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1" onClick={()=>setLanguage('en')}>English</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2" onClick={()=>setLanguage('jp')}>日本語</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3" onClick={()=>setLanguage('zh')}>中文</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="#feedback">Feedback</Nav.Link>
          <Nav.Link href="#help">Help</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

// Must export!
export default Navibar;