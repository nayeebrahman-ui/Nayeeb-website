import os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
head=open('src/head.html').read().replace('</style>', open('src/home.css').read()+open('src/shell.css').read()+open('src/scroll.css').read()+open('src/about.css').read()+open('src/consulting.css').read()+open('src/partner.css').read()+open('src/case.css').read()+open('src/hire.css').read()+'\n</style>'); body=open('src/body.html').read().replace('{{SPRITE}}',open('sprite.html').read()); js=open('src/app.js').read().replace('  /*__SHELL__*/',open('src/shell.js').read())
scripts='<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>\n<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>\n<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.20/dist/lenis.min.js"></script>\n'
head=head.replace('</title>','</title>\n<script>document.documentElement.classList.add("js")</script>',1)
out=head+'\n'+body+'\n'+scripts+'<script>\n'+js+'\n</script>\n'
open('site/index.html','w').write(out)
assert out.count('—')==0 and out.count('–')==0
print('built',len(out))
