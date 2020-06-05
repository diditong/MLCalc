redraw () {
    var xu = -Math.floor(cY/gS);
    var xd = Math.floor((H-cY)/gS);
    var yl = -Math.floor(cX/gS);
    var yr = Math.floor((W-cX)/gS);
    
    var lines = '';
    var ticks = '';

    for (i=xu; i<=xd; i++) {
        var y = cY + i*gS;
        if (i % nS == 0){
            var line = `<line class='x-grids' x1='0' y1=${y} x2=${W} y2=${y} stroke-width='0.5' stroke='#666666'/>`;
            if (i != 0) {
                var yval = co*Math.pow(10,exp)*(-i/nS);
                if (Math.abs(exp) >= 6){
                    yval = yval.toExponential();
                }
                var ytick = `<text x=${cX-3} y=${y+3} fill='black' font-size='6pt' text-anchor='end' font-family="math">${yval}</text>`
            }
        }
        else {
            var line = `<line class='x-grids' x1='0' y1=${y} x2=${W} y2=${y} stroke-width='0.5' stroke='#CCCCCC'/>`;
        }
        lines += line;
        ticks += ytick;
    }

    for (i=yl; i<=yr; i++) {
        var x = cX + i*gS;
        if (i % nS == 0){
            var line = `<line class='x-grids' x1=${x} y1=0 x2=${x} y2=${H} stroke-width='0.5' stroke='#666666'/>`;
            if (i != 0) {
                var xval = co*Math.pow(10,exp)*(i/nS);
                if (Math.abs(exp) >= 6){
                    xval = xval.toExponential();
                }
                var xtick = `<text x=${x} y=${cY+8} fill='black' font-size='6pt' text-anchor='middle' font-family="math">${xval}</text>`
            }
        }
        else {
            var line = `<line class='x-grids' x1=${x} y1=0 x2=${x} y2=${H} stroke-width='0.5' stroke='#CCCCCC'/>`;
        }
        lines += line;
        ticks += xtick;
    }

    var xaxis = `<line id='x-axis' x1='0' y1=${cY} x2=${W} y2=${cY} stroke-width='1' stroke='black'/>`;
    var yaxis = `<line id='y-axis' x1=${cX} y1=0 x2=${cX} y2=${H} stroke-width='1' stroke='black'/>`;
    var otick = `<text x=${cX-3} y=${cY+8} fill='black' font-size='6pt' text-anchor='end' font-family="math">${0}</text>`
    
    lines += xaxis+yaxis;
    ticks += otick;
    grids.innerHTML = lines+ticks;
  }



  for (var i=this.state.yl; i<=this.state.yr; i++) {
    var x = this.state.cX + i*this.state.gS;
    if (i % this.state.nS == 0){
        var line = <line class='x-grids' x1={this.state.x} y1=0 x2={this.state.x} y2={this.state.H} stroke-width='0.5' stroke='#666666'/>;
        if (i != 0) {
            var xval = co*Math.pow(10,this.state.exp)*(i/this.state.nS);
            if (Math.abs(this.state.exp) >= 6){
                xval = xval.toExponential();
            }
            var xtick = <text x={this.state.x} y={this.state.cY+8} fill='black' font-size='6pt' text-anchor='middle' font-family="math">{xval}</text>;
        }
    }
    else {
        var line = <line class='x-grids' x1={this.state.x} y1=0 x2={this.state.x} y2={this.state.H} stroke-width='0.5' stroke='#CCCCCC'/>;
    }
    lines += line;
    ticks += xtick;
}