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
          <li data-title="Start Over"> 
            <FontAwesomeIcon icon={faRedo} />
          </li>
          <li data-title="Autoplay"> 
            <FontAwesomeIcon icon={faPlay} />
          </li>
          <li data-title="Prev. Step">
            <FontAwesomeIcon icon={faStepBackward} />
          </li>
          <li data-title="Next Step"> 
            <FontAwesomeIcon icon={faStepForward} />
          </li>
          <li data-title="Prev. Iter.">
            <FontAwesomeIcon icon={faFastBackward} onClick={accessPrevIteration}/>
          </li>
          <li data-title="Next Iter." onClick={computeNextIteration}>
            <FontAwesomeIcon icon={faFastForward} />
          </li>
          <li data-title="Final Result">
            <FontAwesomeIcon icon={faKey} />
          </li>
          <li data-title="View">
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

