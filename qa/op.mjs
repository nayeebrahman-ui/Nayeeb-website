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
const p=await mk(1440,900,false);
await p.addInitScript(()=>{Object.defineProperty(navigator,'clipboard',{value:{writeText:()=>Promise.resolve()}})}); await p.goto('http://site/index.html#home'); await W(p,250); await S(p,'op-home0'); await W(p,1500);
console.log('canvas drawn', await p.evaluate(()=>[document.getElementById('heroCanvas').className, getComputedStyle(document.getElementById('heroPoster')).visibility]));
await p.evaluate(()=>location.hash='#contact'); await W(p,1150); await S(p,'op-c1'); await W(p,1200); await S(p,'op-c2');
// form -> sent
await p.fill('#f-name','Test'); await p.fill('#f-email','a@b.co'); await p.fill('#f-msg','Hello'); await p.click('#form button[type=submit]'); await W(p,160); await S(p,'op-swap1'); await W(p,600); await S(p,'op-swap2');
console.log('sent', await p.evaluate(()=>[document.getElementById('sent').hidden, document.getElementById('cform').hidden, document.getElementById('cbox').style.height]));
await p.click('#copyMsg').catch(()=>{}); await W(p,250); await S(p,'op-copy'); console.log('copy', await p.evaluate(()=>[document.getElementById('copyMsg').className, document.querySelector('#copyMsg .c-lbl').textContent]));
await p.click('#editMsg'); await W(p,700); console.log('edit', await p.evaluate(()=>[document.getElementById('sent').hidden, document.getElementById('cform').hidden]));
// revisit: home then contact again quick
await p.evaluate(()=>location.hash='#partner'); await W(p,1600);
const t0=Date.now(); await p.evaluate(()=>location.hash='#contact'); await W(p,300); await S(p,'op-revisit'); console.log('revisit wipe visible?', await p.evaluate(()=>getComputedStyle(document.getElementById('wipe')).visibility));
// lightbox close
await p.evaluate(()=>location.hash='#partner'); await W(p,800);
await p.evaluate(()=>document.querySelector('#fan').scrollIntoView()); await W(p,900); await p.locator('.doc').nth(2).click({force:true}); await W(p,500); await p.click('#lbX'); await W(p,120); await S(p,'op-lbclose'); await W(p,300);
console.log('lb', await p.evaluate(()=>document.getElementById('lightbox').hidden));
// placeholder tip
await p.evaluate(()=>location.hash='#hire'); await W(p,2400); await p.locator('#hrHero .hr-cv').click({force:true}); await W(p,400); await S(p,'op-tip');
console.log('tip', await p.evaluate(()=>[document.querySelector('.ph-tip').className, document.querySelector('.ph-tip').textContent]));
console.log('desk errors',p.errs);
const m=await mk(390,844,true); await m.goto('http://site/index.html#contact'); await W(m,2200); await S(m,'op-m'); await m.locator('#hClose .hr-li').count();
console.log('mob', await m.evaluate(()=>[document.documentElement.scrollWidth,document.documentElement.clientWidth]), m.errs);
await b.close();