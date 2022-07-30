const { validatePaytmTransactionData } = require("../utils/validators");
const https = require('https');
const PaytmChecksum = require("../utils/paytm-checksum");

const MID = {
    WEBSTAGING: 'GnXWhe55278482359058',
    DEFAULT: 'hQqULq00319048058834'
};

const baseURL = {
    WEBSTAGING: 'securegw-stage.paytm.in',
    DEFAULT: 'securegw.paytm.in'
};

const merchantKey = {
    WEBSTAGING: 'Yg%G5gAjjKfnwyNX',
    DEFAULT: 'I@L6z7T@fnF1jB6X'
}

exports.initiatePaytmTransaction = (request, response) => {
    const { valid, errors } = validatePaytmTransactionData(request.body);

    if(!valid) {
        return response.status(400).json(errors);
    }

    const { orderId, websiteName, transactionAmount } = request.body;

    const mid = MID[websiteName];

    const paytmParams = {};

    paytmParams.body = {
        "requestType"   : "Payment",
        "mid"           : MID[websiteName],
        "websiteName"   : websiteName,
        "orderId"       : orderId,
        "callbackUrl"   : "https://crazychimp.org/",
        "txnAmount"     : {
            "value"     : +transactionAmount.toFixed(2),
            "currency"  : "INR",
        },
        "userInfo"      : {
            "custId"    : request.uid,
        },
    };

    PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), merchantKey[websiteName]).then(function(checksum) {
        paytmParams.head = {
            "signature": checksum
        };

        const post_data = JSON.stringify(paytmParams);

        const options = {
            hostname: baseURL[websiteName],    
            port: 443,
            path: `/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': post_data.length
            }
        };
    
        let res = "";
        const post_req = https.request(options, function(post_res) {
            post_res.on('data', function (chunk) {
                res += chunk;
            });
    
            post_res.on('end', function(){
                console.log('Response: ', res);
                const parsedResponse = JSON.parse(res);
                if(parsedResponse && parsedResponse?.body?.txnToken) {
                    return response.json({ txnToken: parsedResponse.body.txnToken });
                }
                else {
                    return response.status(400).json(parsedResponse);
                }
            });
        });
        console.log('Request :', paytmParams);
        post_req.write(post_data);
        post_req.end();
    });
};