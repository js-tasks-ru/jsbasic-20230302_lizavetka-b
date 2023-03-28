function makeFriendsList(friends) {
  let list = document.createElement('ul');
  for (let person of friends) {
    let row = document.createElement('li');
    row.innerHTML = `${person.firstName} ${person.lastName}`;
    list.append(row);    
  }
  return(list);
}
