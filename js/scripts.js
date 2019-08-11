/**
 * Variables that will used throught this app.
 */
const url = 'https://randomuser.me/api/?results=12&nat=us,cd,fr,gb,sp&lego';
const gallleryDiv = document.querySelector("#gallery") 
/**
 * Fetch request returns a promised, parsed into json then calls the generateHTML function.
 */
let people;
fetch(url)
    .then(response => response.json())
    .then( data => {
        people = data.results
        generateHTML(people)
    })

/**
 * function that generates HMTL to display employee cards
 * @param {*} data - data to be processed
 */
function generateHTML(data) {
    data.forEach(function (person, i) {
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
document.querySelector("body").insertBefore(modalDiv,gallleryDiv.nextSibling);
const modalOverlay = document.querySelector(".modal-container");
modalOverlay.style.display = "none";
/**
 * generates the modal for the the employee card that has been clicked.
 * @param {*} person object of the 
 * @param {*} i  index
 */
function generateModal(person, i)  {
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









// const input = document.querySelector("input")
    
// function filterNames() {
//     document.getElementsByClassName("pagination")[0].innerHTML = ' ';          
//     let filterValue = document.getElementById('search-input').value.toUpperCase();   
//     let ul = document.getElementById('names');                                 
//     let li = ul.querySelectorAll('li.student-item');                          
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