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
        orders: request.body.orders,
        totalAmount: request.body.totalAmount,
        shippingAmount: request.body.shippingAmount,
        discountCode: request.body.discountCode ? request.body.discountCode : '',
        createdAt: currentDate.toISOString()
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
        console.log('MIDDLE', invoiceOrders);
        let orderData = [];
        for (let i = 0; invoiceOrders && i < invoiceOrders.length; i++) {
            const orderId = invoiceOrders[i];
            console.log('LOOP', orderId);
            const orderRef = db.doc(`/orders/${orderId}`);
            const orderSnap = await orderRef.get();
            if(orderSnap.exists) {
                console.log('IN IF', orderSnap.data());
                orderData.push(orderSnap.data());
            }
        }

        invoices.push({
            orders: orderData,
            totalAmount: docSnap.data().totalAmount,
            shippingAmount: docSnap.data().shippingAmount,
            discountCode: docSnap.data().discountCode,
            createdAt: docSnap.data().createdAt
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