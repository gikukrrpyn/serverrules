     (() => {
  const a=document.getElementById("search-input"),b=document.getElementById("search-results"),c=Array.from(document.querySelectorAll(".menu-item"));
  function d(e){let f=document.createElement("div");return f.innerHTML=e,f.textContent||f.innerText||""}
  const e=c.map((f,g)=>{
    let h=f.querySelector("b > span"),i=h?h.textContent.trim():"",j=f.getAttribute("onclick")||"",k="";
    try {
      let l=j.match(/openModal\(([\s\S]*?)\)$/);
      if(l){
        let m=l[1],n=/(['"`])((?:\\\1|[\s\S])*?)\1/g,o;
        while((o=n.exec(m))!==null){
          let p=o[2];
          p=p.replace(/\\n|\\t|\\r/g," ");
          k+=" "+d(p)
        }
      }
    }catch(r){console.warn("Помилка при розборі openModal",r)}
    return{menuItem:f,index:g+1,title:i,content:k.trim()}
  });
  function f(e,g){if(!g)return;const h=new RegExp(`(${g})`,"gi"),i=e.innerHTML;e.innerHTML=e.innerHTML.replace(h,'<span class="highlighted">$1</span>'),setTimeout(()=>{e.innerHTML=i},2e3)}
  function g(e,h=0){const i=e.getBoundingClientRect().top+window.pageYOffset+h;window.scrollTo({top:i,behavior:"smooth"})}
  if(typeof window.openModal=="function"){const e=window.openModal;window.openModal=function(...f){e(...f),setTimeout(()=>{
    const g=document.querySelector(".modal");if(!g)return;
    const h=a.value.trim();if(!h)return;
    function i(j,k){const l=new RegExp(`(${k})`,"i"),m=document.createTreeWalker(j,NodeFilter.SHOW_TEXT,null);while(m.nextNode()){const n=m.currentNode;if(n.nodeValue&&l.test(n.nodeValue)){const o=document.createElement("span");o.className="highlighted";const p=n.nodeValue.split(l),q=document.createDocumentFragment();for(let r=0;r<p.length;r++)p[r].toLowerCase()===k.toLowerCase()?(function(){const s=document.createElement("span");s.className="highlighted",s.textContent=p[r],q.appendChild(s)})():q.appendChild(document.createTextNode(p[r]));n.parentNode.replaceChild(q,n);return}}}i(g,h);
    const j=g.querySelector(".highlighted");if(j){j.scrollIntoView({behavior:"smooth",block:"center"}),setTimeout(()=>{
      const k=g.querySelectorAll(".highlighted");k.forEach(l=>{
        const m=l.parentNode;m.replaceChild(document.createTextNode(l.textContent),l),m.normalize()
      })
    },2e3)}
  },100)}}
  a.addEventListener("input",()=>{
    const h=a.value.trim().toLowerCase();b.innerHTML="";if(!h)return;
    const i=e.filter(({title:t,content:u,index:v})=>t.toLowerCase().includes(h)||u.toLowerCase().includes(h)||v.toString().includes(h));
    if(i.length===0)return void(b.innerHTML="<div>Нічого не знайдено.</div>");
    i.forEach(({menuItem:j,title:k,index:l})=>{
      const m=document.createElement("div");m.textContent=`${l}. ${k}`,m.title=`Перейти до пункту: ${k}`,m.addEventListener("click",()=>{
        j.click(),setTimeout(()=>{j.scrollIntoView({behavior:"smooth",block:"center"})},100)
      }),b.appendChild(m)
    })
  });
  const h=document.getElementById("search-input"),i=document.getElementById("search-results");
  h.addEventListener("input",()=>{
    const j=h.value.trim();j.length>0?i.style.display="block":i.style.display="none"
  });
  window.toggleMenu=function(){document.getElementById("sideMenu").classList.toggle("open")};
  window.openModal=function(l,m,n){document.getElementById("ruleText").innerHTML=l,document.getElementById("penaltyText").innerHTML=m||"",document.getElementById("ruleModal").setAttribute("data-id",n),document.getElementById("ruleModal").style.display="block",addShareLinkButton(n)};
  window.openModalFromId=function(o,p,q){if(p===undefined&&q===undefined)return openModal(o,"","");history.replaceState(null,null,`#${o}`),openModal(p,q,o)};
  window.closeModal=function(){history.pushState("",document.title,window.location.pathname+window.location.search),document.getElementById("ruleModal").style.display="none"};
  window.addEventListener("scroll",()=>{
    const s=document.querySelector(".top-bar"),t=document.querySelector(".header");
    window.scrollY>0?(s.classList.add("scrolled"),t.classList.add("scrolled")):(s.classList.remove("scrolled"),t.classList.remove("scrolled"))
  });
  window.addEventListener("scroll",()=>{
    document.querySelectorAll(".menu-item").forEach(e=>{isElementInView(e)&&e.classList.add("visible")})
  });
  function isElementInView(e){let r=e.getBoundingClientRect();return r.top>=0&&r.top<=window.innerHeight}
  window.addEventListener("load",()=>{
    document.querySelectorAll(".menu-item").forEach((e,t)=>{setTimeout(()=>{e.classList.add("visible")},t*300)})
  });
  function addShareLinkButton(e){let r=document.getElementById("modalShareLink");if(!r){r=document.createElement("div"),r.id="modalShareLink",r.style.position="absolute",r.style.top="10px",r.style.left="10px";const s=document.getElementById("ruleModal");s.prepend(r)}r.innerHTML="";const t=document.createElement("button");t.textContent="🔗",t.style.cursor="pointer",t.onclick=()=>{const u=`${window.location.origin}${window.location.pathname}#${e}`;navigator.clipboard.writeText(u).then(()=>{t.textContent="✔️",setTimeout(()=>{t.textContent="🔗"},1e3)})},r.appendChild(t)};
  window.addEventListener("DOMContentLoaded",()=>{
    if(performance.navigation.type===performance.navigation.TYPE_RELOAD)return void history.replaceState(null,null,window.location.pathname);
    const v=window.location.hash.replace("#","");
    if(!v)return;
    const w=document.querySelector(`.menu-item[data-id="${v}"]`);
    w&&(w.click(),setTimeout(()=>{w.scrollIntoView({behavior:"smooth",block:"center"})},100))
  })
})();
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    });
