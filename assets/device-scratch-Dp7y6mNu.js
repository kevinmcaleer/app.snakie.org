const o="_snk_";function h(t){return`${o}${t}`}function i(t){return t.startsWith(o)}function s(...t){const n=t.filter(r=>!i(r));if(n.length>0)throw new Error(`delScratch: not scratch names (must start with ${o}): ${n.join(", ")}`);return t.length===0?"":[`try: del ${t.join(", ")}`,"except (NameError, KeyError): pass"].join(`
`)}function u(t,...n){const r=s(...n);if(r==="")return t.join(`
`);const a=e=>e.split(`
`).map(c=>c.length>0?`    ${c}`:c).join(`
`);return["try:",a(t.join(`
`)),"finally:",a(r)].join(`
`)}export{h as a,s as d,i,u as s};
