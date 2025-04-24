document.addEventListener("DOMContentLoaded", () => {
  const sehirDropdown = document.getElementById("sehirSec");
  const geziYerleriDiv = document.getElementById("geziYerleri");

  // Şehirleri dropdown'a yükle
  for (const sehir in sehirVerileri) {
    const option = document.createElement("option");
    option.value = sehir;
    option.textContent = sehir;
    sehirDropdown.appendChild(option);
  }

  // Şehir seçilince gezilecek yerleri göster
  sehirDropdown.addEventListener("change", () => {
    const secilenSehir = sehirDropdown.value;
    const yerler = sehirVerileri[secilenSehir];

    // Önceki içeriği temizle
    geziYerleriDiv.innerHTML = "";

    if (yerler && yerler.length > 0) {
      yerler.forEach((yer) => {
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
    }
  });
});
