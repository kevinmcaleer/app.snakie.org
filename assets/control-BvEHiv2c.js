const u="snakie://virtual",d="Simulated device (offline)",h="Simulated device";function p(t){return t===u}const c="_snk_";function l(t){return t.startsWith(c)}function f(...t){const n=t.filter(r=>!l(r));if(n.length>0)throw new Error(`delScratch: not scratch names (must start with ${c}): ${n.join(", ")}`);return t.length===0?"":[`try: del ${t.join(", ")}`,"except (NameError, KeyError): pass"].join(`
`)}function $(t,...n){const r=f(...n);if(r==="")return t.join(`
`);const s=o=>o.split(`
`).map(i=>i.length>0?`    ${i}`:i).join(`
`);return["try:",s(t.join(`
`)),"finally:",s(r)].join(`
`)}const e="SNKCMD";function a(t){return t.replace(/[\r\n]+/g," ")}function j(t,n=""){const r=a(t).trim().split(/\s+/).filter(Boolean).join("-"),s=a(n).trim(),o=s===""?r:`${r} ${s}`;return`${e} ${o}
`}function m(t){if(!t)return!1;const n=t.trimStart();return n===e||n.startsWith(`${e} `)}function T(t,n={}){const r=[],s=Object.entries(t).map(([o,i])=>`${o}:${i}`);s.length>0&&r.push(`axes=${s.join(",")}`);for(const[o,i]of Object.entries(n))i&&r.push(`btn:${o}=1`);return r.join(" ")}function S(t){const n=[];for(const[r,s]of Object.entries(t))Number.isFinite(s)&&n.push(`${r}:${Math.round(s)}`);return n.join(" ")}export{e as C,h as V,l as a,m as b,d as c,f as d,T as e,S as f,u as g,j as h,p as i,$ as s};
