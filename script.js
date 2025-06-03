      (() => {
  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('search-results');
  const menuItems = Array.from(document.querySelectorAll('.menu-item'));

  function stripHTML(html) {
    let div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  }

const searchData = menuItems.map((item, index) => {
  const titleSpan = item.querySelector('b > span');
  const title = titleSpan ? titleSpan.textContent.trim() : '';

  const onclickAttr = item.getAttribute('onclick') || '';
let fullContent = '';

try {
  const match = onclickAttr.match(/openModalFromId\(([\s\S]*?)\)$/);
  if (match) {
    const args = match[1];
    const argRegex = /`([\s\S]*?)`/g; 
    let argMatch;
    while ((argMatch = argRegex.exec(args)) !== null) {
      fullContent += ' ' + stripHTML(argMatch[1]);
    }

    if (fullContent.trim() === '') {
      const fallbackRegex = /(["'`])((?:\\\1|[\s\S])*?)\1/g;
      let fallbackMatch;
      while ((fallbackMatch = fallbackRegex.exec(args)) !== null) {
        let raw = fallbackMatch[2];
        raw = raw.replace(/\\n|\\t|\\r/g, ' ');
        fullContent += ' ' + stripHTML(raw);
      }
    }
  }
} catch (e) {
  console.warn('Помилка при розборі openModalFromId', e);
}


  return {
    menuItem: item,
    index: index + 1,
    title,
    content: fullContent.trim()
  };
});


  function highlightWord(element, word) {
    if (!word) return;
    const regex = new RegExp(`(${word})`, 'gi');
    const originalText = element.innerHTML;

    element.innerHTML = element.innerHTML.replace(regex, '<span class="highlighted">$1</span>');

    setTimeout(() => {
      element.innerHTML = originalText;
    }, 2000);
  }

  function smoothScrollTo(element, offset = 0) {
    const top = element.getBoundingClientRect().top + window.pageYOffset + offset;
    window.scrollTo({
      top,
      behavior: 'smooth'
    });
  }

  if (typeof window.openModal === 'function') {
    const originalOpenModal = window.openModal;
    window.openModal = function(...args) {
      originalOpenModal(...args);
   
      setTimeout(() => {
        const modal = document.querySelector('.modal');
        if (!modal) return;

        const searchTerm = searchInput.value.trim();
        if (!searchTerm) return;


        function highlightInElement(el, word) {
          const regex = new RegExp(`(${word})`, 'i');
          const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
          while(walker.nextNode()) {
            const node = walker.currentNode;
            if (node.nodeValue && regex.test(node.nodeValue)) {
              const span = document.createElement('span');
              span.className = 'highlighted';
              const parts = node.nodeValue.split(regex);
              const frag = document.createDocumentFragment();
              for (let i=0; i < parts.length; i++) {
                if (parts[i].toLowerCase() === word.toLowerCase()) {
                  const highlightSpan = document.createElement('span');
                  highlightSpan.className = 'highlighted';
                  highlightSpan.textContent = parts[i];
                  frag.appendChild(highlightSpan);
                } else {
                  frag.appendChild(document.createTextNode(parts[i]));
                }
              }
              node.parentNode.replaceChild(frag, node);
              return; 
            }
          }
        }
        highlightInElement(modal, searchTerm);

      
        const highlighted = modal.querySelector('.highlighted');
        if (highlighted) {
          highlighted.scrollIntoView({ behavior: 'smooth', block: 'center' });
       
          setTimeout(() => {
            const spans = modal.querySelectorAll('.highlighted');
            spans.forEach(s => {
              const parent = s.parentNode;
              parent.replaceChild(document.createTextNode(s.textContent), s);
              parent.normalize();
            });
          }, 2000);
        }
      }, 100);
    }
  }

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    resultsContainer.innerHTML = '';

    if (!query) return;

const filtered = searchData.filter(({title = '', content = '', index}) => {
  return (
    title.toLowerCase().includes(query) ||
    content.toLowerCase().includes(query) ||
    index.toString().includes(query)
  );
});


    if (filtered.length === 0) {
      resultsContainer.innerHTML = '<div>Нічого не знайдено.</div>';
      return;
    }

filtered.forEach(({menuItem, title, index}) => {
  const div = document.createElement('div');
  div.textContent = `${index}. ${title}`;
  div.title = `Перейти до пункту: ${title}`;

  div.addEventListener('click', () => {
    menuItem.click();

    setTimeout(() => {searchData 
      menuItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  });

  resultsContainer.appendChild(div);
});
  });
})();
 const input = document.getElementById("search-input");
  const results = document.getElementById("search-results");

  input.addEventListener("input", () => {
    const value = input.value.trim();

    if (value.length > 0) {
      results.style.display = "block";
 
    } else {
      results.style.display = "none";
    }
  });
        function toggleMenu() {
            document.getElementById("sideMenu").classList.toggle("open");
        }

     function openModal(rule, penalty, id) {
    document.getElementById('ruleText').innerHTML = rule;  
    document.getElementById('penaltyText').innerHTML = penalty || '';

    const modal = document.getElementById('ruleModal');
    modal.setAttribute('data-id', id); 

    modal.style.display = 'block';
}

function openModalFromId(idOrHtml, ruleOrPenalty, penalty) {
    if (ruleOrPenalty === undefined && penalty === undefined) {
        const rule = idOrHtml;  
        openModal(rule, '', '');  
    } else {
        history.replaceState(null, null, `#${idOrHtml}`);
        openModal(ruleOrPenalty, penalty, idOrHtml);
        addShareLinkButton(idOrHtml); 
    }
}

function closeModal() {
    history.pushState("", document.title, window.location.pathname + window.location.search);
    document.getElementById('ruleModal').style.display = 'none';
}



    window.addEventListener('scroll', function () {
        const topBar = document.querySelector('.top-bar');
        const header = document.querySelector('.header');
        if (window.scrollY > 0) {
            topBar.classList.add('scrolled');
            header.classList.add('scrolled');
        } else {
            topBar.classList.remove('scrolled');
            header.classList.remove('scrolled');
        }
    });

window.addEventListener('scroll', function() {
    let menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        if (isElementInView(item)) {
            item.classList.add('visible');
        }
    });
});

function isElementInView(el) {
    let rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.top <= window.innerHeight;
}
window.addEventListener('load', function() {
    let menuItems = document.querySelectorAll('.menu-item');
    
    
    menuItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, index * 300);  
    });
});

window.addEventListener('scroll', function() {
    let menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        if (isElementInView(item)) {
            item.classList.add('visible');
        }
    });
});


function isElementInView(el) {
    let rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.top <= window.innerHeight;
}

function addShareLinkButton(id) {
    let container = document.getElementById('modalShareLink');
    if (!container) {
        container = document.createElement('div');
        container.id = 'modalShareLink';
        container.style.position = 'absolute';
        container.style.top = '10px';
        container.style.left = '10px';

        const modal = document.getElementById('ruleModal');
        modal.prepend(container);
    }

    container.innerHTML = '';
    const button = document.createElement('button');
    button.textContent = '🔗';
    button.style.cursor = 'pointer';
    button.onclick = () => {
        const link = `${window.location.origin}${window.location.pathname}#${id}`;
        navigator.clipboard.writeText(link).then(() => {
            button.textContent = '✔️';
            setTimeout(() => (button.textContent = '🔗'), 1000);
        });
    };

    container.appendChild(button);
}

window.addEventListener('DOMContentLoaded', () => {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        history.replaceState(null, null, window.location.pathname);
        return;
    }

    const hash = window.location.hash.replace('#', '');
    if (!hash) return;

    const targetItem = document.querySelector(`.menu-item[data-id="${hash}"]`);
    if (targetItem) {
        targetItem.click(); 
        setTimeout(() => {
            targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }
});
