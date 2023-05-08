import { getStore } from '../utils/localStore/localStore';
import { SET_DATA, SET_TOOGLE } from './actions';

export const initialState = {
	set: {
		currentUser: getStore(),
		userById: null,
		item: null,
		username: '',
		email: '',
		password: '',
		oldPassword: '',
		confirmPassword: '',
		otpCode: '',
		file: [],
	},
	toogle: {},
};

export const setData = (payload) => {
	return {
		type: SET_DATA,
		payload,
	};
};

export const toogle = (payload) => {
	return {
		type: SET_TOOGLE,
		payload,
	};
};

export default function reducer(state = initialState, action) {
	switch (action?.type) {
		case SET_DATA:
			return {
				...state,
				set: {
					...state.set,
					...action.payload,
				},
			};
		case SET_TOOGLE:
			return {
				...state,
				toogle: {
					...state.toogle,
					...action.payload,
				},
			};
		default:
			return state;
	}
}
