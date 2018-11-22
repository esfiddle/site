import createHistory from "history/createBrowserHistory";
import * as React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
// Styles
import './App.css';
import About from './components/About/About';
import Editor from './components/Editor/Editor';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Landing from './components/Landing/Landing';
import NotFound from './components/NotFound/NotFound';


const history = createHistory();



interface IAppState {
	user: object | null,
	isAuthenticated: boolean;
	token: string;
}

class App extends React.Component<{}, IAppState> {
	public constructor(props: {}) {
		super(props);
		this.state = {
			isAuthenticated: false,
			token: '',
			user: null,
		};
	}

	public onSuccess(response: any): any {
		const token = response.headers.get('x-auth-token');
		response.json().then((user: any) => {
			if (token) {
				this.setState({ isAuthenticated: true, user, token });
			}
		});
	}

	public onFailed(error: any) {
		alert(error);
	}

	public logout() {
		this.setState({ isAuthenticated: false, token: '', user: null });
	}

	public componentDidMount() {
		history.listen((location, action) => {
			console.log('Change!') // tslint:disable-line
			// requestAnimationFrame(() => this.onScroll());
		})
	}
	public render() {
		// tslint:disable
		return (
			<Router history={history}>
				<>
					<Header authenticated={this.state.isAuthenticated} logout={this.logout} onFailed={(err: any) => this.onFailed(err)} onSuccess={(res: any) => this.onSuccess(res)}/>
						<main className="main">
							<Switch>
								<Route exact={true} path="/" component={Landing} />
								<Route path="/about" component={About} />
								<Route path="/editor" component={Editor} />
								<Route component={NotFound} />
							</Switch>
						</main>
					<Footer />
				</>
			</Router>
		);
	}
}

export default App;
