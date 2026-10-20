import { chromium } from 'playwright';
import fs from 'fs'; import path from 'path';
const root='/home/claude/portfolio';
const shots=process.argv.slice(2);
const browser=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--headless=new']});
const fontCss=fs.readFileSync(root+'/qa/fonts.css','utf8').replace(/'Anton'/g,"'Anton'").replace(/'Manrope'/g,"'Manrope'").replace(/'JetBrains Mono'/g,"'JetBrains Mono'").replace(/'Noto Serif JP'/g,"'Noto Serif JP'");
async function page(w,h){
  const ctx=await browser.newContext({viewport:{width:w,height:h},deviceScaleFactor:1});
  const p=await ctx.newPage();
  const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
  await p.route('**/*',async r=>{const u=r.request().url();
    if(u.includes('cdnjs')) return r.fulfill({path:root+'/node_modules/gsap/dist/'+path.basename(u),contentType:'application/javascript'});
    if(u.includes('fonts.googleapis')) return r.fulfill({body:fontCss,contentType:'text/css'});
    if(u.includes('/fonts/')){const f=u.split('/fonts/')[1];return r.fulfill({path:root+'/node_modules/@fontsource/'+f});}
    if(u.startsWith('http://site/')){const f=u.replace('http://site/','')||'index.html';const fp=f.split('#')[0];return r.fulfill({path:root+'/site/'+fp,contentType:fp.endsWith('.html')?'text/html; charset=utf-8':undefined});}
    return r.abort();});
  return {p,errs,ctx};
}
for(const s of shots){
  const [name,hash,w,h,scrollFrac,full]=s.split(':');
  const {p,errs,ctx}=await page(+w,+h);
  await p.goto('http://site/index.html#'+hash); await p.evaluate(()=>document.querySelectorAll('img').forEach(i=>i.loading='eager')); await p.waitForTimeout(1800);
  if(scrollFrac){for(let k=1;k<=8;k++){await p.evaluate(([f,k])=>window.scrollTo(0,document.documentElement.scrollHeight*f*k/8),[+scrollFrac,k]);await p.waitForTimeout(150);} await p.waitForTimeout(900);}
  await p.screenshot({path:`${root}/qa/${name}.png`,fullPage:full==='1'});
  if(errs.length) console.log(name,'ERRORS',errs.join(' | '));
  const ov=await p.evaluate(()=>document.documentElement.scrollWidth-innerWidth); if(ov>0) console.log(name,'HORIZONTAL OVERFLOW',ov);
  await ctx.close();
}
await browser.close();
