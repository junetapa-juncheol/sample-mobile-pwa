import {readdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const base='/sample-mobile-pwa/';
async function files(dir){const entries=await readdir(dir,{withFileTypes:true});const nested=await Promise.all(entries.filter(e=>!['rn','flutter','sw.js','.nojekyll'].includes(e.name)).map(e=>e.isDirectory()?files(`${dir}/${e.name}`):`${dir}/${e.name}`));return nested.flat();}
const paths=await files('docs');
const hash=createHash('sha256');for(const file of paths)hash.update(await readFile(file));
const revision=hash.digest('hex').slice(0,12);
const urls=[base,...paths.map(p=>base+p.slice(5))];
const source=await readFile('src/service-worker.js','utf8');
await writeFile('docs/sw.js',source.replace('__CACHE__',`one-step-${revision}`).replace('/* precache */ []',JSON.stringify(urls)));
await writeFile('docs/.nojekyll','');
console.log(`Offline shell: ${paths.length} assets`);
