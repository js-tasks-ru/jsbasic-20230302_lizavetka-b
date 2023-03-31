function toggleText() {
  let button = document.querySelector('.toggle-text-button');
  button.addEventListener('click', toggle);
  function toggle() {
    text.hidden == true ? text.hidden = false : text.hidden = true;
  }
}
