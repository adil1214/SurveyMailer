import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions/index';
import SurveyCard from './SurveyCard';

class SurveyList extends Component {
	componentDidMount() {
		this.props.fetchSurveys();
	}

	render() {
		return (
			<div>
				{this.props.surveys
					.reverse()
					.map((survey) => <SurveyCard survey={survey} />)}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	surveys: state.surveys
});

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
