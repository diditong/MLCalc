import React, {useState, useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faUpload, faDownload, faEdit, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import FileSaver from 'file-saver';
import ReactFileReader from 'react-file-reader';
import {ClusteringContext} from "./ClusteringContext"
import Colorpicker from './Colorpicker';


const Centerstable = () => {
  const {colors, centers, results, setCenters, centersTableStatus, setCentersTableStatus, addPoint, editPoint, deletePoint, currIteration, currStep, setDataProcessed} 
    = useContext(ClusteringContext);
  const [lastFocusId, setLastFocusId] = useState(null);
  const [lastInvalid, setLastInvalid] = useState(null);
  const [lastValidValue, setLastValidValue] = useState(null);
  const [inputX, setInputX] = useState(null);
  const [inputY, setInputY] = useState(null);
  const [validX, setValidX] = useState(null);
  const [validY, setValidY] = useState(null);

  const handlePressKey = (event) => {
    const keys = {
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      enter: 13,
      delete: 46
    };
  
    let input = event.target;
    let key = event.keyCode;
    let id = event.target.id;
    
    if (key === keys.enter) {
      console.log("hit enter");
      let toAdd = (id.slice(0,2) === 'c0') ? addInput('ca') : null;
    } else if (key === keys.delete) {
      event.preventDefault();
      let toDel = (id.slice(0,2) !== 'c0') ? deletePoint('cr'+(id[1]-1)) : null;
    } else {
      let typeId = id[0];
      let rowId = id.slice(1, id.length-1);
      let colId = id[id.length-1];
      let newId = id;
      let start = null;
      let end = null;
      let newInput = null;
      let inputLength = (centers.length).toString();
      switch (key) {
        case keys.left:
          { 
            if ((colId==='y') && (input.selectionStart==0)) { 
              newId = typeId + rowId + 'x';
              newInput = document.getElementById(newId);
              start = newInput.value.length;
              end = newInput.value.length;
          }
            break;
          }
        case keys.right:
          {
            if ((colId === 'x') && (input.selectionEnd==input.value.length)) {
              newId = typeId + rowId + 'y';
              newInput = document.getElementById(newId);
              start = 0;
              end = 0;
            }
            break;
          }
        case keys.up:
          {
            if (rowId !== '0') {
              newId = typeId + (parseInt(rowId)-1) + colId;
              newInput = document.getElementById(newId);
              start = input.selectionStart;
              end = input.selectionStart;
            }
            break;
          }
        case keys.down:
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
  }

  const isNumeric = (value) => {
    return !isNaN(value);
  }

  const initializeValidValue = (e) => {
    var value = e.target.value;
    if (isNumeric(value)) {
      setLastInvalid(false);
    } else {
      setLastInvalid(true);
    }
    setLastValidValue(value);
  }

  const correctLastInput = () => {
    if (lastInvalid) {
      editPoint(lastFocusId, lastValidValue);
    }
  }

  const editInput = (id, value) => {
    setLastFocusId(id);
    let rowId = id.slice(1, id.length-1);
    let xyId = id[id.length-1];
    if (rowId === '0') {
      if (isNumeric(value)) {
        setLastInvalid(false);
        setLastValidValue(value);
        if (xyId === 'x') {
          setInputX(value);
          setValidX(true);
        } else if (xyId === 'y') {
          setInputY(value);
          setValidY(true);
        } 
      } else {
        (xyId === 'x') ? setValidX(false) : setValidY(false);
      }
    } else if (value.length == 0) {
        setLastInvalid(false);
        setLastValidValue(0);
        editPoint(id, value);
    } else if (isNumeric(value)) {
        setLastInvalid(false);
        setLastValidValue(value);
        editPoint(id, value);
    } else {
        setLastInvalid(true);
        editPoint(id, value);
    }
  }

  const addInput = (id) => {
    if (validX && validY) {
      addPoint(id, inputX, inputY);
    }
  }

  const downloadCenters = () => {
    var rawCenters = centers;
    var csvContent = "data:text/csv;charset=utf-8,";
  
    rawCenters.forEach(function(pointArray) {
      var point = pointArray.join(",");
      csvContent += point + "\r\n";
    });
    FileSaver.saveAs(csvContent, 'centers.csv');
  }

  const uploadCenters = (files) => {
    var reader = new FileReader();
    var centers = [];
    reader.onload = () => {
      var lines = reader.result.split("\n");
      var pair = null;
      for (var i=0; i<lines.length; i++) {
        pair = lines[i].split(",");
        centers.push([parseFloat(pair[0]),parseFloat(pair[1])]);
      }
      setCenters(centers);
    };
    reader.readAsText(files[0]);
  }

  const handleEdit = () => {
    setDataProcessed(false);
    setCentersTableStatus('editing');
  }


  const tableTitle = "Cluster Centers";
  var points;
  if (currIteration === 0 && currStep !== 'centering') {
    points = centers;
  } else if (currStep === 'grouping') {
    points = results[currIteration-1];
  } else if (currStep === 'centering') {
    points = results[currIteration];
  } 

  let statusClass = null;
  let tableButtons = null;
  let tableBody = [];
  let tableHead = null;

  if (centersTableStatus === "editing") {
    statusClass = "editTable";
    
    tableButtons = 
      <div className="editToolbar">
        <div>
          <ReactFileReader handleFiles={uploadCenters} fileTypes={'.csv'}>
            <button className="tableBtn">
              Upload
            </button>
          </ReactFileReader>
        </div>
        <button className="tableBtn" icon={faSave} onClick={()=>setCentersTableStatus('saved')}>
          Save
        </button>
      </div>

    tableHead = 
      <div className="table-toolbar">
        <div className="table-title">
            {tableTitle}
        </div>
        <div className="table-buttons">
            {tableButtons}
        </div>
      </div>

    tableBody.push(
      <tr key='tri'>
        <td>
          <input id={'c'+"0x"} name="inputX" className="formInput" autoComplete="off" type="text" placeholder="Enter X" 
          onChange={e=>editInput(e.target.id, e.target.value)} onKeyDown={handlePressKey}/>
        </td>
        <td>
          <input id={'c'+"0y"} name="inputY" className="formInput" autoComplete="off" type="text" placeholder="Enter Y" 
          onChange={e=>editInput(e.target.id, e.target.value)} onKeyDown={handlePressKey}/>
        </td>
        <td>
          <button id={'ca'} className="addBtn" onClick={e=>addInput(e.target.id)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </td>
      </tr>
    )
    
    for (var i=0; i<points.length; i++){
      tableBody.push(
        <tr key={'tr'+i}>
          <td>
            <input id={'c'+(i+1)+"x"} className="formInput" autoComplete="off" type="text" value={points[i][0]} 
            onChange={e=>editInput(e.target.id, e.target.value)} 
            onKeyDown={handlePressKey} onFocus={initializeValidValue} onBlur={correctLastInput}/>
          </td>
          <td>
            <input id={'c'+(i+1)+"y"} className="formInput" autoComplete="off" type="text" value={points[i][1]} 
            onChange={e=>editInput(e.target.id, e.target.value)} 
            onKeyDown={handlePressKey} onFocus={initializeValidValue} onBlur={correctLastInput}/>
          </td>
          <td>
            <button id={'cr'+i} className="delBtn" onClick={e=>deletePoint(e.target.id)}> 
              <FontAwesomeIcon icon={faMinus} />
            </button>
          </td>
        </tr>
      );
    }
    for (let i=0; i<Math.max(0, 7-points.length); i++){
      tableBody.push(
          <tr key={'tre'+i} style={{lineHeight: '30px'}}>
              <td style={{background: '#e8e8e8'}}>{'...'}</td>
              <td style={{background: '#e8e8e8'}}>{'...'}</td>
              <td> </td>
          </tr>
      );
    }

  } else if (centersTableStatus === "saved") {
      statusClass = "savedCentersTable";
      tableButtons =       
        <div className="savedToolbar">
          <button className="tableBtn" icon={faDownload} onClick={downloadCenters}>
            Download
          </button>
          <button className="tableBtn" icon={faEdit} onClick={()=>handleEdit()}>
            Edit
          </button>
        </div>
      tableBody.push(
      <tr key='trt'>
        <td>X</td>
        <td>Y</td>
        <td></td>
      </tr>
      );
      for (var i=0; i<points.length; i++){
        tableBody.push(
          <tr key={'tr'+i} >
            <td>
              {points[i][0].toFixed(10)}
            </td>
            <td>
              {points[i][1].toFixed(10)}
            </td>
            <td>
              <Colorpicker style={{position: 'relative', zIndex:10}} id={i} color={colors[i]}/>
            </td>
          </tr>
        );
      }
      for (let i=0; i<Math.max(0, 7-points.length); i++){
        tableBody.push(
            <tr style={{lineHeight: '30px'}}>
                <td style={{background: '#e8e8e8'}}>{'...'}</td>
                <td style={{background: '#e8e8e8'}}>{'...'}</td>
                <td> </td>
            </tr>
        );
      }
  }
  
  
  return (
    <div className="scrollbar-wrap">
      <div className="table-container" id={'centersTable'}>        
        <div className="table-toolbar">
          <div className="table-title">
              {tableTitle}
          </div>
          <div className="table-buttons">
              {tableButtons}
          </div>
        </div>
        <div className="table-body">
          <table className={statusClass}>
            <tbody>
              {tableBody}
            </tbody>
          </table>
        </div>
      </div>
      <div className='cover-bar'></div>
    </div>
  );
}

// Must export!
export default Centerstable;