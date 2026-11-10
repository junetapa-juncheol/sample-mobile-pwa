import {readdir,readFile,writeFile} from 'node:fs/promises';
async function walk(folder){
 for(const entry of await readdir(folder,{withFileTypes:true})){
  const file=`${folder}/${entry.name}`;
  if(entry.isDirectory())await walk(file);
  else if(entry.name.endsWith('.js')){
   const content=await readFile(file,'utf8');
   await writeFile(file,content.replace(/<[a-z]+ guard>/g,'<runtime guard>'));
  }
 }
}
await walk('../docs/rn');
const html=await readFile('../docs/rn/index.html','utf8');
await writeFile('../docs/rn/index.html',html.replace('lang="en"','lang="ko"'));
