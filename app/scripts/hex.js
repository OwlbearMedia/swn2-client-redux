var React = require('react');

var Hex = React.createClass({
    render: function() {
        return(
            // Width is set as an inline style because I wanted the size of the hex to be controlled via JS rather than CSS
            <svg className="hex-container" onClick={this.highlight} x={this.props.x} y={this.props.y} style={{width: this.props.radius * 2 + 'px'}}>
                <polygon className="hex" points={this.hexPoints(this.props.radius)}></polygon>
                <text x={this.props.radius} y={21}>
                    {this.getHexNumber()}
                </text>
            </svg>
        );
    },

    highlight: function() {
        console.log(this.getHexNumber());
    },

    getHexNumber: function() {
        return pad(this.props.column) + pad(this.props.row);
        
        function pad(n) {
            return (n < 10) ? ('0' + n) : n;
        }
    },

    hexPoints: function(radius) {
        var points = [];

        for (var theta = 0; theta < Math.PI * 2; theta += Math.PI / 3) {
            var pointX = Math.round(radius + radius * Math.cos(theta)),
                pointY = Math.round(radius + radius * Math.sin(theta));
            
            points.push(pointX + ',' + pointY);
        }

        return points.join(' ');
    }
});

module.exports = Hex;