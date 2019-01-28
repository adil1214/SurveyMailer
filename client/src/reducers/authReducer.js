import { FETCH_USER } from '../actions/types';

const authReducerDefaultState = null;

export default (state = authReducerDefaultState, action) => {
	switch (action.type) {
		case FETCH_USER:
			return action.payload || false;
		default:
			return state;
	}
};
