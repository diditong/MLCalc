import React, {useState, useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faUpload, faDownload, faEdit, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import FileSaver from 'file-saver';
import ReactFileReader from 'react-file-reader';
import {ClusteringContext} from "./ClusteringContext"

const Datatable = () => {

  const {data, dataTableStatus, setDataTableStatus, editPoint, deletePoint} 
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
    let inputLength = (data.length).toString();

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

  const addInput = (type) => {
    if (validX && validY) {
      //addPoint(inputX, inputY);
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
    //clearPoints();
    var reader = new FileReader();
    var data = [];
    reader.onload = function () {
      var lines = reader.result.split("\n");
      var pair = null;
      for (var i=0; i<lines.length; i++) {
        pair = lines[i].split(",");
        data.push([parseFloat(pair[0]),parseFloat(pair[1])]);
      }
    };
    reader.readAsText(files[0]);
  }


  const status = dataTableStatus;
  const tableTitle = "Data Points";
  const points = data;

  let statusClass = null;
  let tableButtons = [];
  let tableBody = [];
  let tableHead = null;
  if (status === "edit") {
    statusClass = "editTable";
    
    tableButtons.push(
      <ReactFileReader handleFiles={uploadData} fileTypes={'.csv'}>
        <FontAwesomeIcon className="tableBtn" icon={faUpload} />
      </ReactFileReader>
    );
    tableButtons.push(<FontAwesomeIcon className="tableBtn" icon={faCheckSquare} onClick={()=>setDataTableStatus('check')}/>);
    tableHead = 
      <tr>
        <th colspan="1" className="table-title">
          {tableTitle}
        </th>
        <th colspan="2" className="special">
          {tableButtons}
        </th>
      </tr>
    tableBody.push(
      <tr>
        <td>
          <input id={'d'+"0x"} name="inputX" className="formInput" autoComplete="off" type="text" placeholder="Enter X" 
          onChange={e=>editInput(e.target.id, e.target.value)} onKeyDown={navigateTable}/>
        </td>
        <td>
          <input id={'d'+"0y"} name="inputY" className="formInput" autoComplete="off" type="text" placeholder="Enter Y" 
          onChange={e=>editInput(e.target.id, e.target.value)} onKeyDown={navigateTable}/>
        </td>
        <td>
          <FontAwesomeIcon icon={faPlus} className="addBtn" onClick={addInput}/>
        </td>
      </tr>
    )
    
    for (var i=0; i<points.length; i++){
      tableBody.push(
        <tr key={'tr'+i}>
          <td>
            <input id={'d'+(i+1)+"x"} className="formInput" autoComplete="off" type="text" value={points[i][0]} 
            onChange={e=>editInput(e.target.id, e.target.value)} 
            onKeyDown={navigateTable} onFocus={initializeValidValue} onBlur={correctLastInput}/>
          </td>
          <td>
            <input id={'d'+(i+1)+"y"} className="formInput" autoComplete="off" type="text" value={points[i][1]} 
            onChange={e=>editInput(e.target.id, e.target.value)} 
            onKeyDown={navigateTable} onFocus={initializeValidValue} onBlur={correctLastInput}/>
          </td>
          <td>
            <FontAwesomeIcon icon={faMinus} id={'del'+i} className="delBtn" onClick={e=>deletePoint(e.target.id)}/>
          </td>
        </tr>
      );
    }
  } else if (status === "check") {
      statusClass = "checkTable";
      tableButtons.push(<FontAwesomeIcon className="tableBtn" icon={faDownload} onClick={downloadData}/>);
      tableButtons.push(<FontAwesomeIcon className="tableBtn" icon={faEdit} onClick={()=>setDataTableStatus('edit')}/>)
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
    <div className="table-container" id={'dataTable'}>        
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

/*
    editX = editX.bind(this);
    editY = editY.bind(this);
    addXY = addXY.bind(this);
    isNumeric = isNumeric.bind(this);
    navigateTable = navigateTable.bind(this);
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