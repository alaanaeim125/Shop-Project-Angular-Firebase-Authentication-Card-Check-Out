import { ShoppingCartItems } from './shoppingCartItems';

export class ShoppingCart {

    //  items: ShoppingCartItems[] = [];
    constructor(public items: ShoppingCartItems[]) {
    }


    get productIds() {
        return Object.keys(this.items);
    }

    get totalPrice() {
        let totalprice = 0;
        // tslint:disable-next-line: forin
        for (const productId in this.items) {
            totalprice += (this.items[productId].product.price * this.items[productId].quantity);
        }
        return totalprice;
    }

    get shoppingCartItemsCount() {

        let count = 0;
        // tslint:disable-next-line: forin
        for (const productId in this.items) {
            count += this.items[productId].quantity;
        }
        return count;
    }
}

// itemsMap: {items: {[productId: string]: ShoppingCartItems}}
