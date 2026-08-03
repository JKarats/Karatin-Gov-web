
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
