var http = require('http');
var toWords = require('./2words');
var React = require('react');

var NumberConverter = React.createClass({
  getInitialState: function() {
    var max = 99999999;
    var defaultValue = Math.floor(Math.random() * (max - 0 + 1));
    return {value: defaultValue};
  },
  handleChange: function() {
    this.setState({value: this.refs.input.value});
  },
  render: function() {
    var words = toWords(this.state.value);
    var output = (words === null)
      ? 'Что-то менее космическое, пожалуйста.'
      : words[0].toUpperCase() + words.slice(1) + '.';
    return (
      <div className="NumberConverter">
        <h2>Введите число</h2>
        <input
          onChange={this.handleChange}
          ref="input"
          defaultValue={this.state.value} />
        <h3>Результат</h3>
        <div className="content">{output}</div>
      </div>
    );
  }
});

ReactDOM.render(<NumberConverter />,
  document.getElementById('container')
);

http.createServer(function(req, res) {
	if (req.url == '/') {
		res.setHeader('Content-Type', 'text/html');
		res.end(
			// TODO: load React locally
			'<script src=//fb.me/react-0.12.2.min.js></script>' +
			'<div id="NumberConverter">' + '</div>'
    		)
	} else {
		res.statusCode = 404;
		res.end();
	}
}).listen(1337, function(err) {
	if (err) throw err;
  console.log('Listening on port ' + '1337');
});
