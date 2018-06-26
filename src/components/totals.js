import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import classnames from 'classnames'

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

class Totals extends Component {
	render() {
		const { classes, totals } = this.props
		const totalsJS = totals.toJS()
		return (
			<React.Fragment>
				<Grid container spacing={8}>
					<Grid item lg={8} className={classes.total}>
					</Grid>
					<Grid item lg={4} className={classes.total}>
						<FormControl className={classnames(classes.margin, classes.textField)}>
							<InputLabel htmlFor="adornment-subtotal">Subtotal</InputLabel>
							<Input id="adornment-subtotal" value={totalsJS.subtotal || 0.0} startAdornment={<InputAdornment position="start">$</InputAdornment>} disabled />
						</FormControl>
					</Grid>
				</Grid>
				<Grid container spacing={8}>
					<Grid item lg={8} className={classes.total}>
					</Grid>
					<Grid item lg={4} className={classes.total}>
						<FormControl className={classnames(classes.margin, classes.textField)}>
							<InputLabel htmlFor="adornment-tax">Tax (5%)</InputLabel>
							<Input id="adornment-tax" value={totalsJS.tax || 0.0} startAdornment={<InputAdornment position="start">$</InputAdornment>} disabled />
						</FormControl>
					</Grid>
				</Grid>
				<Grid container spacing={8}>
					<Grid item lg={8} className={classes.total}>
					</Grid>
					<Grid item lg={4} className={classes.total}>
						<FormControl className={classnames(classes.margin, classes.textField)}>
							<InputLabel htmlFor="adornment-total">Total</InputLabel>
							<Input id="adornment-total" value={totalsJS.total || 0.0} startAdornment={<InputAdornment position="start">$</InputAdornment>} disabled />
						</FormControl>
					</Grid>
				</Grid>
			</React.Fragment>
		)
	}
}

Totals.propTypes = {
	totals: PropTypes.object.isRequired
}

export default withStyles(styles)(Totals)