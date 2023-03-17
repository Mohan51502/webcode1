     const uri = "https://api.nationalize.io/?name[]=michael&name[]=matthew&name[]=jane";
const countriesContainer = document.getElementById("countries-container");
const searchInput = document.getElementById("search");
let countries = [];

function handleSearch(target) {
  const search = target.value.toLowerCase();
  const searchMatch = countries.filter((element) => {
    const name = element.name.toLowerCase();
    return name.includes(search);
  });
  renderCards(searchMatch);
}

async function fetchData() {
  const response = await fetch(uri);
  const data = await response.json();
  console.log(data);
  if (data.length > 0) {
    countries = [...data];
    renderCards(countries);
  }
}
fetchData();
function renderCards(data) {
  let cards = [];
  for (let i = 0; i < data.length; i++) {
    cards.push(createCard(data[i]));
  }
  countriesContainer.innerHTML = "";
  countriesContainer.append(...cards);
}

function createCard(data) {
  
  let card = document.createElement("div");
  let title = document.createElement("h2");
  let subHeading = document.createElement("p");

  card.setAttribute("class", "card");
const { name, population } = data;
  title.innerText = data.name;
  subHeading.innerText = data.country[0].probability;
 card.append(title, subHeading);

  return card;
}