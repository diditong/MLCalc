import React, {useContext, useEffect} from 'react';
import Sidebar from './Sidebar.js';
import Canvas from './Canvas.js';
import { AppContext } from "../AppContext";
import { ClusteringContextProvider } from "./ClusteringContext"

function Calc () {
	const {calcHeight, setCalcHeight} = useContext(AppContext);

	const columnStyle = {
		float: 'left',
		padding: '0px',
		height: '100%',
		height: calcHeight
  }
  
  const leftStyle = {
		width: '25%',
		overflow: 'auto',
		boxShadow: '-6px -5px 5px 5px #333',
		position: 'relative'
  }

  const rightStyle = {
		width: '75%',
	}
	
	useEffect(() => {
    function handleResize () {
      setCalcHeight(window.innerHeight-57);
    };
    window.addEventListener('resize', handleResize);
  });

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