import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { handleToken } from '../actions';

class Checkout extends Component {
	render() {
		// debugger;
		return (
			<StripeCheckout
				name="SurveyMailer"
				description="5$ for 5 email credits"
				token={(token) => this.props.handleToken(token)}
				amount={500}
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
			>
				{/* eslint-disable-next-line */}
				<a className="waves-effect waves-light btn">
					<i className="material-icons right">attach_money</i>Add Credits
				</a>
			</StripeCheckout>
		);
	}
}

export default connect(null, { handleToken })(Checkout);
