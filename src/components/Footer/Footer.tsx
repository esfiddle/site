import * as React from 'react';
import { NavLink } from 'react-router-dom';
import InlineSVG from 'react-svg-inline';

import './Footer.css'
import ImageSrc from './footerBg';

export default class Footer extends React.Component {
	public render() {
		return (
			<footer>
				<InlineSVG svg={ImageSrc}/>
				<div className='spacer'/>
				<div className='footerLinks'>
					<NavLink activeClassName='active' to="/examples">Examples</NavLink>
					<NavLink activeClassName='active' to="/editor">Editor</NavLink>
					<NavLink activeClassName='active' to="/about">About</NavLink>
					<NavLink activeClassName='active' to="/blog">Blog</NavLink>
				</div>
			</footer>
		);
	}
}