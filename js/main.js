
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

/* Karatin V29: Resources footer links point directly to articles.
   Applies to pages that load the shared js/main.js; leaves all other footer groups intact. */
(() => {
  const articles = [
    ['Data Security', 'enterprise-data-security-readiness-checklist.html'],
    ['Data Classification', 'data-classification-labeling-use-cases.html'],
    ['DLP & Labeling', 'classification-labeling-dlp-use-cases.html'],
    ['AI & Data Governance', 'ai-governance-operating-model.html'],
    ['Responsible AI', 'ai-risk-assessment-checklist.html']
  ];

  document.querySelectorAll('footer').forEach(footer => {
    // Keep the brand promise broad; Karatin is not limited to Microsoft products.
    footer.querySelectorAll('.footer-brand p').forEach(tagline => {
      if (/Microsoft expertise/i.test(tagline.textContent)) {
        tagline.textContent = tagline.textContent
          .replace(/Microsoft expertise\.?\s*/i, '')
          .trim();
      }
    });
    footer.querySelectorAll('h2, h3, h4').forEach(heading => {
      if (heading.textContent.trim().toLowerCase() !== 'resources') return;
      const section = heading.parentElement;
      if (!section) return;
      section.querySelectorAll('a').forEach(link => link.remove());
      articles.forEach(([label, href]) => {
        const link = document.createElement('a');
        link.href = href;
        link.textContent = label;
        section.appendChild(link);
      });
    });
  });
})();
