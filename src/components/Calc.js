import React, {useContext} from 'react';
import Sidebar from './Sidebar.js';
import Canvas from './Canvas.js';
import { AppContext } from "../AppContext";
import { ClusteringContextProvider } from "./ClusteringContext"

function Calc () {
	const {calcHeight, setCalcHeight} = useContext(AppContext);
	window.addEventListener('resize', setCalcHeight(window.innerHeight-56));

	const columnStyle = {
    float: 'left',
    padding: '0px',
    height: '100%',
    flex: '1'
  }
  
  const leftStyle = {
    width: '25%',
    overflow: 'auto',
		boxShadow: '-6px 0 5px 5px #333',
		height: calcHeight
  }

  const rightStyle = {
		width: '75%',
		height: calcHeight
	}

  return (
		<ClusteringContextProvider>
			<div id='calc'>
				<div id='leftColumn' style={Object.assign({}, columnStyle, leftStyle)}>
					<Sidebar />
				</div>
				<div id='rightColumn' style={Object.assign({}, columnStyle, rightStyle)}>
					<Canvas />
				</div>
			</div>
		</ClusteringContextProvider>
	);
}

// Must export!
export default Calc;