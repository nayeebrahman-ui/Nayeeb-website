import { chromium } from 'playwright'; import fs from 'fs'; import path from 'path';
const root='/home/claude/portfolio'; const fontCss=fs.readFileSync(root+'/qa/fonts.css','utf8');
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--headless=new']});
const p=await b.newPage({viewport:{width:1440,height:900}});
await p.route('**/*',async r=>{const u=r.request().url();
 if(u.includes('cdnjs')) return r.fulfill({path:root+'/node_modules/gsap/dist/'+path.basename(u),contentType:'application/javascript'});
 if(u.includes('fonts.googleapis')) return r.fulfill({body:fontCss,contentType:'text/css'});
 if(u.includes('/fonts/')){return r.fulfill({path:root+'/node_modules/@fontsource/'+u.split('/fonts/')[1]});}
 if(u.startsWith('http://site/')){const fp=u.replace('http://site/','').split('#')[0]||'index.html';return r.fulfill({path:root+'/site/'+fp,contentType:fp.endsWith('.html')?'text/html; charset=utf-8':undefined});}
 return r.abort();});
await p.goto('http://site/index.html#home'); await p.waitForTimeout(1500);
console.log(await p.evaluate(()=>{const a=document.querySelector('.clipline>span').getBoundingClientRect();const t=document.querySelector('#rahman text').getBoundingClientRect();const s=document.querySelector('#rahman').getBoundingClientRect();return {nayeeb:[a.width,a.height],rahText:[t.width,t.height],svg:[s.width,s.height],fs:getComputedStyle(document.querySelector('.hero-name')).fontSize}}));
await b.close();
