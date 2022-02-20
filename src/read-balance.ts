import W3 from 'web3';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

const { argv } = yargs(hideBin(process.argv)).option('address', {
  description: 'Ethereum address',
  string: true,
}) as { argv: { address: string } };

const ADDRESS = argv.address;
if (!ADDRESS) {
  console.error('Missing --address argument');
  process.exit(1);
}

(async () => {
  const w3 = new W3(process.env.W3_PROVIDER as string);

  try {
    let address = ADDRESS;

    // resolve address if ENS domain name pas provided
    if (address.includes('.eth')) {
      address = await w3.eth.ens.getAddress(ADDRESS);
    }

    const result = await w3.eth.getBalance(address);
    console.log(W3.utils.fromWei(result, 'ether') + ' ETH');
  } catch (e) {
    console.error(e);
  }
})();
