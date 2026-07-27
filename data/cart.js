export let cart;

loadFromStorage();

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart'));

    if(!cart){
        cart = [{
            id : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity : 2,
            deliveryOptionId : '1'
        },
        {
            id : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity : 1,
            deliveryOptionId : '2'
        }];
    }
}


function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}
export function addToCart(productId){
  
    let alreadyExists;
    cart.forEach( (value) => {
        if(productId === value.id){
            alreadyExists = value;
        }

    });

    if(alreadyExists){
        alreadyExists.quantity+=1 
    }
    

    else{
        cart.push({
        id : productId,
        quantity : 1,
        deliveryOptionId : '1'
    });
    }

    saveToStorage();

}

export function alterCart(id){
    let newCart=[];
    cart.forEach( (cartP) => {
        if(cartP.id != id){
            newCart.push(cartP)
        }
    })
    cart = newCart;
    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let alreadyExists;
    cart.forEach( (value) => {
        if(productId === value.id){
            alreadyExists = value;
        }

    });
    alreadyExists.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}