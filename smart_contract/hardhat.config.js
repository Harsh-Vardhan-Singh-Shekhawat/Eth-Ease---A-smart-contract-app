// require("@nomicfoundation/hardhat-toolbox");
// module.exports = {
//   solidity: "0.8.18",
//   networks: {
//     url: 'https://eth-sepolia.g.alchemy.com/v2/YvsrE0PZYuWnLkVOSWSFao-wSCCWboir',
//     accounts: ['6905df9374f969771b53d6cbfabbcb960eef93a81b7f3f53823eae0058f9c8af']
//   }
// };

require('@nomiclabs/hardhat-waffle');
module.exports = {
  solidity: "0.8.18",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    sepolia : {
      url: 'https://eth-sepolia.g.alchemy.com/v2/YvsrE0PZYuWnLkVOSWSFao-wSCCWboir',
      accounts:['6905df9374f969771b53d6cbfabbcb960eef93a81b7f3f53823eae0058f9c8af']

    }
  }
}