var toWords = require('./2words');

var NumberConverter = React.createClass({displayName: 'NumberConverter',
	getInitialState: function() {
		return {value: '0'};
	},
	handleChange: function() {
		this.setState({value: this.refs.input.getDOMNode().value});
	},
	render: function() {
		return (
			React.createElement('div', {Id: 'NumberConverter'},
				React.createElement('input', {
					type: 'number',
					inputMode: 'numeric',
					onChange: this.handleChange,
					ref: 'input',
					defaultValue: this.state.value}),
				React.createElement('div', {
					className: 'content',
					toWords(this.state.value)
					}
				)
			)
		);
	}
});
React.render(React.createElement(NumberConverter, null), document.getElementById('NumberConverter'))