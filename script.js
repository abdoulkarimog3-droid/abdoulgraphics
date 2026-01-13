/* =========================
   1. CONFIGURATION
========================= */
const NOMBRE_DE_LOGOS = 53;    
const NOMBRE_DAFFICHES = 100;  

/* =========================
   2. FONCTIONS DU ZOOM (LIGHTBOX)
   (On les met au début pour être sûr qu'elles chargent)
========================= */
function ouvrirLightbox(sourceImage) {
    const box = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    
    if(box && img) {
        img.src = sourceImage; // Met l'image dans la boite
        box.classList.add('active'); // Affiche la boite
        box.style.display = "flex"; // Force l'affichage en flex
    } else {
        console.error("Erreur: La boite #lightbox n'existe pas dans le HTML");
    }
}

function fermerLightbox() {
    const box = document.getElementById('lightbox');
    if(box) {
        box.classList.remove('active');
        box.style.display = "none";
    }
}

/* =========================
   3. GENERATION DU PORTFOLIO
========================= */
const grid = document.querySelector('.portfolio-grid');

function chargerPortfolio() {
    if (!grid) return; // Sécurité si la grille n'existe pas

    // --- GENERER LES LOGOS ---
    for (let i = 1; i <= NOMBRE_DE_LOGOS; i++) {
        const item = document.createElement('div');
        item.classList.add('portfolio-item');
        item.setAttribute('data-category', 'logo');
        
        // On définit le lien de l'image
        const imageSrc = `images/logos/logo${i}.png`;

        item.innerHTML = `
            <img src="${imageSrc}" alt="Logo ${i}" loading="lazy">
            <div class="overlay">
                <h3>Logo N°${i}</h3>
                <p>Design de marque</p>
            </div>
        `;
        
        // L'ACTION DE CLIC EST AJOUTÉE DIRECTEMENT ICI
        item.onclick = function() {
            ouvrirLightbox(imageSrc);
        };

        grid.appendChild(item);
    }

    // --- GENERER LES AFFICHES ---
    for (let i = 1; i <= NOMBRE_DAFFICHES; i++) {
        const item = document.createElement('div');
        item.classList.add('portfolio-item');
        item.setAttribute('data-category', 'affiche');
        
        // On définit le lien de l'image (Attention au .jpg ou .jpeg)
        const imageSrc = `images/affiches/affiche${i}.jpg`;

        item.innerHTML = `
            <img src="${imageSrc}" alt="Affiche ${i}" loading="lazy">
            <div class="overlay">
                <h3>Affiche N°${i}</h3>
                <p>Publicité & Event</p>
            </div>
        `;

        // L'ACTION DE CLIC EST AJOUTÉE DIRECTEMENT ICI
        item.onclick = function() {
            ouvrirLightbox(imageSrc);
        };

        grid.appendChild(item);
    }

    activerFiltres();
}

/* =========================
   4. FILTRES & MENU & SCROLL
========================= */
function activerFiltres() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

window.onscroll = function() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  let bar = document.getElementById("scroll-progress");
  if(bar) bar.style.width = scrolled + "%";
};

function toggleMenu() {
  document.querySelector(".menu").classList.toggle("active");
}
function closeMenu() {
  document.querySelector(".menu").classList.remove("active");
}

// Lancement au chargement de la page
document.addEventListener('DOMContentLoaded', chargerPortfolio);
