import React, {useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrochip, faCheckSquare, faEdit, faMinus, faPlus, faRedo, faPlay, faStepForward, faStepBackward, faFastBackward, faFastForward, faEye, faEyeSlash, faKey } from '@fortawesome/free-solid-svg-icons'
import {ClusteringContext} from './ClusteringContext';
import { Tooltip, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
    marginTop: theme.spacing(0),
    },
  },
}));


const KMengine = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState("");
  const [message, setMessage] = React.useState("");
  const {dataProcessed, dataTableStatus, centersTableStatus, processData, autoPlay, showInitialCondition, showNextStep, showPrevStep, showNextIteration, showPrevIteration, showFinalResult, boundaryState, setBoundaryState} = useContext(ClusteringContext);
  
  const toggleEyeButton = () => {
    if (boundaryState) {
      setBoundaryState(false);
    } else {
      setBoundaryState(true);
    }
  }

  const handleProcessData = () => {
    //console.log(dataTableStatus, centersTableStatus);
    let type = null;
    let message = null;
      console.log("From KM Engine: dataProcessed? ", dataProcessed);
    if (dataProcessed) {
      type = 'success';
      message = 'Data is already processed!';
    } else if (dataTableStatus === 'saved' && centersTableStatus === 'saved') {  
      type = 'success';
      message = 'Data successfully processed!';
      processData();
    } else {
      type = 'error';
      if (dataTableStatus === 'editing' && centersTableStatus === 'editing') {
        message = <span>Please save <b>Data Points</b> & <b>Cluster Centers</b>! </span>;
      } else if (dataTableStatus === 'editing' && centersTableStatus === 'saved') {
        message = <span>Please save <b>Data Points</b>! </span>;
      } else if (dataTableStatus === 'saved' && centersTableStatus === 'editing') {
        message = <span>Please save <b>Cluster Centers</b>! </span>;
      }
    }
      setType(type);  
      setMessage(message);
      setOpen(true);
    }

  const alertBar = () => {
    return (
      <Collapse in={open}>
        <Alert severity={type}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </IconButton>
          }
        >
          {message}
        </Alert>
      </Collapse>
    );
  }

  const viewButton = (boundaryState) ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />;
  const viewButtonTitle = (boundaryState) ? "Toggle Off Boundaries" : "Toggle On Boundaries";
  
  var pressButton = (id) => {
    if (!dataProcessed) {
      setOpen(true);
      setType("error");
      setMessage(<span>Please process data first! (Click on <FontAwesomeIcon icon={faMicrochip}/>)</span>);
    }
  }
 
  return (
    <div className="outer-menu">
      {alertBar()}
      <div className="bar">
        <ul>
          <Tooltip title="Process Data" arrow> 
            <li id="1" onClick={handleProcessData}>
                <FontAwesomeIcon icon={faMicrochip} />
            </li>    
          </Tooltip>
          <Tooltip title="Show Initial Condition" arrow> 
            <li id="2" onClick={showInitialCondition}> 
              <FontAwesomeIcon icon={faRedo} />
            </li>
          </Tooltip>
          <Tooltip title="Autoplay" arrow> 
            <li id="3" onClick={autoPlay}>
              <FontAwesomeIcon icon={faPlay} />
            </li>
          </Tooltip>
          <Tooltip title="Show Previous Step" arrow> 
            <li id="4" onClick={showPrevStep}>
              <FontAwesomeIcon icon={faStepBackward}/>
            </li>
          </Tooltip>
          <Tooltip title="Show Next Step" arrow> 
            <li id="5" onClick={showNextStep}> 
              <FontAwesomeIcon icon={faStepForward}/>
            </li>
          </Tooltip>
          <Tooltip title="Show Previous Iteration" arrow> 
            <li id="6" onClick={showPrevIteration}>
              <FontAwesomeIcon icon={faFastBackward}/>
            </li>
          </Tooltip>
          <Tooltip title="Show Next Iteration" arrow> 
            <li id="7" onClick={showNextIteration}>
              <FontAwesomeIcon icon={faFastForward} />
            </li>
          </Tooltip>
          <Tooltip title="Show Final Result" arrow> 
            <li id="8" onClick={showFinalResult}>
              <FontAwesomeIcon icon={faKey} />
            </li>
          </Tooltip>
          <Tooltip title={viewButtonTitle} arrow> 
            <li id="9" onClick={toggleEyeButton}>
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



/*

*/