import * as React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css';

import SearchBox from './SearchBox/SearchBox';

interface IHeaderState {
	theme: string
}

export default class Header extends React.Component<{}, IHeaderState> {
	public constructor(props: {}) {
		super(props);
		this.state = {
			theme: 'dark',
		};

		this.onScroll = this.onScroll.bind(this)
	}

	public componentDidMount() {
		window.addEventListener('scroll', this.onScroll)
		this.onScroll();
	}

	public onScroll() {
		const elems = Array.prototype.slice.call(document.querySelectorAll('.header-change-light, .header-change-dark'));
		const elem = elems.find((e: HTMLElement) => {
			const bounding = e.getBoundingClientRect();
			return (bounding.top + bounding.height) > 60
		});
		if (elem) {
			const theme = elem.classList.contains('header-change-light') ? 'light' : 'dark'
			if (this.state.theme !== theme) {
				this.setState({ theme })
			}
		}
	}

	public render() {
		return (
			<div className={'header header-' + this.state.theme}>
				<div className={'header__box'}>
					<SearchBox />
				</div>
				<div className={'header__box'}>
					<NavLink to="/">
						<div className={'header__logo'} />
					</NavLink>
				</div>
				<div className={'header__box header__navigation'}>
					<NavLink activeClassName="active" to="/examples">Examples</NavLink>
					<NavLink activeClassName="active" to="/editor">Editor</NavLink>
					<NavLink activeClassName="active" to="/about">About</NavLink>
					<NavLink activeClassName="active" to="/blog">Blog</NavLink>
					<div className={'header__user'}>
						Login
					</div>
				</div>
			</div>
		);
	}
}