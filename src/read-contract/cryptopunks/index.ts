import W3 from 'web3';

const CONTRACT_ADDRESS = '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb';

(async () => {
  console.log(`Loading ABI for contract ${CONTRACT_ADDRESS}`);
  const CONTRACT_ABI = require(`./abi.json`);

  const w3 = new W3(process.env.W3_PROVIDER as string);
  const contract = new w3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

  try {
    const properties = {
      name: await contract.methods.name().call(),
      symbol: await contract.methods.symbol().call(),
      totalSupply: await contract.methods.totalSupply().call(),
    };

    console.log(properties);
  } catch (e) {
    console.error(e);
  }
})();
