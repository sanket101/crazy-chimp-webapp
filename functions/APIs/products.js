const { db } = require('../utils/admin');
const { validateProductData } = require('../utils/validators');
const gaxios = require('gaxios');

const getImageURL = (productCategory, productCode, color) => {
    return `https://firebasestorage.googleapis.com/v0/b/crazy-chimp-48212.appspot.com/o/Products%2F${productCategory}%2F${productCode}%2F${productCode}_${color}.Webp?alt=media`;
};

exports.addProduct = (request, response) => {
    const { valid, errors } = validateProductData(request.body);

    if(!valid) {
        return response.status(400).json(errors);
    }

    const colorsAvailable = request.body.colorsAvailable;
    
    let images = [];

    colorsAvailable.forEach((color) => {
        const colorSuffix = color.toString().toUpperCase().replace(' ', '');
        images.push(getImageURL(request.body.productCategory, request.body.productCode, colorSuffix));
    });

    const currentDate = new Date();

    const newProductItem = {
		name: request.body.name,
		description: request.body.description || '',
		actualPrice: request.body.actualPrice,
        productDomain: request.body.productDomain,
        // MMMYY_genreCategory_name_count(001/002)
        productCode: request.body.productCode,
		productCategory: request.body.productCategory,
		genreCategory: request.body.genreCategory,
        isAvailable: request.body.isAvailable || false,
        //TODO: Mapping colors and sizes with their availability
		sizeAvailable: request.body.sizeAvailable,
        colorsAvailable: request.body.colorsAvailable,
        //TODO: List of images needs to be fetched dynamically
		images: images,
		weightInGms: request.body.weightInGms,
		salePrice: request.body.salePrice || '',
        createdAt: currentDate.toISOString(),
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
    else if(productCategory) {
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
    else if(genreCategory) {
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
    else {
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
    }
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
                            description: doc.data().description,
                            actualPrice: doc.data().actualPrice,
                            salePrice: doc.data().salePrice,
                            productCategory: doc.data().productCategory,
                            genreCategory: doc.data().genreCategory,
                            colorsAvailable: doc.data().colorsAvailable,
                            sizeAvailable: doc.data().sizeAvailable,
                            images: doc.data().images,
                            weightInGms: doc.data().weightInGms,
                            isAvailable: doc.data().isAvailable,
                            productCode: doc.data().productCode
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
                            colorsAvailable: doc.data().colorsAvailable,
                            sizeAvailable: doc.data().sizeAvailable,
                            images: doc.data().images,
                            weightInGms: doc.data().weightInGms,
                            isAvailable: doc.data().isAvailable,
                            productCode: doc.data().productCode
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
                            colorsAvailable: doc.data().colorsAvailable,
                            sizeAvailable: doc.data().sizeAvailable,
                            images: doc.data().images,
                            weightInGms: doc.data().weightInGms,
                            isAvailable: doc.data().isAvailable,
                            productCode: doc.data().productCode
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
                            colorsAvailable: doc.data().colorsAvailable,
                            sizeAvailable: doc.data().sizeAvailable,
                            images: doc.data().images,
                            weightInGms: doc.data().weightInGms,
                            isAvailable: doc.data().isAvailable,
                            productCode: doc.data().productCode
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
                                colorsAvailable: doc.data().colorsAvailable,
                                sizeAvailable: doc.data().sizeAvailable,
                                images: doc.data().images,
                                weightInGms: doc.data().weightInGms,
                                isAvailable: doc.data().isAvailable,
                                productCode: doc.data().productCode
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
                                colorsAvailable: doc.data().colorsAvailable,
                                sizeAvailable: doc.data().sizeAvailable,
                                images: doc.data().images,
                                weightInGms: doc.data().weightInGms,
                                isAvailable: doc.data().isAvailable,
                                productCode: doc.data().productCode
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
                                colorsAvailable: doc.data().colorsAvailable,
                                sizeAvailable: doc.data().sizeAvailable,
                                images: doc.data().images,
                                weightInGms: doc.data().weightInGms,
                                isAvailable: doc.data().isAvailable,
                                productCode: doc.data().productCode
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
                                colorsAvailable: doc.data().colorsAvailable,
                                sizeAvailable: doc.data().sizeAvailable,
                                images: doc.data().images,
                                weightInGms: doc.data().weightInGms,
                                isAvailable: doc.data().isAvailable,
                                productCode: doc.data().productCode
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

const extractStockInformation = (list) => {
    let result;

    for (let index = 0; index < list.length; index++) {
        const element = list[index];
        let colorKeyName = element.color;
        colorKeyName = colorKeyName.replace(/ /g, '').toUpperCase();
        if(result && result.hasOwnProperty(colorKeyName)) {
            const tempObject = result[colorKeyName];
            const newTempObject = {...tempObject, [element.size] : element.stock_status === "in_stock" ? true : false};
            result = {...result, [colorKeyName]: newTempObject};
        }
        else {
            result = {...result, [colorKeyName] : { [element.size] : element.stock_status === "in_stock" ? true : false }};
        }
    }

    return result;
};

const populateStockData = async (token) => {
    const productList = [{ name: 'HST', code: '460'}, { name: 'FST', code: '461'}, {name: 'HOODIES', code: '463'}, {name: 'SWTS', code: '1012'}, {name: 'OST', code: '1216'}];

    let result = {};

    for (let index = 0; index < productList.length; index++) {
        const element = productList[index];

        const response = await gaxios.request({ 
            url: `/api/external/categories/25/products/${element.code}`, 
            method: 'GET',
            baseURL: 'https://api.printrove.com',
            headers: {
                'Content-Type': "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        
        if(response && response.data && response.data.status === "success") {
            const stockObject = extractStockInformation(response.data.product.variants);
            // const stockObject = response.data.product.variants;
            result = {...result, [element.name] : stockObject };
        }
    }

    return result;
};

exports.getStockAvailability = (request, response) => {
    gaxios.request({
        url: '/api/external/token',
        method: 'POST',
        baseURL: 'https://api.printrove.com',
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            email: 'crazychimpofficial@gmail.com',
            password: 'mahajangandu'
        }
    })
    .then(res => {
        if(res && res.data && res.data.status === "success") {
            const result = populateStockData(res.data.access_token);
            return result;
        }
        else {
            console.log('Issue in fetching printrove details');
            return {};
        }
    })
    .then(data => {
        return response.json({ status: 'success', stock: data});
    })
    .catch(err => {
        console.error(err);
        return response.status(500).json({ error: err.code});
    });    
}