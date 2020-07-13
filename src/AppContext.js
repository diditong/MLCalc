import React, { useState, useEffect } from "react";
import {EN, ZH} from "./Language";

export const AppContext = React.createContext();
export const AppContextProvider = props => {
  const [module, setModule] = useState('KM');
  const [language, setLanguage] = useState('en');
  const [dictionary, setDictionary] = useState(EN);
  const [calcHeight, setCalcHeight] = useState(window.innerHeight-56);

  useEffect (()=>{
    // Change the language based on user action
    switch (language) {
      case "en":
        setDictionary(EN);
      case "zh":
        console.log("Reached ZH: ", ZH);
        setDictionary(ZH);
      default:
        setDictionary(EN);
    }
    console.log("After Dictionary: ", dictionary);
  });


  const value = {module, setModule, 
                language, setLanguage, 
                calcHeight, setCalcHeight,
                dictionary};
  
  return (
    <AppContext.Provider 
      value={value}>
      {props.children}
    </ AppContext.Provider>
  );
}; 