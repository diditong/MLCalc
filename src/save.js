function Switch (props) {
    const selected = props.selected;
    if (selected === "KM") {
      return <KMTools />;
    } else if (selected === "GM") {
      return <h1> I'm GM </h1>;
    } else if (selected === "LR") {
      return <h1> I'm LR </h1>;
    } else if (selected === "LogR") {
      return <h1> I'm LogR </h1>;
    } else if (selected === "BN") {
      return <h1> I'm BN </h1>;
    } else if (selected === "HM") {
      return <h1> I'm HM </h1>;
    } else if (selected === "FG") {
      return <h1> I'm FG </h1>;
    }
    return <h1> I'm Nothing </h1>;
  }