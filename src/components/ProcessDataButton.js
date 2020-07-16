import React, {useContext} from 'react';
import {ClusteringContext} from './ClusteringContext';
import {AppContext} from '../AppContext';


const ProcessDataButton = () => {
    const {dataTableStatus, centersTableStatus} = useContext(ClusteringContext);
    
    const showEffect = () => {
        console.log(dataTableStatus, centersTableStatus);
        if (dataTableStatus === 'editing' && centersTableStatus === 'editing') {
            alert('Both not saved');
        } else if (dataTableStatus === 'editing' && centersTableStatus === 'saved') {
            alert('Table 1 not saved');
        } else if (dataTableStatus === 'saved' && centersTableStatus === 'editing') {
            alert('Table 2 not saved');
        } else if (dataTableStatus === 'saved' && centersTableStatus === 'saved') {
            alert('Both tables saved'); 
        }
    }

    return <button className='processButton' onClick={showEffect}>Process Data</button>
}

export default ProcessDataButton;


/*
const processDataButton = () => {
    const {dataTableStatus, centersTableStatus} = useContext(ClusteringContext);
    
    const showEffect = () => {
        if (dataTableStatus === 'editing' && centersTableStatus === 'editing') {
            alert('Both not saved');
        } else if (dataTableStatus === 'editing' && centersTableStatus === 'saved') {
            alert('Table 1 not saved');
        } else if (dataTableStatus === 'saved' && centersTableStatus === 'saved') {
            alert('Table 2 not saved');
        } else if (dataTableStatus === 'saved' && centersTableStatus === 'saved') {
            alert('Both tables saved'); 
        }
    }

    return <button onClick={showEffect}> </button>
}

export default processDataButton;
*/