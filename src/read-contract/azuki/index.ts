import fetch from 'node-fetch';
import W3 from 'web3';

const CONTRACT_ADDRESS = '0xed5af388653567af2f388e6224dc7c4b3241c544';

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

    await new Promise((r) => setTimeout(r, 3000));

    for (let i = 1; i <= 5; i++) {
      const uri = await contract.methods.tokenURI(i).call();
      console.log(`tokenURI(${i}): ${uri}`);
      const response = await fetch(uri);
      console.log(await response.json());
    }
  } catch (e) {
    console.error(e);
  }
})();
