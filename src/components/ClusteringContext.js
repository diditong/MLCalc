import React, { useState, useReducer } from "react";

const initialState = {
  data: [[1,1],[-1,1],[0,0]],
  results: [],
  centers: [[1,1],[-1,1],[0,0]],
  dataTableStatus: 'edit',
  centerTableStatus: 'edit',
  currIteration: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_POINT":

    case "SET_DATATABLESTATUS":
      return {...state, dataTableStatus: action.payload};
    case "DEL_POINT":
      console.log("Reached delete point");
      let id = action.payload;
      let type = id[0];
      console.log("From del point: ", id, type);
      if (type === "d") {
        var newData = [];
        for (var i=0; i<state.data.length; i++) {
          if (("del"+i) !== id) {
            newData.push(state.data[i]);
          }
        }
        return {...state, data: newData};
      } else if (type === "c") {
        var newCenters = [];
        for (var i=0; i<state.centers.length; i++) {
          if (("del"+i) !== id) {
            newCenters.push(state.centers[i]);
          }
        }
        return {...state, centers: newCenters};
      }
    /*
    case "EDIT_POINT":
      let id = action.payload[0];
      let val = action.payload[1];
      let idx = id.slice(1,-1)-1;
      let type = id[0];
      let coord = (id[id.length-1]==='x') ? 0 : 1;
      console.log("From editPoint: ", idx, type, coord);
      if (type === "d") {
        let newData = [...state.data];
        newData[idx][coord] = val;
        return {...state, data: newData};
      } else if (type === "c") {
        let newCenters = [...state.centers];
        newCenters[idx][coord] = val;
        return {...state, centers: newCenters};
      }
      */
  }
};

export const ClusteringContext = React.createContext();
export const ClusteringContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    data: state.data,
    editPoint: (id, value) => {
      dispatch({type: 'EDIT_POINT', payload: [id, value]})
    },
    deletePoint: id => {
      dispatch({type: 'DEL_POINT', payload: id})
    },
    results: state.results,
    centers: state.centers,

    dataTableStatus: state.dataTableStatus,
    setDataTableStatus: value=>{
      dispatch({type: 'SET_DATATABLESTATUS', payload: value})
    },

    centerTableStatus: state.centerTableStatus,
    currIteration: state.currIteration,
    setCenterTableStatus: ()=>{},
  }

  //console.log("From Clustering Context, ", state.data);
  return (
    <ClusteringContext.Provider value={value}>
      {props.children}
    </ ClusteringContext.Provider>
  );
};


/*


case "CLEAR_POINT":
  return {
    data: []
  };
case "UPDATE_RESULTS":
  var newCenters = centers;
  this.setState({results: this.state.results.concat([newCenters])});
case "UPDATE_HEIGHT":
  this.setState({SVGHeight: window.innerHeight-56});
case "RESET_ENGINE":
  this.setState({results: [], currIteration: 0});
}

*/