import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { invoiceViewRootReducer } from './reducers/index'

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const middleware = [thunkMiddleware]

const rootReducer = combineReducers({
	invoiceView: invoiceViewRootReducer
})

export default createStore(rootReducer, {}, reduxDevTools ? compose(applyMiddleware(...middleware), reduxDevTools) : applyMiddleware(...middleware))