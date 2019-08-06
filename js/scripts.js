const card = document.createElement("div");
card.classList.add("card");
document.getElementById("gallery").appendChild(card);
const url = 'https://randomuser.me/api/?results=11';


fetch(url)
    .then(response => response.json())
    .then(function (data) {
        const people = data.results
        generateHTML(people)
    })


 
function generateHTML(data) { 
    data.forEach(function (person) {
        card.innerHTML = `
        <div class="card-info-container">
        <img class="card-img" src=${person.picture.medium} alt="profile picture">
        <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
        <p class="card-text cap">${person.email}</p>
        <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
        </div>
        `;
        document.getElementById("gallery").appendChild(card.cloneNode(true))
    })
}
