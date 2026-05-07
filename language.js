const translations = {
    tr: {
        top_bar_1: "MAGAZADAKİ BUGÜNE ÖZEL %50 İNDİRİMİ KAÇIRMAYIN!",
        top_bar_2: "YENİ TOWNY SEZONU ÇOK YAKINDA SİZLERLE!",
        top_bar_3: "DİSCORD SUNUCUMUZA KATILMAYI UNUTMAYIN!",
        top_bar_4: "MERTIX DESTES BOTU ERİŞİME KAPANMIŞTIR...",
        nav_home: "Anasayfa",
        nav_games: "Oyunlar",
        nav_news: "Haberler",
        nav_shop: "Mağaza",
        nav_support: "Destek",
        nav_about: "Hakkımızda",
        btn_login: "Giriş Yap >",
        hero_sub: "MERTIX NETWORK",
        hero_title: "YENİ NESİL OYUN DENEYİMİ",
        hero_online: "● 0 Oyuncu Aktif!",
        btn_join: "Katıl",
        gaming_title: "GAMING GECESİ",
        gaming_sub: "EFSANE FİYATLAR | MUHTEŞEM ÜRÜNLER!",
        footer_about_title: "Hakkımızda",
        footer_about_content: "Mertix Network, Türkiye'nin en yenilikçi Minecraft sunucularından biridir. Towny, Skyblock ve daha birçok oyun moduyla kesintisiz eğlence sunuyoruz.",
        footer_quick_links: "Hızlı Linkler",
        footer_support: "Destek",
        footer_social: "Sosyal Medya",
        footer_lang: "Ülke & Dil",
        title_news: "EN SON HABERLER",
        title_games: "OYUNLAR",
        tag_update: "GÜNCELLEME",
        tag_announcement: "DUYURULAR",
        tag_event: "ETKİNLİK",
        event_status: "ETKİNLİK BAŞLADI!",

        chat_title: "Mertix Destek Botu",
        chat_quick_ip: "IP?",
        chat_quick_store: "Mağaza",
        chat_quick_staff: "Yetkili",
        chat_input_placeholder: "Mesajınızı yazın...",
        
        timer_days: "GÜN",
        timer_hours: "SAAT",
        timer_minutes: "DAKİKA",
        timer_seconds: "SANİYE",

        lang_tr: "Türkçe",
        lang_en: "İngilizce (Beta)",
        lang_de: "Almanca (Beta)",
        lang_fr: "Fransızca (Beta)",
        footer_links_title: "Hızlı Linkler",
        footer_link_gaming: "Gaming Gecesi",
        footer_link_punishments: "Cezalandırmalar",
        footer_support_title: "Destek",
        footer_support_requests: "Destek Talepleri",
        footer_copyright: "Copyright @ Mertix® tüm hakları saklıdır. © 2026"
    },
    en: {
        top_bar_1: "DON'T MISS THE 50% DISCOUNT SPECIAL FOR TODAY IN THE STORE!",
        top_bar_2: "NEW TOWNY SEASON IS COMING SOON!",
        top_bar_3: "DON'T FORGET TO JOIN OUR DISCORD SERVER!",
        top_bar_4: "MERTIX SUPPORT BOT HAS BEEN DISABLED...",
        nav_home: "Home",
        nav_games: "Games",
        nav_news: "News",
        nav_shop: "Store",
        nav_support: "Support",
        nav_about: "About Us",
        btn_login: "Login >",
        hero_sub: "MERTIX NETWORK",
        hero_title: "NEXT GEN GAMING EXPERIENCE",
        hero_online: "● 0 Players Online!",
        btn_join: "Join Now",
        gaming_title: "GAMING NIGHT",
        gaming_sub: "LEGENDARY PRICES | AMAZING PRODUCTS!",
        footer_about_title: "About Us",
        footer_about_content: "Mertix Network is one of Turkey's most innovative Minecraft servers. We offer non-stop entertainment with Towny, Skyblock, and many more game modes.",
        footer_quick_links: "Quick Links",
        footer_support: "Support",
        footer_social: "Social Media",
        footer_lang: "Country & Language",
        title_news: "LATEST NEWS",
        title_games: "GAMES",
        tag_update: "UPDATE",
        tag_announcement: "ANNOUNCEMENT",
        tag_event: "EVENT",
        event_status: "EVENT STARTED!",

        chat_title: "Mertix Support Bot",
        chat_quick_ip: "IP?",
        chat_quick_store: "Store",
        chat_quick_staff: "Staff",
        chat_input_placeholder: "Type your message...",
        
        timer_days: "DAYS",
        timer_hours: "HOURS",
        timer_minutes: "MINS",
        timer_seconds: "SECS",

        lang_tr: "Turkish",
        lang_en: "English (Beta)",
        lang_de: "German (Beta)",
        lang_fr: "French (Beta)",
        footer_links_title: "Quick Links",
        footer_link_gaming: "Gaming Night",
        footer_link_punishments: "Punishments",
        footer_support_title: "Support",
        footer_support_requests: "Support Requests",
        footer_copyright: "Copyright @ Mertix® all rights reserved. © 2026"
        
    }
};

const langSelect = document.getElementById('langSelect');

// Sayfa yüklendiğinde dili ayarla
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('siteLang') || 'tr';
    langSelect.value = savedLang;
    changeLanguage(savedLang);
});

// Dil seçimi değiştiğinde
langSelect.addEventListener('change', (e) => {
    const selectedLang = e.target.value;
    localStorage.setItem('siteLang', selectedLang);
    changeLanguage(selectedLang);
});

function changeLanguage(lang) {
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang][key]) {
            // Eğer element bir input ise placeholder'ını değiştir, değilse textContent
            if (element.tagName === 'INPUT') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    localStorage.setItem("selectedLanguage", lang);

    if (typeof applyLanguage === "function") {
        applyLanguage(lang);
    }
}
