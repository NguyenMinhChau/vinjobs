import { SET_DATA, SET_TOOGLE } from './actions';

export const initialState = {
    set: {
        currentUser: null,
    },
    toogle: {},
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_DATA:
            return {
                ...state,
                set: action.payload,
            };
        case SET_TOOGLE:
            return {
                ...state,
                toogle: action.payload,
            };
        default:
            return state;
    }
}
