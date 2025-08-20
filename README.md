# Dummy Token UI

A simple UI for a [Dummy Token](https://github.com/decentraland/dummy-token). This frontend allows users to connect their wallet, check their token balance, and transfer tokens. It is built using `react` + `redux` + `redux-saga` with [Decentraland UI](https://ui.decentraland.org/) components.

## Features

- Connect wallet using MetaMask
- Display connected wallet address
- Check Dummy Token balance
- Transfer Dummy tokens to other addresses
- Responsive design: use it on any device!

## Links

#### You can access the Dummy Token UI deployed version at [decentraland-dapp-challenge.vercel.app](https://decentraland-dapp-challenge.vercel.app) 🚀

- Dummy Token Contract on Sepolia: [0x73550bE1f8eBaFaFb3A5F4587579D2D9c993d228](https://sepolia.etherscan.io/address/0x73550bE1f8eBaFaFb3A5F4587579D2D9c993d228#code)
- Dummy Token Repo: [Github](https://github.com/decentraland/dummy-token)
- Sepolia Faucet: [Claim Sepolia ETH](https://cloud.google.com/application/web3/faucet/ethereum/sepolia) (You'll need some Sepolia ETH in your wallet to interact with the Dummy Token deployed UI).

## Local Setup

1. Create environment file: `cp .env.example .env`
2. Update `VITE_TOKEN_ADDRESS` in `.env` with your deployed token contract address.
3. Run `npm install`
4. Run `npm start`

On your Metamask extension, you should switch to Ethereum Sepolia Network before interacting with the Dummy Token. When you interact with the UI, it should automatically detect the network and connect to the correct contract. Ensure you have some Sepolia ETH in your wallet to interact with the Dummy Token, you need it to pay for gas fees.

Tip: [Claim Sepolia ETH here](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)

You can also setup a local ethereum development environment and deploy the Dummy Token there, to do that [follow these instructions](https://github.com/decentraland/dummy-token#setup).

## Environment Variables

- `VITE_TOKEN_ADDRESS`: The address of your deployed ERC-20 Dummy Token contract. Note: the .env.sample already includes the address to a Dummy Token deployed on Sepolia. You can use that address for testing or replace it with your own. Just ensure to connect to the correct network in Metamask.

## Directory structure and standards

The repository splits the `redux` logic into `modules`, which contain all the actions/sagas/reducer/selectors for a specific domain. The `react` components can be found under the `components` directory, each component has its own directory which contains always a `.tsx` file with the component itself and a `.css` file with its styles. The components are always pure, and if they need to be connected to the redux store it is done by wrapping it with a `.container.ts` file that maps the necessary properties and callbacks to extract the data from the store and dispatch the required actions.
