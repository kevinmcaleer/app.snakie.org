let n=null;function s(e){return n=e,()=>{n===e&&(n=null)}}function a(){return n?n():!0}let r=null;function l(e){return r=e,()=>{r===e&&(r=null)}}function u(){if(!r)return!0;try{return r()}catch{return!1}}async function i(e,t=o=>window.confirm(o)){return!u()&&a()&&!t(`Snakie couldn't keep a copy of your unsaved changes, so they would be lost by updating now.

Choose Cancel to save your files first, or OK to update anyway.`)?!1:(await e(),!0)}export{i as a,u as b,l as c,a as h,s};
