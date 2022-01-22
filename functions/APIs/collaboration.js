const { db } = require('../utils/admin');

exports.getAllCollaborations = (request, response) => {
    let collaborationData = [];
    let discountData = [];

    db
    .collection('collaborations')
    .get()
    .then((data) => {
        data.forEach((doc) => {
            collaborationData.push({
                collaborationId: doc.id,
                author: doc.data().author,
                title: doc.data().title,
                imgURL: doc.data().imgURL,
                instaURL: doc.data().instaURL
            });
        });
        return collaborationData;
    })
    .then((collaborationData) => {
        return db.collection('discounts').get();
    })
    .then((data) => {
        for (let index = 0; index < data.docs.length; index++) {
            const element = data.docs[index];
            discountData.push({
                discountId: element.id,
                imgURL: element.data().imgURL,
                title: element.data().title
            });
        }
        return discountData;
    })
    .then(result => {
        return response.json({ collaborations: collaborationData, discounts: result});
    })
    .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code});
    });
};