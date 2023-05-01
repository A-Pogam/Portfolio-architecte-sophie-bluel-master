const submit = document.getElementById("submit");
const errorInformation = document.getElementById("errorInformation");
// Selectionne les éléments du bouton du formulaire et de l'élément d'affichage des erreurs dans le document HTML en utilisant les identifiants correspondants //

submit.addEventListener("click", (event) => {
    event.preventDefault();
    const email = document.getElementById("emailUser").value;
    const password = document.getElementById("password").value;
    // Ecouteur d'événements pour le clic. Lorsque l'événement se produit, la fonction fléchée anonyme est exécutée. Elle empêche également l'action par défaut de soumission du formulaire en appelant la méthode preventDefault() sur l'événement passé en argument. écupère les valeurs des champs d'e-mail et de mot de passe du formulaire en utilisant la méthode getElementById() //

    if (!email || !password) {
        document.getElementById("errorInformation").innerHTML = "Entrez un identifiant ou un mot de passe valide";
        return;
    }
    //  message d'erreur si un champ est vide //

    console.log(typeof email, email);
    console.log(typeof password, password);
    console.log(typeof JSON.stringify({ email: email, password: password }), JSON.stringify({ email: email, password: password }));


    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            accept: "application/json",
            "Content-type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
    })
        .then(function (authResponse) {

            if (authResponse.status === 200) {
                return authResponse.json();
            } else {
                errorInformation.innerHTML = "Erreur dans l'identifiant ou le mot de passe";
                return Promise.reject();
            }
            // si bonnes données, ok si mauvaise : rejet => message d'erreur 
        })


        .then(function (userInformation) {

            if (userInformation) {
                sessionStorage.setItem("userInformation", JSON.stringify(userInformation));
                sessionStorage.setItem("token", userInformation.token);
                window.location.href = "../FrontEnd/index.html"; // redirection vers la page d'accueil
            }
        })
        .catch(error => console.error(error));
})