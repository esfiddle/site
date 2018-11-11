import * as React from 'react';
import { Link } from 'react-router-dom';
import SVGInline from "react-svg-inline"

import './Hero.css';

import HeroImageSrc from './wordCloud';

export default class Hero extends React.Component {
	public render() {
		return (
			<div className="hero">
				<SVGInline svg={HeroImageSrc} className="hero__image" />
				<div className="spacer" />
				<div className="hero__text-main">Wear your <span>safety goggles.</span></div>
				<div className="hero__text-sub">You are about to enter a lab.</div>
				<div className="spacer" />
				<div className="hero__action-buttons">
					<Link to="/editor">Open Editor</Link>
					<Link to="/examples">Browse Examples</Link>
				</div>
				<div className="spacer" />
			</div>
		);
	}
}