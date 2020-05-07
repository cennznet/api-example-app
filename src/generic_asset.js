///
/// This file includes Js API example functions that are related to the
/// Generic Asset module.
///

const { signSendAndMonitor, getAddress } = require('./utilities.js');

const Asset1 = 16000;
const Asset2 = 16001;

async function reportBalances(keyring, api, asset_id) {
	if(asset_id == undefined){
		asset_id = Asset1;
	}

	let [a, b] = await Promise.all([
		api.query.genericAsset.freeBalance(asset_id, getAddress(keyring, "alice")),
		api.query.genericAsset.freeBalance(asset_id, getAddress(keyring, "bob")),
	]);
	console.log(`Asset:${asset_id}: A: ${a}, B:${b}`);

}

async function transfer(keyring, api, to, amount, asset_id) {
	if(asset_id == undefined){
		asset_id = Asset1;
	}
	account_id = getAddress(keyring, to);
	const tx = api.tx.genericAsset
		.transfer(asset_id, account_id, amount.toString() );
	await signSendAndMonitor(tx, keyring.alice);
}

module.exports = {reportBalances, transfer}