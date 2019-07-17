import { FETCH_SURVEYS } from '../actions/types';

const surveysReducerDefaultState = [];

export default (state = surveysReducerDefaultState, action) => {
	switch (action.type) {
		case FETCH_SURVEYS:
			return action.payload;
		default:
			return state;
	}
};
