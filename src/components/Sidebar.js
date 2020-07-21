import React, {useContext} from 'react';
import KMengine from './KMengine';
import Datatable from './Datatable';
import Centerstable from './Centerstable';
import ProcessDataButton from './ProcessDataButton';
import { AppContext } from '../AppContext';
import Colorpicker from './Colorpicker';
import {ClusteringContextProvider} from "./ClusteringContext"

const Sidebar = () => {
  const {module, setModule} = useContext(AppContext);
	const sidebarSwitch = (mod) => {
		switch(mod) {
			case 'KM': {
				return (
          <div>
            <KMengine /> 
            <Datatable />
            <Centerstable />
          </div>
        );
      }
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