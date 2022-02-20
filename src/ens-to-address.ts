import W3 from 'web3';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

const { argv } = yargs(hideBin(process.argv)).option('ens', {
  description: 'Ethereum ENS',
  string: true,
}) as { argv: { ens: string } };

const ENS = argv.ens;
if (!ENS) {
  console.error('Missing --ens argument');
  process.exit(1);
}

(async () => {
  const w3 = new W3(process.env.W3_PROVIDER as string);

  try {
    const address = await w3.eth.ens.getAddress(ENS);
    console.log(`Address: ${address}`);
  } catch (e) {
    console.error(e);
  }
})();
