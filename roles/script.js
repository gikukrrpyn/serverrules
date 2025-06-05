 document.addEventListener("DOMContentLoaded", () => {
            const players = {
                "gikusya": { role: "Засновник сервера", telegram: "t.me/ukreh_admin", category: "Адміністрація" },
                "Klipri": { role: "Головний Адміністратор сервера", telegram: "t.me/Klipri", category: "Адміністрація" },
                "nsx1987": { role: "Адміністратор сервера", telegram: "t.me/WHHll", category: "Адміністрація" },
                "K_PoPlove9473": { role: "Адміністратор сервера", telegram: "t.me/aeriwam", category: "Адміністрація" },
                "Bandera909": { role: "Адміністратор сервера", telegram: "t.me/Great_Terku", category: "Адміністрація" },
                "gestisqns": { role: "Адміністратор сервера", telegram: "t.me/gestisq", category: "Адміністрація" },
                "MefFVG7": { role: "Адміністратор сервера", telegram: "t.me/cherruu12", category: "Адміністрація" },

                "XxHA7AxX": { role: "Головний Суддя", telegram: "t.me/Na7atelega", category: "Суд" },
                "nik2a5": { role: "Суддя", telegram: "t.me/cyberl1n3", category: "Суд" },
                "olegh34": { role: "Суддя", telegram: "t.me/olegh34", category: "Суд" },
                "arina_mike141": { role: "Охоронець", telegram: "7505928620", category: "Суд" },
                "Svervanchik ": { role: "Охоронець", telegram: "5634473488", category: "Суд" },

  "nazar1cyber2sportman": { role: "Голова СБС", telegram: "t.me/NazSkil", category: "СБС" },
  "Zoomsos123": { role: "Заступник Голови СБС", telegram: "t.me/Xmm_help", category: "СБС" },
  "Pit_uk": { role: "Співробітник СБС", telegram: "7811050819", category: "СБС" },
  "Sti4kyy": { role: "Співробітник СБС", telegram: "5481499679", category: "СБС" },
  "eeeeyegeggegehux": { role: "Співробітник СБС", telegram: "5599228299", category: "СБС" },
  "Andrew_01174": { role: "Співробітник СБС", telegram: "5262299554", category: "СБС" },
  "ONLYvPOTOKE": { role: "Співробітник СБС", telegram: "5408573953", category: "СБС" },
  "Saylexxx59": { role: "Співробітник СБС", telegram: "1141415935", category: "СБС" },
  "Tyjorty123987": { role: "Співробітник СБС", telegram: "1410588546", category: "СБС" },
  "Black_Batman02": { role: "Співробітник СБС", telegram: "1093245097", category: "СБС" },
  "maksumkasymk789": { role: "Співробітник СБС", telegram: "1405483524", category: "СБС" },
  "IZAAK1797": { role: "Співробітник СБС", telegram: "1700093221", category: "СБС" },

                "Vaylet009": { role: "Директор ДБР", telegram: "t.me/Vaylet009", category: "ДБР" },
                "global20207": { role: "Заступник Директора ДБР", telegram: "1431122546", category: "ДБР" },
                "artemMelnichenko2013": { role: "Співробітник ДБР", telegram: "5242336088", category: "ДБР" },
                "H8TpizzaG8D": { role: "Співробітник ДБР", telegram: "1044776829", category: "ДБР" },
                "dima276518": { role: "Співробітник ДБР", telegram: "8107753437", category: "ДБР" },
                "starikashka228337": { role: "Співробітник ДБР", telegram: "5358641921", category: "ДБР" },
                "palamarka2288": { role: "Співробітник ДБР", telegram: "1902876079", category: "ДБР" },
                "Yezh1lya": { role: "Співробітник ДБР", telegram: "5109532913", category: "ДБР" },
                "Ntinetter": { role: "Співробітник ДБР", telegram: "1319760971", category: "ДБР" },
                // "Pushka2030": { role: "Співробітник ДБР", telegram: "5549609551", category: "ДБР" },

               // "": { role: "Міністр МВС", telegram: "t.me/", category: "МВС" },
               // "": { role: "Заступник Міністра МВС", telegram: "t.me/", category: "МВС" },

                "kartoffel_2288": { role: "Психолог", telegram: "t.me/UkraineRPPsychotherapyBot?start=start", category: "Інше" },
                "Karinqs_UA": { role: "Психолог", telegram: "t.me/UkraineRPPsychotherapyBot?start=start", category: "Інше" },
                "XxHA7AxXᅠ": { role: "Контентмейкер", telegram: "t.me/Na7atelega", category: "Інше" },
            }; 
            
            const rolesContainer = document.getElementById("rolesContainer");

for (const [player, data] of Object.entries(players)) {
    let categoryDiv = document.querySelector(`.category.${data.category}`);
    if (!categoryDiv) {
        categoryDiv = document.createElement("div");
        categoryDiv.classList.add("category", data.category);
        categoryDiv.innerHTML = `<h3>${data.category}</h3>`;
        rolesContainer.appendChild(categoryDiv);
    }

    const roleDiv = document.createElement("div");
    roleDiv.classList.add("role");

    let telegramLink;
    if (data.telegram.startsWith('t.me/')) {
        telegramLink = `https://${data.telegram}`;  
    } else {
        telegramLink = `tg://openmessage?user_id=${data.telegram}`;
    }

    roleDiv.innerHTML = `<strong>${data.role}</strong><br>Username: <b>${player}</b><br>Telegram: <a href="${telegramLink}" target="_blank">${data.telegram}</a>`;
    categoryDiv.appendChild(roleDiv);

    setTimeout(() => roleDiv.classList.add("show"), 200);
}
});
