import React, { useState, useReducer } from "react";

const initialState = {
  data: [[1,1],[-1,1],[0,0]],
  results: [],
  centers: [[1,1],[-1,1],[0,0]],
  dataTableStatus: 'edit',
  currIteration: 0
};

const reducer = (state, action) => {
  let id = null;
  let type = null;
  let actionType = action.type;
  switch (action.type) {
    case ("SET_DATATABLESTATUS"):
      return {...state, dataTableStatus: action.payload};
    case ("DEL_POINT"):
      id = action.payload.id;
      type = id[0];
      if (type === 'd') {
        let newData = [];
        for (var i=0; i<state.data.length; i++) {
          if (("dr"+i) !== id) {
            newData.push(state.data[i]);
          }
        }
        return {...state, data: newData};
      } else if (type === 'c') {
          let newCenters = [];
          for (var i=0; i<state.centers.length; i++) {
            if (("dr"+i) !== id) {
              newCenters.push(state.centers[i]);
            }
          }
          return {...state, centers: newCenters};
      } else {
          return {...state};
      }
    case("ADD_POINT"):
      console.log("reached add point"); 
      id = action.payload.id;
      var inputX = action.payload.inputX;
      var inputY = action.payload.inputY;
      let oldData = [...state.data];
      console.log("reached after olddata: ", id, inputX, inputY);
      if (id === 'da') {
        console.log("reached check type");
        return {...state, data: [[inputX, inputY]].concat(oldData)};
      } else if (id === 'ca') {
        return {...state, centers: [[inputX, inputY]].concat(state.centers)};
      } else {
        return {...state};
      }
    /*
    case ("CLEAR_POINTS"):
      
    case "UPDATE_RESULTS":
      var newCenters = centers;
      this.setState({results: this.state.results.concat([newCenters])});
    case "RESET_ENGINE":
      this.setState({results: [], currIteration: 0});
    */
    }
  };

export const ClusteringContext = React.createContext();
export const ClusteringContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    data: state.data,
    addPoint: (id, inputX, inputY) => {
      dispatch({type: 'ADD_POINT', payload: {id:id, inputX:inputX, inputY:inputY}})
    },
    editPoint: () => {},
    deletePoint: id => {
      dispatch({type: 'DEL_POINT', payload: {id:id}})
    },
    results: state.results,
    centers: state.centers,

    dataTableStatus: state.dataTableStatus,
    setDataTableStatus: value=>{
      dispatch({type: 'SET_DATATABLESTATUS', payload: value})
    },

    currIteration: state.currIteration
  }

  //console.log("From Clustering Context, ", state.data);
  return (
    <ClusteringContext.Provider value={value}>
      {props.children}
    </ ClusteringContext.Provider>
  );
};


/*









*/