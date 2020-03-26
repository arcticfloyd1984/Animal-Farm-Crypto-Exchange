import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import DogToken from '../abis/DogToken.json';
import SheepToken from '../abis/SheepToken.json';
import PigToken from '../abis/PigToken.json';
import CryptoExchange from '../abis/CryptoExchange.json';
import Navbar from './Navbar';
import Main from './Main';


class App extends Component {

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0]});

    const ethBalance = await web3.eth.getBalance(this.state.account);
    this.setState({ ethBalance });

    const networkId = await web3.eth.net.getId();

    //Load Dog Token
    const dogTokenData = DogToken.networks[networkId];
    if(dogTokenData) {
      const dogToken = new web3.eth.Contract(DogToken.abi, dogTokenData.address);
      this.setState({ dogToken });
      let dogTokenBalance = await dogToken.methods.balanceOf(this.state.account).call();
      this.setState({ dogTokenBalance: dogTokenBalance.toString() }); 
    } else {
      window.alert('Token not deployed on the network');
    }


    //Load Sheep Token
    const sheepTokenData = SheepToken.networks[networkId];
    if(sheepTokenData) {
      const sheepToken = new web3.eth.Contract(SheepToken.abi, sheepTokenData.address);
      this.setState({ sheepToken });
      let sheepTokenBalance = await sheepToken.methods.balanceOf(this.state.account).call();
      this.setState({ sheepTokenBalance: sheepTokenBalance.toString() });
    } else {
      window.alert('Token not deployed on the network');
    }


    //Load Pig Token
    const pigTokenData = PigToken.networks[networkId];
    if(pigTokenData) {
      const pigToken = new web3.eth.Contract(PigToken.abi, pigTokenData.address);
      this.setState({ pigToken });
      let pigTokenBalance = await pigToken.methods.balanceOf(this.state.account).call();
      this.setState({ pigTokenBalance: pigTokenBalance.toString() });
    } else {
      window.alert('Token not deployed on the given network');
    }


    // Load Crypto-Exchange
    const cryptoExchangeData = CryptoExchange.networks[networkId];
    if(cryptoExchangeData) {
      const cryptoExchange = new web3.eth.Contract(CryptoExchange.abi, cryptoExchangeData.address);
      this.setState({ cryptoExchange })
    } else {
      window.alert('Crypto-Exchange contract not deployed on the given network');
    }

    this.setState({ loading:false })

  }  

  async loadWeb3() {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } 
    else if(window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } 
    else {
      window.alert('Non-Ethereum browser detected, please install MetaMask');
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      dogToken: {},
      sheepToken: {},
      pigToken: {},
      cryptoExchange: {},
      ethBalance: '0',
      dogTokenBalance: '0',
      sheepTokenBalance: '0',
      pigTokenBalance: '0',
      loading: true
    }
  }

  buyDogTokens = (etherAmount) => {
    this.setState({ loading: true });
    this.state.cryptoExchange.methods.buyDogTokens().send({ value: etherAmount, from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false });
    })
  }

  buySheepTokens = (etherAmount) => {
    this.setState({ loading: true });
    this.state.cryptoExchange.methods.buySheepTokens().send({ value: etherAmount, from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false });
    })
  }

  buyPigTokens = (etherAmount) => {
    this.setState({ loading: true });
    this.state.cryptoExchange.methods.buyPigTokens().send({ value: etherAmount, from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false });
    })
  }

  sellDogTokens = (dogTokenAmount) => {
    this.setState({ loading: true });
    this.state.dogToken.methods.approve(this.state.cryptoExchange.address, dogTokenAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.cryptoExchange.methods.sellDogTokens(dogTokenAmount).send({ from: this.state.account}).on('transactionHash', (hash) => {
        this.setState({ loading: false });
      })
    })
  }

  sellSheepTokens = (sheepTokenAmount) => {
    this.setState({ loading: true });
    this.state.sheepToken.methods.approve(this.state.cryptoExchange.address, sheepTokenAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.cryptoExchange.methods.sellSheepTokens(sheepTokenAmount).send({ from: this.state.account}).on('transactionHash', (hash) => {
        this.setState({ loading: false });
      })
    })
  }

  sellPigTokens = (pigTokenAmount) => {
    this.setState({ loading: true });
    this.state.pigToken.methods.approve(this.state.cryptoExchange.address, pigTokenAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.cryptoExchange.methods.sellPigTokens(pigTokenAmount).send({ from: this.state.account}).on('transactionHash', (hash) => {
        this.setState({ loading: false });
      })
    })
  }    

  render() {
    let content;

    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main 
        ethBalance = {this.state.ethBalance}
        dogTokenBalance = {this.state.dogTokenBalance}
        sheepTokenBalance = {this.state.sheepTokenBalance}
        pigTokenBalance = {this.state.pigTokenBalance}
        buyDogTokens = {this.buyDogTokens}
        buySheepTokens = {this.buySheepTokens}
        buyPigTokens = {this.buyPigTokens}
        sellDogTokens = {this.sellDogTokens}
        sellSheepTokens = {this.sellSheepTokens}
        sellPigTokens = {this.sellPigTokens}
      />
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                 {content}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
