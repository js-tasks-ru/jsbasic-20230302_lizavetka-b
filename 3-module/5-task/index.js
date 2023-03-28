function getMinMax(str) {
 let tempArr = str.split(' ').filter(item => Number(item)).map(item => Number(item)).sort( (a, b) => a - b );
  return {
   min: tempArr[0],
   max: tempArr.at(-1),
}
}

