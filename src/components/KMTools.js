import React, {useContext} from 'react';


import {ClusteringContext} from './ClusteringContext.js';

const KMTools = () => {
  const [data, centers, results, currIteration,] = useContext(ClusteringContext);



  return (
    <div id='KMTools'>
      
    </div>
  );
}

// Must export!
export default KMTools;