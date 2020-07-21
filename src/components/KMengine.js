import React, {useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrochip, faCheckSquare, faEdit, faMinus, faPlus, faRedo, faPlay, faStepForward, faStepBackward, faFastBackward, faFastForward, faEye, faEyeSlash, faKey } from '@fortawesome/free-solid-svg-icons'
import {ClusteringContext} from './ClusteringContext';

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

  const viewButton = (boundaryState) ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />;

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
      
    }

  }

  return (
    <div className="outer-menu">
      <div className="bar">
        <ul>
          <li id="1" title="Process" data-title="Process" onClick={showEffect}> 
            <FontAwesomeIcon icon={faMicrochip} />
          </li>    
          <li id="2" title="Restart" data-title="Start Over" onClick={pressButton}> 
            <FontAwesomeIcon icon={faRedo} />
          </li>
          <li id="3" title="Autoplay" data-title="Autoplay" onClick={pressButton}> 
            <FontAwesomeIcon icon={faPlay} />
          </li>
          <li id="4" title="Prev. Step" data-title="Prev. Step" onClick={pressButton}>
            <FontAwesomeIcon icon={faStepBackward}/>
          </li>
          <li id="5" title="Next Step" data-title="Next Step" onClick={pressButton}> 
            <FontAwesomeIcon icon={faStepForward}/>
          </li>
          <li id="6" title="Prev. Iter." data-title="Prev. Iter." onClick={pressButton}>
            <FontAwesomeIcon icon={faFastBackward}/>
          </li>
          <li id="7" title="Next Iter." data-title="Next Iter." onClick={pressButton}>
            <FontAwesomeIcon icon={faFastForward} />
          </li>
          <li id="8" title="Final Result" data-title="Final Result" onClick={pressButton}>
            <FontAwesomeIcon icon={faKey} />
          </li>
          <li id="9" title="View" data-title="Show Bdry." onClick={pressButton}>
            {viewButton}
          </li>
        </ul>
      </div>
    </div>
  );
}


// Must export!
export default KMengine;

