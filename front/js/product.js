
/*Utilisation de window location search pour obtenir l'url appartir de ?id et suppresion des
3 première caractère avec slice pour avoir uniquement le numéro de l'id pour faire des appel API avec 
fletch sur la page produit*/ 

const queryString = window.location.search;
console.log(queryString);
let id = queryString.slice(3);
console.log(id);



/*Utlisation de l'interpolation de chaine avec la fonction fletch afin
d'ajouter la variable de l'id obtenu grace à URLSearchParams()*/

fetch(`http://localhost:3000/api/products/${id}`)

.then (
    (response) => {
        return response.json();
    }
)
.then(
    (res) => {
        // console.log("les Kanap",res)
    return pageProduit(res);
    } 
)


   function pageProduit(array){

    function Array(_id,name,colors,description,imageUrl,altTxt,price) {
        this._id = _id,
        this.name = name,
        this.colors = colors,
        this.description = description,
        this.imageUrl = imageUrl,
        this.altTxt = altTxt,
        this.price = price
    }

    const product = new Array (array._id,array.name,array.colors,array.description,array.imageUrl,array.altTxt,array.price);

    id = product._id;

    
    // sélection direct de l'id pour donné un parent à image pour apparaitre dans le Dom
    const itemImg = document.querySelector(".item__img");
    
    // variable pour créer une image et intégré l'url et alt      
    const image = document.createElement("img");
    itemImg.appendChild(image);
    image.src = product.imageUrl;
    image.alt = product.altTxt;

    // //Variable pour afficher le nom du produit
    // let name = product.name;

    //sélection direct de l'id Title pour lier le nom du produit aux données du tableau
    const nameProduit = document.querySelector("#title");
    nameProduit.textContent = product.name;

    //variable pour le prix
    let prixKanap = product.price;

    /*séléction direct de l'id prix pour le lier au donné 
    pour le prix du produit*/
    const prixProduit = document.querySelector("#price");
    prixProduit.textContent = prixKanap;
    
   
    // variable pour intégrer le texte descriptif
    let description = product.description;

    /*séléction direct de l'id description pour le lier au donné 
    pour la description du produit*/
    const paraDescription = document.querySelector("#description");
    paraDescription.textContent = description;
            
   
    // variable pour intégrer les couleur avec son document query Selector "select"
    let couleur = product.colors;

    /*séléction direct de l'id colors et création de la balise option 
    pour le lié au donné pour afficher plusieurs choix de couleur*/
    const choixCouleur = document.querySelector("#colors");
        if(choixCouleur != null){
            couleur.forEach((couleur) => {
    const option = document.createElement("option");
    option.value = couleur;
    option.textContent = couleur;
    choixCouleur.appendChild(option);
    }
    )}


  
        /*variable pour écouter les évènement sur le bouton "ajouter au panier"*/
        const bouton = document.querySelector("#addToCart");
            if(bouton != null){
               bouton.addEventListener("click", (e) => {
               const colors = document.querySelector("#colors").value;
               const quantite = document.querySelector("#quantity").value;
            
               
            if(colors == null || colors === "" || quantite == null || 
            quantite == 0 || quantite >= 101){
                alert("SVP choissez une couleur et une quantité max 100, merci.");
                return bouton;
              }
         
            let addId = `${id}`+colors.substring(2);
            let Name = product.name.slice(5)
           
     
     
    // /*création d'un objet pour identfier les donner à stocker dans le 
    // localStorage*/
    
   const dataStorage = {
        addId : addId,
        Name : Name,
        quantité : Number(quantite),
        color : colors,
        
    }
   


    localStorage.setItem(addId,JSON.stringify(dataStorage));
   

    //redirection vers le pannier
    window.location.href = "cart.html";
    

})
    }   
    
}

