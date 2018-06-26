import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import InvoiceItem from './invoiceItem'

const styles = theme => ({
	root: {
		flexGrow: 1
	}
})

class Invoice extends Component {
	renderItem(invItem, idx) {
		const { onAddNewItem, onDeleteItem, onChangeItemValue } = this.props
		return (
			<InvoiceItem key={idx} item={invItem} onAdd={onAddNewItem} onDelete={onDeleteItem} onChangeValue={onChangeItemValue} />
		)
	}

	render() {
		const { classes, items } = this.props
		return (
			<div className={classes.root}>
				<Grid container spacing={16}>
					{items.map(this.renderItem, this)}
				</Grid>
			</div>
		)
	}
}

Invoice.propTypes = {
	items: PropTypes.array.isRequired,
	onAddNewItem: PropTypes.func.isRequired,
	onDeleteItem: PropTypes.func.isRequired,
	onChangeItemValue: PropTypes.func.isRequired
}

export default withStyles(styles)(Invoice)