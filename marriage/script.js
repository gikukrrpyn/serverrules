document.addEventListener("DOMContentLoaded", () => {
  const marriedList = [
    // {
    //   username1: "Anna",
    //   username2: "John",
    //   date: "2024-05-22",
    //   photo1: "photo_anna.jpg",
    //   photo2: "photo_john.jpg"
    // }
  ];
 marriedList.sort((a, b) => new Date(b.date) - new Date(a.date));

  document.querySelectorAll('.side-menu a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('side-menu').classList.remove('open');
      document.getElementById('overlay').classList.remove('active');
    });
  });

  const container = document.getElementById("married-list");
  const searchInput = document.getElementById("searchInput");
  const totalCounter = document.getElementById("married-total");

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
  totalCounter.textContent = marriedList.length;

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
      renderPairs(marriedList);
      totalCounter.textContent = marriedList.length;
      return;
    }

    const filtered = marriedList.filter(pair =>
      pair.username1.toLowerCase().includes(query) || pair.username2.toLowerCase().includes(query)
    );

    renderPairs(filtered, true);
    totalCounter.textContent = filtered.length;
  });

  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const sideMenu = document.getElementById('side-menu');
  const overlay = document.getElementById('overlay');

  if (menuToggle && menuClose && sideMenu && overlay) {
    menuToggle.addEventListener('click', () => {
      sideMenu.classList.add('open');
      overlay.classList.add('active');
    });

    menuClose.addEventListener('click', () => {
      sideMenu.classList.remove('open');
      overlay.classList.remove('active');
    });

    overlay.addEventListener('click', () => {
      sideMenu.classList.remove('open');
      overlay.classList.remove('active');
    });

    sideMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElem = document.getElementById(targetId);

        if (targetElem) {
          sideMenu.classList.remove('open');
          overlay.classList.remove('active');

          setTimeout(() => {
            targetElem.scrollIntoView({ behavior: 'smooth' });
          }, 350);
        }
      });
    });
 }

  document.querySelectorAll(".toggle-row").forEach(row => {
    row.addEventListener("click", () => {
      document.querySelectorAll(".toggle-row").forEach(r => {
        if (r !== row) r.classList.remove("open");
      });

      row.classList.toggle("open");
    });
  });
});

window.addEventListener("load", () => {
  if (window.location.hash) {
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }
});
