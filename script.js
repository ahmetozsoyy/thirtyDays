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

  bolgeDropdown.addEventListener("change", () => {
    const secilenBolge = bolgeDropdown.value;
    const sehirler = bolgeSehirVerileri[secilenBolge] || [];

    sehirDropdown.innerHTML = "<option value=''>Şehir Seçin</option>";
    geziYerleriDiv.innerHTML = "";
    sehirBaslik.textContent = "";
    favorilerContainer.style.display = "none"; 

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
    favorilerContainer.style.display = "none";
    sehirBaslik.textContent = "";

    if (secilenSehir) {
      if (yerler.length > 0) {
        sehirBaslik.textContent = `${secilenSehir} Keşif Rehberi`;
        yerler.forEach(yer => {
          const favoriKey = `${secilenSehir}-${yer.isim}`;
          const isFavori = favoriler.has(favoriKey);
          const iconClass = isFavori ? "ph-fill ph-heart" : "ph ph-heart";
          const btnClass = isFavori ? "fav-icon-btn active" : "fav-icon-btn";

          const yerDiv = document.createElement("div");
          yerDiv.className = "gezi-karti";
          
          let resimHtml = yer.resim ? `
            <div class="card-image-wrapper">
                <button class="${btnClass}" data-key="${favoriKey}" title="Favorilere Ekle/Çıkar">
                    <i class="${iconClass}"></i>
                </button>
                <a href="${yer.resim}" data-lightbox="galeri" data-title="${yer.isim}">
                    <img src="${yer.resim}" alt="${yer.isim}">
                </a>
            </div>
          ` : `
             <div class="card-image-wrapper" style="background:#eee; display:flex; align-items:center; justify-content:center;">
                <button class="${btnClass}" data-key="${favoriKey}" title="Favorilere Ekle/Çıkar">
                    <i class="${iconClass}"></i>
                </button>
                <i class="ph ph-image" style="font-size:3rem; color:#ccc;"></i>
             </div>
          `;

          yerDiv.innerHTML = `
            ${resimHtml}
            <div class="card-content">
                <h2>${yer.isim}</h2>
                <p>${yer.aciklama}</p>
                <div class="card-map">
                    <iframe 
                    src="https://www.google.com/maps?q=${encodeURIComponent(yer.isim)}&output=embed" 
                    allowfullscreen="" 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
          `;
          geziYerleriDiv.appendChild(yerDiv);
        });

        // Favori buton event'leri
        document.querySelectorAll(".fav-icon-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            const key = btn.dataset.key;
            const icon = btn.querySelector("i");
            if (favoriler.has(key)) {
              favoriler.delete(key);
              btn.classList.remove("active");
              icon.className = "ph ph-heart";
            } else {
              favoriler.add(key);
              btn.classList.add("active");
              icon.className = "ph-fill ph-heart";
            }
          });
        });
      } else {
        sehirBaslik.textContent = `${secilenSehir} için henüz kayıt yok`;
        geziYerleriDiv.innerHTML = "<p style='color:var(--text-muted);'>Bu şehirde henüz bir yer bilgisi eklenmemiş. Yeni keşifler yolda!</p>";
      }
    }
  });

  favorilerBtn.addEventListener("click", () => {
    if (favorilerContainer.style.display === "none" || favorilerContainer.style.display === "") {
      favorilerContainer.style.display = "block";
      favorilerAlani.innerHTML = "";

      if (favoriler.size === 0) {
        favorilerAlani.innerHTML = "<p style='color:var(--text-muted); padding: 20px 0;'>Henüz favori listenize bir yer eklemediniz.</p>";
        // scroll to favorites
        document.getElementById("favorilerBaslik").scrollIntoView({ behavior: 'smooth' });
        return;
      }

      favoriler.forEach(key => {
        const [sehir, isim] = key.split("-");
        const yer = (sehirVerileri[sehir] || []).find(y => y.isim === isim);

        if (yer) {
          const yerDiv = document.createElement("div");
          yerDiv.className = "gezi-karti";
          
          let resimHtml = yer.resim ? `
            <div class="card-image-wrapper">
                <a href="${yer.resim}" data-lightbox="galeri" data-title="${isim}">
                    <img src="${yer.resim}" alt="${isim}">
                </a>
            </div>
          ` : "";

          yerDiv.innerHTML = `
            ${resimHtml}
            <div class="card-content">
                <h2>${isim} <span style="font-size: 1rem; color:var(--text-muted); font-weight:normal;">(${sehir})</span></h2>
                <p>${yer.aciklama}</p>
                <div class="card-map">
                    <iframe 
                    src="https://www.google.com/maps?q=${encodeURIComponent(yer.isim)}&output=embed" 
                    allowfullscreen="" 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
          `;
          favorilerAlani.appendChild(yerDiv);
        }
      });
      // Scroll to favorites
      document.getElementById("favorilerBaslik").scrollIntoView({ behavior: 'smooth' });
    } else {
      favorilerContainer.style.display = "none";
    }
  });

  // Giriş ekranından geçiş ve scroll kilidini kaldırma
  document.getElementById("baslaBtn").addEventListener("click", () => {
    const girisEkrani = document.getElementById("giris-ekrani");
    const sehirEkrani = document.getElementById("sehir-secim-ekrani");

    girisEkrani.classList.add("fade-out");

    setTimeout(() => {
      girisEkrani.style.display = "none";
      document.body.classList.remove("locked-scroll"); // SCROLL KILIDINI KALDIR
      sehirEkrani.style.display = "block";
      sehirEkrani.classList.add("show");
    }, 500);
  });

  // Lightbox opsiyonları
  if (typeof lightbox !== "undefined") {
    lightbox.option({
      'resizeDuration': 200,
      'wrapAround': true
    });
  }
});
