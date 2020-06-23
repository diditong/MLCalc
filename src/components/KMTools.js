import React from 'react';

import KMengine from './KMengine.js'
import Datatable from './Datatable'
import Centertable from './Centertable'

function KMTools (props) {
  return (
    <div id='KMTools'>
      <KMengine data={props.data} centers={props.centers} results={props.results} 
      updateResults={props.updateResults} setIteration={props.setIteration} currIteration={props.currIteration}/> 
      <Datatable tableType="data" data={props.data} addPoint={props.addPoint} deletePoint={props.deletePoint} editPoint={props.editPoint} clearPoints={props.clearPoints}/>
      <br />
      <Centertable tableType="center" centers={props.centers} results={props.results} currIteration={props.currIteration} addPoint={props.addPoint} deletePoint={props.deletePoint} editPoint={props.editPoint} resetEngine={props.resetEngine} clearPoints={props.clearPoints}/>
    </div>
  );
}

// Must export!
export default KMTools;