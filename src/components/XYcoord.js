
import React, {useState, useEffect, useContext} from 'react';
import {ClusteringContext} from './ClusteringContext';

const XYcoord = () => {
  const {data, centers, results, currIteration} = 
    useContext(ClusteringContext);
  const [W, setW] = useState(window.innerWidth-Math.floor(window.innerWidth/4));
  const [H, setH] = useState(window.innerHeight-56);
  const [cx, setCx] = useState((window.innerWidth-Math.floor(window.innerWidth/4))/2);
  const [cy, setCy] = useState((window.innerHeight-56)/2);
  const [centerx, setCenterx] = useState((window.innerWidth-Math.floor(window.innerWidth/4))/2);
  const [centery, setCentery] = useState((window.innerHeight-56)/2);
  const [gs, setGs] = useState(18);
  const [ns, setNs] = useState(4);
  const [co, setCo] = useState(2);
  const [exp, setExp] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [ox, setOx] = useState(Math.floor(window.innerWidth/4));
  const [oy, setOy] = useState(56);

  const updateUnitLength = (zoom) => {
    if (zoom === 1) {
      if (co === 1) {
        setCo(5);
        setExp(exp-1);
      } else if (co === 2) {
        setCo(1);
      } else if (co === 5) {
        setCo(2);
      }
    }
    else if (zoom === -1) {
      if (co === 5) {
        setCo(1);
        setExp(1);
      } else if (co === 1) {
        setCo(2);
      } else if (co === 2) {
        setCo(5);
      }
    }
  }
  
  const updateGridSize = (gridSize, zoom, coeff) => {
    if (zoom === 1) { //zoom in
      if ((gridSize > 20) && (coeff === 5)) { //coefficient is 5
        setGs(10);
        setNs(4);
        updateUnitLength(zoom);
      } else if ((gridSize > 25) && (coeff === 2)) { //coefficient is 2
        setGs(10);
        setNs(5);
        updateUnitLength(zoom);
      } else if ((gridSize > 20) && (coeff === 1)) { //coefficient is 1
        setGs(10);
        setNs(5); 
        updateUnitLength(zoom);
      }
    }
    else if (zoom === -1) { //zoom out
      if ((gridSize < 10) && (coeff === 5)) { //coefficient is 5
        setGs(20);
        setNs(5);
        updateUnitLength(zoom);
      } else if ((gridSize < 10) && (coeff === 2)) { //coefficient is 2
        setGs(20);
        setNs(5);
        updateUnitLength(zoom);
      } else if ((gridSize < 10) && (coeff === 1)) { //coefficient is 1
        setGs(25);
        setNs(4);
        updateUnitLength(zoom);
      }
    }
  }

  const updateCenter = (Xc, Yc) => {
    setCx(Xc-ox-x*(gs*ns)/(co*Math.pow(10,exp)));
    setCy(Yc-oy+y*(gs*ns)/(co*Math.pow(10,exp)));
    setCenterx(cx);
    setCentery(cy);
  }

  const scrollZoom = (evt) => {
    let cursorX = evt.clientX;
    let cursorY = evt.clientY;
    let delta = -evt.deltaY/1200;

    setGs(gs+delta);
    let zoom = Math.sign(delta);
    updateGridSize(gs, zoom, co);
    updateCenter(cursorX, cursorY);
  }

  const mouseDown = (evt) => {
    let clientX = evt.clientX;
    let clientY = evt.clientY;
    setDragging(true);
    setDragStartX(clientX);
    setDragStartY(clientY);
  }

  const mouseMove = (evt) => {
    if (dragging) {
      let cursorX = evt.clientX;
      let cursorY = evt.clientY;
      setX((cursorX-cx-ox)/(gs*ns)*(co*Math.pow(10,exp)));
      setY((cy-cursorY+oy)/(gs*ns)*(co*Math.pow(10,exp)));
      setCx(centerx+cursorX-dragStartX);
      setCy(centery+cursorY-dragStartY);
    }
  }

  const mouseUp = (evt) => {
    setDragging(false);
    setCenterx(cx);
    setCentery(cy);
  }
  
  const showCoord = (evt) => {
    let coord = evt.target.attributes.getNamedItem('xy').value;
    coord = "(" + coord + ")";
  }

  const generateGrids = () => {
    let grids = [];
    let xaxis = <line key='xa' id='x-axis' x1='0' y1={cy} x2={W} y2={cy} strokeWidth='1' stroke='black'/>;
    let yaxis = <line key='ya' id='y-axis' x1={cx} y1='0' x2={cx} y2={H} strokeWidth='1' stroke='black'/>;
    let otick = <text key='ot' className='tick' x={cx-3} y={cy+12} fill='black' fontSize='10pt' textAnchor='end' fontFamily="math">{0}</text>

    grids.push(xaxis);
    grids.push(yaxis);
    grids.push(otick);

    let xu = -Math.floor(cy/gs);
    let xd = Math.floor((H-cy)/gs);
    let yl = -Math.floor(cx/gs);
    let yr = Math.floor((W-cx)/gs);

    for (var i=xu; i<=xd; i++) {
      let y = cy + i*gs;
      if (i % ns === 0) {
        grids.push(<line key={'hl'+i} className='x-grids' x1='0' y1={y} x2={W} y2={y} strokeWidth='0.5' stroke='#666666'/>);
        if (i !== 0) {
        grids.push(<text key={'ht'+i} className='tick' x={cx-3} y={y+5} fill='black' fontSize='10pt' textAnchor='end' fontFamily="math">{generateTick(-i)}</text>);
        }
      }
      else {
        grids.push(<line key={'hl'+i} className='x-grids' x1='0' y1={y} x2={W} y2={y} strokeWidth='0.5' stroke='#CCCCCC'/>);
      }
    }

    for (i=yl; i<=yr; i++) {
      var x = cx + i*gs;
      if (i % ns === 0) {
        grids.push(<line key={'vl'+i} className='x-grids' x1={x} y1='0' x2={x} y2={H} strokeWidth='0.5' stroke='#666666'/>);
        if (i !== 0) {
          grids.push(<text key={'vt'+i} className='tick' x={x} y={cy+12} fill='black' fontSize='10pt' textAnchor='middle' fontFamily="math">{generateTick(i)}</text>);
        }
      }
      else {
        grids.push(<line key={'vl'+i} className='x-grids' x1={x} y1='0' x2={x} y2={H} strokeWidth='0.5' stroke='#CCCCCC'/>);
      }
    }
    return (grids);
  }

  const generateTick = (j) => {
    let negative = null;
    if (j < 0) {
      j = -j;
      negative = true;
    } else {
      negative = false;
    }
    
    let digits = (co*(j/ns)).toString();
    let shift = exp;
    let mag = shift+digits.length-1;
    while (digits[digits.length-1] === '0') {
      digits = digits.slice(0,-1);
      shift += 1;
    }
    let tick = null;
    if ((mag>0) && (mag<=4)) {
      tick = digits+'0'.repeat(shift);
    } else if ((mag<=0) && (mag>=-4)) {
      let numZeros = -mag;
      if (numZeros>0) {
        tick = '0.'+'0'.repeat(numZeros-1)+digits;
      } else if (numZeros==0 && shift==0) {
        tick = digits;
      } else {
        tick = digits.slice(0,(-numZeros+1))+'.'+digits.slice((-numZeros+1),digits.length);
      }
    } else {
      shift += digits.length-1;
      if (digits.length == 1) { 
        tick = digits +'×10' + shift;
      } else {
        tick = digits[0] + '.' + digits.slice(1,digits.length) +'×10' + shift;
      }
    }
    if (negative) {
      return ('-'+tick);
    } else {
      return (tick);
    }
  }

  const generateDataPoints = () => {
    let dataPoints = [];
    for (var i=0; i<data.length; i++) {
      let x = data[i][0];
      let y = data[i][1];
      let currX = x*(gs*ns)/(co*Math.pow(10,exp))+cx;
      let currY = cy-y*(gs*ns)/(co*Math.pow(10,exp));
      dataPoints.push(<circle key={'d'+i} xy={[x, y]} cx={currX} cy={currY} r="4" fill="black" onMouseOver={showCoord}/>);
    }
    return (dataPoints);
  }

  const generateCenterPoints = () => {
    let centerPoints = [];
    let currCenters = null;
    if (currIteration === 0) {
      currCenters = centers;
    } else {
      currCenters = results[currIteration-1];
    }

    var polyPoints = [[0,-11.264],[-6.6,9.416],[9.9,-3.784],[-9.9,-3.784],[6.6,9.416]];
    for (var i=0; i<currCenters.length; i++) {
      let points = "";
      let x = currCenters[i][0];
      let y = currCenters[i][1];
      let currX = x*(gs*ns)/(co*Math.pow(10,exp))+cx;
      let currY = cy-y*(gs*ns)/(co*Math.pow(10,exp));
      for (var j=0; j<5; j++) {
        let polyPointX = polyPoints[j][0];
        let polyPointY = polyPoints[j][1];
        points += (polyPointX+currX)+","+(polyPointY+currY)+" ";
      }
      centerPoints.push(<polygon points={points} key={'c'+i} fill="red" fillOpacity="0.5"/>);
    } //9.9,12.364
    return (centerPoints);
  }

  useEffect(() => {
    function handleResize() {
      setW(window.innerWidth-Math.ceil(window.innerWidth/4));
      setH(window.innerHeight-57);
    }
      window.addEventListener('resize', handleResize);
  });

  var grids = generateGrids();
  var dataPoints = generateDataPoints();
  var centerPoints = generateCenterPoints();
  var coordsys = <svg className='coordsys' onWheel={scrollZoom} onMouseMove={mouseMove} onMouseUp={mouseUp} onMouseDown={mouseDown}>
                  <g id='b'>
                    {grids.concat(centerPoints,dataPoints)}
                  </g>
                </svg>
  
  return (coordsys);
}
// Must export!
export default XYcoord;