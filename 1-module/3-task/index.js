function ucFirst(str) {
  let result = '';
  if (str) {
    result = str[0].toUpperCase() + str.slice(1);
  }
  return result;
}
