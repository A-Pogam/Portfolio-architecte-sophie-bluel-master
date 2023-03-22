const gallery = document.querySelector(".gallery"); // Sélectionne l'élément de la page HTML qui a une classe "gallery" et la stocke dans la variable gallery //
const portfolio = document.getElementById("#portfolio"); // Sélectionne l'élément de la page HTML qui a un identifiant "portfolio" (# en CSS) et la stocke dans la variable portfolio //

/* Affiche les boutons */
function portfolioFiltered(filteredTool) {
    let gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
    for (let key in filteredTool) {
        let figure = document.createElement('figure');
        gallery.appendChild(figure);

        let img = document.createElement('img');
        img.src = filteredTool[key].imageUrl;
        figure.appendChild(img);
        img.crossOrigin = 'anonymous'; // pour éviter les erreurs de sécurité //
        let figcaption = document.createElement('figcaption');
        figcaption.innerHTML = filteredTool[key].title;
        figure.appendChild(figcaption);

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
            throw new Error('Il y a une erreur quant à la réponse de l\'API');
        }
    })
    .then(function (data) {
        btnObject.addEventListener('click', function () {
            let filteredTool = Object.entries(data).reduce((obj, [key, value]) => {
                if (value.category.name === 'Objets') {
                    obj[key] = value;
                }
                return obj;
            }, {});
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
        }
    });

const btnAll = document.querySelector('.btn-filter.green');
const btnAppartment = document.querySelector('.btn-filter.appartment');
const btnHotel = document.querySelector('.btn-filter.hotel');
const btnObject = document.querySelector('.btn-filter.object');

/* Activation des boutons */
const button = [];
button.push(btnAll);
button.push(btnAppartment);
button.push(btnHotel);
button.push(btnObject);

for (const btn of button) {
    btn.addEventListener("click", function () {
        for (const btn of button) {
            btn.style.backgroundColor = "#ffffff";
            btn.style.color = "#1D6154";
        }
        this.style.backgroundColor = "#1D6154";
        this.style.color = "#ffffff";
    });
};