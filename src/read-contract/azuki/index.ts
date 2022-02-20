import fetch from 'node-fetch';
import W3 from 'web3';

const CONTRACT_ADDRESS = '0xed5af388653567af2f388e6224dc7c4b3241c544';

(async () => {
  console.log(`Loading ABI for contract ${CONTRACT_ADDRESS}`);
  const CONTRACT_ABI = require(`./abi.json`);

  const w3 = new W3(process.env.W3_PROVIDER as string);
  const contract = new w3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

  let name = null;
  try {
    name = await contract.methods.name().call();
  } catch {}
  let symbol = null;
  try {
    symbol = await contract.methods.symbol().call();
  } catch {}
  let totalSupply = null;
  try {
    totalSupply = await contract.methods.totalSupply().call();
  } catch {}
  let baseURI = null;
  try {
    baseURI = await contract.methods.baseURI().call();
  } catch {}

  const properties = {
    name,
    symbol,
    totalSupply,
    baseURI,
  };

  console.log(properties);

  await new Promise((r) => setTimeout(r, 3000));

  const sample: Record<string, unknown> = {};
  for (let i = 1; i <= 5; i++) {
    try {
      const uri = await contract.methods.tokenURI(i).call();
      sample[`tokenURI(${i})`] = uri;
    } catch {
      sample[`tokenURI(${i})`] = null;
    }

    // const response = await fetch(uri);
    // console.log(await response.json());
  }

  console.log(sample);
})();
