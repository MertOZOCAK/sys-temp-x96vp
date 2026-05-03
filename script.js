function updateTimer() {
    // Hedef tarih ayarı (Yıl, Ay-1, Gün, Saat, Dakika)
    // Örn: 15 Mayıs 2026, 18:00 için (2026, 4, 15, 18, 0, 0)
    const targetDate = new Date(2026, 3, 10, 20, 0, 0).getTime(); 

    const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const diff = targetDate - now;

        const timerContainer = document.getElementById("timer");

        if (diff <= 0) {
            clearInterval(timerInterval);
    
    const currentLang = localStorage.getItem('siteLang') || 'tr';
    const startText = translations[currentLang]?.event_status || "ETKİNLİK BAŞLADI!";
    
    // Sadece içeriği değil, sınıfı da güncelleyerek merkeze alalım
    timerContainer.innerHTML = `<div class="event-started-wrapper" data-key="event_status">${startText}</div>`;
    
    // Hizalamayı zorla merkeze çekmek için:
    // script.js içindeki if (diff <= 0) bloğuna ekle
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

let botGreetingSent = false;

function toggleChat() {
    const chat = document.getElementById('chatWindow');
    
    if (chat.classList.contains('active')) {
        // --- KAPANIŞ ANİMASYONU ---
        chat.classList.remove('active'); // Önce görsel efekt başlasın
        
        // Animasyonun bitmesini (0.4s) bekle ve sonra tamamen gizle
        setTimeout(() => {
            chat.style.display = 'none';
        }, 400); 
    } else {
        // --- AÇILIŞ ANİMASYONU ---
        chat.style.display = 'flex';
        
        // Tarayıcının render alması için 10ms gecikmeyle sınıfı ekle
        setTimeout(() => {
            chat.classList.add('active');
        }, 10);

        if (!botGreetingSent) {
            botProcessReply("Merhaba! Mertix Network'e hoş geldiniz. Nasıl yardımcı olabilirim?");
            botGreetingSent = true;
        }
    }
}

// Botun her türlü yanıtını (hazır veya manuel) işleyen ana fonksiyon
function botProcessReply(replyText) {
    const chatBody = document.getElementById('chatBody');

    // 1. Yazıyor animasyonunu (noktaları) oluştur
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing';
    typingDiv.id = 'temp-typing';
    typingDiv.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;

    // 2. 3 ile 5 saniye arasında rastgele bir bekleme süresi ayarla
    const waitTime = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000;

    setTimeout(() => {
        // Animasyonu kaldır
        const temp = document.getElementById('temp-typing');
        if (temp) temp.remove();

        // Gerçek mesajı ekle
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message bot-msg';
        msgDiv.innerText = replyText;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, waitTime);
}

// Hazır mesajlara tıklandığında çalışır
function sendQuickMessage(userText) {
    addMessage(userText, 'user-msg'); // Kullanıcı mesajını anında ekle
    
    // Hazır mesajlara göre botun vereceği cevapları belirle
    let botResponse = "Bu konu hakkında talebiniz yetkililere iletildi. Lütfen bekleyin.";
    
    if(userText.includes('IP')) botResponse = "Sunucu IP adresimiz: play.mertixnetwork.com";
    if(userText.includes('Mağaza')) botResponse = "Mağaza işlemleriniz için magaza.mertixnetwork.com adresini ziyaret edebilirsiniz.";
    if(userText.includes('Yetkili')) botResponse = "Yetkili başvuruları şu an Discord üzerinden alınmaktadır.";

    botProcessReply(botResponse);
}

// Manuel mesaj gönderildiğinde çalışır
function sendMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (text !== "") {
        addMessage(text, 'user-msg');
        input.value = "";
        
        // Manuel mesajlara botun vereceği genel yanıt
        botProcessReply("Mesajınız geçersiz, lütfen tekrar deneyin.");
    }
}

// Sayfa yüklendiğinde Enter takibini başlat
document.getElementById('chatInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Kullanıcı mesajlarını anında ekrana basan yardımcı fonksiyon
function addMessage(text, type) {
    const chatBody = document.getElementById('chatBody');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${type}`;
    msgDiv.innerText = text;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

window.addEventListener('scroll', function() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    // Sayfa 300px aşağı kaydırıldığında 'show' sınıfını ekle
    if (window.scrollY > 1) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});