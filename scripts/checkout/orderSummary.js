
import{ products } from "../../data/products.js";
import { cart,alterCart, updateDeliveryOption } from "../../data/cart.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../../data/delopt.js";
import { formatCurrency } from "../utils/money.js";
import { renderPaymentSummary } from "./paymentSummary.js";
export function renderOrderSummary() {


    let matchId;
    let cartHTML='';
    cart.forEach( (cartItem) => {
        matchId=cartItem.id;
        let matchingProduct;
        products.forEach( (product) => {
            if(matchId===product.id){
                matchingProduct=product;
            }
            
        });
        console.log(matchingProduct);
        let deliveryOption;
        deliveryOptions.forEach( (option) => {
            if(option.id === cartItem.deliveryOptionId){
                deliveryOption = option;
            }
        })
        cartHTML+= 
            `
                <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
                    <div class="delivery-date">
                        Delivery date: ${deliveryOption.deliveryDays}
                    </div>

                    <div class="cart-item-details-grid">
                        <img class="product-image"
                        src="${matchingProduct.image}">

                        <div class="cart-item-details">
                        <div class="product-name">
                            ${matchingProduct.name}
                        </div>
                        <div class="product-price">
                            $ ${matchingProduct.priceCents/100}
                        </div>
                        <div class="product-quantity">
                            <span>
                            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                            </span>
                            <span class="update-quantity-link link-primary">
                            Update
                            </span>
                            <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" 
                            data-product-id="${matchingProduct.id}">
                            Delete
                            </span>
                        </div>
                            ${deliveryOptionsHTML(matchingProduct,cartItem)}
                        </div>
                    </div>
                </div>
            `;
            
    });

    function deliveryOptionsHTML(matchingProduct,cartItem){
        let html=''
        deliveryOptions.forEach( (value) => {
            const date = dayjs();
            const deliveryDate = date.add(
                value.deliveryDays, 'days'
            );
            const dateString = deliveryDate.format(
                'dddd, MMMM D'
            );

            const priceString = value.priceCents===0
                ? 'FREE'
                : `$${formatCurrency(value.priceCents)}`;
            
            const isChecked = value.id===cartItem.deliveryOptionId;
            html += `
        
                <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${value.id}">
                    <input type="radio" ${isChecked ? 'checked': ''}
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                            ${dateString}
                        </div>
                        <div class="delivery-option-price">
                            ${priceString} Shipping
                        </div>
                    </div>
                </div>
            ` 
        })
        return html;
    }

    console.log(cart);

    document.querySelector('.js-order-summary').innerHTML=cartHTML;

    document.querySelectorAll('.js-delete-link')
        .forEach( (dell) => {
            dell.addEventListener('click' , () => {
                let delId=dell.dataset.productId;
                alterCart(delId);
                
                const container=document.querySelector(`.js-cart-item-container-${delId}`);
                container.remove();
                renderPaymentSummary();
        });

    });
        
    document.querySelectorAll('.js-delivery-option')
        .forEach( (element) => {
            element.addEventListener('click' , () => {
                const {productId, deliveryOptionId} = element.dataset
                updateDeliveryOption(productId, deliveryOptionId);
                renderOrderSummary();
            });
        });
};
