import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
//import '../data/backend.js'
// import '../data/cart-class.js'

async function loadPage(){
    try{
        await loadProductsFetch();
    } catch(error){
        console.group('error');
    }
    
    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();

/*Promise.all([
    loadProductsFetch()
]).then( () => {
    renderOrderSummary();
    renderPaymentSummary();
});*/


