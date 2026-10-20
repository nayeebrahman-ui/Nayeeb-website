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
await p.goto('http://site/index.html#work'); await W(p,2200);
await p.evaluate(()=>document.querySelector('#workGrid').scrollIntoView({block:'center'})); await W(p,900);
await p.locator('#workGrid .case-card[href="#case-ai-idp"]').scrollIntoViewIfNeeded(); await W(p,1200); await p.locator('#workGrid .case-card[href="#case-ai-idp"]').click(); await W(p,700); await S(p,'cs-1'); await W(p,1600); await S(p,'cs-2');
console.log('metric', await p.evaluate(()=>document.querySelector('.c1-metric b').textContent));
const go=async(sel,off=.5)=>{await p.evaluate(([sel,off])=>{const e=document.querySelector(sel);window.scrollTo(0,e.getBoundingClientRect().top+scrollY-innerHeight*off)},[sel,off]); await W(p,1300);};
await go('.c2',.6); await S(p,'cs-c2');
await go('.c3',.15); await W(p,500); await S(p,'cs-c3');
await go('.c4',.3); await S(p,'cs-c4');
await go('#caseSteps',.3); await S(p,'cs-c5');
await p.locator('.st2-art').first().click(); await W(p,600); await S(p,'cs-lb'); await p.keyboard.press('Escape'); await W(p,300);
await go('.c6',.3); await W(p,1200); await S(p,'cs-c6');
await go('.c7',.3); await W(p,600); await S(p,'cs-c7');
await go('.c8',.4); await S(p,'cs-c8');
console.log('door', await p.evaluate(()=>document.querySelector('.c8-go').textContent.trim()));
await p.click('.c8-next'); await W(p,1800); console.log('next', await p.evaluate(()=>location.hash), await p.evaluate(()=>document.querySelector('.c1-ep').textContent));
await p.evaluate(()=>location.hash='#case-discovery-playbook'); await W(p,1500); console.log('door2', await p.evaluate(()=>document.querySelector('.c8-go').dataset.intent));
console.log('desk errors',p.errs);
const m=await mk(390,844,true); await m.goto('http://site/index.html#case-apple-gadgets'); await W(m,2200); await S(m,'cs-m1');
await m.evaluate(()=>document.querySelector('.c4').scrollIntoView()); await W(m,1200); await S(m,'cs-m2');
console.log('mob', await m.evaluate(()=>[document.documentElement.scrollWidth,document.documentElement.clientWidth]), m.errs);
await b.close();