import React, { useState } from "react";

export const ClusteringContext = React.createContext();
export const ClusteringContextProvider = props => {
  const [currIteration, setCurrIteration] = useState(0);
  //const [language, setLanguage] = useState('en');
  return (
    <ClusteringContext.Provider value={[currIteration, setCurrIteration]}>
      {props.children}
    </ ClusteringContext.Provider>
  );
};