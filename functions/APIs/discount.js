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