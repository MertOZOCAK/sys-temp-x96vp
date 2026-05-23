const newsTranslations = {
    tr: {
        // Duyuru Bandı (Top Bar)
        top_bar_1: "MAĞAZADAKİ BUGÜNE ÖZEL %50 İNDİRİMİ KAÇIRMAYIN!",
        top_bar_2: "YENİ TOWNY SEZONU ÇOK YAKINDA SİZLERLE!",
        top_bar_3: "DİSCORD SUNUCUMUZA KATILMAYI UNUTMAYIN!",

        // Navigasyon
        nav_home: "Anasayfa",
        nav_games: "Oyunlar",
        nav_shop: "Mağaza",
        gg_btn: "GG",
        nav_news: "Haberler",
        nav_support: "Destek",
        btn_login: "Giriş Yap >",
        nav_about: "Hakkımızda",

        // Hero Bölümü
        hero_title: "Gaming Gecesi",
        timer_days: "GÜN",
        timer_hours: "SAAT",
        timer_minutes: "DAKİKA",
        timer_seconds: "SANİYE",
        event_status: "ETKİNLİK BAŞLADI!",

        // Ürünler Başlık
        section_title: "Gecenin Fırsat Ürünleri",
        buy_btn: "Hemen Al",
        sale: "İndirim",

        // Footer
        footer_about_title: "Mertix Network Hakkında",
        footer_about_content: "Mertix Network, Türkiye'nin en yenilikçi Minecraft sunucularından biridir. Towny, Skyblock ve daha birçok oyun moduyla kesintisiz eğlence sunuyoruz.",
        footer_quick_links: "Hızlı Linkler",
        footer_link_gaming: "Gaming Gecesi",
        footer_support_requests: "Destek Talepleri",
        footer_social: "Sosyal Medya",
        footer_copyright: "Copyright Mertix® tüm hakları saklıdır. © 2026"
    },
    en: {
        // Duyuru Bandı (Top Bar)
        top_bar_1: "DON'T MISS THE SPECIAL 50% DISCOUNT IN THE STORE TODAY!",
        top_bar_2: "NEW TOWNY SEASON IS COMING SOON!",
        top_bar_3: "DON'T FORGET TO JOIN OUR DISCORD SERVER!",

        // Navigasyon
        nav_home: "Home",
        nav_games: "Games",
        nav_shop: "Shop",
        gg_btn: "GN",
        nav_news: "News",
        nav_support: "Support",
        btn_login: "Login >",
        nav_about: "About Us",

        // Hero Bölümü
        hero_title: "Gaming Night",
        timer_days: "DAYS",
        timer_hours: "HOURS",
        timer_minutes: "MINUTES",
        timer_seconds: "SECONDS",
        event_status: "EVENT STARTED!",

        // Ürünler Başlık
        section_title: "Deals of the Night",
        buy_btn: "Buy Now",
        sale: "Sale",

        // Footer
        footer_about_title: "About Mertix Network",
        footer_about_content: "Mertix Network is one of Turkey's most innovative Minecraft servers, offering seamless fun with Towny, Skyblock, and many more game modes.",
        footer_quick_links: "Quick Links",
        footer_link_gaming: "Gaming Night",
        footer_support_requests: "Support Requests",
        footer_social: "Social Media",
        footer_copyright: "Copyright Mertix® all rights reserved. © 2026"
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