
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
