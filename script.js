document.addEventListener("DOMContentLoaded", () => {
    const sehirDropdown = document.getElementById("sehirSec");
  
    for (const sehir in sehirVerileri) {
      const option = document.createElement("option");
      option.value = sehir;
      option.textContent = sehir;
      sehirDropdown.appendChild(option);
    }
  
    // Henüz tıklama olayı yok - yarın ekleyeceğiz
  });
  