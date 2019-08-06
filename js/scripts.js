const card = document.createElement("div");
card.classList.add("card");
document.getElementById("gallery").appendChild(card);


function createElement(element) {
    return document.createElement(element);
}

function append(parent, element) {
    return parent.appendChild(element);
}

// function fetchData(url) {
//     return fetch(url)
//             .then(res => res.json())
//             .then(data => console.log( data.results ))
//             .catch(error => console.log('Looks like there was a problem', error))
// }




fetch('https://randomuser.me/api/?results=12')
    .then((resp) => resp.json())
    .then(function(data) {
        let people = data.results;
        return people.map(function(person) {
        let divImg = createElement("div");
        divImg.classList.add("card-img-container");
        let infoDiv = createElement("div");
        infoDiv.classList.add("card-info-container");
        append(card, divImg);
        append(card, infoDiv);
        divImg.innerHTML = `<img class="card-img" src=${person.picture.thumbnail} alt="profile picture">`
        infoDiv.innerHTML = `
        <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
        <p class="card-text">${person.email}</p>
        <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
        `

        })
    })
    .catch(function (error){
        console.log(error);
    })
    