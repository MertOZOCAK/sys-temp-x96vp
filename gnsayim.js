function updateTimer() {
    const targetDate = new Date(2026, 4, 31, 20, 0, 0).getTime(); 

    const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const diff = targetDate - now;
        const timerContainer = document.getElementById("timer");

        if (diff <= 0) {
    clearInterval(timerInterval);
    
    // Dil kontrolü (localStorage'dan siteLang veya selectedLanguage hangisini kullanıyorsan)
    const currentLang = localStorage.getItem('siteLang') || 'tr';
    
    const texts = {
        'tr': 'ETKİNLİK BAŞLADI!',
        'en': 'EVENT STARTED!'
    };
    
    const startText = texts[currentLang] || texts['tr'];

    const timerContainer = document.getElementById("timer");
    
    // BURASI KRİTİK: CSS'teki .event-active-msg sınıfını kullanıyoruz
    timerContainer.innerHTML = `<div class="event-active-msg" data-key="event_status">${startText}</div>`;
    
    // Hizalama
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
