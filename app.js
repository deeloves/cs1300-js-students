const resultUl = document.querySelector('ul');

const clearList = () => {
  while (resultUl.firstChild) {
    resultUl.removeChild(resultUl.firstChild);
  }
};

const addListEl = name => {
  const li = document.createElement('li');
  li.textContent = name;
  document.querySelector('ul').appendChild(li);
};

const handleResults = (results, letter) => {
  console.log(results);
  const filtered = results.filter(result => result.common_name[0].toUpperCase() === letter.toUpperCase());
  clearList();
  filtered.forEach(plant => {
    addListEl(plant.common_name);
  });
};

const notifyError = () => {
  alert('something went wrong');
};

const search = letter => {
  fetch(`https://cors-anywhere.herokuapp.com/https://trefle.io/api/v1/plants?token=yp9W2Plouedcmp2Z0KslpOECeEyxZJzZG1nu7t3jTOI`)
    .then(res => res.json())
    .then(json => handleResults(json.data, letter))
    .catch(notifyError);
};

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
  const letter = document.querySelector('.form-control').value;
  search(letter);
});
