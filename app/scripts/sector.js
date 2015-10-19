var React = require('react');

var Sector = React.createClass({
    render: function() {
        return(
            <div>
                <h1>Sector</h1>
                <svg id="sector-map" className="sector-map" version="1.1"
                    xmlns="http://www.w3.org/2000/svg">
                </svg>
            </div>
        );
    },

    componentDidMount: function() {
        this.drawGrid();
    },

    // @todo: make this more React-ive
    drawGrid: function() {
        var radius = 40,
            cols = 8
            rows = 10;

        var x, y;

        function hexPoints(x, y, radius) {
            var points = [];
            for (var theta = 0; theta < Math.PI * 2; theta += Math.PI / 3) {
                var pointX, pointY;
                pointX = Math.round(x + radius * Math.cos(theta));
                pointY = Math.round(y + radius * Math.sin(theta));
                points.push(pointX + ',' + pointY);
            }
            return points.join(' ');
        }
        
        var svg = document.getElementById('sector-map');
        
        for (var col = 0; col < cols; col += 1) {
            for (var row = 0; row < rows; row += 1) {
                var offset = (Math.sqrt(3) * radius) / 2;
                x = radius + offset * col * Math.sqrt(3);
                y = radius + (offset * 2 * row);
                if (col % 2 !== 0) {
                    y += offset;
                }
                var polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
                polygon.setAttribute('points', hexPoints(x, y, radius));
                polygon.addEventListener('click', function(event) {
                    event.target.style.fill = 'blue';
                }, false);
                svg.appendChild(polygon);
            }
        }
    }
});

module.exports = Sector;
