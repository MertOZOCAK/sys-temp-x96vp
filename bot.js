let botGreetingSent = false;

// Sohbet Penceresini Açma/Kapama
function toggleChat() {
    const chat = document.getElementById('chatWindow');
    
    if (chat.classList.contains('active')) {
        chat.classList.remove('active');
        setTimeout(() => {
            chat.style.display = 'none';
        }, 400); 
    } else {
        chat.style.display = 'flex';
        setTimeout(() => {
            chat.classList.add('active');
        }, 10);

        // İlk açılışta butonlu mesaj gönder
        if (!botGreetingSent) {
            const welcomeText = "Merhaba! Mertix Network'e hoş geldin. Senin için ne yapabilirim? Aşağıdaki seçeneklerden birini seçebilirsin:";
            
            // Hazır seçenek butonları
            const quickOptions = [
                { label: "📍 Sunucu IP nedir?", value: "IP" },
                { label: "🛒 Mağaza ve VIP", value: "Mağaza" },
                { label: "🎮 Oyun Modları", value: "Oyunlar" },
                { label: "🔥 Gaming Gecesi", value: "Gaming Gecesi" }
            ];

            // Bot mesajını butonlarla birlikte gönder
            botProcessReply(welcomeText, null, quickOptions);
            botGreetingSent = true;
        }
    }
}

// Bot Yanıt İşleme (Yazıyor... Animasyonu Dahil)
function botProcessReply(replyText, buttonData = null, quickOptions = null) {
    const chatBody = document.getElementById('chatBody');

    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing';
    typingDiv.id = 'temp-typing';
    typingDiv.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;

    // --- DİNAMİK SÜRE HESAPLAMA ---
    // Her karakter için yaklaşık 50ms ekle, ancak bu süreyi 4sn ile 10sn arasına sabitle.
    const charCount = replyText.length;
    let calculatedTime = charCount * 50; 

    // Süreyi minimum 4000ms (4sn), maksimum 10000ms (10sn) olacak şekilde sınırla
    if (calculatedTime < 4000) calculatedTime = 4000;
    if (calculatedTime > 10000) calculatedTime = 10000;

    // Biraz rastgelelik ekle (+/- 500ms) ki robotik durmasın
    const finalWaitTime = calculatedTime + (Math.random() * 1000 - 500);

    setTimeout(() => {
        const temp = document.getElementById('temp-typing');
        if (temp) temp.remove();

        const msgDiv = document.createElement('div');
        msgDiv.className = 'message bot-msg has-button';
        
        const textSpan = document.createElement('span');
        textSpan.innerText = replyText;
        msgDiv.appendChild(textSpan);

        if (buttonData) {
            const btn = document.createElement('button');
            btn.className = 'bot-inline-btn';
            btn.innerHTML = buttonData.label;
            btn.onclick = () => handleLinkAction(buttonData.url);
            msgDiv.appendChild(btn);
        }

        if (quickOptions) {
            const optionsWrapper = document.createElement('div');
            optionsWrapper.className = 'quick-options-wrapper';
            
            quickOptions.forEach(option => {
                const optBtn = document.createElement('button');
                optBtn.className = 'quick-option-btn';
                optBtn.innerText = option.label;
                optBtn.onclick = () => {
                    addMessage(option.label, 'user-msg');
                    handleBotLogic(option.value);
                };
                optionsWrapper.appendChild(optBtn);
            });
            msgDiv.appendChild(optionsWrapper);
        }

        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, finalWaitTime);
}

// Hızlı Mesaj Butonları İçin İşleyici
function sendQuickMessage(userText) {
    addMessage(userText, 'user-msg');
    handleBotLogic(userText);
}

// Manuel Mesaj Gönderme
function sendMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (text !== "") {
        addMessage(text, 'user-msg');
        input.value = "";
        handleBotLogic(text);
    }
}

// Bot Yanıt İşleme (Buton Desteği Eklendi)
function botProcessReply(replyText, buttonData = null, quickOptions = null) {
    const chatBody = document.getElementById('chatBody');

    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing';
    typingDiv.id = 'temp-typing';
    typingDiv.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;

    const waitTime = 1500; // İlk açılışta çok bekletmemek için süreyi sabitledim

    setTimeout(() => {
        const temp = document.getElementById('temp-typing');
        if (temp) temp.remove();

        const msgDiv = document.createElement('div');
        msgDiv.className = 'message bot-msg has-button';
        
        const textSpan = document.createElement('span');
        textSpan.innerText = replyText;
        msgDiv.appendChild(textSpan);

        // 1. Eğer detaylı bilgi (URL) butonu varsa ekle
        if (buttonData) {
            const btn = document.createElement('button');
            btn.className = 'bot-inline-btn';
            btn.innerHTML = buttonData.label;
            btn.onclick = () => handleLinkAction(buttonData.url);
            msgDiv.appendChild(btn);
        }

        // 2. Eğer hızlı seçim butonları (sorular) varsa ekle
        if (quickOptions) {
            const optionsWrapper = document.createElement('div');
            optionsWrapper.className = 'quick-options-wrapper';
            
            quickOptions.forEach(option => {
                const optBtn = document.createElement('button');
                optBtn.className = 'quick-option-btn';
                optBtn.innerText = option.label;
                optBtn.onclick = () => {
                    addMessage(option.label, 'user-msg'); // Kullanıcı seçmiş gibi ekrana bas
                    handleBotLogic(option.value); // Mantık merkezine gönder
                };
                optionsWrapper.appendChild(optBtn);
            });
            msgDiv.appendChild(optionsWrapper);
        }

        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, waitTime);
}

// Link ve Scroll yönetimi için yardımcı fonksiyon
function handleLinkAction(url) {
    if (url.startsWith('#')) {
        toggleChat();
        const target = document.querySelector(url);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    } else {
        window.open(url, '_blank');
    }
}

// BOT MANTIK MERKEZİ (Genişletilmiş Soru Havuzu)
function handleBotLogic(userInput) {
    const text = userInput.toLowerCase(); // Bu satır sayesinde "IP", "ip" veya "Ip" yazılması fark etmez.
    let botResponse = "";
    let btnDetails = null;

    // --- 1. IP VE BAĞLANTI ---
    if (text.includes("ip") || text.includes("adres") || text.includes("nasıl girerim")) {
        botResponse = "Mertix Network'e mertix.network adresinden katılabilirsin. Sürüm: 1.21.11 ve üzeri!";
        btnDetails = { label: "📋 IP Kopyala", url: "error/404.html" };
    }
    // --- 2. TOWNY SEZONU ---
    else if (text.includes("towny") || text.includes("şehir") || text.includes("kasaba")) {
        botResponse = "Yeni Towny sezonunda diplomasi, savaş ve ticaret seni bekliyor! Kendi krallığını kurmaya hazır mısın?";
        btnDetails = { label: "🌍 Towny Haritası", url: "error/404.html" };
    }
    // --- 3. MAĞAZA / VIP ---
    else if (text.includes("mağaza") || text.includes("vip") || text.includes("satın al") || text.includes("kredi")) {
        botResponse = "VIP üyelikler ve özel kozmetikler için mağazamıza göz atabilirsin. Desteklerin sunucumuzun gelişmesini sağlıyor!";
        btnDetails = { label: "🛒 Mağazaya Git", url: "error/404.html" };
    }
    // --- 4. GAMING GECESİ ---
    else if (text.includes("gaming") || text.includes("gece") || text.includes("indirim")) {
        botResponse = "Gaming Gecesi her hafta muhteşem indirimlerle geliyor. Mağazadaki %50'ye varan fırsatları kaçırma!";
        btnDetails = { label: "⚡ İndirimleri Gör", url: "gamingnight/gn.html" };
    }
    // --- 5. DISCORD ---
    else if (text.includes("discord") || text.includes("dc") || text.includes("topluluk")) {
        botResponse = "Binlerce oyuncumuzun olduğu Discord sunucumuza katılarak çekilişlerden ve güncellemelerden haberdar ol!";
        btnDetails = { label: "💬 Discord'a Katıl", url: "error/404.html" };
    }
    // --- 6. KURALLAR ---
    else if (text.includes("kural") || text.includes("yasak") || text.includes("ban")) {
        botResponse = "Adil oyun her şeyden önce gelir. Küfür, hile, reklam ve toxic davranışlar ağır cezalandırılır.";
        btnDetails = { label: "📜 Kuralları Oku", url: "error/404.html" };
    }
    // --- 7. YETKİLİ ALIMI ---
    else if (text.includes("yetkili") || text.includes("rehber") || text.includes("başvuru") || text.includes("moderator")) {
        botResponse = "Ekibimize katılmak mı istiyorsun? Yetkili başvuruları dönemlik olarak Discord üzerinden açılmaktadır.";
        btnDetails = { label: "📝 Başvuru Formu", url: "error/404.html" };
    }
    // --- 8. SİSTEMLER (ItemsAdder / Kozmetik) ---
    else if (text.includes("kozmetik") || text.includes("eşya") || text.includes("texture")) {
        botResponse = "Özel doku paketimiz (Resource Pack) sayesinde sunucumuzda 3D eşyalar ve özel araçlar bulunmaktadır!";
    }
    // --- 9. SÜRÜM ---
    else if (text.includes("sürüm") || text.includes("version") || text.includes("hangi sürüm")) {
        botResponse = "En iyi deneyim için 1.21.11 sürümü ile giriş yapmanı öneriyoruz.";
    }
    // --- 10. LAG / PERFORMANS ---
    else if (text.includes("lag") || text.includes("donuyor") || text.includes("tps")) {
        botResponse = "Sunucumuz yüksek performanslı işlemcilerle korunmaktadır. Sorun yaşıyorsan internetini veya sürümünü kontrol et.";
    }
    // --- 11. ÖDEME YÖNTEMLERİ ---
    else if (text.includes("ödeme") || text.includes("papara") || text.includes("kart") || text.includes("havale")) {
        botResponse = "Mağazamızda Kredi Kartı, Havale/EFT, Papara ve Mobil Ödeme yöntemleri geçerlidir.";
    }
    // --- 12. DESTEK / TICKET ---
    else if (text.includes("destek") || text.includes("yardım") || text.includes("ticket")) {
        botResponse = "Bir sorun mu var? Discord üzerinden 'Destek Talebi' açarak yetkililerimizle doğrudan görüşebilirsin.";
    }
    // --- 13. OYUN MODLARI ---
    else if (text.includes("oyun") || text.includes("modlar") || text.includes("survival") || text.includes("skyblock")) {
        botResponse = "Şu an odak noktamız Towny! Ancak yakında Skyblock ve Survival modlarımız da eklenecektir.";
    }
    // --- 14. DÜNYA HARİTASI (Dynmap) ---
    else if (text.includes("harita") || text.includes("map") || text.includes("neredeyim")) {
        botResponse = "Dünyayı canlı olarak tarayıcın üzerinden izleyebilirsin!";
        btnDetails = { label: "🗺️ Canlı Harita", url: "error/404.html" };
    }
    // --- 15. SIRALAMA (Top) ---
    else if (text.includes("sıralama") || text.includes("zenginler") || text.includes("top")) {
        botResponse = "En zenginleri ve en güçlü krallıkları web sitemizdeki sıralama sayfasından görebilirsin.";
    }
    // --- 16. EKONOMİ ---
    else if (text.includes("para") || text.includes("ekonomi") || text.includes("nasıl kasılır")) {
        botResponse = "Towny'de çiftçilik yaparak, maden satarak veya krallığınla ticaret yaparak para kazanabilirsin.";
    }
    // --- 17. SİTE KAYIT ---
    else if (text.includes("kayıt") || text.includes("üye ol") || text.includes("register")) {
        botResponse = "Mağazayı kullanmak için web sitemize kayıt olman gerekmektedir. Oyun içindeki hesabınla eşleşecektir.";
    }
    // --- 18. ŞİFRE UNUTMA ---
    else if (text.includes("şifre") || text.includes("giremiyorum") || text.includes("şifremi unuttum")) {
        botResponse = "Şifreni unuttuysan aşağıdaki butona tıklayabilir ya da Discord üzerinden yönetim ekibine ulaşarak hesap doğrulama yapabilirsin.";
        btnDetails = { label: "📝 Şifreni Değiştir", url: "login/login.html" };
    }
    // --- 19. ŞİKAYET / RAPOR ---
    else if (text.includes("şikayet") || text.includes("rapor") || text.includes("report")) {
        botResponse = "Kural ihlali yapanları oyun içinde /report komutuyla veya Discord'da kanıtlı şekilde şikayet edebilirsin.";
    }
    // --- 20. SELAMLAŞMA ---
    else if (text.includes("selam") || text.includes("merhaba") || text.includes("sa")) {
        botResponse = "Merhaba! Mertix Network dünyasına hoş geldin. Sana nasıl yardımcı olabilirim?";
    }
    // --- BİLİNMEYEN ---
    else {
        botResponse = "Bunu tam anlayamadım. IP, Mağaza, Towny veya Destek gibi konularda soru sorabilirsin.";
        // Burada btnDetails'i istersen boş bırakabilir veya yardım butonuna çevirebilirsin
        btnDetails = null; 
    } // Hatalı parantez burada düzeltildi

    botProcessReply(botResponse, btnDetails);
}

// Enter Tuşu Takibi
document.getElementById('chatInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Mesajı Ekrana Basma (Yardımcı Fonksiyon)
function addMessage(text, type) {
    const chatBody = document.getElementById('chatBody');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${type}`;
    msgDiv.innerText = text;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Link ve Scroll yönetimi için yardımcı fonksiyon (Gecikmeli & Animasyonlu)
function handleLinkAction(url) {
    // 1. Bot onay mesajını gönderir
    addMessage("Hemen yönlendiriyorum...", 'bot');

    // 2. Zıplayan animasyonlu noktaları oluştur
    const chatBody = document.getElementById('chatBody');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot typing';
    
    // Hem noktaların boyutlarını hem de zıplama (jump) animasyonunu ekledik
    typingDiv.innerHTML = `
        <style>
            .typing span { 
                width: 6px;
                height: 6px;
                background: #f1c40f;
                border-radius: 50%;
                animation: bounce 1.4s infinite ease-in-out both;
            }

            .typing span:nth-child(1) { animation-delay: -0.32s; }
            .typing span:nth-child(2) { animation-delay: -0.16s; }

            @keyframes hopping {
                0%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-8px); }
            }
        </style>
        <span></span><span></span><span></span>
    `;
    
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;

    // 3. 1.5 saniye bekle ve aynı sekmede yönlendir
    setTimeout(() => {
        if (typingDiv) typingDiv.remove();

        if (url.startsWith('#')) {
            toggleChat();
            setTimeout(() => {
                const target = document.querySelector(url);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }, 300);
        } else {
            window.location.href = url;
        }
    }, 3000);
}