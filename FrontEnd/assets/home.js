const gallery = document.querySelector(".gallery");
// Sélectionne l'élément de la page HTML qui a une classe "gallery" et la stocke dans la variable gallery //
const portfolio = document.getElementById("#portfolio");
// Sélectionne l'élément de la page HTML qui a un identifiant "portfolio" (# en CSS) et la stocke dans la variable portfolio //

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

const token = localStorage.getItem('token');

// remplacer login par logout si connecté et recharger page quand déconnecté
const loginLink = document.querySelector('.login a');

const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

// faire apparaître modifier seulement si connecté
const editButtons = document.querySelectorAll('.edit1, .edit2, .modal-btn modal-trigger, .banner, .modal');

const modalContent = document.querySelector(".modal"); //pour afficher de nouveau les travaux via fetch mais dans la modale

const addPhotoButton = document.querySelector('#dialogDesc');

/* Cherche API */
let response;

// ************************ FUNCTION !!!!!! ****************************


/* Affiche le contenu */
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


function toggleModal() {
    modalContainer.classList.toggle("active");
}


function openAddPhotoModal() {
    const modalTitle = document.querySelector('#modalTitle');
    modalTitle.textContent = 'Ajout photo';
    modalContainer.querySelector('.gallery').style.display = "none";
    modalContainer.querySelector('hr').style.display = "none";

    const dialogDesc = document.querySelector('#dialogDesc');
    dialogDesc.innerHTML = `
      <div class="modal-container-2">
          <div class="icons">
              <button class="previous"><i class="fa fa-arrow-left"></i></button>
          </div>
  
          <div class="container">
              <div class="wrapper" id="preview-container">
                  <div class="content-file-upload">
                  <div class="icon"><i class="fa-regular fa-image fa-6x"></i></div>
                  <input id="file-upload" type="file" name="photo"></input>
                  <label for="file-upload" class="custom-file-upload">+ Ajouter photo</label>
                  <p class="jpg">jpg, png : 4 mo max</p>
              </div>
  
              <form id="form-file">
                      <label id="title" for="photoTitle">Titre</label>
                      <input type="text" id="photoTitle" name="photoTitle">
                      <label id="categories" for="categories">Catégorie</label>
                          <select id="select">
                              <option></option>
                              <option value="Objets">Objets</option>
                              <option value="Appartement">Appartements</option>
                              <option value="Hôtels & restaurants">Hôtels & restaurants</option>
                          </select>
              </form>
              
              <div class="foot">
                  <hr>
                  <ul id="dialogDesc2">
                  <li>
                    <button id="valider">Valider</button>
                    <p id="errorMsgForm"></p>
                  </li>
                </ul>
                
              </div>           
          </div>
      </div>
    `;

    function checkFields() {
        const photoTitle = document.getElementById('photoTitle').value;
        const photoCategory = document.getElementById('select').value;
        const selectedFile = document.getElementById('file-upload').files[0];

        if (!photoTitle || !photoCategory || !selectedFile) {
            return false;
        }
        return true;
    }

    async function uploadPhoto(photoData) {
        const myToken = localStorage.getItem('accessToken');
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${myToken}`,
            },
            body: photoData,
        });
        const responseData = await response.json();
        return responseData;
    }

    document.getElementById('valider').addEventListener('click', function () {
        let isValid = checkFields(); // Vérification des champs
        if (isValid) {
            const selectedFile = document.getElementById('file-upload').files[0];
            const imageUrl = URL.createObjectURL(selectedFile);
            const title = document.getElementById('photoTitle').value;
            const categoryId = document.getElementById('select').value;
            let formData = new FormData();
            formData.append('photo', selectedFile);
            formData.append('photoTitle', title);
            formData.append('categories', categoryId);

            const myToken = localStorage.getItem('accessToken');
            const errorMsgForm = document.getElementById('errorMsgForm');
            if (myToken) {
                fetch('http://localhost:5678/api/works', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Authorization': `Bearer ${myToken}`,
                    }
                })
                    .then(function (response) {
                        console.log('Response:', response);
                        if (response.ok) {
                            addNewWork(title, imageUrl, categoryId);
                            successMsgForm.style.display = 'flex';
                            btnValidate.classList.remove('green');
                            setTimeout(function () {
                                closeModals();
                            }, 2000);
                        } else {
                            errorMsgForm.style.display = 'flex';
                        }
                    })
                    .catch(function (error) {
                        console.log('Error:', error);
                        errorMsgForm.style.display = 'flex';
                    });
            } else {
                console.log('Token not found in local storage');
                errorMsgForm.style.display = 'flex';
            }
        } else {
            errorMsgForm.style.display = 'flex';
        }
    });




    const imageInput = document.getElementById("file-upload");
    imageInput.addEventListener("change", uploadPhoto);
}




function manageFilters() {
    if (sessionStorage.getItem('token')) {
        // Si le token est présent, masquez les filtres
        btnAll.style.display = 'none';
        btnAppartment.style.display = 'none';
        btnHotel.style.display = 'none';
        btnObject.style.display = 'none';
    } else {
        // Sinon, affichez les filtres

    }
}




// ************************ MAIN CODE !!!!!! ****************************

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


manageFilters();

if (sessionStorage.getItem('token')) {
    loginLink.textContent = 'logout';
    loginLink.addEventListener('click', function (e) {
        e.preventDefault(); //empêche d'aller vers login.html
        sessionStorage.removeItem('token');
        loginLink.textContent = 'login';
        location.reload();
    });
}


if (sessionStorage.getItem('token')) {
    editButtons.forEach(button => {
        button.style.display = 'block';
    });
} else {
    editButtons.forEach(button => {
        button.style.display = 'none';
    });
}



modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))




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
        const gallery = document.createElement("div");
        gallery.classList.add("gallery");

        data.forEach((work, index) => {
            let figure = document.createElement("figure");

            let img = document.createElement("img");
            img.src = work.imageUrl;
            img.crossOrigin = "anonymous";
            figure.appendChild(img);

            // Ajouter une légende avec le mot "éditer"
            let figcaption = document.createElement("figcaption");
            let editLink = document.createTextNode("éditer");
            figcaption.appendChild(editLink);
            figure.appendChild(figcaption);

            // Ajouter un bouton de suppression avec une icône trash
            let deleteButton = document.createElement("button");
            deleteButton.classList.add("delete-button");
            deleteButton.innerHTML = '<i class="fa fa-trash-can"></i>';
            deleteButton.addEventListener("click", () => {
                // Récupérer l'id du travail à supprimer
                const workId = work.id;

                // Envoyer la requête DELETE au serveur afin de supprimer un travail
                fetch(`http://localhost:5678/api/works/${workId}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem('token')}`
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            // Supprimer l'élément de la page une fois la suppression réussie
                            figure.remove();
                            console.log(`Le travail avec l'id ${workId} a été supprimé.`);
                        } else {
                            throw new Error("Erreur lors de la suppression du travail.");
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            });

            figcaption.appendChild(deleteButton);


            // Ajouter un bouton d'édition avec une icône pencil
            if (index === 0) {
                let editButton = document.createElement("button");
                editButton.classList.add("edit-button");
                editButton.innerHTML = '<i class="fa fa-arrows-up-down-left-right"></i>';
                editButton.addEventListener("click", () => {
                    // Action à effectuer lorsque le bouton d'édition est cliqué
                    console.log("Éditer l'image : ", work.imageUrl);

                });
                figcaption.appendChild(editButton);
            }

            gallery.appendChild(figure);
        });

        modalContent.insertBefore(gallery, modalContent.querySelector("hr"));
    });




addPhotoButton.addEventListener('click', openAddPhotoModal);