function heapIdentify() {
    const feedback = document.getElementById('feedback').value;
    heap.identify(feedback);
    alert('Thank you for your feedback: ' + feedback);
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