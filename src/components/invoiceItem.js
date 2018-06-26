import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Grid from '@material-ui/core/Grid'
import classnames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'

const styles = theme => ({
	margin: {
		margin: theme.spacing.unit
	},
	withoutLabel: {
		marginTop: theme.spacing.unit * 3,
	},
	textField: {
		flexBasis: 200,
	},
	button: {
		margin: theme.spacing.unit
	}
})

const productItems = [
	{ id: 1, name: 'Item 1', price: 15.00 },
	{ id: 2, name: 'Item 2', price: 35.00 },
	{ id: 3, name: 'Item 3', price: 50.00 },
	{ id: 4, name: 'Item 4', price: 75.00 }
]

class InvoiceItem extends Component {
	state = { id: null }
	static getDerivedStateFromProps(props, state) {
		return {
			id: props.item.id
		}
	}

	onAddItem = e => {
		const { onAdd } = this.props
		const item = productItems.find(o => o.id === e.target.value)
		if (item)
			onAdd(item)
	}

	onDelete = e => {
		const { onDelete } = this.props
		onDelete(this.state.id)
	}

	onChangeValue = name => e => {
		const { onChangeValue } = this.props
		const { value } = e.target
		onChangeValue(this.state.id, name, value)
	}

	render() {
		const { classes, item } = this.props
		const lastItem = item.isLast
		return (
			<Grid container spacing={8}>
				<Grid item sm={4}>
					{lastItem ?
						<TextField id="itemName" label="Item" value={item.name || ''} margin="normal" className={classnames(classes.margin, classes.textField)} select helperText="New Item" onChange={this.onAddItem}>
							{productItems.map(o => (<MenuItem key={o.id} value={o.id}>{o.name}</MenuItem>))}
						</TextField> :
						<TextField id="itemName" label="Item" value={item.name || ''} margin="normal" className={classnames(classes.margin, classes.textField)} disabled />
					}
				</Grid>
				<Grid item sm={2}>
					<TextField id="itemQty" label="Qty" value={item.qty || 0} margin="normal" type="number" className={classnames(classes.margin, classes.textField)} onChange={this.onChangeValue('qty')} disabled={lastItem} />
				</Grid>
				<Grid item sm={2}>
					<FormControl className={classnames(classes.margin, classes.textField)}>
						<InputLabel htmlFor="adornment-price">Price</InputLabel>
						<Input id="adornment-price" value={item.price || 0.0} startAdornment={<InputAdornment position="start">$</InputAdornment>} onChange={this.onChangeValue('price')} disabled={lastItem} />
					</FormControl>
				</Grid>
				<Grid item sm={3}>
					<FormControl className={classnames(classes.margin, classes.textField)}>
						<InputLabel htmlFor="adornment-total">Total</InputLabel>
						<Input id="adornment-total" value={item.total || 0.0} startAdornment={<InputAdornment position="start">$</InputAdornment>} disabled />
					</FormControl>
				</Grid>
				<Grid item sm={1}>
					{!lastItem ?
						<IconButton className={classes.button} aria-label="Delete" title="Delete" onClick={this.onDelete}><DeleteIcon /></IconButton> :
						null
					}
				</Grid>
			</Grid>
		)
	}
}

InvoiceItem.propTypes = {
	item: PropTypes.object.isRequired,
	onAdd: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	onChangeValue: PropTypes.func.isRequired
}

export default withStyles(styles)(InvoiceItem)
