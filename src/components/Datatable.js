import React, {useState, useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faUpload, faDownload, faEdit, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import FileSaver from 'file-saver';
import ReactFileReader from 'react-file-reader';
import {ClusteringContext} from "./ClusteringContext"
import { Tooltip } from '@material-ui/core';


const Datatable = () => {

  const {data, setData, dataTableStatus, setDataTableStatus, addPoint, editPoint, deletePoint} 
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
      let toAdd = (id.slice(0,2) === 'd0') ? addInput('da') : null;
    } else if (key === keys.delete) {
      event.preventDefault();
      let toDel = (id.slice(0,2) !== 'd0') ? deletePoint('dr'+(id[1]-1)) : null;
    } else {
      let typeId = id[0];
      let rowId = id.slice(1, id.length-1);
      let colId = id[id.length-1];
      let newId = id;
      let start = null;
      let end = null;
      let newInput = null;
      let inputLength = (data.length).toString();
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
    console.log("addInput: ", id, validX, validY, inputX, inputY);
    if (validX && validY) {
      addPoint(id, inputX, inputY);
      let firstInput = document.getElementById('d0x');
      firstInput.focus();
    }
  }

  const downloadData = () => {
    var rawData = data;
    var csvContent = "data:text/csv;charset=utf-8,";
  
    rawData.forEach(function(pointArray) {
      var point = pointArray.join(",");
      csvContent += point + "\r\n";
    });
    FileSaver.saveAs(csvContent, 'data.csv');
  }

  const uploadData = (files) => {
    var reader = new FileReader();
    var data = [];
    reader.onload = () => {
      var lines = reader.result.split("\n");
      var pair = null;
      for (var i=0; i<lines.length; i++) {
        pair = lines[i].split(",");
        data.push([parseFloat(pair[0]),parseFloat(pair[1])]);
      }
      setData(data);
    };
    reader.readAsText(files[0]);
  }

  const status = dataTableStatus;
  const tableTitle = "Data Points";
  const points = data;

  let statusClass = null;
  let tableButtons = null;
  let tableBody = [];
  let tableHead = null;

  if (status === "editing") {
    statusClass = "editTable";
    
    tableButtons = 
      <div className="editToolbar">
        <div>
          <ReactFileReader handleFiles={uploadData} fileTypes={'.csv'}>
            <button className="tableBtn">
              Upload
            </button>
          </ReactFileReader>
        </div>
        <button className="tableBtn" icon={faSave} onClick={()=>setDataTableStatus('saved')}>
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
          <input id={'d0x'} name="inputX" className="formInput" autoComplete="off" type="text" placeholder="Enter X" 
          onChange={e=>editInput(e.target.id, e.target.value)} onKeyDown={handlePressKey}/>
        </td>
        <td>
          <input id={'d0y'} name="inputY" className="formInput" autoComplete="off" type="text" placeholder="Enter Y" 
          onChange={e=>editInput(e.target.id, e.target.value)} onKeyDown={handlePressKey}/>
        </td>
        <td>
          <button id={'da'} className="addBtn" onClick={e=>addInput(e.target.id)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </td>
      </tr>
    )
    
    for (var i=0; i<points.length; i++){
      tableBody.push(
        <tr key={'tr'+i}>
          <td>
            <input id={'d'+(i+1)+"x"} className="formInput" autoComplete="off" type="text" value={points[i][0]} 
            onChange={e=>editInput(e.target.id, e.target.value)} 
            onKeyDown={handlePressKey} onFocus={initializeValidValue} onBlur={correctLastInput}/>
          </td>
          <td>
            <input id={'d'+(i+1)+"y"} className="formInput" autoComplete="off" type="text" value={points[i][1]} 
            onChange={e=>editInput(e.target.id, e.target.value)} 
            onKeyDown={handlePressKey} onFocus={initializeValidValue} onBlur={correctLastInput}/>
          </td>
          <td>
            <button id={'dr'+i} className="delBtn" onClick={e=>deletePoint(e.target.id)}> 
              <FontAwesomeIcon icon={faMinus} />
            </button>
          </td>
        </tr>
      );
    }
  } else if (status === "saved") {
      statusClass = "savedDataTable";
      tableButtons =       
      <div className="savedToolbar">
        <button className="tableBtn" icon={faDownload} onClick={downloadData}>
          Download
        </button>
        <button className="tableBtn" icon={faEdit} onClick={()=>setDataTableStatus('editing')}>
          Edit
        </button>
      </div>
      
      tableBody.push(
      <tr key='trt'>
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
    <div className="scrollbar-wrap">
      <div className="table-container" id={'dataTable'}>        
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

/*
    editX = editX.bind(this);
    editY = editY.bind(this);
    addXY = addXY.bind(this);
    isNumeric = isNumeric.bind(this);
    handlePressKey = handlePressKey.bind(this);
    correctLastInput = correctLastInput.bind(this);
    initializeValidValue = initializeValidValue.bind(this);
    downloadData = downloadData.bind(this);
    uploadData = uploadData.bind(this);
    state = {inputX: '', inputY: '', validX: false, validY: false, 
              lastInvalid: false, lastValidValue: null, lastFocusId: null
              };
*/


// Must export!
export default Datatable;