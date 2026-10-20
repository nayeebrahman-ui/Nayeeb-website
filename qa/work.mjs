import { chromium } from 'playwright'; import fs from 'fs'; import path from 'path';
const root='/home/claude/portfolio'; const fontCss=fs.readFileSync(root+'/qa/fonts.css','utf8');
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--headless=new']});
const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>console.log('PAGEERR',e.message));
await p.route('**/*',async r=>{const u=r.request().url();
 if(u.includes('cdnjs')) return r.fulfill({path:root+'/node_modules/gsap/dist/'+path.basename(u),contentType:'application/javascript'});
 if(u.includes('fonts.googleapis')) return r.fulfill({body:fontCss,contentType:'text/css'});
 if(u.includes('/fonts/')){return r.fulfill({path:root+'/node_modules/@fontsource/'+u.split('/fonts/')[1]});}
 if(u.startsWith('http://site/')){const fp=u.replace('http://site/','').split('#')[0]||'index.html';return r.fulfill({path:root+'/site/'+fp,contentType:fp.endsWith('.html')?'text/html; charset=utf-8':undefined});}
 return r.abort();});
await p.goto('http://site/index.html#work'); await p.waitForTimeout(1800);
await p.screenshot({path:root+'/qa/w1.png'});
await p.click('.filter[data-f="product"]'); await p.waitForTimeout(160); await p.screenshot({path:root+'/qa/w2.png'});
await p.waitForTimeout(900); await p.screenshot({path:root+'/qa/w3.png'});
await p.mouse.move(400,520); await p.waitForTimeout(150); await p.mouse.move(430,540,{steps:5}); await p.waitForTimeout(600); await p.screenshot({path:root+'/qa/w4.png'});
await p.mouse.click(430,540); await p.waitForTimeout(300); await p.screenshot({path:root+'/qa/w5.png'}); await p.waitForTimeout(900); await p.screenshot({path:root+'/qa/w6.png'});
console.log(await p.evaluate(()=>location.hash));
await b.close();
