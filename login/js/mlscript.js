import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBCc2kBQwe6rC1BsBiByE0ii73yr3Auqcs",
    authDomain: "mertixnetwork.firebaseapp.com",
    projectId: "mertixnetwork",
    storageBucket: "mertixnetwork.firebasestorage.app",
    messagingSenderId: "996647513200",
    appId: "1:996647513200:web:eb79f6ee424ed8598b1b5",
    measurementId: "G-D7WHHD6KNX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Mertix: Firebase Sistemi Hazır!");

const loginForm = document.getElementById('adminLoginForm');

if (loginForm) {
    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        console.log("Mertix: Kontrol başlıyor...");

        const adminId = document.getElementById('adminId').value.trim();
        const adminPass = document.getElementById('adminPass').value.trim();
        const errorMsg = document.getElementById('error-msg');

        try {
            // BURASI KRİTİK: Doküman ismini 'mertix' olarak düzelttik
            const adminRef = doc(db, "settings", "admin");
            const adminSnap = await getDoc(adminRef);

            if (adminSnap.exists()) {
                const data = adminSnap.data();
                console.log("Veritabanı içeriği çekildi.");

                // Firestore alanları: Username ve Password (Büyük/Küçük harf duyarlı)
                if (data.username === adminId && data.password === adminPass) {
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("adminUser", data.username);
                    window.location.href = "../index.html?auth=true";
                } else {
                    if (errorMsg) errorMsg.style.display = 'block';
                }
            } else {
                // Eğer hala buraya düşüyorsa Firestore görselindeki 'mertix' yazısını silip 
                // elinle tekrar 'mertix' yaz (boşluk kalmış olabilir).
                alert("HATA: Veritabanında 'settings/admin' yolu bulunamadı!");
            }
        } catch (error) {
            console.error("Hata:", error);
            alert("Bağlantı hatası oluştu.");
        }
    });
}