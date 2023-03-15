// Récupération des catégories
fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(data => console.log('Catégories :', data))
    .catch(error => console.error('Erreur lors de la récupération des catégories :', error));

// Récupération des travaux
fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => console.log('Travaux :', data))
    .catch(error => console.error('Erreur lors de la récupération des travaux :', error));
