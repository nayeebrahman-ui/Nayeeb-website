import { chromium } from 'playwright'; import fs from 'fs'; import path from 'path';
const root='/home/claude/portfolio'; const fontCss=fs.readFileSync(root+'/qa/fonts.css','utf8');
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--headless=new']});
for (const [w,h,tag,touch] of [[1440,900,'d',false],[390,844,'m',true]]){
const p=await b.newPage({viewport:{width:w,height:h},hasTouch:touch,isMobile:touch});
const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.route('**/*',async r=>{const u=r.request().url();
 if(u.includes('cdnjs')) return r.fulfill({path:root+'/node_modules/gsap/dist/'+path.basename(u),contentType:'application/javascript'});
 if(u.includes('fonts.googleapis')) return r.fulfill({body:fontCss,contentType:'text/css'});
 if(u.includes('/fonts/')){return r.fulfill({path:root+'/node_modules/@fontsource/'+u.split('/fonts/')[1]});}
 if(u.startsWith('http://site/')){const fp=u.replace('http://site/','').split('#')[0]||'index.html';if(fp.endsWith('.html')) return r.fulfill({body:'<meta name="viewport" content="width=device-width,initial-scale=1">'+fs.readFileSync(root+'/site/'+fp,'utf8'),contentType:'text/html; charset=utf-8'}); return r.fulfill({path:root+'/site/'+fp});}
 return r.abort();});
await p.goto('http://site/index.html#home'); await p.waitForTimeout(1500);
for(let k=1;k<=14;k++){await p.evaluate(k=>{const y=document.querySelector('#roster').getBoundingClientRect().top+scrollY-80; window.scrollTo(0,y*k/14)},k); await p.waitForTimeout(110);}
await p.waitForTimeout(1000); await p.screenshot({path:`${root}/qa/ro-${tag}1.png`});
await p.waitForTimeout(2200); await p.screenshot({path:`${root}/qa/ro-${tag}2.png`});
if(!touch){ const bx=await p.locator('.lg').nth(1).boundingBox(); await p.mouse.move(bx.x+bx.width/2,bx.y+bx.height/2); await p.waitForTimeout(600); await p.screenshot({path:`${root}/qa/ro-${tag}3.png`}); }
else { await p.evaluate(()=>scrollBy(0,600)); await p.waitForTimeout(500); await p.screenshot({path:`${root}/qa/ro-${tag}3.png`}); }
console.log(tag, 'errors', errs, 'overflow', await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
await p.goto('http://site/index.html#hire'); await p.waitForTimeout(1800);
await p.evaluate(()=>document.querySelector('.timeline').scrollIntoView({block:'center'})); await p.waitForTimeout(1500); await p.screenshot({path:`${root}/qa/ro-${tag}-hire.png`});
await p.close();}
await b.close();
