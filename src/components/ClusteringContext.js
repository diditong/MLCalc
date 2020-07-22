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
  for (var i=0; i<100; i++) {
    r = Math.random()*5;
    t = Math.random()*360;
    randomData.push([r*Math.cos(t), r*Math.sin(t)-4]);
  }
  return randomData;
};

const generatedataColors = () => {
  let dataColors = Array.from({length:210}, ()=>'black');
  return dataColors;
}

const initialState = {
  data: generateRandomData(),
  dataColors: generatedataColors(),
  results: [],
  centers: [[-2,0],[2,0],[0,0],[0,8]],
  colors: ["#9900EF","#A4DD00","#68CCCA","#FDA1FF"],
  groups: [],
  dataTableStatus: 'editing',
  centersTableStatus: 'editing',
  currIteration: 0,
  currStep: 'initial',
  dataProcessed: false,
  boundaryState: true
};

const sameCenters = (centers1, centers2) => {
  if (centers2==null) {
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

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


const reducer = (state, action) => {
  let id = null;
  let type = null;
  switch (action.type) {
    case ("SET_DATATABLESTATUS"): {
      return {...state, dataTableStatus: action.payload};
    }
    case ("SET_CENTERSTABLESTATUS"): {
      return {...state, centersTableStatus: action.payload};
    }
    case ("DEL_POINT"): {
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
    }
    case("EDIT_POINT"): {
      id = action.payload.id;
      type = id[0];
      let value = action.payload.value;
      let idx = id.slice(1,-1)-1;
      let coord = (id[id.length-1]==='x') ? 0 : 1;
      if (type === "d") {
        let newData = [...state.data];
        newData[idx][coord] = value;
        return {...state, data: newData};
      } else if (type === "c") {
        let newCenters = [...state.centers];
        newCenters[idx][coord] = value;
        return {...state, centers: newCenters};
      }
    }
    case("ADD_POINT"): {
      id = action.payload.id;
      var inputX = parseFloat(action.payload.inputX);
      var inputY = parseFloat(action.payload.inputY);
      
      if (id === 'da') {
        return {...state, 
          data: [[inputX, inputY]].concat(state.data)};
      } else if (id === 'ca') {
        return {...state, 
          centers: [[inputX, inputY]].concat(state.centers),
          colors: [getRandomColor()].concat(state.colors)
        };
      } else {
        return {...state};
      }
    }
    case ('SET_DATA'): {
      return {...state, data: action.payload.data};
    }
    case ('SET_CENTERS'): {
      return {...state, centers: action.payload.centers};
    }
    case ("NEXT_IT"): {
      console.log("");
      let currIteration = state.currIteration;
      let maxIteration = state.results.length;
      if (currIteration === maxIteration-1) {
        alert("reached final iteration");
        return {...state};
      } else {
        return {...state, currStep: 'centering' , currIteration: state.currIteration+1};
      }
    }
    case ('PREV_IT'): {
      let currIteration = state.currIteration;
      if (currIteration !== 0){
        return {...state, currStep: 'centering' , currIteration: currIteration-1};
      } else {
        return {...state, currStep: 'grouping', currIteration: 0};
      }
    }
    case ('NEXT_STEP'): {
      let currIteration = state.currIteration;
      let maxIteration = state.results.length;
      let currStep = state.currStep;
      console.log(currIteration, currStep);
      if (currStep === 'grouping') {
        return {...state, currStep: 'centering'};
      } else if (currStep === 'centering' && currIteration === maxIteration-1) {
        alert("reached final step");
        return {...state};
      } else {
        return {...state, currStep: 'grouping', currIteration: state.currIteration+1};
      }
    }
    case ('PREV_STEP'): {
      let currIteration = state.currIteration;
      let currStep = state.currStep;
      if (currStep === 'centering') {
        return {...state, currStep: 'grouping'};
      } else if (currIteration === 0) {
        return {...state};
      } else {
        return {...state, currStep: 'centering', currIteration: state.currIteration-1};
      }
    }
    case ('INIT_COND'): {
      return {...state, currStep: 'grouping', currIteration: 0}
    }
    case ('FINAL_RESULT'): {
      return {...state, currStep: 'centering', currIteration: state.results.length-1}
    }
    case ('SET_COLORS'): {
      let id = action.payload.id;
      let newColor = action.payload.value;
      let newColors = state.colors;
      newColors[id] = newColor;
      return {...state, colors: newColors}
    }
    case ("PROC_DATA"): {
      // show the new groups
      state.currStep = 'grouping';
      state.currIteration = 0;
      let currLoop = 0;
      while (!state.dataProcessed) {
        let currCenters = (currLoop===0) ? state.centers : state.results[state.results.length-1];
        let currDataPoint = null;
        let currDistance = null;
        let minDistance = Number.MAX_VALUE;
        let minIndex = 0;
        let newGroups = [];
        for (let i=0; i<state.centers.length; i++) {
          newGroups.push([]);
        }
        for (let i=0; i<state.data.length; i++) {
          currDataPoint = state.data[i];
          minDistance = Number.MAX_VALUE;
          minIndex = 0;
          currDistance = null;
          for (let j=0; j<currCenters.length; j++) {
            currDistance = Math.pow((currDataPoint[0]-currCenters[j][0]),2)+Math.pow((currDataPoint[1]-currCenters[j][1]),2);
            if (currDistance < minDistance) {
              minDistance = currDistance;
              minIndex = j;
            }
          }
          newGroups[minIndex].push(i);
        }
        console.log(newGroups);
        state.groups.push(newGroups);

        // show the new centers
        let currData = null;
        let sumX = 0;
        let sumY = 0;
        let newCenters = [];
        let groupLength = 0;
        let currGroups = state.groups[state.groups.length-1];
        currGroups.forEach((group) => {
          sumX = 0;
          sumY = 0;
          groupLength = group.length;
          group.forEach((idx) => {
            sumX += state.data[idx][0];
            sumY += state.data[idx][1];
          });
          newCenters.push([sumX/groupLength, sumY/groupLength]);
        });


        // Check if convergence is reached
        if ((currLoop === 0) && (sameCenters(newCenters, state.centers))) {
          state.groups = [];
          currLoop += 1;
          state.dataProcessed = true;
        } else if (sameCenters(newCenters, state.results[state.results.length-1])) {
          state.groups.pop(); //pop the redundant group
          currLoop += 1;
          state.dataProcessed = true;
        } else {
          state.results.push(newCenters); 
          currLoop += 1;
        }
      }
      
      console.log(state.results, state.groups);
      return {...state};
    }
    case ("SET_BDRY"): {
      const newState = (state.boundaryState) ? false : true;
      return {...state, boundaryState: newState};
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
    dataColors: state.dataColors,
    addPoint: (id, inputX, inputY) => {
      dispatch({type: 'ADD_POINT', payload: {id:id, inputX:inputX, inputY:inputY}})
    },
    editPoint: (id, value) => {
      dispatch({type: 'EDIT_POINT', payload: {id:id, value:value}})
    },
    deletePoint: id => {
      dispatch({type: 'DEL_POINT', payload: {id:id}})
    },
    setData: data => {
      dispatch({type: 'SET_DATA', payload: {data:data}})
    },

    results: state.results,
    centers: state.centers,
    colors: state.colors,
    groups: state.groups,
    setColors: (id, value)=>{
      dispatch({type: 'SET_COLORS', payload: {id:id, value: value}})
    },
    
    dataTableStatus: state.dataTableStatus,
    setDataTableStatus: value=>{
      dispatch({type: 'SET_DATATABLESTATUS', payload: value})
    },

    centersTableStatus: state.centersTableStatus,
    setCentersTableStatus: value=>{
      dispatch({type: 'SET_CENTERSTABLESTATUS', payload: value})
    },
    setCenters: centers=>{
      dispatch({type:'SET_CENTERS', payload: centers})
    },

    dataProcessed: state.dataProcessed,
    setdataProcessed: value=>{
      dispatch({type: 'SET_dataProcessed', payload: value})
    },

    currIteration: state.currIteration,
    showNextIteration: () => {
      dispatch({type: 'NEXT_IT', payload: null})
    },
    showPrevIteration: () => {
      dispatch({type: 'PREV_IT', payload: null})
    },
    
    currStep: state.currStep,
    showNextStep: () => {
      dispatch({type: 'NEXT_STEP', payload: null})
    },
    showPrevStep: () =>  {
      dispatch({type: 'PREV_STEP', payload: null})
    },
    showInitialCondition: () =>  {
      dispatch({type: 'INIT_COND', payload: null})
    },
    showFinalResult: () =>  {
      dispatch({type: 'FINAL_RESULT', payload: null})
    },

    processData: () => {
      dispatch({type: 'PROC_DATA', payload: null})
    },

    boundaryState: state.boundaryState,
    setBoundaryState: () => {
      dispatch({type: 'SET_BDRY', payload: null})
    }
  }

  return (
    <ClusteringContext.Provider value={value}>
      {props.children}
    </ ClusteringContext.Provider>
  );
};


/*
  showdataProcessed () {
    while (!this.state.dataProcessed) {
      this.setState({dataProcessed: this.showNextIteration()})
    }
  }
  





*/