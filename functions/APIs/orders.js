const { db } = require('../utils/admin');
const { validateOrderData } = require('../utils/validators');

exports.addOrder = (request, response) => {
    const { valid, errors } = validateOrderData(request.body);

    if(!valid) {
        return response.status(400).json(errors);
    }

    const newOrderItem = {
        userId: request.uid,
        productId: request.body.productId,
        productName: request.body.productName,
        productImage: request.body.productImage,
        quantity: request.body.quantity,
        size: request.body.size,
        color: request.body.color,
        status: 'CONFIRMED'
    };

    db.collection('orders')
    .add(newOrderItem)
    .then((doc) => {
        const responseItem = newOrderItem;
        responseItem.id = doc.id;
        return response.json(responseItem);
    })
    .catch((err) => {
        console.error(err);
        return response.status(500).json({error: err.code});
    });
};

exports.deleteOrder = (request, response) => {
    const document = db.doc(`/orders/${request.params.orderId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: 'Order not found' });
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

exports.editOrder = (request, response) => {
    if(request.body.orderId){
        response.status(403).json({message: 'Not allowed to edit'});
    }

    let document = db.collection('orders').doc(`${request.params.orderId}`);
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

exports.getOrder = (request, response) => {
    const document = db.doc(`/orders/${request.params.orderId}`);
    document
        .get()
        .then(async (doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: 'Order not found' });
            }
            
            const productRef = db.doc(`/products/${productId}`);
            const productSnap = await productRef.get();

            if(productSnap.exists) {
                return response.json({
                    orderId: doc.id,
                    productId: doc.data().productId,
                    product: productSnap.data(),
                    quantity: doc.data().quantity,
                    size: doc.data().size,
                    color: doc.data().color,
                    status: doc.data().status
                });
            }
            else {
                return response.status(400).json({ error: 'Invalid Request' });
            }
            
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        });
};

const populateOrdersList = async(result) => {
    let orders = [];

    for(let j=0; j < result.docs.length; j++) {
        const docSnap = result.docs[j];
        const productId = docSnap.data().productId;
        const productRef = db.doc(`/products/${productId}`);
        const productSnap = await productRef.get();
        if(productSnap.exists) {
            orders.push({
                orderId: docSnap.id,
                productId: docSnap.data().productId,
                product: productSnap.data(),
                quantity: docSnap.data().quantity,
                size: docSnap.data().size,
                color: docSnap.data().color,
                status: docSnap.data().status
            });
        }
        else {
            orders.push({
                orderId: docSnap.id,
                productId: docSnap.data().productId,
                product: { error : 'No product exists'},
                quantity: docSnap.data().quantity,
                size: docSnap.data().size,
                color: docSnap.data().color,
                status: docSnap.data().status
            });
        }
    };

    return orders;
};

exports.getOrdersByUserId = (request, response) => {
    db
		.collection('orders')
		.where('userId', '==', request.uid)
		.get()
		.then(async(data) => {
			let orders = await populateOrdersList(data);
			return response.json(orders);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code});
		});
};

exports.getOrdersByProductId = (request, response) => {
    db
		.collection('orders')
		.where('productId', '==', request.params.productId)
		.get()
		.then(async (data) => {
            const productRef = db.doc(`/products/${request.params.productId}`);
            const productSnap = await productRef.get();
            let productData = {};
            if(productSnap.exists) {
                productData = productSnap.data()
            }
            let orders = [];
			data.forEach((doc) => {
				orders.push({
                    orderId: doc.id,
                    productId: doc.data().productId,
                    product: productData,
                    quantity: doc.data().quantity,
                    size: doc.data().size,
                    color: doc.data().color,
                    status: doc.data().status
				});
			});
			return response.json(orders);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code});
		});
};