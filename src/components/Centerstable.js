import React, {useState, useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faUpload, faDownload, faEdit, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import FileSaver from 'file-saver';
import ReactFileReader from 'react-file-reader';
import {ClusteringContext} from "./ClusteringContext"

const Centerstable = () => {
  const {centers, centersTableStatus, setCentersTableStatus, addPoint, editPoint, deletePoint} 
    = useContext(ClusteringContext);
  const [lastFocusId, setLastFocusId] = useState(null);
  const [lastInvalid, setLastInvalid] = useState(null);
  const [lastValidValue, setLastValidValue] = useState(null);
  const [inputX, setInputX] = useState(null);
  const [inputY, setInputY] = useState(null);
  const [validX, setValidX] = useState(null);
  const [validY, setValidY] = useState(null);

  const navigateTable = (event) => {
    const arrow = {
      left: 37,
      up: 38,
      right: 39,
      down: 40
    };
  
    let input = event.target;
  
    let id = event.target.id;
    let typeId = id[0];
    let rowId = id.slice(1, id.length-1);
    let colId = id[id.length-1];
    let key = event.keyCode;
    let newId = id;
    let start = null;
    let end = null;
    let newInput = null;
    let inputLength = (centers.length).toString();

    switch (key) {
      case arrow.left:
        { 
          if ((colId==='y') && (input.selectionStart==0)) { 
            newId = typeId + rowId + 'x';
            newInput = document.getElementById(newId);
            start = newInput.value.length;
            end = newInput.value.length;
        }
          break;
        }
      case arrow.right:
        {
          if ((colId === 'x') && (input.selectionEnd==input.value.length)) {
            newId = typeId + rowId + 'y';
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
    console.log("From addinput: ", id);
    if (validX && validY) {
      addPoint(id, inputX, inputY);
    }
  }

  const downloadCenters = () => {
    var rawCenters = centers;
    var csvContent = "centers:text/csv;charset=utf-8,";
  
    rawCenters.forEach(function(pointArray) {
        var point = pointArray.join(",");
        csvContent += point + "\r\n";
    });
    FileSaver.saveAs(csvContent, 'centers.csv');
  }

  const uploadCenters = (files) => {
    //clearPoints();
    var reader = new FileReader();
    var centers = [];
    reader.onload = function () {
      var lines = reader.result.split("\n");
      var pair = null;
      for (var i=0; i<lines.length; i++) {
        pair = lines[i].split(",");
        centers.push([parseFloat(pair[0]),parseFloat(pair[1])]);
      }
    };
    reader.readAsText(files[0]);
  }

  const tableTitle = "Centers Points";
  const points = centers;

  let statusClass = null;
  let tableButtons = [];
  let tableBody = [];
  let tableHead = null;

  if (centersTableStatus === "edit") {
    statusClass = "editTable";
    
    tableButtons.push(
      <div className="tableToolbar">
        <ReactFileReader handleFiles={uploadCenters} fileTypes={'.csv'}>
          <FontAwesomeIcon className="tableBtn" icon={faUpload} />
        </ReactFileReader>
        <FontAwesomeIcon className="tableBtn" icon={faCheckSquare} onClick={()=>setCentersTableStatus('check')}/>
      </div>
    );
    tableHead = 
      <tr>
        <th colSpan="1" className="table-title">
          {tableTitle}
        </th>
        <th colSpan="2" className="special">
          {tableButtons}
        </th>
      </tr>
    tableBody.push(
      <tr>
        <td>
          <input id={'c'+"0x"} name="inputX" className="formInput" autoComplete="off" type="text" placeholder="Enter X" 
          onChange={e=>editInput(e.target.id, e.target.value)} onKeyDown={navigateTable}/>
        </td>
        <td>
          <input id={'c'+"0y"} name="inputY" className="formInput" autoComplete="off" type="text" placeholder="Enter Y" 
          onChange={e=>editInput(e.target.id, e.target.value)} onKeyDown={navigateTable}/>
        </td>
        <td>
          <FontAwesomeIcon id={'ca'} icon={faPlus} className="addBtn" onClick={e=>addInput(e.target.id)}/>
        </td>
      </tr>
    )
    
    for (var i=0; i<points.length; i++){
      tableBody.push(
        <tr key={'tr'+i}>
          <td>
            <input id={'c'+(i+1)+"x"} className="formInput" autoComplete="off" type="text" value={points[i][0]} 
            onChange={e=>editInput(e.target.id, e.target.value)} 
            onKeyDown={navigateTable} onFocus={initializeValidValue} onBlur={correctLastInput}/>
          </td>
          <td>
            <input id={'c'+(i+1)+"y"} className="formInput" autoComplete="off" type="text" value={points[i][1]} 
            onChange={e=>editInput(e.target.id, e.target.value)} 
            onKeyDown={navigateTable} onFocus={initializeValidValue} onBlur={correctLastInput}/>
          </td>
          <td>
            <FontAwesomeIcon icon={faMinus} id={'cr'+i} className="delBtn" onClick={e=>deletePoint(e.target.id)}/>
          </td>
        </tr>
      );
    }
  } else if (centersTableStatus === "check") {
      statusClass = "checkTable";
      tableButtons.push(<FontAwesomeIcon className="tableBtn" icon={faDownload} onClick={downloadCenters}/>);
      tableButtons.push(<FontAwesomeIcon className="tableBtn" icon={faEdit} onClick={()=>setCentersTableStatus('edit')}/>)
      tableHead = 
      <tr>
        <th className="table-title">{tableTitle}</th>
        <th>
          {tableButtons}
        </th>
      </tr>
      tableBody.push(
      <tr>
        <td>X</td>
        <td>Y</td>
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
          </tr>
        );
      }
  }

  return (
    <div className="table-container" id={'centersTable'}>        
      <table className={statusClass}>
        <thead>
          {tableHead}
        </thead>
        <tbody>
          {tableBody}
        </tbody>
      </table>
    </div>
  );
}

// Must export!
export default Centerstable;