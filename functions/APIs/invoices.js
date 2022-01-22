const { db } = require('../utils/admin');

const { validateInvoiceData } = require('../utils/validators');

exports.addInvoice = (request, response) => {
    const { valid, errors } = validateInvoiceData(request.body);

    if(!valid) {
        return response.status(400).json(errors);
    }

    const currentDate = new Date();

    const newInvoiceItem = {
        userId: request.uid,
        addressId: request.body.addressId,
        orders: request.body.orders,
        paymentMethod: request.body.paymentMethod,
        productTotalAmount: request.body.productTotalAmount,
        shippingAmount: request.body.shippingAmount,
        codAmount: request.body.codAmount ? request.body.codAmount : '',
        discountAmount: request.body.discountAmount ? request.body.discountAmount : '',
        discountCode: request.body.discountCode ? request.body.discountCode : '',
        createdAt: currentDate.toISOString(),
        status: 'PROCESSING',
        trackingLink: ''
    };

    db.collection('invoices')
    .add(newInvoiceItem)
    .then((doc) => {
        const responseItem = newInvoiceItem;
        responseItem.id = doc.id;
        return response.json(responseItem);
    })
    .catch((err) => {
        console.error(err);
        return response.status(500).json({error: err.code});
    });
};

exports.deleteInvoice = (request, response) => {
    const document = db.doc(`/invoices/${request.params.invoiceId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: 'Invoice not found' });
            }
            
            return document.delete();
        })
        .then(() => {
            response.json({ message: 'Delete successfull' });
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        });
};

exports.editInvoice = (request, response) => {
    if(request.body.invoiceId || request.body.userId){
        response.status(403).json({message: 'Not allowed to edit'});
    }

    let document = db.collection('invoices').doc(`${request.params.invoiceId}`);
    document.update(request.body)
    .then(()=> {
        response.json({message: 'Updated successfully'});
    })
    .catch((err) => {
        console.error(err);
        return response.status(500).json({ 
                error: err.code 
        });
    });
};

exports.getInvoice = (request, response) => {
    const { invoiceId } = request.params;

    if(invoiceId) {
        const document = db.doc(`/invoices/${request.params.invoiceId}`);
        document
        .get()
        .then(async (doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: 'Invoice not found' });
            }
            
            const invoiceData = doc.data();
            let orderData = [];

            for (let index = 0; invoiceData.orders && index < invoiceData.orders.length; index++) {
                const orderId = invoiceData.orders[index];
                const orderRef = db.doc(`/orders/${orderId}`);
                const orderSnap = await orderRef.get();

                if(orderSnap.exists) {
                    orderData.push(orderSnap.data());
                }
            }

            const result = {...invoiceData, orders: orderData};

            return response.status(200).json(result);
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        });
    }
    else {
        return response.status(400).json({ error: 'Invalid Request' });
    }
};

const populateInvoiceList = async(result) => {
    let invoices = [];
    
    for(let j=0; j < result.docs.length; j++) {
        const docSnap = result.docs[j];
        const invoiceOrders = docSnap.data().orders;
        let orderData = [];
        for (let i = 0; invoiceOrders && i < invoiceOrders.length; i++) {
            const orderId = invoiceOrders[i];
            const orderRef = db.doc(`/orders/${orderId}`);
            const orderSnap = await orderRef.get();
            if(orderSnap.exists) {
                orderData.push(orderSnap.data());
            }
        }
        const addressId = docSnap.data().addressId;
        const addressRef = db.doc(`/addresses/${addressId}`);
        const addressSnap = await addressRef.get();

        invoices.push({
            orders: orderData,
            productTotalAmount: docSnap.data().productTotalAmount,
            shippingAmount: docSnap.data().shippingAmount,
            discountCode: docSnap.data().discountCode,
            createdAt: docSnap.data().createdAt,
            paymentMethod: docSnap.data().paymentMethod,
            codAmount: docSnap.data().codAmount,
            discountAmount: docSnap.data().discountAmount,
            status: docSnap.data().status,
            shippingAddress : addressSnap.exists ? addressSnap.data() : {},
            trackingLink: docSnap.data().trackingLink
        });
    };

    return invoices;
};

exports.getInvoicesByUserId = (request, response) => {
    db.collection('invoices')
    .where('userId', '==', request.uid)
	.get()
	.then(async(result) => {
        let invoices = await populateInvoiceList(result);
        return invoices;
	})
    .then((invoices) => {
        return response.json(invoices);
    })
	.catch((err) => {
		console.error(err);
		return response.status(500).json({ error: err.code});
	});
};