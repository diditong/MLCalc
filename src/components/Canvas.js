import React from 'react';
import XYcoord from './XYcoord'

class Canvas extends React.Component {
  constructor (props) {
    super(props);
    this.state = {selected: "KM"};
  }

  render () {
    const selected = this.props.selected;
    if (selected === "KM") {
      return <XYcoord data={this.props.data} centers={this.props.centers} results={this.props.results} currIteration={this.props.currIteration}/>;
    } else if (selected === "GM") {
      return <XYcoord data={this.props.data} centers={this.props.centers} results={this.props.results} currIteration={this.props.currIteration}/>;
    } else if (selected === "LR") {
      return <XYcoord data={this.props.data} centers={this.props.centers} results={this.props.results} currIteration={this.props.currIteration}/>;
    } else if (selected === "LogR") {
      return <XYcoord data={this.props.data} centers={this.props.centers} results={this.props.results} currIteration={this.props.currIteration}/>;
    } else if (selected === "BN") {
      return <h1> Fill me with BN </h1>;
    } else if (selected === "HM") {
      return <h1> Fill me with HM </h1>;
    } else if (selected === "FG") {
      return <h1> Fill me with FG </h1>;
    } else {
      return <h1> Fill me with Nothing </h1>;
    }
  }
}
  
// Must export!
export default Canvas;