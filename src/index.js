//Imports functions from other files
const { reportBalances, transfer } = require('./generic_asset.js');
const { addLiquidity, removeLiquidity, liquidityValue, liquidityPrice, buyPrice, sellPrice, buyAsset, sellAsset}
	= require('./cennz_x_spot_exchange.js');
const { setClaim, removeClaim, queryClaim } = require('./attestation.js');

//Import other dependencies
const { Api } = require('@cennznet/api');
const testingPairs = require('@polkadot/keyring/testingPairs');
const keyring = testingPairs.default({ type: 'sr25519'});
const cli = require('./cli.js');

if (require.main === module) {
  run("ws://localhost:9944")
    .then(result => process.exit(result))
    .catch(fail => {
    console.error(`Error:`, fail);
    process.exit(fail[0]);
  });
}

async function parseCommand(settings, api){
	console.log(`>>>${settings.command}`)
	switch(settings.command) {
		//Generic Asset
		case `transfer`:
			await transfer(keyring, api, settings.to, settings.amount, settings.asset_id);
			break;
		case `balances`:
			await reportBalances(keyring, api, settings.asset_id);
			break;

		//Cennz X Spot Exchange: Liquidity
		case 'add_liquidity':
			await addLiquidity(keyring, api, settings.asset_id, settings.asset_amount, settings.core_amount);
			break;
		case 'remove_liquidity':
			await removeLiquidity(keyring, api, settings.asset_id, settings.amount, settings.min_trade_asset_amount, settings.min_core_asset_amount);
			break;
		case 'liquidity_value':
			await liquidityValue(keyring, api, settings.account, settings.asset_id);
			break;
		case 'liquidity_price':
			await liquidityPrice(keyring, api, settings.asset_id, settings.amount);
			break;

		//Cennz X Spot Exchange: Asset Exchange
		case 'buy_price':
			await buyPrice(keyring, api, settings.asset_to_buy, settings.buy_amount, settings.asset_to_sell);
			break;
		case 'sell_price':
			await sellPrice(keyring, api, settings.asset_to_sell, settings.sell_amount, settings.asset_to_buy);
			break;
		case 'buy_asset':
			await buyAsset(keyring, api, settings.recipient, settings.asset_to_sell, settings.asset_to_buy, settings.buy_amount);
			break;
		case 'sell_asset':
			await sellAsset(keyring, api, settings.recipient, settings.asset_to_sell, settings.asset_to_buy, settings.sell_amount);
			break;

		// Attestation module:
		case 'set_claim':
			await setClaim(keyring, api, settings.holder, settings.topic, settings.value);
			break;
		case 'remove_claim':
			await removeClaim(keyring, api, settings.holder, settings.topic);
			break;
		case 'query_claim':
			await queryClaim(keyring, api, settings.holder, settings.topic);
			break;

		default:
			break;
	}
}

async function run(address) {
	// Do parseCli first so that we don't connect if we don't need to
	const settings = cli.parseCli();

  // Initialise the provider to connect to the local node
  console.log(`Connecting to ${address}`);

  // Create the API and wait until ready
  const api = await Api.create({
    provider: address
  });

  // Retrieve the chain & node information information via rpc calls
  const [chain, nodeName, nodeVersion] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version(),
  ]);

	console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);

	await parseCommand(settings, api);
}

