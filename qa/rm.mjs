import { chromium } from 'playwright'; import fs from 'fs'; import path from 'path';
const root='/home/claude/portfolio'; const fontCss=fs.readFileSync(root+'/qa/fonts.css','utf8');
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--headless=new']});
const mk=async(w,h,touch)=>{const p=await b.newPage({viewport:{width:w,height:h},hasTouch:touch,isMobile:touch,reducedMotion:'reduce'}); p.errs=[]; p.on('pageerror',e=>p.errs.push(e.message));
await p.route('**/*',async r=>{const u=r.request().url();
 if(u.includes('cdnjs')) return r.fulfill({path:root+'/node_modules/gsap/dist/'+path.basename(u),contentType:'application/javascript'});
 if(u.includes('jsdelivr')) return r.fulfill({path:root+'/node_modules/lenis/dist/lenis.min.js',contentType:'application/javascript'});
 if(u.includes('fonts.googleapis')) return r.fulfill({body:fontCss,contentType:'text/css'});
 if(u.includes('/fonts/')){return r.fulfill({path:root+'/node_modules/@fontsource/'+u.split('/fonts/')[1]});}
 if(u.startsWith('http://site/')){const fp=u.replace('http://site/','').split('#')[0]||'index.html'; if(fp.endsWith('.html')) return r.fulfill({body:'<meta name="viewport" content="width=device-width,initial-scale=1">'+fs.readFileSync(root+'/site/'+fp,'utf8'),contentType:'text/html; charset=utf-8'}); return r.fulfill({path:root+'/site/'+fp});}
 return r.abort();}); return p;};
const S=(p,n)=>p.screenshot({path:`${root}/qa/sh-${n}.png`});
const W=(p,ms)=>p.waitForTimeout(ms);
for(const [w,hh] of [[1440,900],[375,812]]){const p=await mk(w,hh,w<500);
for(const r of ['#home','#work','#hire','#partner','#case-apple-gadgets','#about','#contact','#nope']){await p.evaluate(x=>location.hash=x,r).catch(()=>{}); if(r==='#home') await p.goto('http://site/index.html#home'); await W(p,700);}
await p.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight)); await W(p,400);
console.log(w,'reduced errors',p.errs, await p.evaluate(()=>[document.documentElement.scrollWidth>innerWidth, getComputedStyle(document.getElementById('nav')).opacity, document.querySelector('.foot-sign span').getBoundingClientRect().width>0]));}
await b.close();