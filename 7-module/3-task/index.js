import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.#render();
  }

  #sliderTemplate() {
    let outer = createElement(`
    <!--Корневой элемент слайдера-->
  <div class="slider">

    <!--Ползунок слайдера с активным значением-->
    <div class="slider__thumb" style="left: 0%;">
      <span class="slider__value">${this.value}</span>
    </div>

    <!--Заполненная часть слайдера-->
    <div class="slider__progress" style="width: 0%;"></div>

    <!--Шаги слайдера-->
    <div class="slider__steps">
    </div>
  </div>`);

    for (let i = 0; i < this.steps; i++) {
      let inner = createElement(`<span></span>`);
      outer.querySelector('.slider__steps').append(inner);
    }
    outer.querySelector('.slider__steps').children[this.value].classList.add('slider__step-active');
    return outer;
  }

  #moveSlider = (event) => {
    
      let sliderPos = this.elem.getBoundingClientRect();
      let target = event.clientX;
      let currentPos = target - sliderPos.x;
      let oneStep = sliderPos.width / (this.steps-1);
      this.value = Math.round(currentPos / oneStep);
      //получение процентов:
      let percentage = this.value / (this.steps-1) * 100;

      let temp = this.elem.querySelector('.slider__steps'); //удаление предыдущих активных классов
      for (let i = 0; i < this.steps; i++) {
        if (temp.childNodes[i+1].classList.contains('slider__step-active')) {
          temp.childNodes[i+1].classList.remove('slider__step-active');
        }
      }
      this.#changeValues(percentage);
    }
    
  #changeValues = (percentage) => {
      //изменения значений
      this.elem.querySelector('.slider__value').textContent= this.value;
      this.elem.querySelector('.slider__steps').childNodes[this.value+1].classList.add('slider__step-active');
    //this.elem.querySelector('.slider__thumb').style = `left: ${percentage}%`; 
      this.elem.querySelector('.slider__thumb').style.left = `${percentage}%`; 
      //this.elem.querySelector('.slider__progress').style = `width: ${percentage}%`;
      this.elem.querySelector('.slider__progress').style.width = `${percentage}%`;

      //генерация события
      let sliderChange = new CustomEvent('slider-change', { 
        detail: this.value, 
        bubbles: true 
      });
      this.elem.dispatchEvent(sliderChange);
  }

  #render() {
    let elem = this.#sliderTemplate();
    elem.addEventListener('click', this.#moveSlider);
    return elem;
  }
}
