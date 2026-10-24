"""Regenerate the static hub. Python standard library only."""
from pathlib import Path
import json
root=Path(__file__).resolve().parents[1]
base='/academy-nd-briefings/'
html=(root/'source/template.html').read_text()
data=json.loads((root/'source/briefings.json').read_text())
html=html.replace('href="/"',f'href="{base}"').replace('href="/#',f'href="{base}#').replace('src="/academy.webp"',f'src="{base}academy.webp"')
html=html.replace("return '/briefing/'+b.id",f"return '{base}briefing/'+b.id")
html=html.replace("document.getElementById('search').addEventListener('input',render)","document.getElementById('search').oninput=render")
html=html.replace('const DATA=__DATA__;', 'const DATA='+json.dumps(data).replace('<','\\u003c')+';')
html=html.replace("}init();", "}init();\nfetch('https://fmha-academy-nd-briefings.dannymatharu.chatgpt.site/api/briefings',{signal:AbortSignal.timeout(6000),cache:'no-store'}).then(r=>{if(!r.ok)throw Error('Collection unavailable');return r.json()}).then(rows=>{if(!Array.isArray(rows)||!rows.length)throw Error('Empty collection');DATA.splice(0,DATA.length,...rows);latest=DATA[0];init()}).catch(()=>{const n=document.createElement('p');n.className='smallnote';n.textContent='Showing the saved collection. The latest briefings could not be loaded.';document.querySelector('.sectionhead').after(n)});")
assert '__DATA__' not in html
assert 'href="/"' not in html
assert 'href="/#' not in html
(root/'index.html').write_text(html)
print('Generated static hub with',len(data),'fallback briefings and live collection feed.')
