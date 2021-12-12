const { db } = require('../utils/admin');
const { validateGenreCategoryData } = require('../utils/validators');

exports.addGenreCategory = (request, response) => {
    const { valid, errors } = validateGenreCategoryData(request.body);

    if(!valid) {
        return response.status(400).json(errors);
    }

    const { code, displayName } = request.body;

    const newGenreCategory = {
        code: code,
        displayName: displayName
    }

    db.collection('genre-categories')
    .add(newGenreCategory)
    .then((doc) => {
        const responseItem = newGenreCategory;
        responseItem.id = doc.id;
        return response.json(responseItem);
    })
    .catch((err) => {
        console.error(err);
        return response.status(500).json({error: err.code});
    });
};

exports.deleteGenreCategory = (request, response) => {
    const document = db.doc(`/genre-categories/${request.params.genreCategoryId}`);

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

exports.editGenreCategory = (request, response) => {
    if(request.body.genreCategoryId){
        response.status(403).json({message: 'Not allowed to edit'});
    }

    let document = db.collection('genre-categories').doc(`${request.params.genreCategoryId}`);
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

exports.getAllGenreCategories = (request, response) => {
    db
    .collection('genre-categories')
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