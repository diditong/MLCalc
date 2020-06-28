import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faEdit, faMinus, faPlus, faRedo, faPlay, faStepForward, faStepBackward, faFastBackward, faFastForward, faEye, faKey } from '@fortawesome/free-solid-svg-icons'

const KMengine = () => {
  return (
    <div className="outer-menu">
      <div className="bar">
        <ul>
          <li data-title="Start Over"> 
            <FontAwesomeIcon icon={faRedo} />
          </li>
          <li data-title="Autoplay"> 
            <FontAwesomeIcon icon={faPlay} />
          </li>
          <li data-title="Prev. Step">
            <FontAwesomeIcon icon={faStepBackward} />
          </li>
          <li data-title="Next Step"> 
            <FontAwesomeIcon icon={faStepForward} />
          </li>
          <li data-title="Prev. Iter.">
            <FontAwesomeIcon icon={faFastBackward} />
          </li>
          <li data-title="Next Iter.">
            <FontAwesomeIcon icon={faFastForward} />
          </li>
          <li data-title="Final Result">
            <FontAwesomeIcon icon={faKey} />
          </li>
          <li data-title="View">
              <FontAwesomeIcon icon={faEye} />
              <ul>
                  <li data-title="Hide Shadows">
                    <FontAwesomeIcon icon={faEye} />
                  </li>
                  <li data-title="Hide Lines">
                    <FontAwesomeIcon icon={faEye} />
                  </li>
              </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}


// Must export!
export default KMengine;

/*
  computeFinalResult () {
    console.log("!finalResult: ", !this.state.finalResult);
    while (!this.state.finalResult) {
      this.setState({finalResult: this.computeNextIteration()})
    }
  }
  
  computeNextStep () {
    
  }

  accessPreviousIteration () {
    if (this.props.currIteration != 0) {
      this.props.setIteration(this.props.currIteration-1);
    }
  }

  sameCenters (centers1, centers2) {
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
    //console.log("same centers, sort: ", centers1.sort(), centers2.sort());
  }

  computeNextIteration () {
    if (this.state.finalResult) {
      alert("Reached final result");
      console.log("final result: ", this.state.finalResult);
    } else {
      var data = this.props.data;
      var centers = this.props.centers;
      var currIteration = this.props.currIteration;
      var results = this.props.results;
      var currCenters = null;
      if (currIteration === 0) {
        currCenters = centers;
      } else {
        currCenters = results[currIteration-1];
      }
      var currDataPoint = null;
      //console.log(currIteration, results.length);
      if (currIteration < results.length) {
        this.props.setIteration(this.props.currIteration+1);
      } else {
        var finalResult = false;
        var newCenters = [];
        var dictForUpdateResultss = {};
        for (var i=0; i<currCenters.length; i++) {
          dictForUpdateResultss[i] = [];
        }
        for (var i=0; i<data.length; i++) {
          currDataPoint = data[i];
          var minDistance = Number.MAX_VALUE;
          var minIndex = 0;
          var currDistance = null;
          for (var j=0; j<currCenters.length; j++) {
            currDistance = Math.pow((currDataPoint[0]-currCenters[j][0]),2)+Math.pow((currDataPoint[1]-currCenters[j][1]),2);
            if (currDistance < minDistance) {
              minDistance = currDistance;
              minIndex = j;
            }
          }
          dictForUpdateResultss[minIndex].push([currDataPoint[0], currDataPoint[1]]);
        }
        var values = Object.values(dictForUpdateResultss);
        //console.log(values);
        for (var i=0; i<values.length; i++) {
          var currGroup = values[i];
          var groupLength = currGroup.length;
          if (groupLength) {
            var currPoint = null;
            var xSum = 0;
            var ySum = 0;
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
          if (this.sameCenters(newCenters, centers) | this.sameCenters(newCenters, results[results.length-1])) {
            this.setState({finalResult: true});
          }
        }

        if (!finalResult) {
          this.props.updateResults(newCenters);
          this.props.setIteration(this.props.currIteration+1);  
        }
        //console.log("results are ", results);
        //console.log("final result: ", this.state.finalResult);
      } 
    }
    console.log("!finalResult: ", !this.state.finalResult);
    return this.state.finalResult;
  }
*/