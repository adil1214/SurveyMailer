import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';

class SurveyForm extends Component {
	renderFields() {
		const labelsAndNames = [
			{ name: 'title', label: 'Survey Title' },
			{ name: 'subject', label: 'Subject Line' },
			{ name: 'body', label: 'Email body' },
			{ name: 'recipients', label: 'Recipients List' }
		];

		return (
			<Fragment>
				{labelsAndNames.map(({ name, label }) => (
					<Field
						key={name}
						name={name}
						label={label}
						type="text"
						component={SurveyField}
					/>
				))}
			</Fragment>
		);
	}

	render() {
		const { handleSubmit, onSurveySubmit, reset } = this.props;

		return (
			<div>
				<form onSubmit={handleSubmit(onSurveySubmit)}>
					{this.renderFields()}
					<Link
						to="/surveys"
						className="red btn-flat white-text"
						onClick={() => reset()}
					>
						Cancel
					</Link>
					<button type="submit" className="teal btn-flat right white-text">
						Next
						<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		);
	}
}

const validateEmails = (emails) => {
	// eslint-disable-next-line
	const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const invalidEmails = emails
		.split(',')
		.map((email) => email.trim())
		.filter((email) => !regex.test(email));

	return invalidEmails.length
		? `These emails are invalid ${invalidEmails}`
		: null;
};

const validate = (values) => {
	const errors = {};
	if (!values.title) {
		errors.title = 'Title required!';
	} else if (values.title.length < 3) {
		errors.title = 'Your name must be at least 3 characters long!';
	}

	if (!values.subject) {
		errors.subject = 'Subject required!';
	}

	if (!values.body) {
		errors.body = 'Body required!';
	}

	if (!values.recipients) {
		errors.recipients = 'Email list required';
	} else if ((errors.recipients = validateEmails(values.recipients))) {
		// :)
	}
	return errors;
};

export default reduxForm({
	validate,
	form: 'surveyForm',
	destroyOnUnmount: false
})(SurveyForm);
