export function wilson(k,n,z=1.959963984540054){if(!n)return null;const p=k/n,z2=z*z,den=1+z2/n,center=(p+z2/(2*n))/den,margin=z*Math.sqrt(p*(1-p)/n+z2/(4*n*n))/den;return{low:Math.max(0,center-margin),high:Math.min(1,center+margin)};}
// Prueba exacta bilateral tipo binomtest: suma P(K=j) para P(K=j)<=P(K=k).
export function binomialTwoSided(k,n,p){if(!Number.isInteger(n)||n<1||!Number.isInteger(k)||k<0||k>n||p<0||p>1)throw Error('Parámetros binomiales inválidos.');if(p===0)return k===0?1:0;if(p===1)return k===n?1:0;
 const logs=new Float64Array(n+1);for(let i=2;i<=n;i++)logs[i]=logs[i-1]+Math.log(i);
 const logpmf=j=>logs[n]-logs[j]-logs[n-j]+j*Math.log(p)+(n-j)*Math.log1p(-p);
 const observed=logpmf(k);let max=-Infinity;for(let i=0;i<=n;i++){const l=logpmf(i);if(l<=observed+1e-10&&l>max)max=l;}
 let sum=0;for(let i=0;i<=n;i++){const l=logpmf(i);if(l<=observed+1e-10)sum+=Math.exp(l-max);}
 return Math.min(1,Math.exp(max)*sum);
}
export function summarise(rows,fn){const n=rows.length,k=rows.reduce((acc,r)=>acc+(fn(r)?1:0),0);return{n,k,rate:n?k/n:0,ci:wilson(k,n)};}
export function fmtPct(x,d=2){return(100*x).toLocaleString('es-PE',{minimumFractionDigits:d,maximumFractionDigits:d})+' %';}
export function fmtN(n){return n.toLocaleString('es-PE');}
