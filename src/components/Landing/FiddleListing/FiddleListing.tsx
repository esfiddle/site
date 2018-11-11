import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import './FiddleListing.css';

interface IFiddle {
	author?: string,
	description: string,
	image: string,
	link: string,
	title: string
}

interface IFiddleListingProps {
	data: IFiddle[],
	loading: boolean
}
export default class FiddleListing extends React.Component<IFiddleListingProps> {
	public node: any;
	public constructor(props: IFiddleListingProps) {
		super(props);
		this.onMouseWheel = this.onMouseWheel.bind(this);
	}
	public componentDidMount() {
		this.node = ReactDOM.findDOMNode(this);
	}
	public render() {
		const fiddles = this.props.data.map((data, i) => (
			<Link key={i} to={data.link} className='fiddle-listing__fiddle'>
				<div className='fiddle-listing__fiddle__image' style={{backgroundImage: `url(${data.image})`}} />
				<div className='fiddle-listing__fiddle__content'>
					<div className='fiddle-listing__fiddle__title'>{data.title}</div>
					{data.author &&
					<div className='fiddle-listing__fiddle__author'>{data.author}</div>}
					<div className='fiddle-listing__fiddle__description'>{data.description}</div>
				</div>
			</Link>
		));

		return (
			<div onWheel={this.onMouseWheel}
			className={'fiddle-listing' + (this.props.loading ? ' loading': '')}>
				{fiddles}
			</div>
		)
	}

	private onMouseWheel(e: any) {
		const x: number = e.deltaX;
		const y: number = e.deltaY;
		if (Math.abs(x) > Math.abs(y)) {
			// Scrolling sideways, probably with a trackpad or fancy mouse. Allow default actions.
			return;
		}
		if (this.node.scrollLeft === 0 && y < 0) {
			// Trying to scroll up, allow it.
			return;
		}
		if (this.node.scrollLeft + this.node.getBoundingClientRect().width === this.node.scrollWidth && y > 0) {
			// End of carousel and still trying to scroll down. Allow it.
			return
		}
		e.preventDefault();
		e.stopPropagation();
		this.node.scrollLeft += y;
	}
}