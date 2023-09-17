const { db } = require('../utils/admin');
const { validateContactListData } = require('../utils/validators');

exports.addContactList = (request, response) => {
    const { valid, errors } = validateContactListData(request.body);

    if(!valid) {
        return response.status(400).json(errors);
    }

    const { fullName, email, phoneNumber, message, type } = request.body;

    const newContactListItem = {
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        message: message,
        type: type
    };

    db.collection('contact-list')
    .add(newContactListItem)
    .then((doc) => {
        const responseItem = newContactListItem;
        responseItem.id = doc.id;
        return response.json(responseItem);
    })
    .catch((err) => {
        console.error(err);
        return response.status(500).json({error: err.code});
    });
};

exports.deleteContactList = (request, response) => {
    const document = db.doc(`/contact-list/${request.params.contactListId}`);

    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: 'Does not exist' });
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

exports.editContactList = (request, response) => {
    if(request.body.contactListId){
        response.status(403).json({message: 'Not allowed to edit'});
    }

    let document = db.collection('contact-list').doc(`${request.params.contactListId}`);
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

exports.getAllContactList = (request, response) => {
    db
    .collection('contact-list')
    .get()
    .then((data) => {
        let contactList = [];
        data.forEach((doc) => {
            contactList.push({
                id: doc.id,
                fullName: doc.data().fullName,
                email: doc.data().email,
                phoneNumber: doc.data().phoneNumber,
                message: doc.data().message,
                type: doc.data().type,
            });
        });
        return response.json(contactList);
    })
    .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code});
    });
};