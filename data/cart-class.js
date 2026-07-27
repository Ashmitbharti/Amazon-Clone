class Cart{
    cartItems;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();

    }
    
    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
        if(!this.cartItems){
            this.cartItems = [{
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

    saveToStorage(){
        localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
    }


    addToCart(productId){   
        let alreadyExists;
        this.cartItems.forEach( (value) => {
            if(productId === value.id){
                alreadyExists = value;
            }

        });

        if(alreadyExists){
            alreadyExists.quantity+=1 
        }
        

        else{
            this.cartItems.push({
            id : productId,
            quantity : 1,
            deliveryOptionId : '1'
        });
        }

        this.saveToStorage();

    }

    alterCart(id){
        let newCart=[];
        this.cartItems.forEach( (cartP) => {
            if(cartP.id != id){
                newCart.push(cartP)
            }
        })
        this.cartItems = newCart;
        this.saveToStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let alreadyExists;
        this.cartItems.forEach( (value) => {
            if(productId === value.id){
                alreadyExists = value;
            }

        });
        alreadyExists.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }
}

 
const cart = new Cart('cart-oop');
const businessCart = new Cart('businessCart');


