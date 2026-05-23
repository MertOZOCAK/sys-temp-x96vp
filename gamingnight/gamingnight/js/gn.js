document.addEventListener('DOMContentLoaded', () => {


    // Değişkenleri tanımlıyoruz
    const menuToggle = document.getElementById('mobile-menu');
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (menuToggle && navContainer) {
        menuToggle.addEventListener('click', () => {
            // Hem menüyü açıyoruz hem de hamburger ikonunu X yapıyoruz
            navContainer.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navContainer.classList.remove('active');
                menuToggle.classList.remove('open');
            });
        });
    }
});

// Sayfa kaydırıldığında mobil menüyü otomatik kapat
window.addEventListener('scroll', () => {
    if (navContainer.classList.contains('active')) {
        navContainer.classList.remove('active');
        // Eğer hamburger ikonunun animasyonu varsa (örn. "open" class'ı), onu da sıfırla
        menuToggle.classList.remove('open'); 
    }
}, { passive: true });