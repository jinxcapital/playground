// import fetch from 'node-fetch';
import W3 from 'web3';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

const { argv } = yargs(hideBin(process.argv)).option('address', {
  description: 'Ethereum address',
  string: true,
}) as { argv: { address: string } };

const CONTRACT_ADDRESS = argv.address;
if (!CONTRACT_ADDRESS) {
  console.error('Missing --address argument');
  process.exit(1);
}

const CONTRACT_ABI = require(`./abi.json`);

(async () => {
  console.log(`Contract: ${CONTRACT_ADDRESS}`);

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
  }

  console.log(sample);
})();
