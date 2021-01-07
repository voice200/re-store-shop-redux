import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';

const logMiddleware = () => (dispatch) => action =>{
		console.log(action.type);
		return dispatch(action);
}

const stringMiddleware = () => (dispatch) => action =>{
	if ( typeof action === 'string') {
		return dispatch({
			type: action
		});
	}
	return dispatch(action);
}

// const stringEnhancer = (createStore) => (...arg) =>{
// 	const store = createStore(...arg);
// 	const originalDispatch = store.dispatch;
// 	store.dispatch = (action) => {
// 		if ( typeof action === 'string') {
// 			return originalDispatch({
// 				type: action
// 			});
// 		}
// 		return originalDispatch(action);
// 	}
// 	return store;
// };
// const logEnhancer = (createStore) => (...arg) =>{
// 	const store = createStore(...arg);
// 	const originalDispatch = store.dispatch;
// 	store.dispatch = (action) => {
// 		console.log(action.type);
// 		return originalDispatch(action);
// 	}
// 	return store;
// };
// const myAction = (dispatch) =>{
// 	setTimeout(() => dispatch({
// 		type: 'DALAYED_ACTION'
// 	}), 2000)
// }

const delayedActionCreator = (timeout) => dispatch =>{
	setTimeout(() => dispatch({
		type: 'DALAYED_ACTION'
	}), timeout)
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware, stringMiddleware, logMiddleware));
store.dispatch(delayedActionCreator(4000))
export default store;