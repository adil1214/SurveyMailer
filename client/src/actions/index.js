import axios from 'axios';
import { FETCH_USER, SUBMIT_SURVEY, FETCH_SURVEYS } from './types';

export const fetchUser = () => (dispatch) => {
	axios
		.get('/api/current_user')
		.then((res) => {
			dispatch({
				type: FETCH_USER,
				payload: res.data
			});
		})
		.catch((err) => console.log(err));
};

export const handleToken = (token) => (dispatch) => {
	axios
		.post('/api/stripe', token)
		.then((res) => {
			dispatch({
				type: FETCH_USER,
				payload: res.data
			});
		})
		.catch((err) => console.log(err));
};

export const submitSurvey = (values, history) => (dispatch) => {
	console.log(values);
	axios
		.post('/api/surveys', values)
		.then((res) => {
			dispatch({
				type: FETCH_USER,
				payload: res.data
			});
			history.push('/surveys'); // FIXME: should this even be here ?
		})
		.catch((err) => console.log(err));
	return {
		type: SUBMIT_SURVEY
	};
};

export const fetchSurveys = () => (dispatch) => {
	axios.get('/api/surveys').then((res) => {
		dispatch({ type: FETCH_SURVEYS, payload: res.data });
	});
};
