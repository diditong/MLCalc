import React, {useContext} from 'react';
import XYcoord from './XYcoord'
import {AppContext} from '../AppContext'
import {ClusteringContextProvider} from "./ClusteringContext"


const Canvas = () => {
  const {module, setModule} = useContext(AppContext);

  const canvasSwitch = (mod) => {
    switch(mod) {
      case ('KM'):
        return (
          <ClusteringContextProvider>
            <XYcoord/>;
          </ClusteringContextProvider>
        );
      case ('GM'):
        return (
          <ClusteringContextProvider>
            <XYcoord/>;
          </ClusteringContextProvider>
        );
      case ("LR"): 
        return (
          <ClusteringContextProvider>
            <XYcoord/>;
          </ClusteringContextProvider>
        );
      case ("LogR"): 
        return (
          <ClusteringContextProvider>
            <XYcoord/>;
          </ClusteringContextProvider>
        );
      case ("BN"): 
        return <h1> Fill me with BN </h1>;
      case ("HM"):
        return <h1> Fill me with HM </h1>;
      case ("FG"):
        return <h1> Fill me with FG </h1>;
    }
  }

  return (
    canvasSwitch(module)
  );
}
// Must export!
export default Canvas;