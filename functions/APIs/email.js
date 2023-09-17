const gaxios = require('gaxios');

exports.sendEmail = (request, response) => {
    const options = {
        url: 'https://control.msg91.com/api/v5/email/send',
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authkey: '401938A9IXNOfk64bbe042P1'
        },
        data: {
            recipients: [{ to: [{ name: request.body.name, email: request.email }], cc: [{ email: "crazychimpofficial@gmail.com" }] }],
            from: { name: 'Crazy Chimp', email: 'sender@mail.crazychimp.org' },
            domain: 'mail.crazychimp.org',
            template_id: request.body?.paymentMode === "ONLINE" ? 'ORDER_CONFIRMATION_ONLINE' : 'ORDER_CONFIRMATION_COD'
        }
    };

    gaxios.request(options)
        .then(res => {
            if (res && res.data && res.data.status === "success") {
                return response.json({ status: 'success' });
            }
            else {
                return response.status(500).json({ error: "Something went wrong!" })
            }
        }).catch(err => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        });
};