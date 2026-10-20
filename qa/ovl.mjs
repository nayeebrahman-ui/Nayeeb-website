import { chromium } from 'playwright'; import fs from 'fs'; import path from 'path';
const root='/home/claude/portfolio'; const fontCss=fs.readFileSync(root+'/qa/fonts.css','utf8');
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--headless=new']});
const mk=async(w,h,touch)=>{const p=await b.newPage({viewport:{width:w,height:h},hasTouch:touch,isMobile:touch}); p.errs=[]; p.on('pageerror',e=>p.errs.push(e.message));
await p.route('**/*',async r=>{const u=r.request().url();
 if(u.includes('cdnjs')) return r.fulfill({path:root+'/node_modules/gsap/dist/'+path.basename(u),contentType:'application/javascript'});
 if(u.includes('jsdelivr')) return r.fulfill({path:root+'/node_modules/lenis/dist/lenis.min.js',contentType:'application/javascript'});
 if(u.includes('fonts.googleapis')) return r.fulfill({body:fontCss,contentType:'text/css'});
 if(u.includes('/fonts/')){return r.fulfill({path:root+'/node_modules/@fontsource/'+u.split('/fonts/')[1]});}
 if(u.startsWith('http://site/')){const fp=u.replace('http://site/','').split('#')[0]||'index.html'; if(fp.endsWith('.html')) return r.fulfill({body:'<meta name="viewport" content="width=device-width,initial-scale=1">'+fs.readFileSync(root+'/site/'+fp,'utf8'),contentType:'text/html; charset=utf-8'}); return r.fulfill({path:root+'/site/'+fp});}
 return r.abort();}); return p;};
const S=(p,n)=>p.screenshot({path:`${root}/qa/sh-${n}.png`});
const W=(p,ms)=>p.waitForTimeout(ms);

const at=async(p,sel,frac,dist)=>{await p.evaluate(([sel,frac,dist])=>{const el=document.querySelector(sel);const host=el.closest('.pin-spacer')||el;const y=host.getBoundingClientRect().top+scrollY+innerHeight*dist*frac;window.scrollTo(0,y)},[sel,frac,dist]); await W(p,900);};
const routes=['home','work','hire','consulting','partner','about','contact','case-apple-gadgets','case-ai-idp','case-nextlab','case-tripploy','case-team-qreative','case-banking-chatbot','case-discovery-playbook','case-ventures'];
const audit=async(p,label)=>{
 for (const r of routes){
  await p.goto('http://site/index.html#'+r); await W(p,1400);
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);
  const found=new Map();
  for(let y=0;y<H;y+=Math.round(p.viewportSize().height*.6)){
    await p.evaluate(y=>scrollTo(0,y),y); await W(p,700);
    const res=await p.evaluate(()=>{
      const out=[]; const vis=(el)=>{for(let e=el;e&&e!==document.body;e=e.parentElement){const cs=getComputedStyle(e); if(cs.visibility==='hidden'||cs.display==='none'||+cs.opacity<.35||e.getAttribute('aria-hidden')==='true'||e.hidden) return false;} return true;};
      const tw=document.createTreeWalker(document.querySelector('main')||document.body,NodeFilter.SHOW_TEXT);
      const items=[]; let n;
      while(n=tw.nextNode()){ const t=n.textContent.trim(); if(t.length<2) continue; const el=n.parentElement; if(!vis(el)) continue;
        const rg=document.createRange(); rg.selectNodeContents(n); for(const rc of rg.getClientRects()){ if(rc.width<4||rc.height<4) continue; if(rc.bottom<0||rc.top>innerHeight) continue; items.push({el,t:t.slice(0,40),r:{l:rc.left,t:rc.top,rr:rc.right,b:rc.bottom}}); } }
      for(let i=0;i<items.length;i++)for(let j=i+1;j<items.length;j++){const a=items[i],b=items[j]; if(a.el===b.el||a.el.contains(b.el)||b.el.contains(a.el)) continue;
        const ix=Math.min(a.r.rr,b.r.rr)-Math.max(a.r.l,b.r.l), iy=Math.min(a.r.b,b.r.b)-Math.max(a.r.t,b.r.t);
        if(ix>3&&iy>3){ const sel=e=>e.tagName.toLowerCase()+(e.className&&typeof e.className==='string'?'.'+e.className.trim().split(/\s+/).slice(0,2).join('.'):''); out.push(`${sel(a.el)} "${a.t}"  X  ${sel(b.el)} "${b.t}"`);} }
      return out; });
    res.forEach(x=>found.set(x,(found.get(x)||0)+1));
  }
  if(found.size) { console.log(`--- ${label} ${r}`); [...found.keys()].slice(0,12).forEach(k=>console.log('  ',k)); }
 }
};
const p=await mk(1440,900,false); await audit(p,'1440');
const m=await mk(390,844,true); await audit(m,'390');
console.log('errs',p.errs,m.errs);
await b.close();
