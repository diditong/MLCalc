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
          <XYcoord/>
        );
      case ('GM'):
        return (
          <XYcoord/>
        );
      case ("LR"): 
        return (
          <XYcoord/>
        );
      case ("LogR"): 
        return (
          <XYcoord/>
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