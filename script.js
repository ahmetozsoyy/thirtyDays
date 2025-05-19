document.addEventListener("DOMContentLoaded", () => {
  const bolgeDropdown = document.getElementById("bolgeSec");
  const sehirDropdown = document.getElementById("sehirSec");
  const geziYerleriDiv = document.getElementById("geziYerleri");
  const sehirBaslik = document.getElementById("sehirBaslik");

  // Bölge-Şehir verileri
  const bolgeSehirVerileri = {
    Marmara: ["İstanbul", "Tekirdağ", "Edirne", "Kırklareli", "Balıkesir", "Çanakkale", "Bursa", "Bilecik", "Sakarya", "Kocaeli", "Yalova"],
    Karadeniz: ["Amasya", "Artvin", "Bartın", "Bayburt", "Bolu", "Çorum", "Düzce", "Gümüşhane", "Giresun", "Karabük", "Kastamonu", "Ordu", "Rize", "Samsun", "Sinop", "Tokat", "Trabzon", "Zonguldak"],
    Akdeniz: ["Adana", "Antalya", "Burdur", "Hatay", "Isparta", "Mersin", "Osmaniye", "Kahramanmaraş"],
    Ege: ["İzmir", "Manisa", "Aydın", "Denizli", "Muğla", "Afyonkarahisar", "Kütahya", "Uşak"],
    Ic_Anadolu: ["Aksaray", "Ankara", "Çankırı", "Eskişehir", "Karaman", "Kayseri", "Kırıkkale", "Kırşehir", "Konya", "Nevşehir", "Niğde", "Sivas", "Yozgat"],
    Dogu_Anadolu: ["Elazığ", "Erzincan", "Erzurum", "Malatya", "Tunceli", "Kars", "Iğdır", "Ardahan", "Van", "Bingöl", "Hakkari", "Bitlis", "Ağrı", "Muş"],
    Guneydogu_Anadolu: ["Gaziantep", "Diyarbakır", "Şanlıurfa", "Batman", "Adıyaman", "Siirt", "Mardin", "Kilis", "Şırnak"]
  };

  // Bölge seçildiğinde şehir listesini güncelle
  bolgeDropdown.addEventListener("change", () => {
    const secilenBolge = bolgeDropdown.value;
    const sehirler = bolgeSehirVerileri[secilenBolge] || [];

    // Şehir dropdown'ını temizle
    sehirDropdown.innerHTML = "<option value=''>--Şehir Seçin--</option>";

    if (secilenBolge && sehirler.length > 0) {
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

    // Gezilecek yerler ve başlığı temizle
    geziYerleriDiv.innerHTML = "";
    sehirBaslik.textContent = "";
  });

  // Şehir seçildiğinde gezilecek yerleri göster
  sehirDropdown.addEventListener("change", () => {
    const secilenSehir = sehirDropdown.value;
    const yerler = sehirVerileri[secilenSehir] || [];

    geziYerleriDiv.innerHTML = "";

    if (yerler.length > 0) {
      sehirBaslik.textContent = `${secilenSehir}’da Gezilecek Yerler`;
      yerler.forEach(yer => {
        const yerDiv = document.createElement("div");
        yerDiv.className = "gezi-karti";
        yerDiv.innerHTML = `
          <h2>${yer.isim}</h2>
          <p>${yer.aciklama}</p>
          ${
            yer.resim
              ? `<a href="${yer.resim}" data-lightbox="galeri" data-title="${yer.isim}">
                   <img src="${yer.resim}" alt="${yer.isim}">
                 </a>`
              : ""
          }
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
    } else {
      geziYerleriDiv.innerHTML = "<p>Bu şehirde henüz bir yer bilgisi yok.</p>";
      sehirBaslik.textContent = "";
    }
  });

  // Giriş ekranından şehir seçimine yumuşak geçiş
  document.getElementById("baslaBtn").addEventListener("click", () => {
    const girisEkrani = document.getElementById("giris-ekrani");
    const sehirEkrani = document.getElementById("sehir-secim-ekrani");

    // Giriş ekranını yavaşça gizle
    girisEkrani.classList.add("fade-out");

    // 700ms sonra giriş ekranını gizle, seçim ekranını göster
    setTimeout(() => {
      girisEkrani.style.display = "none";
      sehirEkrani.style.display = "block";
      sehirEkrani.classList.add("show");
    }, 700);
  });

  // Lightbox opsiyonları (isteğe bağlı)
  if (typeof lightbox !== "undefined") {
    lightbox.option({
      // history: false
    });
  }
});
