//declaration of all globar variables//

const doc = document.querySelector("body");
const search = document.querySelector('.search-container');
const gallery = document.querySelector('#gallery');
let employees =[];



//function to add HTML dynamically//
function addHTML(div, htmlToAdd){
    div.insertAdjacentHTML('beforeend', htmlToAdd);
    return div;
}


//helper function to fetch data and return as JSON//

async function getData(url){
    try{
    const response = await fetch(url);
    return await response.json();
    } catch(error) {
        throw error;
    }
}

async function getEmployeeData(url){
    const userData= await getData(url);
    employees = userData.results;
    console.log(employees);
    return employees

}

//adds search bar
addHTML(search, `
<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`);


//uses the data fetched from the API and creates employee card objects with required
//contact details
getEmployeeData('https://randomuser.me/api/?results=12&nat=us')
    .then(employees => {
        employees.map(employee => {
            addHTML(gallery, ` 
            <div class="card">
                <div class="card-img-container">
                    <img class="card-img" src=${employee.picture.large} alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                    <p class="card-text">${employee.email}</p>
                    <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
                </div>
            </div>`); 
      
        })
        
        employees.forEach(employee => {

            //codeblock for getting actualBirthday
            //set employee.dob.date to a new Date
                //declare a day,month and year variable from employee.dob.date
                //concat the 3 variables by means of a literal template in the correct format
            const birthday = new Date(employee.dob.date);
            //add one to birthdayMonth because .getMonth method returns 0-11 for Jan-Dec
            let birthdayMonth = (birthday.getMonth(birthday)) + 1;
            let birthdayDay = birthday.getDate(birthday);
            const birthdayYear = birthday.getFullYear(birthday);
            if(birthdayDay < 10){
                birthdayDay = '0'+birthdayDay;
            }
            if(birthdayMonth < 10){
                birthdayMonth = '0'+birthdayMonth;
            }
        
            const actualBirthday = `${birthdayMonth}/${birthdayDay}/${birthdayYear}`
            
            addHTML(doc, `
            <div class="modal-container">
             <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src=${employee.picture.large} alt="profile picture">
                        <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                        <p class="modal-text">${employee.email}</p>
                        <p class="modal-text cap">${employee.location.city}</p>
                        <hr>
                        <p class="modal-text">${employee.cell}</p>
                        <p class="modal-text">${employee.location.street.name}, ${employee.location.street.number}, ${employee.location.country}, ${employee.location.postcode}</p>
                        <p class="modal-text">Birthday: ${actualBirthday}</p>
                    </div>
                </div>
            </div>
             `)
            })
        
        // adds a close function for the modal-containers    
        const closeButtons = document.querySelectorAll(".modal-close-btn");
        closeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                //Targets the modal-container by means of DOM traversal
                console.log(e.target.parentNode.parentNode.parentNode);
                if(e.target.parentNode.parentNode.parentNode.className === 'modal-container' ){
                e.target.parentNode.parentNode.parentNode.style.display = 'none';
                }//if e.target.parentNode.parentNode.parentNode === 'body', bug?
                    //workaround for the bug for now, any feedback will be appreciated
                else{
                    e.target.parentNode.parentNode.style.display = 'none';
  
                }
            })
        })
        const modalContainers = document.querySelectorAll('.modal-container');
        modalContainers.forEach(modal => {
            modal.style.display = 'none';

        });

        //adds EventListeners to all cards
            //if employeeName of current loop itiration === employee name of event target
            //display the modalcontainer of said employee
        const employeeCards = document.querySelectorAll(".card"); 
        employeeCards.forEach(employeeCard => {
            employeeCard.addEventListener('click', (e) => {
                const employeeCardName = e.currentTarget.querySelector("#name").textContent;

                for(let i=0; i < employees.length; i++){
                    const employeeName = `${employees[i].name.first} ${employees[i].name.last}`;


                    if(employeeName === employeeCardName){
                        modalContainers[i].style.display = 'block';
                        }
                    }
            })
        })


    });

    
        





    


