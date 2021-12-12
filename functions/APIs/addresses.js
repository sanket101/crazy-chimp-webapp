const { db } = require('../utils/admin');
const { validateAddressData } = require('../utils/validators');

exports.getAllAddresses = (request, response) => {
    db
    .collection('addresses')
    .where('uid', '==', request.uid)
    .get()
    .then((data) => {
        let addresses = [];
        data.forEach((doc) => {
            addresses.push({
                addressId: doc.id,
                tag: doc.data().tag,
                city: doc.data().city,
                state: doc.data().state,
                country: doc.data().country,
                pincode: doc.data().pincode,
                address: doc.data().address,
                phone: doc.data().phone,
                name: doc.data().name
            });
        });
        return response.json(addresses);
    })
    .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code});
    });
};

exports.addAddress = (request, response) => {
    const { valid, errors } = validateAddressData(request.body);

    if(!valid) {
        return response.status(400).json(errors);
    }

    const tag = request.body.tag ? request.body.tag : 'None';
    
    const newAddressItem = {
        tag: tag,
        city: request.body.city,
        state: request.body.state,
        country: request.body.country,
        pincode: request.body.pincode,
        address: request.body.address,
        phone: request.body.phone,
        name: request.body.name,
        uid: request.uid,
    };

    db.collection('addresses')
    .add(newAddressItem)
    .then((doc) => {
        const responseAddressItem = newAddressItem;
        responseAddressItem.id = doc.id;
        return response.json(responseAddressItem);
    })
    .catch((err) => {
        console.error(err);
        return response.status(500).json({error: err.code});
    });
};

exports.deleteAddress = (request, response) => {
    const document = db.doc(`/addresses/${request.params.addressId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: 'Address not found' });
            }

            if(doc.data().uid !== request.uid) {
                return response.status(403).json({ error: 'Unauthorized' });
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

exports.editAddress = (request, response) => {
    if(request.body.addressId || request.body.uid){
        response.status(403).json({message: 'Not allowed to edit'});
    }

    let document = db.collection('addresses').doc(`${request.params.addressId}`);
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