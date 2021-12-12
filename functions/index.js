const functions = require('firebase-functions');
const app = require('express')();
const auth = require('./utils/auth');
const verifyAdmin = require('./utils/verify-admin');

const {
  getInvoice,
  editInvoice,
  deleteInvoice,
  addInvoice,
  getInvoicesByUserId
} = require('./APIs/invoices');

const {
  addProduct,
  editProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
  getProductsData
} = require('./APIs/products');

const {
  addOrder,
  editOrder,
  deleteOrder,
  getOrder,
  getOrdersByProductId,
  getOrdersByUserId
} = require('./APIs/orders');

const {
  addProductCategory,
  deleteProductCategory,
  editProductCategory,
  getAllProductCategories
} = require('./APIs/product-categories');

const {
  addGenreCategory,
  deleteGenreCategory,
  editGenreCategory,
  getAllGenreCategories
} = require('./APIs/genre-categories');

const {
  getAllAddresses,
  addAddress,
  deleteAddress,
  editAddress
} = require('./APIs/addresses');

const {
    getAllTodos,
    postOneTodo,
    deleteTodo,
    editTodo
} = require('./APIs/todos');

const {
  loginUser,
  signUpUser,
  getUserDetail,
  updateUserDetails
} = require('./APIs/users');

// Users
app.post('/login', loginUser);
app.post('/signup', signUpUser);
app.get('/user', auth, getUserDetail);
app.post('/user', auth, updateUserDetails);

// todos
app.get('/todos', getAllTodos);
app.post('/todo', postOneTodo);
app.delete('/todo/:todoId', deleteTodo);
app.put('/todo/:todoId', editTodo);

// address
app.get('/addresses', auth, getAllAddresses);
app.post('/address', auth, addAddress);
app.delete('/address/:addressId', auth, deleteAddress);
app.put('/address/:addressId', auth, editAddress);

// genre-category
app.get('/genre-categories', auth, getAllGenreCategories);
app.post('/genre-category', verifyAdmin, addGenreCategory);
app.delete('/genre-category/:genreCategoryId', verifyAdmin, deleteGenreCategory);
app.put('/genre-category/:genreCategoryId', verifyAdmin, editGenreCategory);

// product-category
app.get('/product-categories', auth, getAllProductCategories);
app.post('/product-category', verifyAdmin, addProductCategory);
app.delete('/product-category/:productCategoryId', verifyAdmin, deleteProductCategory);
app.put('/product-category/:productCategoryId', verifyAdmin, editProductCategory);

// orders
app.get('/order/:orderId', auth, getOrder);
app.get('/orders', auth, getOrdersByUserId);
app.get('/product-orders/:productId', verifyAdmin, getOrdersByProductId);
app.post('/add-order', auth, addOrder);
app.put('/edit-order/:orderId', verifyAdmin, editOrder);
app.delete('/delete-order/:orderId', verifyAdmin, deleteOrder);

// Invoice
app.get('/invoice/:invoiceId', auth, getInvoice);
app.post('/add-invoice', auth, addInvoice);
app.put('/edit-invoice/:invoiceId', verifyAdmin, editInvoice);
app.delete('/delete-invoice/:invoiceId', verifyAdmin, deleteInvoice);
app.get('/invoices', auth, getInvoicesByUserId);

// Products
app.get('/get-products-data', getProductsData);
app.get('/products/:paginationId', getAllProducts);
app.get('/product/:productId', getProduct);
app.post('/add-product', verifyAdmin, addProduct);
app.put('/edit-product', verifyAdmin, editProduct);
app.delete('/delete-product', verifyAdmin, deleteProduct);

exports.api = functions.https.onRequest(app);