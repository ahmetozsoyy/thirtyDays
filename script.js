document.addEventListener("DOMContentLoaded", () => {
  const bolgeDropdown = document.getElementById("bolgeSec");
  const sehirDropdown = document.getElementById("sehirSec");
  const geziYerleriDiv = document.getElementById("geziYerleri");
  const sehirBaslik = document.getElementById("sehirBaslik");

  // Şehir verilerini
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
    console.log("Seçilen Bölge:", secilenBolge);  // Bölgeyi kontrol et
    const sehirler = bolgeSehirVerileri[secilenBolge];
    console.log("Seçilen Bölgenin Şehirleri:", sehirler);  // Şehirleri kontrol et
  
    // Şehir dropdown'ını temizle
    sehirDropdown.innerHTML = "<option value=''>--Şehir Seçin--</option>";
  
    if (secilenBolge && sehirler) {
      // Şehir seçeneklerini ekle
      sehirler.forEach(sehir => {
        const option = document.createElement("option");
        option.value = sehir;
        option.textContent = sehir;
        sehirDropdown.appendChild(option);
      });
  
      // Şehir dropdown'ını aktif yap
      sehirDropdown.disabled = false;
    } else {
      // Bölge seçilmediyse şehir dropdown'ını devre dışı bırak
      sehirDropdown.disabled = true;
    }
  });

  // Şehir seçilince gezilecek yerleri göster
  sehirDropdown.addEventListener("change", () => {
    const secilenSehir = sehirDropdown.value;
    const yerler = sehirVerileri[secilenSehir];

    // Önceki içeriği temizle
    geziYerleriDiv.innerHTML = "";

    if (yerler && yerler.length > 0) {
      sehirBaslik.textContent = `${secilenSehir}’da Gezilecek Yerler`; // Şehir Başlığı
      yerler.forEach(yer => {
        const yerDiv = document.createElement("div");
        yerDiv.className = "gezi-karti";
        yerDiv.innerHTML = `
          <h2>${yer.isim}</h2>
          <p>${yer.aciklama}</p>
          ${yer.resim ? `<img src="${yer.resim}" alt="${yer.isim}">` : ""}
        `;
        geziYerleriDiv.appendChild(yerDiv);
      });
    } else {
      geziYerleriDiv.innerHTML = "<p>Bu şehirde henüz bir yer bilgisi yok.</p>";
      sehirBaslik.textContent = ""; // Şehir başlığını temizle
    }
  });
});
