import * as React from 'react';
import { Link } from 'react-router-dom';

import './SearchBox.css';

interface ISearchBoxState {
	inputValue: string,
	loading: boolean,
	results: any[]
	shown: boolean,
}

export default class SearchBox extends React.Component<{}, ISearchBoxState> {
	private keyUpInterval?: number = undefined;
	public constructor(props: {}) {
		super(props);
		this.state = {
			inputValue: '',
			loading: false,
			results: [],
			shown: false,
		}
		
		this.inputFocus = this.inputFocus.bind(this);
		this.inputBlur = this.inputBlur.bind(this);
		this.inputChange = this.inputChange.bind(this);
		this.inputKeyUp = this.inputKeyUp.bind(this);
		this.updateResults = this.updateResults.bind(this);
	}
	public render() {
		const resultElems = this.state.results.map((data, i) => {
			// TODO: Change this to use id as key
			return (
				<Link className='header__search-results__result' to={data.link} key={i}>
					<div style={{backgroundImage: `url(${data.image})`}} />
					<div>
						<h1>{data.title}</h1>
						<h2>{data.author}</h2>
						<p>{data.description}</p>
					</div>
				</Link>
			);
		});
		return (
			<div className={'header__search'}>
				<input onFocus={this.inputFocus}
				onBlur={this.inputBlur}
				onKeyUp={this.inputKeyUp}
				onChange={this.inputChange}
				type="text" placeholder={'Search'}
				value={this.state.inputValue} />
				<i className="material-icons">search</i>
				<div className={
					'header__search-results ' +
					(this.state.shown ? 'show ' : '') +
					(this.state.loading ? 'loading ' : '')
				}>
					{resultElems}
					<div className='header__search-results__loader' />
				</div>
			</div>
		);
	}

	private inputFocus() {
		this.setState({shown: true});
	}
	private inputBlur() {
		this.setState({
			inputValue: '',
			loading: false,
			results: [],
			shown: false,
		});
	}
	private inputChange(evt: any) {
		this.setState({inputValue: evt.target.value});
	}
	private inputKeyUp(evt: any) {
		window.clearTimeout(this.keyUpInterval);
		this.keyUpInterval = window.setTimeout(this.updateResults, 200);
		if (this.state.inputValue.trim().length === 0) { 
			this.setState({loading: false, results: []});
		}
	}
	private updateResults() {
		const searchTerms = this.state.inputValue;
		if (searchTerms.trim().length === 0) { return; }
		this.setState({loading: true});
		// TODO: Load the search results here!
		setTimeout(() => {
			this.setState({
				loading: false,
				results: [{
					author: "@preyneyv",
					description: "Lorem ipsum dolor sit amet",
					image: "http://via.placeholder.com/360x180",
					link: "/editor/username/test-fiddle",
					title: "Test Fiddle",
				}, {
					author: "Example",
					description: "",
					image: "http://via.placeholder.com/360x180",
					link: "/editor/examples/example-fiddle",
					title: "Example Fiddle",
				}, {
					author: "@preyneyv",
					description: "Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet",
					image: "http://via.placeholder.com/360x180",
					link: "/editor/preyneyv/test-fiddle",
					title: "Test Fiddle",
				}]
			});
		}, Math.random() * 1000 + 300);
	}
}