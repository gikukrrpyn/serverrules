  const marriedList = [
    // {
       // username1: "",
       // username2: "",
       // date: "xxxx-xx-xx", // рік-місяць-число
       // photo1: "",
       // photo2: ""
      // },
      
    ];

   const container = document.getElementById("married-list");
const searchInput = document.getElementById("searchInput");


function renderPairs(pairs, isSearch = false) {
  container.innerHTML = "";

  if (pairs.length === 0) {
    if (isSearch) {
      container.innerHTML = "<p class='text-center text-white font-bold col-span-full bg-black px-4 py-1 rounded'>Нічого не знайдено</p>";
    }
    return;
  }

  pairs.forEach(pair => {
    const card = document.createElement("div");
    card.className = "married-card";
    card.innerHTML = `
      <div class="pair">
        <img src="${pair.photo1}" alt="${pair.username1}" />
        <span>${pair.username1}</span>
      </div>
      <div class="heart">❤️</div>
      <div class="pair">
        <img src="${pair.photo2}" alt="${pair.username2}" />
        <span>${pair.username2}</span>
      </div>
      <p class="date">Дата одруження: ${pair.date}</p>
    `;
    container.appendChild(card);
  });
}


renderPairs(marriedList);


searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    renderPairs(marriedList);
    return;
  }

  const filtered = marriedList.filter(pair =>
    pair.username1.toLowerCase().includes(query) || pair.username2.toLowerCase().includes(query)
  );

  renderPairs(filtered, true); 
});

document.addEventListener("DOMContentLoaded", () => {
  const totalMarried = document.querySelectorAll(".married-card").length;
  document.getElementById("married-total").textContent = totalMarried;
});