// Mobil Menü Yönetimi
const menuToggle = document.getElementById('mobile-menu');
const navContainer = document.querySelector('.nav-container');
const navLinks = document.querySelectorAll('.nav-links a');

function updateTimer() {
    const targetDate = new Date(2026, 4, 10, 20, 0, 0).getTime(); 

    const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const diff = targetDate - now;
        const timerContainer = document.getElementById("timer");

        if (diff <= 0) {
            clearInterval(timerInterval);
            const currentLang = localStorage.getItem('siteLang') || 'tr';
            const startText = "ETKİNLİK BAŞLADI!";
            
            timerContainer.innerHTML = `<div class="event-started-wrapper" data-key="event_status">${startText}</div>`;
            timerContainer.style.display = "flex";
            timerContainer.style.justifyContent = "center";
            timerContainer.style.alignItems = "center";
            timerContainer.style.width = "100%";
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = d < 10 ? "0" + d : d;
        document.getElementById("hours").innerText = h < 10 ? "0" + h : h;
        document.getElementById("minutes").innerText = m < 10 ? "0" + m : m;
        document.getElementById("seconds").innerText = s < 10 ? "0" + s : s;
    }, 1000);
}

updateTimer();

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