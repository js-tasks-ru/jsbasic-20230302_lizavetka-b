export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) return;
    let cartItem;
    let index = this.cartItems.findIndex(item => item.product.name == product.name);
    
    if (index > -1) {
      this.cartItems[index].count +=1;
      cartItem = this.cartItems[index];
    } else {
      cartItem = {'product':product, count:1};
      this.cartItems.push(cartItem);
      }
    
    this.onProductUpdate(cartItem);
    return this.cartItems;
  }

  updateProductCount(productId, amount) {
    let index = this.cartItems.findIndex(item => item.product.id == productId);
    if (index > -1) {
    this.cartItems[index].count += amount;
    }
    if (this.cartItems[index].count == 0) {
      this.cartItems.splice(index, 1);
    } 
    this.onProductUpdate(this.cartItems[index]);
    return this.cartItems;
  }

  isEmpty() {
    return (this.cartItems.length === 0);
  }

  getTotalCount() {
    let quantity = this.cartItems.reduce((sum, current) => sum + current.count, 0)
    return quantity;
  }

  getTotalPrice() {
    let total = this.cartItems.reduce((sum, current) => sum + (current.count * current.product.price), 0);
    return total;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

