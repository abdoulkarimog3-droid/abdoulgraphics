/* =========================
   SCROLL PROGRESS BAR
========================= */
window.onscroll = function() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  document.getElementById("scroll-progress").style.width = scrolled + "%";
};

/* =========================
   MENU MOBILE
========================= */
function toggleMenu() {
  const menu = document.querySelector(".menu");
  menu.classList.toggle("active");
  
  // Animation Hamburger
  const bars = document.querySelectorAll(".bar");
  menu.classList.contains("active") 
    ? (bars[0].style.transform = "rotate(45deg) translate(5px, 6px)", bars[1].style.opacity = "0", bars[2].style.transform = "rotate(-45deg) translate(5px, -6px)") 
    : (bars[0].style.transform = "none", bars[1].style.opacity = "1", bars[2].style.transform = "none");
}

function closeMenu() {
  document.querySelector(".menu").classList.remove("active");
}

/* =========================
   PORTFOLIO FILTER
========================= */
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Gestion de la classe active
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filterValue = btn.getAttribute('data-filter');

    portfolioItems.forEach(item => {
      if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
        item.style.display = 'block';
        // Petit effet d'apparition
        setTimeout(() => item.style.opacity = '1', 100);
      } else {
        item.style.display = 'none';
        item.style.opacity = '0';
      }
    });
  });
});

/* =========================
   CUSTOM CURSOR
========================= */
const cursor = document.querySelector('.cursor');
const cursor2 = document.querySelector('.cursor2');

document.addEventListener('mousemove', function(e){
  cursor.style.cssText = cursor2.style.cssText = "left: " + e.clientX + "px; top: " + e.clientY + "px;";
});

/* =========================
   THEME TOGGLE (SIMPLE)
========================= */
function toggleTheme() {
    document.body.classList.toggle("light-mode");
    // Tu peux ajouter ici du CSS spécifique pour le mode clair si tu veux
    // ex: :root { --dark-bg: #ffffff; }
    alert("Mode Clair/Sombre : Tu peux personnaliser les couleurs dans le CSS sous la classe .light-mode");
}
