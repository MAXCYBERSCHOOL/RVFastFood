import Expo from 'expo';
var languages={
  "en":{
    variant_not_available:"La variante sélectionée est indisponible",
    no_variant_available:"Aucune Variante",
    cart:"Panier",
    delivery:"Livraison",
    payment:"Payement",
    summary:"Recapitulatif",
    price:"Prix",
    empty_cart: "Votre Panier est Vide.",
    enter_name: "Entrez votre nom",
    enter_login: "Entrez votre Email ",
    enter_pwd: "Entrez votre mot de passe ",
    enter_address: "Entrez une adresse mail ",
    notification_email: "Email de notitication",
    contact: "Numéro de téléphone",
    about_oreder: "A propos de la commande",
    back: "Retour",
    go_payment:'Payement',
    pay: 'Payement',
    status: "Statut:",
    approved:"approuvé",
    canceled: "annulé",
    overview:'Overview',
    thanks:"Merci",
    order_processed: "Votre commande est en cours de validation",
    no_items: 'Aucun élément',
    ingredients:'Ingredients',
    no_orders: "Aucune commande",
    no_categories: "Aucune categorie",
    next: "Suivant",
    name: "Nom",
    address: "Adresse",
    address_livraison: "Adresse de Livraison",
    email: "Email",
    phone: "Téléphone",
    login: "Email",
    password: "Mot de Passe",
    conf_password: "Confirmez votre mot de passe",
    connexion: "Connexion",
    notes: "Notes",
    CODselected: "En cours d'intégration...",
    choosePayment: "Choisir un mode de payement",
    searchBarText: "Recherche...."

  },
  "es":{
    variant_not_available:"La variante seleccionada no está disponiblee",
    no_variant_available:"No variante disponiblee",
    cart:"Carrito",
    delivery:"Entrega",
    payment:"Pago",
    summary:"Resumen"
  }
}
exports.expo=languages.en;
Expo.Util.getCurrentLocaleAsync().then(lng => { exports.expo=languages[lng] })
