// 1. Geri Sayım Sistemi (Senin Orijinal Kodun)
const launchDate = new Date(2026, 6, 10, 20, 0, 0); 

function updateCountdown() {
  const now = new Date();
  const diff = launchDate - now;
  const ids = ["days", "hours", "minutes", "seconds"];
  
  if (diff <= 0) {
    ids.forEach(id => { if(document.getElementById(id)) document.getElementById(id).textContent = "00"; });
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const vals = [days, hours, minutes, seconds];
  ids.forEach((id, i) => {
    const el = document.getElementById(id);
    if(el) el.textContent = String(vals[i]).padStart(2, "0");
  });
}
setInterval(updateCountdown, 1000);
updateCountdown();

// 2. KESİN ÇÖZÜM: VERİ SABİTLEME VE ONAY EKRANI (DİL SİSTEMİ MANTIĞI)
document.addEventListener('DOMContentLoaded', () => {
  const emailForm = document.getElementById("email-form");
  const successDiv = document.getElementById("success");
  const emailInput = document.querySelector('input[type="email"]');
  const messageInput = document.querySelector('textarea');

  // HAFIZADAN OKU (Dil kodundaki savedLang gibi)
  const isRegistered = localStorage.getItem('mertix_registered');
  const savedMail = localStorage.getItem('mertix_user_mail');
  const savedMsg = localStorage.getItem('mertix_user_msg');

  // Eğer daha önce gönderildiyse veya veri varsa doğrudan YEŞİL MESAJI göster
  if (isRegistered === 'true' || (savedMail && savedMail.includes("@"))) {
    if (emailForm) emailForm.style.display = "none";
    if (successDiv) {
      successDiv.classList.remove("hidden");
      successDiv.style.display = "block";
    }
  }

  // Yazı yazıldıkça hafızaya işle (Hiç gitmemesi için)
  if (emailInput) {
    if (savedMail) emailInput.value = savedMail;
    emailInput.addEventListener('input', (e) => {
      localStorage.setItem('mertix_user_mail', e.target.value);
    });
  }

  if (messageInput) {
    if (savedMsg) messageInput.value = savedMsg;
    messageInput.addEventListener('input', (e) => {
      localStorage.setItem('mertix_user_msg', e.target.value);
    });
  }

  // FORM GÖNDERİLDİĞİNDE
  if (emailForm) {
    emailForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      // Kayıt durumunu hafızaya mühürle (Yenileyince yeşil mesaj gelsin diye)
      localStorage.setItem('mertix_registered', 'true');
      
      emailForm.style.display = "none";
      if (successDiv) {
        successDiv.classList.remove("hidden");
        successDiv.style.display = "block";
      }
    });
  }
});