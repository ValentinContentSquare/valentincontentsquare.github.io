function heapIdentify() {
    const identity = document.getElementById('identity').value;
    const hash = document.getElementById('hash').checked;
    window._uxa.push(["identify", identity, {hash}]);
    alert('Identified as: ' + identity);
}

function addUserProperties() {
    const prop1value = document.getElementById('userprop1value').value;
    const propsJson = JSON.parse(prop1value);
    window._uxa.push(["addUserProperties", propsJson]);
    alert('Added user properties: ' + propsJson);
}

function resetIdentity() {
    window._uxa.push(["resetIdentity"]);
    alert('Identity reseted');
}

function getIdentity() {
    alert('Identity: ' + window._uxa.push(["getIdentity"]));
}

// cf https://docs.contentsquare.com/en/web/sending-ecommerce-commands/#sending-a-transaction-without-cs-merchandising
function triggerCSTransaction(kittyPrice) {
    window._uxa = window._uxa || [];

    // Push transaction info into CS global object
    window._uxa.push(['ec:transaction:create', {
        'id': Date.now().toString(), /* Transaction ID (string, up to 40 characters) */
        'revenue': kittyPrice, /* Transaction's total amount paid (integer or string, up to 12 digits and 2 decimals - extra decimals are truncated) */
        'currency': 'usd' /* Currency value (string - numeric or alphanumeric ISO 4217 value) (optional) */
    }]);

    // Send the information to Contentsquare
    window._uxa.push(['ec:transaction:send']);
}