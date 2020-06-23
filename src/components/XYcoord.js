
import React from 'react';

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
      points.push(<circle key={'d'+i} xy={[x, y]} cx={currX} cy={currY} r="4" fill="black" onMouseOver={this.showCoord}/>);
    }
    return points;
  }

  generateCenters(){
    var centers = [];
    var currCenters = null;
    var currIteration = this.props.currIteration;
    if (currIteration === 0) {
      currCenters = this.props.centers;
    } else {
      currCenters = this.props.results[currIteration-1];
    }
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

// Must export!
export default XYcoord;