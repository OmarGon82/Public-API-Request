
/**
 * Variables that will used throught this app.
 */
const url = 'https://randomuser.me/api/?results=12&nat=us,cd,fr,gb,sp&lego';

const gallleryDiv = document.querySelector("#gallery")

/**
 * Fetch request returns a promised, parsed into json then calls two functions.
 */
fetch(url)
    .then(response => response.json())
    .then(function (data) {
        const people = data.results
        generateHTML(people)
        generateModal(people)
    })

/**
 * Creates the search bar.
 */
const searchDiv = document.querySelector(".search-container")
const form = document.createElement("form");
form.setAttribute("action","#")
form.setAttribute("method", "get")
searchDiv.appendChild(form)
form.innerHTML = `
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
`;

/**
 * variables to create and append the modal div
 */
const modalDiv = document.createElement("div");
modalDiv.classList.add("modal-container");
document.querySelector("body").insertBefore(modalDiv,gallleryDiv.nextSibling);

/**
 * generates the html for the modal
 * @param {*} data - data to be processed
 */

function generateModal(person)  {
    
    modalDiv.innerHTML = `
    <div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
        <img class="modal-img" src="${person.picture.thumbnail}" alt="profile picture">
        <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
        <p class="modal-text">${person.email}</p>
        <p class="modal-text cap">${person.location.city}</p>
        <hr>
        <p class="modal-text">${person.cell}</p>
        <p class="modal-text">${person.location.street}, ${person.location.city}, ${person.location.state} ${person.location.postcode}</p>
        <p class="modal-text">Birthday: ${person.dob.date}</p>
    </div>
    <div class="modal-btn-container">
    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
    <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
    </div>
    `;
}
    
// const openModalButton = document.querySelectorAll(".card");
const closeModalButton = document.getElementById("#modal-close-btn");
const modalOverlay = document.querySelector(".modal-container");
modalOverlay.style.display = "none";
//now modal appears but at the bottom of the page and its always the last one card


gallleryDiv.addEventListener("click", function(event) {
const e = event.target;
if(e.className.includes("card")) {
    console.log("gallery div")
    modalOverlay.style.display = ""
}
})
     

//getting close. It will close if i set e target to !== modal button but other buttons trigger the event
document.querySelector(".modal-container").addEventListener("click", function(event) {
    const e = event.target
    if(e.className === "modal-close-btn") {
    modalOverlay.style.display = "none"
   }
})


// closeModalButton.forEach( button => {
//     button.addEventListener("click", () => {
//         modalOverlay.style.display = ''
//     })
// })

/**
 * function that generates HMTL to display employee cards
 * @param {*} data - data to be processed
 */

function generateHTML(data) {
    data.forEach(function (person) {
        // const email = person.email;
        // const newEmail = email.split(".");
        // console.log(newEmail)
        const card = document.createElement("div");
        card.classList.add("card");

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
        gallleryDiv.appendChild(card)
        card.addEventListener("click", () => {
        generateModal(person)
        })
    })
}

// const input = document.querySelector("input")
    
// function filterNames() {
    // document.getElementsByClassName("pagination")[0].innerHTML = ' ';          
    // let filterValue = document.getElementById('search-input').value.toUpperCase();   
    // let ul = document.getElementById('names');                                 
    // let li = ul.querySelectorAll('li.student-item');                          
//     const searchResults = [];                                                  
//     for(let i = 0; i < li.length; i++) {
//        li[i].style.display = 'none';                                          
//        let h3 = li[i].getElementsByTagName('h3')[0];                           
       
//        if (h3.innerHTML.toUpperCase().includes(filterValue)) { 
//           searchResults.push(li[i]);                                           
//           li[i].style.display = ''                                             
//           } 
          
//        if(searchResults.length === 0) {
//           noNamesDiv.style.display = ''                                        
//        } else {
//           noNamesDiv.style.display = 'none'                                    
//        }
       
//        }                                            
//  }

// input.addEventListener('keyup', filterNames);                                 
// button.addEventListener('click', filterNames);   