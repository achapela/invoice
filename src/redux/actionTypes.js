import keyMirror from 'fbjs/lib/keyMirror'

const InvoiceViewActions = keyMirror({
	ADD_INVOICE_ROW: null,
	REMOVE_INVOICE_ROW: null,

	UPDATE_INVOICE_ROW: null,
	UPDATE_INVOICE_ROW_TOTALS: null,
	UPDATE_INVOICE_TOTALS: null
})

export { InvoiceViewActions }