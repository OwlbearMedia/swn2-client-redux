var React = require('react');
var Hex = require('./hex');

var Sector = React.createClass({
    render: function() {
        return(
            <div>
                <h1>Sector</h1>
                <svg id="sector-map" className="sector-map" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    {this.getHexes()}
                </svg>
            </div>
        );
    },
    
    getHexes: function() {
        var hexes = []
            radius = this.props.radius,
            cols = this.props.columns,
            rows = this.props.rows;

        for (var col = 0; col < cols; col += 1) {
            for (var row = 0; row < rows; row += 1) {
                var offset = (Math.sqrt(3) * radius) / 2,
                    x = offset * col * Math.sqrt(3),
                    y = (col % 2 !== 0) ? (offset * 2 * row) + offset : (offset * 2 * row);

                hexes.push(<Hex y={y} x={x} radius={radius} row={row} column={col} key={'hex' + col + row}></Hex>);
            }
        }

        return hexes;
    }
});

module.exports = Sector;
