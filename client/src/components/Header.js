import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Checkout from './Checkout';

class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
					<li>
						<a href="/auth/google">Login With Google</a>
					</li>
				);
			default:
				return (
					<Fragment>
						<li>
							<Checkout />
						</li>
						<li style={{ paddingRight: '15px' }}>Credits: {this.props.auth.credits}</li>
						<li>
							<a href="/api/logout">Logout</a>
						</li>
					</Fragment>
				);
		}
	}

	render() {
		return (
			<nav className="green darken-4">
				<div className="nav-wrapper">
					<Link
						to={this.props.auth ? '/surveys' : '/'}
						className="brand-logo left"
						style={{ marginLeft: '1rem' }}
					>
						SurveyMailer
					</Link>
					<ul className="right">{this.renderContent()}</ul>
				</div>
			</nav>
		);
	}
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Header);
