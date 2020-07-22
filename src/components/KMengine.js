import React, {useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrochip, faCheckSquare, faEdit, faMinus, faPlus, faRedo, faPlay, faStepForward, faStepBackward, faFastBackward, faFastForward, faEye, faEyeSlash, faKey } from '@fortawesome/free-solid-svg-icons'
import {ClusteringContext} from './ClusteringContext';
import { Tooltip, Button } from '@material-ui/core';


const KMengine = () => {
  const {dataProcessed, dataTableStatus, centersTableStatus, processData, showInitialCondition, showNextStep, showPrevStep, showNextIteration, showPrevIteration, showFinalResult, boundaryState, setBoundaryState} = useContext(ClusteringContext);
  const toggleEyeButton = () => {
    if (boundaryState) {
      setBoundaryState(false);
    } else {
      setBoundaryState(true);
    }
  }

  const showEffect = () => {
    //console.log(dataTableStatus, centersTableStatus);
    if (dataProcessed) {
      console.log("data already processed");
    } else {
      if (dataTableStatus === 'editing' && centersTableStatus === 'editing') {
          alert('Both not saved');
      } else if (dataTableStatus === 'editing' && centersTableStatus === 'saved') {
          alert('Table 1 not saved');
      } else if (dataTableStatus === 'saved' && centersTableStatus === 'editing') {
          alert('Table 2 not saved');
      } else if (dataTableStatus === 'saved' && centersTableStatus === 'saved') {  
          processData();
      }
    }
  }

  const viewButton = (boundaryState) ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />;
  const viewButtonTitle = (boundaryState) ? "Toggle Off Boundaries" : "Toggle On Boundaries";
  const pressButton = (event) => {
    if (dataProcessed) {
      var id = event.target.id;
      switch (id) {
        case '2': {
          showInitialCondition();
        }
        case '3': {
          
        }
        case '4': {
          showPrevStep();
        }
        case '5': {
          console.log("Reached show next step");
          showNextStep();
        }
        case '6': {
          showPrevIteration();
        }
        case '7': {
          showNextIteration();
        }
        case '8': {
          showFinalResult();
        }
        case '9': {
          toggleEyeButton();
        }
      }
    } else {
      console.log("not yet processed");
    }
  }

  return (
    <div className="outer-menu">
      <div className="bar">
        <ul>
          <Tooltip title="Process Data" arrow> 
            <li id="1" onClick={showEffect}>
                <FontAwesomeIcon icon={faMicrochip} />
            </li>    
          </Tooltip>
          <Tooltip title="Show Initial Condition" arrow> 
            <li id="2" onClick={pressButton}> 
              <FontAwesomeIcon icon={faRedo} />
            </li>
          </Tooltip>
          <Tooltip title="Autoplay" arrow> 
            <li id="3" onClick={pressButton}> 
              <FontAwesomeIcon icon={faPlay} />
            </li>
          </Tooltip>
          <Tooltip title="Show Previous Step" arrow> 
            <li id="4" onClick={pressButton}>
              <FontAwesomeIcon icon={faStepBackward}/>
            </li>
          </Tooltip>
          <Tooltip title="Show Next Step" arrow> 
            <li id="5" onClick={pressButton}> 
              <FontAwesomeIcon icon={faStepForward}/>
            </li>
          </Tooltip>
          <Tooltip title="Show Previous Iteration" arrow> 
            <li id="6" onClick={pressButton}>
              <FontAwesomeIcon icon={faFastBackward}/>
            </li>
          </Tooltip>
          <Tooltip title="Show Next Iteration" arrow> 
            <li id="7" onClick={pressButton}>
              <FontAwesomeIcon icon={faFastForward} />
            </li>
          </Tooltip>
          <Tooltip title="Show Final Result" arrow> 
            <li id="8" onClick={pressButton}>
              <FontAwesomeIcon icon={faKey} />
            </li>
          </Tooltip>
          <Tooltip title={viewButtonTitle} arrow> 
            <li id="9" onClick={pressButton}>
              {viewButton}
            </li>
          </Tooltip>
        </ul>
      </div>
    </div>
  );
}


// Must export!
export default KMengine;

