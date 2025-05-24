document.addEventListener("DOMContentLoaded", () => {
  const bolgeDropdown = document.getElementById("bolgeSec");
  const sehirDropdown = document.getElementById("sehirSec");
  const geziYerleriDiv = document.getElementById("geziYerleri");
  const sehirBaslik = document.getElementById("sehirBaslik");
  const favorilerBtn = document.getElementById("favorilerBtn");
  const favorilerContainer = document.getElementById("favorilerContainer");
  const favorilerAlani = document.getElementById("favorilerAlani");

  const favoriler = new Set();

  const bolgeSehirVerileri = {
    Marmara: ["İstanbul", "Tekirdağ", "Edirne", "Kırklareli", "Balıkesir", "Çanakkale", "Bursa", "Bilecik", "Sakarya", "Kocaeli", "Yalova"],
    Karadeniz: ["Amasya", "Artvin", "Bartın", "Bayburt", "Bolu", "Çorum", "Düzce", "Gümüşhane", "Giresun", "Karabük", "Kastamonu", "Ordu", "Rize", "Samsun", "Sinop", "Tokat", "Trabzon", "Zonguldak"],
    Akdeniz: ["Adana", "Antalya", "Burdur", "Hatay", "Isparta", "Mersin", "Osmaniye", "Kahramanmaraş"],
    Ege: ["İzmir", "Manisa", "Aydın", "Denizli", "Muğla", "Afyonkarahisar", "Kütahya", "Uşak"],
    Ic_Anadolu: ["Aksaray", "Ankara", "Çankırı", "Eskişehir", "Karaman", "Kayseri", "Kırıkkale", "Kırşehir", "Konya", "Nevşehir", "Niğde", "Sivas", "Yozgat"],
    Dogu_Anadolu: ["Elazığ", "Erzincan", "Erzurum", "Malatya", "Tunceli", "Kars", "Iğdır", "Ardahan", "Van", "Bingöl", "Hakkari", "Bitlis", "Ağrı", "Muş"],
    Guneydogu_Anadolu: ["Gaziantep", "Diyarbakır", "Şanlıurfa", "Batman", "Adıyaman", "Siirt", "Mardin", "Kilis", "Şırnak"]
  };

  // Burada sehirVerileri isimli değişkenin data.js'den geldiğini varsayıyorum.
  // Eğer yoksa, data.js'deki verileri uygun şekilde doldurman gerekir.

  bolgeDropdown.addEventListener("change", () => {
    const secilenBolge = bolgeDropdown.value;
    const sehirler = bolgeSehirVerileri[secilenBolge] || [];

    sehirDropdown.innerHTML = "<option value=''>--Şehir Seçin--</option>";
    geziYerleriDiv.innerHTML = "";
    sehirBaslik.textContent = "";
    favorilerContainer.style.display = "none"; // Favorileri kapat

    if (sehirler.length > 0) {
      sehirler.forEach(sehir => {
        const option = document.createElement("option");
        option.value = sehir;
        option.textContent = sehir;
        sehirDropdown.appendChild(option);
      });
      sehirDropdown.disabled = false;
    } else {
      sehirDropdown.disabled = true;
    }
  });

  sehirDropdown.addEventListener("change", () => {
    const secilenSehir = sehirDropdown.value;
    const yerler = sehirVerileri[secilenSehir] || [];

    geziYerleriDiv.innerHTML = "";
    favorilerAlani.innerHTML = "";
    favorilerContainer.style.display = "none"; // Favorileri kapat
    sehirBaslik.textContent = "";

    if (secilenSehir) {
      if (yerler.length > 0) {
        sehirBaslik.textContent = `${secilenSehir} Şehrinde Gezilecek Yerler`;
        yerler.forEach(yer => {
          const favoriKey = `${secilenSehir}-${yer.isim}`;
          const isFavori = favoriler.has(favoriKey);
          const favoriYazi = isFavori ? "★ Favoriden Çıkar" : "☆ Favorilere Ekle";

          const yerDiv = document.createElement("div");
          yerDiv.className = "gezi-karti";
          yerDiv.innerHTML = `
            <h2>${yer.isim}</h2>
            <p>${yer.aciklama}</p>
            <button class="favori-btn" data-key="${favoriKey}">${favoriYazi}</button>
            ${yer.resim ? `
              <a href="${yer.resim}" data-lightbox="galeri" data-title="${yer.isim}">
                <img src="${yer.resim}" alt="${yer.isim}">
              </a>` : ""}
            <iframe 
              src="https://www.google.com/maps?q=${encodeURIComponent(yer.isim)}&output=embed" 
              width="100%" height="250" 
              style="border:0; margin-top: 10px;" 
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          `;
          geziYerleriDiv.appendChild(yerDiv);
        });

        // Favori butonlarına tıklandığında favoriler setini güncelle
        document.querySelectorAll(".favori-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            const key = btn.dataset.key;
            if (favoriler.has(key)) {
              favoriler.delete(key);
              btn.textContent = "☆ Favorilere Ekle";
            } else {
              favoriler.add(key);
              btn.textContent = "★ Favoriden Çıkar";
            }
          });
        });
      } else {
        sehirBaslik.textContent = `${secilenSehir} için kayıtlı yer bulunamadı`;
        geziYerleriDiv.innerHTML = "<p>Bu şehirde henüz bir yer bilgisi yok.</p>";
      }
    }
  });

  favorilerBtn.addEventListener("click", () => {
    if (favorilerContainer.style.display === "none" || favorilerContainer.style.display === "") {
      favorilerContainer.style.display = "block";

      favorilerAlani.innerHTML = "";

      if (favoriler.size === 0) {
        favorilerAlani.innerHTML = "<p>Henüz favori eklenmemiş.</p>";
        return;
      }

      favoriler.forEach(key => {
        const [sehir, isim] = key.split("-");
        const yer = (sehirVerileri[sehir] || []).find(y => y.isim === isim);

        if (yer) {
          const yerDiv = document.createElement("div");
          yerDiv.className = "gezi-karti";
          yerDiv.innerHTML = `
            <h2>${isim} (${sehir})</h2>
            <p>${yer.aciklama}</p>
            ${yer.resim ? `
              <a href="${yer.resim}" data-lightbox="galeri" data-title="${isim}">
                <img src="${yer.resim}" alt="${isim}">
              </a>` : ""}
            <iframe 
              src="https://www.google.com/maps?q=${encodeURIComponent(yer.isim)}&output=embed" 
              width="100%" height="250" 
              style="border:0; margin-top: 10px;" 
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          `;
          favorilerAlani.appendChild(yerDiv);
        }
      });
    } else {
      favorilerContainer.style.display = "none";
    }
  });

  // Giriş ekranından şehir seçim ekranına geçiş
  document.getElementById("baslaBtn").addEventListener("click", () => {
    const girisEkrani = document.getElementById("giris-ekrani");
    const sehirEkrani = document.getElementById("sehir-secim-ekrani");

    girisEkrani.classList.add("fade-out");

    setTimeout(() => {
      girisEkrani.style.display = "none";
      sehirEkrani.style.display = "block";
      sehirEkrani.classList.add("show");
    }, 700);
  });

  // Lightbox opsiyonları (varsa)
  if (typeof lightbox !== "undefined") {
    lightbox.option({
      // opsiyonları buraya ekleyebilirsin
    });
  }
});
