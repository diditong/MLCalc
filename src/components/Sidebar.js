import React, {useContext} from 'react';
import KMTools from './KMTools';
import KMengine from './KMengine';
import Datatable from './Datatable';
import Centertable from './Centertable';
import { AppContext } from "../AppContext";
import {ClusteringContextProvider} from "./ClusteringContext"


const Sidebar = () => {
  const {module, setModule} = useContext(AppContext);
  console.log("From Sidebar: ", module);
	const sidebarSwitch = (mod) => {
		switch(mod) {
			case 'KM':
				return (
          <ClusteringContextProvider>
            <div>
              <KMengine /> 
              <Datatable />
            </div>
          </ClusteringContextProvider>
        );
			case 'GM':
				//return <GMCalc />;
			case 'LR':
				//return <LRCalc />;
			case 'LogR':
				//return <LogRCalc />;
			case 'BN':
				//return <BNCalc />;
			case 'HM':
				//return <HMCalc />;
			case 'FG':
				//return <FGCalc />;

		}
  }
  
  return (
    sidebarSwitch(module)
  )
}

// Must export!
export default Sidebar;

/*
<KMengine data={props.data} centers={props.centers} results={props.results} 
              updateResults={props.updateResults} setIteration={props.setIteration} currIteration={props.currIteration}/> 
            <Datatable tableType="data" data={props.data} 
            addPoint={props.addPoint} deletePoint={props.deletePoint} 
            editPoint={props.editPoint} clearPoints={props.clearPoints} 
            dataTableStatus={props.dataTableStatus} />
            <br />
            <Centertable tableType="center" centers={props.centers} results={props.results} currIteration={props.currIteration} addPoint={props.addPoint} deletePoint={props.deletePoint} editPoint={props.editPoint} resetEngine={props.resetEngine} clearPoints={props.clearPoints} centerTableStatus={props.centerTableStatus}/>
*/