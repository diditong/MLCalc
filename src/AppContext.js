import React, { useState } from "react";

export const AppContext = React.createContext();
export const AppContextProvider = props => {
  const [module, setModule] = useState('KM');
  const [language, setLanguage] = useState('en');
  //const [currIteration, setCurrIteration] = useState(0);

  return (
    <AppContext.Provider 
      value={[module, setModule, language, setLanguage]}>
      {props.children}
    </ AppContext.Provider>
  );
}; 