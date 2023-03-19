function getMinMax(str) {
 let tempArr = str.split(' ').filter(item => Number(item)).map(item => Number(item)).sort( (a, b) => a - b );
  let result = {};
   result.min = tempArr[0];
   result.max = tempArr.at(-1);
  return(result);
}

