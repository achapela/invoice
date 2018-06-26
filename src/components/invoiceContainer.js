import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import Invoice from './invoice'
import Totals from './totals'
import { addNewItem, deleteItem, changeItemValue } from '../redux/actions/invoiceActions'

const styles = theme => ({
	root: theme.mixins.gutters({
		paddingTop: 16,
		paddingBottom: 16,
		marginLeft: '10%',
		marginRight: '10%',
		marginTop: theme.spacing.unit * 3,
		minHeight: '460px'
	}),
})

class InvoiceContainer extends Component {
	render() {
		const { classes, items, totals, onAddNewItem, onDeleteItem, onChangeItemValue } = this.props
		return (
			<Paper className={classes.root} elevation={3}>
				<Invoice items={items} onAddNewItem={onAddNewItem} onDeleteItem={onDeleteItem} onChangeItemValue={onChangeItemValue} />
				<Totals totals={totals} />
			</Paper>
		)
	}
}

const mapStateToProps = (state) => {
	const { invoiceView } = state
	const items = invoiceView.items.toJS()
	const totals = invoiceView.totals.toJS()
	return {
		items,
		totals
	}
}

const mapDispatchToProps = dispatch => ({
	onAddNewItem: (item) => dispatch(addNewItem(item)),
	onDeleteItem: (id) => dispatch(deleteItem(id)),
	onChangeItemValue: (id, name, value) => dispatch(changeItemValue(id, name, value))
})

export default withStyles(styles)(
	connect(mapStateToProps, mapDispatchToProps)(InvoiceContainer)
)