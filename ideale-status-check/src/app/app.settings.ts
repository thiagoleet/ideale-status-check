import { Endpoint } from "./models/endpoint";

export class AppSettings {

// ______      _     _ _         ___  ______ _____ _     
// | ___ \    | |   | (_)       / _ \ | ___ \_   _( )    
// | |_/ /   _| |__ | |_  ___  / /_\ \| |_/ / | | |/ ___ 
// |  __/ | | | '_ \| | |/ __| |  _  ||  __/  | |   / __|
// | |  | |_| | |_) | | | (__  | | | || |    _| |_  \__ \
// \_|   \__,_|_.__/|_|_|\___| \_| |_/\_|    \___/  |___/
  public static getPublicEndpoints(): Endpoint[]{
        let apis: Endpoint[] = [];

        apis.push(new Endpoint('API_AUTHENTICATE', 'https://api-pub-authenticate.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_BANNER', 'https://api-pub-banner.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_BRANCH', 'https://api-pub-branch.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_BRAND', 'https://api-pub-brand.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_BUDGET', 'https://api-pub-budget.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_CART', 'https://api-pub-cart.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_CARTSHOWCASE', 'https://api-pub-cartshowcase.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_CATEGORY', 'https://api-pub-category.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_CONTACT', 'https://api-pub-contact.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_COUPON', 'https://api-pub-coupon.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_CUSTOMER', 'https://api-pub-customer.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_CUSTOMPAINT', 'https://api-pub-custompaint.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_DNEADDRESS', 'https://api-pub-dneaddress.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_GOOGLE', 'https://api-pub-google.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_GROUP', 'https://api-pub-group.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_INSTITUTIONAL', 'https://api-pub-institutional.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_INTELIPOST', 'https://api-pub-intelipost.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_ORDER', 'https://api-pub-order.idealeware.com.br:10000')); 
        apis.push(new Endpoint('API_ORDERVALIDATION', 'https://api-pub-ordervalidation.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_PAYMENTS', 'https://api-pub-payments.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_POPUP', 'https://api-pub-popup.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_PRODUCT', 'https://api-pub-product.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_PRODUCTAWAITED', 'https://api-pub-productsawaited.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_PRODUCTRATING', 'https://api-pub-productrating.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_RELATEDPRODUCTS', 'http://192.168.10.204:7029'));
        apis.push(new Endpoint('API_SEARCH', 'https://api-pub-search.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_SERVICE', 'https://api-pub-service.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_SHOWCASE', 'https://api-pub-showcase.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_STORE', 'https://api-pub-store.idealeware.com.br:10000'));

        return apis;
    }

//  _____                   ___  ______ _____ _     
// /  __ \                 / _ \ | ___ \_   _( )    
// | /  \/ ___  _ __ ___  / /_\ \| |_/ / | | |/ ___ 
// | |    / _ \| '__/ _ \ |  _  ||  __/  | |   / __|
// | \__/\ (_) | | |  __/ | | | || |    _| |_  \__ \
//  \____/\___/|_|  \___| \_| |_/\_|    \___/  |___/
                                                 
    public static getCoreEndpoints(): Endpoint[]{
        let apis: Endpoint[] = [];
        
        apis.push(new Endpoint('API_ADMINISTRATOR', 'https://api-adm-administrator.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_AUTHENTICATE', 'https://api-adm-authenticate.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_BANNER', 'https://api-adm-banner.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_BRANCH', 'https://api-adm-branch.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_BRAND', 'https://api-adm-brand.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_BUDGET', 'https://api-adm-budget.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_CATEGORY', 'https://api-adm-category.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_CARTSHOWCASE', 'https://api-adm-cartshowcase.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_CONTACT', 'https://api-adm-contact.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_COUPON', 'https://api-adm-coupon.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_CUSTOMER', 'https://api-adm-customer.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_CUSTOMEMAIL', 'https://api-adm-customemail.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_DASHBOARD', 'https://api-adm-dashboard.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_GOOGLE', 'https://api-adm-google.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_GROUP', 'https://api-adm-group.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_INSTITUTIONAL', 'https://api-adm-institutional.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_INTELIPOST', 'https://api-adm-intelipost.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_ORDER', 'https://api-adm-order.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_PAYMENTSGATEWAY', 'https://api-adm-paymentsgateway.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_POPUP', 'https://api-adm-popup.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_PRODUCTAWAITED', 'https://api-adm-productsawaited.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_PRODUCTRATING', 'https://api-adm-productrating.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_PRODUCT', 'https://api-adm-product.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_SERVICE', 'https://api-adm-service.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_SHOWCASE', 'https://api-adm-showcase.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_STORE', 'https://api-adm-store.idealeware.com.br:10000'));
        apis.push(new Endpoint('API_VARIATION', 'https://api-adm-variation.idealeware.com.br:10000'));


        return apis;
    }
}