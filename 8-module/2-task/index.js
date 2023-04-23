import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = this.#render();
    this.filtered = this.products;
  }

  #productGridTemplate(products) {
    let outer = createElement(`
      <div class="products-grid">
      <div class="products-grid__inner">
      <!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
      </div>
      </div>`);
    
    for (let product of products) {
      let inner = new ProductCard(product);
      outer.querySelector('.products-grid__inner').append(inner.elem);
    }
    return outer;  
  }

  updateFilter(filters) {
    let filtered = this.filtered;
    
    if (filters.noNuts == true) {
      filtered = filtered.filter(item => 
        ((item.nuts == 'false') || ('nuts' in item) == false));
    } 
    if (filters.vegeterianOnly == true) {
      filtered = filtered.filter(item => 
        (item.vegeterian == true));
    }
    if (filters.maxSpiciness) {
      filtered = filtered.filter(item => 
        (item.spiciness <= filters.maxSpiciness));
    }
    if (filters.category) {
      filtered = filtered.filter(item => 
        (item.category == filters.category));
    }
    
    this.elem = this.#productGridTemplate(filtered); 
    this.filtered = filtered;
    console.log(filtered);

    document.querySelector('.products-grid').replaceWith(this.elem);
    
   // this.elem = temp;
    return (this.elem);
  }

  #render() {
    const elem = this.#productGridTemplate(this.products);

    return elem;
  }
}
