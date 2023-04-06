const gallery = document.querySelector(".gallery");
// Sélectionne l'élément de la page HTML qui a une classe "gallery" et la stocke dans la variable gallery //
const portfolio = document.getElementById("#portfolio");
// Sélectionne l'élément de la page HTML qui a un identifiant "portfolio" (# en CSS) et la stocke dans la variable portfolio //

/* Affiche les boutons et le contenu */
function portfolioFiltered(filteredTool) {
    let gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
    // récupère l'élément HTML qui a la classe gallery et vide son contenu (son HTML interne) en mettant innerHTML à une chaîne vide //
    for (let key in filteredTool) {
        let figure = document.createElement('figure');
        gallery.appendChild(figure);
        //crée un élément HTML figure et l'ajoutent à la galerie, figure est utilisée pour représenter une image avec une légende //

        let img = document.createElement('img');
        img.src = filteredTool[key].imageUrl;
        figure.appendChild(img);
        img.crossOrigin = 'anonymous';
        // crée un élément HTML img avec une source d'image définie par imageUrl de l'objet correspondant à la clé actuelle dans la boucle. Ensuite, l'image est ajoutée à la figure créée précédemment. Eviter les erreurs de sécurité liées aux demandes de ressources externes //
        let figcaption = document.createElement('figcaption');
        figcaption.innerHTML = filteredTool[key].title;
        figure.appendChild(figcaption);
        //crée un élément HTML figcaption pour contenir le titre de l'outil de filtrage. Ensuite, le titre est défini en utilisant la propriété "title" de l'objet correspondant à la clé actuelle dans la boucle. Enfin, la légende est ajoutée à la figure //

    }
};
// afficher les images et les titres associés à un outil spécifique dans la galerie et sélectionne la galerie avec querySelector et met à jour son contenu en vidant son innerHTML //

/* Chercher API */
let response;

fetch("http://localhost:5678/api/works")
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
        else {
            throw new Error('Erreur lors de la récupération des travaux :');
        }
    })
    .then(function (data) {
        btnObject.addEventListener('click', function () {
            //Lorsque le bouton est cliqué, le code ci-dessous est exécuté //
            let filteredTool = Object.entries(data).reduce((obj, [key, value]) => {
                if (value.category.name === 'Objets') {
                    obj[key] = value;
                }
                return obj;
            }, {});
            // crée un nouvel objet filteredTool en utilisant la méthode reduce sur un tableau qui contient les paires clé-valeur de l'objet data. Pour chaque paire, la fonction de rappel de reduce vérifie si la catégorie de l'objet correspondant est "Objets"//
            portfolioFiltered(filteredTool);
        });

        btnAll.addEventListener('click', function () {
            let filteredTool = Object.entries(data).reduce((obj, [key, value]) => {
                obj[key] = value;
                return obj;
            }, {});
            portfolioFiltered(filteredTool);
        });

        btnAppartment.addEventListener('click', function () {
            let filteredTool = Object.entries(data).reduce((obj, [key, value]) => {
                if (value.category.name === 'Appartements') {
                    obj[key] = value;
                }
                return obj;
            }, {});
            portfolioFiltered(filteredTool);
        });

        btnHotel.addEventListener('click', function () {
            let filteredTool = Object.entries(data).reduce((obj, [key, value]) => {
                if (value.category.name === 'Hotels & restaurants') {
                    obj[key] = value;
                }
                return obj;
            }, {});
            portfolioFiltered(filteredTool);
        })
        return data;
    })
    .then(function (works) {
        for (let i = 0; i < works.length; i++) {
            //  "for" est utilisée pour parcourir chaque élément du tableau works. La boucle commence à l'indice 0 (let i = 0) et se poursuit jusqu'à ce que i soit inférieur à la longueur du tableau works (i < works.length) //
            let work = works[i];
            let figure = document.createElement("figure");

            let img = document.createElement("img");
            img.src = work.imageUrl;
            img.crossOrigin = "anonymous";
            figure.appendChild(img);

            let figcaption = document.createElement("figcaption");
            figcaption.innerHTML = work.title;
            figure.appendChild(figcaption);

            gallery.appendChild(figure);
            // Ajoute figure à un élément de la page web qui est identifié par la variable gallery //
        }
    });

const btnAll = document.querySelector('.btn-filter.green');
const btnAppartment = document.querySelector('.btn-filter.appartment');
const btnHotel = document.querySelector('.btn-filter.hotel');
const btnObject = document.querySelector('.btn-filter.object');
// constantes qui contiennent des éléments HTML //

/* Activation des boutons */
const button = [];
button.push(btnAll);
button.push(btnAppartment);
button.push(btnHotel);
button.push(btnObject);
// crée tableau avec tous les boutons nécessaires //

for (const btn of button) {
    btn.addEventListener("click", function () {
        for (const btn of button) {
            btn.style.backgroundColor = "#ffffff";
            btn.style.color = "#1D6154";
        }
        this.style.backgroundColor = "#1D6154";
        this.style.color = "#ffffff";
    });
    //apparence des boutons, à modifier pour être conforme à la maquette
};

