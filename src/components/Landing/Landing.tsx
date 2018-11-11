import * as React from 'react';
import { Link } from 'react-router-dom';

import FiddleListing from './FiddleListing/FiddleListing';
import Hero from './Hero/Hero';

import './Landing.css';

interface IFiddle {
	author?: string,
	description: string,
	image: string,
	link: string,
	title: string
}

interface IListingState {
	coolFiddles: IFiddle[],
	loading: boolean,
	popularExamples: IFiddle[],
}

export default class Landing extends React.Component<{}, IListingState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			coolFiddles: [],
			loading: true,
			popularExamples: [],
		}
	}
	public componentWillMount() {
		// Load the data here
		setTimeout(() => {
			this.setState({
				coolFiddles: [{
					author: "@preyneyv",
					description: "Lorem ipsum dolor sit amet",
					image: "http://via.placeholder.com/360x180",
					link: "/editor/username/test-fiddle",
					title: "Test Fiddle",
				}, {
					author: "@preyneyv",
					description: "Lorem ipsum dolor sit amet",
					image: "http://via.placeholder.com/360x180",
					link: "/editor/username/test-fiddle",
					title: "Test Fiddle",
				}, {
					author: "@preyneyv",
					description: "Lorem ipsum dolor sit amet",
					image: "http://via.placeholder.com/360x180",
					link: "/editor/username/test-fiddle",
					title: "Test Fiddle",
				}, {
					author: "@preyneyv",
					description: "Lorem ipsum dolor sit amet",
					image: "http://via.placeholder.com/360x180",
					link: "/editor/username/test-fiddle",
					title: "Test Fiddle",
				}, {
					author: "@preyneyv",
					description: "Lorem ipsum dolor sit amet",
					image: "http://via.placeholder.com/360x180",
					link: "/editor/username/test-fiddle",
					title: "Test Fiddle",
				}],
				loading: false,
				popularExamples: [{
					description: "Lorem ipsum dolor sit amet",
					image: "http://via.placeholder.com/360x180",
					link: "/editor/username/test-fiddle",
					title: "Test Fiddle",
				}, {
					description: "Lorem ipsum dolor sit amet",
					image: "http://via.placeholder.com/360x180",
					link: "/editor/username/test-fiddle",
					title: "Test Fiddle",
				}, {
					description: "Lorem ipsum dolor sit amet",
					image: "http://via.placeholder.com/360x180",
					link: "/editor/username/test-fiddle",
					title: "Test Fiddle",
				}, {
					description: "Lorem ipsum dolor sit amet",
					image: "http://via.placeholder.com/360x180",
					link: "/editor/username/test-fiddle",
					title: "Test Fiddle",
				}, {
					description: "Lorem ipsum dolor sit amet",
					image: "http://via.placeholder.com/360x180",
					link: "/editor/username/test-fiddle",
					title: "Test Fiddle",
				}],
			})
		}, 3000)
	}
	public render() {
		return (
			<div>
				<section className='header-change-dark'><Hero /></section>
				<section className='header-change-light landing__fiddle-section'>
					<div className='landing__fiddle-section__header-row'>
						<h1>Popular Examples</h1>
						<Link to='/examples'>See All</Link>
					</div>
					<FiddleListing loading={this.state.loading} data={this.state.popularExamples} />
				</section>
				<section className='header-change-light landing__fiddle-section'>
					<div className='landing__fiddle-section__header-row'>
						<h1>Cool Fiddles</h1>
					</div>
					<FiddleListing loading={this.state.loading} data={this.state.coolFiddles} />
				</section>
			</div>
		);
	}
}