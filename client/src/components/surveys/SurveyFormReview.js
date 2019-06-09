import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { submitSurvey } from '../../actions/index';
/** TODO:
 * react-router-navigation-prompt
 * sweetaler
 */

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
	const labelsAndNames = [
		{ name: 'title', label: 'Survey Title' },
		{ name: 'subject', label: 'Subject Line' },
		{ name: 'body', label: 'Email body' },
		{ name: 'recipients', label: 'Recipients List' }
	];

	return (
		<div>
			<h5>Please confirm your entries.</h5>
			{labelsAndNames.map(({ label, name }) => (
				<div key={name}>
					<label>{label}</label>
					<div>{formValues[name]}</div>
				</div>
			))}
			<button className="yellow darken-3 btn-flat" onClick={onCancel}>
				Back
			</button>
			<button
				className="blue btn-flat right"
				onClick={() => {
					submitSurvey(formValues, history);
				}}
			>
				Send Survey <i className="material-icons right">email</i>
			</button>
		</div>
	);
};

const mapStateToProps = (state) => ({
	formValues: state.form.surveyForm.values
});

// ps: passing history to an action creator or thunk is not an anti-pattern
// https://reacttraining.com/react-router/web/guides/redux-integration
export default withRouter(
	connect(mapStateToProps, { submitSurvey })(SurveyFormReview)
);
