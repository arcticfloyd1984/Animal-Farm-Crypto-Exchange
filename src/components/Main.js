import React, { Component } from 'react';
import BuyForm from './BuyForm';
import SellForm from './SellForm';

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentForm: 'buy'
		}
	}

	render() {
		let content;
		if(this.state.currentForm === 'buy') {
			content = <BuyForm
				ethBalance = {this.props.ethBalance}
				dogTokenBalance = {this.props.dogTokenBalance}
				sheepTokenBalance = {this.props.sheepTokenBalance}
				pigTokenBalance = {this.props.pigTokenBalance}
				buyDogTokens = {this.props.buyDogTokens}								
				buySheepTokens = {this.props.buySheepTokens}								
				buyPigTokens = {this.props.buyPigTokens}								
			/>
		} else {
			content = <SellForm
				ethBalance = {this.props.ethBalance}
				dogTokenBalance = {this.props.dogTokenBalance}
				sheepTokenBalance = {this.props.sheepTokenBalance}
				pigTokenBalance = {this.props.pigTokenBalance}
				sellDogTokens = {this.props.sellDogTokens}								
				sellSheepTokens = {this.props.sellSheepTokens}								
				sellPigTokens = {this.props.sellPigTokens}	
			/>
		}

		return (
			<div id="content" className="mt-3">

				<div className="d-flex justify-content-between mb-3">
					<button 
						className="btn btn-light"
						onClick={(event) => {
							this.setState({ currentForm: 'buy'})
						}}
					  >
					  Buy
					</button>
					<span className="text-muted">&lt; &nbsp;&gt;</span>
					<button
						className="btn btn-light"
						onClick={(event) => {
							this.setState({ currentForm: 'sell' })
						}}
					  >
					  Sell
					</button>
				</div>

				<div className="card mb-4">
					<div className="card-body">
					 {content}
					</div>
				</div> 
			</div>
		);
	}
}

export default Main;