/**
 * api url 
 * selected the gallery div
 */
const url = 'https://randomuser.me/api/?results=12&nat=us,cd,fr,gb,sp&lego';
const galleryDiv = document.querySelector("#gallery");

/**
 * Fetch request returns a promised, parsed into json then calls the generateHTML function.
 * initializedd the people variable so it can be accessed later.
 */
let people;
fetch(url)
    .then(response => response.json())
    .then( data => {
        people = data.results
        console.log(people)
        generateHTML(people)
    })
    .catch (err => (Error('looks like something wrong', err)));

/**
 * function that generates HMTL to display employee cards
 * @param {*} data - the people object will passed.
 * used regex to take out the last name of the email address so all text fits in the
 */
function generateHTML(data) {
    data.forEach(function (person, i) {
        const email = person.email.replace(/\.\w\w\w\w\w?\w?\w?/,"")
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <div class="card-img-container">
            <img class="card-img" src=${person.picture.thumbnail} alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
            <p class="card-text">${email}</p>
            <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
        </div>
        `;
        galleryDiv.appendChild(card)
        card.addEventListener("click", () => {
        modalOverlay.style.display = ""
        generateModal(person,i)
        })
    })
}
     

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
document.querySelector("body").insertBefore(modalDiv,galleryDiv.nextSibling);
const modalOverlay = document.querySelector(".modal-container");
modalOverlay.style.display = "none";

/**
 * generates the modal for the the employee card that has been clicked.
 * @param {*} person object holding the json data.
 * @param {*} i  index
 * reformatted the DOB to show only the date
 */
function generateModal(person, i)  {
    const email = person.email.replace(/\.\w\w\w\w\w?\w?\w?/,"")
    const birthday = person.dob.date.slice(0,10)
    modalDiv.innerHTML = `
    <div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
        <img class="modal-img" src="${person.picture.thumbnail}" alt="profile picture">
        <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
        <p class="modal-text">${email}</p>
        <p class="modal-text cap">${person.location.city}</p>
        <hr>
        <p class="modal-text">${person.cell}</p>
        <p class="modal-text">${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state} ${person.location.postcode}</p>
        <p class="modal-text">Birthday: ${birthday}</p>
    </div>
    <div class="modal-btn-container">
    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
    <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
    </div>
    `;
    const prevBtn = document.getElementById("modal-prev");
    const nextBtn = document.getElementById("modal-next");
    prevBtn.addEventListener("click", () => {
        if(i >= 0) {
            modalDiv.innerHTML = ""
            generateModal(people[i - 1],  i - 1)
        }
        })
        if( i === 0) {
           
            prevBtn.remove()
        }
        
    nextBtn.addEventListener("click", () => {
        if(i >= 0) {
           modalDiv.innerHTML = ""
           generateModal(people[i + 1], i + 1)
        }

    })
    if( i === 11) {
        nextBtn.remove()
       
    }
}
        
/**
 * closes Modal when X is clicked
 */
modalDiv.addEventListener("click", function(event) {
    const e = event.target
    if(e.tagName === "STRONG") {
    modalOverlay.style.display = "none"
   }
})


/**
 * Created a div to display a message if the search has no results.
 */
const noNamesDiv = document.createElement("div");
noNamesDiv.textContent = "Sorry no matches found...";
noNamesDiv.style.fontFamily = "'Courier New', Courier, monospace";
noNamesDiv.style.color = "white";  
galleryDiv.append(noNamesDiv);     
noNamesDiv.style.display = "none";
const input = document.querySelector("input");

/**
 * filters names and displays results. If no matches it displays a message.
 */
    
function filterNames() {
    const card = document.querySelectorAll(".card")
    const namesArr = Array.from(card)       
    let filterValue = document.getElementById('search-input').value.toUpperCase();                            
    const searchResults = [];                                                  
    for(let i = 0; i < namesArr.length; i++) {
       card[i].style.display = 'none';                                          
       let h3 = card[i].getElementsByTagName('h3')[0];                           
           
       if (h3.innerHTML.toUpperCase().includes(filterValue)) { 
          searchResults.push(card[i]);                                           
          card[i].style.display = '' 
                              
          } 
          
       if(searchResults.length === 0) {
          noNamesDiv.style.display = ''                                        
       } else {
          noNamesDiv.style.display = 'none'                                    
       }
       
    }
        
}
                                        
/**
 * Event listeners for the search bar. Both take call the filterNames function.
 */
const searchBtn = document.querySelector(".search-submit"); 
input.addEventListener('keyup', filterNames);                                 
searchBtn.addEventListener('click', filterNames);   