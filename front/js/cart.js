
let id =0;
// Récupération du Panier dans le Localstorage et conversion de l'objet dataPanier en Array Panier;

let Panier = [];

  function afficherTag(){
    fetch(`http://localhost:3000/api/products`)
    .then ((res)=> {return res.json()})
    
    .then ((array)=> {


const quantiteProduit = localStorage.length;
for(let i=0; i<quantiteProduit; i ++){
      const produit = localStorage.getItem(localStorage.key(i));
      let dataPanier = JSON.parse(produit);
      Panier.push(dataPanier)

    }
/**************************************************************/

// pour afficher le prix total de chaque article ajouté dans le panier
let dataPrice = [];

// /*utilisation de la fonction sort() pour trier les éléments du Panier selon leur nom 
// afin que les modèles soient groupés en fonction du nom et de la couleur*/
Panier.sort((a,b)=>{
  return a.nom > b.nom ? 1:-1
}
)

 Panier.map((produit)=>{
    let key = produit.key;
    let newId = produit.addId;
    let refColor = produit.color;
    let quantité = produit.quantité;
    const index = array.find(item => item._id === produit.addId)
  
    const section = document.querySelector("#cart__items");
    const article = document.createElement("article");
    article.classList.add("cart__item");
    article.dataset.id =`${key}`;
    article.dataset.colors = `${ refColor}`;
    const divImg = document.createElement("div");
    divImg.classList.add("cart__item__img");
    const image = document.createElement("img");
    image.src = index.imageUrl;
    image.alt = index.altTxt;
    const divDescription = document.createElement("div");
    divDescription.classList.add("cart__item__content");
    const divContentDes = document.createElement("div");
    divContentDes.classList.add("cart__item__content__description");
    const h2Description = document.createElement("h2");
    h2Description.textContent = index.name;
    const pColor = document.createElement("p");
    pColor.textContent =`${refColor}`;
    const p = document.createElement("p");
    p.innerText = index.price +"€";
    const divSettings = document.createElement("div");
    divSettings.classList.add("cart__item__content__settings")
    const divQuantity = document.createElement("div");
    divQuantity.classList.add("cart__item__content__settngs__quantity")
    const pQuantity = document.createElement("p");
    pQuantity.innerText = "Qté : " + `${quantité}` ;
    const inputQuantity = document.createElement("input");
    inputQuantity.type = "number";
    inputQuantity.classList.add("itemQuantity");
    inputQuantity.name = "itempQuantity";
    inputQuantity.min = "1";
    inputQuantity.max ="100";
    inputQuantity.value =  `${quantité}`;
    const itemQuantity = document.createElement("value");
    itemQuantity.innerText = `${quantité}`;
    const divDelete = document.createElement("div");
    divDelete.classList.add("cart__item__content__settings__delete");
    const pDelete = document.createElement("p");
    pDelete.classList.add("deleteItem");
    pDelete.innerText = "Supprimer";
   
// Attribution des parents à chaque élément créé
    section.appendChild(article);
    article.appendChild(divImg);
    article.appendChild(divDescription);
    article.appendChild(divContentDes);
    article.appendChild(divSettings)
    divImg.appendChild(image);
    divDescription.appendChild(divContentDes);
    divDescription.appendChild(divSettings);
    divContentDes.appendChild(h2Description);
    divContentDes.appendChild(pColor);
    divContentDes.appendChild(p);
    divSettings.appendChild(divQuantity);
    divSettings.appendChild(pQuantity);
    divSettings.appendChild(inputQuantity);
    divQuantity.appendChild(pQuantity);
    divQuantity.appendChild(inputQuantity);
    inputQuantity.appendChild(itemQuantity);
    divSettings.appendChild(divDelete);
    divDelete.appendChild(pDelete);
 

/******************************SUPPRESSION ARTICLE*****************************************/
      const sup = document.querySelectorAll(".deleteItem");
      sup.forEach(btn => {
        btn.addEventListener("click", (e) =>{
          const route = e.target.closest("article");
          Panier= Panier.filter((e)=> e.key !== route.dataset.id || e.color !== route.dataset.colors);
         
          if(Panier.length === 0){
            localStorage.removeItem(key);
            location.reload();
          }
          else {
            localStorage.removeItem(key,(Panier));
            location.reload();

            // La fonction sort permet ici de retrier les produits du panier après suppression d'un article
            Panier.sort(function(a,b){
              for(i=0; i< Panier.length; i++){
                return a.addId>b.addId ? 1:-1
              }
              
            })
          }
           btn.remove();

        })
      })
    
/************************************************************************************/ 

/********************* CAlCULE PREMIER PANIER APRES CHOIX PAGE PRODUIT ***************/
   
function totalQtPrice(){
  let artPrice =0;

    if (newId == index._id){
      artPrice += index.price * produit.quantité;
      dataPrice.push(artPrice)
      const spanPrice = document.querySelector("#totalPrice");
      const total = dataPrice.reduce((x,y)=> x + y)
      spanPrice.innerHTML = total
    }
   

// Calcule de la Quantité
let artQuantité =0;
for(const artQT of Panier){
  artQuantité += artQT.quantité;
   const spanQuantite = document.querySelector("#totalQuantity");
spanQuantite.innerHTML = artQuantité;
}

}
totalQtPrice()
/********************************************************************************* */


/************************** CHANGEMENT QUANTITE ET CALCULE DU SECOND PANIER*******************/

   
 const changeQT = document.querySelectorAll(".itemQuantity");
 changeQT.forEach(changeArticle =>{
 changeArticle.addEventListener("change",(e)=> {
      const produitData = Panier.find((article)=> article.key == key)
      if(produitData.key == article.dataset.id && produitData.color == article.dataset.colors){

        produitData.quantité = Number(inputQuantity.value);
      
         /* Ajout d'une condition si l'utilisateur rentre une quantité négatif
        la quantité négative n'est pas pris en compte dans le calcule du nombre total d'article, 
        la quantité affiche la quantité initialement sélectionné ( Qté : 6 par exemple)
        et le prix du Panier est correcte*/
        if(inputQuantity.value <= 0 || inputQuantity.value >= 101){
          alert("SVP choissez une quantité entre 1 et 100, merci.");
          inputQuantity.value = `${quantité}`
          produitData.quantité = Number(inputQuantity.value)
        }
        localStorage.setItem(key,JSON.stringify(produitData))
       

// Calcule du Prix 

const spanPrice = document.querySelector("#totalPrice");

   let prix =0;
   for(i=0; i<Panier.length; i++){
    if(Panier[i].addId == index._id && Panier[i].color == refColor){
      dataPrice.splice(i,1)
      prix += Panier[i].quantité *index.price;
      dataPrice[i]=prix;
    }
   }
 
const total = dataPrice.reduce((x,y)=> x + y,0)
spanPrice.innerHTML = total;

// Calcule de la Quantité
  let artQuantité =0;
  for(const artQT of Panier){
    artQuantité += artQT.quantité;
     const spanQuantite = document.querySelector("#totalQuantity");
     spanQuantite.innerHTML = artQuantité;
  }
  }
 }
 )
 });

/********************************************************************************* */

// fin then(kanap)
})
  // fin map Panier 
})
// fin afficherTag()
}





/************************************PARTIE FORMULAIRE ******************************/

document.querySelector("#order").addEventListener("click", (e)=>{
  e.preventDefault();


if(Panier.length === 0){
  alert("Votre panier est vide ! Choissez un ou plusieurs article pour constituer votre panier d'achat, merci.")
  return  window.location.href = "index.html"
}
    

/**Constitution d'un tableau pour conserver les données client avec les ids */
let contact = [];
let products = [];


/**Création des expressions régulière pour contrôler ce qui est saisi dans le formulaire de commande**/
let nameRegex = /^[A-ZÄÂÉÈËÊÏÎÔÔÜÛÇa-zäâàéèëêüïîüûç -]+$/i;
let addressRegex = /^[A-ZÄÂÉÈËÊÏÎÔÔÜÛÇa-zäâàéèëêüïîüûç\ \-\'\d\.\,]+$/i;
let emailRegex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/


let form = e.target.closest("form");
let validForm = true;

/************************Travail sur l'input FirstName************************* */
 
  
if(form['firstName'].value === "" || !nameRegex.test(form['firstName'].value)){
  firstNameErrorMsg.innerHTML ="Veuillez entrer votre Prénom, merci.";
  validForm = false;
  return false
}
else{
  firstNameErrorMsg.innerHTML ="";
  let firstName = form['firstName'].value;
  contact[0]= firstName;
  validForm = true;

}

/************************Travail sur l'input lastName************************* */
 

if(form['lastName'].value === "" || !nameRegex.test(form['lastName'].value)){
  lastNameErrorMsg.innerHTML ="Veuillez entrer votre Nom, merci.";
  validForm = false;
  return false
}
else{
  lastNameErrorMsg.innerHTML ="";
  let lastName = form['lastName'].value;
  contact[1]= lastName;
  validForm = true;

}

/************************Travail sur l'input Address************************* */
 

if(form['address'].value === "" || !addressRegex.test(form['address'].value)){
  addressErrorMsg.innerHTML ="Veuillez entrer votre adresse postale, merci.";
  validForm = false;
  return false
}
else{
  addressErrorMsg.innerHTML ="";
  let address = form['address'].value;
  contact[2]= address;
  validForm = true;

}


/************************Travail sur l'input city************************* */
 

if(form['city'].value === "" || !nameRegex.test(form['city'].value)){
  cityErrorMsg.innerHTML ="Veuillez entrer votre Ville, merci.";
  validForm = false;
  return false
}
else{
  cityErrorMsg.innerHTML ="";
  let city = form['city'].value;
  contact[3]= city;
  validForm = true;

}

/************************Travail sur l'input email************************* */
 

if(form['email'].value === "" || !emailRegex.test(form['email'].value)){
  emailErrorMsg.innerHTML ="Veuillez entrer une adresse email valide, merci.";
  validForm = false;
  return false
}
else{
  emailErrorMsg.innerHTML ="";
  let email = form['email'].value;
  contact[4]= email;
  validForm = true;

}



//////////////////////////////////////////////////////
/*************Récupération des order Ids *********** */
function getOrderId(){

  Panier.map(prodId=>{
    id = prodId.addId;
    products.push(id)
  })
  }
  getOrderId()
  

/*Constitution de l'objet contact pour faire une requête POST */
const body = {
  contact : {
    firstName : contact[0],
    lastName : contact[1],
    address : contact[2],
    city : contact[3],
    email : contact[4]
  },
  products : products
}

fetch("http://localhost:3000/api/products/order", {
  method :"POST",
  body :  JSON.stringify(body),
  headers : {
    "content-type" : "application/json"},
})
.then((res)=>{
  return res.json();
})
.then((kanap)=>{
 
/*Cette partie permet de vider le formulaire et le localStorage lorsque l'utilisateur 
va cliquer sur Commander,sachant que les données sont déjà enregistré dans les tableaux 
contact et products avec les contrôles regEx*/

localStorage.clear()

if(validForm = true){
form['firstName'].value = "";
form['lastName'].value = "";
form['address'].value = "";
form['city'].value = "";
form['email'].value = "";

}

//Redirection vers la page confirmation de commande.
window.location.href = "confirmation.html?id="+kanap.orderId;
  

})
.catch((error) =>{
  console.error(error)
})


})

afficherTag()