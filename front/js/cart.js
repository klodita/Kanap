

// pour afficher la liste total de chaque produit grace à la fonction push dans la loop for
let dataPanier = []
let dataPrice = [];
let dataPrice1 = [];

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
    totalArticle()
    totalPrice()
    
    
  
    

fetch('http://localhost:3000/api/products/')
.then ((res)=> {return res.json()})

.then ((kanap)=> {
    data(kanap)
})

function data(array) {
    
   
/* création des variables liés aux réferences du produit sauvegardé dans le localStoraga afin de faire les conditions Else if en
fonction de chaque produit en tenant compte de l'id et la couleur */
     let refId = produit.addId;
     let refColor = produit.color;
     let newId = refId.slice(0,32);
  

   // Donnée de l'API  Kanap Sinopé avec Id et ses options couleurs
   if ( newId == array[0]._id){
    if(refColor == array[0].colors[0] || refColor == array[0].colors[1] || refColor == array[0].colors[2])
        image.src = array[0].imageUrl;
        image.alt =array[0].altTxt;
        h2Description.textContent = array[0].name;
        p.innerText = array[0].price +"€";
        let price0 = array[0].price * produit.quantité;
        dataPrice.push(price0);
        totalPrice()
        totalArticle();
    }

    // Donnée de l'API Kanap Cyllène avec Id et ses options couleurs
    else if ( newId == array[1]._id){
        if(refColor == array[1].colors[0] || refColor == array[1].colors[1])
            image.src = array[1].imageUrl;
            image.alt =array[1].altTxt;
            h2Description.textContent = array[1].name;
            p.innerText = array[1].price +"€";
            let price1 = array[1].price * produit.quantité;
            dataPrice.push(price1);
            totalPrice()
            totalArticle();
        }

    // Donnée de l'API Kanap Calycé avec Id et ses options couleurs   
    else if ( newId == array[2]._id){
            if(refColor == array[2].colors[0] || refColor == array[2].colors[1] || refColor == array[2].colors[2])
                image.src = array[2].imageUrl;
                image.alt =array[2].altTxt;
                h2Description.textContent = array[2].name;
                p.innerText = array[2].price +"€";
                let price2 = array[2].price * produit.quantité;
                dataPrice.push(price2);
                totalPrice()
                totalArticle();
            }


    // Donnée de l'API Kanap Autonoé avec Id option couleurs        
    else if ( newId == array[3]._id){
            if(refColor == array[3].colors[0] || refColor == array[3].colors[1])
                image.src = array[3].imageUrl;
                image.alt =array[3].altTxt;
                h2Description.textContent = array[3].name;
                p.innerText = array[3].price +"€";
                let price3 = array[3].price * produit.quantité;
                dataPrice.push(price3);
                totalPrice()
                totalArticle();
            }


    // Donnée de l'API Kanap Eurydomé avec Id et ses options couleurs
    else if ( newId == array[4]._id){
        if(refColor == array[4].colors[0] || refColor == array[4].colors[1] || refColor == array[4].colors[2])
            image.src = array[4].imageUrl;
            image.alt =array[4].altTxt;
            h2Description.textContent = array[4].name;
            p.innerText = array[4].price +"€";
            let price4 = array[4].price * produit.quantité;
            dataPrice.push(price4);
            totalPrice()
            totalArticle();
        }

    // Donnée de l'API Kanap Helicé avec Id et ses options couleurs
    else if ( newId == array[5]._id){
        if(refColor == array[5].colors[0] || refColor == array[5].colors[1] || refColor == array[5].colors[2])
            image.src = array[5].imageUrl;
            image.alt =array[5].altTxt;
            h2Description.textContent = array[5].name;
            p.innerText = array[5].price +"€";
            let price5 = array[5].price * produit.quantité;
            dataPrice.push(price5);
            totalPrice()
            totalArticle();
        }
 

    // Donnée de l'API Kanap Thyoné avec Id et ses options couleurs
    else if ( newId == array[6]._id){
        if(refColor == array[6].colors[0] || refColor == array[6].colors[1] || refColor == array[6].colors[2])
            image.src = array[6].imageUrl;
            image.alt =array[6].altTxt;
            h2Description.textContent = array[6].name;
            p.innerText = array[6].price +"€";  
            let price6 = array[6].price * produit.quantité;
            dataPrice.push(price6);
            totalPrice()
            totalArticle();
        }
  

    // Donnée de l'API Kanap Orthosie avec Id et ses options couleurs
    else if ( newId == array[7]._id){
        if(refColor == array[7].colors[0] || refColor == array[7].colors[1] || refColor == array[7].colors[2] || refColor == array[7].colors[3])
            image.src = array[7].imageUrl;
            image.alt =array[7].altTxt;
            h2Description.textContent = array[7].name;
            p.innerText = array[7].price +"€";
            let price7 = array[7].price * produit.quantité;
            dataPrice.push(price7);
            totalPrice()
            totalArticle();
        }

       
totalPrice()
    
}



}



// Function qui va permettre de calculer le total d'article dans le panier
function totalArticle(){

    const spanQuantite = document.querySelector("#totalQuantity");
    const total = dataPanier.reduce((total,produit)=> total + produit.quantité,0);
    spanQuantite.innerHTML = total;
    
}


function totalPrice(){

    const spanPrice = document.querySelector("#totalPrice");
    const total = dataPrice.reduce((total,price)=> total + price,0)
    spanPrice.innerHTML = total; 

    console.log("le prix du panier :", total)
 
}

function updateArticlePrice (addId,newValue){
   

    const produitData = dataPanier.find((produit)=> produit.addId == addId);
    produitData.quantité = Number(newValue);  
    localStorage.setItem(addId,JSON.stringify(produitData))

    let refId = produitData.addId;
    let refColor = produitData.color;
    let newId = refId.slice(0,32);

 
    const spanPrice = document.querySelector("#totalPrice");
    const total = dataPrice.reduce((total,price)=> total + price,0)
    console.log("find data price", total)
    spanPrice.innerHTML = total; 
    window.location.reload(true);

 
   totalArticle()
 
}









