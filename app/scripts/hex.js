var React = require('react');

var Hex = React.createClass({
    render: function() {
        return(
            <svg className="hex-container" x={this.props.x} y={this.props.y} style={{width: this.props.radius * 2 + 'px'}}>
                <polygon className="hex" points={this.hexPoints(this.props.radius)}></polygon>
                <text x={this.props.radius} y={21}>
                    {this.pad(this.props.column) + this.pad(this.props.row)}
                </text>
            </svg>
        );
    },

    hexPoints: function(radius) {
        var points = [];

        for (var theta = 0; theta < Math.PI * 2; theta += Math.PI / 3) {
            var pointX = Math.round(radius + radius * Math.cos(theta)),
                pointY = Math.round(radius + radius * Math.sin(theta));
            
            points.push(pointX + ',' + pointY);
        }

        return points.join(' ');
    },

    pad: function(n) {
        return (n < 10) ? ('0' + n) : n;
    }
});

module.exports = Hex;