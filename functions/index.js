const functions = require('firebase-functions');
const app = require('express')();
const auth = require('./utils/auth');
const verifyAdmin = require('./utils/verify-admin');

const { getDiscountCodes, addDiscountVoucher } = require('./APIs/discount');

const {
  getAllCollaborations,
  getAllCustomerGalleryImages
} = require('./APIs/collaboration');

const {
  getInvoice,
  editInvoice,
  deleteInvoice,
  addInvoice,
  getInvoicesByUserId,
  getInvoicesByDate,
  getAllInvoices
} = require('./APIs/invoices');

const {
  addProduct,
  editProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
  getProductsData,
  getStockAvailability
} = require('./APIs/products');

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
  loginUser,
  signUpUser,
  getUserDetail,
  updateUserDetails,
  logoutUser
} = require('./APIs/users');
const { checkIfAdmin } = require('./APIs/admin');

app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "https://crazychimp.org"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

// Users
app.post('/login', loginUser);
app.post('/signup', signUpUser);
app.get('/user', auth, getUserDetail);
app.post('/user', auth, updateUserDetails);
app.get('/logout', auth, logoutUser);

// address
app.get('/addresses', auth, getAllAddresses);
app.post('/address', auth, addAddress);
app.delete('/address/:addressId', auth, deleteAddress);
app.put('/address/:addressId', auth, editAddress);

// genre-category
app.get('/genre-categories', getAllGenreCategories);
app.post('/genre-category', verifyAdmin, addGenreCategory);
app.delete('/genre-category/:genreCategoryId', verifyAdmin, deleteGenreCategory);
app.put('/genre-category/:genreCategoryId', verifyAdmin, editGenreCategory);

// product-category
app.get('/product-categories', getAllProductCategories);
app.post('/product-category', verifyAdmin, addProductCategory);
app.delete('/product-category/:productCategoryId', verifyAdmin, deleteProductCategory);
app.put('/product-category/:productCategoryId', verifyAdmin, editProductCategory);

// orders
// app.get('/order/:orderId', auth, getOrder);
// app.get('/orders', auth, getOrdersByUserId);
// app.get('/product-orders/:productId', verifyAdmin, getOrdersByProductId);
// app.post('/add-order', auth, addOrder);
// app.put('/edit-order/:orderId', verifyAdmin, editOrder);
// app.delete('/delete-order/:orderId', verifyAdmin, deleteOrder);

// Invoice
app.get('/invoice/:invoiceId', auth, getInvoice);
app.post('/add-invoice', auth, addInvoice);
app.put('/edit-invoice/:invoiceId', verifyAdmin, editInvoice);
app.delete('/delete-invoice/:invoiceId', verifyAdmin, deleteInvoice);
app.get('/invoices', auth, getInvoicesByUserId);
app.post('/invoices-bydate', verifyAdmin, getInvoicesByDate);
app.get('/get-all-invoices', verifyAdmin, getAllInvoices);

// Products
app.get('/stock-availability', getStockAvailability);
app.get('/get-products-data', getProductsData);
app.get('/products/:paginationId', getAllProducts);
app.get('/product/:productId', getProduct);
app.post('/add-product', verifyAdmin, addProduct);
app.put('/edit-product', verifyAdmin, editProduct);
app.delete('/delete-product', verifyAdmin, deleteProduct);

// Collaborations
app.get('/get-collaboration-data', getAllCollaborations);
app.get('/get-customer-gallery', getAllCustomerGalleryImages);

// Admin User
app.get('/admin-authentication', verifyAdmin, checkIfAdmin);

// Discount
app.get('/get-discount-vouchers', auth, getDiscountCodes);
app.post('/add-discount-voucher', verifyAdmin, addDiscountVoucher);

exports.api = functions.region('asia-south1').https.onRequest(app);