import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
	state = {
		showFormRevew: false
	};

	render() {
		return (
			<div>
				{!this.state.showFormRevew ? (
					<SurveyForm
						onSurveySubmit={() => this.setState({ showFormRevew: true })}
					/>
				) : (
					<SurveyFormReview
						onCancel={() => this.setState({ showFormRevew: false })}
					/>
				)}
			</div>
		);
	}
}

export default SurveyNew;
