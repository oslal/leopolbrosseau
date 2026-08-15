/* ------------------------------------------------------------------
   series.js — source unique du site
   Tout ce qui change quand on ajoute un photoshoot se trouve ici.
   ------------------------------------------------------------------ */

/* Identité et liens de la colonne de gauche. */
const SITE = {
	titre: "Léopol Brosseau",
	sousTitre: "",
	copyright: "© Léopol Brosseau 2026",
	liens: [
		{ texte: "Informations", href: "#informations" },
		{ texte: "Instagram", href: "https://www.instagram.com/lewooskayhh/" }
	]
};

/* Un objet par photoshoot, dans l'ordre d'affichage.

   slug      nom du dossier sous /series/ — minuscules, sans accent, tirets
   titre     ce qui s'affiche dans la liste et en tête de page
   annee     nombre
   categorie texte libre, peut rester vide ("")
   images    nombre de fichiers dans /img/, numérotés 01 à n sans trou
   vignette  numéro de l'image utilisée sur l'index                        */

const SERIES = [
	{ slug: "cable-rouge",          titre: "Câble rouge",          annee: 2026, categorie: "", images: 11, vignette: 1 },
	{ slug: "cage-d-escalier",      titre: "Cage d’escalier",      annee: 2026, categorie: "", images: 6,  vignette: 1 },
	{ slug: "mur-de-brique",        titre: "Mur de brique",        annee: 2026, categorie: "", images: 6,  vignette: 1 },
	{ slug: "portraits-simples",    titre: "Portraits simples",    annee: 2026, categorie: "", images: 3,  vignette: 1 },
	{ slug: "vitrine-industrielle", titre: "Vitrine industrielle", annee: 2026, categorie: "", images: 5,  vignette: 1 }
];

/* Calque « Informations ». Chaque entrée de texte est un paragraphe.
   Une entrée de contact sans href s'affiche en texte simple.            */

const INFO = {
	texte: [
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et dignissim magna, suspendisse facilisis sagittis sem sit amet tempor. Nam sit amet nibh et enim laoreet porta sit amet vel purus. Maecenas augue velit, feugiat in maximus id integer placerat massa nec tellus convallis aliquet.",
		"Nam lobortis lectus mi, vel molestie neque dictum at vivamus sed sapien fermentum, fermentum metus ut, efficitur nunc. Praesent bibendum a elit non efficitur. Etiam et velit vitae quam aliquet fermentum, quisque sit amet nulla dictum tempus est.",
		"Sed laoreet, magna eget mattis tincidunt, in lobortis mauris risus eu nunc. Vivamus sed condimentum leo. Nunc efficitur, magna condimentum gravida egestas, ligula mauris posuere neque, sit amet sagittis dui velit vitae neque."
	],
	adresse: [
		"Montréal, QC",
		"Canada"
	],
	contacts: [
		{ texte: "leopol.brosseau@gmail.com", href: "mailto:leopol.brosseau@gmail.com" },
		{ texte: "@lewooskayhh", href: "https://www.instagram.com/lewooskayhh/" }
	]
};

/* Export pour les tests en ligne de commande. Ignoré par le navigateur. */
if (typeof module !== "undefined") { module.exports = { SITE, SERIES, INFO }; }
