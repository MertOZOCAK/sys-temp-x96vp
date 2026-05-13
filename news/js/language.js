const newsTranslations = {
    tr: {
        // Genel Metinler
        top_bar_1: "MAĞAZADAKİ BUGÜNE ÖZEL %50 İNDİRİMİ KAÇIRMAYIN!",
        top_bar_2: "YENİ TOWNY SEZONU ÇOK YAKINDA SİZLERLE!",
        top_bar_3: "DİSCORD SUNUCUMUZA KATILMAYI UNUTMAYIN!",
        other_news_title: "DİĞER HABERLER",
        comments_header: "YORUMLAR (1)",
        leave_comment: "BİR YORUM BIRAK",
        login_to_comment: "Yorum yapabilmek için",
        login_link: "Giriş Yap",
        reply_button: "Cevapla",
        cat_update: "GÜNCELLEME",
        cat_announcement: "DUYURU",
        cat_event: "ETKİNLİK",

        // Haber İçerikleri (Görseldeki Metinler)
        tekblok_title: "Tekblok Sunucusu 15 Ağustos'ta Yeni Sezona Geçiyor!",
        tekblok_desc: "Yeni sezon detayları ve eklenen özellikler hakkında bilgi almak için tıklayın.",
        survival_title: "Survival Sunucusu 3 Mayıs 18.00'da Aktif!",
        survival_desc: "Efsanevi Survival deneyimi başlıyor. Hemen detaylara göz atın.",
        bedwars_title: "Bedwars Yeni Sezon 19 Nisan 18.00'da Aktif!",
        bedwars_desc: "Rekabet kızışıyor! Yeni haritalar ve ödüller sizi bekliyor.",
        towny_title: "Haftalık Towny Turnuvası Başlıyor!",
        towny_desc: "Krallığını kur, ordunu topla ve büyük ödülün sahibi ol."
    },
    en: {
        // Genel Metinler
        top_bar_1: "DON'T MISS THE 50% SPECIAL DISCOUNT IN THE STORE TODAY!",
        top_bar_2: "NEW TOWNY SEASON COMING SOON!",
        top_bar_3: "DON'T FORGET TO JOIN OUR DISCORD SERVER!",
        other_news_title: "OTHER NEWS",
        comments_header: "COMMENTS (1)",
        leave_comment: "LEAVE A COMMENT",
        login_to_comment: "To be able to comment",
        login_link: "Login",
        reply_button: "Reply",
        cat_update: "UPDATE",
        cat_announcement: "ANNOUNCEMENT",
        cat_event: "EVENT",

        // Haber İçerikleri (İngilizce Karşılıkları)
        tekblok_title: "Oneblock Server Moving to New Season on August 15th!",
        tekblok_desc: "Click to get information about new season details and added features.",
        survival_title: "Survival Server is Active on May 3rd at 18:00!",
        survival_desc: "Legendary Survival experience begins. Take a look at the details now.",
        bedwars_title: "Bedwars New Season is Active on April 19th at 18:00!",
        bedwars_desc: "Competition is heating up! New maps and rewards await you.",
        towny_title: "Weekly Towny Tournament Begins!",
        towny_desc: "Establish your kingdom, gather your army and win the grand prize."
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