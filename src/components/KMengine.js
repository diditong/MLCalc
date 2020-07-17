import React, {useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faEdit, faMinus, faPlus, faRedo, faPlay, faStepForward, faStepBackward, faFastBackward, faFastForward, faEye, faEyeSlash, faKey } from '@fortawesome/free-solid-svg-icons'
import {ClusteringContext} from './ClusteringContext';



const KMengine = () => {
  const {showInitialCondition, showNextStep, showPrevStep, showNextIteration, showPrevIteration, showFinalResult, boundaryState, setBoundaryState} = useContext(ClusteringContext);

  const toggleEyeButton = () => {
    if (boundaryState) {
      setBoundaryState(false);
    } else {
      setBoundaryState(true);
    }
  }
  
  const viewButton = (boundaryState) ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />;

  return (
    <div className="outer-menu">
      <div className="bar">
        <ul>
          <li title="Restart" data-title="Start Over" onClick={showInitialCondition}> 
            <FontAwesomeIcon icon={faRedo} />
          </li>
          <li title="Autoplay" data-title="Autoplay"> 
            <FontAwesomeIcon icon={faPlay} />
          </li>
          <li title="Prev. Step" data-title="Prev. Step" onClick={showPrevStep}>
            <FontAwesomeIcon icon={faStepBackward}/>
          </li>
          <li title="Next Step" data-title="Next Step" onClick={showNextStep}> 
            <FontAwesomeIcon icon={faStepForward}/>
          </li>
          <li title="Prev. Iter." data-title="Prev. Iter." onClick={showPrevIteration}>
            <FontAwesomeIcon icon={faFastBackward}/>
          </li>
          <li title="Next Iter." data-title="Next Iter." onClick={showNextIteration}>
            <FontAwesomeIcon icon={faFastForward} />
          </li>
          <li title="Final Result" data-title="Final Result" onClick={showFinalResult}>
            <FontAwesomeIcon icon={faKey} />
          </li>
          <li title="View" data-title="Show Bdry." onClick={toggleEyeButton}>
            {viewButton}
          </li>
        </ul>
      </div>
    </div>
  );
}


// Must export!
export default KMengine;

