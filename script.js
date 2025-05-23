document.addEventListener("DOMContentLoaded", () => {
  const bolgeDropdown = document.getElementById("bolgeSec");
  const sehirDropdown = document.getElementById("sehirSec");
  const geziYerleriDiv = document.getElementById("geziYerleri");
  const sehirBaslik = document.getElementById("sehirBaslik");
  const favorilerBtn = document.getElementById("favorilerBtn");
  const favorilerDiv = document.getElementById("favorilerAlani");

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

  bolgeDropdown.addEventListener("change", () => {
    const secilenBolge = bolgeDropdown.value;
    const sehirler = bolgeSehirVerileri[secilenBolge] || [];

    sehirDropdown.innerHTML = "<option value=''>--Şehir Seçin--</option>";
    geziYerleriDiv.innerHTML = "";
    sehirBaslik.textContent = "";

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
    favorilerDiv.innerHTML = "";

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
            <button class="favori-btn" data-key="${favoriKey}" data-sehir="${secilenSehir}">${favoriYazi}</button>
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

  // Favoriler butonuna tıklandığında favorileri göster
  favorilerBtn.addEventListener("click", () => {
    favorilerDiv.innerHTML = "<h2>Favori Yerler</h2>";

    if (favoriler.size === 0) {
      favorilerDiv.innerHTML += "<p>Henüz favori eklenmemiş.</p>";
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
        favorilerDiv.appendChild(yerDiv);
      }
    });
  });

  // Giriş ekranından şehir ekranına geçiş
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

  // Lightbox ayarları
  if (typeof lightbox !== "undefined") {
    lightbox.option({
      // isteğe bağlı
    });
  }
});
