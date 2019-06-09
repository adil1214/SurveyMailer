import React from 'react';

const SurveyField = ({ input, label, meta: { touched, warning, error } }) => {
	return (
		<div>
			<label>{label}</label>
			<input {...input} style={{ marginBottom: '5px' }} type="text" />
			{touched &&
				((error && (
					<div className="red-text" style={{ marginBottom: '20px' }}>
						{error}
					</div>
				)) ||
					(warning && (
						<div className="red-text" style={{ marginBottom: '20px' }}>
							{warning}
						</div>
					)))}
		</div>
	);
};

export default SurveyField;
