function showSalary(users, age) {
   let result = users.filter(user => user['age'] <= age)
    .map(user => `${user['name']}, ${user['balance']}`);
  
  for (let i=0; i < (result.length-1); i++) {
      result[i] += `\n`;
  };

 return(result.join(''));
}