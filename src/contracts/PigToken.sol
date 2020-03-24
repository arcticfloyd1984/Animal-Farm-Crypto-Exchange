pragma solidity ^0.5.0;

contract PigToken {

	string public name = "Pig Token";
	string public symbol = "PIG";
	uint8 public decimals = 18;
	uint256 public totalSupply = 1000000000000000000000000;

	mapping(address => uint256) balanceOf;
	mapping (address => mapping(address => uint256)) allowance;
	
	constructor() {
		balanceOf[msg.sender] = totalSupply;
	}

	event Transfer(
		address _from,
		address _to,
		uint256 _value
	);

	event Approval(
		address _owner,
		address _spender,
		uint256 _value
	);

	function name() public view returns(string) {
		return name;
	}

	function symbol() public view returns(string) {
		return symbol;
	}

	function decimals() public view returns(uint8) {
		return decimals;
	}

	function totalSupply() public view returns(uint256) {
		return totalSupply;
	}

	function balanceOf(address _owner) public view returns(uint256) {
		return balanceOf[_owner];
	}

	function allowance(address _owner, address _spender) public view returns(uint256) {
		return allowance[_owner][_spender];
	}


	function transfer(address _to, uint256 _value) public returns(bool success) {
		require(balanceOf[msg.sender] >= _value);
		balanceOf[msg.sender] -= _value;
		balance[_to] += _value;
		emit Transfer(msg.sender, _to, _value);
		return true;
	}

	function transferFrom(address _from, address _to, uint256 _value) public returns(bool success) {
		require(balanceOf[_from] >= _value);
		require(allowance[_from][msg.sender] >= _value);
		balanceOf[_from] -= _value;
		balanceOf[_to] += _value;
		allowance[_from][msg.sender] -= _value;
		emit Transfer(_from, _to, _value);
		return true;
	}

	function approve(address _spender, uint256 _value) public returns(bool success) {
		allowance[msg.sender][_spender] = _value;
		emit Approval(msg.sender, _spender, _value);
		return true;
	}


}