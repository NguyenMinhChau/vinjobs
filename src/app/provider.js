import { useReducer } from 'react';
import Context from './context';
import reducer, { initialState } from './reducer';

export default function UseProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    );
}
