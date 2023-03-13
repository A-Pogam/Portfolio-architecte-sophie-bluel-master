fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(data => {
        console.log(data); // Afficher les données triées dans la console
    })
    .catch(error => {
        console.error('Une erreur s\'est produite:', error);
    });
