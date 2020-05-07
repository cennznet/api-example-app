async function signSendAndMonitor(tx, signer, timeoutMs=10000) {
  let waiting = true;
  let waitMs = 0;
  let unsub = await tx.signAndSend(signer, ({ events = [], status }) => {
      console.log(`Current status is ${status.type}`);

      if (status.isFinalized) {
          console.log(`Transaction included at blockHash ${status.asFinalized}`);

          // Loop through Vec<EventRecord> to look for ExtrinsicSuccess
          events.forEach(({ phase, event }) => {
              console.log(`\t' ${phase}: ${event.section}.${event.method}:: ${event.data}`);
              if (event.section == 'system' && event.method == 'ExtrinsicSuccess') {
                  success = true;
              }
          });
          unsub();
          waiting = false;
      }
  });

  // Wait until the extrinsic has been finalized
  // In production you could do something useful here instead ;)
  while(waiting && waitMs < timeoutMs) {
      waitMs += 100;
      await sleepMs(100);
  }
}

function getAddress(keyring, account) {
  //un-tested
  let target = keyring.alice.address;
  if( account != undefined ){
      target = keyring[account].address;
  }
  return target;
}

function hexToString(hex) {
  str = "";
  for (let i = 0; i < hex.length; i+=2) {
      const charCode = Number("0x" + hex.slice(i, i+2));
      str += String.fromCharCode(charCode);
  }
  return str;
}

function sleepMs(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {signSendAndMonitor, getAddress, hexToString, sleepMs}