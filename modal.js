function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM elements unrelated to validation
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalCls = document.querySelectorAll(".close");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
modalCls.forEach((btn) => btn.addEventListener("click", closeModal));
function closeModal() {
  modalbg.style.display = "none";
}

// Form validation function ///////////////////////////////////////////////////////////////////
function validate() {
  // Retrieves form elements to be validated/ stored
  const first = document.getElementById('first');
  const last = document.getElementById('last');
  const email = document.getElementById('email');
  const birthdate = document.getElementById('birthdate');
  const quantity = document.getElementById('quantity');
  const location = document.querySelector('input[name="location"]:checked');
  const checkbox1 = document.getElementById('checkbox1');
  const checkbox2 = document.getElementById('checkbox2');

  // Initializes an array to store validation errors
  let errors = [];

  // Validates first name
  if (!/^[a-zA-Z]{2,}$/.test(first.value.trim())) {
    errors.push("Le prénom doit être composé d'au moins 2 caractères alphabétiques");
  }

  // Validates last name
  if (!/^[a-zA-Z]{2,}$/.test(last.value.trim())) {
    errors.push("Le nom doit être composé d'au moins 2 caractères alphabétiques");
  }

  // Validates email
  if (!email.value.trim()) { 
    errors.push("Veuillez entrer une adresse email"); 
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    errors.push("Veuillez entrer une adresse email valide");
  }

  // Validates birthdate
  if (!birthdate.value) {
    errors.push("Veuillez indiquer votre date de naissance");
  } else {
    const selectedDate = new Date(birthdate.value);
    const currentDate = new Date();
    if (selectedDate >= currentDate) {
      errors.push("Vous êtes beaucoup trop jeune!");
    }
  }

  // Validates quantity
  if (!/^\d+$/.test(quantity.value) || quantity.value < 0 || quantity.value > 99) {
    errors.push("Le nombre de tournois doit être un nombre entre 0 et 99");
  }

  // Validates location
  if (!location) {
    errors.push("Veuillez sélectionner une des villes proposées");
  }

  // Validates checkbox1
  if (!checkbox1.checked) {
    errors.push("Veuillez accepter les conditions d'utilisation");
  }

  // False if error
  if (errors.length > 0) {
    alert(errors.join("\n"));
    return false;
  }

  // True by default (else validated)
  return true;
}

// Form submission event listener
const form = document.forms['reserve'];
form.addEventListener("submit", (event) => {
  event.preventDefault(); // prevents default feedback loop
  
  if (validate()) {
    console.log("Form is valid, proceeding with submission"); // n/a ofc
    
    // example of retrieving form data if needed
    const idFields = ["first", "last", "email", "birthdate", "quantity"];
    let retrievedIdInputs = {};
    let checkboxInputs = {};

    // retrieves & stores id inputs
    for (let i = 0; i < idFields.length; i++) {
      retrievedIdInputs[idFields[i]] = document.getElementById(idFields[i]).value;
    }

    // retrieves & stores radio input
    let locationInput = document.querySelector('input[name="location"]:checked');
    if (locationInput) {
      checkboxInputs["location"] = locationInput.value;
    }

    // retrieves & stores checked boxes
    checkboxInputs["checkbox1"] = document.getElementById("checkbox1").checked;
    checkboxInputs["checkbox2"] = document.getElementById("checkbox2").checked;

    // logs intercepted data
    console.log(retrievedIdInputs, checkboxInputs);
  } else {
    console.log("Form validation failed");
  }
});