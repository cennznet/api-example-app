///
/// This file includes Js API example functions that are related to the
/// Attestation module.
///

const { GetAddress } = require('./cennz_x_spot_exchange.js');

/// Add a claim into the chain storage.
async function setClaim(keyring, api, holder, topic, value ) {
    const account_id = GetAddress(keyring, holder);
    const tx = await api.tx.attestation
        .setClaim(account_id, topic.toString(), value.toString()).signAndSend(keyring.alice);
    console.log(`Creating Claim about:${holder}, topic:${topic}, value:${value}. \nhash:${tx}`);
}

/// Add a claim into the chain storage.
async function removeClaim(keyring, api, holder, topic ) {
    const account_id = GetAddress(keyring, holder);
    await api.tx.attestation
        .removeClaim(account_id, topic.toString() )
        .signAndSend(keyring.alice);
    console.log(`Removing Claim about:${holder}, topic:${topic}`);
}

/// Query for a claim.
async function queryClaim(keyring, api, holder, topic ) {
    const account_id = GetAddress(keyring, holder);

    //Note: the parameters needs to be sent as an array [account_id, issuer, topic]
    const value = await api.query.attestation
        .values([account_id, GetAddress(keyring, 'alice'), topic.toString()] );

    // Convert the data back to String format
    const result = HexToString(value.toString());
    console.log(`Claim about:${holder} on topic:${topic}\nHas value:${result}`);
}

function HexToString(hex) {
    str = "";
    for (let i = 0; i < hex.length; i+=2) {
        const charCode = Number("0x" + hex.slice(i, i+2));
        str += String.fromCharCode(charCode);
    }
    return str;
}

module.exports = {setClaim, removeClaim, queryClaim, }