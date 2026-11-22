// Analizador CSV sin dependencias: comillas dobles, saltos de línea y BOM.
export function parseCSV(text){
 text=text.replace(/^\uFEFF/,''); const firstLine=text.split(/\r?\n/,1)[0]||'';
 const sep=(firstLine.match(/;/g)||[]).length>(firstLine.match(/,/g)||[]).length?';':',';
 const rows=[];let row=[],field='',inside=false;
 for(let i=0;i<text.length;i++){const c=text[i];
  if(c==='"'){if(inside&&text[i+1]==='"'){field+='"';i++;}else inside=!inside;}
  else if(c===sep&&!inside){row.push(field);field='';}
  else if((c==='\n'||c==='\r')&&!inside){if(c==='\r'&&text[i+1]==='\n')i++;row.push(field);field='';if(row.some(v=>v.trim()))rows.push(row);row=[];}
  else field+=c;
 }
 if(inside)throw Error('El CSV tiene comillas sin cerrar.');
 row.push(field);if(row.some(v=>v.trim()))rows.push(row);
 if(!rows.length)throw Error('CSV vacío.');
 const headers=rows.shift().map(h=>h.trim());return rows.map(cells=>Object.fromEntries(headers.map((h,i)=>[h,(cells[i]??'').trim()])));
}
const CODE_GI={'100':'Beginner','200':'Standard','301':'Character Event','302':'Weapon Event'};
export function normalizeRows(rows,game,origin){
 const valid=[],errors=[];
 if(!rows.length)return{valid,errors:['El archivo no contiene filas.']};
 const cols=Object.keys(rows[0]);
 if(!cols.includes('rarity')||!(cols.includes('banner_type')||cols.includes('banner_code'))){return{valid,errors:['Faltan columnas obligatorias: rarity y banner_type (o banner_code). El formato esperado es data_clean.csv / data_clean_hsr.csv.']};}
 for(let i=0;i<rows.length;i++){
  const r=rows[i],rarity=Number(r.rarity||r['星级']);const banner=String(r.banner_type||((game==='genshin'&&CODE_GI[r.banner_code])||r.banner_code)||'').trim();
  const category=String(r.item_category||r['类别']||'').trim().toLowerCase();
  if(![3,4,5].includes(rarity)||!banner){if(errors.length<5)errors.push('Fila '+(i+2)+' omitida: rareza o banner inválidos.');continue;}
  const account=String(r.account||r.profile_key||'Cuenta no identificada');
  const date=String(r.datetime||r.date||'');
  const pull=String(r.pull_number||'');
  const item=String(r.item_name||r['名称']||r.item_id||'Desconocido');
  // Se conserva una clave interna para evitar contar filas repetidas.
  const key=[game,account,banner,pull,date,String(r.item_id||item)].join('|').toLowerCase();
  valid.push({game,banner,rarity,item_category:category,item_name:item,account,pull_number:Number(pull)||null,date,source:origin,key});
 }
 return{valid,errors};
}
export function dedupe(rows){const seen=new Set();let duplicates=0;const valid=[];for(const r of rows){if(seen.has(r.key)){duplicates++;continue;}seen.add(r.key);valid.push(r);}return{valid,duplicates};}
export function csvFromRows(rows){const cols=['game','account','banner_type','pull_number','datetime','item_name','item_category','rarity'];return [cols.join(','),...rows.map(r=>[r.game,r.account,r.banner,r.pull_number||'',r.date,r.item_name,r.item_category,r.rarity].map(v=>'"'+String(v??'').replace(/"/g,'""')+'"').join(','))].join('\n');}
