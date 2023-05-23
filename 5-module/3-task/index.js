function initCarousel() {
  let view = document.querySelector('.carousel__inner');
  let width = document.querySelector('.carousel__slide').offsetWidth;
  
  let right = document.querySelector('.carousel__arrow_right');
  let left = document.querySelector('.carousel__arrow_left');
  
  let place = document.querySelector('[data-carousel-holder]');
  let position = 0;
  hideArrow(position);

  place.addEventListener('click', watch);

  function watch(event) {
    let target = event.target.closest('div'); // где был клик?
    if (!(target == left || target == right)) return; // не на стрелке? тогда не интересует
  
    position = changePos(position, target);
    moveSlide(position);
    hideArrow(position);
  };

  function changePos(position, target) { //проверка и изменение позиции
    if (target == right && position > -(width*3)) {
      position = position - width;
    } 

    if (target == left && position < 0) {
      position = position + width;
    } 
    
    return position;
  }

  function moveSlide(newPos) { //сдвиг слайда
    let move = newPos + 'px';
    view.style.transform = `translateX( ${move})`; 
  }

  function hideArrow(pos) { //скрыть стрелки
    if (pos == 0) {
      left.style.display = 'none';
    } else {
      left.style.display = '';
    }
    if (pos == -(width*3)) {
      right.style.display = 'none';
    } else {
      right.style.display = '';
    }

  }

}
