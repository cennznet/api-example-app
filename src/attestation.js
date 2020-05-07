///
/// This file includes Js API example functions that are related to the
/// Attestation module.
///

const { signSendAndMonitor, hexToString, getAddress } = require('./utilities.js');

/// Add a claim into the chain storage.
async function setClaim(keyring, api, holder, topic, value ) {
    const account_id = getAddress(keyring, holder);

    const tx = api.tx.attestation
        .setClaim(account_id, topic.toString(), value.toString());

    console.log(`Creating Claim about: ${holder}, topic: ${topic}, value: ${value}.`);
    await signSendAndMonitor(tx, keyring.alice);
}

/// Add a claim into the chain storage.
async function removeClaim(keyring, api, holder, topic ) {
    const account_id = getAddress(keyring, holder);

    const tx = api.tx.attestation
        .removeClaim(account_id, topic.toString());

    console.log(`Removing Claim about: ${holder}, topic: ${topic}`);
    await signSendAndMonitor(tx, keyring.alice);
}

/// Query for a claim.
async function queryClaim(keyring, api, holder, topic ) {
    const account_id = getAddress(keyring, holder);

    //Note: the parameters needs to be sent as an array [account_id, issuer, topic]
    const value = await api.query.attestation
        .values([account_id, getAddress(keyring, 'alice'), topic.toString()] );

    // Convert the data back to String format
    const result = hexToString(value.toString());
    console.log(`Claim about: ${holder}, on topic: ${topic}\nHas value: ${result}`);
}

module.exports = {setClaim, removeClaim, queryClaim}