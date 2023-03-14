function isEmpty(obj) {
  // ваш код...
  let check = true;
  for (let key in obj) {
    if (key) {
      check = false;
    }
  }
  return check;
}
