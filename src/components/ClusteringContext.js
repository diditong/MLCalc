import React, { useState, useReducer } from "react";

const generateRandomData = () => {
  let randomData = [];
  let r = null;
  let t = null;
  for (var i=0; i<60; i++) {
    r = Math.random()*5;
    t = Math.random()*360;
    randomData.push([r*Math.cos(t)+4, r*Math.sin(t)+4]);
  }
  for (var i=0; i<50; i++) {
    r = Math.random()*5;
    t = Math.random()*360;
    randomData.push([r*Math.cos(t)-4, r*Math.sin(t)+4]);
  }
  for (var i=0; i<50; i++) {
    r = Math.random()*5;
    t = Math.random()*360;
    randomData.push([r*Math.cos(t), r*Math.sin(t)-4]);
  }
  return randomData;
};

const initialState = {
  data: generateRandomData(),
  results: [],
  centers: [[2,2],[-2,2],[-2,-2]],
  dataTableStatus: 'edit',
  centersTableStatus: 'edit',
  currIteration: 0,
  finalResult: false,
};

const sameCenters = (centers1, centers2) => {
  //console.log("same centers, original: ", centers1, centers2);
  //console.log("same centers, equal: ", [1,2] === [1,2]);
  if (centers2==null) {
    console.log("reach here");
    return false;
  } else {
    var center1 = null;
    var center2 = null;
    for (var i=0; i<centers1.length; i++) {
      center1 = centers1[i];
      center2 = centers2[i];
      if (center1[0]===center2[0] && center1[1]===center2[1]) {
        return true;
      } else {
        return false;
      }
    }
  }
}

const reducer = (state, action) => {
  let id = null;
  let type = null;
  switch (action.type) {
    case ("SET_DATATABLESTATUS"):
      return {...state, dataTableStatus: action.payload};
    case ("SET_CENTERSTABLESTATUS"):
      return {...state, centersTableStatus: action.payload};
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
            if (("cr"+i) !== id) {
              newCenters.push(state.centers[i]);
            }
          }
          return {...state, centers: newCenters};
      } else {
          return {...state};
      }
    case("EDIT_POINT"):
      console.log('reached edit point');
      id = action.payload.id;
      type = id[0];
      let value = action.payload.value;
      let idx = id.slice(1,-1)-1;
      let coord = (id[id.length-1]==='x') ? 0 : 1;
      if (type === "d") {
        console.log("reached d");
        let newData = [...state.data];
        newData[idx][coord] = value;
        return {...state, data: newData};
      } else if (type === "c") {
        let newCenters = [...state.centers];
        newCenters[idx][coord] = value;
        return {...state, centers: newCenters};
      }
    case("ADD_POINT"):
      id = action.payload.id;
      var inputX = parseFloat(action.payload.inputX);
      var inputY = parseFloat(action.payload.inputY);
      let oldData = [...state.data];
      
      if (id === 'da') {
        return {...state, data: [[inputX, inputY]].concat(oldData)};
      } else if (id === 'ca') {
        return {...state, centers: [[inputX, inputY]].concat(state.centers)};
      } else {
        return {...state};
      }
    case ("NEXT_IT"):
      console.log("reached iteration");
      if (state.finalResult) {
        alert("Reached final result");
      } else {
        let data = state.data;
        let centers = state.centers;
        let currIteration = state.currIteration;
        let results = state.results;
        let currCenters = null;
        if (currIteration === 0) {
          currCenters = centers;
        } else {
          currCenters = results[currIteration-1];
        }
        let currDataPoint = null;
        //console.log(currIteration, results.length);
        if (currIteration < results.length) {
          state.currIteration += 1;
        } else {
          let finalResult = false;
          let newCenters = [];
          let dictForUpdateResults = {};
          for (var i=0; i<currCenters.length; i++) {
            dictForUpdateResults[i] = [];
          }
          for (var i=0; i<data.length; i++) {
            currDataPoint = data[i];
            let minDistance = Number.MAX_VALUE;
            let minIndex = 0;
            let currDistance = null;
            for (var j=0; j<currCenters.length; j++) {
              currDistance = Math.pow((currDataPoint[0]-currCenters[j][0]),2)+Math.pow((currDataPoint[1]-currCenters[j][1]),2);
              if (currDistance < minDistance) {
                minDistance = currDistance;
                minIndex = j;
              }
            }
            dictForUpdateResults[minIndex].push([currDataPoint[0], currDataPoint[1]]);
          }
          let values = Object.values(dictForUpdateResults);
          //console.log(values);
          for (var i=0; i<values.length; i++) {
            let currGroup = values[i];
            let groupLength = currGroup.length;
            if (groupLength) {
              let currPoint = null;
              let xSum = 0;
              let ySum = 0;
              for (var j=0; j<groupLength; j++) {
                currPoint = currGroup[j];
                xSum += currPoint[0];
                ySum += currPoint[1];
              }
              newCenters.push([xSum/groupLength, ySum/groupLength]);
            } else {
              newCenters.push(currCenters[i]);
            }
            //console.log(newCenters, results[results.length-1])
            if (sameCenters(newCenters, centers) | sameCenters(newCenters, results[results.length-1])) {
              state.finalResult = true;
            }
          }

          if (!finalResult) {
            let oldResults = [...state.results];
            state.results = oldResults.concat([newCenters]);
            state.currIteration += 1;
          }
          //console.log("results are ", results);
          //console.log("final result: ", this.state.finalResult);
        }
      }
      return {...state};
    case ('PREV_IT'):
      console.log("reached prev it");
      if (state.currIteration !== 0){
        return {...state, currIteration: state.currIteration-1};
      } else {
        return {...state}
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
    editPoint: (id, value) => {
      dispatch({type: 'EDIT_POINT', payload: {id:id, value:value}})
    },
    deletePoint: id => {
      dispatch({type: 'DEL_POINT', payload: {id:id}})
    },
    results: state.results,
    centers: state.centers,

    dataTableStatus: state.dataTableStatus,
    setDataTableStatus: value=>{
      dispatch({type: 'SET_DATATABLESTATUS', payload: value})
    },

    centersTableStatus: state.centersTableStatus,
    setCentersTableStatus: value=>{
      dispatch({type: 'SET_CENTERSTABLESTATUS', payload: value})
    },

    finalResult: state.finalResult,
    setFinalResult: value=>{
      dispatch({type: 'SET_FINALRESULT', payload: value})
    },

    currIteration: state.currIteration,
    computeNextIteration: () => {
      dispatch({type: 'NEXT_IT', payload: null})
    },
    accessPrevIteration: () => {
      dispatch({type: 'PREV_IT', payload: null})
    }
  }




  //console.log("From Clustering Context, ", state.data);
  return (
    <ClusteringContext.Provider value={value}>
      {props.children}
    </ ClusteringContext.Provider>
  );
};


/*
  computeFinalResult () {
    console.log("!finalResult: ", !this.state.finalResult);
    while (!this.state.finalResult) {
      this.setState({finalResult: this.computeNextIteration()})
    }
  }
  





*/