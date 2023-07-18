const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultDiv = document.getElementById('result');

searchButton.addEventListener('click', searchName);

function searchName() {
    const name = searchInput.value.trim();
    
    if (name !== '') {
        fetch(`https://api.nationalize.io/?name=${encodeURIComponent(name)}`)
            .then(response => response.json())
            .then(data => {
                displayResults(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

function displayResults(data) {
    resultDiv.innerHTML = '';

    if (data.country.length > 0) {
        const resultsList = document.createElement('ul');
        data.country.forEach(country => {
            const listItem = document.createElement('li');
            listItem.innerText = `Country: ${country.country_id}, Probability: ${country.probability.toFixed(2)}`;
            resultsList.appendChild(listItem);
        });
        resultDiv.appendChild(resultsList);
    } else {
        resultDiv.innerText = 'No results found.';
    }
}
