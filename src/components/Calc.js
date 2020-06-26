import React, {useContext} from 'react';
import KMCalc from './KMCalc'
import { AppContext } from "../AppContext";
import { ClusteringContextProvider } from "./ClusteringContext"

function Calc () {
	const [module, setModule] = useContext(AppContext);
	const calcSwitch = (mod) => {
		switch(mod) {
			case 'KM':
				return (
					<KMCalc />
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
			default:
				return <KMCalc />;
		}
	}

  return (
		calcSwitch(module)
	);
}

// Must export!
export default Calc;