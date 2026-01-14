/* =========================
   1. CONFIGURATION
========================= */
const NOMBRE_DE_LOGOS = 53;    
const NOMBRE_DAFFICHES = 100;  

/* =========================
   2. FONCTIONS DU ZOOM (LIGHTBOX)
========================= */
function ouvrirLightbox(sourceImage) {
    const box = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    
    if(box && img) {
        img.src = sourceImage; // Met l'image dans la boite
        box.classList.add('active'); // Affiche la boite
        box.style.display = "flex"; // Force l'affichage
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
    if (!grid) return; 

    // --- GENERER LES LOGOS ---
    for (let i = 1; i <= NOMBRE_DE_LOGOS; i++) {
        const item = document.createElement('div');
        item.classList.add('portfolio-item');
        item.setAttribute('data-category', 'logo');
        
        const imageSrc = `images/logos/logo${i}.png`;

        item.innerHTML = `
            <img src="${imageSrc}" alt="Logo ${i}" loading="lazy">
            <div class="overlay">
                <h3>Logo N°${i}</h3>
                <p>Design de marque</p>
            </div>
        `;
        
        // Ajout du clic pour le zoom
        item.onclick = function() { ouvrirLightbox(imageSrc); };
        grid.appendChild(item);
    }

    // --- GENERER LES AFFICHES ---
    for (let i = 1; i <= NOMBRE_DAFFICHES; i++) {
        const item = document.createElement('div');
        item.classList.add('portfolio-item');
        item.setAttribute('data-category', 'affiche');
        
        const imageSrc = `images/affiches/affiche${i}.jpg`;

        item.innerHTML = `
            <img src="${imageSrc}" alt="Affiche ${i}" loading="lazy">
            <div class="overlay">
                <h3>Affiche N°${i}</h3>
                <p>Publicité & Event</p>
            </div>
        `;

        // Ajout du clic pour le zoom
        item.onclick = function() { ouvrirLightbox(imageSrc); };
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

// Lancement au démarrage
document.addEventListener('DOMContentLoaded', chargerPortfolio);

/* =========================
   ANIMATION COMPTEUR (Stats)
========================= */
const counters = document.querySelectorAll('.counter');
const statsSection = document.querySelector('.stats');
let started = false; // Pour que l'animation ne se lance qu'une fois

window.addEventListener('scroll', () => {
    // Si la section existe et qu'on n'a pas encore démarré l'animation
    if(statsSection && !started) {
        const sectionPos = statsSection.offsetTop;
        const sectionHeight = statsSection.clientHeight;
        
        // On lance quand la section est visible à l'écran
        if(window.scrollY > (sectionPos - window.innerHeight + sectionHeight / 4)) {
            counters.forEach(counter => {
                counter.innerText = '0';
                const updateCounter = () => {
                    const target = +counter.getAttribute('data-target');
                    const c = +counter.innerText;
                    
                    // Vitesse du compteur (plus le chiffre est grand, plus ça va vite)
                    const increment = target / 50; 

                    if(c < target) {
                        counter.innerText = `${Math.ceil(c + increment)}`;
                        setTimeout(updateCounter, 30);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
            });
            started = true; // On bloque pour ne pas relancer
        }
    }
});
