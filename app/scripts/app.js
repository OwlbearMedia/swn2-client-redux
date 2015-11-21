var React = require('react');
var ReactDOM = require('react-dom');

var Sector = require('./sector');

ReactDOM.render(
  <Sector radius={45} columns={8} rows={10} />,
  document.getElementById('sector')
);