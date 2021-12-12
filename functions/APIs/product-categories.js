const { db } = require('../utils/admin');
const { validateProductCategoryData } = require('../utils/validators');

exports.addProductCategory = (request, response) => {
    const { valid, errors } = validateProductCategoryData(request.body);

    if(!valid) {
        return response.status(400).json(errors);
    }

    const { code, displayName } = request.body;

    const newProductCategory = {
        code: code,
        displayName: displayName
    }

    db.collection('product-categories')
    .add(newGenreCategory)
    .then((doc) => {
        const responseItem = newProductCategory;
        responseItem.id = doc.id;
        return response.json(responseItem);
    })
    .catch((err) => {
        console.error(err);
        return response.status(500).json({error: err.code});
    });
};

exports.deleteProductCategory = (request, response) => {
    const document = db.doc(`/product-categories/${request.params.productCategoryId}`);

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

exports.editProductCategory = (request, response) => {
    if(request.body.productCategoryId){
        response.status(403).json({message: 'Not allowed to edit'});
    }

    let document = db.collection('prodcut-categories').doc(`${request.params.productCategoryId}`);
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

exports.getAllProductCategories = (request, response) => {
    db
    .collection('product-categories')
    .get()
    .then((data) => {
        let categories = [];
        data.forEach((doc) => {
            categories.push({
                id: doc.id,
                code: doc.data().code,
                displayName: doc.data().displayName
            });
        });
        return response.json(categories);
    })
    .catch((err) => {
        console.error(err);
        return response.status(500).json({ error: err.code});
    });
};