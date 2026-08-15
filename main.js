/* ------------------------------------------------------------------
   main.js — rendu de la barre latérale, de l'index, des séries
   et du calque « Informations ».
   Les fonctions html*() ne font que produire des chaînes : elles sont
   testables hors navigateur.
   ------------------------------------------------------------------ */

/* --- utilitaires ------------------------------------------------- */

function echapper(s) {
	return String(s)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

function numero(n) {
	return String(n).padStart(2, "0");
}

function cheminImage(slug, n) {
	return "/series/" + slug + "/img/" + numero(n) + ".webp";
}

/* Le slug est le nom du dossier : aucune modification à faire dans le
   HTML quand on duplique le gabarit. Renvoie null sur l'index.        */
function slugDepuisChemin(chemin) {
	const parts = String(chemin).split("/").filter(Boolean);
	const i = parts.indexOf("series");
	if (i === -1) return null;
	const s = parts[i + 1];
	if (!s || s.endsWith(".html")) return null;
	return decodeURIComponent(s);
}

function trouverSerie(series, slug) {
	return series.find(function (s) { return s.slug === slug; }) || null;
}

/* --- fragments --------------------------------------------------- */

function htmlBarre(site, series, slugActif) {
	const liste = series.map(function (s) {
		const actif = s.slug === slugActif ? ' class="actif" aria-current="page"' : "";
		return '<li><a href="/series/' + encodeURIComponent(s.slug) + '/"' + actif + ">" +
			echapper(s.titre) + "</a></li>";
	}).join("\n\t\t\t");

	const liens = site.liens.map(function (l) {
		const externe = /^https?:/.test(l.href) ? ' target="_blank" rel="noopener"' : "";
		return '<li><a href="' + echapper(l.href) + '"' + externe + ">" + echapper(l.texte) + "</a></li>";
	}).join("\n\t\t\t");

	return [
		'<div class="bloc">',
		'\t<a href="/" class="titre-site">' + echapper(site.titre) + "</a>",
		'\t<div class="sous-titre">' + echapper(site.sousTitre) + "</div>",
		"</div>",
		'<nav class="bloc" aria-label="Séries">',
		"\t<ul>",
		"\t\t\t" + liste,
		"\t</ul>",
		"</nav>",
		'<nav class="bloc" aria-label="Liens">',
		"\t<ul>",
		"\t\t\t" + liens,
		"\t</ul>",
		"</nav>"
	].join("\n");
}

function htmlIndex(series) {
	const cases = series.map(function (s, i) {
		const src = cheminImage(s.slug, s.vignette || 1);
		const prio = i < 2
			? ' fetchpriority="high" decoding="async"'
			: ' loading="lazy" decoding="async"';
		return '<a class="vignette reveal" href="/series/' + encodeURIComponent(s.slug) + '/">' +
			'<img src="' + src + '" alt="' + echapper(s.titre) + '"' + prio + "></a>";
	}).join("\n\t");

	return '<div class="grille">\n\t' + cases + "\n</div>";
}

function htmlSerie(serie) {
	const meta = [serie.categorie, serie.annee].filter(Boolean).join(", ");
	const images = [];
	for (let n = 1; n <= serie.images; n++) {
		const prio = n === 1
			? ' fetchpriority="high" decoding="async"'
			: ' loading="lazy" decoding="async"';
		images.push('<img class="reveal" src="' + cheminImage(serie.slug, n) +
			'" alt="' + echapper(serie.titre) + ", image " + n + '"' + prio + ">");
	}

	return [
		'<header class="entete">',
		'\t<div class="entete-titre">' + echapper(serie.titre) + "</div>",
		'\t<div class="entete-meta"><span>' + echapper(meta) + "</span>" +
			'<a href="/">(Index)</a></div>',
		"</header>",
		'<div class="pile">',
		"\t" + images.join("\n\t"),
		"</div>"
	].join("\n");
}

function htmlIntrouvable() {
	return '<header class="entete"><div class="entete-titre">Série introuvable</div>' +
		'<div class="entete-meta"><span></span><a href="/">(Index)</a></div></header>' +
		'<p class="note">Ce dossier n\'a pas d\'entrée correspondante dans series.js. ' +
		"Le slug doit être identique au nom du dossier.</p>";
}

function htmlInfo(info) {
	const texte = info.texte.map(function (p) {
		return "<p>" + echapper(p) + "</p>";
	}).join("\n\t\t\t");

	const adresse = info.adresse.map(function (l) {
		return "<div>" + echapper(l) + "</div>";
	}).join("\n\t\t\t");

	const contacts = info.contacts.map(function (c) {
		if (!c.href) return "<div>" + echapper(c.texte) + "</div>";
		const externe = /^https?:/.test(c.href) ? ' target="_blank" rel="noopener"' : "";
		return '<div><a href="' + echapper(c.href) + '"' + externe + ">" +
			echapper(c.texte) + "</a></div>";
	}).join("\n\t\t\t");

	return [
		'<div class="info-rangee"><a href="#" class="info-fermer">(Fermer)</a></div>',
		'<div class="info-colonnes">',
		'\t<div class="info-texte">',
		"\t\t\t" + texte,
		"\t</div>",
		'\t<div class="info-contact">',
		"\t\t\t" + adresse,
		'\t\t\t<div class="espace"></div>',
		"\t\t\t" + contacts,
		"\t</div>",
		"</div>"
	].join("\n");
}

/* --- initialisation ---------------------------------------------- */

function init() {
	const slug = slugDepuisChemin(location.pathname);
	const serie = slug ? trouverSerie(SERIES, slug) : null;

	document.getElementById("barre").innerHTML = htmlBarre(SITE, SERIES, slug);
	document.getElementById("pied").textContent = SITE.copyright;

	const contenu = document.getElementById("contenu");
	if (!slug) {
		contenu.innerHTML = htmlIndex(SERIES);
		document.title = SITE.titre;
	} else if (serie) {
		contenu.innerHTML = htmlSerie(serie);
		document.title = serie.titre + " · " + SITE.titre;
	} else {
		contenu.innerHTML = htmlIntrouvable();
		document.title = SITE.titre;
	}

	const calque = document.getElementById("informations");
	calque.innerHTML = htmlInfo(INFO);

	brancherInfo(calque);
	brancherApparition();
}

/* Ouverture et fermeture du calque, pilotées par le fragment d'URL. */
function brancherInfo(calque) {
	function synchroniser() {
		const ouvert = location.hash === "#informations";
		document.body.classList.toggle("info-ouverte", ouvert);
		calque.setAttribute("aria-hidden", ouvert ? "false" : "true");
		if (ouvert) {
			const fermer = calque.querySelector(".info-fermer");
			if (fermer) fermer.focus();
		}
	}

	function fermer(e) {
		if (e) e.preventDefault();
		history.replaceState(null, "", location.pathname + location.search);
		synchroniser();
	}

	calque.addEventListener("click", function (e) {
		if (e.target.closest(".info-fermer") || e.target === calque) fermer(e);
	});

	document.addEventListener("keydown", function (e) {
		if (e.key === "Escape" && location.hash === "#informations") fermer();
	});

	window.addEventListener("hashchange", synchroniser);
	synchroniser();
}

/* Fondu ascendant à l'entrée dans le cadre, comme le gabarit Cargo. */
function brancherApparition() {
	const cibles = document.querySelectorAll(".reveal");
	if (!("IntersectionObserver" in window)) {
		cibles.forEach(function (el) { el.classList.add("vu"); });
		return;
	}
	const observateur = new IntersectionObserver(function (entrees) {
		entrees.forEach(function (entree) {
			if (!entree.isIntersecting) return;
			entree.target.classList.add("vu");
			observateur.unobserve(entree.target);
		});
	}, { rootMargin: "0px 0px -8% 0px" });

	cibles.forEach(function (el) { observateur.observe(el); });
}

if (typeof document !== "undefined") {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", init);
	} else {
		init();
	}
}

if (typeof module !== "undefined") {
	module.exports = {
		echapper, numero, cheminImage, slugDepuisChemin, trouverSerie,
		htmlBarre, htmlIndex, htmlSerie, htmlInfo, htmlIntrouvable
	};
}
