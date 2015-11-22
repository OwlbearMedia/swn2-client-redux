// __tests__/hex-test.js
jest.dontMock('../app/scripts/hex');

var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');

var Hex = require('../app/scripts/hex');

describe('Hex', function() {
    it('has a hex number', function() {
        // Render a checkbox with label in the document
        var hex = ReactTestUtils.renderIntoDocument(
            <Hex y="0" x="0" radius="45" row="1" column="1"></Hex>
        );

        var hexNode = ReactDOM.findDOMNode(hex);

        // @fixme: change this to a good way of locating the hex number
        expect(hexNode.lastChild.textContent).toEqual('0101');
    });
});