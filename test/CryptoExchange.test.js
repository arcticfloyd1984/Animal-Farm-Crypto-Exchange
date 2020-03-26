const DogToken = artifacts.require("DogToken");
const SheepToken = artifacts.require("SheepToken");
const PigToken = artifacts.require("PigToken");
const CryptoExchange = artifacts.require("CryptoExchange");

require('chai')
	.use(require('chai-as-promised'))
	.should()

function tokens(n) {
	return web3.utils.toWei(n, 'ether');
}

contract('CryptoExchange', ([deployer, investor]) => {
	let dogToken;
	let sheepToken;
	let pigToken;
	let cryptoExchange;

	before(async () => {
		dogToken = await DogToken.new();
		sheepToken = await SheepToken.new();
		pigToken = await PigToken.new();
		cryptoExchange = await CryptoExchange.new(dogToken.address, sheepToken.address, pigToken.address);
		await dogToken.transfer(cryptoExchange.address, tokens('1000000'));
		await sheepToken.transfer(cryptoExchange.address, tokens('100000'));
		await pigToken.transfer(cryptoExchange.address, tokens('10000'));
	})

	describe('Dog Token Deployment', async () => {
		it('Contract has a name', async () => {
			const dogTokenName = await dogToken.name()
			assert.equal(dogTokenName, 'Dog Token');
		})
	})

	describe('Sheep Token Deployment', async () => {
		it('Contract has a name', async () => {
			const sheepTokenName = await sheepToken.name()
			assert.equal(sheepTokenName, 'Sheep Token');
		})
	})

	describe('Pig Token Deployment', async () => {
		it('Contract has a name', async () => {
			const pigTokenName = await pigToken.name()
			assert.equal(pigTokenName, 'Pig Token');
		})
	})

	describe('CryptoExchange Deployment', async () => {
		it('Contract has a name', async () => {
			const cryptoExchangeName = await cryptoExchange.name()
			assert.equal(cryptoExchangeName, 'Crypto Exchange')
		})

		it('Contract has Dog Tokens', async () => {
			const dogTokenBalance = await dogToken.balanceOf(cryptoExchange.address);
			assert.equal(dogTokenBalance.toString(), tokens('1000000'));

		})

		it('Contract has Sheep Tokens', async () => {
			const sheepTokenBalance = await sheepToken.balanceOf(cryptoExchange.address);
			assert.equal(sheepTokenBalance.toString(), tokens('100000'));
		})

		it('Contract has Pig Tokens', async () => {	
			const pigTokenBalancce = await pigToken.balanceOf(cryptoExchange.address);
			assert.equal(pigTokenBalancce, tokens('10000'));
		})
	})

	describe('buyDogTokens()', async () => {
		let result;
		before( async () => { 
			result = await cryptoExchange.buyDogTokens( {from: investor, value: web3.utils.toWei('1', 'ether')});
		})

		it('Correct Transfer of Tokens and Ether', async () => {
			let investorBalance = await dogToken.balanceOf(investor);
			assert.equal(investorBalance.toString(), tokens('1000'));

			let cryptoExchangeDogTokenBalance = await dogToken.balanceOf(cryptoExchange.address);
			assert.equal(cryptoExchangeDogTokenBalance, tokens('999000'));
			let cryptoExchangeEthBalance = await web3.eth.getBalance(cryptoExchange.address);
			assert.equal(cryptoExchangeEthBalance.toString(), web3.utils.toWei('1', 'ether'));
		})
	})
	
	describe('buySheepTokens()', async () => {
		let result;
		before( async () => { 
			result = await cryptoExchange.buySheepTokens( {from: investor, value: web3.utils.toWei('1', 'ether')});
		})

		it('Correct Transfer of Tokens and Ether', async () => {
			let investorBalance = await sheepToken.balanceOf(investor);
			assert.equal(investorBalance.toString(), tokens('100'));

			let cryptoExchangeSheepTokenBalance = await sheepToken.balanceOf(cryptoExchange.address);
			assert.equal(cryptoExchangeSheepTokenBalance.toString(), tokens('99900'));
			let cryptoExchangeEthBalance = await web3.eth.getBalance(cryptoExchange.address);
			assert.equal(cryptoExchangeEthBalance.toString(), web3.utils.toWei('2', 'ether'));
		})		
	})

	describe('buyPigTokens()', async () => {
		let result;
		before( async () => { 
			result = await cryptoExchange.buyPigTokens( {from: investor, value: web3.utils.toWei('1', 'ether')});
		})

		it('Correct Transfer of Tokens and Ether', async () => {
			let investorBalance = await pigToken.balanceOf(investor);
			assert.equal(investorBalance.toString(), tokens('10'));

			let cryptoExchangePigTokenBalance = await pigToken.balanceOf(cryptoExchange.address);
			assert.equal(cryptoExchangePigTokenBalance.toString(), tokens('9990'));
			let cryptoExchangeEthBalance = await web3.eth.getBalance(cryptoExchange.address);
			assert.equal(cryptoExchangeEthBalance.toString(), web3.utils.toWei('3', 'ether'));
		})		
	})

	describe('sellDogTokens()', async () => {
		let result;

		before(async() => {
			await dogToken.approve(cryptoExchange.address, tokens('1000'), { from: investor});
			result = await cryptoExchange.sellDogTokens(tokens('1000'), { from: investor });
		})

		it('CorrectTransferof Tokens and Ether', async () => {
			let investorBalance = await dogToken.balanceOf(investor);
			assert.equal(investorBalance.toString(), tokens('0'));

			let cryptoExchangeDogTokenBalance = await dogToken.balanceOf(cryptoExchange.address);
			assert.equal(cryptoExchangeDogTokenBalance.toString(), tokens('1000000'));
			let cryptoExchangeEthBalance = await web3.eth.getBalance(cryptoExchange.address);
			assert.equal(cryptoExchangeEthBalance.toString(), web3.utils.toWei('2', 'ether'));
		})
	})

	describe('sellSheepTokens()', async () => {
		let result;

		before(async() => {
			await sheepToken.approve(cryptoExchange.address, tokens('100'), { from: investor});
			result = await cryptoExchange.sellSheepTokens(tokens('100'), { from: investor });
		})


		it('CorrectTransferof Tokens and Ether', async () => {
			let investorBalance = await sheepToken.balanceOf(investor);
			assert.equal(investorBalance.toString(), tokens('0'));

			let cryptoExchangeSheepTokenBalance = await sheepToken.balanceOf(cryptoExchange.address);
			assert.equal(cryptoExchangeSheepTokenBalance.toString(), tokens('100000'));
			let cryptoExchangeEthBalance = await web3.eth.getBalance(cryptoExchange.address);
			assert.equal(cryptoExchangeEthBalance.toString(), web3.utils.toWei('1', 'ether'));				
		})
	})

	describe('sellPigTokens()', async () => {
		let result;

		before(async() => {
			await pigToken.approve(cryptoExchange.address, tokens('10'), { from: investor});
			result = await cryptoExchange.sellPigTokens(tokens('10'), { from: investor });
		})


		it('CorrectTransferof Tokens and Ether', async () => {
			let investorBalance = await pigToken.balanceOf(investor);
			assert.equal(investorBalance.toString(), tokens('0'));

			let cryptoExchangePigTokenBalance = await pigToken.balanceOf(cryptoExchange.address);
			assert.equal(cryptoExchangePigTokenBalance.toString(), tokens('10000'));
			let cryptoExchangeEthBalance = await web3.eth.getBalance(cryptoExchange.address);
			assert.equal(cryptoExchangeEthBalance.toString(), web3.utils.toWei('0', 'ether'));				
		})		
	})	

})