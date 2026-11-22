import { CONFIG, TARGETS, isSuccess, OFFICIAL_RATES } from './config.js';
import{parseCSV,normalizeRows,dedupe}from'./csv.js';
import{summarise,fmtPct,fmtN,binomialTwoSided}from'./stats.js';
import{simulateMonteCarlo}from'./montecarlo.js';
const game=document.body.dataset.game;const config=CONFIG[game];const $=id=>document.getElementById(id);
const state={publicRows:[],privateRows:[],publicLoaded:false,privateLoaded:false,duplicates:0,invalid:[],active:[]};
const escapeHTML=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const opt=(val,label)=>`<option value="${escapeHTML(val)}">${escapeHTML(label)}</option>`;
$('app').innerHTML=`<div class="layout"><section class="panel">
 <h2>Configurar análisis</h2><p class="subtext">Elige una modalidad y configura el contraste.</p>
 <div class="field"><label for="banner">1. Tipo de banner</label><select id="banner"><option value="">Cargando banners...</option></select><small class="hint" id="bannerInfo"></small></div>
 <div class="field"><label for="target">2. Recompensa objetivo</label><select id="target">${TARGETS.map(t=>opt(t.value,t.label)).join('')}</select></div>
 <div class="field"><label for="declared">3. Probabilidad declarada (%)</label><input type="number" id="declared" value="1.6" min="0.0001" max="99.9999" step="any"><small class="hint">Para recompensas de 5 estrellas, ProbGame propone una tasa consolidada de referencia cuando está documentada. Esta tasa incluye el efecto de las garantías (pity), no representa una probabilidad fija por apertura y puede editarse. Para otras recompensas, introduce una tasa sustentada en una fuente verificable. Consulta las tasas y garantías en la información oficial del banner dentro del videojuego.</small></div>
 <div class="field"><label>4. ¿Qué registros analizar?</label>
 <label class="option-row"><input type="radio" name="mode" value="public" checked><span>Solo registros históricos de ProbGame</span></label>
 <label class="option-row"><input type="radio" name="mode" value="private"><span>Solo mi archivo CSV personal</span></label>
 <label class="option-row"><input type="radio" name="mode" value="combined"><span>Mis registros + precargados compatibles</span></label>
 </div>
 <div class="field" id="fileSection"><label for="csvFile">Archivo CSV personal (opcional si usas solo datos públicos)</label><input type="file" id="csvFile" accept=".csv,text/csv"><small class="hint" id="fileInfo">Tus archivos se procesan localmente y no se envían a ProbGame.</small></div>
 <button class="btn alt full mb" id="loadPublic" type="button">↻ Cargar / actualizar registros históricos</button>
 <button class="btn full" id="analyze" type="button">Analizar probabilidades</button>
 <p class="tiny" id="status" role="status" aria-live="polite">Iniciando...</p>
 <hr class="divider"><p class="tiny"><strong>Fuente externa:</strong> <a href="${config.source}" target="_blank" rel="noopener noreferrer">CSV histórico publicado</a>. Las variables de cuenta se usan solo para identificar duplicados; no se muestran.</p>
 </section><section class="panel" id="resultPanel"><div class="results-empty"><div class="symbol">◫</div><h2>Panel de resultados</h2><p>Selecciona un banner, indica una probabilidad y presiona «Analizar probabilidades».</p></div></section></div>`;
function status(text,error=false){$('status').textContent=text;$('status').className=error?'tiny error':'tiny loading';}
async function readPublic(){status('Leyendo el conjunto público...');$('loadPublic').disabled=true;
 try{
  let text;let source;
  
const local = await fetch(config.local, {
    cache: 'no-cache'
});

if (!local.ok) {
    throw new Error(
        'No se encontró el CSV local: ' + config.local
    );
}

text = await local.text();
source = 'copia local';

  const parsed=normalizeRows(parseCSV(text),game,'publico');if(!parsed.valid.length)throw Error(parsed.errors.join(' '));const cleaned=dedupe(parsed.valid);state.publicRows=cleaned.valid;state.publicLoaded=true;state.duplicates=cleaned.duplicates;state.invalid=parsed.errors;
  updateBanners();status(`Registros públicos cargados desde ${source}: ${fmtN(state.publicRows.length)} filas válidas · ${cleaned.duplicates} duplicados omitidos.`);
 }catch(err){state.publicLoaded=false;status('No se pudieron cargar los registros públicos. Descarga el CSV en data/ y vuelve a intentarlo. '+err.message,true);updateBanners();}
 finally{$('loadPublic').disabled=false;}
}
function mode(){return document.querySelector('input[name="mode"]:checked').value;}
function updateBanners(){
 const previous=$('banner').value;const rows=[...state.publicRows,...state.privateRows];const map=new Map();for(const r of rows)map.set(r.banner,(map.get(r.banner)||0)+1);
 const sorted=[...map.entries()].sort((a,b)=>b[1]-a[1]);$('banner').innerHTML=sorted.length?sorted.map(([name,n])=>opt(name,`${config.bannerLabels[name]||name} (${fmtN(n)} aperturas)`)).join(''):opt('','Todavía no hay datos');
 if(sorted.some(([name])=>name===previous))$('banner').value=previous;updateBannerInfo();

updateOfficialRate();
}
function updateBannerInfo(){const banner=$('banner').value;const n=state.publicRows.filter(r=>r.banner===banner).length;const own=state.privateRows.filter(r=>r.banner===banner).length;$('bannerInfo').textContent=`Registros en el banner: ${fmtN(n)} públicos · ${fmtN(own)} personales.`;}
$('banner').addEventListener('change',updateBannerInfo);

function updateOfficialRate() {

    const banner = $('banner').value;
    const target = $('target').value;

    // Limpiar resultados anteriores cuando cambia la selección.
    $('resultPanel').innerHTML = `
        <div class="results-empty">
            <div class="symbol">◫</div>
            <h2>Panel de resultados</h2>
            <p>Selecciona una recompensa y presiona
            «Analizar probabilidades» para ver
            los resultados actualizados.</p>
        </div>
    `;

$('status').textContent = 'Selecciona una recompensa y presiona «Analizar probabilidades».';

    // Las tasas guardadas corresponden únicamente
    // a cualquier recompensa de cinco estrellas.
    if (target !== 'rarity5') {
        $('declared').value = '';
        return;
    }

    // Buscar el videojuego y banner seleccionados.
    const rate = OFFICIAL_RATES[game]?.[banner];

    if (rate) {
        // Mostrar automáticamente la tasa consolidada.
        $('declared').value = String(rate.consolidated);
    } else {
        // No inventar tasas para banners sin verificar.
        $('declared').value = '';
    }
}

// Actualizar cuando el usuario cambie de banner.
$('banner').addEventListener('change', updateOfficialRate);

// Actualizar cuando cambie la recompensa objetivo.
$('target').addEventListener('change', updateOfficialRate);

$('loadPublic').addEventListener('click',readPublic);
$('csvFile').addEventListener('change',async e=>{
 const file=e.target.files?.[0];state.privateRows=[];state.privateLoaded=false;if(!file){$('fileInfo').textContent='Sin archivo personal';updateBanners();return;}
 try{if(file.size>30*1024*1024)throw Error('Máximo recomendado: 30 MB.');const text=await file.text();const parsed=normalizeRows(parseCSV(text),game,'usuario');if(!parsed.valid.length)throw Error(parsed.errors.join(' '));const clean=dedupe(parsed.valid);state.privateRows=clean.valid;state.privateLoaded=true;$('fileInfo').textContent=`${file.name}: ${fmtN(clean.valid.length)} aperturas válidas. ${clean.duplicates} duplicados internos omitidos.`;updateBanners();status('CSV personal procesado únicamente en tu navegador.');}
 catch(err){$('fileInfo').textContent='Error: '+err.message;status('CSV personal rechazado: '+err.message,true);updateBanners();}
});
for(const radio of document.querySelectorAll('input[name="mode"]'))radio.addEventListener('change',()=>{const m=mode();$('fileSection').classList.toggle('hidden',m==='public');});
$('fileSection').classList.add('hidden');
$('analyze').addEventListener('click',()=>{
 const banner=$('banner').value,target=$('target').value,pct=Number($('declared').value),m=mode();
 if(!banner)return status('Debes seleccionar un banner disponible.',true);
 if(!$('declared').value||!(pct>0&&pct<100))return status('La probabilidad declarada debe ser mayor que 0 y menor que 100.',true);
 if(m!=='private'&&!state.publicLoaded)return status('Primero carga los datos públicos.',true);
 if(m!=='public'&&!state.privateLoaded)return status('Primero selecciona un CSV personal válido.',true);
 let rows=m==='public'?state.publicRows:m==='private'?state.privateRows:[...state.publicRows,...state.privateRows];
 const pre=rows.filter(r=>r.banner===banner);const {valid,duplicates}=dedupe(pre);if(!valid.length)return status('No existen registros compatibles con ese banner.',true);
 const outcome=summarise(valid,r=>isSuccess(r,target));state.active=valid;
 const p=pct/100;let html=`<div class="row"><h2>Resultados</h2><span class="pill">${escapeHTML(config.bannerLabels[banner]||banner)}</span></div>
 <p class="subtext">Objetivo: ${escapeHTML(TARGETS.find(t=>t.value===target).label)} · ${escapeHTML(m==='public'?'Historial público':m==='private'?'Archivo personal':'Combinación compatible')}</p>
 <div class="stats"><div class="stat"><div class="description">Probabilidad declarada</div><div class="value">${fmtPct(p)}</div></div><div class="stat"><div class="description">Frecuencia observada</div><div class="value">${fmtPct(outcome.rate)}</div></div><div class="stat"><div class="description">Aperturas analizadas</div><div class="value small">${fmtN(outcome.n)}</div></div><div class="stat"><div class="description">Éxitos observados</div><div class="value small">${fmtN(outcome.k)}</div></div></div>
 <h3 class="section-title">Comparación de probabilidades</h3><div class="bars">${bar('Declarada',p,'gold')}${bar('Observada',outcome.rate,'blue')}</div>
 <h3 class="section-title">Intervalo de confianza de Wilson (95 %)</h3><div class="message">Intervalo descriptivo: <strong>${fmtPct(outcome.ci.low)} a ${fmtPct(outcome.ci.high)}</strong>. La interpretación inferencial requiere un muestreo apropiado; no garantiza representatividad de todos los jugadores.</div>
 <h3 class="section-title">Distribución de rareza</h3><table class="rtable"><tbody>${[3,4,5].map(rank=>{const k=valid.filter(r=>r.rarity===rank).length;return `<tr><td>${'★'.repeat(rank)}</td><td>${fmtN(k)} (${fmtPct(k/valid.length)})</td></tr>`}).join('')}</tbody></table>
 <h3 class="section-title">Interpretación (dos líneas)</h3><div class="two-lines"><p>Se obtuvieron <strong>${fmtN(outcome.k)}</strong> recompensas objetivo en <strong>${fmtN(outcome.n)}</strong> aperturas, con frecuencia observada de <strong>${fmtPct(outcome.rate)}</strong>.</p><p>La probabilidad introducida fue <strong>${fmtPct(p)}</strong>; sin un modelo validado de las garantías y del muestreo, la diferencia no demuestra irregularidad.</p></div>
 ${duplicates?`<div class="message warn">Se eliminaron ${duplicates} registros potencialmente duplicados al combinar las fuentes. Revisa la procedencia si coinciden cuentas.</div>`:''}
 <div class="message warn"><strong>Precaución por las garantías (pity).</strong> Las aperturas de estos juegos no son necesariamente ensayos de Bernoulli independientes con la misma probabilidad. El porcentaje base y el consolidado NO son intercambiables. Una prueba binomial simple sería solamente un escenario hipotético, no una auditoría del juego.</div>
 <label class="option-row"><input id="enableTest" type="checkbox"><span>Mostrar una prueba binomial exacta <strong>hipotética</strong>, suponiendo aperturas independientes con probabilidad fija (no representa el pity real).</span></label>
 <div id="testResult"></div>
 <details class="mc-details"><summary>¿Qué tan probable es este resultado por azar? · Monte Carlo</summary>
 <p class="subtext">Simulación ilustrativa. No reproduce completamente las reglas oficiales de banner.</p>
 <div class="mc-grid"><div><label class="label" for="mcMode">Modelo</label><select id="mcMode"><option value="independent">Independiente (probabilidad fija)</option><option value="hard">Techo de garantía simplificado</option></select></div><div><label class="label" for="mcReps">Repeticiones</label><select id="mcReps"><option value="1000">1 000</option><option value="3000" selected>3 000</option><option value="5000">5 000</option></select></div><div><label class="label" for="hardPity">Techo de garantía (solo modelo 2)</label><input type="number" id="hardPity" min="2" max="200" value="90"></div></div><button class="btn alt small" id="runMC" type="button" style="margin-top:14px">Ejecutar Monte Carlo</button><div id="mcResult"></div>
 </details><div class="source">Datos: ${escapeHTML(config.name)} · <a href="https://github.com/noviardhana/history_gi" target="_blank" rel="noopener noreferrer">repositorio histórico</a>. La selección se limita al banner elegido; no se verifica automáticamente igualdad de versión, reglas y ventanas temporales.</div>`;
 $('resultPanel').innerHTML=html;
 $('enableTest').addEventListener('change',e=>{if(!e.target.checked){$('testResult').innerHTML='';return;}let result=binomialTwoSided(outcome.k,outcome.n,p);let label=result<.05?'La diferencia sería estadísticamente significativa':'No se rechazaría la hipótesis de probabilidad fija';$('testResult').innerHTML=`<div class="message"><strong>Prueba exacta bajo supuestos artificiales:</strong> p-valor bilateral = <strong>${result.toPrecision(4)}</strong> (α = 0,05). ${label}. <strong>No válido como veredicto de justicia del juego si existe pity o sesgo de muestreo.</strong></div>`;});
 $('runMC').addEventListener('click',()=>{const model=$('mcMode').value;const reps=Number($('mcReps').value),hardPity=Number($('hardPity').value);if(!Number.isInteger(hardPity)||hardPity<2||hardPity>200){$('mcResult').textContent='Techo inválido: usa 2–200.';return;}
 $('runMC').disabled=true;$('mcResult').innerHTML='<p class="loading">Simulando...</p>';
 // Retrasar un cuadro para permitir pintar el estado de carga.
 setTimeout(()=>{try{const sim=simulateMonteCarlo({n:outcome.n,observed:outcome.k,p,repetitions:reps,model,hardPity});$('mcResult').innerHTML=`<div class="message"><strong>${fmtN(reps)} experimentos virtuales</strong><br>Éxitos promedio: ${sim.mean.toFixed(1)} · intervalo central simulado (95 %): ${sim.lower}–${sim.upper} éxitos.<br>Fracción de simulaciones con ≤ ${outcome.k} éxitos: ${fmtPct(sim.lowerTail)}.<br>Fracción con ≥ ${outcome.k} éxitos: ${fmtPct(sim.upperTail)}.<br><strong>Interpretación:</strong> estos porcentajes se refieren únicamente al modelo virtual seleccionado; no constituyen un valor p oficial del juego.</div>${model==='hard'?'<div class="message warn">Modelo de garantía simplificado: supone inicio con contador pity = 0, aumento fijo por fallo y obtención garantizada en el techo; NO modela soft pity, estado inicial desconocido, 4★, promociones o mecánicas específicas. Úsalo exclusivamente como demostración.</div>':''}`;}catch(err){$('mcResult').textContent='Error: '+err.message;}finally{$('runMC').disabled=false;}},20);});
 status('Análisis descriptivo calculado a partir de '+fmtN(outcome.n)+' aperturas.');
});
function bar(label,fraction,type){return`<div class="bar-row"><div class="bar-label"><span>${label}</span><strong>${fmtPct(fraction)}</strong></div><div class="bar-track"><div class="bar ${type}" style="width:${Math.max(0,Math.min(100,fraction*100))}%"></div></div></div>`;}
readPublic();
