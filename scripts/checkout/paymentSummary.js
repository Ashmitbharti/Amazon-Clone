import {cart} from '../../data/cart.js'
import { products } from '../../data/products.js';
import { deliveryOptions } from '../../data/delopt.js';
import { formatCurrency } from '../utils/money.js';
export function renderPaymentSummary(){
    let price = 0;
    let shippingPrice = 0;
    cart.forEach( (cartItem) => {

        let matchingProduct;
        products.forEach( (product) => {
            if(cartItem.id===product.id){
                matchingProduct=product;
            }
        });
        let deliveryOption;
        deliveryOptions.forEach( (option) => {
            if(option.id === cartItem.deliveryOptionId){
                deliveryOption = option;
            }
            
        });
            
        
        price += matchingProduct.priceCents * cartItem.quantity;
        shippingPrice += deliveryOption.priceCents ;
    });
   
    let totalPriceBeforeTaxes = price + shippingPrice;
    let tax = totalPriceBeforeTaxes * 0.1;
    let totalPrice = totalPriceBeforeTaxes + tax;
    
    const paymentSummaryHTML = `
        <div class="payment-summary js-payment-summary">
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(price)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalPriceBeforeTaxes)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalPrice)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div>`

        document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
        
};
