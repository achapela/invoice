import uuid from 'uuid'
import Immutable from 'immutable'
import { InvoiceViewActions } from '../actionTypes'


const getNewItem = () => ({ id: uuid.v4(), isLast: true })
const itemsInitialState = Immutable.List([getNewItem()])
const totalsInitialState = Immutable.Map({ subtotal: 0.0, tax: 0.0, total: 0.0 })

const itemReducer = (state = itemsInitialState, action) => {
	switch (action.type) {
		case InvoiceViewActions.ADD_INVOICE_ROW: {
			let newState = state.update(state.size - 1, item => {
				item.name = action.item.name
				item.qty = 0
				item.price = action.item.price
				item.isLast = false
				return item
			})
			return newState.push(getNewItem())
		}

		case InvoiceViewActions.REMOVE_INVOICE_ROW: {
			if (state.size === 1) return state.clear().push(getNewItem())
			const idx = state.findIndex(r => r.id === action.id)
			if (idx < 0) return state
			const { size } = state
			let newState = state.remove(idx)
			if (idx === size - 1) {
				newState = newState.update(newState.size - 1, item => {
					item.isLast = true
					return item
				})
			}
			return newState
		}

		case InvoiceViewActions.UPDATE_INVOICE_ROW: {
			const { id, name, value } = action
			const idx = state.findIndex(i => i.id === id)
			return state.update(idx, item => {
				if (value) {
					if (item[name] === value) return item
					item[name] = value
				}
				else
					delete item[name]
				return item
			})
		}

		default: return state
	}
}

const totalsReducer = (state = totalsInitialState, action) => {
	switch (action.type) {
		case InvoiceViewActions.UPDATE_INVOICE_TOTALS: {
			return state.set('subtotal', action.subtotal).set('tax', action.tax).set('total', action.total)
		}

		default: return state
	}
}

const invoiceViewRootReducer = (state = {}, action) => ({
	items: itemReducer(state.items, action),
	totals: totalsReducer(state.totals, action)
})

export { invoiceViewRootReducer, getNewItem }