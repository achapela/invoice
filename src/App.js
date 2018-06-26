import React, { Component } from 'react'
import './App.css'
import CssBaseline from '@material-ui/core/CssBaseline'
import InvoiceContainer from './components/invoiceContainer'

class App extends Component {
	render() {
		return (
			<div className="App">
				<CssBaseline />
				<InvoiceContainer />
			</div>
		)
	}
}

export default App
