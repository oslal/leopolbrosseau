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

/* Calque « Informations ».
   texte     un paragraphe par entrée
   mesures   lignes de la colonne de droite, au-dessus des contacts
   contacts  une entrée sans href s'affiche en texte simple             */

const INFO = {
	texte: [
		"Salut, je m\u2019appelle L\u00e9opol. J\u2019ai commenc\u00e9 le mannequinat cette ann\u00e9e, \u00e0 Montr\u00e9al.",
		"Je cherche \u00e0 travailler avec des photographes, des stylistes et des marques d\u2019ici, en studio comme en ext\u00e9rieur. Portrait, v\u00eatement, \u00e9ditorial, lookbook. Je n\u2019ai pas encore d\u2019agence, donc tout passe directement par moi.",
		"Vous pouvez m\u2019\u00e9crire par courriel ou sur Instagram. Je r\u00e9ponds \u00e0 tout."
	],
	mesures: [
		"175 cm / 5\u20329\u2033",
		"68 kg / 150 lb",
		"Montr\u00e9al, QC"
	],
	contacts: [
		{ texte: "leopol.brosseau@gmail.com", href: "mailto:leopol.brosseau@gmail.com" },
		{ texte: "@lewooskayhh", href: "https://www.instagram.com/lewooskayhh/" }
	]
};

/* Export pour les tests en ligne de commande. Ignoré par le navigateur. */
if (typeof module !== "undefined") { module.exports = { SITE, SERIES, INFO }; }
