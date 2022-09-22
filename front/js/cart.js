

// pour afficher la liste total de chaque produit grace à la fonction push dans recaPanier
let dataPanier = [];
// pour afficher le prix total de chaque article ajouté dans le panier
let dataPrice = [];
//tableau secondaire qui permet d'obtenir toutes les données de l'api et du recapPanier afin de faire des condition par index;
let ProduitFinal = [];

/***************************************************************************************************************************** */
recapPanier();
/*Pour chaque élément dans dataPanier, cette boucle va permettre de créer toutes les
balises et données contenue dans la page cart.html en commentaire ligne 51 à 71 */
dataPanier.forEach((produit)=> afficherTag(produit));


function recapPanier(){
    

    //Création d'une variabe pour afficher le nombre d'article dans le panier
    const quantiteProduit = localStorage.length
  

    //création d'une loop pour récupérer les données stocké dans le localStorage
for(let i=0; i<quantiteProduit; i ++){
    const produit = localStorage.getItem(localStorage.key(i));

    /*avec JSON parse au lieu d'avoir la liste de produit dans des string, 
    cela va permetre d'avoir un vrai objet json*/
    const produitObjet = JSON.parse(produit);
    

    // cette fonction va récolté chaque objet contenu dans produitObjet
    dataPanier.push(produitObjet)   
}
}

/******************************************************************************************************************************************* */
/* cette fonction afficherTag(produit) permet de générer le code html fournit en commentaire en affichant chaque produit du panier
qui a été enregistré dans le localStorage, et l'appel API avec fetch va permettre d'authentifier et générer les nom des kanap, leurs images et leurs alt 
ainsi que le prix unitaire en fonction de chaque produit par rapport à leur ID */

function afficherTag(produit) {

 /* création des variables liés aux réferences du produit sauvegardé dans le localStoraga afin de faire les conditions Else if en
fonction de chaque produit en tenant compte de l'id et la couleur */
let refId = produit.addId;

    const section = document.querySelector("#cart__items");

    const article = document.createElement("article");
    article.classList.add("cart__item");
    article.dataset.id = refId;
    article.dataset.colors = produit.color;

    const divImg = document.createElement("div");
    divImg.classList.add("cart__item__img");
    const image = document.createElement("img");

    const divDescription = document.createElement("div");
    divDescription.classList.add("cart__item__content");

    const divContentDes = document.createElement("div");
    divContentDes.classList.add("cart__item__content__description");

    const h2Description = document.createElement("h2");
    
    const pColor = document.createElement("p");
    pColor.textContent = produit.color;

    const p = document.createElement("p");

    const divSettings = document.createElement("div");
    divSettings.classList.add("cart__item__content__settings")

    const divQuantity = document.createElement("div");
    divQuantity.classList.add("cart__item__content__settngs__quantity")

    const pQuantity = document.createElement("p");
    pQuantity.innerText = "Qté : " + produit.quantité + "  ";

    const inputQuantity = document.createElement("input");
    inputQuantity.type = "number";
    inputQuantity.classList.add("itemQuantity");
    inputQuantity.name = "itempQuantity";
    inputQuantity.min = "1";
    inputQuantity.max ="100";
   
    const itemQuantity = document.createElement("value");
    inputQuantity.appendChild(itemQuantity)
    inputQuantity.value = produit.quantité;
    itemQuantity.innerText = produit.quantité;
   
    inputQuantity.addEventListener("change",()=> updateArticlePrice(produit.addId,inputQuantity.value));
    
    const divDelete = document.createElement("div");
    divDelete.classList.add("cart__item__content__setting__delete");

    const pDelete = document.createElement("p");
    pDelete.classList.add("deleteItem");
    pDelete.innerText = "Supprimer";


// donation des parents pour chaque élément créé
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
   


    let routeId = article.dataset.id; 
    

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
        if(refColor == array[0].colors[0]){
          dataPrice[0]=price0;
        }
        else  if(refColor == array[0].colors[1]){
          dataPrice[1]=price0;
        }
        else  if(refColor == array[0].colors[2]){
          dataPrice[2]=price0;
        }
      
        // création d'un objet secondaire pour géré la function updateArticlePrice() 
        let priceUnique0 = array[0].price;
        let prixFinal = {

          addId : refId,
          quantité : produit.quantité,
          color : produit.color,
          _id   : newId,
          nom : h2Description.textContent,
          prixUnique : priceUnique0,
          prixTotal : price0 ,
          value : Number(itemQuantity.innerText)

        }
            if(routeId == produit.addId){
               ProduitFinal.push(prixFinal);
            }
       
        articleAndPrice()
      
    }

    // Donnée de l'API Kanap Cyllène avec Id et ses options couleurs
    else if ( newId == array[1]._id){
        if(refColor == array[1].colors[0] || refColor == array[1].colors[1])
            image.src = array[1].imageUrl;
            image.alt =array[1].altTxt;
            h2Description.textContent = array[1].name;
            p.innerText = array[1].price +"€";
            let price1 = array[1].price * produit.quantité;
            if(refColor == array[1].colors[0] ){
              dataPrice[3]=price1;
            }
            else if(refColor == array[1].colors[1] ){
              dataPrice[4]=price1;
            }
            
            
            // création d'un objet secondaire pour géré la function updateArticlePrice() 
            let priceUnique1 = array[1].price;
            let prixFinal = {

              addId : refId,
              quantité : produit.quantité,
              color : produit.color,
              _id   : newId,
              nom : h2Description.textContent,
              prixUnique : priceUnique1,
              prixTotal : price1 ,
              value : Number(itemQuantity.innerText)

             }

        if(routeId == produit.addId){
          ProduitFinal.push(prixFinal);
       }
           articleAndPrice()
        }

    // Donnée de l'API Kanap Calycé avec Id et ses options couleurs   
    else if ( newId == array[2]._id){
            if(refColor == array[2].colors[0] || refColor == array[2].colors[1] || refColor == array[2].colors[2])
                image.src = array[2].imageUrl;
                image.alt =array[2].altTxt;
                h2Description.textContent = array[2].name;
                p.innerText = array[2].price +"€";
                let price2 = array[2].price * produit.quantité;
                if(refColor == array[2].colors[0] ){
                   dataPrice[5]=price2;
                }
                else if(refColor == array[2].colors[1] ){
                  dataPrice[6]=price2;
                }
               else if(refColor == array[2].colors[2] ){
                dataPrice[7]=price2;
                }
                
                   // création d'un objet secondaire pour géré la function updateArticlePrice() 
                  let priceUnique2 = array[2].price;
                   let prixFinal = {

                     addId : refId,
                     quantité : produit.quantité,
                     color : produit.color,
                     _id   : newId,
                     nom : h2Description.textContent,
                     prixUnique : priceUnique2,
                     prixTotal : price2 ,
                     value : Number(itemQuantity.innerText)

                     }

                     if(routeId == produit.addId){
                      ProduitFinal.push(prixFinal);
                   }

                articleAndPrice()
            }


    // Donnée de l'API Kanap Autonoé avec Id option couleurs        
    else if ( newId == array[3]._id){
            if(refColor == array[3].colors[0] || refColor == array[3].colors[1])
                image.src = array[3].imageUrl;
                image.alt =array[3].altTxt;
                h2Description.textContent = array[3].name;
                p.innerText = array[3].price +"€";
                let price3 = array[3].price * produit.quantité;
                if(refColor == array[3].colors[0]){
                  dataPrice[8]= price3;
                }
                else if(refColor == array[3].colors[1]){
                  dataPrice[9]= price3;
                }
                
              
                 // création d'un objet secondaire pour géré la function updateArticlePrice()
                 let priceUnique3 = array[3].price; 
                 let prixFinal = {

                  addId : refId,
                  quantité : produit.quantité,
                  color : produit.color,
                  _id   : newId,
                  nom : h2Description.textContent,
                  prixUnique : priceUnique3,
                  prixTotal : price3 ,
                  value : Number(itemQuantity.innerText)
                  
                  }
                  if(routeId == produit.addId){
                    ProduitFinal.push(prixFinal);
                 } 
                articleAndPrice()
            }


    // Donnée de l'API Kanap Eurydomé avec Id et ses options couleurs
    else if ( newId == array[4]._id){
        if(refColor == array[4].colors[0] || refColor == array[4].colors[1] || refColor == array[4].colors[2])
            image.src = array[4].imageUrl;
            image.alt =array[4].altTxt;
            h2Description.textContent = array[4].name;
            p.innerText = array[4].price +"€";
            let price4 = array[4].price * produit.quantité;
            if(refColor == array[4].colors[0]){
              dataPrice[10]=price4;
            }
            else if(refColor == array[4].colors[1]){
              dataPrice[11]=price4;
            }
            else if(refColor == array[4].colors[2]){
              dataPrice[12]=price4;
            }
            
             // création d'un objet secondaire pour géré la function updateArticlePrice() 
             let priceUnique4 = array[4].price;
             let prixFinal = {

              addId : refId,
              quantité : produit.quantité,
              color : produit.color,
              _id   : newId,
              nom : h2Description.textContent,
              prixUnique : priceUnique4,
              prixTotal : price4 ,
              value : Number(itemQuantity.innerText)
              
              }
           
            if(routeId == produit.addId){
              ProduitFinal.push(prixFinal);
            }

            articleAndPrice()
        }

    // Donnée de l'API Kanap Helicé avec Id et ses options couleurs
    else if ( newId == array[5]._id){
        if(refColor == array[5].colors[0] || refColor == array[5].colors[1])
            image.src = array[5].imageUrl;
            image.alt =array[5].altTxt;
            h2Description.textContent = array[5].name;
            p.innerText = array[5].price +"€";
            let price5 = array[5].price * produit.quantité;
            if(refColor == array[5].colors[0]){
              dataPrice[13]=price5;
            }
            else if(refColor == array[5].colors[1]){
              dataPrice[14]=price5;
            }
           
          // création d'un objet secondaire pour géré la function updateArticlePrice() 
             let priceUnique5 = array[5].price;
             let prixFinal = {

              addId : refId,
              quantité : produit.quantité,
              color : produit.color,
              _id   : newId,
              nom : h2Description.textContent,
              prixUnique : priceUnique5,
              prixTotal : price5 ,
              value : Number(itemQuantity.innerText)
              
              }
           
            if(routeId == produit.addId){
              ProduitFinal.push(prixFinal);
           }

            articleAndPrice()
        }
 

    // Donnée de l'API Kanap Thyoné avec Id et ses options couleurs
    else if ( newId == array[6]._id){
        if(refColor == array[6].colors[0] || refColor == array[6].colors[1])
            image.src = array[6].imageUrl;
            image.alt =array[6].altTxt;
            h2Description.textContent = array[6].name;
            p.innerText = array[6].price +"€";  
            let price6 = array[6].price * produit.quantité;
            if(refColor == array[6].colors[0]){
              dataPrice[15]=price6;
            }
           else if(refColor == array[6].colors[1]){
              dataPrice[16]=price6;
            }
            
            // création d'un objet secondaire pour géré la function updateArticlePrice() 
             let priceUnique6 = array[6].price;
             let prixFinal = {

              addId : refId,
              quantité : produit.quantité,
              color : produit.color,
              _id   : newId,
              nom : h2Description.textContent,
              prixUnique : priceUnique6,
              prixTotal : price6,
              value : Number(itemQuantity.innerText)
              
              }
           
            if(routeId == produit.addId){
              ProduitFinal.push(prixFinal);
           }

            articleAndPrice()
        }
  

    // Donnée de l'API Kanap Orthosie avec Id et ses options couleurs
    else if ( newId == array[7]._id){
    if(refColor == array[7].colors[0] || refColor == array[7].colors[1] || refColor == array[7].colors[2] || refColor == array[7].colors[3])
            image.src = array[7].imageUrl;
            image.alt =array[7].altTxt;
            h2Description.textContent = array[7].name;
            p.innerText = array[7].price +"€";
            let price7 = array[7].price * produit.quantité;
            if(refColor == array[7].colors[0]){
              dataPrice[17]=price7;
            }
            else if(refColor == array[7].colors[1]){
              dataPrice[18]=price7;
            }
            else if(refColor == array[7].colors[2]){
              dataPrice[19]=price7;
            }
            else if(refColor == array[7].colors[3]){
              dataPrice[20]=price7;
            }

            // création d'un objet secondaire pour géré la function updateArticlePrice() 
            let priceUnique7 = array[7].price;
            let prixFinal = {

              addId : refId,
              quantité : produit.quantité,
              color : produit.color,
              _id   : newId,
              nom : h2Description.textContent,
              prixUnique : priceUnique7,
              prixTotal : price7 ,
              value : Number(itemQuantity.innerText)
              
              }
           
            if(routeId == produit.addId){
              ProduitFinal.push(prixFinal);
           }

            articleAndPrice()
        }

      // Cette fonction permet de calculer le nombre d'article dans le panier et calculer le premier prix total du panier
       function articleAndPrice(){
        const spanQuantite = document.querySelector("#totalQuantity");
        const total0 = dataPanier.reduce((total,produit)=> total + produit.quantité,0);
        spanQuantite.innerHTML = total0;
    
        const spanPrice = document.querySelector("#totalPrice");
        let total1 = dataPrice.reduce((total,price)=> total + price,0)
        spanPrice.innerHTML = total1;  
       }
}

/*********************************************************************************************************************************/
// Cette fonction s'active avec l'eventListener lorsque le client change la quantité d'un article dans l'input
// la fonction génère un nouveau nombre total d'article et un nouveau prix total en fonction de ce qui se trouve dans le localStorage.
function updateArticlePrice (addId,value){

   const produitData = dataPanier.find((article)=> article.addId == addId);
   produitData.quantité = Number(value); 
   localStorage.setItem(addId,JSON.stringify(produitData))
 

fetch(`http://localhost:3000/api/products/`)
.then ((res)=> {return res.json()})

.then ((kanap)=> {
   data(kanap)})

  function data(array){

    let refColor = produitData.color;

  if ( routeId == produitData.addId){

            //Kanap Sinopé
             for(let info of ProduitFinal){
              if(info._id ==  array[0]._id){
                 if(refColor == info.color){
                if(info.color == array[0].colors[0]){
                  let quantité2 = info.prixUnique* produitData.quantité;
                  dataPrice[0]=quantité2;
                }
                else if(info.color == array[0].colors[1]){
                  let quantité2 =  info.prixUnique * produitData.quantité;
                  dataPrice[1]=quantité2;              
                }
                else if(info.color == array[0].colors[2]){
                  let quantité2 =  info.prixUnique * produitData.quantité;
                  dataPrice[2]=quantité2;                  
                }
                 
                 } 
              }

              //Kanap Cyllène
              if(info._id ==  array[1]._id){
                if(refColor == info.color){
               if(info.color == array[1].colors[0]){
                let quantité2 =  info.prixUnique * produitData.quantité;
                dataPrice[3]=quantité2;
                  
               }
               else if(info.color == array[1].colors[1]){
                let quantité2 =  info.prixUnique * produitData.quantité;
                dataPrice[4]=quantité2;    
                              
               }
               } 
             }

              //Kanap Calycé
              if(info._id ==  array[2]._id){
                if(refColor == info.color){
               if(info.color == array[2].colors[0]){
                let quantité2 =  info.prixUnique * produitData.quantité;
                dataPrice[5]=quantité2;
                  
               }
               else if(info.color == array[2].colors[1]){
                let quantité2 =  info.prixUnique * produitData.quantité;
                dataPrice[6]=quantité2;    
                              
               }
               else if(info.color == array[2].colors[2]){
                let quantité2 =  info.prixUnique * produitData.quantité;
                dataPrice[7]=quantité2;    
                              
               }
               } 
             }

             //Kanap Autonoé
             if(info._id ==  array[3]._id){
              if(refColor == info.color){
             if(info.color == array[3].colors[0]){
              let quantité2 =  info.prixUnique * produitData.quantité;
              dataPrice[8]=quantité2;
                
             }
             else if(info.color == array[2].colors[1]){
              let quantité2 =  info.prixUnique * produitData.quantité;
              dataPrice[9]=quantité2;    
                            
             }
             } 
           }

           //Kanap Eurydomé
           if(info._id ==  array[4]._id){
            if(refColor == info.color){
           if(info.color == array[4].colors[0]){
            let quantité2 =  info.prixUnique * produitData.quantité;
            dataPrice[10]=quantité2;  
           }
           else if(info.color == array[4].colors[1]){
            let quantité2 =  info.prixUnique * produitData.quantité;
            dataPrice[11]=quantité2;    
                          
           }
           else if(info.color == array[4].colors[2]){
            let quantité2 =  info.prixUnique * produitData.quantité;
            dataPrice[12]=quantité2;    
                          
           }
           } 
         }

         //Kanap Hélicé
         if(info._id ==  array[5]._id){
          if(refColor == info.color){
         if(info.color == array[5].colors[0]){
          let quantité2 =  info.prixUnique * produitData.quantité;
          dataPrice[13]=quantité2;
            
         }
         else if(info.color == array[5].colors[1]){
          let quantité2 =  info.prixUnique * produitData.quantité;
          dataPrice[14]=quantité2;    
                        
         }
         } 
       }

       //Kanap Thyoné
       if(info._id ==  array[6]._id){
        if(refColor == info.color){
       if(info.color == array[6].colors[0]){
        let quantité2 =  info.prixUnique * produitData.quantité;
        dataPrice[15]=quantité2;  
       }
       else if(info.color == array[6].colors[1]){
        let quantité2 =  info.prixUnique * produitData.quantité;
        dataPrice[16]=quantité2;                 
       }
       } 
     }

      //Kanap Orthosie
      if(info._id ==  array[7]._id){
        if(refColor == info.color){
       if(info.color == array[7].colors[0]){
        let quantité2 =  info.prixUnique * produitData.quantité;
        dataPrice[17]=quantité2; 
       }
       else if(info.color == array[7].colors[1]){
        let quantité2 =  info.prixUnique * produitData.quantité;
        dataPrice[18]=quantité2;                
       }
       else if(info.color == array[7].colors[2]){
        let quantité2 =  info.prixUnique * produitData.quantité;
        dataPrice[19]=quantité2;                 
       }
       else if(info.color == array[7].colors[3]){
        let quantité2 =  info.prixUnique * produitData.quantité;
        dataPrice[20]=quantité2;                 
       }
       } 
     }
              
    }
              
}

   
 // Calcule de la quantité d'article présent dans le panier en fonction du choix de l'utilisateur  
const spanQuantite = document.querySelector("#totalQuantity");
const total0 = dataPanier.reduce((total,nombre)=> total + nombre.quantité,0);
spanQuantite.innerHTML = total0; 

// Calcule du Nouveau prix Final en fonction de l'ajout ou la réduction d'un article du panier
for ( let PHT of ProduitFinal){
  if(routeId == PHT.addId){
    if(PHT.color == refColor){
    for (let i =0; i<dataPrice.length; i++){
      let totalFinal =0;
      let spanPrice = document.querySelector("#totalPrice");
      totalFinal = dataPrice.reduce((x,y)=> x + y)
      spanPrice.innerHTML = totalFinal; 
      
    }
    }
  }
}

}

}



 }





