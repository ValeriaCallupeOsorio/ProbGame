// Monte Carlo para dos modelos HIPOTÉTICOS, no una réplica certificada del juego.
// El modelo hard-pity incluye techo, pero NO incluye soft pity, cambios de tasas, ni garantías promocionales.
export function simulateMonteCarlo({n,observed,p,repetitions=3000,model='independent',hardPity=90}){
 if(!Number.isInteger(n)||n<1||n>100000||repetitions<100||repetitions>10000||p<0||p>1)throw Error('Parámetros de simulación inválidos.');
 const values=[];let extremes=0,less=0,greater=0;const center=n*p;
 for(let t=0;t<repetitions;t++){
  let count=0,pity=0;
  for(let j=0;j<n;j++){
   const won=model==='hard'&&(pity+1>=hardPity)||Math.random()<p;
   if(won){count++;pity=0;}else pity++;
  }
  values.push(count);if(count<=observed)less++;if(count>=observed)greater++;
  if(Math.abs(count-center)>=Math.abs(observed-center)-1e-12)extremes++;
 }
 values.sort((a,b)=>a-b);return{repetitions,values,mean:values.reduce((a,b)=>a+b,0)/repetitions,lower:values[Math.floor(.025*(repetitions-1))],upper:values[Math.floor(.975*(repetitions-1))],lowerTail:less/repetitions,upperTail:greater/repetitions,extremes:extremes/repetitions,model};
}
