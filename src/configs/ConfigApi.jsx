const api = process.env.REACT_APP_API_URL;

const ConfigApi = {
    APP_INIT: `/bikiran/init/`,

    // Auth
    AUTH: `/bikiran/auth/`,

    // User Accounts
    PROFILE: '/bikiran/profiles/',
    API_ADDRESS: `${api}/bikiran/accounts/address/update-address/`,

    // Cart & Invoices
    CART_OPERATION: `/bikiran/cart/operation/`,
    CART_INVOICE: `/bikiran/cart/invoice/`,

    // Payment Gateway
    PAYMENT_BKASH: `/bikiran/payments/bkash-payment/`,
    PAYMENT_SSLCOM: `/bikiran/payments/sslcom-payment/`,

    // Billing
    API_BILLING_INVOICE: `${api}/bikiran/invoice/`,

    // Contracts
    API_DOMAIN_LIST_DOMAINS: `${api}/bikiran/contracts/domain/list/`,

    // Search
    API_DOMAIN_DATA: `${api}/search/result/`,
    API_DOMAIN_DATA_INFO: `${api}/web-info/data/`,
    API_DOMAIN_DATA_SSHOT: `${api}/web-info/screenshot/`,

    // Products
    // :type/, :type/:contractId/execute/, :type/:contractId/cp-login/
    API_HOSTING_LIST: `${api}/bikiran/services/hosting/`,
};

export default ConfigApi;
