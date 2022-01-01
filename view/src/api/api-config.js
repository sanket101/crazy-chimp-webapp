const baseURL  = "https://us-central1-crazy-chimp-48212.cloudfunctions.net/api";

const apiConfig = {
    loginApi: `${baseURL}/login`,
    signUpApi: `${baseURL}/signup`,
    productData: `${baseURL}/get-products-data`,
    productListApi: `${baseURL}/products`,
    getProductCategories: `${baseURL}/product-categories`,
    getGenreCategories: `${baseURL}/genre-categories`
};

export default apiConfig;