

class Sidebar extends React.Component {
    constructor (props) {
      super(props);
      this.state = {selected: "KM"};
    }
    render () {
      const selected = this.props.selected;
      var tools = undefined;
      if (selected === "KM") {
        tools = <KMTools data={this.props.data} centers={this.props.centers} results={this.props.results}
                addPoint={this.props.addPoint} deletePoint={this.props.deletePoint} 
                editPoint={this.props.editPoint} updateResults={this.props.updateResults}
                currIteration={this.props.currIteration} setIteration={this.props.setIteration} 
                resetEngine={this.props.resetEngine} clearPoints={this.props.clearPoints}
                dataTableStatus={this.props.dataTableStatus} centerTableStatus={this.props.centerTableStatus}/>; 
      } else if (selected === "GM") {
        tools = <h1> I'm GM </h1>;
      } else if (selected === "LR") {
        tools = <h1> I'm LR </h1>;
      } else if (selected === "LogR") {
        tools = <h1> I'm LogR </h1>;
      } else if (selected === "BN") {
        tools = <h1> I'm BN </h1>;
      } else if (selected === "HM") {
        tools = <h1> I'm HM </h1>;
      } else if (selected === "FG") {
        tools = <h1> I'm FG </h1>;
      } else {
        tools = <h1> I'm Nothing </h1>;
      }
      return (
        tools
      );
    }
  }