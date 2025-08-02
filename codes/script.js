function searchCodes(query) {
  query = query.toLowerCase();
  const main = document.getElementById('code-list');
  const categories = main.querySelectorAll('h2');
  const noResults = document.getElementById('no-results');
  
  let anyVisible = false;
  
  categories.forEach(category => {
    let nextElem = category.nextElementSibling;
    let hasVisibleCode = false;
    
    while (nextElem && nextElem.tagName !== 'H2') {
      if (nextElem.classList.contains('code-block')) {
        const text = nextElem.textContent.toLowerCase();
        if (text.includes(query)) {
          nextElem.style.display = 'block';
          hasVisibleCode = true;
          anyVisible = true;
        } else {
          nextElem.style.display = 'none';
        }
      }
      nextElem = nextElem.nextElementSibling;
    }
    
    category.style.display = hasVisibleCode ? 'block' : 'none';
  });
  
  if (anyVisible) {
    noResults.style.display = 'none';
  } else {
 
    categories.forEach(cat => cat.style.display = 'none');
    main.querySelectorAll('.code-block').forEach(block => block.style.display = 'none');
    noResults.style.display = 'block';
  }
}