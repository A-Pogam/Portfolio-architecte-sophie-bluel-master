document.addEventListener("DOMContentLoaded", () => {
    function loadGallery() {
        // Récupérer la section des onglets
        const tabs = document.getElementById("tabs");

        // Créer un onglet "Tous" avec une classe active par défaut
        const allTab = document.createElement("div");
        allTab.textContent = "Tous";
        allTab.classList.add("tab", "active");

        // Ajouter l'onglet "Tous" à la section des onglets
        tabs.appendChild(allTab);

        // Récupérer les catégories depuis l'API
        fetch('http://localhost:5678/api/categories')
            .then(response => response.json())
            .then(categories => {
                // Pour chaque catégorie récupérée depuis l'API
                categories.forEach(category => {
                    // Créer un nouvel onglet avec le nom de la catégorie
                    const tab = document.createElement("div");
                    tab.textContent = category.name;
                    tab.classList.add("tab");

                    // Ajouter l'onglet à la section des onglets
                    tabs.appendChild(tab);
                });
            })
            .catch(error => {
                console.error('Une erreur s\'est produite:', error);
            });

        // Récupérer la galerie
        const gallery = document.getElementById("gallery");

        // Récupérer les travaux depuis l'API
        fetch('http://localhost:5678/api/works')
            .then(response => response.json())
            .then(works => {
                // Pour chaque travail récupéré depuis l'API
                works.forEach(work => {
                    // Vérifier si l'objet work a une propriété images et qu'elle n'est pas vide
                    if (work.images && work.images.length > 0) {
                        // Créer un élément <img> avec la source de la première image
                        const img = document.createElement("img");
                        img.src = work.images[0].url;

                        // Ajouter l'élément <img> à la galerie
                        gallery.appendChild(img);

                        // Ajouter des classes à l'élément <img> en fonction des catégories du travail
                        work.categories.forEach(category => {
                            img.classList.add(category.slug);
                        });
                    }
                });
            })
            .catch(error => {
                console.error('Une erreur s\'est produite:', error);
            });
    }

    loadGallery();
});
