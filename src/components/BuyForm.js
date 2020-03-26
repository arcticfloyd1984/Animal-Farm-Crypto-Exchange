import React, { Component } from 'react';
import tokenLogo from '../token-logo.jpeg'
import ethLogo from '../eth-logo.png'

class BuyForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			output: '0',
			tokenRate: '0'
		}
	}

	render() {
		return (
			<form className="mb-3" onSubmit={(event) => {
				event.preventDefault()
				let etherAmount
				etherAmount = this.input.value.toString()
				etherAmount = window.web3.utils.toWei(etherAmount, 'Ether');
				if(this.state.tokenRate === '1000') {
					this.props.buyDogTokens(etherAmount);
				}
				
				if(this.state.tokenRate === '100') {
					this.props.buySheepTokens(etherAmount);
				}				

				if(this.state.tokenRate === '10') {
					this.props.buyPigTokens(etherAmount);
				}				
			}}>
			<div>
				<label className="float-left"><b>Input</b></label>
				<span className="float-right text muted">
					Balance: {window.web3.utils.fromWei(this.props.ethBalance, 'Ether')}
				</span>
			</div>
			<div className="input-group mb-4">
				<input
					type="text"
					onChange={(event) => {
						const tokenType = this.rate.value.toString()
						if(tokenType.toLowerCase() === 'dog') {
							this.setState({
								tokenRate: '1000'
							})
						}

						if(tokenType.toLowerCase() === 'sheep') {
							this.setState({
								tokenRate: '100'
							})
						}

						if(tokenType.toLowerCase() === 'pig') {
							this.setState({
								tokenRate: '10'
							})
						}						

					}}
					ref={(rate) => { this.rate = rate }}
					className="form-control form-control-lg"
					placeholder="Enter the type of token"
					required />			
				<input
					type="text"
					onChange={(event) => {
						const etherAmount = this.input.value.toString()
						this.setState({
							output: etherAmount * this.state.tokenRate
						})
					}}
					ref={(input) => { this.input = input }}
					className="form-control form-control-lg"
					placeholder="0"
					required />
				<div className="input-group-append">
					<div className="input-group-text">
						<img src={ethLogo} height='32' alt=""/>
						&nbsp;&nbsp;&nbsp; ETH
					</div>
				</div>
			</div>
			<div>
				<label className="float-left"><b>Output</b></label>
				<span className="float-right text-muted">
					Balance: 
					Dog Token = {window.web3.utils.fromWei(this.props.dogTokenBalance, 'Ether')}&nbsp;&nbsp;
					Sheep Token = {window.web3.utils.fromWei(this.props.sheepTokenBalance, 'Ether')}&nbsp;&nbsp;
					Pig Token = {window.web3.utils.fromWei(this.props.pigTokenBalance, 'Ether')}&nbsp;&nbsp;
				</span>
			</div>
			<div className="input-group mb-2">
				<input 
					type="text"
					className="form-control form-control-lg"
					placeholder="0"
					value={this.state.output}
					disable="true"
				/>
				<div className="input-group-append">
					<div className="input-group-text">
						<img src={tokenLogo} height='32' alt=""/>
						&nbsp; DApp
					</div>
				</div>
			</div>
				<div className="mb-5">
					<span className="float-left text-muted">Exchange Rate</span>
					<span className="float-right text-muted">1 ETH = 1000 Dog Tokens = 100 Sheep Tokens = 10 Pig Tokens </span>
				</div>
				<button type="submit" className="btn btn-primary btn-block btn-lg">SWAP!</button>
			</form>	
		);
	}
}

export default BuyForm;