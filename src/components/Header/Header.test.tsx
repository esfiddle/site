import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '../../App';
import Header from './Header';

it('renders <Header /> without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<App><Header /></App>, div);
	ReactDOM.unmountComponentAtNode(div);
});
