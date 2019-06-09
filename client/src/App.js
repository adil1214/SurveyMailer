import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { fetchUser } from './actions';
import Header from './components/Header';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import SurveyNew from './components/surveys/SurveyNew';

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
		M.AutoInit();
	}

	render() {
		return (
			<div className="container">
				<Router>
					<div>
						<Header />
						<Route exact path="/" component={Landing} />
						<Route exact path="/surveys" component={Dashboard} />
						<Route path="/surveys/new" component={SurveyNew} />
						{/* <Route path="" component={} /> */}
					</div>
				</Router>
			</div>
		);
	}
}

export default connect(null, { fetchUser })(App);
