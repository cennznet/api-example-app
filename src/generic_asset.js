///
/// This file includes Js API example functions that are related to the 
/// Generic Asset module.
///

const Asset1 = 16000;
const Asset2 = 16001;

async function reportBalances(keyring, api, asset_id) {
	if(asset_id == undefined){
		asset_id = Asset1;
	}

	let [a, b] = await Promise.all([
		api.query.genericAsset.freeBalance(asset_id, keyring.alice.address),
		api.query.genericAsset.freeBalance(asset_id, keyring.bob.address),
	]);

	console.log(`Asset:${asset_id}: A: ${a}, B:${b}`);

}

async function transfer(keyring, api, to, amount, asset_id, sub) {
	if(asset_id == undefined){
		asset_id = Asset1;
	}
	account_id = keyring[to].address;
	if(sub != true ) {
		await transfer_no_sub(keyring, api, account_id, amount, asset_id);
	}
	else {
		await transfer_with_sub(keyring, api, account_id, amount, asset_id);
	}
}

async function transfer_no_sub(keyring, api, to, amount, asset_id) {
	const txHash = await api.tx.genericAsset
		.transfer(asset_id, to, amount.toString() )
		.signAndSend(keyring.alice);
	console.log(`Transfer amount: ${amount}, Asset:${asset_id}`);
}

async function transfer_with_sub(keyring, api, to, amount, asset_id) {
	let waiting = true;
	let success = false
	const unsub = await api.tx.genericAsset
		.transfer(asset_id, to, amount.toString())
		.signAndSend(keyring.alice, ({events = [], status}) => {
			console.log(`Current status is ${status.type}`);

			if (status.isFinalized) {
				console.log(`Transaction included at blockHash ${status.asFinalized}`);

				// Loop through Vec<EventRecord> to display all events
				events.forEach(({phase, event: {data, method, section}}) => {
					console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
					if (section == 'system' && method == 'ExtrinsicSuccess') {
						success = true;
					}
				});
				waiting = false;
				unsub();
			}
		});

	//Hang back and wait until the transaction is complete. Time out after awhile to avoid infinite loops.
	let timeout = 30;
	while(waiting && timeout > 0) {
		await sleepMs(1000);
		timeout -= 1;
	}
	console.log(`Transfer with sub to events. Amount:${amount}, Asset:${asset_id}`);
	if (success) {
		console.log("Transaction is Successful");
	} else {
		console.log("Transaction Failed")
	}

}

function sleepMs(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {reportBalances, transfer}