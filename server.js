var http = require('http');
var toWords = require('./2words');
var React = require('react');

http.createServer(function(req, res) {
	if (req.url == '/') {
		res.setHeader('Content-Type', 'text/html');
		res.end(
			'<div id="NumberConverter">' + '</div>' +
			'<script src=//fb.me/react-0.12.2.min.js></script>' + //TODO load React locally
			'<script>' +
				'var toWords = ' + toWords + ';' +
				'var NumberConverter = React.createClass({displayName: "NumberConverter",'+
					'getInitialState: function() {'+
						'return {value: "0"};'+
					'},'+
					'handleChange: function() {'+
						'this.setState({value: this.refs.input.getDOMNode().value});'+
					'},'+
					'render: function() {'+
						'return ('+
							'React.createElement("div", {Id: "NumberConverter"}, '+
								'React.createElement("h3", null, "Input"), '+
								'React.createElement("input", {'+
									'type: "number",' +
									'inputmode: "numeric",' +
									'onChange: this.handleChange, '+
									'ref: "input", '+
									'defaultValue: this.state.value}), '+
								'React.createElement("h3", null, "Output"), '+
								'React.createElement("div", {'+
									'className: "content", '+
									'dangerouslySetInnerHTML: {'+
										'__html: toWords(this.state.value)'+
									'}}'+
								')'+
							')'+
						');'+
					'}'+
				'});' +
        'React.render(React.createElement(NumberConverter, null), document.getElementById("NumberConverter"))' +
      '</script>'
    )
	} else {
		res.statusCode = 404;
		res.end();
	}
}).listen(1337, function(err) {
	if (err) throw err;
  console.log('Listening on port ' + '1337');
});
