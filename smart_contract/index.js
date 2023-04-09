var ethers = require('ethers');  
var url = 'ADD_YOUR_ETHEREUM_NODE_URL';
var customHttpProvider = new ethers.providers.JsonRpcProvider(url);
customHttpProvider.getBlockNumber().then((result) => {
    console.log("Current block number: " + result);
});