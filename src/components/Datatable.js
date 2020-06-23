import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faUpload, faDownload, faEdit, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import FileSaver from 'file-saver';
import ReactFileReader from 'react-file-reader';

class Datatable extends React.Component {
  constructor (props) {
    super(props);
    this.state = {inputX: '', inputY: '', validX: false, validY: false, 
                  lastInvalid: false, lastValidValue: null, lastFocusId: null,
                  status: 'edit'};
    this.editX = this.editX.bind(this);
    this.editY = this.editY.bind(this);
    this.addXY = this.addXY.bind(this);
    this.isNumeric = this.isNumeric.bind(this);
    this.navigateTable = this.navigateTable.bind(this);
    this.correctLastInput = this.correctLastInput.bind(this);
    this.initializeValidValue = this.initializeValidValue.bind(this);
    this.downloadData = this.downloadData.bind(this);
    this.uploadData = this.uploadData.bind(this);
  }

  isNumeric (value) {
    return !isNaN(value);
  }

  editX (type, id, value) {
    this.setState({lastFocusId: id});
    var rowId = id.slice(1, id.length-1);
    if (rowId === '0') {
      if (this.isNumeric(value)) {
        this.setState({lastInvalid: false});
        this.setState({lastValidValue: value});
        this.setState({inputX: value, validX: true});
      } else {
        this.setState ({validX: false});
      }
    } else if (value.length == 0) {
        this.setState({lastInvalid: true});
        this.setState({lastValidValue: '0'});
        this.props.editPoint(type, id, value);
    } else if (this.isNumeric(value)) {
        this.setState({lastInvalid: false});
        this.setState({lastValidValue: value});
        this.props.editPoint(type, id, value);
    } else {
        this.setState({lastInvalid: true});
        this.props.editPoint(type, id, value);
    }
  }

  editY (type, id, value) {
    this.setState({lastFocusId: id});
    var rowId = id.slice(1, id.length-1);
    if (rowId === '0') {
      if (this.isNumeric(value)) {
        this.setState({lastInvalid: false});
        this.setState({lastValidValue: value});
        this.setState({inputY: value, validY: true});
      } else {
        this.setState ({validY: false});
      }
    } else if (value.length == 0) {

        this.setState({lastInvalid: true});
        this.setState({lastValidValue: '0'});
        this.props.editPoint(type, id, value);
    } else if (this.isNumeric(value)) {
        this.setState({lastInvalid: false});
        this.setState({lastValidValue: value});
        this.props.editPoint(type, id, value);
    } else {
        this.setState({lastInvalid: true});
        this.props.editPoint(type, id, value);
    }
    //e=>this.props.editPoint(tableType, e.target.id, e.target.value)
  }

  addXY (type) {
    if (this.state.validX && this.state.validY) {
      this.props.addPoint(type, this.state.inputX, this.state.inputY);
    }
  }

  correctLastInput () {
    if (this.state.lastInvalid) {
      this.props.editPoint(this.props.tableType, this.state.lastFocusId, this.state.lastValidValue);
    }
  }

  initializeValidValue (e) {
    var value = e.target.value;
    if (this.isNumeric(value)) {
      this.setState({lastInvalid: false});
    } else {
      this.setState({lastInvalid: true});
    }
    this.setState({lastValidValue: value});
  }

  navigateTable (event) {
    var arrow = {
      left: 37,
      up: 38,
      right: 39,
      down: 40
    };

    var input = event.target;

    var id = event.target.id;
    var typeId = id[0];
    var rowId = id.slice(1, id.length-1);
    var colId = id[id.length-1];
    var key = event.keyCode;
    var newId = id;
    var start = null;
    var end = null;
    var newInput = null;
    var inputLength = null;
    if (this.props.tableType==='data') {
      inputLength = (this.props.data.length).toString();
    } else if (this.props.tableType==='center') {
      inputLength = (this.props.centers.length).toString();
    }

    switch (key) {
      case arrow.left:
        { 
          if ((colId==='1') && (input.selectionStart==0)) { 
            newId = typeId + rowId + '0';
            newInput = document.getElementById(newId);
            start = newInput.value.length;
            end = newInput.value.length;
        }
          break;
        }
      case arrow.right:
        {
          if ((colId === '0') && (input.selectionEnd==input.value.length)) {
            newId = typeId + rowId + '1';
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

    

  uploadData = (files) => {
    this.props.clearPoints();
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


  downloadData () {
    var rawData = this.props.data;
    var csvContent = "data:text/csv;charset=utf-8,";

    rawData.forEach(function(pointArray) {
        var point = pointArray.join(",");
        csvContent += point + "\r\n";
    });
    FileSaver.saveAs(csvContent, 'data.csv');
  }

  render () {
    var tableType = this.props.tableType;
    var status =  this.state.status;
    var tableTitle = "Data Points";
    var points = this.props.data;
    var type = "p";

    var statusClass = null;
    var tableButtons = [];
    var tableBody = [];
    var tableHead = null;
    if (status === "edit") {
      statusClass = "editTable";
      
			tableButtons.push(
        <ReactFileReader handleFiles={this.uploadData} fileTypes={'.csv'}>
          <FontAwesomeIcon className="tableBtn" icon={faUpload} />
        </ReactFileReader>
      );
      tableButtons.push(<FontAwesomeIcon className="tableBtn" icon={faCheckSquare} onClick={()=>this.setState({status: "check"})}/>);
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
            <input id={type+"00"} name="inputX" className="formInput" autoComplete="off" type="text" placeholder="Enter X" 
            onChange={e=>this.editX(tableType, e.target.id, e.target.value)} onKeyDown={this.navigateTable}/>
          </td>
          <td>
            <input id={type+"01"} name="inputY" className="formInput" autoComplete="off" type="text" placeholder="Enter Y" 
            onChange={e=>this.editY(tableType, e.target.id, e.target.value)} onKeyDown={this.navigateTable}/>
          </td>
          <td>
            <FontAwesomeIcon icon={faPlus} className="addBtn" onClick={e=>this.addXY(tableType)}/>
          </td>
        </tr>
      )
      
      for (var i=0; i<points.length; i++){
        tableBody.push(
          <tr key={'tr'+i}>
            <td>
              <input id={type+(i+1)+"0"} className="formInput" autoComplete="off" type="text" value={points[i][0]} 
              onChange={e=>this.editX(tableType, e.target.id, e.target.value)} 
              onKeyDown={this.navigateTable} onFocus={this.initializeValidValue} onBlur={this.correctLastInput}/>
            </td>
            <td>
              <input id={type+(i+1)+"1"} className="formInput" autoComplete="off" type="text" value={points[i][1]} 
              onChange={e=>this.editY(tableType, e.target.id, e.target.value)} 
              onKeyDown={this.navigateTable} onFocus={this.initializeValidValue} onBlur={this.correctLastInput}/>
            </td>
            <td>
              <FontAwesomeIcon icon={faMinus} id={'d'+i} className="delBtn" onClick={(e)=>this.props.deletePoint(tableType, e.target.id)}/>
            </td>
          </tr>
        );
      }
    } else if (status === "check") {
        statusClass = "checkTable";
        tableButtons.push(<FontAwesomeIcon className="tableBtn" icon={faDownload} onClick={this.downloadData}/>);
        tableButtons.push(<FontAwesomeIcon className="tableBtn" icon={faEdit} onClick={()=>this.setState({status: "edit"})}/>)
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
      <div className="table-container" id={tableType+'Table'}>        
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
}

// Must export!
export default Datatable;