import { InvoiceViewActions } from "../actionTypes"

const addNewItem = (item) => dispatch =>
	dispatch({
		type: InvoiceViewActions.ADD_INVOICE_ROW,
		item
	})

const deleteItem = (id) => dispatch => {
	dispatch({
		type: InvoiceViewActions.REMOVE_INVOICE_ROW,
		id
	})
	dispatch(updateTotals())
}

const getNumber = (value) => {
	const number = Number(value)
	if (Number.isNaN(number)) return 0
	return number
}

const changeItemValue = (id, name, value) => (dispatch, getState) => {
	dispatch({
		type: InvoiceViewActions.UPDATE_INVOICE_ROW,
		id,
		name,
		value
	})
	if (name === 'qty' || name === 'price') {
		const { invoiceView } = getState()
		const item = invoiceView.items.find(i => i.id === id)
		const { qty, price } = item
		const total = getNumber(qty) * getNumber(price)
		dispatch({
			type: InvoiceViewActions.UPDATE_INVOICE_ROW,
			id,
			name: 'total',
			value: total
		})
		dispatch(updateTotals())
	}
}

const updateTotals = () => (dispatch, getState) => {
	const { invoiceView } = getState()
	let subtotal = 0
	for (let item of invoiceView.items)
		if (item.total)
			subtotal += item.total
	let tax = subtotal * 0.05
	let total = subtotal + tax
	dispatch({
		type: InvoiceViewActions.UPDATE_INVOICE_TOTALS,
		subtotal,
		tax,
		total
	})
}


export { addNewItem, deleteItem, changeItemValue }