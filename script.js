/* =========================
   CONFIGURATION DES IMAGES
========================= */
// Change ces chiffres si tu ajoutes d'autres images plus tard
const NOMBRE_DE_LOGOS = 53;    // Tu as logo1.png jusqu'à logo53.png
const NOMBRE_DAFFICHES = 100;  // Tu as affiche1.jpg jusqu'à affiche100.jpg

/* =========================
   GENERATION AUTOMATIQUE DU PORTFOLIO
========================= */
const grid = document.querySelector('.portfolio-grid');

function chargerPortfolio() {
    // 1. Générer les LOGOS
    for (let i = 1; i <= NOMBRE_DE_LOGOS; i++) {
        const item = document.createElement('div');
        item.classList.add('portfolio-item');
        item.setAttribute('data-category', 'logo');
        
        // On crée le HTML pour chaque logo
        item.innerHTML = `
            <img src="images/logos/logo${i}.png" alt="Logo ${i}" loading="lazy">
            <div class="overlay">
                <h3>Logo N°${i}</h3>
                <p>Design de marque</p>
            </div>
        `;
        grid.appendChild(item);
    }

    // 2. Générer les AFFICHES
    for (let i = 1; i <= NOMBRE_DAFFICHES; i++) {
        const item = document.createElement('div');
        item.classList.add('portfolio-item');
        item.setAttribute('data-category', 'affiche');
        
        // On crée le HTML pour chaque affiche
        item.innerHTML = `
            <img src="images/affiches/affiche${i}.jpg" alt="Affiche ${i}" loading="lazy">
            <div class="overlay">
                <h3>Affiche N°${i}</h3>
                <p>Publicité & Event</p>
            </div>
        `;
        grid.appendChild(item);
    }

    // Une fois les images créées, on active le système de filtres
    activerFiltres();
}

/* =========================
   SYSTEME DE FILTRES
========================= */
function activerFiltres() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Gestion de la classe active sur les boutons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 50);
                } else {
                    item.style.display = 'none';
                    item.style.opacity = '0';
                }
            });
        });
    });
}

// On lance le chargement au démarrage
document.addEventListener('DOMContentLoaded', chargerPortfolio);


/* =========================
   SCROLL BAR
========================= */
window.onscroll = function() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  let bar = document.getElementById("scroll-progress");
  if(bar) bar.style.width = scrolled + "%";
};

/* =========================
   MENU MOBILE
========================= */
function toggleMenu() {
  const menu = document.querySelector(".menu");
  menu.classList.toggle("active");
}
function closeMenu() {
  document.querySelector(".menu").classList.remove("active");
}

/* =========================
   CURSEUR (Optionnel)
========================= */
const cursor = document.querySelector('.cursor');
const cursor2 = document.querySelector('.cursor2');

if(cursor && cursor2) {
    document.addEventListener('mousemove', function(e){
        cursor.style.cssText = cursor2.style.cssText = "left: " + e.clientX + "px; top: " + e.clientY + "px;";
    });
}
