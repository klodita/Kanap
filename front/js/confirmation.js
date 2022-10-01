/*Utilisation de window location search pour obtenir l'orderId contenu dans l'url qui a été créé depuis la page cart.js 
et suppresion des 4 première caractère avec slice pour avoir uniquement l'orderId afin de l'afficher dans la balise span 
pour communiquer au client son numéro de commande*/ 

const queryString = window.location.search;
let id = queryString.slice(4);

const idOrder = document.querySelector("#orderId");
idOrder.innerHTML = id;

