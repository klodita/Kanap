
// pour afficher la liste total de chaque produit grace à la fonction push dans la loop for
let dataPanier = []
let dataPrice = [];

recapPanier();
/*Pour chaque élément dans dataPanier, cette boucle va permettre de créer toutes les
balises et données contenue dans la page cart.html en commentaire ligne 51 à 71 */
dataPanier.forEach((produit)=> afficherTag(produit));


function recapPanier(){
    

    //Création d'une variabe pour afficher le nombre d'article dans le panier
    const quantiteProduit = localStorage.length
   console.log(quantiteProduit);

    //création d'une loop pour récupérer les données stocké dans le localStorage
for(let i=0; i<quantiteProduit; i ++){
    const produit = localStorage.getItem(localStorage.key(i));

    /*avec JSON parse au lieu d'avoir la liste de produit dans des string, 
    cela va permetre d'avoir un vrai objet json*/
    const produitObjet = JSON.parse(produit);
    console.log(produitObjet);

    // cette fonction va récolté chaque objet contenu dans produitObjet
    dataPanier.push(produitObjet)
    
}

}


/* cette fonction afficherTag(produit) permet de générer le code html fournit en commentaire en affichant chaque produit du panier
qui a été enregistré dans le localStorage, et l'appel API avec fetch va permettre d'authentifier et générer les nom des kanap, leurs images et leurs alt 
ainsi que le prix unitaire en fonction de chaque produit par rapport à leur ID */

function afficherTag(produit) {

 /* création des variables liés aux réferences du produit sauvegardé dans le localStoraga afin de faire les conditions Else if en
fonction de chaque produit en tenant compte de l'id et la couleur */
let refId = produit.addId;
let refColor = produit.color;
let newId = refId.slice(0,32); 

    const section = document.querySelector("#cart__items");

    const article = document.createElement("article");
    article.classList = "cart__item";
    article.dataset.id = produit.addId;
    article.dataset.colors = produit.color;

    const divImg = document.createElement("div");
    divImg.classList ="cart__item__img";
    const image = document.createElement("img");


    const divDescription = document.createElement("div");
    divDescription.classList = "cart__item__content";

    const divContentDes = document.createElement("div");
    divContentDes.classList = "cart__item__content__description";

    const h2Description = document.createElement("h2");
    
    const pColor = document.createElement("p");
    pColor.textContent = produit.color;

    const p = document.createElement("p");

    const divSettings = document.createElement("div");
    divSettings.classList = "cart__item__content__settings"

    const divQuantity = document.createElement("div");
    divQuantity.classList ="cart__item__content__settngs__quantity"

    const pQuantity = document.createElement("p");
    pQuantity.innerText = "Qté : " + produit.quantité + "  ";

    const inputQuantity = document.createElement("input");
    inputQuantity.type = "number";
    inputQuantity.classList = "itemQuantity";
    inputQuantity.name = "itempQuantity";
    inputQuantity.min = "1";
    inputQuantity.max ="100";
    inputQuantity.value = produit.quantité;
    inputQuantity.addEventListener("change",()=> updateArticlePrice(produit.addId, inputQuantity.value));
    

    const divDelete = document.createElement("div");
    divDelete.classList = "cart__item__content__setting__delete";

    const pDelete = document.createElement("p");
    pDelete.classList = "deleteItem";
    pDelete.innerText = "Supprimer";


// création des parents pour chaque élément créé
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
    
    divSettings.appendChild(pQuantity);
    divSettings.appendChild(divQuantity);
    divSettings.appendChild(inputQuantity);
    divSettings.appendChild(divDelete);

    divQuantity.appendChild(pQuantity);
    divQuantity.appendChild(inputQuantity);


    divDelete.appendChild(pDelete);
   
    

    totalArticlePrice()
   





fetch(`http://localhost:3000/api/products/${newId}`)
.then ((res)=> {return res.json()})

.then ((kanap)=> {
    data(kanap)
})

function data(array) {

        let id = array._id;   
        image.src = array.imageUrl;
        image.alt =array.altTxt;
        h2Description.textContent = array.name;
        p.innerText = array.price +"€";
        let price = array.price * inputQuantity.value;
        dataPrice.push(price);
        totalArticlePrice()
        


}



function updateArticlePrice (addId,value){
    let refId = produit.addId;
    let refColor = produit.color;
    let newId = refId.slice(0,32); 

    const produitData = dataPanier.find((produit)=> produit.addId == addId);
    if(article.dataset.id == refId && article.dataset.colors == refColor){
       produitData.quantité = Number(value); 
         localStorage.setItem(addId,JSON.stringify(produitData))
 
    }
//    totalArticlePrice()
    
  
 
 

    fetch(`http://localhost:3000/api/products/${newId}`)
.then ((res)=> {return res.json()})

.then ((kanap)=> {
   data(kanap)})

 function data(kanap){


    let price = kanap.price;
    dataPrice.push(price)
    
    totalArticlePrice()

    return price * produitData
 }


} 



// Function qui va permettre de calculer le total d'article et le prix dans le panier
function totalArticlePrice(){

    const spanQuantite = document.querySelector("#totalQuantity");
    const total0 = dataPanier.reduce((total,produit)=> total + produit.quantité,0);
    spanQuantite.innerHTML = total0;

    const spanPrice = document.querySelector("#totalPrice");
    const total1 = dataPrice.reduce((total,price)=> total + price,0)
    spanPrice.innerHTML = total1; 


    
}



   }  








