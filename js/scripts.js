const url = 'https://randomuser.me/api/?results=12';
const card = document.createElement("div");
card.classList.add("card");
const searchDiv = document.querySelector(".search-container")
const form = document.createElement("form");
form.setAttribute("action","#")
form.setAttribute("method", "get")
searchDiv.appendChild(form)
form.innerHTML = `
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
`;


fetch(url)
    .then(response => response.json())
    .then(function (data) {
        const people = data.results
        generateHTML(people)
    })

function generateHTML(data) { 
    data.forEach(function (person) {
        card.innerHTML = `
        <div class="card-img-container">
        <img class="card-img" src=${person.picture.thumbnail} alt="profile picture">
        </div>
        <div class="card-info-container">
        <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
        <p class="card-text">${person.email}</p>
        <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
        </div>
        `;
        document.getElementById("gallery").appendChild(card.cloneNode(true))
    })
}

    
