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
        var svg = document.getElementById('sector-map'),
            radius = 45,
            cols = 8
            rows = 10;

        for (var col = 0; col < cols; col += 1) {
            for (var row = 0; row < rows; row += 1) {
                var offset = (Math.sqrt(3) * radius) / 2,
                    x = offset * col * Math.sqrt(3),
                    y = (col % 2 !== 0) ? (offset * 2 * row) + offset : (offset * 2 * row);

                var container = doHexContainer(x, y);
                var hex = doHex();
                var hexNumber = doHexNumber(col, row);
                
                container.appendChild(hex);
                container.appendChild(hexNumber);
                svg.appendChild(container);
            }
        }

        function doHexContainer(x, y) {
            var container = document.createElementNS("http://www.w3.org/2000/svg", "svg");

            container.setAttribute('y', y);
            container.setAttribute('x', x);
            container.classList.add('hex-container');
            container.style.width = radius * 2 + 'px';

            return container;
        }

        function doHexNumber(col, row, count) {
            var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.textContent = pad(col) + pad(row);
            text.setAttribute('x', radius);
            text.setAttribute('y', 21);

            return text;

            function pad(n) {
                return (n < 10) ? ('0' + n) : n;
            }
        }

        function doHex() {
            var polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

            polygon.setAttribute('points', hexPoints(radius));
            polygon.addEventListener('click', function(event) {
                event.target.style.fill = 'blue';
            }, false);
            polygon.classList.add('hex');

            return polygon;

            function hexPoints(radius) {
                var points = [];

                for (var theta = 0; theta < Math.PI * 2; theta += Math.PI / 3) {
                    var pointX = Math.round(radius + radius * Math.cos(theta)),
                        pointY = Math.round(radius + radius * Math.sin(theta));
                    
                    points.push(pointX + ',' + pointY);
                }

                return points.join(' ');
            }
        }
    }
});

module.exports = Sector;
