import 'materialize-css/dist/css/materialize.min.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { fetchUser } from './actions';
import Header from './components/Header';
import Landing from './components/Landing';


const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
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
