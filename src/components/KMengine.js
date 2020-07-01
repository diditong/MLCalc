import React, {useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faEdit, faMinus, faPlus, faRedo, faPlay, faStepForward, faStepBackward, faFastBackward, faFastForward, faEye, faKey } from '@fortawesome/free-solid-svg-icons'
import {ClusteringContext} from './ClusteringContext';


const KMengine = () => {

  const {computeNextIteration, accessPrevIteration} = useContext(ClusteringContext);
  
  return (
    <div className="outer-menu">
      <div className="bar">
        <ul>
          <li title="Restart" data-title="Start Over"> 
            <FontAwesomeIcon icon={faRedo} />
          </li>
          <li title="Autoplay" data-title="Autoplay"> 
            <FontAwesomeIcon icon={faPlay} />
          </li>
          <li title="Prev. Step" data-title="Prev. Step">
            <FontAwesomeIcon icon={faStepBackward} />
          </li>
          <li title="Next Step" data-title="Next Step"> 
            <FontAwesomeIcon icon={faStepForward} />
          </li>
          <li title="Prev. Iter." data-title="Prev. Iter.">
            <FontAwesomeIcon icon={faFastBackward} onClick={accessPrevIteration}/>
          </li>
          <li title="Next Iter." data-title="Next Iter." onClick={computeNextIteration}>
            <FontAwesomeIcon icon={faFastForward} />
          </li>
          <li title="Final Result" data-title="Final Result">
            <FontAwesomeIcon icon={faKey} />
          </li>
          <li title="View" data-title="View">
              <FontAwesomeIcon icon={faEye} />
              <ul>
                  <li data-title="Hide Shadows">
                    <FontAwesomeIcon icon={faEye} />
                  </li>
                  <li data-title="Hide Lines">
                    <FontAwesomeIcon icon={faEye} />
                  </li>
              </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}


// Must export!
export default KMengine;

