import React, { useState } from "react";

export const AppContext = React.createContext();
export const AppContextProvider = props => {
  const [module, setModule] = useState('KM');
  const [language, setLanguage] = useState('en');
  const [calcHeight, setCalcHeight] = useState(window.innerHeight-56);

  const value = {module, setModule, 
                language, setLanguage, 
                calcHeight, setCalcHeight};
  
  return (
    <AppContext.Provider 
      value={value}>
      {props.children}
    </ AppContext.Provider>
  );
}; 