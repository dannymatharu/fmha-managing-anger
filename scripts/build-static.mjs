import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import { resolve, basename } from 'node:path';
const root=process.cwd(),out=resolve(root,'.netlify-publish');
await rm(out,{recursive:true,force:true});await mkdir(out,{recursive:true});
const excluded=new Set(['.git','.netlify','.netlify-publish','.worktrees','node_modules','netlify','scripts','tests','docs','source']);
const filter=p=>!excluded.has(basename(p))&&!/\.(?:py|mjs|mts|gs|md|toml|lock)$/.test(p)&&!basename(p).startsWith('.');
for(const entry of await readdir(root,{withFileTypes:true})){
 if(!filter(resolve(root,entry.name)))continue;
 // Netlify special files start with underscore, so remain included.
 await cp(resolve(root,entry.name),resolve(out,entry.name),{recursive:true,filter});
}
console.log('Static pages assembled; function source, docs, tests and credentials excluded.');
