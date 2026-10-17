if (document.getElementById("resourceSearch")) {

const input = document.getElementById('resourceSearch');
const button = document.getElementById('searchButton');
const cards = [...document.querySelectorAll('.knowledge-card')];
const filters = [...document.querySelectorAll('.filter-btn')];
const status = document.getElementById('searchStatus');
const noResults = document.getElementById('noResults');
let activeFilter = 'all';

function applyFilters() {
  const query = (input.value || '').trim().toLowerCase();
  let visible = 0;

  cards.forEach(card => {
    const matchesText =
      !query ||
      card.dataset.title.includes(query) ||
      card.dataset.summary.includes(query) ||
      card.textContent.toLowerCase().includes(query);

    const matchesCategory =
      activeFilter === 'all' ||
      card.dataset.category === activeFilter;

    const show = matchesText && matchesCategory;
    card.hidden = !show;
    if (show) visible++;
  });

  status.textContent = `${visible} resource${visible === 1 ? '' : 's'} found`;
  noResults.hidden = visible !== 0;
}

button.addEventListener('click', applyFilters);
input.addEventListener('input', applyFilters);
input.addEventListener('keydown', event => {
  if (event.key === 'Enter') applyFilters();
});

filters.forEach(filter => {
  filter.addEventListener('click', () => {
    filters.forEach(btn => btn.classList.remove('active'));
    filter.classList.add('active');
    activeFilter = filter.dataset.filter;
    applyFilters();
  });
});

const params = new URLSearchParams(window.location.search);
const category = params.get('category');
if (category) {
  // Preserve legacy bookmarks without restoring product-specific categories.
  const legacy = {
    govcon: 'business',
    m365: 'data-security',
    microsoft365: 'data-security',
    purview: 'classification',
    ai: 'responsible-ai',
    'ai-governance': 'responsible-ai',
    cybersecurity: 'data-security'
  };
  const normalized = legacy[category.toLowerCase()] || category;
  const match = filters.find(btn => btn.dataset.filter === normalized);
  if (match) match.click();
}

// Reconfirm the anchor position after images and fonts load. Without this,
// some browsers land at the capabilities cards instead of the article index.
function openResourceLibrary() {
  if (window.location.hash !== '#resources' && !category) return;
  const section = document.getElementById('resources');
  if (!section) return;
  const clearance = window.matchMedia('(max-width:600px)').matches ? 70 : 100;
  const top = section.getBoundingClientRect().top + window.scrollY - clearance;
  window.scrollTo({top: Math.max(0, top), behavior: 'instant'});
}
window.addEventListener('load', () => requestAnimationFrame(openResourceLibrary), {once:true});

}
