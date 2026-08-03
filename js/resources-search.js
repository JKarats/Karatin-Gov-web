
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
  const match = filters.find(btn => btn.dataset.filter === category);
  if (match) match.click();
}
