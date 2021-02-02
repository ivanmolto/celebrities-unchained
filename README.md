# CELEBRITIES UNCHAINED

A decentralized game based on CelebrityBucks and powered by Tellor.io oracle playground.

Tellor is a decentralized oracle network putting real world data on-chain.

The challenge was to use Tellor Playground and build a project that uses data types Tellor doesn't currently support.

[CelebrityBucks.com](https://celebritybucks.com) assigns dollar values to every mention which allows them to provide a view into both who and what celebrity the world is talking about. But who commands the highest price? It is game time: tap on the more monetisable celebrity's image, or tap "same price" if world is talking about them equally.

A game is a cool showcase using [Tellor](https://tellor.io) oracle playground to check the right or wrong selection at each round. 

Built with love for [Tellor](https://tellor.io) challenge at [Encode Club](https://encode.club) Hack.


## Set up

Clone this repo and once in the directory `celebrities-unchained`, please run the following command in your terminal:

`yarn install`

### Contracts

The contracts folder has been created following the guidelines from Hardhat:

`npm install --save-dev hardhat`

`npx hardhat`

`npm install --save-dev @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai`

The Celebrity.sol contract is using Tellor to read the celebs price from the Celebrity Bucks data and images cached and transformed locally following the terms of use of the endpoint. [More info](https://celebritybucks.com/developers)

To compile the contract, please run the following command:

`npx hardhat compile`

Finally, the Celebrity contract has been deployed to the Ropsten testnet via Infura and running:

`npx hardhat run scripts/deploy.js --network ropsten`

The deployed contract address in Ropsten testnet is: [0x1D50e2c7286224A25295945A7B67B9398aCa64dc](https://ropsten.etherscan.io/address/0x1d50e2c7286224a25295945a7b67b9398aca64dc)

The Tellor Playground aims to help anyone building on Tellor to quickly test and implement ideas and it is available on Ropsten testnet at the address: [0x20374E579832859f180536A69093A126Db1c8aE9](https://ropsten.etherscan.io/address/0x20374E579832859f180536A69093A126Db1c8aE9)


### Submission to Tellor Playground and Data points

Data has been cached and transformed locally at:

`https://d39hli8rzffwqz.cloudfront.net/celebrities.json`

Data points for Tellor oracle Playground are located at:

`https://dul24yhlppwxb.cloudfront.net/${celebId}.json`

A total of 147 data points has been generated for this project.

The data points / requestIds follow this pattern:

`Data Point for celebId = celebId + offset` where offset is 100000.

Run the following command to submit each of the data points to Tellor Playground.
You can find a sample in the repo for one of the data points.

`npx hardhat run scripts/submit.js --network ropsten`


## Deploy
To deploy locally the frontend run in your terminal the following command:

`yarn serve`

If you want to deploy the dApp live, please run in your terminal the following command:

`yarn build`

And host the necessary files in your server.


## License

[MIT](LICENSE)

Images and endpoints only cached for the purposes of this hack challenge following the terms of use of CelebrityBucks for developers.

"Right" and "Wrong" svg's are from https://material.io/resources/icons and they are open source and available under [Apache license version 2.0](https://www.apache.org/licenses/LICENSE-2.0.html)

