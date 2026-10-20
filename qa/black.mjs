import { chromium } from 'playwright';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--headless=new']});
const p=await b.newPage();
await p.route('**/*',r=>{const u=r.request().url(); if(u.startsWith('file:')) return r.continue(); return r.abort();});
await p.goto('file:///home/claude/portfolio/site/index.html#contact');
await p.waitForTimeout(800);
const res=await p.evaluate(()=>{const out=[];for(const pg of document.querySelectorAll('.page')){pg.hidden=false;}
 document.querySelectorAll('body *').forEach(e=>{const cs=getComputedStyle(e); if(cs.color==='rgb(0, 0, 0)' && e.childNodes.length && [...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())) out.push(e.tagName+'.'+e.className+' '+e.textContent.trim().slice(0,30));});return out.slice(0,20);});
console.log(res); await b.close();
