const newsTranslations = {
    tr: {
        // Genel Metinler
        title: "BÜYÜK AÇILIŞA HAZIRLANIYORUZ",
        subtitle: "Çok yakında buradayız!",
        days: "GÜN",    
        hours: "SAAT",
        minutes: "DAKİKA",
        seconds: "SANİYE",
        email: "E-posta adresini bırak...",
        success: "Kaydın başarıyla oluşturuldu. Sunucumuz aktif olduğunda e-posta adresine bir davetiye göndereceğiz."
    },
    en: {
        // Genel Metinler
        title: "BIG LAUNCH IS COMING SOON",
        subtitle: "We're almost here!",
        days: "DAYS",
        hours: "HOURS",
        minutes: "MINUTES",
        seconds: "SECONDS",
        email: "Leave your email address...",
        success: "Your registration was successful. We will send you an invitation once our server is live."
    }
};

    document.addEventListener("DOMContentLoaded", () => {
    const currentLang = localStorage.getItem("selectedLanguage") || "tr";
    
    const translateElements = document.querySelectorAll("[data-key]");
    translateElements.forEach(el => {
        const key = el.getAttribute("data-key");
        if (newsTranslations[currentLang] && newsTranslations[currentLang][key]) {
            el.innerText = newsTranslations[currentLang][key];
        }
    });
});
