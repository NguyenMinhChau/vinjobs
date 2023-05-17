import { SET, TOGGLE } from './actions';
import { localStoreUtils } from '../utils';

const userStore = localStoreUtils.getStore();

const initialState = {
	set: {
		currentUser: userStore,
		accountMenu: null,
		statusCurrent: '',
		statusUpdate: '',
		tokenResetPwd: '',
		sort: 'asc',
		tab: 1,
		singleFile: [],
		multipleFile: [],
		form: {
			username: '',
			email: '',
			password: '',
			otpCode: '',
		},
		pagination: {
			page: 1,
			show: 10, //10,20,30,50
		},
		data: {
			dataHomeContent: [],
			dataJobContent: [],
			dataForumContent: [],
			dataContactContent: [],
			dataUser: [],
		},
		searchValues: {
			homeContent: '',
			jobsContent: '',
			forumContent: '',
			contactContent: '',
			topicSearch: '',
		},
		edit: {
			id: '',
			data: null,
			itemData: null,
		},
		editor: {
			title: '',
			subTitle: '',
			salary: '',
			unit: '',
			topic: '',
		},
	},
	toggle: {
		modalDelete: false,
		modalStatus: false,
		selectStatus: false,
		selectBank: false,
		openMenuMobile: false,
	},
};

const setData = (payload) => {
	return {
		type: SET,
		payload,
	};
};
const toggleModal = (payload) => {
	return {
		type: TOGGLE,
		payload,
	};
};

const reducer = (state, action) => {
	switch (action.type) {
		case SET:
			return {
				...state,
				set: {
					...state.set,
					...action.payload,
				},
			};
		case TOGGLE:
			return {
				...state,
				toggle: {
					...state.toggle,
					...action.payload,
				},
			};
		default:
			return state;
	}
};
export { initialState, setData, toggleModal };
export default reducer;
