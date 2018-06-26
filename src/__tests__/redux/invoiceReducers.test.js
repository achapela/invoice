import Immutable from 'immutable'
import { InvoiceViewActions } from '../../redux/actionTypes'
import { getNewItem, invoiceViewRootReducer } from '../../redux/reducers/invoiceView'

describe('Invoice Reducers', () => {
	let newItem = getNewItem()
	const defaultState = {
		items: Immutable.List([newItem]),
		totals: Immutable.Map({ subtotal: 0.0, tax: 0.0, total: 0.0 })
	}

	it('has a default state', () => {
		expect(invoiceViewRootReducer({ items: defaultState.items }, {})).toEqual(defaultState)
	})

	describe('has to add/remove items', () => {
		const item1 = Object.assign({}, getNewItem(), { name: 'item', price: 2 })
		const item2 = Object.assign({}, getNewItem(), { name: 'item', price: 3 })
		const item3 = Object.assign({}, getNewItem(), { name: 'item', price: 4 })
		const items = Immutable.List([item1, item2, item3])
		it('has to add item', () => {
			expect(invoiceViewRootReducer({ items: defaultState.items }, { type: InvoiceViewActions.ADD_INVOICE_ROW, item: item1 }).items.toJS()).toHaveLength(2)
		})

		it('item list cannot be empty', () => {
			expect(invoiceViewRootReducer({ items: defaultState.items }, { type: InvoiceViewActions.REMOVE_INVOICE_ROW, id: item1.id }).items.toJS()).toHaveLength(1)
		})

		it('item list must remove by id', () => {
			expect(invoiceViewRootReducer({ items }, { type: InvoiceViewActions.REMOVE_INVOICE_ROW, id: item1.id }).items.toJS()).toHaveLength(2)
		})

		it('has to update item', () => {
			const qty = 5
			const expectedTotal = Object.assign({}, item2, { qty })
			const action = Object.assign({}, { type: InvoiceViewActions.UPDATE_INVOICE_ROW }, { id: item2.id, name: 'qty', value: qty })
			expect(invoiceViewRootReducer({ items }, action).items.get(1)).toEqual(expectedTotal)
		})
	})

	describe('has to update the totals', () => {
		const totals = { subtotal: 1.0, tax: 10.0, total: 100.0 }
		const action = Object.assign({}, { type: InvoiceViewActions.UPDATE_INVOICE_TOTALS }, totals)
		expect(invoiceViewRootReducer({ totals: undefined }, action).totals.toJS()).toEqual(totals)
	})
})