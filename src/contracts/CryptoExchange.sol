pragma solidity ^0.5.0;

import './DogToken.sol';
import './SheepToken.sol';
import './PigToken.sol';

contract CryptoExchange {

	string public name = "Crypto Exchange";
	DogToken public dogToken;
	SheepToken public sheepToken;
	PigToken public pigToken;
	uint public dogRate = 1000;
	uint public sheepRate = 100;
	uint public pigRate = 10;


	event DogTokensPurchased(
		address account,
		address dogToken,
		uint dogTokenAmount,
		uint dogRate
	);

	event SheepTokensPurchased(
		address account,
		address sheepToken,
		uint sheepTokenAmount,
		uint sheepRate
	);


	event PigTokensPurchased(
		address account,
		address pigToken,
		uint pigTokenAmount,
		uint pigRate
	);

	event DogTokensSold(
		address account,
		address dogToken,
		uint dogTokenAmount,
		uint dogRate
	);

	event SheepTokensSold(
		address account,
		address sheepToken,
		uint sheepTokenAmount,
		uint sheepRate
	);

	event PigTokensSold(
		address account,
		address pigToken,
		uint piggTokenAmount,
		uint pigRate
	);

	constructor(DogToken _dogToken,SheepToken _sheepToken,PigToken _pigToken) public {
		dogToken = _dogToken;
		sheepToken = _sheepToken;
		pigToken = _pigToken;
	}

	function buyDogTokens() public payable {
		uint dogTokenAmount = msg.value*dogRate;
		require(dogToken.balanceOf(address(this)) >= dogTokenAmount, "Not enough Dog Tokens present currently in the exchange");
		dogToken.transfer(msg.sender, dogTokenAmount);
		emit DogTokensPurchased(msg.sender, address(dogToken), dogTokenAmount, dogRate);
	}

	function buySheepTokens() public payable {
		uint sheepTokenAmount = msg.value*sheepRate;
		require(sheepToken.balanceOf(address(this)) >= sheepTokenAmount, "Not enough Sheep Tokens present currently in the exchange");
		sheepToken.transfer(msg.sender, sheepTokenAmount);
		emit SheepTokensPurchased(msg.sender, address(sheepToken), sheepTokenAmount, sheepRate);
	}


	function buyPigTokens() public payable {
		uint pigTokenAmount = msg.value*pigRate;
		require(pigToken.balanceOf(address(this)) >= pigTokenAmount, "Not enough Pig Tokens present currently in the exchange");
		pigToken.transfer(msg.sender, pigTokenAmount);
		emit PigTokensPurchased(msg.sender, address(pigToken), pigTokenAmount, pigRate);
	}

	function sellDogTokens(uint _amount) public {
		require(dogToken.balanceOf(msg.sender) >= _amount, "You don't have enough Dog Tokens currently");
		uint etherAmount = _amount/dogRate;
		require(address(this).balance >= etherAmount);
		dogToken.transferFrom(msg.sender, address(this), _amount);
		msg.sender.transfer(etherAmount);
		emit DogTokensSold(msg.sender, address(dogToken), _amount, dogRate);
	}

	function sellSheepTokens(uint _amount) public {
		require(sheepToken.balanceOf(msg.sender) >= _amount, "You don't have enough Sheep Tokens currently");
		uint etherAmount = _amount/sheepRate;
		require(address(this).balance >= etherAmount);
		sheepToken.transferFrom(msg.sender, address(this), _amount);
		msg.sender.transfer(etherAmount);
		emit SheepTokensSold(msg.sender, address(sheepToken), _amount, sheepRate);		
	}

	function sellPigTokens(uint _amount) public {
		require(pigToken.balanceOf(msg.sender) >= _amount, "You don't have enough Pig Tokens currently");
		uint etherAmount = _amount/pigRate;
		require(address(this).balance >= etherAmount);
		pigToken.transferFrom(msg.sender, address(this), _amount);
		msg.sender.transfer(etherAmount);
		emit PigTokensSold(msg.sender, address(pigToken), _amount, pigRate);			
	}	

}