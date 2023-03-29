const submit = document.getElementById("submit");
const errorInformation = document.getElementById("errorInformation");
// Selectionne les éléments du bouton du formulaire et de l'élément d'affichage des erreurs dans le document HTML en utilisant les identifiants correspondants //

submit.addEventListener("click", (event) => {
    event.preventDefault();
    const email = document.getElementById("emailUser").value;
    const password = document.getElementById("password").value;
    // Ecouteur d'événements pour le clic sur le bouton de soumission. Lorsque l'événement se produit, la fonction fléchée anonyme est exécutée. Elle empêche également l'action par défaut de soumission du formulaire en appelant la méthode preventDefault() sur l'événement passé en argument. écupère les valeurs des champs d'e-mail et de mot de passe du formulaire en utilisant la méthode getElementById() //

    if (!email || !password) {
        document.getElementById("errorInformation").innerHTML = "Entrez un identifiant ou un mot de passe valide";
        return;
    }
    // Si l'un des champs est vide, un message d'erreur //

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
        })
        //pour extraire les données JSON du corps de la réponse de la requête HTTP. Cette méthode renvoie une promesse qui est résolue avec les données JSON contenues dans le corps de la réponse.  ErrorInformation.innerHTML est utilisé pour modifier le contenu HTML d'un élément de la page, en l'occurrence ici l'élément avec l'id "errorInformation".
        //

        .then(function (userInformation) {

            if (userInformation) {
                sessionStorage.setItem("userInformation", JSON.stringify(userInformation));
                sessionStorage.setItem("token", userInformation.token);
                location.replace("./admin.html");
            }
        })
        .catch(error => console.error(error));
});