// Mobil Menü Yönetimi
const menuToggle = document.getElementById('mobile-menu');
const navContainer = document.querySelector('.nav-container');
const navLinks = document.querySelectorAll('.nav-links a');

document.getElementById('mobile-menu').addEventListener('click', function() {
    this.classList.toggle('open');
    // Eğer nav-links'in de açılmasını istiyorsan altına ekleyebilirsin:
    document.querySelector('.nav-links').classList.toggle('active');
});


// Yukarı Çık Butonu
window.addEventListener('scroll', function() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (window.scrollY > 1) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

if (menuToggle && navContainer) {
    // Menü butonuna tıklandığında aç/kapat
    menuToggle.addEventListener('click', () => {
        navContainer.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Herhangi bir menü linkine tıklandığında menüyü kapat
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navContainer.classList.remove('active');
        });
    });
}

// Sayfa kaydırıldığında mobil menüyü otomatik kapat
window.addEventListener('scroll', () => {
    if (navContainer.classList.contains('active')) {
        navContainer.classList.remove('active');
        // Eğer hamburger ikonunun animasyonu varsa (örn. "open" class'ı), onu da sıfırla
        menuToggle.classList.remove('open'); 
    }
}, { passive: true });