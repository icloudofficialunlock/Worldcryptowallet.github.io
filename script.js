const soldeElement = document.getElementById("solde");
const transactionsTable = document.getElementById("transactions-table");
const retraitMontantElement = document.getElementById("retrait-montant");
const retraitAdresseElement = document.getElementById("retrait-adresse");
const confirmationRetraitElement = document.getElementById("confirmation-retrait");
const retraitMontantConfirmElement = document.getElementById("retrait-montant-confirm");
const retraitAdresseConfirmElement = document.getElementById("retrait-adresse-confirm");
const fraisRetraitConfirmElement = document.getElementById("frais-retrait-confirm");
const paiementRetraitElement = document.getElementById("paiement-retrait");
const fraisRetraitPaiementElement = document.getElementById("frais-retrait-paiement");

const MAX_TRANSACTIONS = 5;

const generateRandomAddress = () => {
  // Fonction pour générer une adresse aléatoire
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let address = "0x";
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address;
};

const sendTransaction = (destinationAddress, montant) => {
  // Fonction pour envoyer une transaction
  // Mettre à jour le solde
  const newSolde = parseInt(soldeElement.textContent) - montant;
  if (newSolde < 0) {
    // Solde insuffisant
    alert("Solde insuffisant pour effectuer la transaction.");
    return;
  }
  soldeElement.textContent = newSolde;

  // Ajouter la transaction à l'historique
  const transaction = {
    date: new Date().toLocaleDateString(),
    heure: new Date().toLocaleTimeString(),
    destinationAddress,
    montant,
  };
  addTransaction(transaction);
};

const addTransaction = (transaction) => {
  // Fonction pour afficher une transaction dans le tableau
  // Masquer les anciennes transactions si nécessaire
  if (transactionsTable.tBodies[0].children.length >= MAX_TRANSACTIONS) {
    transactionsTable.tBodies[0].removeChild(transactionsTable.tBodies[0].firstChild);
  }

  // Créer une nouvelle ligne pour la transaction
  const tr = document.createElement("tr");
  const tdDate = document.createElement("td");
  const tdHeure = document.createElement("td");
  const tdDestinationAddress = document.createElement("td");
  const tdMontant = document.createElement("td");

  tdDate.textContent = transaction.date;
  tdHeure.textContent = transaction.heure;
  tdDestinationAddress.textContent = transaction.destinationAddress;
  tdMontant.textContent = transaction.montant;

  tr.appendChild(tdDate);
  tr.appendChild(tdHeure);
  tr.appendChild(tdDestinationAddress);
  tr.appendChild(tdMontant);

  // Ajouter la ligne au tableau
  transactionsTable.tBodies[0].appendChild(tr);
};

// Fonction pour générer et envoyer une transaction aléatoire
const generateAndSendTransaction = () => {
  const montant = Math.floor(Math.random() * 500) + 1; // Montant aléatoire entre 1 et 1000 USDT
  const destinationAddress = generateRandomAddress();

  sendTransaction(destinationAddress, montant);
};

// Génération et envoi automatiques de transactions
let intervalId = setInterval(generateAndSendTransaction, 75000); // Envoie une transaction toutes les 10 secondes

document.getElementById("generer-transaction").addEventListener("click", () => {
  // Bouton pour activer/désactiver la génération automatique
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    document.getElementById("generer-transaction").textContent = "Générer une transaction aléatoire (activé)";
  } else {
    intervalId = setInterval(generateAndSendTransaction, 10000);
    document.getElementById("generer-transaction").textContent = "Générer une transaction aléatoire (désactivé)";
  }
});

const MIN_RETRAIT_AMOUNT = 500;

document.getElementById("retrait-form").addEventListener("submit", (event) => {
  // Fonction pour gérer le retrait
  event.preventDefault();

  const retraitMontant = parseInt(retraitMontantElement.value);
  const retraitAdresse = retraitAdresseElement.value;
  const fraisRetrait = retraitMontant * 0.04;
  const montantTotal = retraitMontant + fraisRetrait;

  // Vérifier si le solde est insuffisant
  if (montantTotal > soldeElement.textContent) {
    alert("Solde insuffisant pour effectuer le retrait.");
    return;
  }

   // Vérifier si le montant est supérieur au retrait minimal
   if (retraitMontant < MIN_RETRAIT_AMOUNT) {
    alert("Le montant du retrait doit être supérieur ou égal à 500 USDT.");
    return;
  }
  
  // Afficher la confirmation de retrait
  retraitMontantConfirmElement.textContent = retraitMontant;
  retraitAdresseConfirmElement.textContent = retraitAdresse;
  fraisRetraitConfirmElement.textContent = fraisRetrait;
  confirmationRetraitElement.style.display = "block";

  // Masquer le formulaire de retrait
  document.getElementById("retrait-form").style.display = "none";
});

document.getElementById("confirmer-retrait").addEventListener("click", () => {
  // Confirmer le retrait
  fraisRetraitPaiementElement.textContent = fraisRetrait;
  confirmationRetraitElement.style.display = "none";
  paiementRetraitElement.style.display = "block";
});

document.getElementById("annuler-retrait").addEventListener("click", () => {
  // Annuler le retrait
  confirmationRetraitElement.style.display = "none";
  document.getElementById("retrait-form").style.display = "block";
  retraitMontantElement.value = "";
});

document.getElementById("retour-accueil").addEventListener("click", () => {
  // Retourner à l'accueil
  paiementRetraitElement.style.display = "none";
  document.getElementById("retrait-form").style.display ="block";
  retraitMontantElement.value = "";
});

// Définir le solde initial
updateSolde(53289);

function updateSolde(newSolde) {
  soldeElement.textContent = newSolde;
}

function isValidAddress(address) {
  // Fonction pour valider l'adresse de retrait
  // ... code pour valider l'adresse ...
  return true; // Valeur par défaut pour l'exemple
}
function confirmerRetrait() {
    // Fonction pour confirmer le retrait et rediriger vers une autre page
    // ... code pour confirmer le retrait ...
  
    // Redirection vers la page de confirmation
    window.location.href = "paiement.html";
  }  
 
