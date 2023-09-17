const { db } = require('../utils/admin');
const { validateDiscountData } = require('../utils/validators');

exports.addDiscountVoucher = (request, response) => {
    const { valid, errors } = validateDiscountData(request.body);

    if(!valid) {
        return response.status(400).json(errors);
    }

    const newDiscountCode = {
        code: request.body.code,
        description : request.body.description,
        discount: request.body.discount,
        discountType: request.body.discountType, //FLAT OR PERCENT OR PERPRODUCT
        isEnabled: request.body.isEnabled,
        validFrom: new Date(request.body.validFrom).toISOString(),
        validUntil: new Date(request.body.validUntil).toISOString(),
        frequencyPerUser: request.body.frequencyPerUser,
        cartMinValue: request.body.cartMinValue,
        cartMaxValue: request.body.cartMaxValue,
        cartMinItems: request.body.cartMinItems,
        cartMaxItems: request.body.cartMaxItems,
        productType: request.body.productType
    };

    db.collection('discounts').add(newDiscountCode)
    .then((doc) => {
        const responseItem = newDiscountCode;
        responseItem.id = doc.id;
        return response.json(responseItem);
    })
    .catch(err => {
        console.error(err);
        return response.status(500).json({error: err.code});
    });
};

exports.getDiscountCodes = (request, response) => {
    db
    .collection('discounts')
    .where('isEnabled', '==', true)
    .get()
    .then((data) => {
        let discounts = [];
        data.forEach((doc) => {
            discounts.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return response.json(discounts);
    })
    .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code});
    });
};

const checkOrdersForEachInvoice = (result) => {
    const discountEligibility = {
        OST_HST_QTY : 2,
        SWTS_QTY : 2,
        HOODIES_QTY : 2 
    };

    const orderQty = {
        OST_HST_QTY : 0,
        SWTS_QTY : 0,
        HOODIES_QTY : 0 
    };

    for(let j=0; j < result.length; j++) {
        const element = result[j].data();
        for (let index = 0; index < element?.orders.length; index++) {
            const order = element?.orders[index];
            if(order?.productImage.includes('HOODIES')) {
                orderQty["HOODIES_QTY"] += 1;
            }
            else if(order?.productImage.includes('OST') || order?.productImage.includes('HST')) {
                orderQty["OST_HST_QTY"] += 1;
            }
            else if(order?.productImage.includes('SWTS')) {
                orderQty["SWTS_QTY"] += 1;
            }
        }
    }

    console.log('CALCULATE', orderQty);

    return { discountEligibility, orderQty };
};

const getInvoices = (uid, date, response) => {
    if(date) {
        const requestDate = new Date(date).toISOString().split('T')[0];

        db.collection('invoices')
        .where('userId', '==', uid)
        .orderBy('createdAt')
        .startAfter(requestDate)
        .get()
        .then((result) => {
            console.log('If date available');
            const responseObj = checkOrdersForEachInvoice(result.docs);
            return response.json(responseObj);
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({ error: 'Something went wrong while fetching your orders!'});
        });
    }
    else {
        db.collection('invoices')
        .where('userId', '==', uid)
        .get()
        .then((result) => {
            console.log('Else date unavailable');
            const responseObj = checkOrdersForEachInvoice(result.docs);
            return response.json(responseObj);
        })
        .catch((err) => {
            console.log(err);
            return response.json({ error: 'Something went wrong while fetching your orders!'});
        });
    }
};

exports.getFreeProductDiscount = (request, response) => {
    /* check auth -> if false, send 403 unauthorized
       else 
        check lastAvailedDate
        if null -> check all orders
        if date available -> check orders after the date
    */

    const document = db.doc(`/users/${request.uid}`);
    document.get()
    .then((doc) => {
        if (!doc.exists) {
            return response.status(404).json({ error: 'User not found' });
        }

        return doc;
    })
    .then(async (doc) => {
       await getInvoices(request.uid, doc.data().lastAvailedDateForFreeProduct, response);
    })
	.catch((err) => {
		console.error(err);
		return response.status(500).json({ error: err.code});
	});
};