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

  #onPointer = (event) => {
    let thumb = this.elem.querySelector('.slider__thumb'); 
    thumb.ondragstart = () => false; //выключить встроенный браузерный Drag-and-Drop
    //подготовить к перемещению
      thumb.style.position = 'absolute';
      thumb.style.zIndex = 1000;
      //document.body.append(thumb);
      
      let sliderPos = this.elem.getBoundingClientRect();
      let progress = this.elem.querySelector('.slider__progress');
      this.elem.classList.add('slider_dragging');
      
      let moveAt = (clientX) => { //двигать 
      
        let temp = this.elem.querySelector('.slider__steps'); //удаление предыдущих активных классов
        for (let i = 0; i < this.steps; i++) {
          if (temp.childNodes[i+1].classList.contains('slider__step-active')) {
            temp.childNodes[i+1].classList.remove('slider__step-active');
          }

        let percentage = (clientX - sliderPos.x) / sliderPos.width * 100;
        if (percentage > 100) percentage = 100
        if (percentage < 0) percentage = 0
        
        thumb.style.left = `${percentage}%`;
        progress.style.width = `${percentage}%`;

        this.value = Math.round(percentage / 100 * (this.steps-1));
        console.log(this.value);
        this.elem.querySelector('.slider__value').textContent= this.value;
        this.elem.querySelector('.slider__steps').childNodes[this.value+1].classList.add('slider__step-active');
      }
    };

    moveAt(event.clientX);

    document.addEventListener('pointermove', onMove); //слушать событие
    
    function onMove(event) {
      moveAt(event.clientX);
    }

    thumb.onpointerup = () => { //окончание движения
      document.removeEventListener('pointermove', onMove);
      this.elem.classList.remove('slider_dragging');
      thumb.onpointerup = null;

      let sliderChange = new CustomEvent('slider-change', { 
        detail: this.value, 
        bubbles: true 
      });
      this.elem.dispatchEvent(sliderChange);
    };
   
  }

  #render() {
    let elem = this.#sliderTemplate();
    elem.addEventListener('pointerdown', this.#onPointer);
    return elem;
  }
}
