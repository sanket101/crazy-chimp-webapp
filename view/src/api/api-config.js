const baseURL  = "https://asia-south1-crazy-chimp-48212.cloudfunctions.net/api";
// const baseURL = 'http://localhost:5001/crazy-chimp-48212/asia-south1/api';

const apiConfig = {
    loginApi: `${baseURL}/login`,
    signUpApi: `${baseURL}/signup`,
    logoutApi: `${baseURL}/logout`,
    productData: `${baseURL}/get-products-data`,
    productListApi: `${baseURL}/products`,
    getProductCategories: `${baseURL}/product-categories`,
    getGenreCategories: `${baseURL}/genre-categories`,
    getCollaborationData: `${baseURL}/get-collaboration-data`,
    getAllSavedAddress: `${baseURL}/addresses`,
    addAddress: `${baseURL}/address`,
    addOrder: `${baseURL}/add-order`,
    addInvoice: `${baseURL}/add-invoice`,
    getUserInvoices: `${baseURL}/invoices`,
    adminAuthentication: `${baseURL}/admin-authentication`,
    addProduct: `${baseURL}/add-product`,
    getInvoiceByDate: `${baseURL}/invoices-bydate`,
    getCustomerGallery: `${baseURL}/get-customer-gallery`,
    getDiscountCodes: `${baseURL}/get-discount-vouchers`,
    addDiscount: `${baseURL}/add-discount-voucher`,
    getStockAvailability: `${baseURL}/stock-availability`,
    updateInvoice: `${baseURL}/edit-invoice`,
    getAllInvoices: `${baseURL}/get-all-invoices`,
    initiatePaytmTransaction: `${baseURL}/initiate-transaction`,
    reserPasswordApi: `${baseURL}/reset-password`
};

export default apiConfig;