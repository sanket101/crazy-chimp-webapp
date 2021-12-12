const { db } = require('../utils/admin');
const { validateProductData } = require('../utils/validators');

exports.addProduct = (request, response) => {
    const { valid, errors } = validateProductData(request.body);

    if(!valid) {
        return response.status(400).json(errors);
    }

    const newProductItem = {
		name: request.body.name,
		description: request.body.description,
		actualPrice: request.body.actualPrice,
		productDomain: request.body.productDomain,
		productCategory: request.body.productCategory,
		genreCategory: request.body.genreCategory,
		isAvailable: request.body.isAvailable || false,
		sizeAvailable: request.body.sizeAvailable,
		colorsAvailable: request.body.colorsAvailable,
		images: request.body.images,
		weightInGms: request.body.weightInGms,
		salePrice: request.body.salePrice || '',
		ratings: '',
		numReviews: '' 
	};

    db.collection('products')
    .add(newProductItem)
    .then((doc) => {
        const responseItem = newProductItem;
        responseItem.id = doc.id;
        return response.json(responseItem);
    })
    .catch((err) => {
        console.error(err);
        return response.status(500).json({error: err.code});
    });
};

exports.getProduct = (request, response) => {
    const document = db.doc(`/products/${request.params.productId}`);
    let productData = {};
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: 'Product not found' });
            }
            
            productData = doc.data();

            return response.json(productData);
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        });
};

exports.deleteProduct = (request, response) => {
    const document = db.doc(`/products/${request.params.productId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: 'Product not found' });
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

exports.editProduct = (request, response) => {
    if(request.body.productId){
        response.status(403).json({message: 'Not allowed to edit'});
    }

    let document = db.collection('products').doc(`${request.params.productId}`);
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

exports.getProductsData = (request, response) => {
    const { productCategory, genreCategory } = request.query;
    let docsLength = 0;
    if(productCategory && genreCategory) {
        db.collection('products')
        .where('productCategory', '==', productCategory)
        .where('genreCategory', '==', genreCategory)
        .get()
        .then((data) => {
            docsLength = data.docs.length;
            const productData = {
                numberOfProducts: docsLength
            };
            return response.json(productData);
        })
        .catch((err) => {
            console.error(err);
		    return response.status(500).json({ error: err.code });
        });
    }
    if(productCategory) {
        db.collection('products')
        .where('productCategory', '==', productCategory)
        .get()
        .then((data) => {
            docsLength = data.docs.length;
            const productData = {
                numberOfProducts: docsLength
            };
            return response.json(productData);
        })
        .catch((err) => {
            console.error(err);
		    return response.status(500).json({ error: err.code });
        });
    }
    if(genreCategory) {
        db.collection('products')
        .where('genreCategory', '==', genreCategory)
        .get()
        .then((data) => {
            docsLength = data.docs.length;
            const productData = {
                numberOfProducts: docsLength
            };
            return response.json(productData);
        })
        .catch((err) => {
            console.error(err);
		    return response.status(500).json({ error: err.code });
        });
    }
    db.collection('products')
        .get()
        .then((data) => {
            docsLength = data.docs.length;
            const productData = {
                numberOfProducts: docsLength
            };
            return response.json(productData);
        })
        .catch((err) => {
            console.error(err);
		    return response.status(500).json({ error: err.code });
        });
};

exports.getAllProducts = (request, response) => {
    const { paginationId } = request.params;
    const { productCategory, genreCategory } = request.query;
    
    if(paginationId) {
        if(paginationId === "1") {
            if(productCategory && genreCategory) {
                db.collection('products')
                .where('productCategory', '==', productCategory)
                .where('genreCategory', '==', genreCategory)
                .limit(100)
                .get()
                .then((data) => {
                    let products = [];
                    data.forEach((doc) => {
                        products.push({
                            productId: doc.id,
                            name: doc.data().name,
                            actualPrice: doc.data().actualPrice,
                            salePrice: doc.data().salePrice,
                            productCategory: doc.data().productCategory,
                            genreCategory: doc.data().genreCategory,
                            images: doc.data().images[0],
                        });
                    });
                    return response.json(products);
                })
                .catch((err) => {
                    console.error(err);
                    return response.status(500).json({ error: err.code});
                });
            }
            else if(productCategory) {
                db.collection('products')
                .where('productCategory', '==', productCategory)
                .limit(100)
                .get()
                .then((data) => {
                    let products = [];
                    data.forEach((doc) => {
                        products.push({
                            productId: doc.id,
                            name: doc.data().name,
                            actualPrice: doc.data().actualPrice,
                            salePrice: doc.data().salePrice,
                            productCategory: doc.data().productCategory,
                            genreCategory: doc.data().genreCategory,
                            images: doc.data().images[0],
                        });
                    });
                    return response.json(products);
                })
                .catch((err) => {
                    console.error(err);
                    return response.status(500).json({ error: err.code});
                });
            }
            else if(genreCategory) {
                db.collection('products')
                .where('genreCategory', '==', genreCategory)
                .limit(100)
                .get()
                .then((data) => {
                    let products = [];
                    data.forEach((doc) => {
                        products.push({
                            productId: doc.id,
                            name: doc.data().name,
                            actualPrice: doc.data().actualPrice,
                            salePrice: doc.data().salePrice,
                            productCategory: doc.data().productCategory,
                            genreCategory: doc.data().genreCategory,
                            images: doc.data().images[0],
                        });
                    });
                    return response.json(products);
                })
                .catch((err) => {
                    console.error(err);
                    return response.status(500).json({ error: err.code});
                });
            }
            else {
                db.collection('products')
                .limit(100)
                .get()
                .then((data) => {
                    let products = [];
                    data.forEach((doc) => {
                        products.push({
                            productId: doc.id,
                            name: doc.data().name,
                            actualPrice: doc.data().actualPrice,
                            salePrice: doc.data().salePrice,
                            productCategory: doc.data().productCategory,
                            genreCategory: doc.data().genreCategory,
                            images: doc.data().images[0],
                        });
                    });
                    return response.json(products);
                })
                .catch((err) => {
                    console.error(err);
                    return response.status(500).json({ error: err.code});
                });
            }
        }
        else {
            if(productCategory && genreCategory) {
                db.collection('products')
                .where('productCategory', '==', productCategory)
                .where('genreCategory', '==', genreCategory)
                .limit(100*(paginationId - 1))
                .get()
                .then((data) => {
                    const docsLength = data.docs.length;
                    const lastVisible = data.docs[docsLength - 1];

                    db.collection('products')
                    .where('productCategory', '==', productCategory)
                    .where('genreCategory', '==', genreCategory)
                    .startAfter(lastVisible)
                    .limit(100)
                    .get()
                    .then((result) => {
                        let products = [];
                        result.forEach((doc) => {
                            products.push({
                                productId: doc.id,
                                name: doc.data().name,
                                actualPrice: doc.data().actualPrice,
                                salePrice: doc.data().salePrice,
                                productCategory: doc.data().productCategory,
                                genreCategory: doc.data().genreCategory,
                                images: doc.data().images[0],
                            });
                        });
                        return response.json(products);
                    })
                    .catch((err) => {
                        console.error(err);
                        return response.status(500).json({ error: err.code});
                    })
                })
                .catch((err) => {
                    console.error(err);
                    return response.status(500).json({ error: err.code});
                });
            }
            else if(productCategory) {
                db.collection('products')
                .where('productCategory', '==', productCategory)
                .limit(100*(paginationId - 1))
                .get()
                .then((data) => {
                    const docsLength = data.docs.length;
                    const lastVisible = data.docs[docsLength - 1];

                    db.collection('products')
                    .where('productCategory', '==', productCategory)
                    .startAfter(lastVisible)
                    .limit(100)
                    .get()
                    .then((result) => {
                        let products = [];
                        result.forEach((doc) => {
                            products.push({
                                productId: doc.id,
                                name: doc.data().name,
                                actualPrice: doc.data().actualPrice,
                                salePrice: doc.data().salePrice,
                                productCategory: doc.data().productCategory,
                                genreCategory: doc.data().genreCategory,
                                images: doc.data().images[0],
                            });
                        });
                        return response.json(products);
                    })
                    .catch((err) => {
                        console.error(err);
                        return response.status(500).json({ error: err.code});
                    })
                })
                .catch((err) => {
                    console.error(err);
                    return response.status(500).json({ error: err.code});
                });
            }
            else if(genreCategory) {
                db.collection('products')
                .where('genreCategory', '==', genreCategory)
                .limit(100*(paginationId - 1))
                .get()
                .then((data) => {
                    const docsLength = data.docs.length;
                    const lastVisible = data.docs[docsLength - 1];

                    db.collection('products')
                    .where('genreCategory', '==', genreCategory)
                    .startAfter(lastVisible)
                    .limit(100)
                    .get()
                    .then((result) => {
                        let products = [];
                        result.forEach((doc) => {
                            products.push({
                                productId: doc.id,
                                name: doc.data().name,
                                actualPrice: doc.data().actualPrice,
                                salePrice: doc.data().salePrice,
                                productCategory: doc.data().productCategory,
                                genreCategory: doc.data().genreCategory,
                                images: doc.data().images[0],
                            });
                        });
                        return response.json(products);
                    })
                    .catch((err) => {
                        console.error(err);
                        return response.status(500).json({ error: err.code});
                    })
                })
                .catch((err) => {
                    console.error(err);
                    return response.status(500).json({ error: err.code});
                });
            }
            else {
                db.collection('products')
                .limit(100*(paginationId - 1))
                .get()
                .then((data) => {
                    const docsLength = data.docs.length;
                    const lastVisible = data.docs[docsLength - 1];

                    db.collection('products')
                    .startAfter(lastVisible)
                    .limit(100)
                    .get()
                    .then((result) => {
                        let products = [];
                        result.forEach((doc) => {
                            products.push({
                                productId: doc.id,
                                name: doc.data().name,
                                actualPrice: doc.data().actualPrice,
                                salePrice: doc.data().salePrice,
                                productCategory: doc.data().productCategory,
                                genreCategory: doc.data().genreCategory,
                                images: doc.data().images[0],
                            });
                        });
                        return response.json(products);
                    })
                    .catch((err) => {
                        console.error(err);
                        return response.status(500).json({ error: err.code});
                    })
                })
                .catch((err) => {
                    console.error(err);
                    return response.status(500).json({ error: err.code});
                });
            }
        }
    }
    else {
        return response.status(400).json({ error: 'Invalid Request : No pagination id'})
    }
};