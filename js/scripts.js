const card = document.createElement("div");
card.classList.add("card");
document.getElementById("gallery").appendChild(card);
const imgContainer = document.createElement("div");
imgContainer.classList.add("card-img-container");
card.appendChild(imgContainer)
const url = 'https://randomuser.me/api/?results=12';

function createElement(element) {
    return document.createElement(element);
}

function append(parent, element) {
    return parent.appendChild(element);
}



fetch(url)
    .then(response => response.json())
    .then(function (data) {
        const people = data.results
        generateImage(people)
        generateHTML(people)
    })
    // .then( data => generateImage(data))



function generateImage(data) {
    const pictures = data.map( data => {
        imgContainer.innerHTML =  `<img class="card-img" src=${data.picture.medium} alt="profile picture">`;
    })
     return pictures
    // console.log(data)
    
                    
}   
function generateHTML(data) { 
    
 
    const infoDiv = createElement("div");
    infoDiv.classList.add("card-info-container");
    append(card, infoDiv);
    const peopleInfo = data.map( data => {
    infoDiv.innerHTML = `
        <h3 id="name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
        <p class="card-text">${data.email}</p>
        <p class="card-text cap">${data.location.city}, ${data.location.state}</p>
        `;
    })
    return peopleInfo
}