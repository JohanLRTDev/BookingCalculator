//convert today date to input format
const today = new Date().toISOString().split("T")[0]; // Get the current date in YYYY-MM-DD format
start_date.value = today;
start_date.min = today;
const nightprice = document.getElementById("nightPrice");
let spanPrice = nightprice.textContent;
let nightPriceNumber = parseInt(spanPrice, 10);

//tomorrow date calculation
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

//convert tomorow date to input format
let tomorrowDate = tomorrow.toISOString().split("T")[0]; // Get the date in YYYY-MM-DD format
//set the minimum value for end_date to tomorrow's date
end_date.value = tomorrowDate;
end_date.min = tomorrowDate; // Set the minimum value to tomorrow's date or the current date if it's earlier

// calcule la différence de jours entre les deux dates
const CalculateDays = () => {
  let startDate = new Date(start_date.value);
  let endDate = new Date(end_date.value);
  let diffTime = endDate.getTime() - startDate.getTime(); //la diff en temps en millisecondes
  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // passe en format jours
  AffichageNbNuits(diffDays);

  let totalPrice = diffDays * nightPriceNumber; //calcule le prix total selon le nombre de jours et le prix par nuitée
  document.getElementById("total").textContent = totalPrice; //affiche le prix total dans le HTML
};

//calcul du nombre de nuits et affichage dans le HTML
const AffichageNbNuits = (diffDays) => {
  const nbNuitContainer = document.querySelector(".card h2");
  let nbNuitContainerExist = nbNuitContainer.querySelector("h5");

  if (nbNuitContainerExist) {
    nbNuitContainerExist.innerHTML = diffDays + " Nuitées";
    diffDays < 2
      ? (nbNuitContainerExist.innerHTML = diffDays + " Nuitée") //si la différence de jours est inférieure à 2, affiche nuitée au singulier
      : (nbNuitContainerExist.innerHTML = diffDays + " Nuitées"); //sinon affiche nuitées au pluriel
  } else {
    let nbNuit = document.createElement("h5"); //
    nbNuit.innerHTML = diffDays + " Nuitées";
    nbNuitContainer.appendChild(nbNuit);
  }
};

// ecoute si changement dans input dates, ajuste pour que la date de fin soi toujout a date du début + 1
start_date.addEventListener("change", (e) => {
  let day = new Date(e.target.value);
  if (end_date.value < start_date.value) {
    day.setDate(day.getDate() + 1);
    end_date.value = day.toISOString().split("T")[0];
    end_date.min = day.toISOString().split("T")[0];
  }

  CalculateDays();
});
end_date.addEventListener("change", () => {
  CalculateDays();
});
//.......5555
