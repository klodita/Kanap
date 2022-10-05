// Récupération du Panier dans le Localstorage et conversion de l'objet dataPanier en Array Panier;

let Panier = [];
const quantiteProduit = localStorage.length;
for(let i=0; i<quantiteProduit; i ++){
      const produit = localStorage.getItem(localStorage.key(i));
      let dataPanier = JSON.parse(produit);
      Panier.push(dataPanier)

    }
/**************************************************************/

// pour afficher le prix total de chaque article ajouté dans le panier
let dataPrice = [];
// let newPrice = [];

let id =0;

/*utilisation de la fonction sort() pour trier les éléments du Panier selon leur nom 
afin que les modèles soient groupés en fonction du nom et de la couleur*/

Panier.sort(function(a,b){
  for(i=0; i< Panier.length; i++){
    return a.nom>b.nom ? 1:-1
  }
  
})


Panier.map((produit)=>{
  let key = produit.key;
  let newId = produit.addId;
  let refColor = produit.color;
  let quantité = produit.quantité;

  afficherTag()

  function afficherTag(){
    fetch(`http://localhost:3000/api/products/`)
    .then ((res)=> {return res.json()})
    
    .then ((array)=> {
      
    const section = document.querySelector("#cart__items");
    const article = document.createElement("article");
    article.classList.add("cart__item");
    article.dataset.id =`${key}`;
    article.dataset.colors = `${ refColor}`;
    const divImg = document.createElement("div");
    divImg.classList.add("cart__item__img");
    const image = document.createElement("img");
    const divDescription = document.createElement("div");
    divDescription.classList.add("cart__item__content");
    const divContentDes = document.createElement("div");
    divContentDes.classList.add("cart__item__content__description");
    const h2Description = document.createElement("h2");
    const pColor = document.createElement("p");
    pColor.textContent =`${refColor}`;
    const p = document.createElement("p");
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

    
    // Donnée de l'API  Kanap Sinopé avec Id et ses options couleurs
    if (newId == array[0]._id){
    
       image.src = array[0].imageUrl;
       image.alt =array[0].altTxt;
       h2Description.textContent = array[0].name;
       p.innerText = array[0].price +"€";
       
        if(refColor == array[0].colors[0]){
          let price0 = array[0].price * produit.quantité;
          dataPrice[0]=price0;
        }
        else if(refColor == array[0].colors[1] ){
          let price1 = array[0].price * produit.quantité;
          dataPrice[1]=price1;
        }
        else if(refColor == array[0].colors[2] ){
          let price2 = array[0].price * produit.quantité;
          dataPrice[2]=price2;
        } 
    }
    
    // Donnée de l'API Kanap Cyllène avec Id et ses options couleurs
    else if (newId == array[1]._id){
        //  if(refColor == array[1].colors[0] || refColor == array[1].colors[1])
           image.src = array[1].imageUrl;
           image.alt =array[1].altTxt;
           h2Description.textContent = array[1].name;
           p.innerText = array[1].price +"€";
           
           
            if(refColor == array[1].colors[0]){
              let price3 = array[1].price * produit.quantité;
              dataPrice[3]=price3;
            }
            else if(refColor == array[1].colors[1] ){
              let price2 = array[1].price * produit.quantité;
              dataPrice[4]=price2;
            } 
       }
    
    // Donnée de l'API Kanap Calycé avec Id et ses options couleurs   
    else if ( newId == array[2]._id){
        
               image.src = array[2].imageUrl;
               image.alt =array[2].altTxt;
               h2Description.textContent = array[2].name;
               p.innerText = array[2].price +"€";

              if(refColor == array[2].colors[0]){
                let price5 = array[2].price * produit.quantité;
                dataPrice[5]=price5;
              }
              else if(refColor == array[2].colors[1] ){
                let price6 = array[2].price * produit.quantité;
                dataPrice[6]=price6;
              }
              else if(refColor == array[2].colors[2] ){
                let price7 = array[2].price * produit.quantité;
                dataPrice[7]=price7;
              }
 
           }
    
    
    // Donnée de l'API Kanap Autonoé avec Id option couleurs        
    else if ( newId == array[3]._id){
           
               image.src = array[3].imageUrl;
               image.alt =array[3].altTxt;
               h2Description.textContent = array[3].name;
               p.innerText = array[3].price +"€";

              if(refColor == array[3].colors[0]){
                let price8 = array[3].price * produit.quantité;
                dataPrice[8]=price8;
              }
              else if(refColor == array[3].colors[1] ){
                let price9 = array[3].price * produit.quantité;
                dataPrice[9]=price9;
              }
              
           }
    
    
    // Donnée de l'API Kanap Eurydomé avec Id et ses options couleurs
    else if ( newId == array[4]._id){
      
           image.src = array[4].imageUrl;
           image.alt =array[4].altTxt;
           h2Description.textContent = array[4].name;
           p.innerText = array[4].price +"€";

          if(refColor == array[4].colors[0]){
            let price10 = array[4].price * produit.quantité;
            dataPrice[10]=price10;
          }
          else if(refColor == array[4].colors[1] ){
            let price11 = array[4].price * produit.quantité;
            dataPrice[11]=price11;
          }
          else if(refColor == array[4].colors[2] ){
            let price12 = array[4].price * produit.quantité;
            dataPrice[12]=price12;
          }
           
       }
    
    // Donnée de l'API Kanap Helicé avec Id et ses options couleurs
    else if ( newId == array[5]._id){
    
           image.src = array[5].imageUrl;
           image.alt =array[5].altTxt;
           h2Description.textContent = array[5].name;
           p.innerText = array[5].price +"€";

          if(refColor == array[5].colors[0]){
            let price13 = array[5].price * produit.quantité;
            dataPrice[13]=price13;
          }
          else if(refColor == array[5].colors[1] ){
            let price14 = array[5].price * produit.quantité;
            dataPrice[14]=price14;
          }
         
       }
    
    
    // Donnée de l'API Kanap Thyoné avec Id et ses options couleurs
    else if ( newId == array[6]._id){
   
           image.src = array[6].imageUrl;
           image.alt =array[6].altTxt;
           h2Description.textContent = array[6].name;
           p.innerText = array[6].price +"€";  

          if(refColor == array[6].colors[0]){
            let price15 = array[6].price * produit.quantité;
            dataPrice[15]=price15;
          }
          else if(refColor == array[6].colors[1] ){
            let price16 = array[6].price * produit.quantité;
            dataPrice[16]=price16;
          }
 
       }
    
    
    // Donnée de l'API Kanap Orthosie avec Id et ses options couleurs
    else if ( newId == array[7]._id){

           image.src = array[7].imageUrl;
           image.alt =array[7].altTxt;
           h2Description.textContent = array[7].name;
           p.innerText = array[7].price +"€";

           
          if(refColor == array[7].colors[0]){
            let price17 = array[7].price * produit.quantité;
            dataPrice[17]=price17;
          }
          else if(refColor == array[7].colors[1] ){
            let price18 = array[7].price * produit.quantité;
            dataPrice[18]=price18;
          }
          else if(refColor == array[7].colors[2] ){
            let price19 = array[7].price * produit.quantité;
            dataPrice[19]=price19;
          }
          else if(refColor == array[7].colors[3] ){
            let price20 = array[7].price * produit.quantité;
            dataPrice[20]=price20;
          }
          
       }
 

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
          }
           btn.remove();

        })
      })
    
/************************************************************************************/ 

/********************* CAlCULE PREMIER PANIER APRES CHOIX PAGE PRODUIT ***************/
   
// Calcule du Prix 
      
const spanPrice = document.querySelector("#totalPrice");
const total = dataPrice.reduce((total,price)=>total+price,0)
spanPrice.innerHTML = total;

// Calcule de la Quantité
let artQuantité =0;
for(const artQT of Panier){
  artQuantité += artQT.quantité;
   const spanQuantite = document.querySelector("#totalQuantity");
spanQuantite.innerHTML = artQuantité;
}

/********************************************************************************* */


/************************** CHANGEMENT QUANTITE ET CALCULE DU SECOND PANIER*******************/

   
 const changeQT = document.querySelectorAll(".itemQuantity");
 changeQT.forEach(changeArticle =>{
 changeArticle.addEventListener("change",()=> {
      const produitData = Panier.find((article)=> article.key == key)
      if(produitData.key == article.dataset.id && produitData.color == article.dataset.colors){
       produitData.quantité = Number(inputQuantity.value);
       localStorage.setItem(key,JSON.stringify(produitData))
       
       //Sanopé
        if(newId == array[0]._id && refColor == array[0].colors[0]){
          let price0 = array[0].price * produitData.quantité;
          dataPrice[0]=price0;
        }
        else if(newId == array[0]._id && refColor == array[0].colors[1] ){
         let price1 = array[0].price * produitData.quantité;
          dataPrice[1]=price1;
        }
        else if(newId == array[0]._id && refColor == array[0].colors[2] ){
         let price2 = array[0].price * produitData.quantité;
          dataPrice[2]=price2;
        } 

        //Cyllène
        if(newId == array[1]._id && refColor == array[1].colors[0]){
          let price3 = array[1].price *produitData.quantité;
          dataPrice[3]=price3;
        }
        else if(newId == array[1]._id && refColor == array[1].colors[1] ){
          let price4 = array[1].price * produitData.quantité;
          dataPrice[4]= price4;
        }

        //Calycé
        if(newId == array[2]._id && refColor == array[2].colors[0]){
          let price5 = array[2].price * produitData.quantité;
          dataPrice[5]=price5;
        }
        else if(newId == array[2]._id && refColor == array[2].colors[1] ){
          let price6 = array[2].price * produitData.quantité;
          dataPrice[6]=price6;
        }
        else if(newId == array[2]._id && refColor == array[2].colors[2] ){
          let price7 = array[2].price * produitData.quantité;
          dataPrice[7]=price7;
        }


        //Autonoé
        if(newId == array[3]._id && refColor == array[3].colors[0]){
          let price8 = array[3].price *produitData.quantité;
          dataPrice[8]=price8;
        }
        else if(newId == array[3]._id && refColor == array[3].colors[1] ){
          let price9 = array[3].price * produitData.quantité;
          dataPrice[9]=price9;
        }


        //Eurydomé
        if(newId == array[4]._id && refColor == array[4].colors[0]){
          let price10 = array[4].price * produitData.quantité;
          dataPrice[10]=price10;
        }
        else if(newId == array[4]._id && refColor == array[4].colors[1] ){
          let price11 = array[4].price * produitData.quantité;
          dataPrice[11]=price11;
        }
        else if(newId == array[4]._id && refColor == array[4].colors[2] ){
          let price12 = array[4].price * produitData.quantité;
          dataPrice[12]=price12;
        }


        //Hélicé
        if(newId == array[5]._id && refColor == array[5].colors[0]){
          let price13 = array[5].price * produitData.quantité;
          dataPrice[13]=price13;
        }
        else if(newId == array[5]._id && refColor == array[5].colors[1] ){
          let price14 = array[5].price * produitData.quantité;
          dataPrice[14]=price14;
        }


        //Thyoné
        
        if(newId == array[6]._id && refColor == array[6].colors[0]){
          let price15 = array[6].price * produitData.quantité;
          dataPrice[15]=price15;
        }
        else if(newId == array[6]._id && refColor == array[6].colors[1] ){
          let price16 = array[6].price * produitData.quantité;
          dataPrice[16]=price16;
        }


        //Orthosie
        if(newId == array[7]._id && refColor == array[7].colors[0]){
          let price17 = array[7].price * produitData.quantité;
          dataPrice[17]=price17;
        }
        else if(newId == array[7]._id && refColor == array[7].colors[1] ){
          let price18 = array[7].price * produitData.quantité;
          dataPrice[18]=price18;
        }
        else if(newId == array[7]._id && refColor == array[7].colors[2] ){
          let price19 = array[7].price * produitData.quantité;
          dataPrice[19]=price19;
        }
        else if(newId == array[7]._id && refColor == array[7].colors[3] ){
          let price20 = array[7].price * produitData.quantité;
          dataPrice[20]=price20;
        }


// Calcule du Prix 
const spanPrice = document.querySelector("#totalPrice");
const total = dataPrice.reduce((x,y)=> x + y)
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
  
// fin afficherTag()
}

//fin map Panier 
})



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