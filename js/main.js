
const button=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
if(button&&nav){
  button.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    button.setAttribute('aria-expanded',String(open));
  });
  document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{
    nav.classList.remove('open');
    button.setAttribute('aria-expanded','false');
  }));
}
const year=document.getElementById('year');
if(year)year.textContent=new Date().getFullYear();

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting)entry.target.classList.add('visible');
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.querySelectorAll('.counter').forEach(counter=>{
  const target=parseInt(counter.dataset.target||'0',10);
  let current=0;
  const tick=()=>{
    current+=1;
    counter.textContent=current+'+';
    if(current<target)requestAnimationFrame(tick);
  };
  tick();
});

/* Karatin V31: Each Resources footer link opens a curated group of articles,
   not a checklist or a single resource. Works on any page loading shared main.js. */
(() => {
  const topics = [["Data Security", "resources-data-security.html"], ["Data Classification", "resources-data-classification.html"], ["DLP & Labeling", "resources-dlp-labeling.html"], ["AI & Data Governance", "resources-ai-data-governance.html"], ["Responsible AI", "resources-responsible-ai.html"]];
  document.querySelectorAll('footer').forEach(footer => {
    footer.querySelectorAll('.footer-brand p').forEach(tagline => {
      if (/Microsoft expertise/i.test(tagline.textContent)) {
        tagline.textContent = tagline.textContent.replace(/Microsoft expertise\.?\s*/i, '').trim();
      }
    });
    footer.querySelectorAll('h2,h3,h4').forEach(heading => {
      if (heading.textContent.trim().toLowerCase() !== 'resources') return;
      const parent = heading.parentElement;
      if (!parent) return;
      parent.querySelectorAll('a').forEach(link => link.remove());
      topics.forEach(([label, url]) => {
        const link = document.createElement('a');
        link.href = url;
        link.textContent = label;
        parent.appendChild(link);
      });
    });
  });
})();

/* V33: Add site-policy links to existing footers without changing their columns. */
(() => {
  const pages = [['Privacy','privacy.html'],['Terms','terms.html'],['Accessibility','accessibility.html'],['EEO','eeo.html']];
  document.querySelectorAll('footer.site-footer').forEach(footer => {
    if (footer.querySelector('.karatin-legal-links')) return;
    const bar = document.createElement('nav');
    bar.className = 'karatin-legal-links';
    bar.setAttribute('aria-label','Website policies');
    bar.style.cssText = 'display:flex;gap:10px 22px;flex-wrap:wrap;align-items:center;justify-content:center;margin-top:14px;font-size:.88rem;';
    pages.forEach(([label,href]) => {
      const a = document.createElement('a');
      a.href=href;a.textContent=label;a.style.cssText='color:#dbe8f6;text-decoration:underline;text-underline-offset:3px;';
      bar.appendChild(a);
    });
    const copyright = footer.querySelector('.copyright');
    if (copyright) { copyright.appendChild(bar); }
    else { footer.appendChild(bar); }
  });
})();
