function camelize(str) {
  let result = str.split('');
  for (let i = 0; i < result.length; i++) {
    if (result[i] == '-') {
      result.splice(i+1,1,result[i+1].toUpperCase());
    };
  }

  return result.filter(item => item != '-').join('');
}