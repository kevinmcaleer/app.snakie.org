import{h as me,q as z,t as ue,u as he,k as ge,n as fe,r as ye,M as se,v as be,w as I,x as we}from"./robot-yaml-COsFVOjx.js";import{a as Y}from"./index-urgtWgyv.js";class _e{worker=null;onOutput=null;nextId=1;pending=new Map;readyResolve=null;readyReject=null;busy=0;async init(e){this.onOutput=e,await this.spawn()}spawn(){const e=new Worker(new URL("/assets/mp.worker-BFriWdqN.js",import.meta.url),{type:"module"});this.worker=e,e.onmessage=a=>this.handle(a.data),e.onerror=a=>{const t=new Error(a.message||"MicroPython worker failed to load");for(const s of this.pending.values())s.reject(t);this.pending.clear(),this.busy=0,this.readyReject?.(t),this.readyResolve=null,this.readyReject=null,this.worker===e&&(this.worker=null),e.terminate()};const n=new Promise((a,t)=>{this.readyResolve=a,this.readyReject=t});return e.postMessage({type:"init"}),n}handle(e){if(e.type==="out"){this.onOutput?.(e.bytes);return}if(e.type==="ready"){this.readyResolve?.(),this.readyResolve=null,this.readyReject=null;return}this.busy=Math.max(0,this.busy-1);const n=this.pending.get(e.id);n&&(this.pending.delete(e.id),e.error?n.reject(new Error(e.error)):n.resolve(e.type==="result"?e.value:void 0))}request(e){if(!this.worker)return Promise.reject(new Error("MicroPython worker is not running"));const n=this.nextId++;return this.busy++,new Promise((a,t)=>{this.pending.set(n,{resolve:a,reject:t,kind:e.type}),this.worker.postMessage({...e,id:n})})}feed(e){return this.request({type:"feed",data:e})}runCaptured(e){return this.request({type:"run",code:e})}runStream(e){return this.request({type:"runStream",code:e})}async interrupt(){if(this.busy<=0){await this.feed("").catch(()=>{});return}await this.reboot()}async reboot(){for(const e of this.pending.values())e.kind==="feed"||e.kind==="runStream"?e.resolve(void 0):e.reject(new Error("interrupted"));this.pending.clear(),this.busy=0,this.worker?.terminate(),this.worker=null,this.onOutput?.(new TextEncoder().encode(`\r
[stopped — simulator restarted]\r
`)),await this.spawn()}dispose(){this.worker?.terminate(),this.worker=null,this.onOutput=null,this.pending.clear(),this.busy=0}}const S="SNK",F="<<SNKV>>";function P(i,e=3){return Number(i.toFixed(e)).toString()}function Se(i){const e=i*.12,n=[];n.push(`${S} SCOPE ch1 ${P(Math.sin(e*2),4)}`),n.push(`${S} SCOPE pwm ${P(.5+.5*Math.sin(e),4)}`),n.push(`${S} METER adc0 ${P(1.65+.4*Math.sin(e*.7))} V`);const a=22+2*Math.sin(e*.3),t=Math.round(50+40*Math.sin(e*.5+1));n.push(`${S} PLOT temp=${P(a,1)} light=${t}`);const s=1009+8*Math.sin(e*.15),l=Math.round(52+12*Math.sin(e*.22+.5));return n.push(`${S} ENV env ${P(a,1)} ${P(s,1)} ${l}`),n.push(`${S} IMU imu ${P(20*Math.sin(e))} ${P(15*Math.sin(e*.8+1))} ${P(i*3%360)}`),n.push(`${S} DIST dist ${Math.round(150+120*Math.sin(e*.6))}`),n.push(`${S} ENC enc ${i}`),n.push(`${S} BTN a ${i%40<3?1:0}`),i%16===0&&n.push(`${S} READY scope meter plot env imu dist enc btn`),n}function xe(i,e){const n=[],a=new RegExp(`${F.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}(\\d+):`,"g");let t;for(;(t=a.exec(i))!==null;){const s=Number.parseInt(t[1],10);Number.isInteger(s)&&!n.includes(s)&&n.push(s)}return n.map(s=>{const l=Math.round(32768*(1+Math.sin(e*.4+s)));return`${F}${s}:${l}`}).join(`
`)}function Pe(i){return i.includes(F)}const ve=120,M=new TextEncoder,x=i=>`'${i.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/\n/g,"\\n").replace(/\r/g,"\\r")}'`,Ce=i=>{const e=i.lastIndexOf("/"),n=e>0?i.slice(0,e):"";return!n||n==="/"?"":["import os",'_cur=""',`for _s in ${x(n)}.strip("/").split("/"):`,'    _cur+="/"+_s',"    try:","        os.mkdir(_cur)","    except OSError:","        pass"].join(`
`)},ke=new Set(["dev","proc","tmp","home"]);function De(){const i=new Set,e=new Set;let n="disconnected",a=null,t=0,s=null;const l=m=>i.forEach(o=>o(m)),d=()=>{if(n!=="connected")return;const m=Se(t++);m.length>0&&l(M.encode(m.join(`\r
`)+`\r
`))},h=()=>{s||(s=setInterval(d,ve))},p=()=>{s&&(clearInterval(s),s=null)},u=()=>({state:n,path:z,baudRate:115200}),b=m=>{n=m;const o=u();e.forEach(r=>r(o))},_=async m=>{if(!a)throw new Error("Not connected");return a.runCaptured(m)};return{listPorts:async()=>[{path:z,friendlyName:me}],connect:async()=>{if(n!=="connected"){b("connecting"),a=new _e;try{await a.init(l)}catch(m){l(M.encode(`\r
Simulated device — Python REPL unavailable (${String(m)}).\r
>>> `))}b("connected"),h()}},disconnect:async()=>{p(),a?.dispose(),a=null,n!=="disconnected"&&b("disconnected")},getStatus:async()=>u(),exec:async m=>Pe(m)?{stdout:xe(m,t),stderr:""}:{stdout:await _(m),stderr:""},eval:async m=>_(m),sendData:async m=>{a&&await a.feed(m)},runProgram:async m=>{a&&await a.runStream(m)},sendControl:async()=>{},interrupt:async()=>{a&&await a.interrupt()},softReset:async()=>{a&&await a.feed("")},listDir:async(m="/")=>{const o=["import os, json","def _ls(p):","    out=[]","    try: it=os.ilistdir(p)","    except AttributeError: it=[(n,0,0) for n in os.listdir(p)]","    for e in it:","        name=e[0]; typ=e[1] if len(e)>1 else 0",'        full=(p.rstrip("/")+"/"+name) if p else name',"        isdir=(typ & 0x4000)!=0","        try: size=0 if isdir else os.stat(full)[6]","        except OSError: size=0","        out.append([name,isdir,size])","    return out",`print(json.dumps(_ls(${x(m)})))`].join(`
`),r=(await _(o)).trim(),c=r?JSON.parse(r):[],g=m===""||m==="/";return c.filter(([f,w])=>!(g&&w&&ke.has(f))).map(([f,w,k])=>({name:f,isDir:w,size:k}))},df:async()=>null,readFile:async m=>_(`import sys
with open(${x(m)}) as f:
    sys.stdout.write(f.read())`),writeFile:async(m,o)=>{const r=Array.from(M.encode(o)).map(g=>g.toString(16).padStart(2,"0")).join(""),c=[Ce(m),`_d=bytes.fromhex(${x(r)})`,`with open(${x(m)},'wb') as f:`,"    f.write(_d)"].filter(Boolean).join(`
`);await _(c)},remove:async m=>{await _(["import os",`_s = [${x(m)}]`,"while _s:","    _p = _s[-1]","    if (os.stat(_p)[0] & 0x4000) != 0:","        _c = os.listdir(_p)","        if _c:","            _s.extend([_p + '/' + _x for _x in _c])","        else:","            os.rmdir(_p); _s.pop()","    else:","        os.remove(_p); _s.pop()"].join(`
`))},mkdir:async m=>{await _(`import os
os.mkdir(${x(m)})`)},rename:async(m,o)=>{await _(`import os
os.rename(${x(m)}, ${x(o)})`)},stat:async m=>{const o=["import os, json",`st=os.stat(${x(m)})`,"isdir=(st[0] & 0x4000)!=0","print(json.dumps([isdir, st[6], st[8] if len(st)>8 else None]))"].join(`
`),[r,c,g]=JSON.parse((await _(o)).trim());return{isDir:r,size:c,mtime:g??void 0}},onData:m=>(i.add(m),()=>i.delete(m)),onStatus:m=>(e.add(m),()=>e.delete(m))}}const Te="",Ae="",L="",T="";function v(i){return`'${i.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/\r/g,"\\r").replace(/\n/g,"\\n")}'`}const Ee=new TextEncoder,A=new TextDecoder,B=i=>Uint8Array.from(i,e=>e.charCodeAt(0)&255);function Ie(i,e){if(e.length===0)return 0;e:for(let n=0;n+e.length<=i.length;n++){for(let a=0;a<e.length;a++)if(i[n+a]!==e[a])continue e;return n}return-1}function Ne(i,e){const n=new Uint8Array(i.length+e.length);return n.set(i),n.set(e,i.length),n}class Re{constructor(e,n){this.transport=e,this.onConsole=n,e.onData(a=>this.handleData(a))}rxBuffer=new Uint8Array(0);pending=null;streamPending=null;inRawRepl=!1;execActive=!1;opQueue=Promise.resolve();handleData(e){this.rxBuffer=Ne(this.rxBuffer,e),this.streamPending?this.pumpStream():this.tryResolvePending(),this.execActive||this.onConsole(e)}pumpStream(){const e=this.rxBuffer.indexOf(4);if(e===-1){this.rxBuffer.length>0&&(this.onConsole(this.rxBuffer),this.rxBuffer=new Uint8Array(0));return}const n=this.rxBuffer.slice(0,e);n.length>0&&this.onConsole(n),this.rxBuffer=this.rxBuffer.slice(e+1);const a=this.streamPending;this.streamPending=null,a?.resolve()}streamUntilCtrlD(){return this.streamPending?Promise.reject(new Error("A stream is already in progress")):new Promise((e,n)=>{this.streamPending={resolve:e,reject:n},this.pumpStream()})}tryResolvePending(){if(!this.pending)return;const e=Ie(this.rxBuffer,this.pending.marker);if(e===-1)return;const n=e+this.pending.marker.length,a=this.rxBuffer.slice(0,n);this.rxBuffer=this.rxBuffer.slice(n);const{resolve:t,timer:s}=this.pending;clearTimeout(s),this.pending=null,t(a)}write(e){return this.transport.write(typeof e=="string"?B(e):e)}readUntil(e,n=5e3){return this.pending?Promise.reject(new Error("A read is already in progress")):new Promise((a,t)=>{const s=setTimeout(()=>{this.pending=null,t(new Error(`Timed out waiting for ${JSON.stringify(e)}`))},n);this.pending={marker:B(e),resolve:a,reject:t,timer:s},this.tryResolvePending()})}async sendData(e){await this.write(e)}async sendControl(e,n=""){await this.write(ue(e,n))}async interrupt(){await this.write(L)}async softReset(){await this.write(T)}async enterRawRepl(){this.rxBuffer=new Uint8Array(0),await this.write(L),await this.write(L),await this.write(Te),await this.readUntil(`raw REPL; CTRL-B to exit\r
>`),this.inRawRepl=!0}async exitRawRepl(){const e=this.execActive;this.execActive=!0;try{await this.write(Ae),this.inRawRepl=!1,await this.readUntil(">>> ",2e3).catch(()=>{}),this.rxBuffer=new Uint8Array(0)}finally{this.execActive=e}}exec(e,n=1e4){const a=this.opQueue.then(()=>this.execLocked(e,n));return this.opQueue=a.catch(()=>{}),a}async execLocked(e,n){this.execActive=!0;try{const a=!this.inRawRepl;a&&await this.enterRawRepl();try{await this.write(e),await this.write(T);const t=await this.readUntil("OK",n);if(!A.decode(t).includes("OK"))throw new Error('Device did not acknowledge code (no "OK")');const s=await this.readUntil(T,n),l=A.decode(s.subarray(0,s.length-1)),d=await this.readUntil(T,n),h=A.decode(d.subarray(0,d.length-1));return await this.readUntil(">",n),{stdout:l,stderr:h}}finally{a&&await this.exitRawRepl().catch(()=>{})}}finally{this.execActive=!1}}async eval(e,n=1e4){const{stdout:a,stderr:t}=await this.exec(e,n);if(t.trim().length>0)throw new Error(t.trim());return a}runProgram(e){const n=this.opQueue.then(()=>this.runLocked(e));return this.opQueue=n.catch(()=>{}),n}async runLocked(e){this.execActive=!0;try{const n=!this.inRawRepl;n&&await this.enterRawRepl();try{await this.write(e),await this.write(T);const a=await this.readUntil("OK");if(!A.decode(a).includes("OK"))throw new Error('Device did not acknowledge the program (no "OK")');await this.streamUntilCtrlD(),await this.streamUntilCtrlD(),await this.readUntil(">")}finally{n&&(await this.exitRawRepl().catch(()=>{}),this.onConsole(B(`\r
>>> `)))}}finally{this.execActive=!1}}async listDir(e="/"){const n=["import os, json","def _ls(p):","    out=[]","    try:","        it=os.ilistdir(p)","    except AttributeError:","        it=[(n,0,0) for n in os.listdir(p)]","    for e in it:","        name=e[0]; typ=e[1] if len(e)>1 else 0",'        full=(p.rstrip("/")+"/"+name) if p else name',"        isdir=(typ & 0x4000)!=0","        try: size=0 if isdir else os.stat(full)[6]","        except OSError: size=0","        out.append([name,isdir,size])","    return out",`print(json.dumps(_ls(${v(e)})))`].join(`
`),a=(await this.eval(n)).trim();return(a?JSON.parse(a):[]).map(([s,l,d])=>({name:s,isDir:l,size:d}))}async readFile(e){return A.decode(await this.readFileBytes(e))}async readFileBytes(e){const n=["import sys",`try:
 import ubinascii
except ImportError:
 import binascii as ubinascii`,`with open(${v(e)},'rb') as f:`,"    while True:","        b=f.read(256)","        if not b: break","        sys.stdout.write(ubinascii.hexlify(b))"].join(`
`),a=(await this.eval(n)).trim(),t=new Uint8Array(a.length/2);for(let s=0;s<t.length;s++)t[s]=parseInt(a.substr(s*2,2),16);return t}async writeFile(e,n,a=256){const t=typeof n=="string"?Ee.encode(n):n;await this.eval([`try:
 import ubinascii
except ImportError:
 import binascii as ubinascii`,`_f=open(${v(e)},'wb')`].join(`
`));try{for(let s=0;s<t.length||s===0;s+=a){const l=t.subarray(s,s+a);if(l.length===0&&s>0)break;let d="";for(const h of l)d+=h.toString(16).padStart(2,"0");if(await this.eval(`_f.write(ubinascii.unhexlify(${v(d)}))`),l.length<a)break}}finally{await this.eval("_f.close()").catch(()=>{})}}async mkdir(e){await this.eval(`import os
os.mkdir(${v(e)})`)}async rename(e,n){await this.eval(`import os
os.rename(${v(e)}, ${v(n)})`)}async remove(e){await this.eval(["import os",`_s = [${v(e)}]`,"while _s:","    _p = _s[-1]","    if (os.stat(_p)[0] & 0x4000) != 0:","        _c = os.listdir(_p)","        if _c:","            _s.extend([_p + '/' + _x for _x in _c])","        else:","            os.rmdir(_p); _s.pop()","    else:","        os.remove(_p); _s.pop()"].join(`
`))}async stat(e){const n=["import os, json",`st=os.stat(${v(e)})`,"isdir=(st[0] & 0x4000)!=0","mtime=st[8] if len(st)>8 else None","print(json.dumps([isdir, st[6], mtime]))"].join(`
`),[a,t,s]=JSON.parse((await this.eval(n)).trim());return{isDir:a,size:t,mtime:s??void 0}}}const re=[{usbVendorId:11914,label:"Raspberry Pi (Pico / RP2040)"},{usbVendorId:12346,label:"Espressif (ESP32-S2/S3, native USB)"},{usbVendorId:9114,label:"Adafruit board"},{usbVendorId:4292,label:"Silicon Labs CP210x bridge (ESP32)"},{usbVendorId:6790,label:"WCH CH340 bridge"},{usbVendorId:1027,label:"FTDI bridge"},{usbVendorId:1659,label:"Prolific PL2303 bridge"}],Ge=re.map(i=>({usbVendorId:i.usbVendorId}));function Me(i,e){const n=re.find(s=>s.usbVendorId===i),a=s=>s==null?"????":s.toString(16).padStart(4,"0"),t=`${a(i)}:${a(e)}`;return n?`${n.label} · ${t}`:`USB serial device · ${t}`}const R=()=>navigator.serial??null,J=()=>R()!==null;class Le{constructor(e){this.port=e}reader=null;dataCb=null;closeCb=null;closed=!1;async open(e=115200){await this.port.open({baudRate:e}),this.readLoop()}async readLoop(){for(;this.port.readable&&!this.closed;){const e=this.port.readable.getReader();this.reader=e;try{for(;;){const{value:n,done:a}=await e.read();if(a)break;n&&n.length&&this.dataCb?.(n)}}catch{}finally{e.releaseLock()}}this.closed||this.closeCb?.()}onData(e){this.dataCb=e}onClose(e){this.closeCb=e}async write(e){if(!this.port.writable)throw new Error("Serial port is not writable");const n=this.port.writable.getWriter();try{await n.write(e)}finally{n.releaseLock()}}async setSignals(e){await this.port.setSignals?.(e)}async close(){this.closed=!0;try{await this.reader?.cancel()}catch{}try{await this.port.close()}catch{}}}const G="webserial://",K="webserial://pick",Z=new TextEncoder;function Be(){const i=new Set,e=new Set;let n="disconnected",a="",t=null,s=null,l=null;const d=new Map,h=o=>i.forEach(r=>r(o)),p=(o,r=a)=>{n=o,a=r;const c={state:n,path:a,baudRate:115200};e.forEach(g=>g(c))},u=()=>{if(!s)throw new Error("No board connected");return s},b=()=>{n!=="disconnected"&&(t=null,s=null,l=null,h(Z.encode(`\r
[board disconnected — USB unplugged]\r
`)),p("disconnected",""))},_=R();_&&_.addEventListener?.("disconnect",o=>{const r=o.target;l&&r===l&&b()});const m=async(o,r)=>{p("connecting",r),l=o,t=new Le(o),t.onClose(b),await t.open(115200),s=new Re(t,h),p("connected",r),s.eval("import os as _o; print('MicroPython v' + _o.uname().version + '; ' + _o.uname().machine)").then(c=>{const g=c.trim();g&&h(Z.encode(`\r
${g}\r
Type "help()" for more information.\r
>>> `))}).catch(()=>{})};return{listPorts:async()=>{const o=R();return o?(d.clear(),(await o.getPorts()).map((c,g)=>{const f=`${G}${g}`;d.set(f,c);const{usbVendorId:w,usbProductId:k}=c.getInfo();return{path:f,friendlyName:Me(w,k)}})):[]},connect:async o=>{const r=R();if(!r)throw new Error("Web Serial needs a Chromium-based browser");let c;if(o===K){c=await r.requestPort({filters:Ge});const g=d.size;o=`${G}${g}`,d.set(o,c)}else c=d.get(o)??(await r.getPorts())[Number(o.slice(G.length))];if(!c)throw new Error("That serial port is no longer available");await m(c,o)},disconnect:async()=>{await t?.close(),t=null,s=null,l=null,n!=="disconnected"&&p("disconnected","")},getStatus:async()=>({state:n,path:a,baudRate:115200}),exec:async o=>u().exec(o),eval:async o=>u().eval(o),sendData:async o=>u().sendData(o),runProgram:async o=>u().runProgram(o),sendControl:async(o,r)=>u().sendControl(o,r??""),interrupt:async()=>u().interrupt(),softReset:async()=>u().softReset(),listDir:async(o="/")=>u().listDir(o),df:async()=>null,readFile:async o=>u().readFile(o),readFileBytes:async o=>u().readFileBytes(o),writeFile:async(o,r)=>u().writeFile(o,r),remove:async o=>u().remove(o),mkdir:async o=>u().mkdir(o),rename:async(o,r)=>u().rename(o,r),stat:async o=>u().stat(o),onData:o=>(i.add(o),()=>i.delete(o)),onStatus:o=>(e.add(o),()=>e.delete(o))}}const y=(i,e,...n)=>i[e](...n);function Oe(){const i=De(),e=Be();let n=i;const a=t=>t===K||t.startsWith(G);return{listPorts:async()=>{const t=await y(i,"listPorts"),s=J()?await y(e,"listPorts"):[],l=J()?[{path:K,friendlyName:"＋ Connect a USB board…"}]:[];return[...t,...s,...l]},connect:async t=>{const s=a(t)?e:i;n!==s&&await y(n,"disconnect").catch(()=>{}),n=s,await y(s,"connect",t)},disconnect:async()=>{await y(n,"disconnect")},getStatus:async()=>y(n,"getStatus"),exec:async t=>y(n,"exec",t),eval:async t=>y(n,"eval",t),sendData:async t=>y(n,"sendData",t),runProgram:async t=>y(n,"runProgram",t),sendControl:async(t,s)=>y(n,"sendControl",t,s),interrupt:async()=>y(n,"interrupt"),softReset:async()=>y(n,"softReset"),listDir:async(t="/")=>y(n,"listDir",t),df:async()=>y(n,"df"),readFile:async t=>y(n,"readFile",t),readFileBytes:async t=>y(n,"readFileBytes",t),writeFile:async(t,s)=>y(n,"writeFile",t,s),remove:async t=>y(n,"remove",t),mkdir:async t=>y(n,"mkdir",t),rename:async(t,s)=>y(n,"rename",t,s),stat:async t=>y(n,"stat",t),onData:t=>{const s=y(i,"onData",t),l=y(e,"onData",t);return()=>{s(),l()}},onStatus:t=>{const s=y(i,"onStatus",t),l=y(e,"onStatus",t);return()=>{s(),l()}}}}function O(i,e){let n=e.startsWith("/")?e.slice(1):e;if(i){if(n===i)return[];n.startsWith(i+"/")&&(n=n.slice(i.length+1))}const a=[];for(const t of n.split("/"))!t||t==="."||(t===".."?a.pop():a.push(t));return a}function V(i,e){return i.endsWith("/")?i+e:`${i}/${e}`}const Ve="snakie-web",C="kv",j="lastFolderHandle";function $(){return new Promise((i,e)=>{const n=indexedDB.open(Ve,1);n.onupgradeneeded=()=>{n.result.objectStoreNames.contains(C)||n.result.createObjectStore(C)},n.onsuccess=()=>i(n.result),n.onerror=()=>e(n.error)})}async function We(i){try{const e=await $();await new Promise((n,a)=>{const t=e.transaction(C,"readwrite");t.objectStore(C).put(i,j),t.oncomplete=()=>n(),t.onerror=()=>a(t.error)}),e.close()}catch{}}async function Ue(){try{const i=await $(),e=await new Promise((n,a)=>{const s=i.transaction(C,"readonly").objectStore(C).get(j);s.onsuccess=()=>n(s.result??null),s.onerror=()=>a(s.error)});return i.close(),e??null}catch{return null}}async function ze(){try{const i=await $();await new Promise((e,n)=>{const a=i.transaction(C,"readwrite");a.objectStore(C).delete(j),a.oncomplete=()=>e(),a.onerror=()=>n(a.error)}),i.close()}catch{}}const Fe="Projects";function H(){if("showDirectoryPicker"in window)return!1;const i=globalThis.FileSystemFileHandle;return typeof navigator<"u"&&typeof navigator.storage?.getDirectory=="function"&&!!i&&"createWritable"in i.prototype}function Ke(){const i=window,e=async()=>{const r=await navigator.storage.getDirectory();return navigator.storage.persist?.().catch(()=>{}),r.getDirectoryHandle(Fe,{create:!0})};let n=null,a="";const t=new Map;let s=0;const l=r=>{const c=`loose://${++s}/${r.name}`;return t.set(c,r),c};let d=null;const h=r=>(n=r,a=r.name,d=null,We(r),a),p=(async()=>{if(H()){try{n=await e(),a=n.name}catch{}return}try{const r=await Ue();if(!r)return;(await r.queryPermission?.({mode:"readwrite"})??"granted")==="granted"?(n=r,a=r.name):d=r}catch{}})(),u=async(r,c=!1)=>{if(await p,!n)throw new Error("No folder is open");let g=n;for(const f of O(a,r))g=await g.getDirectoryHandle(f,{create:c});return g},b=async(r,c=!1)=>{if(t.has(r))return t.get(r);if(r.startsWith("loose://"))throw new Error("That file is no longer available — open it again.");if(await p,!n)throw new Error("No folder is open");const g=O(a,r),f=g.pop();if(f===void 0)throw new Error(`Not a file path: ${r}`);let w=n;for(const k of g)w=await w.getDirectoryHandle(k,{create:c});return w.getFileHandle(f,{create:c})},_=async r=>{const g=await(await r.getFile()).arrayBuffer();return new Uint8Array(g)},m=async r=>{if(t.delete(r)||!n)return;const c=O(a,r),g=c.pop();if(g===void 0)return;let f=n;for(const w of c)f=await f.getDirectoryHandle(w);await f.removeEntry(g,{recursive:!0})},o=async(r,c)=>{let g=!0;try{await b(r)}catch{g=!1}if(g){const w=await _(await b(r)),Q=await(await b(c,!0)).createWritable();await Q.write(w),await Q.close();return}const f=await u(r);await u(c,!0);for await(const[w]of f.entries())await o(V(r,w),V(c,w))};return{openFolderDialog:async()=>{if(!i.showDirectoryPicker){if(!H())return null;try{return await p,n=await e(),a=n.name,a}catch{return null}}try{return h(await i.showDirectoryPicker({mode:"readwrite"}))}catch{return null}},reopenFolderName:async()=>(await p,d?.name??null),reopenFolder:async()=>{if(await p,!d)return null;try{const r=await d.requestPermission?.({mode:"readwrite"})??"granted";return r!=="granted"?(r==="denied"&&(d=null,ze()),null):h(d)}catch{return null}},openFileDialog:async()=>{if(!i.showOpenFilePicker)return null;try{const[r]=await i.showOpenFilePicker();return l(r)}catch{return null}},saveFileDialog:async r=>{if(!i.showSaveFilePicker)return null;try{const c=await i.showSaveFilePicker({suggestedName:r});return l(c)}catch{return null}},readDir:async r=>{const c=await u(r),g=[];for await(const[f,w]of c.entries())g.push({name:f,path:V(r,f),isDir:w.kind==="directory"});return g.sort((f,w)=>f.isDir===w.isDir?f.name.localeCompare(w.name):f.isDir?-1:1)},readFile:async r=>(await b(r)).getFile().then(c=>c.text()),readFileBytes:async r=>_(await b(r)),writeFile:async(r,c)=>{const f=await(await b(r,!0)).createWritable();await f.write(c),await f.close()},writeFileBytes:async(r,c)=>{const f=await(await b(r,!0)).createWritable();await f.write(c),await f.close()},mkdir:async r=>{await u(r,!0)},rename:async(r,c)=>{if(r!==c){let g=!1;try{const f=await b(c),w=await b(r);g=!await f.isSameEntry?.(w)}catch{try{await u(c),g=!0}catch{g=!1}}if(g)throw new Error(`"${c.split("/").pop()}" already exists.`)}await o(r,c),await m(r)},remove:async r=>m(r),stat:async r=>{try{const c=await(await b(r)).getFile();return{isDir:!1,size:c.size,mtimeMs:c.lastModified}}catch{return await u(r),{isDir:!0,size:0,mtimeMs:0}}}}}const W="snakie.web.robot-yml",ee=()=>({parts:[],connections:[]}),N=i=>typeof i=="string"&&i.trim().length>0,U=i=>`${i.replace(/[/\\]+$/,"")}/robot.yml`,ne=i=>{const e=i.lastIndexOf("/");return e>0?i.slice(0,e):""};function He(i){const e=new Map,n=(t,s)=>{const d=(e.get(t)??Promise.resolve()).catch(()=>{}).then(()=>i.writeFile(t,s));return e.set(t,d),d},a=new Set;return{load:async t=>{let s;try{s=N(t)?await i.readFile(U(t)):window.localStorage.getItem(W)??""}catch{return ee()}try{return ye(s)}catch{try{N(t)?await i.writeFile(`${U(t)}.bak`,s):window.localStorage.setItem(`${W}.bak`,s)}catch{}return ee()}},save:async(t,s)=>{try{const l=he(s);if(N(t)?await n(U(t),l):window.localStorage.setItem(W,l),N(t)){const d=Y(s)?.urdf;if(d)try{const h=t.replace(/[/\\]+$/,""),p=await i.readFile(`${h}/${d}`),u=ge(fe(p,Y(s)?.servoJointMap));await i.writeFile(`${h}/skeleton.json`,u)}catch{}}return{ok:!0}}catch(l){return{ok:!1,error:l instanceof Error?l.message:String(l)}}},importMesh:async(t,s)=>{if(!t)return{error:"No robot file to import into"};if(s)return{error:"Copying external meshes isn't available in the browser"};const l=window.showOpenFilePicker;if(!l)return{error:"Mesh import needs a browser with file pickers (Chromium)"};let d;try{const[h]=await l({types:[{description:"Mesh",accept:{"application/octet-stream":[".stl",".dae"]}}]});d=h}catch{return{cancelled:!0}}try{const h=await d.getFile(),p=new Uint8Array(await h.arrayBuffer()),u=`${ne(t)?ne(t)+"/":""}meshes`;await i.mkdir(u);const b=d.name.lastIndexOf("."),_=b>0?d.name.slice(0,b):d.name,m=b>0?d.name.slice(b):"";let o=d.name;for(let r=1;r<1e3;r++)try{await i.stat(`${u}/${o}`),o=`${_}-${r}${m}`}catch{break}return await i.writeFileBytes(`${u}/${o}`,p),{rel:`meshes/${o}`,name:o}}catch(h){return{error:h instanceof Error?h.message:String(h)}}},importPartMesh:async()=>({}),onChanged:t=>(a.add(t),()=>a.delete(t))}}const Xe={"adafruit-feather-esp32s3":new URL("parts/adafruit-feather-esp32s3-image-QJQGAXaH.png",import.meta.url).href,"adafruit-feather-nrf52840":new URL("parts/adafruit-feather-nrf52840-image-Ce3UCtIG.png",import.meta.url).href,"adafruit-feather-rp2040":new URL("parts/adafruit-feather-rp2040-image-Cjx2_KLg.png",import.meta.url).href,"adafruit-itsybitsy-rp2040":new URL("parts/adafruit-itsybitsy-rp2040-image-B5P0G6zc.png",import.meta.url).href,"adafruit-qt-py-rp2040":new URL("parts/adafruit-qt-py-rp2040-image-D7StVDwt.png",import.meta.url).href,"battery-aa-4":new URL("parts/battery-aa-4-image-D0temdXg.png",import.meta.url).href,"battery-lipo-1s":new URL("parts/battery-lipo-1s-image-BBMp0Wrc.png",import.meta.url).href,"battery-lipo-2s":new URL("parts/battery-lipo-2s-image-WBCVoPKT.png",import.meta.url).href,"esp32-12f":new URL("parts/esp32-12f-image-B0Yv6nHc.jpg",import.meta.url).href,"hr-sr04":new URL("parts/hr-sr04-image-C6nsMiYi.jpg",import.meta.url).href,mx1508:new URL("parts/mx1508-image-h4qQ0X6x.jpg",import.meta.url).href,"n20-motor":new URL("parts/n20-motor-image-49sEI8KC.jpg",import.meta.url).href,pico:new URL("parts/pico-image-Bn41SWtI.png",import.meta.url).href,"pico-w":new URL("parts/pico-w-image-C9tJDx8M.png",import.meta.url).href,pico2w:new URL("parts/pico2w-image-zcIFZcr1.png",import.meta.url).href,"seeed-xiao-rp2350":new URL("parts/seeed-xiao-rp2350-image-DKi4TJeu.png",import.meta.url).href,tiny2350:new URL("parts/tiny2350-image-C4CBOJj9.png",import.meta.url).href},oe=[{id:"adafruit-feather-esp32s3",name:"Adafruit Feather ESP32-S3",description:"ESP32-S3 Feather (8MB Flash) with USB-C, LiPo charging, STEMMA QT + NeoPixel.",manufacturer:"Adafruit",family:"Microcontroller",mcu:"ESP32-S3",partNumber:"5323",tags:["esp32s3","feather","adafruit","wifi","lipo","stemma-qt"],package:"THT",pinSpacing:2.54,voltage:"3.3V",version:"0.1.0",pcbColor:"#181818",aspect:.4453,dimensions:{width:22.9,height:50.8},ledLabel:"13",onboardLeds:[{kind:"neopixel",gpio:33,power:21,x:.7,y:.62}],image:"image.png",imageLayer:{x:0,y:0,w:1,h:1},headers:[{edge:"left",pins:[{name:"RST",type:"other",number:1,shape:"header",rotation:180,x:.1,y:.137},{name:"3V",type:"pwr",number:2,shape:"header",rotation:180,x:.1,y:.188},{name:"3V",type:"pwr",number:3,shape:"header",rotation:180,x:.1,y:.239},{name:"GND",type:"gnd",number:4,shape:"header",rotation:180,x:.1,y:.29},{name:"A0",type:"io",number:5,gpio:18,capabilities:["digital","pwm","adc"],shape:"header",rotation:180,x:.1,y:.341},{name:"A1",type:"io",number:6,gpio:17,capabilities:["digital","pwm","adc"],shape:"header",rotation:180,x:.1,y:.392},{name:"A2",type:"io",number:7,gpio:16,capabilities:["digital","pwm","adc"],shape:"header",rotation:180,x:.1,y:.443},{name:"A3",type:"io",number:8,gpio:15,capabilities:["digital","pwm","adc"],shape:"header",rotation:180,x:.1,y:.494},{name:"A4",type:"io",number:9,gpio:14,capabilities:["digital","pwm","adc"],shape:"header",rotation:180,x:.1,y:.545},{name:"A5",type:"io",number:10,gpio:8,capabilities:["digital","pwm","adc"],shape:"header",rotation:180,x:.1,y:.596},{name:"SCK",type:"io",number:11,gpio:36,capabilities:["digital","pwm","spi"],signals:{spi:"SCK"},shape:"header",rotation:180,x:.1,y:.647},{name:"MO",type:"io",number:12,gpio:35,capabilities:["digital","pwm","spi"],signals:{spi:"TX"},shape:"header",rotation:180,x:.1,y:.698},{name:"MI",type:"io",number:13,gpio:37,capabilities:["digital","pwm","spi"],signals:{spi:"RX"},shape:"header",rotation:180,x:.1,y:.749},{name:"RX",type:"io",number:14,gpio:38,capabilities:["digital","pwm","uart"],signals:{uart:"RX"},shape:"header",rotation:180,x:.1,y:.8},{name:"TX",type:"io",number:15,gpio:39,capabilities:["digital","pwm","uart"],signals:{uart:"TX"},shape:"header",rotation:180,x:.1,y:.851},{name:"DB",type:"other",number:16,shape:"header",rotation:180,x:.1,y:.902}]},{edge:"right",pins:[{name:"BAT",type:"pwr",number:17,shape:"header",rotation:0,x:.892,y:.367},{name:"EN",type:"other",number:18,shape:"header",rotation:0,x:.892,y:.4205},{name:"USB",type:"pwr",number:19,shape:"header",rotation:0,x:.892,y:.474},{name:"D13",type:"io",number:20,gpio:13,capabilities:["digital","pwm"],shape:"header",rotation:0,x:.892,y:.5275},{name:"D12",type:"io",number:21,gpio:12,capabilities:["digital","pwm"],shape:"header",rotation:0,x:.892,y:.581},{name:"D11",type:"io",number:22,gpio:11,capabilities:["digital","pwm"],shape:"header",rotation:0,x:.892,y:.6345},{name:"D10",type:"io",number:23,gpio:10,capabilities:["digital","pwm"],shape:"header",rotation:0,x:.892,y:.688},{name:"D9",type:"io",number:24,gpio:9,capabilities:["digital","pwm"],shape:"header",rotation:0,x:.892,y:.7415},{name:"D6",type:"io",number:25,gpio:6,capabilities:["digital","pwm"],shape:"header",rotation:0,x:.892,y:.795},{name:"D5",type:"io",number:26,gpio:5,capabilities:["digital","pwm"],shape:"header",rotation:0,x:.892,y:.8485},{name:"SCL",type:"io",number:27,gpio:4,capabilities:["digital","pwm","i2c"],signals:{i2c:"SCL"},buses:{i2c:0},shape:"header",rotation:0,x:.892,y:.902},{name:"SDA",type:"io",number:28,gpio:3,capabilities:["digital","pwm","i2c"],signals:{i2c:"SDA"},buses:{i2c:0},shape:"header",rotation:0,x:.892,y:.9555}]}],helpText:`# Adafruit Feather ESP32-S3

Adafruit's ESP32-S3 Feather (product 5323): a 3.3 V Wi-Fi + Bluetooth board with
USB-C, LiPo charging, a STEMMA QT connector, and an onboard NeoPixel.

## Wiring

Key pins (portrait, USB-C at the top):

| Pin | What it is |
|-----|------------|
| **3V** | 3.3 V out — power for sensors |
| **GND** | ground |
| **BAT** | LiPo battery voltage |
| **USB** | 5 V from the USB-C port |
| **EN** | pull low to switch off the 3.3 V regulator |
| **A0–A5** | analogue-capable GPIO (GP18, 17, 16, 15, 14, 8) |
| **D5–D13** | digital/PWM GPIO (GP5, 6, 9, 10, 11, 12, 13) |
| **SDA / SCL** | I2C bus 0 (GP3 / GP4) — same bus as the STEMMA QT socket |
| **SCK / MO / MI** | SPI (GP36 / GP35 / GP37) |
| **TX / RX** | UART (GP39 / GP38) |

The little red LED is on **GP13** (shared with pin D13). The NeoPixel is on
**GP33**, with its power switched by **GP21** — drive GP21 high first.

## Quick start

Blink the red LED and light the NeoPixel:

\`\`\`python
from machine import Pin
import neopixel, time

led = Pin(13, Pin.OUT)                 # onboard red LED

Pin(21, Pin.OUT).value(1)              # enable NeoPixel power
np = neopixel.NeoPixel(Pin(33), 1)

while True:
    led.toggle()
    np[0] = (0, 16, 0) if led.value() else (16, 0, 0)
    np.write()
    time.sleep(0.5)
\`\`\`

⚠️ Everything is **3.3 V only** — don't feed 5 V signals into any GPIO.

⚠️ The NeoPixel stays dark unless **GP21** (its power enable) is driven high.

⚠️ The ESP32-S3 has a flexible GPIO matrix, so SDA/SCL, SPI and TX/RX are the
board's *designated* pins — pass them explicitly, e.g.
\`I2C(0, sda=Pin(3), scl=Pin(4))\`.

To flash MicroPython, use Snakie's **Flash firmware** button with the
ESP32_GENERIC_S3 build (hold **BOOT** while tapping **RESET** if the board
isn't detected).
`},{id:"adafruit-feather-nrf52840",name:"Adafruit Feather nRF52840 Express",description:"nRF52840 Feather — BLE + USB, LiPo charging, NeoPixel. Portrait, USB at top.",manufacturer:"Adafruit",family:"Microcontroller",mcu:"nRF52840",partNumber:"4062",tags:["nrf52840","feather","adafruit","bluetooth","lipo"],package:"THT",pinSpacing:2.54,voltage:"3.3V",version:"0.1.0",pcbColor:"#1f5bb5",aspect:.4199,dimensions:{width:22.8,height:51.6},ledLabel:"47",onboardLeds:[{kind:"neopixel",gpio:16,power:46,x:.5,y:.4}],image:"image.png",imageLayer:{x:0,y:0,w:1,h:1},headers:[{edge:"left",pins:[{name:"RST",type:"other",number:1,shape:"header",rotation:180,x:.14,y:.125},{name:"3V",type:"pwr",number:2,shape:"header",rotation:180,x:.14,y:.1785},{name:"AREF",type:"other",number:3,shape:"header",rotation:180,x:.14,y:.2321},{name:"GND",type:"gnd",number:4,shape:"header",rotation:180,x:.14,y:.2856},{name:"A0",type:"io",number:5,gpio:4,capabilities:["digital","pwm","adc"],buses:{adc:2},shape:"header",rotation:180,x:.14,y:.3391},{name:"A1",type:"io",number:6,gpio:5,capabilities:["digital","pwm","adc"],buses:{adc:3},shape:"header",rotation:180,x:.14,y:.3927},{name:"A2",type:"io",number:7,gpio:30,capabilities:["digital","pwm","adc"],buses:{adc:6},shape:"header",rotation:180,x:.14,y:.4462},{name:"A3",type:"io",number:8,gpio:28,capabilities:["digital","pwm","adc"],buses:{adc:4},shape:"header",rotation:180,x:.14,y:.4997},{name:"A4",type:"io",number:9,gpio:2,capabilities:["digital","pwm","adc"],buses:{adc:0},shape:"header",rotation:180,x:.14,y:.5533},{name:"A5",type:"io",number:10,gpio:3,capabilities:["digital","pwm","adc"],buses:{adc:1},shape:"header",rotation:180,x:.14,y:.6068},{name:"SCK",type:"io",number:11,gpio:14,capabilities:["digital","pwm","spi"],signals:{spi:"SCK"},shape:"header",rotation:180,x:.14,y:.6603},{name:"MO",type:"io",number:12,gpio:13,capabilities:["digital","pwm","spi"],signals:{spi:"TX"},shape:"header",rotation:180,x:.14,y:.7139},{name:"MI",type:"io",number:13,gpio:15,capabilities:["digital","pwm","spi"],signals:{spi:"RX"},shape:"header",rotation:180,x:.14,y:.7674},{name:"RX",type:"io",number:14,gpio:24,capabilities:["digital","pwm","uart"],signals:{uart:"RX"},shape:"header",rotation:180,x:.14,y:.8209},{name:"TX",type:"io",number:15,gpio:25,capabilities:["digital","pwm","uart"],signals:{uart:"TX"},shape:"header",rotation:180,x:.14,y:.8745},{name:"D2",type:"io",number:16,gpio:10,capabilities:["digital","pwm"],shape:"header",rotation:180,x:.14,y:.928}]},{edge:"right",pins:[{name:"VBAT",type:"pwr",number:17,shape:"header",rotation:0,x:.895,y:.128},{name:"EN",type:"other",number:18,shape:"header",rotation:0,x:.895,y:.2007},{name:"VBUS",type:"pwr",number:19,shape:"header",rotation:0,x:.895,y:.2735},{name:"D13",type:"io",number:20,gpio:41,capabilities:["digital","pwm"],shape:"header",rotation:0,x:.895,y:.3462},{name:"D12",type:"io",number:21,gpio:8,capabilities:["digital","pwm"],shape:"header",rotation:0,x:.895,y:.4189},{name:"D11",type:"io",number:22,gpio:6,capabilities:["digital","pwm"],shape:"header",rotation:0,x:.895,y:.4916},{name:"D10",type:"io",number:23,gpio:27,capabilities:["digital","pwm"],shape:"header",rotation:0,x:.895,y:.5644},{name:"D9",type:"io",number:24,gpio:26,capabilities:["digital","pwm"],shape:"header",rotation:0,x:.895,y:.6371},{name:"D6",type:"io",number:25,gpio:7,capabilities:["digital","pwm"],shape:"header",rotation:0,x:.895,y:.7098},{name:"D5",type:"io",number:26,gpio:40,capabilities:["digital","pwm"],shape:"header",rotation:0,x:.895,y:.7825},{name:"SCL",type:"io",number:27,gpio:11,capabilities:["digital","pwm","i2c"],signals:{i2c:"SCL"},buses:{i2c:0},shape:"header",rotation:0,x:.895,y:.8553},{name:"SDA",type:"io",number:28,gpio:12,capabilities:["digital","pwm","i2c"],signals:{i2c:"SDA"},buses:{i2c:0},shape:"header",rotation:0,x:.895,y:.928}]}],helpText:`# Adafruit Feather nRF52840 Express

A 3.3 V Feather board built on the Nordic **nRF52840** — Bluetooth Low Energy,
native USB, LiPo charging, and an onboard NeoPixel. Great for wireless sensors
and battery-powered projects.

## Wiring

Key pins (portrait, USB at the top):

| Pin | What it is |
|-----|------------|
| **3V** | 3.3 V out from the regulator |
| **GND** | ground |
| **VBAT** | LiPo battery voltage (JST connector) |
| **VBUS** | 5 V from USB — for powering **5 V loads**, not logic |
| **EN** | pull to GND to switch the 3.3 V regulator off |
| **A0–A5** | analogue inputs (ADC), also digital/PWM |
| **SCL / SDA** | I2C (GPIO 11 / 12) |
| **SCK / MO / MI** | SPI (GPIO 14 / 13 / 15) |
| **TX / RX** | UART (GPIO 25 / 24) |
| **D2, D5–D13** | general digital/PWM pins |

Pin names map to nRF ports: \`P0.n\` → GPIO \`n\`, \`P1.n\` → GPIO \`32 + n\`
(so **D13** = P1.09 = GPIO 41).

## Quick start

Blink the red user LED (P1.15 = GPIO 47):

\`\`\`python
from machine import Pin
import time

led = Pin(47, Pin.OUT)     # red user LED
while True:
    led.toggle()
    time.sleep(0.5)
\`\`\`

The onboard **NeoPixel** is on GPIO 16 — drive GPIO 46 **high** first to power it.

⚠️ This is a **3.3 V** board — its GPIO pins are *not* 5 V tolerant. Use VBUS
only as a 5 V supply rail, never into a GPIO.

⚠️ MicroPython isn't pre-installed: double-tap **RESET** for the UF2 bootloader
and copy a MicroPython UF2 for the Feather nRF52840 onto the drive that appears.
`},{id:"adafruit-feather-rp2040",name:"Adafruit Feather RP2040",description:"RP2040 Feather with USB-C, LiPo charging, STEMMA QT (I2C) + NeoPixel.",manufacturer:"Adafruit",family:"Microcontroller",mcu:"RP2040",partNumber:"4884",tags:["rp2040","feather","adafruit","lipo","stemma-qt"],package:"THT",pinSpacing:2.54,voltage:"3.3V",version:"0.1.1",pcbColor:"#181818",aspect:.4863,dimensions:{width:22.9,height:50.8},ledLabel:"13",onboardLeds:[{kind:"neopixel",gpio:16,x:.7,y:.62}],image:"image.png",imageLayer:{x:0,y:0,w:1,h:1},headers:[{edge:"left",pins:[{name:"RST",type:"other",number:1,shape:"header",rotation:180,x:.155,y:.216},{name:"3.3V",type:"pwr",number:2,shape:"header",rotation:180,x:.155,y:.2605},{name:"GND",type:"gnd",number:3,shape:"header",rotation:180,x:.155,y:.305},{name:"A0",type:"io",number:4,gpio:26,capabilities:["digital","pwm","i2c","spi","adc"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:1,adc:0},shape:"header",rotation:180,x:.155,y:.3495},{name:"A1",type:"io",number:5,gpio:27,capabilities:["digital","pwm","i2c","spi","adc"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:1,adc:1},shape:"header",rotation:180,x:.155,y:.394},{name:"A2",type:"io",number:6,gpio:28,capabilities:["digital","pwm","i2c","spi","adc"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:1,adc:2},shape:"header",rotation:180,x:.155,y:.4385},{name:"A3",type:"io",number:7,gpio:29,capabilities:["digital","pwm","i2c","spi","adc"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:1,adc:3},shape:"header",rotation:180,x:.155,y:.483},{name:"D24",type:"io",number:8,gpio:24,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:1},shape:"header",rotation:180,x:.155,y:.5275},{name:"D25",type:"io",number:9,gpio:25,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:1},shape:"header",rotation:180,x:.155,y:.572},{name:"SCK",type:"io",number:10,gpio:18,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:0},shape:"header",rotation:180,x:.155,y:.6165},{name:"MO",type:"io",number:11,gpio:19,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:0},shape:"header",rotation:180,x:.155,y:.661},{name:"MI",type:"io",number:12,gpio:20,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:0},shape:"header",rotation:180,x:.155,y:.7055},{name:"RX",type:"io",number:13,gpio:1,capabilities:["digital","pwm","i2c","spi","uart"],signals:{pwm:"B",i2c:"SCL",spi:"CSn",uart:"RX"},buses:{i2c:0,spi:0,uart:0},shape:"header",rotation:180,x:.155,y:.75},{name:"TX",type:"io",number:14,gpio:0,capabilities:["digital","pwm","i2c","spi","uart"],signals:{pwm:"A",i2c:"SDA",spi:"RX",uart:"TX"},buses:{i2c:0,spi:0,uart:0},shape:"header",rotation:180,x:.155,y:.7945},{name:"D4",type:"io",number:15,gpio:6,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:0},shape:"header",rotation:180,x:.155,y:.839}]},{edge:"right",pins:[{name:"BAT",type:"pwr",number:16,shape:"header",rotation:0,x:.848,y:.3495},{name:"EN",type:"other",number:17,shape:"header",rotation:0,x:.848,y:.394},{name:"USB",type:"pwr",number:18,shape:"header",rotation:0,x:.848,y:.4385},{name:"D13",type:"io",number:19,gpio:13,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:1},shape:"header",rotation:0,x:.848,y:.483},{name:"D12",type:"io",number:20,gpio:12,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:1},shape:"header",rotation:0,x:.848,y:.5275},{name:"D11",type:"io",number:21,gpio:11,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:1},shape:"header",rotation:0,x:.848,y:.572},{name:"D10",type:"io",number:22,gpio:10,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:1},shape:"header",rotation:0,x:.848,y:.6165},{name:"D9",type:"io",number:23,gpio:9,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:1},shape:"header",rotation:0,x:.848,y:.661},{name:"D6",type:"io",number:24,gpio:8,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:1},shape:"header",rotation:0,x:.848,y:.7055},{name:"D5",type:"io",number:25,gpio:7,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:0},shape:"header",rotation:0,x:.848,y:.75},{name:"SCL",type:"io",number:26,gpio:3,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:0},shape:"header",rotation:0,x:.848,y:.7945},{name:"SDA",type:"io",number:27,gpio:2,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:0},shape:"header",rotation:0,x:.848,y:.839}]}],helpText:`# Adafruit Feather RP2040

Adafruit's Feather-format RP2040 board with USB-C, a LiPo charger, a STEMMA QT
(I2C) connector and an onboard NeoPixel. Runs MicroPython at **3.3 V** logic.

## Wiring

Key power pins:

| Pin | What it is |
|-----|------------|
| **USB** | 5 V from the USB-C port |
| **BAT** | LiPo battery voltage (chargeable via USB) |
| **3.3V** | 3.3 V out from the regulator |
| **EN** | pull to GND to disable the 3.3 V regulator |
| **GND / RST** | ground / reset |

Notable GPIO groups (Feather label → RP2040 GPIO):

- **Analog**: A0–A3 → GP26–GP29 (the four ADC channels)
- **I2C (STEMMA QT)**: SDA → GP2, SCL → GP3 — bus **I2C1**
- **SPI**: SCK → GP18, MO → GP19, MI → GP20 — bus **SPI0**
- **UART**: TX → GP0, RX → GP1 — bus **UART0**
- **Digital**: D4–D13, D24, D25 — general-purpose, all PWM-capable
- **Onboard**: red LED on **GP13**, NeoPixel on **GP16**

## Quick start

\`\`\`python
from machine import Pin
from neopixel import NeoPixel
import time

led = Pin(13, Pin.OUT)          # onboard red LED (D13)
px = NeoPixel(Pin(16), 1)       # onboard NeoPixel

while True:
    led.toggle()
    px[0] = (16, 0, 16) if led.value() else (0, 16, 0)
    px.write()
    time.sleep(0.5)
\`\`\`

⚠️ It's a **3.3 V** board — don't feed 5 V signals into any GPIO.

⚠️ The STEMMA QT connector is **I2C1** (SDA = GP2, SCL = GP3), so use
\`I2C(1, ...)\`, not \`I2C(0, ...)\`.

To install MicroPython, hold **BOOTSEL** while plugging in USB (it mounts as a
drive), then use Snakie's **Flash firmware** button and pick the RP2040 build.
`},{id:"adafruit-itsybitsy-rp2040",name:"Adafruit ItsyBitsy RP2040",description:"Small RP2040 board (ItsyBitsy form factor) with micro-USB + NeoPixel.",manufacturer:"Adafruit",family:"Microcontroller",mcu:"RP2040",partNumber:"4888",tags:["rp2040","itsybitsy","adafruit"],package:"THT",pinSpacing:2.54,voltage:"3.3V",version:"0.1.0",pcbColor:"#181818",aspect:.5,dimensions:{width:17.8,height:35.6},ledLabel:"13",onboardLeds:[{kind:"neopixel",gpio:17,power:16,x:.5,y:.5}],image:"image.png",imageLayer:{x:0,y:0,w:1,h:1},headers:[{edge:"left",pins:[{name:"RST",type:"other",number:1,shape:"header",rotation:180,x:.048,y:.048},{name:"3.3V",type:"pwr",number:2,shape:"header",rotation:180,x:.048,y:.1164},{name:"VHi",type:"pwr",number:3,shape:"header",rotation:180,x:.048,y:.1847},{name:"A0",type:"io",number:4,gpio:26,capabilities:["digital","pwm","i2c","spi","adc"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:1,adc:0},shape:"header",rotation:180,x:.048,y:.2531},{name:"A1",type:"io",number:5,gpio:27,capabilities:["digital","pwm","i2c","spi","adc"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:1,adc:1},shape:"header",rotation:180,x:.048,y:.3215},{name:"A2",type:"io",number:6,gpio:28,capabilities:["digital","pwm","i2c","spi","adc"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:1,adc:2},shape:"header",rotation:180,x:.048,y:.3898},{name:"A3",type:"io",number:7,gpio:29,capabilities:["digital","pwm","i2c","spi","adc"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:1,adc:3},shape:"header",rotation:180,x:.048,y:.4582},{name:"D24",type:"io",number:8,gpio:24,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:1},shape:"header",rotation:180,x:.048,y:.5265},{name:"D25",type:"io",number:9,gpio:25,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:1},shape:"header",rotation:180,x:.048,y:.5949},{name:"SCK",type:"io",number:10,gpio:18,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:0},shape:"header",rotation:180,x:.048,y:.6633},{name:"MO",type:"io",number:11,gpio:19,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:0},shape:"header",rotation:180,x:.048,y:.7316},{name:"MI",type:"io",number:12,gpio:20,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:0},shape:"header",rotation:180,x:.048,y:.8}]},{edge:"right",pins:[{name:"BAT",type:"pwr",number:13,shape:"header",rotation:0,x:.952,y:.048},{name:"G",type:"gnd",number:14,shape:"header",rotation:0,x:.952,y:.1175},{name:"USB",type:"pwr",number:15,shape:"header",rotation:0,x:.952,y:.1871},{name:"D13",type:"io",number:16,gpio:11,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:1},shape:"header",rotation:0,x:.952,y:.2566},{name:"D12",type:"io",number:17,gpio:10,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:1},shape:"header",rotation:0,x:.952,y:.3262},{name:"D11",type:"io",number:18,gpio:9,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:1},shape:"header",rotation:0,x:.952,y:.3957},{name:"D10",type:"io",number:19,gpio:8,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:1},shape:"header",rotation:0,x:.952,y:.4652},{name:"D9",type:"io",number:20,gpio:7,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:0},shape:"header",rotation:0,x:.952,y:.5348},{name:"D7",type:"io",number:21,gpio:6,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:0},shape:"header",rotation:0,x:.952,y:.6043},{name:"D5",type:"io",number:22,gpio:14,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:1},shape:"header",rotation:0,x:.952,y:.6738},{name:"SCL",type:"io",number:23,gpio:3,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:0},shape:"header",rotation:0,x:.952,y:.7434},{name:"SDA",type:"io",number:24,gpio:2,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:0},shape:"header",rotation:0,x:.952,y:.8129},{name:"TX",type:"io",number:25,gpio:0,capabilities:["digital","pwm","i2c","spi","uart"],signals:{pwm:"A",i2c:"SDA",spi:"RX",uart:"TX"},buses:{i2c:0,spi:0,uart:0},shape:"header",rotation:0,x:.952,y:.8825},{name:"RX",type:"io",number:26,gpio:1,capabilities:["digital","pwm","i2c","spi","uart"],signals:{pwm:"B",i2c:"SCL",spi:"CSn",uart:"RX"},buses:{i2c:0,spi:0,uart:0},shape:"header",rotation:0,x:.952,y:.952}]},{edge:"bottom",pins:[{name:"D2",type:"io",number:27,gpio:12,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:1},shape:"header",rotation:90,x:.318,y:.952},{name:"D3",type:"io",number:28,gpio:5,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:0},shape:"header",rotation:90,x:.5,y:.952},{name:"D4",type:"io",number:29,gpio:4,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:0},shape:"header",rotation:90,x:.682,y:.952}]}],helpText:`# Adafruit ItsyBitsy RP2040

A tiny **RP2040** board in Adafruit's ItsyBitsy form factor — micro-USB, an
onboard red LED on **D13** (GP11) and a **NeoPixel** on GP17 (its power switched
by GP16). Runs at **3.3 V** logic.

## Wiring

Key power pins (micro-USB at the top):

| Pin | What it is |
|-----|------------|
| **BAT** | Battery input (feeds the regulator) |
| **USB** | 5 V from the USB port |
| **VHi** | The higher of BAT/USB — good for powering 5 V-ish loads |
| **3.3V** | Regulated 3.3 V out |
| **G** | Ground |
| **RST** | Reset |

Notable GPIO groups:

- **A0–A3** (GP26–GP29) — the four **ADC** channels (ADC0–3), also digital/PWM.
- **SDA / SCL** (GP2 / GP3) — the labelled **I2C** pair (bus 1).
- **SCK / MO / MI** (GP18 / GP19 / GP20) — the labelled **SPI** pins (bus 0).
- **TX / RX** (GP0 / GP1) — **UART 0**.
- **D2–D5, D7, D9–D13, D24, D25** — general digital/PWM pins.

Note: the **D-numbers on the silkscreen are not the GP numbers** — e.g. D13 is
GP11, D5 is GP14. MicroPython wants the GP number.

## Quick start

\`\`\`python
from machine import Pin
import time

led = Pin(11, Pin.OUT)      # onboard red LED (silkscreen D13)
while True:
    led.toggle()
    time.sleep(0.5)
\`\`\`

⚠️ It's a **3.3 V** board — don't feed 5 V into any GPIO. ⚠️ The NeoPixel needs
GP16 driven **high** to power it before you write to GP17.

To install MicroPython: hold **BOOTSEL** while plugging in USB (it mounts as a
drive), then use Snakie's **Flash firmware** button.
`},{id:"adafruit-qt-py-rp2040",name:"Adafruit QT Py RP2040",description:"Thumb-sized castellated RP2040 board with USB-C, STEMMA QT + NeoPixel.",manufacturer:"Adafruit",family:"Microcontroller",mcu:"RP2040",partNumber:"4900",tags:["rp2040","qtpy","adafruit","castellated","stemma-qt"],package:"SMD",pinSpacing:2.54,voltage:"3.3V",version:"0.1.0",pcbColor:"#181818",aspect:.8145,dimensions:{width:17.8,height:21.8},onboardLeds:[{kind:"neopixel",gpio:12,power:11,x:.5,y:.62}],connectors:[{kind:"qwiic",label:"STEMMA QT",x:.42,y:.9,pins:[{name:"GND",type:"gnd"},{name:"3V3",type:"pwr"},{name:"SDA1",type:"io",gpio:22,capabilities:["i2c"],signals:{i2c:"SDA"},buses:{i2c:1}},{name:"SCL1",type:"io",gpio:23,capabilities:["i2c"],signals:{i2c:"SCL"},buses:{i2c:1}}]}],image:"image.png",imageLayer:{x:0,y:0,w:1,h:1},headers:[{edge:"left",pins:[{name:"A0",type:"io",number:1,gpio:29,capabilities:["digital","pwm","i2c","spi","adc"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:1,adc:3},castellated:!0,shape:"castellated",rotation:180,x:.065,y:.175},{name:"A1",type:"io",number:2,gpio:28,capabilities:["digital","pwm","i2c","spi","adc"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:1,adc:2},castellated:!0,shape:"castellated",rotation:180,x:.065,y:.2917},{name:"A2",type:"io",number:3,gpio:27,capabilities:["digital","pwm","i2c","spi","adc"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:1,adc:1},castellated:!0,shape:"castellated",rotation:180,x:.065,y:.4083},{name:"A3",type:"io",number:4,gpio:26,capabilities:["digital","pwm","i2c","spi","adc"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:1,adc:0},castellated:!0,shape:"castellated",rotation:180,x:.065,y:.525},{name:"SDA",type:"io",number:5,gpio:24,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:1},castellated:!0,shape:"castellated",rotation:180,x:.065,y:.6417},{name:"SCL",type:"io",number:6,gpio:25,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:1},castellated:!0,shape:"castellated",rotation:180,x:.065,y:.7583},{name:"TX",type:"io",number:7,gpio:20,capabilities:["digital","pwm","i2c","spi","uart"],signals:{pwm:"A",i2c:"SDA",spi:"RX",uart:"TX"},buses:{i2c:0,spi:0,uart:1},castellated:!0,shape:"castellated",rotation:180,x:.065,y:.875}]},{edge:"right",pins:[{name:"5V",type:"pwr",number:8,castellated:!0,shape:"castellated",rotation:0,x:.935,y:.175},{name:"GND",type:"gnd",number:9,castellated:!0,shape:"castellated",rotation:0,x:.935,y:.2917},{name:"3V",type:"pwr",number:10,castellated:!0,shape:"castellated",rotation:0,x:.935,y:.4083},{name:"MOSI",type:"io",number:11,gpio:3,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:0},castellated:!0,shape:"castellated",rotation:0,x:.935,y:.525},{name:"MISO",type:"io",number:12,gpio:4,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:0},castellated:!0,shape:"castellated",rotation:0,x:.935,y:.6417},{name:"SCK",type:"io",number:13,gpio:6,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:0},castellated:!0,shape:"castellated",rotation:0,x:.935,y:.7583},{name:"RX",type:"io",number:14,gpio:5,capabilities:["digital","pwm","i2c","spi","uart"],signals:{pwm:"B",i2c:"SCL",spi:"CSn",uart:"RX"},buses:{i2c:0,spi:0,uart:1},castellated:!0,shape:"castellated",rotation:0,x:.935,y:.875}]}],helpText:`---
---
# Adafruit QT Py RP2040

A thumb-sized RP2040 board with USB-C, castellated pads, a STEMMA QT connector
and an onboard NeoPixel. Runs MicroPython — same chip as the Pico, just tiny.

## Wiring

Only 14 pads, and most do double duty:

| Pad(s) | What they are |
|--------|---------------|
| **5V / GND / 3V** | Power — 5 V in from USB, 3.3 V out (logic is **3V3**) |
| **A0–A3** (GP29/28/27/26) | Analogue inputs (ADC3–ADC0), also digital/PWM |
| **SDA / SCL** (GP24/25) | I2C0 on the pads |
| **MOSI / MISO / SCK** (GP3/4/6) | SPI0 |
| **TX / RX** (GP20/5) | UART1 |
| **STEMMA QT** | Plug-and-play **I2C1** (SDA1=GP22, SCL1=GP23) |

## Quick start

Blink the onboard NeoPixel (GP12 — you must power it via GP11 first):

\`\`\`python
from machine import Pin
from neopixel import NeoPixel
import time

Pin(11, Pin.OUT, value=1)        # NeoPixel power enable
px = NeoPixel(Pin(12), 1)
while True:
    px[0] = (16, 0, 16); px.write()
    time.sleep(0.5)
    px[0] = (0, 0, 0); px.write()
    time.sleep(0.5)
\`\`\`

⚠️ There's **no plain user LED** — the NeoPixel on GP12 is it, and it stays dark
until you drive **GP11 high**.

⚠️ Everything is **3.3 V logic**; the 5V pad is USB power in/out only.

⚠️ The STEMMA QT port is **I2C1**, not I2C0 — use
\`I2C(1, sda=Pin(22), scl=Pin(23))\` for plug-in sensors.

To flash MicroPython: hold **BOOT**, tap **RESET** (it appears as a USB drive),
then use Snakie's **Flash firmware** button.
`},{id:"battery-aa-4",name:"4×AA Battery Pack",description:"Four AA cells in series (~6 V) — a common untethered supply for motors and servos.",manufacturer:"Generic",family:"Power",tags:["battery","aa","power","source"],package:"THT",voltage:"6V",version:"0.1.4",pcbColor:"#26292e",dimensions:{width:31.5,height:59.5},shape:{kind:"rect",cornerRadius:0},headers:[{edge:"right",pins:[{name:"V+",type:"pwr",shape:"header",x:.7069297960069444,y:.05103449204388788},{name:"GND",type:"gnd",shape:"header",x:.31829996744791655,y:.05103449204388788}]}],labels:[{text:"4×AA",x:.5132899136013456,y:.4789243361529182,fontSize:20,color:"#e9edf1"},{text:"6V",x:.5132899136013456,y:.5655746818991267,fontSize:20,color:"#c0c4c8"}],image:"image.png",electrical:{model:"source",resistanceOhms:.3,supplyV:6,maxCurrentA:2,capacityMah:2400,terminals:{positive:"V+",negative:"GND"}},layerVisibility:{pcb:!1,image:!0,holes:!0,pins:!0,components:!0},helpText:`# 4×AA Battery Pack

Four AA cells wired in series — a simple, untethered **~6 V** supply for motors,
servos and anything that needs more punch (or more current) than a USB port or a
board's 3V3 pin can give.

## Power at a glance

| | |
|---|---|
| **Voltage** | ~6 V (4 × 1.5 V alkaline; ~4.8 V with 1.2 V NiMH rechargeables) |
| **Current** | ~1–2 A in short bursts — plenty for a couple of servos |
| **Capacity** | ~2000–2500 mAh (alkaline) |
| **Terminals** | **V+** (red, positive) and **GND** (black, negative) |

## Wiring

Power flows **out of V+**, through your circuit, and **back into GND** — the pack
only delivers current when that loop is complete.

- **V+** → the device's power pin (a servo/motor \`+\`, or a board's **VSYS**).
- **GND** → the device's ground, **shared with everything** (including the board's
  GND) so they have a common reference.

⚠️ **6 V is not 5 V, and it's not 3.3 V.** It's fine for most hobby servos and
motors, but **don't feed it into a logic pin** — put a regulator (or the board's
on-board one) between the pack and anything running at 3.3 V. And never wire
**V+ straight to GND**: that's a dead short.

## On a Raspberry Pi Pico

Wire **V+ → VSYS** and **GND → GND**. VSYS feeds the Pico's on-board regulator,
which makes the 3V3 rail for the chip. VSYS takes 1.8–5.5 V, so a *fresh* 6 V pack
sits a touch high — okay in practice, but a part-used pack is safest. Don't use
**VBUS** (that's the 5 V USB line).

## How long will it last?

Roughly: **capacity ÷ current draw**. Two idle servos (~0.1 A total) off a 2400 mAh
pack is about a day of on-time — but a *stalled* servo can pull 10× that, so size
for the worst case, not the idle one.
`},{id:"battery-coin-cr2032",name:"CR2032 Coin Cell",description:"3 V lithium coin cell — tiny, low-current; good for RTC/keep-alive, not for motors.",manufacturer:"Generic",family:"Power",tags:["battery","coin","cr2032","power","source"],package:"THT",voltage:"3V",version:"0.1.0",pcbColor:"#2a2d33",dimensions:{width:24,height:24},shape:{kind:"rect",cornerRadius:3},headers:[{edge:"right",pins:[{name:"V+",type:"pwr",shape:"header",x:.92,y:.35},{name:"GND",type:"gnd",shape:"header",x:.92,y:.65}]}],electrical:{model:"source",supplyV:3,resistanceOhms:10,maxCurrentA:.02,capacityMah:220,terminals:{positive:"V+",negative:"GND"}},shapes:[{kind:"circle",x:.42,y:.5,r:.34,fill:"#c9ccd1",stroke:"#8a8f96",strokeWidth:1.5}],labels:[{text:"CR2032",x:.42,y:.5,fontSize:8,color:"#20242a"}]},{id:"battery-lipo-1s",name:"LiPo 1S (3.7 V)",description:"Single-cell lithium-polymer battery (~3.7 V nominal) with a JST connector — light, rechargeable.",manufacturer:"Generic",family:"Power",tags:["battery","lipo","power","source"],package:"THT",voltage:"3.7V",version:"0.1.1",pcbColor:"#3a2740",dimensions:{width:46.7,height:61.5},shape:{kind:"rect",cornerRadius:0},headers:[{edge:"right",pins:[{name:"V+",type:"pwr",shape:"header",x:.5599802456822258,y:.0020063557344324745},{name:"GND",type:"gnd",shape:"header",x:.471945368042069,y:.0020063557344324745}]}],electrical:{model:"source",supplyV:3.7,resistanceOhms:.09,maxCurrentA:5,capacityMah:1200,terminals:{positive:"V+",negative:"GND"}},labels:[{text:"LiPo 1S",x:.5220558622211033,y:.20426345376407395,fontSize:20,color:"#ffffff"},{text:"3.7V",x:.5220558622211033,y:.27949616376091446,fontSize:20,color:"#ffffff"}],image:"image.png",imageLayer:{x:.01154561451996916,y:-.00036452798282390897,w:1,h:1},layerVisibility:{pcb:!1,image:!0,holes:!0,pins:!0,components:!0}},{id:"battery-lipo-2s",name:"LiPo 2S (7.4 V)",description:"Two-cell lithium-polymer battery (~7.4 V nominal) — more headroom for motors and servos.",manufacturer:"Generic",family:"Power",tags:["battery","lipo","power","source"],package:"THT",voltage:"7.4V",version:"0.1.1",pcbColor:"#3a2740",dimensions:{width:34,height:104.5},shape:{kind:"rect",cornerRadius:0},headers:[{edge:"right",pins:[{name:"V+",type:"pwr",shape:"header",x:.9423380200343149,y:.0030997826071346712},{name:"GND",type:"gnd",shape:"header",x:.7601560505533712,y:.0030997826071346712}]}],electrical:{model:"source",supplyV:7.4,resistanceOhms:.12,maxCurrentA:8,capacityMah:1500,terminals:{positive:"V+",negative:"GND"}},labels:[{text:"LiPo 2S",x:.5037064250695251,y:.08393176808076747,fontSize:20,color:"#ffffff"},{text:"7.4V",x:.5037064250695251,y:.9425604248046875,fontSize:20,color:"#ffffff"}],image:"image.png",imageLayer:{x:0,y:0,w:1,h:1,opacity:1},layerVisibility:{pcb:!1,image:!0,holes:!0,pins:!0,components:!0}},{id:"bench-psu",name:"Bench Power Supply",description:"An adjustable bench supply — set the output voltage and a current limit. Wire V+ / GND to your circuit.",manufacturer:"Snakie",family:"Power",tags:["power","psu","supply","bench","source"],package:"THT",voltage:"0–30V",version:"0.1.0",pcbColor:"#20242a",dimensions:{width:70,height:40},shape:{kind:"rect",cornerRadius:3},headers:[{edge:"bottom",pins:[{name:"V+",type:"pwr",shape:"header",x:.36,y:.9},{name:"GND",type:"gnd",shape:"header",x:.64,y:.9}]}],electrical:{model:"source",supplyV:5,supplyRange:[0,30],maxCurrentA:3,resistanceOhms:.05,terminals:{positive:"V+",negative:"GND"}},shapes:[{kind:"rect",x:.14,y:.16,w:.72,h:.4,fill:"#0a0d10",stroke:"#3ad07a",strokeWidth:1.4}],labels:[{text:"BENCH PSU",x:.5,y:.72,fontSize:9,color:"#e9edf1"},{text:"0–30V",x:.5,y:.36,fontSize:11,color:"#3ad07a"}]},{id:"bme280",name:"BME280 Breakout",description:"Bosch BME280 temperature / pressure / humidity sensor on an I²C breakout.",manufacturer:"Pimoroni",family:"Sensor",tags:["sensor","i2c","environmental","temperature","pressure","humidity"],package:"THT",pinSpacing:2.54,voltage:"2-6V",partNumber:"BME280",properties:{interface:"I²C (0x76 default, 0x77 via ADDR)",measures:"temperature, pressure, humidity",connectors:'0.1" header + Qw/ST (Qwiic / STEMMA QT)'},version:"0.1.0",pcbColor:"#1b1b1b",aspect:1,dimensions:{width:19,height:19},shape:{kind:"rect",cornerRadius:2},headers:[{edge:"bottom",pins:[{number:1,name:"2-6V",label:"2-6V",type:"pwr",shape:"header",x:.1,y:.88},{number:2,name:"SDA",label:"SDA",type:"io",capabilities:["i2c"],signals:{i2c:"SDA"},shape:"header",x:.3,y:.88},{number:3,name:"SCL",label:"SCL",type:"io",capabilities:["i2c"],signals:{i2c:"SCL"},shape:"header",x:.5,y:.88},{number:4,name:"INT",label:"INT",type:"io",shape:"header",x:.7,y:.88},{number:5,name:"GND",label:"GND",type:"gnd",shape:"header",x:.9,y:.88}]}],shapes:[{kind:"rect",x:.05,y:.06,w:.9,h:.82,fill:"#1b1b1b",stroke:"#3a3a3a",strokeWidth:1,cornerRadius:3,z:0},{kind:"rect",x:.34,y:0,w:.32,h:.07,fill:"#e8e4d8",stroke:"#b8b4a8",strokeWidth:1,cornerRadius:1,z:1},{kind:"rect",x:.4,y:.36,w:.2,h:.2,fill:"#b8bcc2",stroke:"#7a7d82",strokeWidth:1,cornerRadius:1,z:2}],labels:[{text:"BME280",x:.5,y:.22,fontSize:9,color:"#e6e6e6",z:3}],i2cAddresses:[118,119],library:{module:"bme280"},drivers:[{source:"bme280.py",target:"lib/bme280.py",label:"BME280 driver"}],layerVisibility:{pcb:!1,image:!1,holes:!0,pins:!0,components:!0},helpText:`---
kevsrobots: https://www.kevsrobots.com/learn/parts/bme280/
example: bme280_read.py
---
# BME280 Breakout

The **BME280** is a Bosch environmental sensor that measures **temperature**,
**barometric pressure** and **relative humidity** in one tiny chip. This Pimoroni
breakout talks **I²C** at address **0x76** (or **0x77** if you cut/bridge the
**ADDR** trace) and runs happily on 2–6 V, so it wires straight to a Pico, ESP32
or any I²C-capable board — over the 0.1" header or the Qw/ST (Qwiic / STEMMA QT)
socket.

## Wiring

| Pin | Connect to |
|-----|------------|
| **2-6V** | 3V3 (2–6 V power in) |
| **SDA** | a GPIO SDA (Pico I2C0: **GP0**) |
| **SCL** | a GPIO SCL (Pico I2C0: **GP1**) |
| **INT** | leave unconnected |
| **GND** | GND |

## Quick start

\`\`\`python
from machine import I2C, Pin
from bme280 import BME280
import time

i2c = I2C(0, sda=Pin(0), scl=Pin(1))   # Pico I2C0: SDA=GP0, SCL=GP1
bme = BME280(i2c)                       # Pimoroni default address 0x76

while True:
    temp, pressure, humidity = bme.read()
    print("Temperature: {:.1f} C".format(temp))
    print("Pressure:    {:.1f} hPa".format(pressure))
    print("Humidity:    {:.1f} %RH".format(humidity))
    print("-" * 24)
    time.sleep(1)
\`\`\`

If \`BME280(i2c)\` raises \`OSError: BME280 not found…\`, the sensor isn't answering
at 0x76 — try \`BME280(i2c, addr=0x77)\`, or run an I²C scan (\`i2c.scan()\`) to see
what address it's on.

## API cheatsheet

\`\`\`text
BME280(i2c, addr=0x76)      one sensor on an I2C bus (0x76 default, 0x77 alt)
read()                      -> (temperature °C, pressure hPa, humidity %RH)
.temperature                property, °C
.pressure                   property, hPa
.pressure_pa                property, Pa
.humidity                   property, %RH
\`\`\`

## Notes

- **Pressure units**: \`read()\` and \`.pressure\` return **hPa** (1 hPa = 100 Pa =
  1 mbar); use \`.pressure_pa\` for raw pascals. Sea-level pressure is ~1013 hPa.
- The compensation maths follows the **Bosch BME280 datasheet**
  (BST-BME280-DS002) — the driver reads each sensor's own factory calibration,
  so readings are per-unit accurate out of the box.
- Self-heating: leave a second or two between reads (or lower the sample rate)
  if you want the most accurate ambient temperature.
`},{id:"esp32-12f",name:"ESP32-12F",description:"esp32",manufacturer:"Espressif",family:"Microcontroller",tags:["esp32"],package:"THT",pinSpacing:2.54,voltage:"3.3V",version:"0.1.1",pcbColor:"#151b1f",aspect:.5,dimensions:{width:28,height:52},shape:{kind:"rect",cornerRadius:.06},headers:[{edge:"left",pins:[{name:"VCC",type:"pwr",x:.9399349510437309,y:.14752879684943548},{name:"GND",type:"gnd",x:.9399349510437309,y:.19752879684943547},{name:"d0",type:"io",gpio:0,capabilities:["digital","pwm"],x:.06587713737053925,y:.8475287968494356},{name:"D1",type:"io",gpio:1,capabilities:["digital"],x:.06587713737053925,y:.7975287968494356},{name:"D2",type:"io",gpio:4,capabilities:["digital"],x:.06587713737053925,y:.7475287968494355},{name:"D3",type:"io",gpio:5,capabilities:["digital"],x:.06587713737053925,y:.6975287968494357},{name:"D4",type:"io",gpio:6,capabilities:["digital"],x:.06587713737053925,y:.6475287968494357},{name:"3v3",type:"pwr",x:.06587713737053925,y:.5975287968494356},{name:"GND",type:"gnd",x:.06587713737053925,y:.5475287968494356},{name:"3v3",type:"pwr",x:.9399349510437309,y:.3475287968494355},{name:"GND",type:"gnd",x:.9399349510437309,y:.3975287968494355},{name:"D5",type:"io",gpio:11,capabilities:["digital"],x:.06587713737053925,y:.4975287968494356},{name:"D6",type:"io",gpio:12,capabilities:["digital"],x:.06587713737053925,y:.44752879684943553},{name:"D7",type:"io",gpio:13,capabilities:["digital"],x:.06587713737053925,y:.39752879684943554},{name:"D8",type:"io",gpio:14,capabilities:["digital"],x:.06587713737053925,y:.3475287968494355},{name:"RX",type:"io",gpio:15,capabilities:["digital","uart"],x:.06587713737053925,y:.2975287968494355},{name:"TX",type:"io",gpio:16,capabilities:["digital","uart"],x:.06587713737053925,y:.24752879684943552},{name:"GND",type:"gnd",x:.06587713737053925,y:.1975287968494355},{name:"3v3",type:"pwr",x:.06587713737053925,y:.14752879684943548},{name:"RST",type:"other",x:.9399349510437309,y:.2475287968494355},{name:"EN",type:"other",x:.9399349510437309,y:.2975287968494355},{name:"CLK",type:"io",gpio:21,capabilities:["digital"],x:.9399349510437309,y:.44752879684943553},{name:"SD0",type:"io",gpio:22,capabilities:["digital"],x:.9399349510437309,y:.5475287968494356},{name:"CMD",type:"io",gpio:23,capabilities:["digital"],x:.9399349510437309,y:.4975287968494355},{name:"SD1",type:"io",gpio:24,capabilities:["digital"],x:.9399349510437309,y:.5975287968494356},{name:"SD2",type:"io",gpio:25,capabilities:["digital"],x:.9399349510437309,y:.6475287968494355},{name:"SD3",type:"io",gpio:26,capabilities:["digital"],x:.9399349510437309,y:.6975287968494356},{name:"RSV",type:"other",x:.9399349510437309,y:.7475287968494355},{name:"RSV",type:"other",x:.9399349510437309,y:.7975287968494356},{name:"A0",type:"io",gpio:29,capabilities:["digital"],x:.9399349510437309,y:.8475287968494356}]}],mountingHoles:[{x:.08477151694418007,y:.06443741742302389,diameter:1.4},{x:.9084908493426669,y:.06443741742302389,diameter:1.4},{x:.9084908493426669,y:.9426236320944393,diameter:1.4},{x:.08477151694418007,y:.9426236320944393,diameter:1.4}],shapes:[{kind:"rect",x:.277788114147026,y:.5437869442210477,fill:"#1c2227",stroke:"#8a8f96",strokeWidth:0,w:.45,h:.3},{kind:"rect",x:.3626108377921481,y:.1707257977653952,fill:"#1c2227",stroke:"#8a8f96",strokeWidth:0,w:.18,h:.09},{kind:"rect",x:.3474006332269236,y:0,fill:"#e8ede3",stroke:"#8a8f96",strokeWidth:0,w:.29,h:.11,z:2}],image:"image.jpg",layerVisibility:{pcb:!0,image:!1,holes:!0,pins:!0,components:!0},helpText:`# ESP32-12F

An Espressif **ESP32** module with Wi-Fi and Bluetooth built in — a 3.3 V
microcontroller you can run MicroPython on. Breadboard-friendly (2.54 mm pins),
with castellated edges and four mounting holes.

## Wiring

Key power pins (it's a **3.3 V** board):

| Pin | Purpose |
|-----|---------|
| **VCC / 3v3** | 3.3 V power in — top-right VCC, plus 3v3 pins on both edges |
| **GND** | Ground — several, on both edges |
| **EN** | Chip enable — must be **high** for the chip to run |
| **RST** | Reset |

Notable GPIO groups (from the part's pinout):

- **D0–D8** — general digital I/O (GPIO 0, 1, 4, 5, 6, 11–14); **d0** also does PWM.
- **RX / TX** (GPIO 15 / 16) — UART, also used for the REPL/serial link.
- **CLK / CMD / SD0–SD3** (GPIO 21–26) — the SD/flash bus group; avoid these for
  general I/O.
- **A0** (GPIO 29) — analogue-capable pin.
- **RSV** pins are reserved — leave them unconnected.

## Quick start

\`\`\`python
from machine import Pin
import time

led = Pin(0, Pin.OUT)      # d0
while True:
    led.value(not led.value())
    time.sleep(0.5)
\`\`\`

⚠️ **3.3 V only** — the GPIO pins are not 5 V tolerant; use a level shifter for
5 V sensors.

⚠️ **GPIO 0 is a boot-strap pin** — if it's held **low** at reset the chip enters
flashing mode, so don't tie d0 to GND.

⚠️ Bare modules have **no USB-serial chip** — you'll need a USB-UART adapter on
RX/TX (with EN pulled high) to flash MicroPython and talk to the REPL.
`},{id:"esp32-devkit",name:"ESP32 DevKit",description:"ESP32-WROOM-32 development board with 2.4GHz Wi-Fi + Bluetooth.",manufacturer:"Espressif",family:"Microcontroller",tags:["esp32","wifi","bluetooth"],package:"THT",pinSpacing:2.54,voltage:"2.3–3.6V",version:"1.0.0",mcu:"ESP32",pcbColor:"#1b2733",aspect:.42,ledLabel:"2",features:[{label:"ESP32-WROOM-32",kind:"wifi",x:.14,y:.05,w:.72,h:.22},{label:"USB",kind:"usb",x:.36,y:.95,w:.28,h:.05}],headers:[{edge:"left",pins:[{name:"3V3",type:"pwr"},{name:"EN",type:"other"},{name:"IO36",type:"io",gpio:36,capabilities:["digital","adc"]},{name:"IO39",type:"io",gpio:39,capabilities:["digital","adc"]},{name:"IO34",type:"io",gpio:34,capabilities:["digital","adc"]},{name:"IO35",type:"io",gpio:35,capabilities:["digital","adc"]},{name:"IO32",type:"io",gpio:32,capabilities:["digital","pwm","adc"]},{name:"IO33",type:"io",gpio:33,capabilities:["digital","pwm","adc"]},{name:"IO25",type:"io",gpio:25,capabilities:["digital","pwm","adc"]},{name:"IO26",type:"io",gpio:26,capabilities:["digital","pwm","adc"]},{name:"IO27",type:"io",gpio:27,capabilities:["digital","pwm","adc"]},{name:"IO14",type:"io",gpio:14,capabilities:["digital","pwm","i2c","spi"]},{name:"IO12",type:"io",gpio:12,capabilities:["digital","pwm","i2c","spi"]},{name:"GND",type:"gnd"},{name:"IO13",type:"io",gpio:13,capabilities:["digital","pwm","i2c","spi"]}]},{edge:"right",pins:[{name:"VIN",type:"pwr"},{name:"GND",type:"gnd"},{name:"IO23",type:"io",gpio:23,capabilities:["digital","pwm","i2c","spi"]},{name:"IO22",type:"io",gpio:22,capabilities:["digital","pwm","i2c","spi"]},{name:"TX0",type:"io",gpio:1,capabilities:["digital","uart"]},{name:"RX0",type:"io",gpio:3,capabilities:["digital","uart"]},{name:"IO21",type:"io",gpio:21,capabilities:["digital","pwm","i2c","spi"]},{name:"IO19",type:"io",gpio:19,capabilities:["digital","pwm","i2c","spi"]},{name:"IO18",type:"io",gpio:18,capabilities:["digital","pwm","i2c","spi"]},{name:"IO5",type:"io",gpio:5,capabilities:["digital","pwm","i2c","spi"]},{name:"IO17",type:"io",gpio:17,capabilities:["digital","pwm","i2c","spi"]},{name:"IO16",type:"io",gpio:16,capabilities:["digital","pwm","i2c","spi"]},{name:"IO4",type:"io",gpio:4,capabilities:["digital","pwm","i2c","spi","adc"]},{name:"IO0",type:"io",gpio:0,capabilities:["digital","pwm"]},{name:"IO2",type:"io",gpio:2,capabilities:["digital","pwm","adc"]}]}],helpText:`# ESP32 DevKit

An ESP32-WROOM-32 development board from Espressif with 2.4 GHz **Wi-Fi** and
**Bluetooth** built in. A great step up from a Pico when your project needs to
get online.

## Wiring

Key power pins:

| Pin | What it is |
|-----|------------|
| **VIN** | 5 V in (e.g. from USB) — the on-board regulator drops it to 3.3 V |
| **3V3** | 3.3 V out for sensors (the ESP32 runs at 2.3–3.6 V) |
| **GND** | ground (one on each side) |
| **EN** | enable / reset — pull low to reset the chip |

Handy GPIO groups:

- **ADC inputs**: IO32–IO36, IO39 (IO34/35/36/39 are **input-only** — no output, no pull-ups).
- **I2C** (common default): **IO21 = SDA**, **IO22 = SCL**.
- **SPI (VSPI)**: IO18 (SCK), IO19 (MISO), IO23 (MOSI), IO5 (CS).
- **UART0**: TX0 (GPIO 1) / RX0 (GPIO 3) — used by the USB REPL, leave free.
- **IO2** drives the on-board LED; PWM works on most IO pins.

## Quick start

\`\`\`python
from machine import Pin
import time

led = Pin(2, Pin.OUT)     # on-board LED on GPIO 2
while True:
    led.value(not led.value())   # toggle
    time.sleep(0.5)
\`\`\`

## Gotchas

- ⚠️ **3.3 V logic only** — 5 V on a GPIO will damage the chip. Power 5 V
  gear from VIN, but level-shift any signals coming back.
- ⚠️ **IO0 is the boot pin** — hold it low at reset to enter flashing mode;
  avoid parts that pull it low at power-up.
- ⚠️ **IO12 is a strapping pin** — if it's high at boot the board may fail to
  start; don't tie it high.
- Flash MicroPython with Snakie's **Flash firmware** button (pick the ESP32
  generic build); some boards need **IO0/BOOT** held while flashing starts.
`},{id:"hr-sr04",mass_g:8.5,name:"HR SR04",manufacturer:"Generic",family:"Sensor",tags:["ultrasonic"],package:"THT",pinSpacing:2.54,voltage:"3.3V",version:"0.1.0",pcbColor:"#0f5a2e",aspect:.5,dimensions:{width:45.5,height:25.5},shape:{kind:"rect",cornerRadius:0},headers:[{edge:"left",pins:[{name:"VCC",type:"pwr",shape:"round",x:.4149715423583984,y:.7503878574745328},{name:"GND",type:"gnd",shape:"round",x:.581638209025065,y:.7503878574745328},{name:"Echo",type:"io",gpio:0,capabilities:["digital","pwm"],shape:"round",x:.5260826534695094,y:.7503878574745328},{name:"Trigger",type:"io",gpio:1,capabilities:["digital"],shape:"round",x:.4736985524495443,y:.7503878574745328}]}],mountingHoles:[{x:.02587921142578125,y:.044937560636233706,diameter:1},{x:.02587921142578125,y:.7474125302383324,diameter:1},{x:.9749016316731771,y:.044937560636233706,diameter:1},{x:.9749016316731771,y:.7474125302383324,diameter:1}],shapes:[{kind:"circle",x:.20885139465332034,y:.4025821591046901,fill:"#1c2227",stroke:"#cbd6e5",strokeWidth:6,r:.17,z:1},{kind:"circle",x:.7976315307617187,y:.3995573894027012,fill:"#1c2227",stroke:"#cbd6e5",strokeWidth:6,r:.17,z:2},{kind:"rect",x:0,y:0,fill:"#0a3b70",stroke:"#8a8f96",strokeWidth:0,w:1,h:.79,z:0}],labels:[{text:"HC-SR04",x:.5054370625813797,y:.2813324473262613,fontSize:13,z:3}],image:"image.jpg",imageLayer:{x:-.18143107732137054,y:-.6675152900795533,w:1.3283409690856933,h:2.3701770232705512},layerVisibility:{pcb:!1,image:!1,holes:!0,pins:!0,components:!0},electrical:{model:"consumer",currentDrawA:.015,stallCurrentA:.015,maxCurrentA:.02,terminals:{positive:"VCC",negative:"GND"}},helpText:`# HC-SR04 Ultrasonic Range Finder

An ultrasonic distance sensor: it pings a short burst of sound from one
transducer and times the echo back into the other. Good for roughly 2 cm–4 m —
obstacle avoidance, parking sensors, level gauges.

## Wiring

| Pin | Connect to |
|---------|------------|
| VCC | 3V3 (see ⚠️ below) |
| Trigger | any GPIO (e.g. **GP1**) |
| Echo | any GPIO (e.g. **GP0**) |
| GND | GND |

⚠️ Classic HC-SR04 boards are **5 V** parts. If yours is a 3.3 V variant (like
this one) wire VCC to **3V3** and you're done. If it needs 5 V, power it from
**VBUS/5 V** and put a **voltage divider** (e.g. 1 kΩ / 2 kΩ) on **Echo** — a
5 V echo pulse straight into a Pico GPIO can damage the pin.

## Quick start

\`\`\`python
import machine
import time
from machine import Pin

trig = Pin(1, Pin.OUT)          # Trigger on GP1
echo = Pin(0, Pin.IN)           # Echo on GP0

def distance_cm():
    trig.low(); time.sleep_us(2)
    trig.high(); time.sleep_us(10)   # 10 µs ping
    trig.low()
    us = machine.time_pulse_us(echo, 1, 30000)  # wait for the echo
    return us * 0.0343 / 2           # speed of sound, there and back

while True:
    print(round(distance_cm(), 1), "cm")
    time.sleep(0.2)
\`\`\`

## Tips

- **-1 or -2 readings** → \`time_pulse_us\` timed out: nothing in range (>4 m),
  or Trigger/Echo swapped.
- Soft or angled surfaces scatter the ping — readings get flaky; average a few
  samples for a steadier number.
- Leave ~60 ms between pings so a late echo doesn't bleed into the next reading.
`},{id:"icm20948",name:"ICM20948 Breakout",description:"9-DoF IMU — 3-axis accel + gyro + magnetometer, I²C.",manufacturer:"Pimoroni",family:"Sensor",tags:["sensor","i2c","imu","accelerometer","gyroscope","magnetometer"],package:"THT",pinSpacing:2.54,voltage:"3-5V",partNumber:"ICM-20948",properties:{accelerometer:"±2/4/8/16 g",gyroscope:"±250/500/1000/2000 dps",magnetometer:"±4900 µT (AK09916)",interface:"I²C 0x68 / 0x69"},version:"0.1.0",pcbColor:"#1b1b1b",aspect:1,dimensions:{width:19,height:19},shape:{kind:"rect",cornerRadius:2},headers:[{edge:"bottom",pins:[{number:1,name:"3-5V",label:"3-5V",type:"pwr",shape:"header",x:.1,y:.9},{number:2,name:"SDA",label:"SDA",type:"io",capabilities:["i2c"],signals:{i2c:"SDA"},shape:"header",x:.3,y:.9},{number:3,name:"SCL",label:"SCL",type:"io",capabilities:["i2c"],signals:{i2c:"SCL"},shape:"header",x:.5,y:.9},{number:4,name:"INT",label:"INT",type:"io",shape:"header",x:.7,y:.9},{number:5,name:"GND",label:"GND",type:"gnd",shape:"header",x:.9,y:.9}]}],shapes:[{kind:"rect",x:0,y:.36,w:.06,h:.28,fill:"#e6e6e6",stroke:"#9a9a9a",strokeWidth:1,cornerRadius:1,z:0},{kind:"rect",x:.94,y:.36,w:.06,h:.28,fill:"#e6e6e6",stroke:"#9a9a9a",strokeWidth:1,cornerRadius:1,z:1},{kind:"rect",x:.39,y:.4,w:.22,h:.22,fill:"#3a3a3a",stroke:"#111111",strokeWidth:1,cornerRadius:1,z:2},{kind:"circle",x:.42,y:.43,r:.02,fill:"#c9c9c9",z:3}],labels:[{text:"ICM20948",x:.5,y:.22,fontSize:9,color:"#ffffff",z:4}],i2cAddresses:[104,105],library:{module:"icm20948"},drivers:[{source:"icm20948.py",target:"lib/icm20948.py",label:"ICM20948 driver"}],layerVisibility:{pcb:!0,image:!1,holes:!0,pins:!0,components:!0},helpText:`---
kevsrobots: https://www.kevsrobots.com/learn/parts/icm20948/
example: icm20948_read.py
---
# ICM20948 9-DoF Motion Sensor

A Pimoroni breakout for the TDK InvenSense **ICM-20948** — a 3-axis
accelerometer, 3-axis gyroscope and 3-axis magnetometer (via an on-board
AK09916) in one tiny I²C package. Nine degrees of freedom for motion sensing,
tilt, orientation and compass heading. Runs at **3.3 V or 5 V**, so it's happy
on a Pico, an ESP32, or a Raspberry Pi.

## Wiring

| Pin | Connect to |
|------|-----------|
| **3-5V** | 3V3 (or 5V) |
| **GND** | GND |
| **SDA** | your I²C **SDA** GPIO |
| **SCL** | your I²C **SCL** GPIO |
| **INT** | *optional* — a GPIO, for the data-ready interrupt |

Default I²C address is **0x68** (**0x69** if you cut the address trace) — the
driver **auto-detects** either, so you don't have to pass one. The magnetometer
lives on the ICM-20948's internal aux bus at 0x0C — the driver reaches it for
you, so there's nothing extra to wire.

## Quick start

\`\`\`python
from machine import I2C, Pin
from icm20948 import ICM20948
import time

i2c = I2C(0, sda=Pin(4), scl=Pin(5), freq=400_000)
imu = ICM20948(i2c)               # addr=0x69 if the address trace is cut

while True:
    ax, ay, az = imu.read_accel()  # g
    gx, gy, gz = imu.read_gyro()   # degrees / second
    mx, my, mz = imu.read_mag()    # microtesla (µT)
    print("accel g   ", ax, ay, az)
    print("gyro dps  ", gx, gy, gz)
    print("mag  uT   ", mx, my, mz)
    print("-")
    time.sleep(0.5)
\`\`\`

## Live 3-D attitude (IMU instrument)

Hand the IMU to \`inst.watch()\` and the **IMU** instrument lights up with a live
3-D attitude view — roll/pitch from the accelerometer, heading from the mag. No
trig on your side:

\`\`\`python
import instruments as inst
inst.start()
inst.watch(imu=imu)          # → the IMU instrument appears in the dock
while True:
    inst.update()            # streams orientation each loop
    time.sleep(0.05)
\`\`\`

## API cheatsheet

\`\`\`text
ICM20948(i2c, addr=0x68)            # 0x69 if the address trace is cut
read_accel()      -> (x, y, z)      # acceleration in g
read_gyro()       -> (x, y, z)      # angular rate in degrees/second
read_mag()        -> (x, y, z)      # magnetic field in microtesla (µT)
read_accel_gyro() -> (ax..az, gx..gz)   # both in one I²C burst
set_accel_full_scale(g=16)          # 2 / 4 / 8 / 16 g
set_gyro_full_scale(dps=250)        # 250 / 500 / 1000 / 2000 dps
who_am_i()        -> 0xEA           # health check
mag_supported                       # True if the AK09916 was found
\`\`\`

## Notes

- The ICM-20948 pages its registers into four **user banks**; the driver
  switches banks automatically, so you just call the read methods.
- \`read_mag()\` reads the **continuously-streamed** AK09916 data (the driver sets
  it to 100 Hz and streams it into the ICM's registers via the aux-I²C master).
  If the magnetometer wasn't detected at start-up, \`mag_supported\` is \`False\`
  and \`read_mag()\` raises — accel + gyro keep working (6-DoF).
- A flat, still board reads roughly **1 g on the Z axis** and ~**0 dps** on the
  gyro — a quick sanity check that everything is wired up.
- **\`OSError: [Errno 5] EIO\`** — the driver tells the two cases apart:
  - *"not found at 0x68/0x69"* → nothing on the bus; check SDA/SCL/3V3/GND and
    \`print(i2c.scan())\` (the ICM shows as **104**/0x68 or **105**/0x69). Pass
    \`Pin(...)\` objects to \`I2C(...)\`, e.g. \`I2C(0, sda=Pin(20), scl=Pin(21))\`.
  - *"ACKs its address but every I2C transfer fails"* → the chip is seen (it
    ACKs, so \`i2c.scan()\` lists it) but the **bus can't clock data**: add
    **strong pull-ups** on SDA & SCL to 3V3, ensure a **solid common ground**,
    shorten wires, and re-seat SDA/SCL. On **RP2350** boards (e.g. the **Tiny
    2350**) use **~2.2 kΩ** pull-ups — erratum **RP2350-E9** adds a leaky ~8.2 kΩ
    internal pull-down that a 4.7 kΩ can't pull above a valid logic HIGH, so the
    bus ACKs but every read/write EIOs. A phantom **0x08** in \`i2c.scan()\`, or
    the *other* sensor failing too, confirms a bus (not chip) fault.
`},{id:"motor2040",name:"Pimoroni Motor 2040",description:"RP2040 quad DC-motor controller with encoder inputs, current sensing and a Qw/ST connector",manufacturer:"Pimoroni",family:"Microcontroller",mcu:"RP2040",partNumber:"PIM618",package:"Board",pinSpacing:2.54,voltage:"3.3V",version:"0.1.0",pcbColor:"#12181f",aspect:1.368,dimensions:{width:52,height:38},shape:{kind:"rect",cornerRadius:.06},headers:[{edge:"left",pins:[{number:1,name:"EA A",type:"io",gpio:0,capabilities:["digital"],shape:"header",rotation:180},{number:2,name:"EA B",type:"io",gpio:1,capabilities:["digital"],shape:"header",rotation:180},{number:3,name:"EB A",type:"io",gpio:2,capabilities:["digital"],shape:"header",rotation:180},{number:4,name:"EB B",type:"io",gpio:3,capabilities:["digital"],shape:"header",rotation:180},{number:5,name:"EC A",type:"io",gpio:12,capabilities:["digital"],shape:"header",rotation:180},{number:6,name:"EC B",type:"io",gpio:13,capabilities:["digital"],shape:"header",rotation:180},{number:7,name:"ED A",type:"io",gpio:14,capabilities:["digital"],shape:"header",rotation:180},{number:8,name:"ED B",type:"io",gpio:15,capabilities:["digital"],shape:"header",rotation:180}]},{edge:"right",pins:[{number:9,name:"MA+",type:"io",gpio:4,capabilities:["digital","pwm"],signals:{pwm:"A"},shape:"header",rotation:0},{number:10,name:"MA-",type:"io",gpio:5,capabilities:["digital","pwm"],signals:{pwm:"B"},shape:"header",rotation:0},{number:11,name:"MB+",type:"io",gpio:6,capabilities:["digital","pwm"],signals:{pwm:"A"},shape:"header",rotation:0},{number:12,name:"MB-",type:"io",gpio:7,capabilities:["digital","pwm"],signals:{pwm:"B"},shape:"header",rotation:0},{number:13,name:"MC+",type:"io",gpio:8,capabilities:["digital","pwm"],signals:{pwm:"A"},shape:"header",rotation:0},{number:14,name:"MC-",type:"io",gpio:9,capabilities:["digital","pwm"],signals:{pwm:"B"},shape:"header",rotation:0},{number:15,name:"MD+",type:"io",gpio:10,capabilities:["digital","pwm"],signals:{pwm:"A"},shape:"header",rotation:0},{number:16,name:"MD-",type:"io",gpio:11,capabilities:["digital","pwm"],signals:{pwm:"B"},shape:"header",rotation:0}]},{edge:"bottom",pins:[{number:17,name:"TX",type:"io",gpio:16,capabilities:["digital","uart"],signals:{uart:"TX"},buses:{uart:0},shape:"header",rotation:90},{number:18,name:"RX",type:"io",gpio:17,capabilities:["digital","uart"],signals:{uart:"RX"},buses:{uart:0},shape:"header",rotation:90},{number:19,name:"INT",type:"io",gpio:19,capabilities:["digital"],shape:"header",rotation:90},{number:20,name:"USER",type:"io",gpio:23,capabilities:["digital"],shape:"header",rotation:90}]}],connectors:[{kind:"qwiic",label:"QW/ST",x:.5,y:.92,pins:[{name:"GND",type:"gnd"},{name:"3V3",type:"pwr"},{name:"SDA",type:"io",gpio:20,capabilities:["i2c"],signals:{i2c:"SDA"},buses:{i2c:0}},{name:"SCL",type:"io",gpio:21,capabilities:["i2c"],signals:{i2c:"SCL"},buses:{i2c:0}}]}],onboardLeds:[{kind:"neopixel",gpio:18,x:.5,y:.12}],tags:["rp2040","motor","encoder","robotics","pimoroni"],library:{module:"motor",docs:"https://github.com/pimoroni/pimoroni-pico/tree/main/micropython/examples/motor2040"},helpText:`# Pimoroni Motor 2040 (RP2040)

An **RP2040** board that drives **4 DC motors** (up to ~10 V / 0.5 A each) with
per-motor **current sensing**, **4 quadrature encoder** inputs, 2 analog sensor
inputs, a WS2812 RGB LED and a Qw/ST (Qwiic / STEMMA QT) **I²C** connector.

## Motors & encoders → GPIO

| Motor | +  | −  | Encoder | A | B |
|:------|:---|:---|:--------|:--|:--|
| A | GP4 | GP5 | A | GP0 | GP1 |
| B | GP6 | GP7 | B | GP2 | GP3 |
| C | GP8 | GP9 | C | GP12 | GP13 |
| D | GP10 | GP11 | D | GP14 | GP15 |

Other pins: TX/TRIG **GP16**, RX/ECHO **GP17**, WS2812 LED **GP18**, I²C **INT
GP19 · SDA GP20 · SCL GP21**, user button **GP23**, and a shared sense ADC on
**GP29** (per-motor current, board voltage, driver fault + 2 sensors via a mux).

## Powering motors

Feed motor power (up to ~10 V) into the board's **screw terminal**. Each motor
output is a **+ / −** pair driven as a complementary PWM H-bridge — don't wire a
motor pin to logic.

## MicroPython

The \`motor\` / \`motor2040\` (and \`encoder\`) modules are built into **Pimoroni's
MicroPython firmware** — flash the Pico-family Pimoroni build (link below), then:

\`\`\`python
import time
from motor import Motor, motor2040

m = Motor(motor2040.MOTOR_A)   # motor A = GP4 / GP5
m.enable()
m.full_positive();  time.sleep(2)   # full speed one way
m.stop();           time.sleep(1)
m.full_negative();  time.sleep(2)   # full speed the other way
m.coast()
\`\`\`

Read an encoder with the \`encoder\` module (\`Encoder(0, motor2040.ENCODER_A)\`),
or drive all four motors together with \`MotorCluster\`. See the examples below.

## Links
- [Pimoroni Motor 2040 product page](https://shop.pimoroni.com/products/motor-2040) (PIM618)
- [MicroPython examples](https://github.com/pimoroni/pimoroni-pico/tree/main/micropython/examples/motor2040)
- [Pimoroni MicroPython firmware releases](https://github.com/pimoroni/pimoroni-pico/releases)
`},{id:"mx1508",name:"MX1508",family:"Breakout",package:"THT",pinSpacing:2.54,voltage:"3.3V",version:"0.1.2",pcbColor:"#b33e42",aspect:.5,dimensions:{width:24.5,height:21},shape:{kind:"rect",cornerRadius:0},headers:[{edge:"left",pins:[{name:"VCC",type:"pwr",shape:"round",x:.0969480895996094,y:.10008971320258248},{name:"GND",type:"gnd",shape:"round",x:.09532127380371093,y:.2604330698649089},{name:"IN1",type:"io",gpio:0,capabilities:["digital","pwm"],shape:"round",x:.23064493815104167,y:.5150479973687067},{name:"IN2",type:"io",gpio:1,capabilities:["digital","pwm"],shape:"round",x:.23064493815104167,y:.6400479973687067},{name:"IN3",type:"io",gpio:4,capabilities:["digital","pwm"],shape:"round",rotation:180,x:.23064493815104167,y:.7807955339219836},{name:"IN4",type:"io",gpio:5,capabilities:["digital"],shape:"round",rotation:180,x:.23064493815104167,y:.9057955339219836},{name:"OUT1",type:"io",gpio:6,capabilities:["digital"],shape:"round",x:.8296396891276043,y:.5150479973687067},{name:"OUT2",type:"io",gpio:7,capabilities:["digital"],shape:"round",x:.8296396891276043,y:.6400479973687067},{name:"OUT3",type:"io",gpio:8,capabilities:["digital"],shape:"round",x:.8296396891276043,y:.7807955339219836},{name:"OUT4",type:"io",gpio:9,capabilities:["digital"],shape:"round",rotation:0,x:.8296396891276043,y:.9057955339219836}]}],mountingHoles:[{x:.10914685567220052,y:.3961333889431423,diameter:1.2}],shapes:[{kind:"rect",x:.46435175577799487,y:.4775364091661241,fill:"#1c2227",stroke:"#8a8f96",strokeWidth:0,w:.16,h:.47},{kind:"circle",x:.37448577880859374,y:.22480242411295565,label:"100 16V VT",fill:"#b6b6be",stroke:"#ffffff",strokeWidth:1,r:.13,labelFontSize:15,labelAlign:"left",labelWrap:!0,labelColor:"#000000"},{kind:"circle",x:.6737740071614585,y:.22480242411295565,fill:"#b6b6be",stroke:"#ffffff",strokeWidth:1,r:.13}],image:"image.jpg",imageLayer:{x:-.03228909810384106,y:-.03272606743706563,w:1.0659733835856118,h:1.0659733835856118},layerVisibility:{pcb:!0,image:!0,holes:!0,pins:!0,components:!0},helpText:`# MX1508 Dual H-Bridge Motor Driver

A tiny, cheap dual H-bridge that drives **two DC motors** forwards and backwards.
Great for little robots — each motor gets two input pins, and PWM on those pins
sets the speed.

## Wiring

| Pin | Connect to |
|-----|------------|
| VCC | motor supply **+** (2–10 V, e.g. 4×AA or VBUS 5 V) |
| GND | supply **−** and board GND (**shared**) |
| IN1 / IN2 | two GPIOs (Motor A direction/speed) |
| IN3 / IN4 | two GPIOs (Motor B direction/speed) |
| OUT1 / OUT2 | Motor A terminals |
| OUT3 / OUT4 | Motor B terminals |

⚠️ **VCC is the motor supply, not logic power** — don't feed it from the Pico's
3V3 pin; motors will brown the board out. Power it from batteries or 5 V and
tie the grounds together. The 3.3 V GPIO inputs are fine as-is.

## Quick start

\`\`\`python
from machine import Pin, PWM
import time

FREQ = 1000
in1 = PWM(Pin(0), freq=FREQ)   # Motor A
in2 = PWM(Pin(1), freq=FREQ)
in3 = PWM(Pin(4), freq=FREQ)   # Motor B
in4 = PWM(Pin(5), freq=FREQ)

def motor(a, b, speed):        # speed −100 … +100
    duty = int(abs(speed) * 65535 / 100)
    a.duty_u16(duty if speed >= 0 else 0)
    b.duty_u16(0 if speed >= 0 else duty)

motor(in1, in2, 75)            # Motor A forwards at 75 %
motor(in3, in4, -75)           # Motor B backwards
time.sleep(2)
motor(in1, in2, 0)             # stop both
motor(in3, in4, 0)
\`\`\`

Drive **one input high, the other low** for direction; PWM the high one for
speed. Both low = coast, both high = brake.

⚠️ If a motor spins the wrong way, just swap its two OUT wires.
`},{id:"n20-motor",name:"N20 Motor",manufacturer:"Generic",family:"Motor",package:"THT",pinSpacing:2.54,voltage:"6V",version:"0.1.7",pcbColor:"#0f5a2e",aspect:.5,dimensions:{width:12,height:35},shape:{kind:"rect",cornerRadius:0},headers:[{edge:"left",pins:[{name:"VCC",type:"pwr",x:.7482312886855182,y:.9504546221564798},{name:"GND",type:"gnd",x:.2615317468082204,y:.9488681568818934}]}],shapes:[{kind:"rect",x:.11703055363075404,y:.5353271753647749,fill:"#667279",stroke:"#8a8f96",strokeWidth:0,w:.7776204000734817,h:.3725875585219438,z:0,cornerRadius:0},{kind:"rect",x:.11703055363075404,y:.2740695100672105,fill:"#897131",stroke:"#8a8f96",strokeWidth:0,w:.7688154848884132,h:.021959434958065294,z:1,cornerRadius:0},{kind:"rect",x:.39403553981407013,y:.013959000336001282,fill:"#84837f",stroke:"#8a8f96",strokeWidth:0,w:.2,h:.26,z:2,cornerRadius:0},{kind:"rect",x:.10584603851916734,y:.9075299072265623,fill:"#1c2227",stroke:"#8a8f96",strokeWidth:0,w:.78,h:.028429188447840148,z:3},{kind:"rect",x:.3240355398140701,y:.9359590956744025,fill:"#1c2227",stroke:"#8a8f96",strokeWidth:0,w:.34,h:.03,z:4},{kind:"rect",x:.1281247105317958,y:.29544462316176473,fill:"#897131",stroke:"#8a8f96",strokeWidth:0,w:.2668140725528492,h:.2398825522030102,z:5,cornerRadius:0},{kind:"rect",x:.11465095370423561,y:.515095376407399,fill:"#897131",stroke:"#8a8f96",strokeWidth:0,w:.78,h:.020231798957375924,z:6,cornerRadius:0}],image:"image.jpg",layerVisibility:{pcb:!1,image:!1,holes:!0,pins:!0,components:!0},electrical:{model:"consumer",currentDrawA:.06,stallCurrentA:.32,maxCurrentA:.32,terminals:{positive:"VCC",negative:"GND"}},helpText:`# N20 Motor

A tiny **6 V brushed DC gear motor** in the classic N20 metal-gearbox package —
small, quiet, and torquey for its size. A favourite for micro robots, line
followers, and anything on wheels.

## Wiring

| Pin | Connect to |
|-----|------------|
| VCC | motor driver **output** (e.g. MX1508 / DRV8833 OUT1) |
| GND | motor driver **output** (e.g. OUT2) |

⚠️ **Never wire a motor straight to a GPIO pin.** A GPIO supplies a few
milliamps; a motor wants hundreds. Drive it through an H-bridge (MX1508,
DRV8833, L298N…) powered from its own **6 V** supply, with GND shared with the
Pico.

⚠️ The two terminals aren't really "+" and "−" — swapping them just reverses
the spin direction. That's how the H-bridge reverses it too.

## Quick start

Via an H-bridge with its two inputs on **GP2** and **GP3** — PWM one input to
set the speed, swap which input gets the PWM to reverse:

\`\`\`python
from machine import Pin, PWM
import time

in1 = PWM(Pin(2), freq=1000)
in2 = PWM(Pin(3), freq=1000)

def drive(speed):                 # -100 … +100 %
    duty = int(abs(speed) * 65535 / 100)
    in1.duty_u16(duty if speed > 0 else 0)
    in2.duty_u16(duty if speed < 0 else 0)

drive(75)          # forward at 75 %
time.sleep(2)
drive(-75)         # reverse
time.sleep(2)
drive(0)           # stop
\`\`\`

## Tips

- Below ~30 % duty the gearbox may stall — start higher, then ease down.
- Solder a small **ceramic capacitor** across the terminals to tame electrical
  noise if your board resets when the motor kicks in.
- Gear ratios vary (100:1, 150:1, 298:1…) — higher ratio = slower but stronger.
`},{id:"pico",mass_g:3,name:"Raspberry Pi Pico",description:"RP2040 microcontroller board (40-pin, same header layout as the Pico W / 2 W).",manufacturer:"Raspberry Pi",family:"Microcontroller",tags:["rp2040","pico"],package:"THT",pinSpacing:2.54,voltage:"1.8–5.5V",partNumber:"SC0915",version:"1.0.2",mcu:"RP2040",pcbColor:"#0f5a2e",aspect:.4098,dimensions:{width:21,height:51},ledLabel:"25",image:"image.png",imageLayer:{x:0,y:0,w:1,h:1},electrical:{model:"regulator",inputRail:"VSYS",outputRail:"3V3",outputV:3.3,dropoutV:.3,maxCurrentA:.3},headers:[{edge:"left",pins:[{name:"GP0",type:"io",number:1,gpio:0,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:0},shape:"castellated",rotation:180,x:.058,y:.052},{name:"GP1",type:"io",number:2,gpio:1,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:0},shape:"castellated",rotation:180,x:.058,y:.099},{name:"GND",type:"gnd",number:3,shape:"castellated",rotation:180,x:.058,y:.146},{name:"GP2",type:"io",number:4,gpio:2,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:0},shape:"castellated",rotation:180,x:.058,y:.193},{name:"GP3",type:"io",number:5,gpio:3,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:0},shape:"castellated",rotation:180,x:.058,y:.24},{name:"GP4",type:"io",number:6,gpio:4,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:0},shape:"castellated",rotation:180,x:.058,y:.287},{name:"GP5",type:"io",number:7,gpio:5,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:0},shape:"castellated",rotation:180,x:.058,y:.334},{name:"GND",type:"gnd",number:8,shape:"castellated",rotation:180,x:.058,y:.381},{name:"GP6",type:"io",number:9,gpio:6,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:0},shape:"castellated",rotation:180,x:.058,y:.428},{name:"GP7",type:"io",number:10,gpio:7,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:0},shape:"castellated",rotation:180,x:.058,y:.475},{name:"GP8",type:"io",number:11,gpio:8,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:1},shape:"castellated",rotation:180,x:.058,y:.522},{name:"GP9",type:"io",number:12,gpio:9,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:1},shape:"castellated",rotation:180,x:.058,y:.569},{name:"GND",type:"gnd",number:13,shape:"castellated",rotation:180,x:.058,y:.616},{name:"GP10",type:"io",number:14,gpio:10,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:1},shape:"castellated",rotation:180,x:.058,y:.663},{name:"GP11",type:"io",number:15,gpio:11,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:1},shape:"castellated",rotation:180,x:.058,y:.71},{name:"GP12",type:"io",number:16,gpio:12,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:1},shape:"castellated",rotation:180,x:.058,y:.757},{name:"GP13",type:"io",number:17,gpio:13,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:1},shape:"castellated",rotation:180,x:.058,y:.804},{name:"GND",type:"gnd",number:18,shape:"castellated",rotation:180,x:.058,y:.851},{name:"GP14",type:"io",number:19,gpio:14,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:1},shape:"castellated",rotation:180,x:.058,y:.898},{name:"GP15",type:"io",number:20,gpio:15,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:1},shape:"castellated",rotation:180,x:.058,y:.945}]},{edge:"right",pins:[{name:"VBUS",type:"pwr",number:40,shape:"castellated",rotation:0,x:.942,y:.052},{name:"VSYS",type:"pwr",number:39,shape:"castellated",rotation:0,x:.942,y:.099},{name:"GND",type:"gnd",number:38,shape:"castellated",rotation:0,x:.942,y:.146},{name:"3V3_EN",type:"other",number:37,shape:"castellated",rotation:0,x:.942,y:.193},{name:"3V3",type:"pwr",number:36,shape:"castellated",rotation:0,x:.942,y:.24},{name:"ADC_VREF",type:"other",number:35,shape:"castellated",rotation:0,x:.942,y:.287},{name:"GP28",type:"io",number:34,gpio:28,capabilities:["digital","pwm","i2c","spi","adc"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:1,adc:2},shape:"castellated",rotation:0,x:.942,y:.334},{name:"GND",type:"gnd",number:33,shape:"castellated",rotation:0,x:.942,y:.381},{name:"GP27",type:"io",number:32,gpio:27,capabilities:["digital","pwm","i2c","spi","adc"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:1,adc:1},shape:"castellated",rotation:0,x:.942,y:.428},{name:"GP26",type:"io",number:31,gpio:26,capabilities:["digital","pwm","i2c","spi","adc"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:1,adc:0},shape:"castellated",rotation:0,x:.942,y:.475},{name:"RUN",type:"other",number:30,shape:"castellated",rotation:0,x:.942,y:.522},{name:"GP22",type:"io",number:29,gpio:22,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:0},shape:"castellated",rotation:0,x:.942,y:.569},{name:"GND",type:"gnd",number:28,shape:"castellated",rotation:0,x:.942,y:.616},{name:"GP21",type:"io",number:27,gpio:21,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:0},shape:"castellated",rotation:0,x:.942,y:.663},{name:"GP20",type:"io",number:26,gpio:20,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:0},shape:"castellated",rotation:0,x:.942,y:.71},{name:"GP19",type:"io",number:25,gpio:19,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:0},shape:"castellated",rotation:0,x:.942,y:.757},{name:"GP18",type:"io",number:24,gpio:18,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:0},shape:"castellated",rotation:0,x:.942,y:.804},{name:"GND",type:"gnd",number:23,shape:"castellated",rotation:0,x:.942,y:.851},{name:"GP17",type:"io",number:22,gpio:17,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:0},shape:"castellated",rotation:0,x:.942,y:.898},{name:"GP16",type:"io",number:21,gpio:16,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:0},shape:"castellated",rotation:0,x:.942,y:.945}]}],helpText:`# Raspberry Pi Pico

Raspberry Pi's **RP2040** microcontroller board — a dual-core Arm chip on a 40-pin
board (same header layout as the Pico W / 2 W). Runs MicroPython beautifully.

## Wiring

Key power pins (right edge):

| Pin | What it is |
|-----|------------|
| **VBUS** (40) | 5 V straight from USB |
| **VSYS** (39) | power the Pico here (1.8–5.5 V) when not on USB |
| **3V3** (36) | 3.3 V out for sensors (keep it under ~300 mA) |
| **GND** | eight ground pins spread along both edges |

Notable GPIO groups:

- **GP0–GP15** down the left edge, **GP16–GP22** up the right — all do digital,
  PWM, I2C and SPI.
- **GP26 / GP27 / GP28** — the only three **ADC** channels (ADC0–2), for pots
  and analogue sensors. **ADC_VREF** (35) sets their reference.
- **I2C0** default pins: GP0 (SDA) / GP1 (SCL). **I2C1**: GP2 (SDA) / GP3 (SCL).
- The onboard **LED** is on **pin 25**.
- **RUN** (30) — short to GND to reset the board.

## Quick start

\`\`\`python
from machine import Pin
import time

led = Pin(25, Pin.OUT)   # onboard LED
while True:
    led.toggle()
    time.sleep(0.5)
\`\`\`

## Flashing MicroPython

Hold **BOOTSEL** while plugging in the USB cable and the Pico mounts as a USB
drive — or just use Snakie's **Flash firmware** button, which does it for you.

⚠️ GPIO pins are **3.3 V only** — 5 V on a GPIO will damage the RP2040. 5 V
sensors need a level shifter (or wire them to VBUS for power and check their
signal levels).
`},{id:"pico-w",mass_g:3,name:"Raspberry Pi Pico W",description:"RP2040 microcontroller board with CYW43439 2.4GHz wireless (Wi-Fi / BLE).",manufacturer:"Raspberry Pi",family:"Microcontroller",tags:["rp2040","wifi","pico"],package:"THT",pinSpacing:2.54,voltage:"1.8–5.5V",partNumber:"SC0918",version:"1.0.2",mcu:"RP2040",pcbColor:"#0f5a2e",aspect:.406,dimensions:{width:21,height:51},ledLabel:"LED",image:"image.png",imageLayer:{x:0,y:0,w:1,h:1},headers:[{edge:"left",pins:[{name:"GP0",type:"io",number:1,gpio:0,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:0},shape:"castellated",rotation:180,x:.058,y:.052},{name:"GP1",type:"io",number:2,gpio:1,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:0},shape:"castellated",rotation:180,x:.058,y:.099},{name:"GND",type:"gnd",number:3,shape:"castellated",rotation:180,x:.058,y:.146},{name:"GP2",type:"io",number:4,gpio:2,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:0},shape:"castellated",rotation:180,x:.058,y:.193},{name:"GP3",type:"io",number:5,gpio:3,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:0},shape:"castellated",rotation:180,x:.058,y:.24},{name:"GP4",type:"io",number:6,gpio:4,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:0},shape:"castellated",rotation:180,x:.058,y:.287},{name:"GP5",type:"io",number:7,gpio:5,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:0},shape:"castellated",rotation:180,x:.058,y:.334},{name:"GND",type:"gnd",number:8,shape:"castellated",rotation:180,x:.058,y:.381},{name:"GP6",type:"io",number:9,gpio:6,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:0},shape:"castellated",rotation:180,x:.058,y:.428},{name:"GP7",type:"io",number:10,gpio:7,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:0},shape:"castellated",rotation:180,x:.058,y:.475},{name:"GP8",type:"io",number:11,gpio:8,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:1},shape:"castellated",rotation:180,x:.058,y:.522},{name:"GP9",type:"io",number:12,gpio:9,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:1},shape:"castellated",rotation:180,x:.058,y:.569},{name:"GND",type:"gnd",number:13,shape:"castellated",rotation:180,x:.058,y:.616},{name:"GP10",type:"io",number:14,gpio:10,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:1},shape:"castellated",rotation:180,x:.058,y:.663},{name:"GP11",type:"io",number:15,gpio:11,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:1},shape:"castellated",rotation:180,x:.058,y:.71},{name:"GP12",type:"io",number:16,gpio:12,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:1},shape:"castellated",rotation:180,x:.058,y:.757},{name:"GP13",type:"io",number:17,gpio:13,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:1},shape:"castellated",rotation:180,x:.058,y:.804},{name:"GND",type:"gnd",number:18,shape:"castellated",rotation:180,x:.058,y:.851},{name:"GP14",type:"io",number:19,gpio:14,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:1},shape:"castellated",rotation:180,x:.058,y:.898},{name:"GP15",type:"io",number:20,gpio:15,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:1},shape:"castellated",rotation:180,x:.058,y:.945}]},{edge:"right",pins:[{name:"VBUS",type:"pwr",number:40,shape:"castellated",rotation:0,x:.942,y:.052},{name:"VSYS",type:"pwr",number:39,shape:"castellated",rotation:0,x:.942,y:.099},{name:"GND",type:"gnd",number:38,shape:"castellated",rotation:0,x:.942,y:.146},{name:"3V3_EN",type:"other",number:37,shape:"castellated",rotation:0,x:.942,y:.193},{name:"3V3",type:"pwr",number:36,shape:"castellated",rotation:0,x:.942,y:.24},{name:"ADC_VREF",type:"other",number:35,shape:"castellated",rotation:0,x:.942,y:.287},{name:"GP28",type:"io",number:34,gpio:28,capabilities:["digital","pwm","i2c","spi","adc"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:1,adc:2},shape:"castellated",rotation:0,x:.942,y:.334},{name:"GND",type:"gnd",number:33,shape:"castellated",rotation:0,x:.942,y:.381},{name:"GP27",type:"io",number:32,gpio:27,capabilities:["digital","pwm","i2c","spi","adc"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:1,adc:1},shape:"castellated",rotation:0,x:.942,y:.428},{name:"GP26",type:"io",number:31,gpio:26,capabilities:["digital","pwm","i2c","spi","adc"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:1,adc:0},shape:"castellated",rotation:0,x:.942,y:.475},{name:"RUN",type:"other",number:30,shape:"castellated",rotation:0,x:.942,y:.522},{name:"GP22",type:"io",number:29,gpio:22,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:0},shape:"castellated",rotation:0,x:.942,y:.569},{name:"GND",type:"gnd",number:28,shape:"castellated",rotation:0,x:.942,y:.616},{name:"GP21",type:"io",number:27,gpio:21,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:0},shape:"castellated",rotation:0,x:.942,y:.663},{name:"GP20",type:"io",number:26,gpio:20,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:0},shape:"castellated",rotation:0,x:.942,y:.71},{name:"GP19",type:"io",number:25,gpio:19,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:0},shape:"castellated",rotation:0,x:.942,y:.757},{name:"GP18",type:"io",number:24,gpio:18,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:0},shape:"castellated",rotation:0,x:.942,y:.804},{name:"GND",type:"gnd",number:23,shape:"castellated",rotation:0,x:.942,y:.851},{name:"GP17",type:"io",number:22,gpio:17,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:0},shape:"castellated",rotation:0,x:.942,y:.898},{name:"GP16",type:"io",number:21,gpio:16,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:0},shape:"castellated",rotation:0,x:.942,y:.945}]}],helpText:`# Raspberry Pi Pico W

The **Pico W** is Raspberry Pi's RP2040 microcontroller board with 2.4 GHz
wireless (Wi-Fi / Bluetooth via the CYW43439). It runs MicroPython brilliantly —
this is the "brain" you wire everything else to.

## Wiring (key pins)

| Pin | What it's for |
|-----|---------------|
| **VBUS** (40) | 5 V straight from USB — good for servos/LED strips |
| **VSYS** (39) | Power the board here (1.8–5.5 V) when not on USB |
| **3V3** (36) | 3.3 V out for sensors (regulated) |
| **GND** (3, 8, 13, 18, 23, 28, 33, 38) | Ground — every circuit needs one |
| **GP26 / GP27 / GP28** | The only **ADC** (analogue) pins — ADC0/1/2 |
| **GP0–GP15, GP16–GP22** | General GPIO — all do digital, PWM, I2C, SPI |
| **RUN** (30) | Pull to GND to reset the board |
| **3V3_EN** (37) | Pull low to switch off the 3.3 V regulator |

Handy defaults: **I2C0 = GP0 (SDA) / GP1 (SCL)**, **I2C1 = GP2 (SDA) / GP3 (SCL)**.
The onboard **LED** is on the wireless chip, so you address it as \`"LED"\`, not a
pin number.

## Quick start

\`\`\`python
from machine import Pin
import time

led = Pin("LED", Pin.OUT)   # the onboard LED (via the Wi-Fi chip)
while True:
    led.toggle()
    time.sleep(0.5)
\`\`\`

No MicroPython on it yet? Hold **BOOTSEL** while plugging in the USB cable, then
use Snakie's **Flash firmware** button — pick the **Pico W** build (the plain
Pico firmware won't drive the LED or Wi-Fi).

⚠️ GPIO pins are **3.3 V only** — connecting 5 V signals to a GPIO can kill the
RP2040. Level-shift anything 5 V.

⚠️ Powering heavy loads (servos, motors) from **3V3** will brown out the board —
take 5 V from **VBUS** instead and share GND.
`},{id:"pico2w",mass_g:3,name:"Raspberry Pi Pico 2 W",description:"RP2350 microcontroller board with CYW43439 2.4GHz wireless (Wi-Fi / BLE).",manufacturer:"Raspberry Pi",family:"Microcontroller",tags:["rp2350","wifi","pico"],package:"THT",pinSpacing:2.54,voltage:"1.8–5.5V",partNumber:"SC1634",version:"1.0.2",mcu:"RP2350",pcbColor:"#0f5a2e",aspect:.3943,dimensions:{width:21,height:51},ledLabel:"LED",image:"image.png",imageLayer:{x:0,y:0,w:1,h:1},headers:[{edge:"left",pins:[{name:"GP0",type:"io",number:1,gpio:0,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:0},shape:"castellated",rotation:180,x:.06,y:.062},{name:"GP1",type:"io",number:2,gpio:1,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:0},shape:"castellated",rotation:180,x:.06,y:.1082},{name:"GND",type:"gnd",number:3,shape:"castellated",rotation:180,x:.06,y:.1544},{name:"GP2",type:"io",number:4,gpio:2,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:0},shape:"castellated",rotation:180,x:.06,y:.2006},{name:"GP3",type:"io",number:5,gpio:3,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:0},shape:"castellated",rotation:180,x:.06,y:.2468},{name:"GP4",type:"io",number:6,gpio:4,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:0},shape:"castellated",rotation:180,x:.06,y:.2931},{name:"GP5",type:"io",number:7,gpio:5,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:0},shape:"castellated",rotation:180,x:.06,y:.3393},{name:"GND",type:"gnd",number:8,shape:"castellated",rotation:180,x:.06,y:.3855},{name:"GP6",type:"io",number:9,gpio:6,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:0},shape:"castellated",rotation:180,x:.06,y:.4317},{name:"GP7",type:"io",number:10,gpio:7,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:0},shape:"castellated",rotation:180,x:.06,y:.4779},{name:"GP8",type:"io",number:11,gpio:8,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:1},shape:"castellated",rotation:180,x:.06,y:.5241},{name:"GP9",type:"io",number:12,gpio:9,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:1},shape:"castellated",rotation:180,x:.06,y:.5703},{name:"GND",type:"gnd",number:13,shape:"castellated",rotation:180,x:.06,y:.6165},{name:"GP10",type:"io",number:14,gpio:10,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:1},shape:"castellated",rotation:180,x:.06,y:.6627},{name:"GP11",type:"io",number:15,gpio:11,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:1},shape:"castellated",rotation:180,x:.06,y:.7089},{name:"GP12",type:"io",number:16,gpio:12,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:1},shape:"castellated",rotation:180,x:.06,y:.7552},{name:"GP13",type:"io",number:17,gpio:13,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:1},shape:"castellated",rotation:180,x:.06,y:.8014},{name:"GND",type:"gnd",number:18,shape:"castellated",rotation:180,x:.06,y:.8476},{name:"GP14",type:"io",number:19,gpio:14,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:1},shape:"castellated",rotation:180,x:.06,y:.8938},{name:"GP15",type:"io",number:20,gpio:15,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:1},shape:"castellated",rotation:180,x:.06,y:.94}]},{edge:"right",pins:[{name:"VBUS",type:"pwr",number:40,shape:"castellated",rotation:0,x:.94,y:.062},{name:"VSYS",type:"pwr",number:39,shape:"castellated",rotation:0,x:.94,y:.1082},{name:"GND",type:"gnd",number:38,shape:"castellated",rotation:0,x:.94,y:.1544},{name:"3V3_EN",type:"other",number:37,shape:"castellated",rotation:0,x:.94,y:.2006},{name:"3V3",type:"pwr",number:36,shape:"castellated",rotation:0,x:.94,y:.2468},{name:"ADC_VREF",type:"other",number:35,shape:"castellated",rotation:0,x:.94,y:.2931},{name:"GP28",type:"io",number:34,gpio:28,capabilities:["digital","pwm","i2c","spi","adc"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:1,adc:2},shape:"castellated",rotation:0,x:.94,y:.3393},{name:"GND",type:"gnd",number:33,shape:"castellated",rotation:0,x:.94,y:.3855},{name:"GP27",type:"io",number:32,gpio:27,capabilities:["digital","pwm","i2c","spi","adc"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:1,adc:1},shape:"castellated",rotation:0,x:.94,y:.4317},{name:"GP26",type:"io",number:31,gpio:26,capabilities:["digital","pwm","i2c","spi","adc"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:1,adc:0},shape:"castellated",rotation:0,x:.94,y:.4779},{name:"RUN",type:"other",number:30,shape:"castellated",rotation:0,x:.94,y:.5241},{name:"GP22",type:"io",number:29,gpio:22,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:0},shape:"castellated",rotation:0,x:.94,y:.5703},{name:"GND",type:"gnd",number:28,shape:"castellated",rotation:0,x:.94,y:.6165},{name:"GP21",type:"io",number:27,gpio:21,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:0},shape:"castellated",rotation:0,x:.94,y:.6627},{name:"GP20",type:"io",number:26,gpio:20,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:0},shape:"castellated",rotation:0,x:.94,y:.7089},{name:"GP19",type:"io",number:25,gpio:19,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:0},shape:"castellated",rotation:0,x:.94,y:.7552},{name:"GP18",type:"io",number:24,gpio:18,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:0},shape:"castellated",rotation:0,x:.94,y:.8014},{name:"GND",type:"gnd",number:23,shape:"castellated",rotation:0,x:.94,y:.8476},{name:"GP17",type:"io",number:22,gpio:17,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:0},shape:"castellated",rotation:0,x:.94,y:.8938},{name:"GP16",type:"io",number:21,gpio:16,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:0},shape:"castellated",rotation:0,x:.94,y:.94}]}],helpText:`# Raspberry Pi Pico 2 W

Raspberry Pi's RP2350 microcontroller board with a CYW43439 radio for 2.4 GHz
**Wi-Fi and Bluetooth LE**. The brain of your project — everything else in the
parts library wires into it.

## Wiring

The key pins (40-pin board, both edges castellated):

| Pin | What it's for |
|-----|---------------|
| **VBUS** (40) | 5 V straight from USB — power servos/motors here |
| **VSYS** (39) | Power the board from a battery (1.8–5.5 V in) |
| **3V3** (36) | 3.3 V out for sensors (keep the load light) |
| **GND** (3, 8, 13, 18, 23, 28, 33, 38) | Ground — share it with everything |
| **GP0–GP15** (left edge) | General GPIO — digital, PWM, I2C, SPI |
| **GP16–GP22** (right edge) | More GPIO — digital, PWM, I2C, SPI |
| **GP26 / GP27 / GP28** | The only **ADC** pins (ADC0/1/2) — analogue sensors go here |
| **RUN** (30) | Pull to GND to reset the board |

⚠️ All GPIO are **3.3 V only** — never feed 5 V into a GP pin. 5 V belongs on
VBUS/VSYS only.

## Quick start

Blink the onboard LED (it's on the wireless chip, so use the name \`"LED"\`):

\`\`\`python
from machine import Pin
import time

led = Pin("LED", Pin.OUT)
while True:
    led.toggle()
    time.sleep(0.5)
\`\`\`

## Flashing MicroPython

New board, or no REPL? Use Snakie's **Flash firmware** button — or hold
**BOOTSEL** while plugging in USB and drop the Pico 2 W \`.uf2\` onto the
\`RP2350\` drive. Make sure you grab the **Pico 2 W** firmware, not plain Pico 2 —
Wi-Fi and the LED won't work otherwise.

## Wi-Fi in one line (well, four)

\`\`\`python
import network
wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect("your-ssid", "your-password")
\`\`\`
`},{id:"potentiometer",name:"Potentiometer",manufacturer:"Generic",family:"Input",tags:["potentiometer","analog","adc"],package:"THT",pinSpacing:2.54,voltage:"3.3V",version:"0.1.0",pcbColor:"#1c4e78",dimensions:{width:16,height:14},shape:{kind:"rect",cornerRadius:3},headers:[{edge:"bottom",pins:[{name:"VCC",type:"pwr",shape:"round",x:.25,y:.86},{name:"OUT",type:"io",capabilities:["adc"],shape:"round",x:.5,y:.86},{name:"GND",type:"gnd",shape:"round",x:.75,y:.86}]}],shapes:[{kind:"circle",x:.5,y:.4,r:.34,fill:"#0d3556",stroke:"#7fb0d8",strokeWidth:1.5},{kind:"circle",x:.5,y:.4,r:.12,fill:"#c9ccd1",z:2}],labels:[{text:"10kΩ",x:.5,y:.66,fontSize:9,color:"#dfeaf5"}],electrical:{model:"potentiometer",resistanceOhms:1e4,wiper:"OUT",terminals:{positive:"VCC",negative:"GND"}},helpText:`---
kevsrobots: https://www.kevsrobots.com/learn/parts/potentiometer/
example: potentiometer_read.py
---
# Potentiometer

A **potentiometer** ("pot") is a rotary variable resistor. Wire the two outer
pins to **3V3** (VCC) and **GND**, and the middle **wiper** (OUT) to an **ADC**
pin — turning the knob sweeps the wiper voltage from 0 V to 3.3 V.

## Wiring

| Pin | Connect to |
|-----|------------|
| VCC | 3V3 |
| OUT | an ADC-capable GPIO (Pico: **GP26 / GP27 / GP28**) |
| GND | GND |

## Read it in MicroPython

\`\`\`python
from machine import ADC, Pin
import time

pot = ADC(Pin(26))            # OUT wired to GP26 (ADC0)
while True:
    raw = pot.read_u16()      # 0 … 65535
    pct = raw * 100 // 65535  # 0 … 100 %
    volts = raw / 65535 * 3.3
    print(pct, "%", round(volts, 2), "V")
    time.sleep(0.1)
\`\`\`

## See it on the Potentiometer instrument

Open the **Potentiometer** instrument (a vintage 0–100 % ammeter) and stream the
value with the Snakie library — no polling, works inside your loop:

\`\`\`python
import instruments as inst
from machine import ADC, Pin

pot = ADC(Pin(26))
inst.watch(pot=pot)           # the dial + knob follow it by type
while True:
    inst.update()             # SNK METER pot <volts> → the meter needle
    inst.control.poll()
\`\`\`

Only three ADC channels exist on the Pico (GP26–28), and the reading is a little
noisy — average a few samples for a steadier needle.
`},{id:"seeed-xiao-rp2040",name:"Seeed Studio XIAO RP2040",description:"RP2040 dual Cortex-M0+ @133MHz — XIAO form factor",manufacturer:"Seeed Studio",family:"Microcontroller",mcu:"RP2040",package:"SMD",pinSpacing:2.54,voltage:"3.3V",version:"0.1.0",pcbColor:"#177a48",aspect:.848,dimensions:{width:17.8,height:21},shape:{kind:"rect",cornerRadius:1.5},tags:["rp2040","xiao","seeed","microcontroller"],ledLabel:"25",shapes:[{kind:"rect",x:.3,y:.02,w:.4,h:.11,fill:"#b8bcc4",label:"USB-C"},{kind:"rect",x:.3,y:.34,w:.4,h:.2,fill:"#1c2227",label:"RP2040"}],headers:[{edge:"left",pins:[{name:"D0",type:"io",number:1,gpio:26,capabilities:["digital","pwm","adc"],signals:{pwm:"A",adc:0},buses:{adc:0},shape:"castellated",castellated:!0,rotation:180,x:.09,y:.26},{name:"D1",type:"io",number:2,gpio:27,capabilities:["digital","pwm","adc"],signals:{pwm:"B",adc:1},buses:{adc:1},shape:"castellated",castellated:!0,rotation:180,x:.09,y:.3667},{name:"D2",type:"io",number:3,gpio:28,capabilities:["digital","pwm","adc"],signals:{pwm:"A",adc:2},buses:{adc:2},shape:"castellated",castellated:!0,rotation:180,x:.09,y:.4733},{name:"D3",type:"io",number:4,gpio:29,capabilities:["digital","pwm","adc"],signals:{pwm:"B",adc:3},buses:{adc:3},shape:"castellated",castellated:!0,rotation:180,x:.09,y:.58},{name:"D4",type:"io",number:5,gpio:6,capabilities:["digital","pwm","i2c"],signals:{pwm:"A",i2c:"SDA"},buses:{i2c:1},shape:"castellated",castellated:!0,rotation:180,x:.09,y:.6867},{name:"D5",type:"io",number:6,gpio:7,capabilities:["digital","pwm","i2c"],signals:{pwm:"B",i2c:"SCL"},buses:{i2c:1},shape:"castellated",castellated:!0,rotation:180,x:.09,y:.7933},{name:"D6",type:"io",number:7,gpio:0,capabilities:["digital","pwm","uart"],signals:{pwm:"A",uart:"TX"},buses:{uart:0},shape:"castellated",castellated:!0,rotation:180,x:.09,y:.9}]},{edge:"right",pins:[{name:"5V",type:"pwr",number:8,shape:"castellated",castellated:!0,rotation:0,x:.91,y:.26},{name:"GND",type:"gnd",number:9,shape:"castellated",castellated:!0,rotation:0,x:.91,y:.3667},{name:"3V3",type:"pwr",number:10,shape:"castellated",castellated:!0,rotation:0,x:.91,y:.4733},{name:"D10",type:"io",number:11,gpio:3,capabilities:["digital","pwm","spi"],signals:{pwm:"B",spi:"TX"},buses:{spi:0},shape:"castellated",castellated:!0,rotation:0,x:.91,y:.58},{name:"D9",type:"io",number:12,gpio:4,capabilities:["digital","pwm","spi"],signals:{pwm:"A",spi:"RX"},buses:{spi:0},shape:"castellated",castellated:!0,rotation:0,x:.91,y:.6867},{name:"D8",type:"io",number:13,gpio:2,capabilities:["digital","pwm","spi"],signals:{pwm:"A",spi:"SCK"},buses:{spi:0},shape:"castellated",castellated:!0,rotation:0,x:.91,y:.7933},{name:"D7",type:"io",number:14,gpio:1,capabilities:["digital","pwm","spi","uart"],signals:{pwm:"B",spi:"CSn",uart:"RX"},buses:{spi:0,uart:0},shape:"castellated",castellated:!0,rotation:0,x:.91,y:.9}]}]},{id:"seeed-xiao-rp2350",name:"Seeed Studio XIAO RP2350",description:"RP2350 dual Cortex-M33 @150MHz — XIAO form factor",manufacturer:"Seeed Studio",family:"Microcontroller",tags:["rp2350","xiao","seeed","microcontroller"],package:"SMD",pinSpacing:2.54,voltage:"3.3V",version:"0.1.3",mcu:"RP2350",pcbColor:"#101216",aspect:.848,dimensions:{width:17.8,height:21},shape:{kind:"rect",cornerRadius:0},headers:[{edge:"left",pins:[{name:"D0",type:"io",number:1,gpio:26,capabilities:["digital","pwm","adc"],signals:{pwm:"A"},buses:{adc:0},castellated:!0,shape:"castellated",rotation:180,x:.12587355553828086,y:.215619093951057},{name:"D1",type:"io",number:2,gpio:27,capabilities:["digital","pwm","adc"],signals:{pwm:"B"},buses:{adc:1},castellated:!0,shape:"castellated",rotation:180,x:.12587355553828086,y:.32800393533145683},{name:"D2",type:"io",number:3,gpio:28,capabilities:["digital","pwm","adc"],signals:{pwm:"A"},buses:{adc:2},castellated:!0,shape:"castellated",rotation:180,x:.12587355553828086,y:.43748422061695774},{name:"D3",type:"io",number:4,gpio:29,capabilities:["digital","pwm","adc"],signals:{pwm:"B"},buses:{adc:3},castellated:!0,shape:"castellated",rotation:180,x:.12587355553828086,y:.5459318003934972},{name:"D4",type:"io",number:5,gpio:6,capabilities:["digital","pwm","i2c"],signals:{i2c:"SDA",pwm:"A"},buses:{i2c:1},castellated:!0,shape:"castellated",rotation:180,x:.12587355553828086,y:.6536304428998162},{name:"D5",type:"io",number:6,gpio:7,capabilities:["digital","pwm","i2c"],signals:{i2c:"SCL",pwm:"B"},buses:{i2c:1},castellated:!0,shape:"castellated",rotation:180,x:.12587355553828086,y:.7647140948127298},{name:"D6",type:"io",number:7,gpio:0,capabilities:["digital","pwm","uart"],signals:{uart:"TX",pwm:"A"},buses:{uart:0},castellated:!0,shape:"castellated",rotation:180,x:.12587355553828086,y:.8685716516831342}]},{edge:"right",pins:[{name:"5V",type:"pwr",number:8,castellated:!0,shape:"castellated",rotation:0,x:.897801248634878,y:.21612967996036306},{name:"GND",type:"gnd",number:9,castellated:!0,shape:"castellated",rotation:0,x:.897801248634878,y:.32800393533145683},{name:"3V3",type:"pwr",number:10,castellated:!0,shape:"castellated",rotation:0,x:.897801248634878,y:.43748422061695774},{name:"D10",type:"io",number:11,gpio:3,capabilities:["digital","pwm","spi"],signals:{spi:"TX",pwm:"B"},buses:{spi:0},castellated:!0,shape:"castellated",rotation:0,x:.897801248634878,y:.5459318003934972},{name:"D9",type:"io",number:12,gpio:4,capabilities:["digital","pwm","spi"],signals:{spi:"RX",pwm:"A"},buses:{spi:0},castellated:!0,shape:"castellated",rotation:0,x:.897801248634878,y:.6536304428998162},{name:"D8",type:"io",number:13,gpio:2,capabilities:["digital","pwm","spi"],signals:{spi:"SCK",pwm:"A"},buses:{spi:0},castellated:!0,shape:"castellated",rotation:0,x:.897801248634878,y:.7647140948127298},{name:"D7",type:"io",number:14,gpio:1,capabilities:["digital","pwm","spi","uart"],signals:{spi:"CSn",uart:"RX",pwm:"B"},buses:{spi:0,uart:0},castellated:!0,shape:"castellated",rotation:0,x:.897801248634878,y:.8685716516831342}]}],shapes:[{kind:"rect",x:.3,y:.02,label:"USB-C",fill:"#b8bcc4",stroke:"#8a8f96",strokeWidth:1,w:.4,h:.11},{kind:"rect",x:.182273969631359,y:.35850769042968766,label:"RP2350",fill:"#1c2227",stroke:"#8a8f96",strokeWidth:1,w:.635452060737282,h:.546341256534352}],onboardLeds:[{kind:"neopixel",x:.8170988104316627,y:.14613188799689797,gpio:22},{kind:"single",x:.2142065140244509,y:.13346391565659466}],ledLabel:"25",image:"image.png",imageLayer:{x:-.6344096863892246,y:-.24575128695544057,w:2.3168637369613494,h:1.4728633756397151},layerVisibility:{pcb:!1,image:!0,holes:!0,pins:!0,components:!1}},{id:"servo2040",name:"Pimoroni Servo 2040",description:"RP2040 18-channel servo controller with current sensing, 6 sensor inputs and a Qw/ST connector",manufacturer:"Pimoroni",family:"Microcontroller",tags:["rp2040","servo","motor","robotics","pimoroni"],pinSpacing:2.54,voltage:"3.3V",partNumber:"PIM613",version:"0.1.3",mcu:"RP2040",pcbColor:"#12181f",aspect:1.476,dimensions:{width:62.2,height:42},shape:{kind:"rect",cornerRadius:0},headers:[{edge:"left",pins:[{name:"S1",type:"io",number:1,gpio:0,capabilities:["digital","pwm"],signals:{pwm:"A"},shape:"octagonal",rotation:270,x:.13267336527506512,y:.16666666666666666,group:"servo-1"},{name:"S2",type:"io",number:2,gpio:1,capabilities:["digital","pwm"],signals:{pwm:"B"},shape:"octagonal",rotation:270,x:.1718611145019531,y:.16666666666666666,group:"servo-2"},{name:"S3",type:"io",number:3,gpio:2,capabilities:["digital","pwm"],signals:{pwm:"A"},shape:"octagonal",rotation:270,x:.21393140157063803,y:.16666666666666666,group:"servo-3"},{name:"S4",type:"io",number:4,gpio:3,capabilities:["digital","pwm"],signals:{pwm:"B"},shape:"octagonal",rotation:270,x:.24750679016113283,y:.16666666666666666,group:"servo-4"},{name:"S5",type:"io",number:5,gpio:4,capabilities:["digital","pwm"],signals:{pwm:"A"},shape:"octagonal",rotation:270,x:.2885508219401042,y:.16683953784760971,group:"servo-5"},{name:"S6",type:"io",number:6,gpio:5,capabilities:["digital","pwm"],signals:{pwm:"B"},shape:"octagonal",rotation:270,x:.32819015502929694,y:.16666666666666666,group:"servo-6"},{name:"S7",type:"io",number:7,gpio:6,capabilities:["digital","pwm"],signals:{pwm:"A"},shape:"octagonal",rotation:270,x:.3945326995849609,y:.16683953784760971,group:"servo-7"},{name:"S8",type:"io",number:8,gpio:7,capabilities:["digital","pwm"],signals:{pwm:"B"},shape:"octagonal",rotation:270,x:.4337205251057943,y:.16683953784760971,group:"servo-8"},{name:"S9",type:"io",number:9,gpio:8,capabilities:["digital","pwm"],signals:{pwm:"A"},shape:"octagonal",rotation:270,x:.46696365356445313,y:.16683953784760971,group:"servo-9"},{name:"5V",type:"pwr",shape:"round",x:.24443547566731771,y:.9676461472284227},{name:"GND",type:"gnd",shape:"round",x:.28206978928883875,y:.9676328630762251},{name:"3v3",type:"pwr",shape:"round",x:.31974165462493903,y:.9713675889233184},{name:"SDA",type:"io",gpio:20,capabilities:["digital","i2c"],signals:{i2c:"SDA"},shape:"round",x:.35703814539591483,y:.9646104419892331},{name:"SCL",type:"io",gpio:21,capabilities:["digital","i2c"],signals:{i2c:"SCL"},shape:"round",x:.395532842839559,y:.9703055585517887},{name:"GND",type:"gnd",shape:"round",x:.46989287838564486,y:.9741392739407346},{name:"SWCLK",type:"other",shape:"round",x:.625510881250281,y:.973382200914778},{name:"SWDIO",type:"other",shape:"round",x:.6556911214192708,y:.9741392739407346},{name:"GND",type:"gnd",shape:"round",x:.7000000000000001,y:.9741392739407346},{name:"GND",type:"gnd",shape:"round",x:.7727515665690103,y:.9741392739407346},{name:"GND",type:"gnd",shape:"round",x:.8541892496744791,y:.9741392739407346},{name:"RST",type:"other",shape:"round",x:.733132832845052,y:.9741392739407346},{name:"BOOT",type:"other",shape:"round",x:.8109605916341146,y:.9741392739407346},{name:"GP26",type:"io",gpio:26,capabilities:["digital","adc"],buses:{adc:0},x:.8616504519172933,y:.7702258349134264},{name:"GP27",type:"io",gpio:27,capabilities:["digital","adc"],buses:{adc:1},x:.8605657774297343,y:.4624017945511549},{name:"GP27",type:"io",gpio:27,capabilities:["digital","adc"],buses:{adc:1},x:.8610466581138875,y:.7064175144937985},{name:"GP26",type:"io",gpio:26,capabilities:["digital","adc"],buses:{adc:0},x:.8610466581138875,y:.525535442738686},{name:"GP28",type:"io",gpio:28,capabilities:["digital","adc"],buses:{adc:2},x:.8610466581138875,y:.6468927469006436},{name:"GP29",type:"io",gpio:29,capabilities:["digital","adc"],buses:{adc:3},x:.8617082837481445,y:.584085719578221},{name:"V1",type:"pwr",shape:"octagonal",labelHidden:!0,x:.13267336527506512,y:.227143,group:"servo-1"},{name:"G1",type:"gnd",shape:"octagonal",labelHidden:!0,x:.13267336527506512,y:.287619,group:"servo-1"},{name:"V2",type:"pwr",shape:"octagonal",labelHidden:!0,x:.1718611145019531,y:.227143,group:"servo-2"},{name:"G2",type:"gnd",shape:"octagonal",labelHidden:!0,x:.1718611145019531,y:.287619,group:"servo-2"},{name:"V3",type:"pwr",shape:"octagonal",labelHidden:!0,x:.21393140157063803,y:.227143,group:"servo-3"},{name:"G3",type:"gnd",shape:"octagonal",labelHidden:!0,x:.21393140157063803,y:.287619,group:"servo-3"},{name:"V4",type:"pwr",shape:"octagonal",labelHidden:!0,x:.24750679016113283,y:.227143,group:"servo-4"},{name:"G4",type:"gnd",shape:"octagonal",labelHidden:!0,x:.24750679016113283,y:.287619,group:"servo-4"},{name:"V5",type:"pwr",shape:"octagonal",labelHidden:!0,x:.2885508219401042,y:.227316,group:"servo-5"},{name:"G5",type:"gnd",shape:"octagonal",labelHidden:!0,x:.2885508219401042,y:.287792,group:"servo-5"},{name:"V6",type:"pwr",shape:"octagonal",labelHidden:!0,x:.32819015502929694,y:.227143,group:"servo-6"},{name:"G6",type:"gnd",shape:"octagonal",labelHidden:!0,x:.32819015502929694,y:.287619,group:"servo-6"},{name:"V7",type:"pwr",shape:"octagonal",labelHidden:!0,x:.3945326995849609,y:.227316,group:"servo-7"},{name:"G7",type:"gnd",shape:"octagonal",labelHidden:!0,x:.3945326995849609,y:.287792,group:"servo-7"},{name:"V8",type:"pwr",shape:"octagonal",labelHidden:!0,x:.4337205251057943,y:.227316,group:"servo-8"},{name:"G8",type:"gnd",shape:"octagonal",labelHidden:!0,x:.4337205251057943,y:.287792,group:"servo-8"},{name:"V9",type:"pwr",shape:"octagonal",labelHidden:!0,x:.46696365356445313,y:.227316,group:"servo-9"},{name:"G9",type:"gnd",shape:"octagonal",labelHidden:!0,x:.46696365356445313,y:.287792,group:"servo-9"}]},{edge:"right",pins:[{name:"S10",type:"io",number:10,gpio:9,capabilities:["digital","pwm"],signals:{pwm:"B"},shape:"octagonal",rotation:270,x:.5,y:.16666666666666666,group:"servo-10"},{name:"S11",type:"io",number:11,gpio:10,capabilities:["digital","pwm"],signals:{pwm:"A"},shape:"octagonal",rotation:270,x:.5447998555501301,y:.16666666666666666,group:"servo-11"},{name:"S12",type:"io",number:12,gpio:11,capabilities:["digital","pwm"],signals:{pwm:"B"},shape:"octagonal",rotation:270,x:.5893844604492188,y:.16666666666666666,group:"servo-12"},{name:"S13",type:"io",number:13,gpio:12,capabilities:["digital","pwm"],signals:{pwm:"A"},shape:"octagonal",rotation:270,x:.6556911214192708,y:.16666666666666666,group:"servo-13"},{name:"S14",type:"io",number:14,gpio:13,capabilities:["digital","pwm"],signals:{pwm:"B"},shape:"octagonal",rotation:270,x:.7000000000000001,y:.16666666666666666,group:"servo-14"},{name:"S15",type:"io",number:15,gpio:14,capabilities:["digital","pwm"],signals:{pwm:"A"},shape:"octagonal",rotation:270,x:.733132832845052,y:.16666666666666666,group:"servo-15"},{name:"S16",type:"io",number:16,gpio:15,capabilities:["digital","pwm"],signals:{pwm:"B"},shape:"octagonal",rotation:270,x:.7727515665690103,y:.16666666666666666,group:"servo-16"},{name:"S17",type:"io",number:17,gpio:16,capabilities:["digital","pwm"],signals:{pwm:"A"},shape:"octagonal",rotation:270,x:.8109605916341146,y:.16666666666666666,group:"servo-17"},{name:"S18",type:"io",number:18,gpio:17,capabilities:["digital","pwm"],signals:{pwm:"B"},shape:"octagonal",rotation:270,x:.8541892496744791,y:.16666666666666666,group:"servo-18"},{name:"V10",type:"pwr",shape:"octagonal",labelHidden:!0,x:.5,y:.227143,group:"servo-10"},{name:"G10",type:"gnd",shape:"octagonal",labelHidden:!0,x:.5,y:.287619,group:"servo-10"},{name:"V11",type:"pwr",shape:"octagonal",labelHidden:!0,x:.5447998555501301,y:.227143,group:"servo-11"},{name:"G11",type:"gnd",shape:"octagonal",labelHidden:!0,x:.5447998555501301,y:.287619,group:"servo-11"},{name:"V12",type:"pwr",shape:"octagonal",labelHidden:!0,x:.5893844604492188,y:.227143,group:"servo-12"},{name:"G12",type:"gnd",shape:"octagonal",labelHidden:!0,x:.5893844604492188,y:.287619,group:"servo-12"},{name:"V13",type:"pwr",shape:"octagonal",labelHidden:!0,x:.6556911214192708,y:.227143,group:"servo-13"},{name:"G13",type:"gnd",shape:"octagonal",labelHidden:!0,x:.6556911214192708,y:.287619,group:"servo-13"},{name:"V14",type:"pwr",shape:"octagonal",labelHidden:!0,x:.7000000000000001,y:.227143,group:"servo-14"},{name:"G14",type:"gnd",shape:"octagonal",labelHidden:!0,x:.7000000000000001,y:.287619,group:"servo-14"},{name:"V15",type:"pwr",shape:"octagonal",labelHidden:!0,x:.733132832845052,y:.227143,group:"servo-15"},{name:"G15",type:"gnd",shape:"octagonal",labelHidden:!0,x:.733132832845052,y:.287619,group:"servo-15"},{name:"V16",type:"pwr",shape:"octagonal",labelHidden:!0,x:.7727515665690103,y:.227143,group:"servo-16"},{name:"G16",type:"gnd",shape:"octagonal",labelHidden:!0,x:.7727515665690103,y:.287619,group:"servo-16"},{name:"V17",type:"pwr",shape:"octagonal",labelHidden:!0,x:.8109605916341146,y:.227143,group:"servo-17"},{name:"G17",type:"gnd",shape:"octagonal",labelHidden:!0,x:.8109605916341146,y:.287619,group:"servo-17"},{name:"V18",type:"pwr",shape:"octagonal",labelHidden:!0,x:.8541892496744791,y:.227143,group:"servo-18"},{name:"G18",type:"gnd",shape:"octagonal",labelHidden:!0,x:.8541892496744791,y:.287619,group:"servo-18"}]},{edge:"bottom",pins:[{name:"INT",type:"io",number:19,gpio:19,capabilities:["digital"],shape:"header",rotation:90,x:.4337205251057943,y:.9673287116156684},{name:"USER",type:"io",number:20,gpio:23,capabilities:["digital"],shape:"header",rotation:180,x:.057563883463541694,y:.7813607497442335},{name:"A0",type:"io",number:21,gpio:26,capabilities:["digital","pwm","adc"],signals:{pwm:"A"},buses:{adc:0},shape:"header",rotation:90,x:.5077083836474756,y:.9673287116156684},{name:"A1",type:"io",number:22,gpio:27,capabilities:["digital","pwm","adc"],signals:{pwm:"B"},buses:{adc:1},shape:"header",rotation:90,x:.5535396847532098,y:.9676014108058728},{name:"A2",type:"io",number:23,gpio:28,capabilities:["digital","pwm","adc"],signals:{pwm:"A"},buses:{adc:2},shape:"header",rotation:90,x:.5893844604492188,y:.9676461472284227}]}],mountingHoles:[{x:.06566599527994792,y:.06234221951923672,diameter:1},{x:.9134111531575521,y:.061916632516043506,diameter:1},{x:.9134111531575521,y:.9424985501728361,diameter:1},{x:.06566599527994792,y:.9424985501728361,diameter:1}],onboardLeds:[{kind:"neopixel",x:.7472065635101834,y:.7575462557328969,gpio:18,sizeMm:1.5}],connectors:[{kind:"qwiic",label:"QW/ST",x:.16183044433593752,y:.9487516033838667,labelRotation:270,pins:[{name:"GND",type:"gnd"},{name:"3V3",type:"pwr"},{name:"SDA",type:"io",gpio:20,capabilities:["i2c"],signals:{i2c:"SDA"},buses:{i2c:0}},{name:"SCL",type:"io",gpio:21,capabilities:["i2c"],signals:{i2c:"SCL"},buses:{i2c:0}}]}],image:"image.png",imageLayer:{x:.005648295084635491,y:-.00285443922262818,w:.9510153198242184,h:1.0098463564435756,opacity:1},library:{module:"servo",docs:"https://github.com/pimoroni/pimoroni-pico/tree/main/micropython/examples/servo2040"},layerVisibility:{pcb:!1,image:!0,holes:!0,pins:!0,components:!0},helpText:`# Pimoroni Servo 2040 (RP2040)

An **RP2040** board that drives up to **18 servos** with 3-pin headers, plus
current/voltage sensing, **6 analog sensor inputs**, **6 RGB LEDs** (WS2812) and
a Qw/ST (Qwiic / STEMMA QT) **I²C** connector. Servo signals are **GP0–GP17**.

## Servo channels → GPIO

| Servo | GPIO | Servo | GPIO |
|------:|:-----|------:|:-----|
| 1 | GP0 | 10 | GP9 |
| 2 | GP1 | 11 | GP10 |
| 3 | GP2 | 12 | GP11 |
| 4 | GP3 | 13 | GP12 |
| 5 | GP4 | 14 | GP13 |
| 6 | GP5 | 15 | GP14 |
| 7 | GP6 | 16 | GP15 |
| 8 | GP7 | 17 | GP16 |
| 9 | GP8 | 18 | GP17 |

Other pins: WS2812 LEDs **GP18**, I²C **INT GP19 · SDA GP20 · SCL GP21**, user
button **GP23**, analog **A0 GP26 · A1 GP27 · A2 GP28**, and a shared sense ADC on
**GP29** (current/voltage + the 6 sensor inputs, read through an analog mux).

## Powering servos

Feed servo power into the board's **screw terminal** (2.8–8 V for typical hobby
servos — check your servo's rating). Each servo header is **Signal · V+ · GND**;
V+ comes from that terminal, not from the RP2040's 3V3.

## MicroPython

The \`servo\` / \`servo2040\` modules are built into **Pimoroni's MicroPython
firmware** — flash the Pico-family Pimoroni build (see the release link below),
then:

\`\`\`python
import time
from servo import Servo, servo2040

s = Servo(servo2040.SERVO_1)   # servo 1 = GP0
s.enable()
while True:
    s.to_min(); time.sleep(1)   # ~ -90°
    s.to_mid(); time.sleep(1)   # ~ 0°
    s.to_max(); time.sleep(1)   # ~ +90°
\`\`\`

Control many at once with \`ServoCluster\` (uses the RP2040 PIO). See the examples
directory linked below.

## Links
- [Pimoroni Servo 2040 product page](https://shop.pimoroni.com/products/servo-2040) (PIM613)
- [MicroPython examples](https://github.com/pimoroni/pimoroni-pico/tree/main/micropython/examples/servo2040)
- [Pimoroni MicroPython firmware releases](https://github.com/pimoroni/pimoroni-pico/releases)
`},{id:"sg90",mass_g:9,name:"SG90 Micro Servo",description:"9g hobby micro servo, ~180° range, 50 Hz PWM control.",manufacturer:"TowerPro",family:"Motor",tags:["servo","pwm","motor"],package:"THT",pinSpacing:2.54,voltage:"4.8–6V",partNumber:"SG90",properties:{torque:"1.8 kg·cm @4.8V",speed:"0.1 s/60°",rotation:"180°",signal:"50 Hz PWM (1–2 ms)"},version:"0.1.0",pcbColor:"#2b6cb0",aspect:.38,dimensions:{width:12.2,height:32.2},shape:{kind:"rect",cornerRadius:2},headers:[{edge:"left",pins:[{name:"Signal",label:"PWM",type:"io",gpio:16,capabilities:["digital","pwm"],signals:{pwm:"A"},shape:"round",x:.09,y:.42},{name:"VCC",label:"+5V",type:"pwr",shape:"round",x:.09,y:.5},{name:"GND",type:"gnd",shape:"round",x:.09,y:.58}]}],shapes:[{kind:"rect",x:.16,y:.15,w:.68,h:.58,fill:"#2b6cb0",stroke:"#1a4a80",strokeWidth:1,cornerRadius:3,z:0},{kind:"rect",x:.02,y:.1,w:.96,h:.06,fill:"#2b6cb0",stroke:"#1a4a80",strokeWidth:1,cornerRadius:2,z:1},{kind:"rect",x:.02,y:.72,w:.96,h:.06,fill:"#2b6cb0",stroke:"#1a4a80",strokeWidth:1,cornerRadius:2,z:2},{kind:"circle",x:.5,y:.31,r:.15,fill:"#f2f2f2",stroke:"#b9bec6",strokeWidth:1,z:3},{kind:"circle",x:.5,y:.31,r:.045,fill:"#3a3f44",z:4},{kind:"rect",x:0,y:.412,w:.16,h:.016,fill:"#e8862b",z:5},{kind:"rect",x:0,y:.492,w:.16,h:.016,fill:"#c0392b",z:6},{kind:"rect",x:0,y:.572,w:.16,h:.016,fill:"#5a3a22",z:7}],labels:[{text:"SG90",x:.5,y:.55,fontSize:10,color:"#ffffff",z:8}],library:{module:"servo"},drivers:[{source:"servo.py",target:"lib/servo.py",label:"Servo driver"}],mesh:"model.stl",meshUnits:"mm",layerVisibility:{pcb:!1,image:!1,holes:!0,pins:!0,components:!0},electrical:{model:"consumer",currentDrawA:.1,stallCurrentA:.65,maxCurrentA:.65,terminals:{positive:"VCC",negative:"GND"}},helpText:`---
kevsrobots: https://www.kevsrobots.com/learn/parts/sg90/
example: sg90_sweep.py
---
# SG90 Micro Servo

A 9 g hobby servo with ~180° of travel, controlled by a 50 Hz PWM signal. Cheap,
light, and everywhere — pan/tilt rigs, robot arms, grippers, RC.

## Wiring

| Wire | Signal | Connect to |
|------|--------|-----------|
| **Orange** | Signal (PWM) | any GPIO |
| **Red** | VCC (+5 V) | a **5 V** supply (4.8–6 V) |
| **Brown** | GND | board GND (**shared** with your supply) |

⚠️ Don't power a servo from the Pico's **3V3** pin — it browns out under load.
Use the **VBUS/5 V** pin or a separate 5 V supply, and tie the grounds together.

## Quick start

\`\`\`python
from servo import Servo

s = Servo(16)      # signal on GP16
s.angle(90)        # centre
s.angle(0)         # one end
s.angle(180)       # the other end
\`\`\`

## How it works — the PWM signal

The servo reads a **50 Hz** signal (a 20 ms frame). The **pulse width** sets the
angle:

- **1.0 ms → 0°**, **1.5 ms → 90°**, **2.0 ms → 180°**
- Many SG90s accept a wider **0.5–2.5 ms** for a fuller sweep.

In the **Servo instrument** you can drag the dial, sweep between limits, and set
the min/max — it sends the angle to the board live.

## API cheatsheet

\`\`\`text
Servo(pin, freq=50, min_us=500, max_us=2500, min_angle=0, max_angle=180)
angle(deg)      set (or, with no arg, read) the angle
min() / max()   go to the angle limits
write_us(us)    drive a raw pulse width
sweep(a, b)     blocking end-to-end sweep
ease(target, ms, easing="in_out")   smooth glide (linear/in/out/in_out)
detach()        release (stop holding torque)
\`\`\`

## Specs

- Torque ≈ 1.8 kg·cm @ 4.8 V · speed ≈ 0.1 s/60° · rotation ≈ 180°
- Body ≈ 22.8 × 12.2 × 22.7 mm · weight ≈ 9 g

## Troubleshooting

- **Jitter / twitching** → shared GND + a dedicated 5 V supply (not 3V3).
- **Buzzing at rest** → \`detach()\` once it reaches the end stop.
- **Limited range** → widen \`min_us\` / \`max_us\` in the \`Servo(...)\` constructor.
`},{id:"tiny2350",name:"Pimoroni Tiny 2350",description:"RP2350A in a tiny castellated board with an RGB LED + USB-C",manufacturer:"Pimoroni",family:"Microcontroller",mcu:"RP2350",partNumber:"PIM721",package:"SMD",pinSpacing:2.54,voltage:"3.3V",version:"0.1.3",pcbColor:"#15171a",aspect:.786,dimensions:{width:18,height:22.9},shape:{kind:"rect",cornerRadius:.08},image:"image.png",imageLayer:{x:0,y:0,w:1,h:1},headers:[{edge:"left",pins:[{name:"5V",type:"pwr",number:1,castellated:!0,shape:"castellated",rotation:180,x:.085,y:.207},{name:"GND",type:"gnd",number:2,castellated:!0,shape:"castellated",rotation:180,x:.085,y:.303},{name:"3V3",type:"pwr",number:3,castellated:!0,shape:"castellated",rotation:180,x:.085,y:.398},{name:"A3",type:"io",number:4,gpio:29,capabilities:["digital","pwm","adc","i2c","spi","uart"],castellated:!0,shape:"castellated",rotation:180,x:.085,y:.494},{name:"A2",type:"io",number:5,gpio:28,capabilities:["digital","pwm","adc","i2c","spi","uart"],castellated:!0,shape:"castellated",rotation:180,x:.085,y:.59},{name:"A1",type:"io",number:6,gpio:27,capabilities:["digital","pwm","adc","i2c","spi","uart"],castellated:!0,shape:"castellated",rotation:180,x:.085,y:.686},{name:"A0",type:"io",number:7,gpio:26,capabilities:["digital","pwm","adc","i2c","spi","uart"],castellated:!0,shape:"castellated",rotation:180,x:.085,y:.781},{name:"GND",type:"gnd",number:8,castellated:!0,shape:"castellated",rotation:180,x:.085,y:.877}]},{edge:"right",pins:[{name:"GP0",type:"io",number:9,gpio:0,capabilities:["digital","pwm","spi","i2c","uart"],castellated:!0,shape:"castellated",rotation:0,x:.915,y:.207},{name:"GP1",type:"io",number:10,gpio:1,capabilities:["digital","pwm","spi","i2c","uart"],castellated:!0,shape:"castellated",rotation:0,x:.915,y:.303},{name:"GP2",type:"io",number:11,gpio:2,capabilities:["digital","pwm","spi","i2c","uart"],castellated:!0,shape:"castellated",rotation:0,x:.915,y:.398},{name:"GP3",type:"io",number:12,gpio:3,capabilities:["digital","pwm","spi","i2c","uart"],castellated:!0,shape:"castellated",rotation:0,x:.915,y:.494},{name:"GP4",type:"io",number:13,gpio:4,capabilities:["digital","pwm","spi","i2c","uart"],castellated:!0,shape:"castellated",rotation:0,x:.915,y:.59},{name:"GP5",type:"io",number:14,gpio:5,capabilities:["digital","pwm","spi","i2c","uart"],castellated:!0,shape:"castellated",rotation:0,x:.915,y:.686},{name:"GP6",type:"io",number:15,gpio:6,capabilities:["digital","pwm","spi","i2c","uart"],castellated:!0,shape:"castellated",rotation:0,x:.915,y:.781},{name:"GP7",type:"io",number:16,gpio:7,capabilities:["digital","pwm","spi","i2c","uart"],castellated:!0,shape:"castellated",rotation:0,x:.915,y:.877}]}],helpText:`# Pimoroni Tiny 2350

A postage-stamp RP2350 board (PIM721) with USB-C, an onboard RGB LED and
castellated edges — solder it flat onto your own PCB or use it on a breadboard.
16 pads, 8 per edge, running MicroPython at **3.3 V** logic.

## Wiring

**Left edge** (USB at the top):

| Pin | What it is |
|-----|------------|
| 5V | power in/out (from USB-C) |
| GND | ground (×2 — top and bottom of the edge) |
| 3V3 | 3.3 V out for sensors |
| A3–A0 | **GP29–GP26** — the four ADC-capable GPIOs (also digital, PWM, I2C, SPI, UART) |

**Right edge**: **GP0–GP7** — general-purpose GPIO (digital, PWM, I2C, SPI, UART).

## Quick start

\`\`\`python
from machine import ADC, Pin
import time

led = Pin(0, Pin.OUT)     # something on GP0
pot = ADC(Pin(26))        # analogue input on A0 (GP26)

while True:
    led.toggle()
    print(pot.read_u16())  # 0 … 65535
    time.sleep(0.5)
\`\`\`

## Flashing MicroPython

Hold the **BOOT** button while plugging in the USB-C cable (or while tapping
**RST**) to enter bootloader mode, then use Snakie's **Flash firmware** button
and pick an RP2350 (Pico 2 family) MicroPython build.

⚠️ Everything here is **3.3 V** — don't feed 5 V signals into any GPIO. The
**5V** pad is fine as a power input, but logic pins are not 5 V tolerant.

⚠️ Only **A0–A3** (GP26–GP29) can read analogue voltages — the GP0–GP7 edge
is digital-only (with PWM, I2C, SPI and UART available on every pin).
`}];for(const i of oe){const e=Xe[i.id];e&&(i.imageData=e)}const le={"bme280/bme280.py":`"""BME280 temperature / pressure / humidity driver for MicroPython.

A pure-MicroPython I²C driver for the Bosch BME280 combined humidity, pressure
and temperature sensor (as broken out on the Pimoroni BME280 Breakout). It reads
the factory trimming (calibration) parameters and applies the Bosch compensation
formulas from the BME280 datasheet — Bosch Sensortec, document BST-BME280-DS002 —
to return calibrated readings.

    from machine import I2C, Pin
    from bme280 import BME280

    i2c = I2C(0, sda=Pin(0), scl=Pin(1))
    bme = BME280(i2c)             # Pimoroni default address 0x76 (0x77 selectable)
    temp, pressure, humidity = bme.read()   # °C, hPa, %RH
    print(temp, pressure, humidity)

Depends only on \`time\` and \`ustruct\` from MicroPython (the I²C bus object is
passed in). Importing the module has no side effects; the sensor is configured
when a BME280 instance is created.
"""

import time
import ustruct

_CHIP_ID = 0x60  # value read from the id register on a genuine BME280

# Register map (BME280 datasheet §5.3).
_REG_ID = 0xD0
_REG_RESET = 0xE0
_REG_CTRL_HUM = 0xF2
_REG_STATUS = 0xF3
_REG_CTRL_MEAS = 0xF4
_REG_CONFIG = 0xF5
_REG_DATA = 0xF7  # burst-read start: press(3) + temp(3) + hum(2) = 8 bytes
_REG_CALIB_00 = 0x88  # dig_T1..dig_H1  (0x88..0xA1)
_REG_CALIB_26 = 0xE1  # dig_H2..dig_H6  (0xE1..0xE7)


def _s12(v):
    """Sign-extend a 12-bit value (used for the packed dig_H4 / dig_H5)."""
    return v - 4096 if v & 0x800 else v


class BME280:
    """One Bosch BME280 on an I²C bus."""

    def __init__(self, i2c, addr=0x76):
        self.i2c = i2c
        self.t_fine = 0
        # Probe 0x76 then 0x77 (the ADDR strap picks one) with a chip-id read,
        # and raise a SPECIFIC error: an address that ACKs (shows in i2c.scan())
        # but whose reads fail is a BUS/wiring fault; a readable chip with a
        # foreign id is the wrong part; silence at both means not connected.
        self.addr = addr
        seen = None  # (addr, chip_id) at a readable-but-foreign address
        fault = None  # an address that ACKed but couldn't be read
        for a in [addr] + [x for x in (0x76, 0x77) if x != addr]:
            self.addr = a
            try:
                chip = self._read8(_REG_ID)
            except OSError:
                try:
                    present = a in i2c.scan()
                except Exception:
                    present = False
                if present and fault is None:
                    fault = a
                continue
            if chip == _CHIP_ID:
                break
            if seen is None:
                seen = (a, chip)
        else:
            if fault is not None:
                raise OSError(
                    "0x%02x ACKs its address but reads fail (EIO) — a BUS/"
                    "wiring fault: add strong SDA/SCL pull-ups (2.2k-4.7k to "
                    "3V3), check a solid common GND, and re-seat SDA/SCL."
                    % fault
                )
            if seen is not None:
                raise OSError(
                    "0x%02x reports chip id 0x%02x, not a BME280 (0x60). "
                    "0x58=BMP280 (no humidity), 0x61=BME680." % seen
                )
            raise OSError(
                "BME280 not found at 0x76/0x77 — check wiring (SDA/SCL/3V3/"
                "GND) and run i2c.scan() to see what's on the bus"
            )
        self._load_calibration()
        # Humidity oversampling ×1 (must be written before ctrl_meas takes it).
        self._write8(_REG_CTRL_HUM, 0x01)
        # Temperature ×1, pressure ×1, normal mode (0b001_001_11 = 0x27).
        self._write8(_REG_CTRL_MEAS, 0x27)
        # t_standby = 1000 ms, IIR filter off (0b101_000_00 = 0xA0).
        self._write8(_REG_CONFIG, 0xA0)
        time.sleep_ms(50)  # let the first conversion complete

    # --- low-level I²C helpers ------------------------------------------------
    def _read(self, reg, n):
        return self.i2c.readfrom_mem(self.addr, reg, n)

    def _read8(self, reg):
        return self.i2c.readfrom_mem(self.addr, reg, 1)[0]

    def _write8(self, reg, val):
        self.i2c.writeto_mem(self.addr, reg, bytes([val]))

    # --- factory calibration (datasheet §4.2.2, Table 16) ---------------------
    def _load_calibration(self):
        c = self._read(_REG_CALIB_00, 26)
        (
            self.dig_T1, self.dig_T2, self.dig_T3,
            self.dig_P1, self.dig_P2, self.dig_P3, self.dig_P4, self.dig_P5,
            self.dig_P6, self.dig_P7, self.dig_P8, self.dig_P9,
        ) = ustruct.unpack("<HhhHhhhhhhhh", c[0:24])
        self.dig_H1 = c[25]  # 0xA1, unsigned char

        h = self._read(_REG_CALIB_26, 7)  # 0xE1..0xE7
        self.dig_H2, self.dig_H3 = ustruct.unpack("<hB", h[0:3])
        # dig_H4 / dig_H5 are signed 12-bit values packed across three bytes:
        #   0xE4 = H4[11:4], 0xE5 = H5[3:0]<<4 | H4[3:0], 0xE6 = H5[11:4]
        self.dig_H4 = _s12((h[3] << 4) | (h[4] & 0x0F))
        self.dig_H5 = _s12((h[5] << 4) | (h[4] >> 4))
        self.dig_H6 = ustruct.unpack("<b", h[6:7])[0]  # signed char

    # --- raw ADC read ---------------------------------------------------------
    def _read_raw(self):
        d = self._read(_REG_DATA, 8)
        raw_p = (d[0] << 12) | (d[1] << 4) | (d[2] >> 4)
        raw_t = (d[3] << 12) | (d[4] << 4) | (d[5] >> 4)
        raw_h = (d[6] << 8) | d[7]
        return raw_t, raw_p, raw_h

    # --- Bosch compensation formulas (datasheet §4.2.3, floating point) -------
    def _compensate_temp(self, raw_t):
        v1 = (raw_t / 16384.0 - self.dig_T1 / 1024.0) * self.dig_T2
        v2 = ((raw_t / 131072.0 - self.dig_T1 / 8192.0) ** 2) * self.dig_T3
        self.t_fine = v1 + v2
        return self.t_fine / 5120.0  # °C

    def _compensate_pressure(self, raw_p):
        v1 = self.t_fine / 2.0 - 64000.0
        v2 = v1 * v1 * self.dig_P6 / 32768.0
        v2 = v2 + v1 * self.dig_P5 * 2.0
        v2 = v2 / 4.0 + self.dig_P4 * 65536.0
        v1 = (self.dig_P3 * v1 * v1 / 524288.0 + self.dig_P2 * v1) / 524288.0
        v1 = (1.0 + v1 / 32768.0) * self.dig_P1
        if v1 == 0.0:
            return 0.0  # avoid division by zero
        p = 1048576.0 - raw_p
        p = (p - v2 / 4096.0) * 6250.0 / v1
        v1 = self.dig_P9 * p * p / 2147483648.0
        v2 = p * self.dig_P8 / 32768.0
        p = p + (v1 + v2 + self.dig_P7) / 16.0
        return p  # Pa

    def _compensate_humidity(self, raw_h):
        h = self.t_fine - 76800.0
        h = (raw_h - (self.dig_H4 * 64.0 + self.dig_H5 / 16384.0 * h)) * (
            self.dig_H2 / 65536.0 * (
                1.0 + self.dig_H6 / 67108864.0 * h * (
                    1.0 + self.dig_H3 / 67108864.0 * h
                )
            )
        )
        h = h * (1.0 - self.dig_H1 * h / 524288.0)
        if h > 100.0:
            h = 100.0
        elif h < 0.0:
            h = 0.0
        return h  # %RH

    # --- public API -----------------------------------------------------------
    def read(self):
        """Read the sensor and return \`\`(temperature °C, pressure hPa, humidity %RH)\`\`."""
        raw_t, raw_p, raw_h = self._read_raw()
        temp = self._compensate_temp(raw_t)  # sets t_fine, needed by the others
        pressure = self._compensate_pressure(raw_p) / 100.0  # Pa → hPa
        humidity = self._compensate_humidity(raw_h)
        return temp, pressure, humidity

    @property
    def temperature(self):
        """Temperature in °C."""
        raw_t, _, _ = self._read_raw()
        return self._compensate_temp(raw_t)

    @property
    def pressure(self):
        """Barometric pressure in hPa (hectopascals)."""
        raw_t, raw_p, _ = self._read_raw()
        self._compensate_temp(raw_t)  # refresh t_fine before compensating
        return self._compensate_pressure(raw_p) / 100.0

    @property
    def pressure_pa(self):
        """Barometric pressure in Pa (pascals)."""
        raw_t, raw_p, _ = self._read_raw()
        self._compensate_temp(raw_t)
        return self._compensate_pressure(raw_p)

    @property
    def humidity(self):
        """Relative humidity in %RH."""
        raw_t, _, raw_h = self._read_raw()
        self._compensate_temp(raw_t)
        return self._compensate_humidity(raw_h)
`,"icm20948/icm20948.py":`"""Pure-MicroPython driver for the TDK InvenSense ICM-20948 9-DoF IMU.

The ICM-20948 is a 3-axis accelerometer + 3-axis gyroscope in one die, plus an
AK09916 3-axis magnetometer on an internal auxiliary I2C bus. Its registers are
paged into four *user banks* selected through REG_BANK_SEL (0x7F); this driver
switches banks for you. Register addresses follow the ICM-20948 datasheet
(DS-000189) register map and the AK09916 datasheet.

    from machine import I2C, Pin
    from icm20948 import ICM20948

    i2c = I2C(0, sda=Pin(4), scl=Pin(5), freq=400_000)
    imu = ICM20948(i2c)            # addr=0x69 if you cut the address trace
    ax, ay, az = imu.read_accel()  # g
    gx, gy, gz = imu.read_gyro()   # degrees / second
    mx, my, mz = imu.read_mag()    # microtesla

The magnetometer is read through the ICM-20948's I2C-master pass-through (the
AK09916 hangs off the aux bus at 0x0C); \`read_mag()\` triggers a single-shot
measurement and waits for the data-ready flag. If the AK09916 can't be reached
at start-up, accel + gyro still work and \`read_mag()\` raises. Self-contained:
only \`machine\` (passed in), \`time\` and \`ustruct\`. No side effects on import.
"""

try:
    import ustruct as struct
except ImportError:  # CPython fallback so the file is import-safe off-device
    import struct

import time

# --- ICM-20948 identity -----------------------------------------------------
_CHIP_ID = 0xEA           # WHO_AM_I value (genuine ICM-20948)
# WHO_AM_I bytes we accept: 0xEA is the ICM-20948; 0xE0/0xE1 are the register-
# compatible ICM-20648 / ICM-20649.
_KNOWN_IDS = (0xEA, 0xE1, 0xE0)
_REG_BANK_SEL = 0x7F      # bank select (reachable from every bank)

# --- Bank 0 -----------------------------------------------------------------
_WHO_AM_I = 0x00
_USER_CTRL = 0x03
_PWR_MGMT_1 = 0x06
_PWR_MGMT_2 = 0x07
_INT_PIN_CFG = 0x0F
_I2C_MST_STATUS = 0x17    # bit6 (0x40) = SLV4 single-transaction done
_ACCEL_XOUT_H = 0x2D      # ax,ay,az,gx,gy,gz — 12 bytes, big-endian
_GYRO_XOUT_H = 0x33
_EXT_SLV_SENS_DATA_00 = 0x3B
# USER_CTRL / INT_PIN_CFG / I2C_MST_STATUS bit masks.
_USER_CTRL_I2C_MST_EN = 0x20
_USER_CTRL_I2C_MST_RST = 0x02
_INT_PIN_CFG_BYPASS_EN = 0x02
_MST_STATUS_SLV4_DONE = 0x40

# --- Bank 2 (accel + gyro configuration) ------------------------------------
_GYRO_SMPLRT_DIV = 0x00
_GYRO_CONFIG_1 = 0x01
_ACCEL_SMPLRT_DIV_1 = 0x10
_ACCEL_SMPLRT_DIV_2 = 0x11
_ACCEL_CONFIG = 0x14

# --- Bank 3 (aux-I2C master → AK09916). SLV0 streams the measurement registers
# continuously into EXT_SLV_SENS_DATA; SLV4 does one-off AK09916 config reads/
# writes, polled via I2C_MST_STATUS — the robust Adafruit/SparkFun scheme.
_I2C_MST_CTRL = 0x01
_I2C_SLV0_ADDR = 0x03
_I2C_SLV0_REG = 0x04
_I2C_SLV0_CTRL = 0x05
_I2C_SLV4_ADDR = 0x13
_I2C_SLV4_REG = 0x14
_I2C_SLV4_CTRL = 0x15
_I2C_SLV4_DO = 0x16
_I2C_SLV4_DI = 0x17

# --- AK09916 magnetometer (on the aux bus at 0x0C) --------------------------
_AK09916_ADDR = 0x0C
_AK09916_CHIP_ID = 0x09
_AK09916_WIA = 0x01           # WHO_AM_I (device id)
_AK09916_HXL = 0x11           # measurement data start (X/Y/Z, 6 bytes LE)
_AK09916_CNTL2 = 0x31         # measurement-mode register
_AK09916_MODE_SHUTDOWN = 0x00
_AK09916_MODE_100HZ = 0x08    # continuous measurement, 100 Hz
_AK09916_UT_PER_LSB = 0.15    # µT per least-significant-bit

_ACCEL_GS = {2: 16384.0, 4: 8192.0, 8: 4096.0, 16: 2048.0}
_GYRO_DPS = {250: 131.0, 500: 65.5, 1000: 32.8, 2000: 16.4}


class ICM20948:
    """ICM-20948 9-DoF IMU on an existing \`machine.I2C\` bus."""

    def __init__(self, i2c, addr=0x68):
        self.i2c = i2c
        self._accel_gs = _ACCEL_GS[16]
        self._gyro_dps = _GYRO_DPS[250]
        self._mag_ok = False

        # The ICM-20948's AD0 pin / the breakout's address trace selects 0x68 or
        # 0x69. Probe \`addr\` first, then the alternate, so the driver works however
        # the board is strapped — instead of an opaque EIO on the wrong address.
        self.addr = self._probe_addr(addr)

        # Reset, wait, then wake with the best available clock; enable all axes.
        self._write(_PWR_MGMT_1, 0x80)
        time.sleep_ms(10)
        self._write(_PWR_MGMT_1, 0x01)
        self._write(_PWR_MGMT_2, 0x00)
        time.sleep_ms(10)

        # Configure gyro + accel exactly as the Pimoroni driver does: sample rate,
        # then low-pass filter (mode 5), then full-scale range.
        self.set_gyro_sample_rate(100)
        self.set_gyro_low_pass(enabled=True, mode=5)
        self.set_gyro_full_scale(250)
        self.set_accel_sample_rate(125)
        self.set_accel_low_pass(enabled=True, mode=5)
        self.set_accel_full_scale(16)

        # Best-effort magnetometer bring-up; accel + gyro still work if it fails.
        try:
            self._mag_init()
            self._mag_ok = True
        except Exception:  # noqa: BLE001 — degrade gracefully to 6-DoF
            self._mag_ok = False

    # --- address discovery --------------------------------------------------
    def _read_whoami(self):
        """Read WHO_AM_I as two STOP-separated transactions (write the register
        pointer, then read) rather than readfrom_mem's repeated-START — the
        repeated-START is the phase most likely to glitch on a loaded / weak-
        pull-up bus."""
        self.i2c.writeto(self.addr, bytes([_WHO_AM_I]))
        return self.i2c.readfrom(self.addr, 1)[0]

    def _probe_addr(self, preferred):
        """Find the ICM-20948 (0x68/0x69), trying \`preferred\` first, with a robust
        identity read; on failure raise a SPECIFIC error so a wiring fault, a
        wrong chip and an absent chip are told apart:
          * an address that ACKs (is in i2c.scan()) but whose transfers all EIO
            -> a BUS/wiring fault (bad pull-ups, loose SDA/SCL/GND);
          * an address that reads but reports a foreign WHO_AM_I -> wrong chip;
          * nothing on the bus at 0x68/0x69 -> not connected.
        """
        try:
            present = set(self.i2c.scan())
        except Exception:  # noqa: BLE001 — scan unsupported; probe blindly
            present = None

        transfer_fault = []   # ACKs its address but reads/writes EIO
        wrong_chip = []       # reads OK but WHO_AM_I isn't an InvenSense IMU
        for a in [preferred] + [x for x in (0x68, 0x69) if x != preferred]:
            if present is not None and a not in present:
                continue
            self.addr = a
            got = None
            for _ in range(4):
                try:
                    self._bank = -1  # force a fresh bank-select each attempt
                    self._bank_select(0)
                    time.sleep_ms(1)  # let the bank write settle before reading
                    got = self._read_whoami()
                except OSError:
                    got = None
                    # Best-effort: clear a possible dirty state (aux-I2C master
                    # left running by a prior soft-reboot) before retrying.
                    try:
                        self.i2c.writeto_mem(a, _PWR_MGMT_1, b"\\x80")
                        time.sleep_ms(10)
                    except OSError:
                        pass
                    time.sleep_ms(5)
                    continue
                if got in _KNOWN_IDS:
                    self._bank = 0  # after a settle the chip is in bank 0
                    return a
                time.sleep_ms(5)
            (transfer_fault if got is None else wrong_chip).append(
                a if got is None else (a, got)
            )

        if transfer_fault:
            raise OSError(
                "0x%02X ACKs its address but every I2C transfer fails (EIO). "
                "This is a BUS/wiring fault, not the driver: add STRONG SDA/SCL "
                "pull-ups to 3V3 (2.2k-4.7k), a solid common GND, and re-seat "
                "SDA/SCL. On RP2350 boards (e.g. Tiny 2350) use ~2.2k — erratum "
                "RP2350-E9 adds a leaky ~8.2k internal pull-down that a 4.7k "
                "can't overcome, so the bus ACKs but can't clock data."
                % transfer_fault[0]
            )
        if wrong_chip:
            a, got = wrong_chip[0]
            raise OSError(
                "0x%02X reports WHO_AM_I=0x%02X, not an ICM-20948 (0xEA). "
                "0x71/0x70/0x68 (at reg 0x75) = MPU-9250/6500/6050; "
                "0xFF/0x00 = a bus glitch." % (a, got)
            )
        raise OSError(
            "ICM20948 not found at 0x68/0x69 — check wiring (SDA/SCL/3V3/GND) "
            "and run i2c.scan() to see what's on the bus"
        )

    # --- low-level I2C ------------------------------------------------------
    def _write(self, reg, value):
        self.i2c.writeto_mem(self.addr, reg, bytes([value & 0xFF]))
        time.sleep_us(100)  # match Pimoroni: let the register write settle

    def _read(self, reg):
        return self.i2c.readfrom_mem(self.addr, reg, 1)[0]

    def _read_bytes(self, reg, length):
        return self.i2c.readfrom_mem(self.addr, reg, length)

    def _bank_select(self, bank):
        """Switch the active user bank (cached to skip redundant writes)."""
        if self._bank != bank:
            self.i2c.writeto_mem(self.addr, _REG_BANK_SEL, bytes([bank << 4]))
            self._bank = bank

    # --- identity -----------------------------------------------------------
    def who_am_i(self):
        """Return the WHO_AM_I byte (0xEA on a healthy ICM-20948)."""
        self._bank_select(0)
        return self._read(_WHO_AM_I)

    @property
    def mag_supported(self):
        """True when the AK09916 magnetometer was found at start-up."""
        return self._mag_ok

    # --- configuration ------------------------------------------------------
    def set_accel_full_scale(self, g=16):
        """Set the accelerometer range to ±\`g\` (one of 2, 4, 8, 16)."""
        self._bank_select(2)
        value = (self._read(_ACCEL_CONFIG) & 0b11111001) | ({2: 0, 4: 1, 8: 2, 16: 3}[g] << 1)
        self._write(_ACCEL_CONFIG, value)
        self._accel_gs = _ACCEL_GS[g]

    def set_gyro_full_scale(self, dps=250):
        """Set the gyro range to ±\`dps\` (one of 250, 500, 1000, 2000)."""
        self._bank_select(2)
        value = (self._read(_GYRO_CONFIG_1) & 0b11111001) | ({250: 0, 500: 1, 1000: 2, 2000: 3}[dps] << 1)
        self._write(_GYRO_CONFIG_1, value)
        self._gyro_dps = _GYRO_DPS[dps]

    # Sample-rate + low-pass filter config, mirroring the Pimoroni driver's init so
    # the accel/gyro are filtered/paced identically (not left at raw defaults).
    def set_gyro_sample_rate(self, rate=100):
        """Set the gyro output data rate in Hz (1.125 kHz / (1 + div))."""
        self._bank_select(2)
        self._write(_GYRO_SMPLRT_DIV, int((1125.0 / rate) - 1) & 0xFF)

    def set_gyro_low_pass(self, enabled=True, mode=5):
        """Configure the gyro digital low-pass filter (mode 0..7)."""
        self._bank_select(2)
        value = self._read(_GYRO_CONFIG_1) & 0b10001110
        if enabled:
            value |= 0b1
        value |= (mode & 0x07) << 4
        self._write(_GYRO_CONFIG_1, value)

    def set_accel_sample_rate(self, rate=125):
        """Set the accelerometer output data rate in Hz (1.125 kHz / (1 + div))."""
        self._bank_select(2)
        div = int((1125.0 / rate) - 1)
        self._write(_ACCEL_SMPLRT_DIV_1, (div >> 8) & 0xFF)
        self._write(_ACCEL_SMPLRT_DIV_2, div & 0xFF)

    def set_accel_low_pass(self, enabled=True, mode=5):
        """Configure the accelerometer digital low-pass filter (mode 0..7)."""
        self._bank_select(2)
        value = self._read(_ACCEL_CONFIG) & 0b10001110
        if enabled:
            value |= 0b1
        value |= (mode & 0x07) << 4
        self._write(_ACCEL_CONFIG, value)

    # --- accel + gyro -------------------------------------------------------
    def read_accel_gyro(self):
        """Read accel (g) and gyro (dps) together: (ax, ay, az, gx, gy, gz)."""
        self._bank_select(0)
        ax, ay, az, gx, gy, gz = struct.unpack(">hhhhhh", self._read_bytes(_ACCEL_XOUT_H, 12))
        gs, dps = self._accel_gs, self._gyro_dps
        return (ax / gs, ay / gs, az / gs, gx / dps, gy / dps, gz / dps)

    def read_accel(self):
        """Return the 3-axis acceleration as (x, y, z) in g."""
        self._bank_select(0)
        ax, ay, az = struct.unpack(">hhh", self._read_bytes(_ACCEL_XOUT_H, 6))
        gs = self._accel_gs
        return (ax / gs, ay / gs, az / gs)

    def read_gyro(self):
        """Return the 3-axis angular rate as (x, y, z) in degrees/second."""
        self._bank_select(0)
        gx, gy, gz = struct.unpack(">hhh", self._read_bytes(_GYRO_XOUT_H, 6))
        dps = self._gyro_dps
        return (gx / dps, gy / dps, gz / dps)

    # --- magnetometer (AK09916 via the ICM-20948's aux-I2C master) ----------
    # Robust Adafruit/SparkFun scheme: SLV4 does single AK09916 register reads/
    # writes (config), each polled to completion via I2C_MST_STATUS; SLV0 then
    # streams the measurement registers continuously into the ICM's own
    # EXT_SLV_SENS_DATA regs, so read_mag() is just a local register read — no
    # per-read trigger, and a stuck aux-master is recovered by a reset + retry.
    def _mst_wait(self):
        """Wait for the SLV4 single transaction to finish. True if it completed."""
        self._bank_select(0)
        for _ in range(100):
            if self._read(_I2C_MST_STATUS) & _MST_STATUS_SLV4_DONE:
                return True
            time.sleep_ms(10)
        return False

    def _reset_i2c_master(self):
        """Pulse USER_CTRL.I2C_MST_RST to unstick a hung aux-I2C master."""
        self._bank_select(0)
        self._write(_USER_CTRL, self._read(_USER_CTRL) | _USER_CTRL_I2C_MST_RST)
        time.sleep_ms(10)

    def _mag_read(self, reg):
        """Read one AK09916 register via SLV4 (None if it never completes)."""
        self._bank_select(3)
        self._write(_I2C_SLV4_ADDR, _AK09916_ADDR | 0x80)   # read direction
        self._write(_I2C_SLV4_REG, reg)
        self._write(_I2C_SLV4_CTRL, 0x80)                   # enable, 1 byte
        if not self._mst_wait():
            return None
        self._bank_select(3)
        return self._read(_I2C_SLV4_DI)

    def _mag_write(self, reg, value):
        """Write one AK09916 register via SLV4."""
        self._bank_select(3)
        self._write(_I2C_SLV4_ADDR, _AK09916_ADDR)          # write direction
        self._write(_I2C_SLV4_REG, reg)
        self._write(_I2C_SLV4_DO, value)
        self._write(_I2C_SLV4_CTRL, 0x80)                   # enable
        self._mst_wait()

    def _mag_init(self):
        # Enable the ICM's aux-I2C master (no bypass), ~345 kHz, no repeated start.
        self._bank_select(0)
        self._write(_INT_PIN_CFG, self._read(_INT_PIN_CFG) & ~_INT_PIN_CFG_BYPASS_EN)
        time.sleep_ms(5)
        self._bank_select(3)
        self._write(_I2C_MST_CTRL, 0x17)
        self._bank_select(0)
        self._write(_USER_CTRL, self._read(_USER_CTRL) | _USER_CTRL_I2C_MST_EN)
        time.sleep_ms(20)
        # Confirm the AK09916, retrying with a master reset if the aux bus is stuck.
        for _ in range(5):
            if self._mag_read(_AK09916_WIA) == _AK09916_CHIP_ID:
                break
            self._reset_i2c_master()
        else:
            raise RuntimeError("AK09916 magnetometer not found on aux bus")
        # 100 Hz continuous (power-down first, per the datasheet).
        self._mag_write(_AK09916_CNTL2, _AK09916_MODE_SHUTDOWN)
        time.sleep_ms(1)
        self._mag_write(_AK09916_CNTL2, _AK09916_MODE_100HZ)
        # Stream 9 bytes (HXL..ST2) from the AK09916 into EXT_SLV_SENS_DATA via
        # SLV0, so the mag data refreshes in the ICM's registers automatically.
        self._bank_select(3)
        self._write(_I2C_SLV0_ADDR, _AK09916_ADDR | 0x80)   # read direction
        self._write(_I2C_SLV0_REG, _AK09916_HXL)
        self._write(_I2C_SLV0_CTRL, 0x80 | 0x09)            # enable, 9 bytes
        self._bank_select(0)
        time.sleep_ms(50)

    def read_mag(self):
        """Return the 3-axis magnetic field as (x, y, z) in microtesla (µT), read
        from the continuously-streamed AK09916 data. Raises if the magnetometer
        wasn't found at start-up (\`mag_supported\` is False)."""
        if not self._mag_ok:
            raise RuntimeError("Magnetometer unavailable (AK09916 not initialised)")
        self._bank_select(0)
        mx, my, mz = struct.unpack("<hhh", self._read_bytes(_EXT_SLV_SENS_DATA_00, 6))
        s = _AK09916_UT_PER_LSB
        return (mx * s, my * s, mz * s)
`,"sg90/servo.py":`"""SG90-style hobby-servo driver for MicroPython.

One servo on one PWM GPIO (50 Hz, ~0.5-2.5 ms pulse). Angle setter/getter, min/max
angle + pulse limits, blocking \`sweep\`, and eased motion (\`ease\`).

    from servo import Servo
    s = Servo(16)          # signal on GP16
    s.angle(90)            # centre
    s.sweep(0, 180)        # go end to end
    s.ease(0, 600)         # smooth glide to 0 over 600 ms
    s.detach()             # release (stop holding torque)

You can also hand it a PWM you made yourself, so the wiring reads
pin -> PWM -> Servo -> (joint in the model):

    from machine import Pin, PWM
    base_pwm = PWM(Pin(0))     # the GP0 signal
    base = Servo(base_pwm)     # give the servo that PWM
"""

from machine import Pin, PWM
import time


def _clamp(n, lo, hi):
    return lo if n < lo else hi if n > hi else n


class Servo:
    def __init__(self, pin, freq=50, min_us=500, max_us=2500, min_angle=0, max_angle=180):
        # \`pin\` may be a GPIO number, a machine.Pin, OR an already-made machine.PWM
        # — so \`Servo(16)\`, \`Servo(Pin(16))\` and \`Servo(PWM(Pin(16)))\` all work. This
        # lets the code read pin -> PWM -> Servo -> joint: you make the PWM, then pass
        # it in. A bare pin is wrapped for you; a PWM is used (and shared) as-is.
        if isinstance(pin, PWM):
            self._pwm = pin
        elif isinstance(pin, Pin):
            self._pwm = PWM(pin)
        else:
            self._pwm = PWM(Pin(pin))
        self._pwm.freq(freq)
        self._period_us = 1_000_000 // freq  # 20000 us @ 50 Hz
        self.min_us = min_us
        self.max_us = max_us
        self.min_angle = min_angle
        self.max_angle = max_angle
        self._angle = None

    def write_us(self, us):
        """Drive a raw pulse width (µs), clamped to [min_us, max_us]."""
        us = _clamp(us, self.min_us, self.max_us)
        self._pwm.duty_u16(int(us * 65535 // self._period_us))

    def angle(self, deg=None):
        """Get the last commanded angle, or set a new one (clamped to limits)."""
        if deg is None:
            return self._angle
        deg = _clamp(deg, self.min_angle, self.max_angle)
        span = (deg - self.min_angle) / (self.max_angle - self.min_angle)
        self.write_us(self.min_us + span * (self.max_us - self.min_us))
        self._angle = deg
        return deg

    def min(self):
        """Go to the minimum angle."""
        return self.angle(self.min_angle)

    def max(self):
        """Go to the maximum angle."""
        return self.angle(self.max_angle)

    def sweep(self, start, end, step=1, delay_ms=15):
        """Blocking sweep from \`start\` to \`end\` in \`step\`° increments."""
        step = abs(step) or 1
        rng = range(start, end + 1, step) if end >= start else range(start, end - 1, -step)
        for a in rng:
            self.angle(a)
            time.sleep_ms(delay_ms)

    def ease(self, target, duration_ms=500, steps=30, easing="in_out"):
        """Glide to \`target\` over \`duration_ms\` with an easing curve.

        \`easing\`: "linear", "in" (accelerate), "out" (decelerate), "in_out"
        (smoothstep). Blocking.
        """
        start = self._angle if self._angle is not None else target
        steps = max(1, steps)
        for i in range(steps + 1):
            t = i / steps
            if easing == "in":
                t = t * t
            elif easing == "out":
                t = 1 - (1 - t) * (1 - t)
            elif easing == "in_out":
                t = t * t * (3 - 2 * t)  # smoothstep
            self.angle(start + (target - start) * t)
            time.sleep_ms(duration_ms // steps)

    def detach(self):
        """Stop holding torque (idle) — quells buzz at an end stop."""
        self._pwm.duty_u16(0)

    def deinit(self):
        """Release the PWM peripheral."""
        self._pwm.deinit()
`},qe=[{id:"snakie-standard",name:"Standard Parts",description:"The canonical Snakie parts — microcontrollers, sensors, ICs, power and more — kept up to date from github.com/kevinmcaleer/snakie-parts.",author:"Snakie",homepage:"https://github.com/kevinmcaleer/snakie-parts",version:"1.2.0",source:"registry",parts:oe}];function je(){const i=qe;return{listLibraries:async()=>i,readDriverSource:async(e,n,a)=>{const t=le[`${n}/${a}`];return t!=null?{ok:!0,contents:t}:{ok:!1,error:`No bundled driver "${a}" for ${n}.`}},checkUpdates:async()=>[],cachedUpdates:async()=>[]}}const $e=`# SPDX-License-Identifier: MIT
"""Piezo-buzzer tone + RTTTL melody helper (Snakie module #120).

This is the driver behind the dock **Buzzer** instrument. It plays single tones
and parses/plays RTTTL ringtone strings on a PWM-driven piezo buzzer.

Usage on a board::

    from buzzer import Buzzer
    bz = Buzzer(pin=15)
    bz.tone(440, 200)                    # A4 for 200 ms
    bz.play_rtttl('beep:d=4,o=5,b=120:c,e,g')

The note-name → frequency mapping (\`note_to_freq\`) and the RTTTL header/note
parser (\`parse_rtttl\`) are pure and unit-testable under CPython without PWM.
"""

# Equal-tempered semitone offsets from C within an octave.
_SEMITONE = {"c": 0, "d": 2, "e": 4, "f": 5, "g": 7, "a": 9, "b": 11}


def note_to_freq(name, octave):
    """Return the frequency (Hz, rounded) of a note like \`\`'c'\`\` / \`\`'a#'\`\`. Pure.

    \`octave\` is the scientific octave (A4 = 440 Hz at octave 4). A rest (\`\`'p'\`\`)
    returns \`\`0\`\` so the player just delays silently.
    """
    name = name.lower()
    if name.startswith("p"):
        return 0
    semitone = _SEMITONE[name[0]]
    if len(name) > 1 and name[1] == "#":
        semitone += 1
    # MIDI note number, with A4 (440 Hz) = MIDI 69.
    midi = (octave + 1) * 12 + semitone
    return int(round(440.0 * (2.0 ** ((midi - 69) / 12.0))))


def parse_rtttl(tune):
    """Parse an RTTTL string into a list of \`\`(freq_hz, duration_ms)\`\` notes. Pure.

    Format: \`\`name:d=<dur>,o=<octave>,b=<bpm>:<note>,<note>,…\`\` where each note is
    \`\`[duration]note[#][.][octave]\`\`. Returns the playable note list so the player
    (and the IDE) can drive it without a buzzer attached.
    """
    name_part, defaults, notes_part = tune.split(":")
    d, o, b = 4, 5, 63
    for setting in defaults.split(","):
        setting = setting.strip()
        if not setting:
            continue
        key, _, val = setting.partition("=")
        if key == "d":
            d = int(val)
        elif key == "o":
            o = int(val)
        elif key == "b":
            b = int(val)
    # Whole-note duration in ms = 4 beats * (60000 / bpm).
    whole_ms = 4 * 60000 / b
    out = []
    for token in notes_part.split(","):
        token = token.strip().lower()
        if not token:
            continue
        i = 0
        while i < len(token) and token[i].isdigit():
            i += 1
        dur = int(token[:i]) if i else d
        rest = token[i:]
        note = rest[0] if rest else "p"
        rest = rest[1:]
        if rest[:1] == "#":
            note += "#"
            rest = rest[1:]
        dotted = False
        if rest[:1] == ".":
            dotted = True
            rest = rest[1:]
        octv = int(rest) if rest.isdigit() else o
        ms = whole_ms / dur
        if dotted:
            ms *= 1.5
        out.append((note_to_freq(note, octv), int(round(ms))))
    return out


class Buzzer:
    """A piezo buzzer on a PWM-capable \`pin\`."""

    def __init__(self, pin):
        from machine import Pin, PWM

        self._pwm = PWM(pin if isinstance(pin, Pin) else Pin(pin))
        self._pwm.duty_u16(0)

    def tone(self, freq, ms):
        """Play \`freq\` Hz for \`ms\` milliseconds (a rest if \`freq\` <= 0)."""
        import time

        if freq > 0:
            self._pwm.freq(int(freq))
            self._pwm.duty_u16(32768)  # 50% duty
        time.sleep_ms(ms)
        self._pwm.duty_u16(0)

    def play_rtttl(self, tune):
        """Parse and play an RTTTL melody string."""
        for freq, ms in parse_rtttl(tune):
            self.tone(freq, ms)

    def off(self):
        """Silence the buzzer."""
        self._pwm.duty_u16(0)
`,Qe=`# SPDX-License-Identifier: MIT
"""HC-SR04 ultrasonic range finder driver (Snakie module #120).

A tiny, self-contained MIT-licensed driver for the HC-SR04: pulse the *trigger*
pin high for 10 us, then time the *echo* pulse and convert to a distance. This is
the driver behind the dock **Range** instrument (#112).

Usage on a board::

    from machine import Pin
    from hcsr04 import HCSR04
    import instruments as inst

    sensor = HCSR04(trigger=3, echo=2)
    while True:
        inst.distance(sensor.distance_mm())   # -> Range instrument

The pure conversion (\`echo_to_distance_mm\`) is split out so it can be unit-tested
under CPython without any \`machine\` hardware.
"""

# Speed of sound ~= 343 m/s = 0.343 mm/us. The echo pulse covers the round trip
# (out and back), so distance = (pulse_us * 0.343) / 2.
_MM_PER_US = 0.343


def echo_to_distance_mm(pulse_us):
    """Convert a measured echo pulse width (microseconds) to a distance in mm.

    A negative \`pulse_us\` (the timeout sentinel from \`machine.time_pulse_us\`)
    yields \`\`-1\`\` to signal "out of range / no echo" rather than a bogus value.
    Pure — no hardware needed, so the IDE can unit-test it.
    """
    if pulse_us is None or pulse_us < 0:
        return -1
    return (pulse_us * _MM_PER_US) / 2


class HCSR04:
    """Driver for an HC-SR04 ultrasonic range finder.

    \`trigger\` / \`echo\` are pin numbers (or \`machine.Pin\` objects). \`echo_timeout_us\`
    bounds the wait so a missing/too-far target returns \`\`-1\`\` instead of blocking.
    """

    def __init__(self, trigger, echo, echo_timeout_us=30000):
        # Imported lazily so this module imports cleanly under CPython for tests.
        from machine import Pin

        self._timeout = echo_timeout_us
        self._trigger = trigger if isinstance(trigger, Pin) else Pin(trigger, Pin.OUT)
        self._echo = echo if isinstance(echo, Pin) else Pin(echo, Pin.IN)
        self._trigger.value(0)

    def _pulse_us(self):
        from machine import time_pulse_us
        import time

        # 10 us trigger pulse (datasheet), after a short settle low.
        self._trigger.value(0)
        time.sleep_us(5)
        self._trigger.value(1)
        time.sleep_us(10)
        self._trigger.value(0)
        try:
            return time_pulse_us(self._echo, 1, self._timeout)
        except OSError:
            return -1

    def distance_mm(self):
        """Measure and return the distance in millimetres (\`\`-1\`\` if no echo)."""
        return echo_to_distance_mm(self._pulse_us())

    def distance_cm(self):
        """Measure and return the distance in centimetres (\`\`-1\`\` if no echo)."""
        mm = self.distance_mm()
        return -1 if mm < 0 else mm / 10
`,Ye=`# SPDX-License-Identifier: MIT
"""MPU-6050 6-axis IMU driver (Snakie module #120).

A small, self-contained MIT-licensed register driver for the InvenSense MPU-6050
(3-axis accelerometer + 3-axis gyroscope over I²C). This is the driver behind the
dock **IMU** instrument (#111).

Usage on a board::

    from machine import I2C, Pin
    from mpu6050 import MPU6050
    import instruments as inst

    imu = MPU6050(I2C(0, sda=Pin(0), scl=Pin(1)))
    while True:
        ax, ay, az = imu.accel()
        inst.imu(*imu.euler_estimate())   # -> IMU instrument

The raw register decode (\`raw_to_g\`, \`raw_to_dps\`) and the accel→euler estimate
(\`accel_to_euler\`) are split out so they can be unit-tested under CPython without
an I²C bus.
"""

import math

# Register map (subset needed for accel + gyro).
_PWR_MGMT_1 = 0x6B
_ACCEL_XOUT_H = 0x3B
_DEFAULT_ADDR = 0x68

# Full-scale defaults after reset: accel ±2 g, gyro ±250 °/s.
_ACCEL_LSB_PER_G = 16384.0
_GYRO_LSB_PER_DPS = 131.0


def _twos16(hi, lo):
    """Combine two bytes (big-endian) into a signed 16-bit int. Pure."""
    val = (hi << 8) | lo
    return val - 65536 if val >= 32768 else val


def raw_to_g(hi, lo, lsb_per_g=_ACCEL_LSB_PER_G):
    """Decode an accelerometer axis (two raw bytes) to g. Pure."""
    return _twos16(hi, lo) / lsb_per_g


def raw_to_dps(hi, lo, lsb_per_dps=_GYRO_LSB_PER_DPS):
    """Decode a gyroscope axis (two raw bytes) to degrees/second. Pure."""
    return _twos16(hi, lo) / lsb_per_dps


def accel_to_euler(ax, ay, az):
    """Estimate (roll, pitch) in degrees from an accelerometer vector (g).

    Yaw is unobservable from gravity alone, so it is returned as \`\`0.0\`\`. Pure —
    feeds the dock IMU instrument's 3-D attitude view without a gyro fusion step.
    """
    roll = math.degrees(math.atan2(ay, az)) if (ay or az) else 0.0
    pitch = math.degrees(math.atan2(-ax, math.sqrt(ay * ay + az * az)))
    return roll, pitch, 0.0


class MPU6050:
    """Driver for an MPU-6050 IMU on an I²C bus."""

    def __init__(self, i2c, addr=_DEFAULT_ADDR):
        self._i2c = i2c
        self._addr = addr
        # Wake the device (clear the SLEEP bit it powers up with).
        self._i2c.writeto_mem(addr, _PWR_MGMT_1, b"\\x00")

    def _read_accel_block(self):
        # 6 bytes: ax_h, ax_l, ay_h, ay_l, az_h, az_l.
        return self._i2c.readfrom_mem(self._addr, _ACCEL_XOUT_H, 6)

    def accel(self):
        """Return the (x, y, z) acceleration in g."""
        b = self._read_accel_block()
        return raw_to_g(b[0], b[1]), raw_to_g(b[2], b[3]), raw_to_g(b[4], b[5])

    def euler_estimate(self):
        """Return an accel-only (roll, pitch, yaw=0) attitude estimate in degrees."""
        return accel_to_euler(*self.accel())
`,Je=`# SPDX-License-Identifier: MIT
"""WS2812 / NeoPixel addressable-LED helper (Snakie module #120).

This is the driver behind the dock **LED** instrument (#114) for *addressable*
RGB strips. On most MicroPython ports a frozen \`\`neopixel\`\` module already exists;
this module is a tiny, self-contained wrapper that uses it when present and falls
back to a \`machine.bitstream\` bit-bang otherwise — so the dock LED panel has a
uniform API regardless of port.

Usage on a board::

    from neopixel_ws2812 import NeoStrip
    strip = NeoStrip(pin=0, n=8)
    strip.fill((0, 40, 0)); strip.write()      # all green

The colour helpers (\`wheel\`, \`scale\`) are pure and unit-testable under CPython.
"""


def scale(color, brightness):
    """Scale an \`\`(r, g, b)\`\` tuple by \`\`brightness\`\` in 0.0–1.0. Pure.

    Clamps brightness to [0, 1] and each channel to [0, 255] integers — handy for
    dimming the whole strip without losing hue.
    """
    b = 0.0 if brightness < 0 else (1.0 if brightness > 1 else brightness)
    return tuple(max(0, min(255, int(round(c * b)))) for c in color)


def wheel(pos):
    """Map a position 0–255 to an \`\`(r, g, b)\`\` colour-wheel value. Pure.

    The classic Adafruit colour wheel — useful for rainbow demos driven from the
    dock LED instrument. Wraps \`pos\` into range first.
    """
    pos = pos % 256
    if pos < 85:
        return (255 - pos * 3, pos * 3, 0)
    if pos < 170:
        pos -= 85
        return (0, 255 - pos * 3, pos * 3)
    pos -= 170
    return (pos * 3, 0, 255 - pos * 3)


class NeoStrip:
    """A WS2812 strip of \`n\` pixels on \`pin\`, with a uniform fill/set/write API."""

    def __init__(self, pin, n):
        from machine import Pin

        self._n = n
        self._pin = pin if isinstance(pin, Pin) else Pin(pin, Pin.OUT)
        self._buf = [(0, 0, 0)] * n
        try:
            import neopixel

            self._np = neopixel.NeoPixel(self._pin, n)
        except ImportError:
            # No frozen neopixel; we'll bit-bang in write().
            self._np = None

    def __len__(self):
        return self._n

    def fill(self, color):
        """Set every pixel to \`color\` (an \`\`(r, g, b)\`\` tuple)."""
        self._buf = [color] * self._n

    def set(self, i, color):
        """Set pixel \`i\` to \`color\`."""
        self._buf[i] = color

    def write(self):
        """Flush the buffer to the strip (frozen \`neopixel\` or a bitstream)."""
        if self._np is not None:
            for i, c in enumerate(self._buf):
                self._np[i] = c
            self._np.write()
            return
        # Fallback: WS2812 wants GRB order, 800 kHz (timing in ns).
        data = bytearray()
        for r, g, b in self._buf:
            data += bytes((g, r, b))
        self._pin.bitstream(1, (400, 850, 800, 450), data)
`,Ze=`# SPDX-License-Identifier: MIT
"""Quadrature rotary-encoder helper (Snakie module #120).

This is the driver behind the dock **Encoder** instrument (#117). It decodes the
two-bit Gray-code transitions of a quadrature rotary encoder into a running step
count + direction.

Usage on a board::

    from rotary import Rotary
    import instruments as inst

    enc = Rotary(clk=2, dt=3)
    while True:
        inst.plot(steps=enc.value())   # -> Encoder / Plotter

The pure transition decode (\`step_delta\`) is split out so it can be unit-tested
under CPython with no pins — the IDE drives it with synthetic state sequences.
"""

# Quadrature transition table: index by (prev_state << 2) | new_state, where each
# 2-bit state is (clk << 1) | dt. +1 = clockwise step, -1 = counter-clockwise,
# 0 = no movement / invalid (bounce) transition.
_TABLE = (
    0, -1, 1, 0,
    1, 0, 0, -1,
    -1, 0, 0, 1,
    0, 1, -1, 0,
)


def step_delta(prev_state, new_state):
    """Return the step delta (-1, 0, +1) for a quadrature transition. Pure.

    \`prev_state\` / \`new_state\` are 2-bit values \`\`(clk << 1) | dt\`\`. Invalid /
    bounce transitions yield \`\`0\`\`. This is the whole decode logic, hardware-free
    so the IDE can unit-test the direction handling.
    """
    return _TABLE[((prev_state & 0b11) << 2) | (new_state & 0b11)]


class Rotary:
    """Polled quadrature rotary encoder on the \`clk\` and \`dt\` pins."""

    def __init__(self, clk, dt):
        from machine import Pin

        self._clk = clk if isinstance(clk, Pin) else Pin(clk, Pin.IN, Pin.PULL_UP)
        self._dt = dt if isinstance(dt, Pin) else Pin(dt, Pin.IN, Pin.PULL_UP)
        self._count = 0
        self._state = (self._clk.value() << 1) | self._dt.value()

    def poll(self):
        """Sample the pins, fold in any step, and return the latest count.

        Call this often (e.g. each loop iteration); it is non-blocking.
        """
        new_state = (self._clk.value() << 1) | self._dt.value()
        self._count += step_delta(self._state, new_state)
        self._state = new_state
        return self._count

    def value(self):
        """Return the current accumulated step count (after \`poll\`)."""
        return self._count

    def reset(self):
        """Reset the step count to zero."""
        self._count = 0
`,en=`# SPDX-License-Identifier: MIT
"""Teleop receiver — gamepad axes -> motor outputs (Snakie module #120).

This is the helper behind the dock **Gamepad** instrument. The IDE writes control
lines (\`\`SNKCMD teleop axes=lx:0.5,ly:-0.2 …\`\`) which the on-device
\`\`instruments.control\`\` helper parses; this module turns those normalised
\`\`lx\`\`/\`\`ly\`\` axes into per-wheel drive values for a differential-drive robot.

Usage on a board::

    from machine import Pin, PWM
    from teleop import arcade_mix, TeleopDrive
    import instruments as inst

    drive = TeleopDrive(left=PWM(Pin(16)), right=PWM(Pin(17)))
    while True:
        inst.control.poll()
        ax = inst.control.axes('teleop')          # {'lx':…, 'ly':…}
        drive.apply(ax.get('lx', 0), ax.get('ly', 0))

\`arcade_mix\` (and \`clamp\`) are pure and unit-testable under CPython with no PWM.
"""


def clamp(value, lo=-1.0, hi=1.0):
    """Clamp \`value\` to the inclusive [\`lo\`, \`hi\`] range. Pure."""
    if value < lo:
        return lo
    if value > hi:
        return hi
    return value


def arcade_mix(throttle, steering):
    """Mix a throttle + steering axis into \`\`(left, right)\`\` wheel values. Pure.

    \`throttle\` (forward/back) and \`steering\` (turn) are normalised in [-1, 1];
    the result is each wheel's signed power in [-1, 1] (arcade/single-stick
    mixing). This is the whole teleop maths, hardware-free so the IDE can test it.
    """
    throttle = clamp(throttle)
    steering = clamp(steering)
    return clamp(throttle + steering), clamp(throttle - steering)


def _duty_u16(power):
    """Map a signed power [-1, 1] to a 16-bit PWM duty magnitude. Pure helper."""
    return int(round(abs(clamp(power)) * 65535))


class TeleopDrive:
    """Differential-drive mixer that applies gamepad axes to two PWM motors.

    \`left\` / \`right\` are \`machine.PWM\` objects (or anything exposing
    \`\`duty_u16\`\`). Direction pins are optional; without them only magnitude is
    driven (suitable for a simple ESC / a single-direction test).
    """

    def __init__(self, left, right, left_dir=None, right_dir=None):
        self._left = left
        self._right = right
        self._left_dir = left_dir
        self._right_dir = right_dir

    def apply(self, throttle, steering):
        """Mix and drive both motors from a throttle + steering axis."""
        lp, rp = arcade_mix(throttle, steering)
        self._set(self._left, self._left_dir, lp)
        self._set(self._right, self._right_dir, rp)
        return lp, rp

    @staticmethod
    def _set(motor, dir_pin, power):
        if dir_pin is not None:
            dir_pin.value(1 if power >= 0 else 0)
        motor.duty_u16(_duty_u16(power))

    def stop(self):
        """Cut power to both motors."""
        self._left.duty_u16(0)
        self._right.duty_u16(0)
`,nn=`"""Snakie Instruments — the on-device robotics telemetry + control toolkit.

Copy this file onto your MicroPython board (a Pico, etc.) and \`\`import\`\` it.
Instead of the IDE polling the board over the raw REPL (which interrupts a
running program), your program *prints* readings with these helpers and the
IDE *parses the serial stream* — so it works non-invasively, even inside a
tight \`\`while True:\`\` loop. The reverse direction (IDE → board) is the
**control channel**: the IDE writes \`\`SNKCMD …\`\` lines and the \`\`control\`\`
helper here polls stdin non-blockingly and hands you the latest values.

Quick start
-----------

::

    import time
    from machine import ADC, PWM, Pin
    import instruments as inst

    pwm = PWM(Pin(0)); pwm.freq(1000); pwm.duty_u16(32768)
    adc = ADC(26)

    while True:
        inst.read_pwm(pwm, ch="pwm")        # -> Oscilloscope
        inst.read_adc(adc, ch="adc0")       # -> Multimeter
        inst.plot(temp=21.4, light=80)      # -> Plotter
        inst.imu(0.0, 1.2, 90.0)            # -> 3-D attitude
        inst.distance(123)                  # -> range view
        inst.control.poll()                 # <- read IDE commands
        ax = inst.control.axes("teleop")    # {'lx': 0.5, 'ly': -0.2, ...}
        time.sleep(0.1)

The telemetry protocol
----------------------

Each emitter does a single \`\`print()\`\` of ONE line, prefixed with the sentinel
token \`\`SNK\`\` so the IDE can route the line to the right instrument and hide it
from the console. One reading per line, ASCII, space-delimited::

    SNK SCOPE <ch> <value>
    SNK METER <ch> <value> [<unit>]
    SNK PLOT  <tok> [<tok> ...]                 # each <tok> is name=value or a number
    SNK IMU   <ch> <roll> <pitch> <yaw>         # Euler angles, degrees
    SNK IMUQ  <ch> <w> <x> <y> <z>              # orientation quaternion
    SNK DIST  <ch> <mm> [<angle>]               # range mm, optional bearing deg
    SNK BTN   <name> <0|1>                       # button up(0)/down(1)
    SNK ENC   <ch> <count> [<0|1>]               # encoder count, optional press
    SNK SCR   <addr> text <row> [<row> ...]      # rows: spaces encoded as '_'
    SNK SCR   <addr> fb <w> <h> <enc> <data>     # framebuffer, enc in {b64,rle}
    SNK I2C   <addr> [<addr> ...]                # one bus-scan result set
    SNK WIFI  <ssid> <rssi> <ch> <sec>           # one network (SSID spaces -> '_')
    SNK BT    <name> <mac> <rssi>                # one BLE device (name spaces -> '_')

\`\`<ch>\`\`/\`\`<name>\`\` are user labels the IDE uses to match a reading to an open
instrument. The emitters are pure \`\`str\`\` formatting + one \`\`print\`\` (no
allocation-heavy work, no blocking) so they are safe to call at speed in a loop.
The **scanners** (\`\`i2c_scan\`\`/\`\`wifi_scan\`\`/\`\`bt_scan\`\`) block briefly to run
the scan, then emit the result set — call them occasionally, not every loop.

The control protocol (IDE -> board)
-----------------------------------

The IDE writes one line per command, mirroring the \`\`SNK\`\` sentinel so the
Terminal hides it::

    SNKCMD <target> <payload>

\`\`<target>\`\` names what to drive (\`\`teleop\`\`, \`\`led\`\`, \`\`buzzer\`\`, \`\`screen\`\`,
or a scan trigger like \`\`scan:i2c\`\`); \`\`<payload>\`\` is free-form for that
target. \`\`control\`\` stores the LATEST payload per target; poll it in your loop::

    inst.control.poll()                       # drain pending SNKCMD lines (non-blocking)
    inst.control.get("led")                   # latest raw payload string, or None
    inst.control.axes("teleop")               # {'lx': 0.5, ...} from axes=lx:0.5,...
    inst.control.pressed("teleop", "a")       # True if 'btn:a=1' present
"""

import sys

# Real machine.Pin / machine.PWM on a board; tiny no-op stubs under CPython (the
# Snakie simulator runs exported device code headless). Re-exported so generated
# code can fall back to \`from instruments import Pin, PWM\` and still run in the
# simulator, where the Servo emits SNK telemetry to drive the 3-D model anyway.
try:
    from machine import Pin, PWM  # noqa: F401 - re-exported for generated code
except ImportError:  # pragma: no cover - CPython simulator has no \`machine\`

    class Pin:  # noqa: N801 - mirror machine.Pin's name
        OUT = 1
        IN = 0

        def __init__(self, n, *args, **kwargs):
            self.id = n

        def value(self, *args):
            return 0

    class PWM:  # noqa: N801 - mirror machine.PWM's name
        def __init__(self, pin, *args, **kwargs):
            self.pin = pin

        def freq(self, *args):
            return 50

        def duty_u16(self, *args):
            return 0

        def deinit(self):
            pass


# Library version. Bump this on ANY change to this file — the IDE compares it
# against the copy installed on the board and offers a one-click UPDATE when they
# differ (a legacy copy with no __version__ reads as out-of-date). Keep the
# \`__version__ = "X.Y.Z"\` literal form so the IDE can parse it without importing.
__version__ = "0.9.2"

# The sentinel that prefixes every telemetry line. Kept short + ASCII so it is
# cheap to print and easy for the IDE to detect / strip.
SENTINEL = "SNK"

# The sentinel that prefixes IDE -> board control lines (issue #115). Mirrors
# SENTINEL so the IDE's Terminal hides the echo exactly as it hides telemetry.
CONTROL_SENTINEL = "SNKCMD"


# ---------------------------------------------------------------------------
# Emitters — telemetry, board -> IDE (read). Each is a single cheap print().
# ---------------------------------------------------------------------------

def scope(value, ch="ch1"):
    """Emit one oscilloscope sample \`\`value\`\` for channel \`\`ch\`\`.

    Prints \`\`SNK SCOPE <ch> <value>\`\`. Call repeatedly in a loop to feed a live
    waveform to an open Oscilloscope whose source matches \`\`ch\`\`.
    """
    print("%s SCOPE %s %s" % (SENTINEL, ch, value))


def meter(value, ch="adc0", unit="V"):
    """Emit one multimeter reading \`\`value\`\` (with \`\`unit\`\`) for channel \`\`ch\`\`.

    Prints \`\`SNK METER <ch> <value> <unit>\`\`. The IDE shows the latest value and
    folds it into the meter's MIN/MAX/AVG.
    """
    print("%s METER %s %s %s" % (SENTINEL, ch, value, unit))


def plot(*args, **kwargs):
    """Emit one plotter row of bare numbers and/or named series.

    \`\`plot(1, 2, 3)\`\` prints \`\`SNK PLOT 1 2 3\`\`; \`\`plot(temp=21.4, light=80)\`\`
    prints \`\`SNK PLOT temp=21.4 light=80\`\`; the two styles can be mixed. Each
    token uses the Plotter's own \`\`name=value\`\` / bare-number grammar.
    """
    toks = [str(a) for a in args]
    # \`kwargs\` preserves insertion order on MicroPython + CPython 3.7+, so the
    # series appear in the order the caller named them.
    for name, val in kwargs.items():
        toks.append("%s=%s" % (name, val))
    print("%s PLOT %s" % (SENTINEL, " ".join(toks)))


def imu(roll, pitch, yaw, ch="imu"):
    """Emit one IMU orientation as Euler angles (degrees) on channel \`\`ch\`\`.

    Prints \`\`SNK IMU <ch> <roll> <pitch> <yaw>\`\` for a live 3-D attitude view.
    """
    print("%s IMU %s %s %s %s" % (SENTINEL, ch, roll, pitch, yaw))


def imu_quat(w, x, y, z, ch="imu"):
    """Emit one IMU orientation as a quaternion (drift/gimbal-lock free).

    Prints \`\`SNK IMUQ <ch> <w> <x> <y> <z>\`\`.
    """
    print("%s IMUQ %s %s %s %s %s" % (SENTINEL, ch, w, x, y, z))


def env(temp, pressure, humidity, ch="env"):
    """Emit one environmental reading — temperature (°C), barometric pressure
    (hPa) and relative humidity (%RH) — on channel \`\`ch\`\`.

    Prints \`\`SNK ENV <ch> <temp> <pressure> <humidity>\`\` for the Barometer
    instrument (#216)::

        t, p, h = bme.read()
        inst.env(t, p, h)
    """
    print("%s ENV %s %s %s %s" % (SENTINEL, ch, temp, pressure, humidity))


def distance(mm, angle=None, ch="dist"):
    """Emit one distance reading in millimetres, with an optional bearing.

    Prints \`\`SNK DIST <ch> <mm>\`\` (or \`\`… <mm> <angle>\`\` when \`\`angle\`\` is given,
    e.g. a sweeping servo's degrees) for a range / proximity view.
    """
    if angle is None:
        print("%s DIST %s %s" % (SENTINEL, ch, mm))
    else:
        print("%s DIST %s %s %s" % (SENTINEL, ch, mm, angle))


def button(name, state):
    """Emit a button event \`\`name\`\` as down(1)/up(0).

    Prints \`\`SNK BTN <name> <0|1>\`\` — \`\`state\`\` is coerced to \`\`1\`\` if truthy.
    """
    print("%s BTN %s %s" % (SENTINEL, name, 1 if state else 0))


def encoder(count, ch="enc", pressed=None):
    """Emit a rotary-encoder \`\`count\`\` for channel \`\`ch\`\`, optionally its press.

    Prints \`\`SNK ENC <ch> <count>\`\` (or \`\`… <count> <0|1>\`\` when \`\`pressed\`\` is
    not \`\`None\`\`, for an encoder with an integrated push switch).
    """
    if pressed is None:
        print("%s ENC %s %s" % (SENTINEL, ch, count))
    else:
        print("%s ENC %s %s %s" % (SENTINEL, ch, count, 1 if pressed else 0))


def _scr_token(text):
    """Encode one screen row as a single ASCII token (spaces -> '_')."""
    return str(text).replace(" ", "_")


def screen(lines, addr="0x3C"):
    """Emit a small display's TEXT contents as rows.

    \`\`lines\`\` is an iterable of strings (one per row). Prints
    \`\`SNK SCR <addr> text <row> [<row> ...]\`\` with each row's spaces encoded as
    \`\`_\`\` so a row stays a single token (the IDE decodes them back). \`\`addr\`\` is
    the bus address label (default \`\`0x3C\`\`, a common SSD1306 OLED).
    """
    rows = " ".join(_scr_token(line) for line in lines)
    print("%s SCR %s text %s" % (SENTINEL, addr, rows))


def screen_fb(data, w, h, addr="0x3C", encoding="b64"):
    """Emit a small display's FRAMEBUFFER (a compact monochrome bitmap).

    \`\`data\`\` is the already-packed payload string; \`\`encoding\`\` documents the
    packing so the IDE can unpack it: \`\`b64\`\` (base64 of the raw 1-bpp buffer,
    row-major, MSB-first within each byte) or \`\`rle\`\` (a simple run-length form
    \`\`<count>x<0|1>\`\` repeated). Prints \`\`SNK SCR <addr> fb <w> <h> <enc> <data>\`\`.
    """
    print("%s SCR %s fb %s %s %s %s" % (SENTINEL, addr, w, h, encoding, data))


# ---------------------------------------------------------------------------
# Scanners — run a scan, then emit the result set. These BLOCK briefly; call
# them occasionally (emit-on-complete), not inside a tight loop. They tolerate a
# missing radio (no network/bluetooth) by degrading to no output.
# ---------------------------------------------------------------------------

def i2c_scan(i2c):
    """Scan an I²C bus and emit the responding addresses as one result set.

    Calls \`\`i2c.scan()\`\` and prints \`\`SNK I2C <addr> <addr> …\`\` (addresses as
    \`\`0x..\`\` hex; an empty bus prints a bare \`\`SNK I2C\`\`). \`\`i2c\`\` is a
    \`\`machine.I2C\`\`/\`\`SoftI2C\`\`.
    """
    addrs = list(i2c.scan())
    toks = " ".join("0x%02X" % a for a in addrs)
    print("%s I2C %s" % (SENTINEL, toks) if toks else "%s I2C" % SENTINEL)
    return addrs


def wifi_scan():
    """Scan for Wi-Fi networks (STA mode) and emit one line per network.

    Activates \`\`network.WLAN(STA_IF)\`\`, runs \`\`.scan()\`\` and prints one
    \`\`SNK WIFI <ssid> <rssi> <ch> <sec>\`\` per network (SSID spaces -> \`\`_\`\`).
    Degrades to no output (returns \`\`[]\`\`) when \`\`network\`\` is unavailable.
    """
    try:
        import network
    except ImportError:
        return []
    sta = network.WLAN(network.STA_IF)
    sta.active(True)
    nets = sta.scan()  # (ssid, bssid, channel, rssi, security, hidden)
    out = []
    for net in nets:
        ssid = net[0]
        if isinstance(ssid, (bytes, bytearray)):
            ssid = ssid.decode("utf-8", "replace")
        ssid = ssid or "?"
        ch = net[2]
        rssi = net[3]
        sec = net[4]
        print("%s WIFI %s %s %s %s" % (SENTINEL, _scr_token(ssid), rssi, ch, sec))
        out.append((ssid, rssi, ch, sec))
    return out


def _decode_adv_name(adv_data):
    """Extract the local name from BLE advertising data, or \`\`''\`\`.

    Advertising data is a run of AD structures \`\`<len><type><payload…>\`\`; AD type
    \`\`0x09\`\` is the Complete Local Name and \`\`0x08\`\` the Shortened Local Name.
    Pure + side-effect-free so it is unit-testable under CPython.
    """
    try:
        i = 0
        n = len(adv_data)
        while i + 1 < n:
            length = adv_data[i]
            if length == 0:
                break
            ad_type = adv_data[i + 1]
            if ad_type in (0x09, 0x08):
                return bytes(adv_data[i + 2:i + 1 + length]).decode("utf-8", "replace")
            i += 1 + length
    except Exception:
        pass
    return ""


def bt_scan(ms=4000):
    """Scan for Bluetooth (BLE) devices for ~\`\`ms\`\` and emit one line per device.

    Uses the low-level \`\`bluetooth\`\` module: actives the radio, registers a scan
    IRQ that collects each advertisement's (address, rssi, payload), runs an
    ACTIVE \`\`gap_scan\`\` for \`\`ms\`\` (active so devices return their names), then
    emits one \`\`SNK BT <name> <mac> <rssi>\`\` per unique device (strongest RSSI
    kept). Blocks for ~\`\`ms\`\` — call it on demand, not in a tight loop. Degrades
    to no output (returns \`\`[]\`\`) when \`\`bluetooth\`\` / the BLE radio is absent.
    """
    try:
        import bluetooth
    except ImportError:
        return []
    import time

    _IRQ_SCAN_RESULT = 5
    _IRQ_SCAN_DONE = 6
    found = {}        # addr bytes -> (rssi, adv payload bytes)
    done = [False]

    def _irq(event, data):
        # Scheduled (soft) callback, so small allocations are OK. Copy the addr +
        # payload (they're only valid during the call); keep the strongest RSSI.
        if event == _IRQ_SCAN_RESULT:
            addr_type, addr, adv_type, rssi, adv_data = data
            key = bytes(addr)
            prev = found.get(key)
            if prev is None or rssi > prev[0]:
                found[key] = (rssi, bytes(adv_data))
        elif event == _IRQ_SCAN_DONE:
            done[0] = True

    try:
        ble = bluetooth.BLE()
        ble.active(True)
        ble.irq(_irq)
        # gap_scan(duration_ms, interval_us, window_us, active=True): active scan
        # solicits scan responses so we get device names where advertised.
        ble.gap_scan(int(ms), 30000, 30000, True)
    except Exception:
        return []

    t0 = time.ticks_ms()
    while not done[0] and time.ticks_diff(time.ticks_ms(), t0) < int(ms) + 1500:
        time.sleep_ms(50)
    try:
        ble.gap_scan(None)  # stop scanning if it's still going
    except Exception:
        pass

    out = []
    for addr, (rssi, adv) in found.items():
        mac = ":".join("%02X" % b for b in addr)
        name = _decode_adv_name(adv) or "?"
        emit_bt(name, mac, rssi)
        out.append((name, mac, rssi))
    return out


def emit_bt(name, mac, rssi):
    """Emit one Bluetooth device result (use from your own BLE scan callback).

    Prints \`\`SNK BT <name> <mac> <rssi>\`\` (name spaces -> \`\`_\`\`).
    """
    print("%s BT %s %s %s" % (SENTINEL, _scr_token(name or "?"), mac or "?", rssi))


# ---------------------------------------------------------------------------
# Convenience read helpers — the only ones that touch hardware.
# ---------------------------------------------------------------------------

def read_adc(adc, ch="adc0"):
    """Read \`\`adc\`\` (a \`\`machine.ADC\`\`), emit a meter reading, and return volts.

    Converts the 16-bit \`\`read_u16()\`\` count to volts against a 3.3 V reference,
    \`\`meter\`\`s it on channel \`\`ch\`\` (unit \`\`V\`\`), and returns the volts so the
    caller can also use the value.
    """
    volts = adc.read_u16() / 65535 * 3.3
    meter(volts, ch=ch, unit="V")
    return volts


def read_pwm(pwm, ch="pwm"):
    """Read \`\`pwm\`\` (a \`\`machine.PWM\`\`) and emit a live PWM reading.

    Reads \`\`duty_u16()\`\` as a 0..1 fraction (\`\`/ 65535\`\`) plus \`\`freq()\`\` and
    prints \`\`SNK PWM <ch> <freq> <duty>\`\`. The Oscilloscope draws the idealised
    SQUARE WAVE at this duty/freq (animating as the duty changes) — a real PWM
    picture, not a raw value trace. Passive (friendly REPL), so it never
    interrupts a running loop. Returns the duty fraction.
    """
    duty = pwm.duty_u16() / 65535
    try:
        freq = pwm.freq()
    except Exception:
        freq = 0
    print("%s PWM %s %s %s" % (SENTINEL, ch, freq, duty))
    return duty


# ---------------------------------------------------------------------------
# Control channel — IDE -> board (write). Poll non-blockingly in your loop.
# ---------------------------------------------------------------------------

def parse_control_line(line):
    """Parse one \`\`SNKCMD <target> <payload>\`\` line -> \`\`(target, payload)\`\`.

    Returns \`\`None\`\` for a non-control / malformed line. \`\`payload\`\` is the rest
    of the line after the target (may be empty). Pure + side-effect-free so it is
    unit-testable under CPython.
    """
    if not line:
        return None
    line = line.strip()
    if line == CONTROL_SENTINEL or not line.startswith(CONTROL_SENTINEL + " "):
        return None
    rest = line[len(CONTROL_SENTINEL) + 1:].strip()
    if not rest:
        return None
    sp = rest.find(" ")
    if sp == -1:
        return (rest, "")
    return (rest[:sp], rest[sp + 1:].strip())


def parse_axes(payload):
    """Parse an \`\`axes=lx:0.5,ly:-0.2 …\`\` token out of \`\`payload\`\` -> a dict.

    Returns \`\`{name: float}\`\` for each \`\`name:value\`\` in the \`\`axes=\`\` token
    (bad numbers skipped). An absent \`\`axes=\`\` token yields \`\`{}\`\`. Pure.
    """
    out = {}
    if not payload:
        return out
    for tok in payload.split(" "):
        if not tok.startswith("axes="):
            continue
        for pair in tok[len("axes="):].split(","):
            if ":" not in pair:
                continue
            name, _, val = pair.partition(":")
            try:
                out[name] = float(val)
            except (ValueError, TypeError):
                pass
    return out


def parse_pressed(payload, btn):
    """Is \`\`btn:<btn>=1\`\` present in \`\`payload\`\`? Returns a bool. Pure."""
    if not payload:
        return False
    needle = "btn:%s=1" % btn
    for tok in payload.split(" "):
        if tok == needle:
            return True
    return False


class Control:
    """Non-blocking reader for the IDE -> board control channel (issue #115).

    Call :meth:\`poll\` once per loop iteration: it drains any pending \`\`SNKCMD\`\`
    lines from stdin WITHOUT blocking and stores the LATEST payload per target.
    Then read with :meth:\`get\` / :meth:\`axes\` / :meth:\`pressed\`. Designed to be
    safe inside \`\`while True:\`\` — it never blocks, never corrupts your own
    \`\`print()\`\` output, and degrades gracefully when stdin is not pollable
    (then it is simply inert until you feed it lines yourself via :meth:\`feed\`).
    """

    def __init__(self):
        self._latest = {}        # target -> latest payload string
        self._buf = ""           # partial trailing line between polls
        self._poll = None        # uselect.poll() over stdin, when available
        self._handlers = {}      # target -> callable(payload) registry
        self._last_beat = None   # ticks of the last SNK READY heartbeat
        self._setup_poll()

    def _setup_poll(self):
        """Wire up a non-blocking stdin poller if the platform supports one."""
        try:
            import uselect
            stream = getattr(sys.stdin, "buffer", sys.stdin)
            poller = uselect.poll()
            poller.register(stream, uselect.POLLIN)
            self._poll = (uselect, poller, stream)
        except Exception:
            # No uselect / un-pollable stdin (e.g. CPython host, USB CDC quirks):
            # stay inert; feed() can still drive it for tests / custom transports.
            self._poll = None

    def _read_available(self):
        """Return any bytes/str currently waiting on stdin, or '' (never blocks).

        Reads ONE byte at a time, gated by \`\`poll(0)\`\` each iteration. This is
        the critical bit on a Pico: \`\`stream.read(64)\`\` on USB-CDC stdin BLOCKS
        until 64 bytes arrive (there's no EOF), which would wedge the polling
        loop; \`\`read(1)\`\` after \`\`poll(0)\`\` confirms a byte is ready returns at
        once, so a burst is drained byte-by-byte without ever blocking.
        """
        if self._poll is None:
            return ""
        uselect, poller, stream = self._poll
        chunks = []
        while poller.poll(0):
            try:
                data = stream.read(1)
            except Exception:
                break
            if not data:
                break
            if isinstance(data, (bytes, bytearray)):
                data = data.decode("utf-8", "replace")
            chunks.append(data)
        return "".join(chunks)

    def feed(self, text):
        """Feed raw stdin \`\`text\`\` into the parser (used by :meth:\`poll\`/tests).

        Buffers a partial trailing line across calls; for each COMPLETE line it
        parses a \`\`SNKCMD\`\` and records the latest payload per target (firing any
        registered handler). Non-control lines are ignored. Never blocks/throws.
        """
        self._buf += text
        while True:
            nl = self._buf.find("\\n")
            if nl == -1:
                break
            line = self._buf[:nl]
            self._buf = self._buf[nl + 1:]
            parsed = parse_control_line(line)
            if parsed is None:
                continue
            target, payload = parsed
            self._latest[target] = payload
            handler = self._handlers.get(target)
            if handler is not None:
                try:
                    handler(payload)
                except Exception:
                    pass

    def poll(self):
        """Service the control channel: drain pending commands + heartbeat.

        Call once per main-loop iteration. It reads any waiting \`\`SNKCMD\`\` lines
        (non-blocking) AND emits a \`\`SNK READY\`\` heartbeat ~every 2 s so the IDE
        knows this program is alive and servicing control. Safe inside a tight
        \`\`while True:\`\` — it never blocks.
        """
        text = self._read_available()
        if text:
            self.feed(text)
        self._beat()

    def _beat(self):
        """Emit a \`\`SNK READY\`\` heartbeat ~every 2 s (the IDE's presence signal).

        Caps are the registered handler targets (\`\`scan:wifi\`\`, \`\`buzzer\`\`, …).
        Hidden from the console like all \`\`SNK …\`\` lines.
        """
        try:
            import time
            now = time.ticks_ms() if hasattr(time, "ticks_ms") else int(time.time() * 1000)
            if self._last_beat is not None:
                if hasattr(time, "ticks_diff"):
                    if time.ticks_diff(now, self._last_beat) < 2000:
                        return
                elif (now - self._last_beat) < 2000:
                    return
            self._last_beat = now
            print("%s READY %s" % (SENTINEL, " ".join(self._handlers)))
        except Exception:
            pass

    def get(self, target):
        """The latest payload string for \`\`target\`\`, or \`\`None\`\` if none yet."""
        return self._latest.get(target)

    def axes(self, target):
        """The parsed \`\`axes=…\`\` dict from \`\`target\`\`'s latest payload (\`\`{}\`\`)."""
        return parse_axes(self._latest.get(target))

    def pressed(self, target, btn):
        """Is button \`\`btn\`\` currently pressed in \`\`target\`\`'s latest payload?"""
        return parse_pressed(self._latest.get(target), btn)

    def on(self, target, handler):
        """Register \`\`handler(payload)\`\` to fire when \`\`target\`\` is updated.

        Handy for scan triggers (e.g. \`\`control.on('scan:i2c', do_scan)\`\`); the
        handler runs inside :meth:\`poll\` when a matching command arrives.
        """
        self._handlers[target] = handler


# The shared singleton most programs use: \`\`inst.control.poll()\`\` each loop.
control = Control()


# ---------------------------------------------------------------------------
# Background service — run the control channel + built-in scan triggers on the
# SECOND CORE, so a robot's main loop stays responsive while the IDE drives
# scans / teleop. Built on MicroPython's \`\`_thread\`\` (RP2040 runs it on core 1).
# ---------------------------------------------------------------------------

# What the board can do, announced to the IDE as \`\`SNK READY <caps...>\`\` so a
# panel knows a Snakie program is live (and which triggers it services).
READY_CAPS = ("scan:wifi", "scan:bt", "teleop", "led", "buzzer", "range", "screen", "servo", "servos", "watch")

_service_running = False


def _sleep_ms(ms):
    """Sleep \`\`ms\`\` milliseconds on MicroPython (\`\`sleep_ms\`\`) or CPython."""
    import time
    if hasattr(time, "sleep_ms"):
        time.sleep_ms(ms)
    else:
        time.sleep(ms / 1000.0)


def ready(extra=()):
    """Announce readiness to the IDE: \`\`SNK READY <caps...>\`\`.

    The IDE listens for this to know a Snakie program is running and servicing
    the control channel — so a SCAN button can drive it instead of asking you to
    run a program. \`\`extra\`\` adds capability tokens (e.g. \`\`scan:i2c\`\`).
    """
    caps = list(READY_CAPS) + list(extra)
    print("%s READY %s" % (SENTINEL, " ".join(caps)))


def start(i2c=None, buzzer_pin=None, range_trig=None, range_echo=None,
          screen_sda=None, screen_scl=None, screen_addr=0x3C,
          screen_sck=None, screen_mosi=None, screen_dc=None, screen_rst=None,
          screen_cs=None, screen_w=240, screen_h=240,
          servo_pin=None, background=False, hz=50):
    """Register the built-in control handlers + attach the buzzer, then announce.

    Then call \`\`control.poll()\`\` in your main loop to SERVICE commands — it drains
    the control channel non-blockingly AND emits the \`\`SNK READY\`\` heartbeat the
    IDE uses to detect a running program. Registers:

      * \`\`scan:wifi\`\` / \`\`scan:bt\`\` (and \`\`scan:i2c\`\` when you pass an \`\`i2c\`\` bus),
      * the \`\`buzzer\`\` receiver when you pass \`\`buzzer_pin\`\` — attaches the shared
        :data:\`buzzer\` to \`\`PWM(Pin(n))\`\` so the IDE's Buzzer panel can drive a
        speaker (\`\`tone\`\`/\`\`seq\`\`/\`\`stop\`\`/\`\`pin\`\`),
      * the \`\`range\`\` receiver when you pass BOTH \`\`range_trig\`\` and \`\`range_echo\`\` —
        attaches the shared :data:\`ranger\` to an HC-SR04 so the IDE's Range panel
        can retarget the wiring (\`\`pins <trig> <echo>\`\`); call \`\`inst.ranger.read()\`\`
        in your loop + \`\`inst.distance(mm)\`\` to feed the radar,
      * the \`\`screen\`\` receiver when you pass BOTH \`\`screen_sda\`\` and \`\`screen_scl\`\`
        — builds the shared :data:\`display\` on an I²C SSD1306 OLED so the IDE's
        Display panel can retarget the SDA/SCL pins + address and push text
        (\`\`pins <sda> <scl>\`\` / \`\`addr <0xNN>\`\` / \`\`text <row> …\`\`),
      * \`\`ping\`\` → an immediate \`\`SNK READY\`\` reply.

    The typical loop::

        inst.start(buzzer_pin=0)
        while True:
            inst.control.poll()
            time.sleep(0.02)

    \`\`background=True\`\` is EXPERIMENTAL: it spawns a second-core thread that polls
    for you, so the main loop needn't call \`\`control.poll()\`\`. It is UNRELIABLE on
    RP2040 — the thread shares stdin with the REPL, which can wedge the board on
    Stop / soft-reset — so it is OFF by default. Prefer main-loop polling above.
    """
    extra = ()
    control.on("scan:wifi", lambda payload: wifi_scan())
    control.on("scan:bt", lambda payload: bt_scan())
    if i2c is not None:
        control.on("scan:i2c", lambda payload: i2c_scan(i2c))
        extra = ("scan:i2c",)
    if buzzer_pin is not None:
        buzzer.set_pin(buzzer_pin)
        control.on("buzzer", lambda payload: buzzer_command(payload, buzzer))
    if range_trig is not None and range_echo is not None:
        ranger.set_pins(range_trig, range_echo)
        control.on("range", lambda payload: range_command(payload, ranger))
    # The \`screen\` receiver serves both an I²C SSD1306 (screen_sda/scl) and an
    # ST7789 SPI TFT (screen_sck/mosi/dc/rst). Pre-attach whichever bus was wired;
    # the panel can still retarget either at runtime (\`pins …\` / \`spi …\`).
    if screen_sda is not None and screen_scl is not None:
        display.set_pins(screen_sda, screen_scl, screen_addr)
        control.on("screen", lambda payload: screen_command(payload, display))
    elif screen_sck is not None and screen_mosi is not None:
        display.set_spi(screen_sck, screen_mosi, screen_dc, screen_rst, screen_cs,
                        screen_w, screen_h)
        control.on("screen", lambda payload: screen_command(payload, display))
    # The Servo panel attaches on the fly via \`pin <n>\`, so register it always;
    # pre-attach only if a servo_pin was given.
    if servo_pin is not None:
        servo.set_pin(servo_pin)
    control.on("servo", lambda payload: servo_command(payload, servo))
    # A Robot-View puppet slider drives many servos at once via \`servos\` (#416).
    control.on("servos", lambda payload: servos_command(payload))
    # \`watch\` drives whatever objects the user registered with inst.watch(...).
    control.on("watch", lambda payload: watch_command(payload, _watched))
    control.on("ping", lambda payload: ready(extra))
    ready(extra)
    if background:
        _start_thread(hz)


def _start_thread(hz):
    """EXPERIMENTAL: poll the control channel on the second core (see \`\`start\`\`)."""
    global _service_running
    if _service_running:
        return
    try:
        import _thread
    except ImportError:
        return  # no second core here — call control.poll() in your own loop
    _service_running = True
    _thread.start_new_thread(_service_loop, (hz,))


def _service_loop(hz):
    """Core-1 loop: just poll() (which drains commands + heartbeats) until stop()."""
    delay = max(1, int(1000 / hz)) if hz else 20
    while _service_running:
        try:
            control.poll()
        except Exception:
            pass
        _sleep_ms(delay)
        _sleep_ms(delay)


def stop():
    """Stop the background service + silence the buzzer.

    Sets the run flag false (the core-1 thread exits on its next tick) and aborts
    any in-progress buzzer sequence. Safe to call from the main loop's
    \`\`KeyboardInterrupt\`\` handler so Snakie's Stop button leaves the board quiet
    and the REPL usable.
    """
    global _service_running
    _service_running = False
    try:
        buzzer.stop()
    except Exception:
        pass


# ---------------------------------------------------------------------------
# Receiver helpers — thin actuators driven by the control channel. The protocol
# (the SNKCMD payload grammar) is the deliverable; actuation is minimal/illustrative
# and guards its hardware import so the module still imports under CPython.
# ---------------------------------------------------------------------------

def teleop(target="teleop", ctrl=None):
    """Return \`\`(axes, buttons_payload)\`\` for \`\`target\`\` from the control channel.

    \`\`axes\`\` is the parsed \`\`{name: float}\`\` dict; the raw payload (for custom
    button checks via \`\`ctrl.pressed\`\`) is the latest string. A thin convenience
    over :meth:\`Control.axes\` so a robot loop reads its joystick in one call.
    """
    ctrl = ctrl or control
    return ctrl.axes(target), ctrl.get(target)


class Buzzer:
    """Drive a passive buzzer/speaker from \`\`buzzer\`\` control commands.

    \`\`tone(freq, ms)\`\` plays a single tone; \`\`play_seq(pairs)\`\` plays a list of
    \`\`(freq, ms)\`\` notes in order (\`\`freq\`\` 0 = a silent rest); \`\`stop()\`\`
    silences immediately; \`\`set_pin(n)\`\` (re)targets the PWM pin. Pass a
    \`\`machine.PWM\`\` as \`\`pwm\`\` to actually sound, or build one with \`\`set_pin\`\`;
    with no PWM every call is a no-op (still importable + testable under CPython).

    The IDE pre-parses melodies/RTTTL and sends a compact \`\`seq\`\` note list, so
    the board needs no RTTTL parser. \`\`play(rtttl)\`\` is kept as a thin legacy hook.
    """

    def __init__(self, pwm=None):
        self._pwm = pwm
        # Set by stop() (possibly from the OTHER core) to abort an in-progress
        # play_seq between notes — so Snakie's Stop silences a long melody at once.
        self._abort = False
        # PWM duty (0..65535) used while a note sounds — the IDE's VOLUME slider
        # sets it via the \`vol\` command (set_volume); 32768 = 50% by default.
        self._duty = 32768

    def set_volume(self, level):
        """Set the sounding duty from a 0..1 \`\`level\`\` (the IDE VOLUME slider)."""
        try:
            self._duty = max(0, min(65535, int(float(level) * 65535)))
        except (ValueError, TypeError):
            pass

    def set_pin(self, n):
        """(Re)target the PWM pin: build \`\`PWM(Pin(n))\`\` (no-op without hardware).

        Silences any current tone first. Guards the \`\`machine\`\` import so the
        module stays importable/testable under CPython — when \`\`machine\`\` is
        unavailable this is inert and \`\`_pwm\`\` is left as-is.
        """
        self.stop()
        try:
            from machine import Pin, PWM
        except ImportError:
            return
        self._pwm = PWM(Pin(int(n)))

    def tone(self, freq, ms=200):
        """Sound \`\`freq\`\` Hz for \`\`ms\`\` (no-op without a PWM pin)."""
        if self._pwm is None:
            return
        import time
        self._pwm.freq(int(freq))
        self._pwm.duty_u16(self._duty)
        time.sleep_ms(int(ms)) if hasattr(time, "sleep_ms") else time.sleep(ms / 1000)
        self._pwm.duty_u16(0)

    def stop(self):
        """Silence the buzzer NOW (duty 0) and abort any running sequence.

        Safe without a PWM pin, and safe to call from the OTHER core (it only
        flips a flag + zeroes the duty), so the main loop's Ctrl-C handler can
        cut a melody that's mid-play on the service core.
        """
        self._abort = True
        if self._pwm is not None:
            self._pwm.duty_u16(0)

    def play_seq(self, pairs):
        """Play a list of \`\`(freq, ms)\`\` notes in order; \`\`freq\`\` 0 is a rest.

        Blocking (runs on core 1 in the background service): for each note it
        sets the frequency + duty and sleeps \`\`ms\`\`, then briefly silences before
        the next so adjacent same-pitch notes are distinct. A \`\`freq\`\` of 0 sleeps
        silently for \`\`ms\`\`. No-op without a PWM pin.
        """
        if self._pwm is None:
            return
        import time
        sleep_ms = time.sleep_ms if hasattr(time, "sleep_ms") else (
            lambda ms: time.sleep(ms / 1000)
        )
        self._abort = False
        for freq, ms in pairs:
            if self._abort:  # stop() was called (maybe from the other core)
                break
            freq = int(freq)
            ms = int(ms)
            if freq > 0:
                self._pwm.freq(freq)
                self._pwm.duty_u16(self._duty)
            else:
                self._pwm.duty_u16(0)
            sleep_ms(ms)
            self._pwm.duty_u16(0)
            sleep_ms(20)

    def play(self, rtttl):
        """Play an RTTTL string (legacy hook — the IDE prefers \`\`seq\`\`).

        Left minimal on purpose: the IDE pre-parses RTTTL and sends a \`\`seq\`\`
        note list, so a real RTTTL parser on-board is optional. Returns the input.
        """
        return rtttl


def parse_seq(payload):
    """Parse a \`\`seq\`\` payload (\`\`<freq:ms>,<freq:ms>,…\`\`) → \`\`[(freq, ms), …]\`\`.

    Each pair is \`\`freq:ms\`\` (\`\`freq\`\` 0 = a rest). Whitespace and malformed pairs
    are tolerated/skipped. Pure + side-effect-free so it is unit-testable under
    CPython. \`\`parse_seq("440:200,0:100")\`\` → \`\`[(440, 200), (0, 100)]\`\`.
    """
    out = []
    if not payload:
        return out
    for tok in payload.replace(" ", "").split(","):
        if not tok or ":" not in tok:
            continue
        fs, _, ds = tok.partition(":")
        try:
            out.append((int(fs), int(ds)))
        except (ValueError, TypeError):
            continue
    return out


def buzzer_command(payload, buz=None):
    """Drive \`\`buz\`\` (a :class:\`Buzzer\`) from one \`\`buzzer\`\` control payload.

    Parses the \`\`<verb> <args>\`\` grammar and actuates:

      * \`\`tone <freq> <ms>\`\` → \`\`buz.tone(freq, ms)\`\`
      * \`\`seq <freq:ms>,…\`\`  → \`\`buz.play_seq([...])\`\` (\`\`freq\`\` 0 = rest)
      * \`\`stop\`\`             → \`\`buz.stop()\`\`
      * \`\`pin <n>\`\`          → \`\`buz.set_pin(n)\`\`
      * \`\`vol <0..1>\`\`       → \`\`buz.set_volume(level)\`\` (PWM duty)

    Defaults \`\`buz\`\` to the shared :data:\`buzzer\` singleton. Never raises on a
    malformed payload (it is fed from the IDE). Returns the verb it handled (or
    \`\`None\`\`), which keeps it easy to unit-test against a fake PWM.
    """
    buz = buz if buz is not None else buzzer
    if not payload:
        return None
    payload = payload.strip()
    sp = payload.find(" ")
    if sp == -1:
        verb, args = payload, ""
    else:
        verb, args = payload[:sp], payload[sp + 1:].strip()
    try:
        if verb == "tone":
            parts = args.split()
            freq = int(parts[0]) if len(parts) >= 1 else 0
            ms = int(parts[1]) if len(parts) >= 2 else 200
            buz.tone(freq, ms)
        elif verb == "seq":
            buz.play_seq(parse_seq(args))
        elif verb == "stop":
            buz.stop()
        elif verb == "pin":
            buz.set_pin(int(args.split()[0]))
        elif verb == "vol":
            buz.set_volume(float(args.split()[0]))
        else:
            return None
    except (ValueError, IndexError, TypeError):
        return None
    return verb


def _us_to_mm(us):
    """Convert an HC-SR04 echo pulse width (µs) to a distance in mm.

    Sound travels ~343 m/s ≈ 0.343 mm/µs; the echo pulse times the round trip
    (out + back), so halve it: \`\`0.343 / 2 = 0.1715\`\` mm per µs. Pure + integer
    result so it is cheap to call in a loop and easy to unit-test under CPython.
    """
    return int(us * 0.1715)


class Rangefinder:
    """Read an HC-SR04 ultrasonic distance sensor from \`\`range\`\` control commands.

    Two pins: \`\`trig\`\` (an OUTPUT the board pulses ~10 µs high to fire a ping) and
    \`\`echo\`\` (an INPUT that goes high for the round-trip flight time). \`\`read()\`\`
    fires a ping and times the echo with \`\`machine.time_pulse_us\`\`, returning the
    distance in **mm** (or \`\`None\`\` on a timeout / no pins). \`\`set_pins(trig, echo)\`\`
    (re)targets the wiring; the IDE's Range panel sends \`\`range pins <trig> <echo>\`\`
    when its TRIG/ECHO selectors change. Guards the \`\`machine\`\` import so the module
    stays importable/testable under CPython — with no hardware \`\`read()\`\` returns
    \`\`None\`\` and every call is a safe no-op.
    """

    def __init__(self, trig=None, echo=None):
        self._trig = None
        self._echo = None
        if trig is not None and echo is not None:
            self.set_pins(trig, echo)

    def set_pins(self, trig, echo):
        """(Re)target the trig (OUT) + echo (IN) pins; idle trig low.

        Builds \`\`Pin(int(trig), Pin.OUT)\`\` + \`\`Pin(int(echo), Pin.IN)\`\` and drops
        trig low so the next \`\`read()\`\` starts from a clean state. Guards the
        \`\`machine\`\` import so the module stays importable under CPython — when
        \`\`machine\`\` is unavailable this is inert and the pins are left as-is.
        """
        try:
            from machine import Pin
        except ImportError:
            return
        self._trig = Pin(int(trig), Pin.OUT)
        self._echo = Pin(int(echo), Pin.IN)
        self._trig.value(0)

    def read(self):
        """Fire one ping and return the distance in mm, or \`\`None\`\`.

        Pulses trig high ~10 µs to launch a burst, then times the echo pulse with
        \`\`machine.time_pulse_us(echo, 1, 30000)\`\` (a 30 ms ≈ 5 m timeout). Returns
        \`\`None\`\` when there are no pins, \`\`machine\`\` is unavailable, or the pulse
        times out (\`\`time_pulse_us\`\` returns a negative value); otherwise converts
        the round-trip µs to mm via :func:\`_us_to_mm\`. Safe to call in a loop.
        """
        if self._trig is None or self._echo is None:
            return None
        try:
            import machine
            import time
        except ImportError:
            return None
        self._trig.value(0)
        time.sleep_us(2) if hasattr(time, "sleep_us") else time.sleep(0.000002)
        self._trig.value(1)
        time.sleep_us(10) if hasattr(time, "sleep_us") else time.sleep(0.00001)
        self._trig.value(0)
        try:
            dur = machine.time_pulse_us(self._echo, 1, 30000)
        except Exception:
            return None
        if dur < 0:
            return None
        return _us_to_mm(dur)


def range_command(payload, rf=None):
    """Drive \`\`rf\`\` (a :class:\`Rangefinder\`) from one \`\`range\`\` control payload.

    Parses the \`\`<verb> <args>\`\` grammar and actuates:

      * \`\`pins <trig> <echo>\`\` → \`\`rf.set_pins(trig, echo)\`\` (retarget the wiring)

    Defaults \`\`rf\`\` to the shared :data:\`ranger\` singleton. Never raises on a
    malformed payload (it is fed from the IDE). Returns the verb it handled (or
    \`\`None\`\`), which keeps it easy to unit-test against a fake/real Rangefinder.
    """
    rf = rf if rf is not None else ranger
    if not payload:
        return None
    payload = payload.strip()
    sp = payload.find(" ")
    if sp == -1:
        verb, args = payload, ""
    else:
        verb, args = payload[:sp], payload[sp + 1:].strip()
    try:
        if verb == "pins":
            parts = args.split()
            rf.set_pins(int(parts[0]), int(parts[1]))
        else:
            return None
    except (ValueError, IndexError, TypeError):
        return None
    return verb


class Led:
    """Drive an LED (on/off, PWM brightness, or RGB) from \`\`led\`\` commands.

    \`\`set(on)\`\` toggles a digital pin; \`\`pwm(level)\`\` sets 0..1 brightness on a
    PWM pin; \`\`rgb(r,g,b)\`\` sets three 0..255 channels. Construct with whichever
    of \`\`pin\`\` (digital), \`\`pwm\`\` (single PWM), or \`\`rgb\`\` (3-tuple of PWMs) you
    have; missing hardware -> the matching call is a no-op.
    """

    def __init__(self, pin=None, pwm=None, rgb=None):
        self._pin = pin
        self._pwm = pwm
        self._rgb = rgb

    def set(self, on):
        """Turn the digital LED on/off (no-op without a pin)."""
        if self._pin is not None:
            self._pin.value(1 if on else 0)

    def pwm(self, level):
        """Set 0..1 brightness on the PWM LED (no-op without a PWM pin)."""
        if self._pwm is not None:
            level = max(0.0, min(1.0, float(level)))
            self._pwm.duty_u16(int(level * 65535))

    def rgb(self, r, g, b):
        """Set an RGB LED's 0..255 channels (no-op without 3 PWMs)."""
        if self._rgb is not None:
            chans = (r, g, b)
            for pwm, val in zip(self._rgb, chans):
                pwm.duty_u16(int(max(0, min(255, int(val))) / 255 * 65535))


class Screen:
    """Drive a text display from \`\`screen\`\` commands + echo to the IDE.

    \`\`text(lines, addr=...)\`\` both pushes the rows to an attached \`\`display\`\`
    (anything with a \`\`.text\`\`/\`\`.show\`\` API, optional) AND emits a
    \`\`SNK SCR … text …\`\` telemetry line so the IDE mirrors it. With no display
    attached it is purely the telemetry echo.
    """

    def __init__(self, display=None, addr="0x3C"):
        self._display = display
        self._addr = addr

    def text(self, lines, addr=None):
        """Show + echo \`\`lines\`\` (an iterable of row strings)."""
        addr = addr or self._addr
        rows = list(lines)
        disp = self._display
        if disp is not None and hasattr(disp, "text") and hasattr(disp, "show"):
            try:
                disp.fill(0)
                for i, row in enumerate(rows):
                    disp.text(str(row), 0, i * 10)
                disp.show()
            except Exception:
                pass
        screen(rows, addr=addr)


# ---------------------------------------------------------------------------
# I²C display (SSD1306 OLED) — pin mux + a real driver + the \`screen\` receiver.
# ---------------------------------------------------------------------------

# The RP2040 (Pico) I²C pin mux: each block exposes SDA/SCL on a fixed set of
# GPIOs. A pair is valid iff BOTH pins belong to the SAME block (SDA from its SDA
# set AND SCL from its SCL set). These tables back :func:\`_i2c_block_for_pins\` and
# the IDE's invalid-pin warning, so keep them in lock-step with the panel's mux.
_I2C0_SDA = (0, 4, 8, 12, 16, 20)
_I2C0_SCL = (1, 5, 9, 13, 17, 21)
_I2C1_SDA = (2, 6, 10, 14, 18, 26)
_I2C1_SCL = (3, 7, 11, 15, 19, 27)


def _i2c_block_for_pins(sda, scl):
    """Return the RP2040 I²C block (0 or 1) a \`\`(sda, scl)\`\` pair selects, or None.

    A pair is valid only when both pins live in the SAME block's SDA/SCL sets
    (see the mux tables above): block 0 wants SDA∈{0,4,8,12,16,20} & SCL∈{1,5,9,
    13,17,21}; block 1 wants SDA∈{2,6,10,14,18,26} & SCL∈{3,7,11,15,19,27}. Any
    cross-block pair or an unknown pin yields \`\`None\`\` (the IDE then warns and the
    driver falls back to block 0). Pure + side-effect-free for unit tests.
    """
    try:
        sda = int(sda)
        scl = int(scl)
    except (TypeError, ValueError):
        return None
    if sda in _I2C0_SDA and scl in _I2C0_SCL:
        return 0
    if sda in _I2C1_SDA and scl in _I2C1_SCL:
        return 1
    return None


# The RP2040 SPI pin mux: each block drives SCK/MOSI(TX) on a fixed set of GPIOs.
# A pair is valid iff both pins live in the SAME block. Backs :func:\`_spi_block_for_pins\`
# and the IDE's ST7789 invalid-pin warning (kept in lock-step with the panel's mux).
_SPI0_SCK = (2, 6, 18, 22)
_SPI0_TX = (3, 7, 19, 23)
_SPI1_SCK = (10, 14, 26)
_SPI1_TX = (11, 15, 27)


def _spi_block_for_pins(sck, mosi):
    """Return the RP2040 SPI block (0 or 1) a \`\`(sck, mosi)\`\` pair selects, or None.

    Valid only when both pins live in the SAME block's SCK/TX sets: block 0 wants
    SCK∈{2,6,18,22} & MOSI∈{3,7,19,23}; block 1 wants SCK∈{10,14,26} & MOSI∈{11,15,
    27}. Any cross-block pair or unknown pin yields \`\`None\`\` (the IDE warns and the
    driver falls back to block 0). Pure + side-effect-free for unit tests.
    """
    try:
        sck = int(sck)
        mosi = int(mosi)
    except (TypeError, ValueError):
        return None
    if sck in _SPI0_SCK and mosi in _SPI0_TX:
        return 0
    if sck in _SPI1_SCK and mosi in _SPI1_TX:
        return 1
    return None


# The standard SSD1306 init sequence (matches the canonical MicroPython driver).
_SSD1306_INIT = (
    0xAE, 0x20, 0x00, 0x40, 0xA1, 0xA8, 0x3F, 0xC8, 0xD3, 0x00,
    0xDA, 0x12, 0xD5, 0x80, 0xD9, 0xF1, 0xDB, 0x20, 0x81, 0xFF,
    0xA4, 0xA6, 0x8D, 0x14, 0xAF,
)


class _SSD1306:
    """A minimal bundled SSD1306 I²C OLED driver (fallback for no \`\`ssd1306\`\`).

    Uses \`\`framebuf\`\` (MONO_VLSB, the SSD1306 page format) for \`\`fill\`\`/\`\`text\`\`
    and pushes the buffer with \`\`i2c.writeto\`\` in the standard init + addressing
    sequence. Built ONLY when both \`\`framebuf\`\` and a working \`\`machine.I2C\`\` are
    present (guarded by the caller), so the module still imports under CPython.
    """

    def __init__(self, w, h, i2c, addr=0x3C):
        import framebuf
        self.w = w
        self.h = h
        self._i2c = i2c
        self._addr = addr
        self._buf = bytearray((h // 8) * w)
        self._fb = framebuf.FrameBuffer(self._buf, w, h, framebuf.MONO_VLSB)
        for cmd in _SSD1306_INIT:
            self._cmd(cmd)
        self.fill(0)
        self.show()

    def _cmd(self, c):
        self._i2c.writeto(self._addr, bytes((0x80, c)))

    def fill(self, c):
        self._fb.fill(c)

    def text(self, s, x, y, c=1):
        self._fb.text(s, x, y, c)

    def show(self):
        # Window the column/page address to the full panel, then stream the buffer.
        for c in (0x21, 0, self.w - 1, 0x22, 0, (self.h // 8) - 1):
            self._cmd(c)
        self._i2c.writeto(self._addr, b"\\x40" + self._buf)


# ST7789 colour TFT (SPI) — the RAM offset per common panel size, so the address
# window lands on the visible area (ST7789 RAM is 240×320; smaller/rotated panels
# sit at an offset). Keyed by (w, h); unknown sizes fall back to (0, 0).
_ST7789_OFFSETS = {
    (240, 240): (0, 0),
    (240, 320): (0, 0),
    (135, 240): (52, 40),
    (170, 320): (35, 0),
}


# Band height (rows) for the ST7789's chunked renderer. A small reusable strip
# buffer (w × this × 2 bytes ≈ 7.7 KB at 240 px wide) means we NEVER need a
# contiguous full-screen framebuffer — a 240×320 RGB565 frame is ~150 KB and fails
# to allocate on a Pico once a program + this library are loaded (issue: the panel
# looked dead because set_spi swallowed that MemoryError → telemetry-only).
_ST7789_BAND = 16


class _ST7789:
    """A minimal bundled ST7789 SPI TFT driver (no external driver needed).

    Exposes the SAME \`\`fill\`\`/\`\`text\`\`/\`\`show\`\` interface as :class:\`_SSD1306\` so
    :class:\`Display\` drives either transparently — but renders the screen in narrow
    horizontal BANDS through ONE small reusable \`\`framebuf\`\` strip (\`\`w\`\` ×
    :data:\`_ST7789_BAND\` px) instead of a full-screen buffer. The big buffer failed
    to allocate on a Pico once a user program was loaded, so the panel stayed dark;
    the band renderer is what makes it actually light up on real hardware.

    \`\`fill\`\`/\`\`text\`\` just RECORD the intent (a background colour + a list of text
    ops); \`\`show\`\` paints every band from that record. Text is the framebuf 8×8 font
    in white on black. Built ONLY when \`\`framebuf\`\` + \`\`machine\`\` are present.

    NOTE: intentionally illustrative — one text colour, one font, per-size offsets
    for the common panels; \`\`rst\`\` may be \`\`< 0\`\` for boards with NO reset GPIO
    (e.g. the Pimoroni Pico Explorer/Display, whose backlight is hard-wired on and
    whose GP20/21 are I²C). Odd variants may need a different offset/rotation —
    install a dedicated ST7789 driver for full control (mirror + push work either way).
    """

    def __init__(self, spi, dc, cs, rst, w, h):
        import framebuf
        from machine import Pin
        self.w = w
        self.h = h
        self._spi = spi
        self._dc = Pin(int(dc), Pin.OUT)
        self._cs = Pin(int(cs), Pin.OUT) if cs is not None and int(cs) >= 0 else None
        self._rst = Pin(int(rst), Pin.OUT) if rst is not None and int(rst) >= 0 else None
        self._xoff, self._yoff = _ST7789_OFFSETS.get((w, h), (0, 0))
        self._fill = 0x0000          # recorded background colour
        self._ops = []               # recorded (text, x, y, colour) draw ops
        # ONE reusable strip buffer (w × _ST7789_BAND px) — never a full frame.
        self._bandh = _ST7789_BAND
        self._buf = bytearray(w * self._bandh * 2)
        self._fb = framebuf.FrameBuffer(self._buf, w, self._bandh, framebuf.RGB565)
        self._mv = memoryview(self._buf)
        self._reset()
        self._init()
        self.fill(0)
        self.show()

    def _cs_low(self):
        if self._cs is not None:
            self._cs.value(0)

    def _cs_high(self):
        if self._cs is not None:
            self._cs.value(1)

    def _reset(self):
        import time
        if self._rst is not None:
            self._rst.value(1); time.sleep_ms(10)
            self._rst.value(0); time.sleep_ms(10)
            self._rst.value(1); time.sleep_ms(120)

    def _cmd(self, c, data=None):
        self._cs_low()
        self._dc.value(0)
        self._spi.write(bytes((c,)))
        if data is not None:
            self._dc.value(1)
            self._spi.write(bytes(data))
        self._cs_high()

    def _init(self):
        import time
        self._cmd(0x01)              # SWRESET (software — works with no reset GPIO)
        time.sleep_ms(150)
        self._cmd(0x11)              # SLPOUT
        time.sleep_ms(120)
        self._cmd(0x3A, (0x55,))     # COLMOD: 16-bit/px (RGB565)
        self._cmd(0x36, (0x00,))     # MADCTL: row/col order
        self._cmd(0x21)              # INVON — ST7789 needs inversion for true colour
        self._cmd(0x13)              # NORON
        self._cmd(0x29)              # DISPON
        time.sleep_ms(50)

    def fill(self, c):
        # Record the background (0 → black, non-zero → white) + clear text ops.
        self._fill = 0xFFFF if c else 0x0000
        self._ops = []

    def text(self, s, x, y, c=1):
        # Record a text op; show() paints it into whichever band(s) it lands in.
        self._ops.append((s, x, y, 0xFFFF if c else 0x0000))

    def _paint_band(self, top, rows):
        # Address-window this band (offset for smaller panels), then stream its strip.
        x1 = self._xoff + self.w - 1
        y0 = self._yoff + top
        y1 = self._yoff + top + rows - 1
        self._cmd(0x2A, (self._xoff >> 8, self._xoff & 0xFF, x1 >> 8, x1 & 0xFF))  # CASET
        self._cmd(0x2B, (y0 >> 8, y0 & 0xFF, y1 >> 8, y1 & 0xFF))                  # RASET
        self._cs_low()
        self._dc.value(0)
        self._spi.write(bytes((0x2C,)))  # RAMWR
        self._dc.value(1)
        self._spi.write(self._mv[: self.w * rows * 2])
        self._cs_high()

    def show(self):
        # Paint the whole panel band-by-band from the recorded fill + text ops.
        for top in range(0, self.h, self._bandh):
            rows = self._bandh if top + self._bandh <= self.h else self.h - top
            self._fb.fill(self._fill)
            for s, x, y, col in self._ops:
                self._fb.text(s, x, y - top, col)  # framebuf clips out-of-band rows
            self._paint_band(top, rows)


class Display:
    """Drive a real I²C SSD1306 OLED from \`\`screen\`\` commands + echo to the IDE.

    \`\`set_pins(sda, scl, addr=0x3C, w=128, h=64)\`\` derives the RP2040 I²C block
    from the pins (via :func:\`_i2c_block_for_pins\`, block 0 if the pair is invalid
    — the IDE warns), builds \`\`I2C(block, sda=Pin(sda), scl=Pin(scl))\`\`, then a
    panel: the installed \`\`ssd1306.SSD1306_I2C\`\` if present, else the bundled
    :class:\`_SSD1306\`. \`\`text(lines)\`\` draws each row (\`\`y = i*10\`\`) on the real
    panel AND emits a \`\`SNK SCR <addr> text …\`\` line so the IDE mirrors it.

    Every hardware import is guarded so the module stays importable/testable under
    CPython — with no \`\`machine\`\`/\`\`framebuf\`\` \`\`set_pins\`\` is inert (no panel) and
    \`\`text\`\` is purely the telemetry echo (exactly like the legacy :class:\`Screen\`).
    """

    def __init__(self, addr="0x3C"):
        self._i2c = None
        self._oled = None
        self._addr = addr  # the bus-address LABEL for the SCR echo (e.g. "0x3C")

    def set_pins(self, sda, scl, addr=0x3C, w=128, h=64):
        """(Re)build the I²C bus + the SSD1306 panel on \`\`sda\`\`/\`\`scl\`\`.

        Derives the I²C block from the pins (block 0 when the pair is invalid).
        Prefers an installed \`\`ssd1306\`\` driver, falling back to the bundled
        :class:\`_SSD1306\`. Guards every hardware import so it is inert under
        CPython (the panel is left unbuilt; \`\`text\`\` still echoes telemetry).
        """
        self._addr = "0x%02X" % int(addr) if isinstance(addr, int) else str(addr)
        block = _i2c_block_for_pins(sda, scl)
        if block is None:
            block = 0  # invalid pair → fall back to block 0 (the IDE warns)
        try:
            from machine import Pin, I2C
        except ImportError:
            return  # no hardware (CPython) — inert; text() still echoes telemetry
        self._i2c = I2C(block, sda=Pin(int(sda)), scl=Pin(int(scl)))
        try:
            import ssd1306
            self._oled = ssd1306.SSD1306_I2C(w, h, self._i2c, int(addr))
            return
        except Exception:
            pass
        try:
            self._oled = _SSD1306(w, h, self._i2c, int(addr))
        except Exception:
            self._oled = None  # no framebuf / panel — telemetry-only

    def set_spi(self, sck, mosi, dc, rst, cs, w=240, h=240):
        """(Re)build an ST7789 colour TFT on an SPI bus (issue: SPI displays).

        Derives the SPI block from \`\`sck\`\`/\`\`mosi\`\` (block 0 when invalid — the IDE
        warns), builds \`\`SPI(block, sck=Pin(sck), mosi=Pin(mosi))\`\` at 30 MHz, then
        the bundled :class:\`_ST7789\` on \`\`dc\`\`/\`\`rst\`\`/\`\`cs\`\` at \`\`w\`\`×\`\`h\`\`. \`\`cs\`\`
        may be \`\`None\`\` / \`\`< 0\`\` (tied low, no CS pin). The echo label becomes
        \`\`st7789\`\` so the IDE's mirror tags the source. Guards every hardware import
        (inert under CPython — the panel stays unbuilt; \`\`text\`\` still echoes
        telemetry); a buffer too big for RAM falls back to telemetry-only.
        """
        self._addr = "st7789"  # single-token label for the SNK SCR echo
        block = _spi_block_for_pins(sck, mosi)
        if block is None:
            block = 0  # invalid pair → block 0 (the IDE warns)
        cs_pin = None if cs is None or int(cs) < 0 else int(cs)
        try:
            from machine import Pin, SPI
        except ImportError:
            self._oled = None
            return  # no hardware (CPython) — inert; text() still echoes telemetry
        try:
            spi = SPI(block, baudrate=30_000_000, sck=Pin(int(sck)), mosi=Pin(int(mosi)))
            self._oled = _ST7789(spi, dc, cs_pin if cs_pin is not None else -1, rst, int(w), int(h))
        except Exception:
            self._oled = None  # no framebuf / not enough RAM — telemetry-only

    def set_addr(self, addr):
        """Set the bus-address label used in the \`\`SNK SCR\`\` echo (e.g. \`\`0x3D\`\`)."""
        self._addr = "0x%02X" % int(addr) if isinstance(addr, int) else str(addr)

    def text(self, lines):
        """Draw + echo \`\`lines\`\` (an iterable of row strings).

        Renders each row at \`\`y = i*10\`\` on the real SSD1306 (\`\`fill(0)\`\` →
        \`\`text\`\` per row → \`\`show\`\`) when a panel is attached, then ALWAYS emits a
        \`\`SNK SCR <addr> text …\`\` line so the IDE mirrors it. No-op on the panel
        without hardware; never raises.
        """
        rows = list(lines)
        oled = self._oled
        if oled is not None:
            try:
                oled.fill(0)
                for i, row in enumerate(rows):
                    oled.text(str(row), 0, i * 10)
                oled.show()
            except Exception:
                pass
        screen(rows, addr=self._addr)


def screen_command(payload, disp=None):
    """Drive \`\`disp\`\` (a :class:\`Display\`) from one \`\`screen\`\` control payload.

    Parses the \`\`<verb> <args>\`\` grammar and actuates:

      * \`\`pins <sda> <scl>\`\` → \`\`disp.set_pins(sda, scl)\`\` (retarget the I²C bus)
      * \`\`addr <0xNN>\`\`      → \`\`disp.set_addr(addr)\`\` (the SCR echo address)
      * \`\`text <row> [<row> …]\`\` → \`\`disp.text(rows)\`\` (each row is \`\`_\`\`-encoded ↔
        spaces, matching the \`\`SNK SCR text\`\` packing)

    Defaults \`\`disp\`\` to the shared :data:\`display\` singleton. Never raises on a
    malformed payload (it is fed from the IDE). Returns the verb it handled (or
    \`\`None\`\`), which keeps it easy to unit-test against a fake/real Display.
    """
    disp = disp if disp is not None else display
    if not payload:
        return None
    payload = payload.strip()
    sp = payload.find(" ")
    if sp == -1:
        verb, args = payload, ""
    else:
        verb, args = payload[:sp], payload[sp + 1:].strip()
    try:
        if verb == "pins":
            parts = args.split()
            disp.set_pins(int(parts[0]), int(parts[1]))
        elif verb == "spi":
            # spi <sck> <mosi> <dc> <rst> <cs> <w> <h> — retarget an ST7789 TFT.
            # cs may be -1 (tied). w/h default to 240 when omitted.
            p = args.split()
            cs = int(p[4]) if len(p) > 4 else -1
            w = int(p[5]) if len(p) > 5 else 240
            h = int(p[6]) if len(p) > 6 else 240
            disp.set_spi(int(p[0]), int(p[1]), int(p[2]), int(p[3]), cs, w, h)
        elif verb == "addr":
            if not args:
                return None
            disp.set_addr(int(args, 0) if args[:2].lower() == "0x" else int(args))
        elif verb == "text":
            rows = [tok.replace("_", " ") for tok in args.split(" ")] if args else []
            disp.text(rows)
        else:
            return None
    except (ValueError, IndexError, TypeError):
        return None
    return verb


class Servo:
    """Drive a hobby servo (SG90 etc.) from \`\`servo\`\` control commands.

    \`\`angle(deg)\`\` moves to an angle (0..180); \`\`set_pin(n)\`\` (re)attaches the PWM
    at 50 Hz; \`\`detach()\`\` releases it. Pass a \`\`machine.PWM\`\` as \`\`pwm\`\` to move
    real hardware, or build one with \`\`set_pin\`\` — with no PWM every call is a
    no-op (still importable + testable under CPython). Each \`\`angle\`\` also emits
    \`\`SNK PWM servo <freq> <duty>\`\` so the IDE Servo panel shows the position.
    """

    def __init__(self, pwm=None, freq=50, min_us=500, max_us=2500, pin=None):
        self._pwm = pwm
        self._freq = freq
        self._period_us = 1000000 // freq
        self.min_us = min_us
        self.max_us = max_us
        self.angle_deg = 90
        # The GPIO number, when known — emitted as pin-keyed SERVO telemetry so
        # Robot View can drive the mapped URDF joint (#313). Set here works even
        # with no \`\`machine\`\` (the simulator), so headless robots still animate.
        self.pin = None
        if pwm is not None:
            # A hand-built \`\`PWM(Pin(n))\`\` may not be at the servo frequency — set
            # it so \`\`Servo(PWM(Pin(n)))\`\` from generated code works electrically.
            try:
                pwm.freq(freq)
            except Exception:  # noqa: BLE001 - a fake/odd PWM without freq() is fine
                pass
            # \`\`Servo(pwm, pin=n)\`\` remembers the GPIO for SNK SERVO telemetry.
            if pin is not None:
                self.pin = int(pin)
        elif pin is not None:
            self.set_pin(pin)  # build the PWM from the pin

    def set_pin(self, n):
        """(Re)target the PWM pin: build \`\`PWM(Pin(n))\`\` at 50 Hz (no-op w/o hw)."""
        self.pin = int(n)  # remembered regardless of hardware, for SERVO telemetry
        try:
            from machine import Pin, PWM
        except ImportError:
            return
        self._pwm = PWM(Pin(int(n)))
        self._pwm.freq(self._freq)

    def _us(self, deg):
        deg = 0 if deg < 0 else 180 if deg > 180 else deg
        return self.min_us + (deg / 180.0) * (self.max_us - self.min_us)

    def angle(self, deg):
        """Move to \`\`deg\`\` (0..180); drive the PWM + report the position."""
        deg = int(0 if deg < 0 else 180 if deg > 180 else deg)
        self.angle_deg = deg
        duty = self._us(deg) / self._period_us
        if self._pwm is not None:
            self._pwm.duty_u16(int(duty * 65535))
        print("%s PWM servo %s %s" % (SENTINEL, self._freq, duty))
        # Pin-keyed position for Robot View's servo->joint binding (#313).
        if self.pin is not None:
            print("%s SERVO %s %s" % (SENTINEL, self.pin, deg))
        return deg

    def detach(self):
        """Release the servo (stop holding torque)."""
        if self._pwm is not None:
            self._pwm.duty_u16(0)


def servo_command(payload, servo=None):
    """Drive \`\`servo\`\` (a :class:\`Servo\`) from one \`\`servo\`\` control payload.

      * \`\`angle <deg>\`\` → \`\`servo.angle(deg)\`\`
      * \`\`pin <n>\`\`     → \`\`servo.set_pin(n)\`\` (attach on GP<n>)
      * \`\`detach\`\`      → \`\`servo.detach()\`\`

    Defaults to the shared :data:\`servo\` singleton. Never raises on a malformed
    payload; returns the verb handled (or \`\`None\`\`), so it is easy to unit-test.
    """
    srv = servo if servo is not None else globals().get("servo")
    if srv is None or not payload:
        return None
    payload = payload.strip()
    sp = payload.find(" ")
    if sp == -1:
        verb, args = payload, ""
    else:
        verb, args = payload[:sp], payload[sp + 1:].strip()
    try:
        if verb == "angle":
            srv.angle(int(float(args.split()[0])))
        elif verb == "pin":
            srv.set_pin(int(args.split()[0]))
        elif verb == "detach":
            srv.detach()
        else:
            return None
    except (ValueError, IndexError, TypeError):
        return None
    return verb


def servos_command(payload, factory=None):
    """Drive SEVERAL servos from one \`\`servos\`\` control payload (#416).

    The payload is space-separated \`\`<pin>:<deg>\`\` (or \`\`<pin>=<deg>\`\`) pairs, so a
    Robot-View puppet slider can move a whole limb at once::

        SNKCMD servos 0:90 1:45 15:120

    Each pin is attached/reused via :func:\`servo_on\` (override with \`\`factory\`\` for
    tests) and set to its angle. Never raises on a malformed token — the bad pair
    is skipped. Returns the number of servos driven, so it is easy to unit-test.
    """
    if not payload:
        return 0
    make = factory if factory is not None else globals().get("servo_on")
    if make is None:
        return 0
    driven = 0
    for tok in payload.split():
        sep = tok.find(":")
        if sep == -1:
            sep = tok.find("=")
        if sep <= 0:
            continue
        try:
            pin = int(tok[:sep])
            deg = int(float(tok[sep + 1:]))
        except (ValueError, IndexError):
            continue
        try:
            make(pin).angle(deg)
            driven += 1
        except Exception:  # a bad pin / no PWM — skip, keep driving the rest
            continue
    return driven


# ---------------------------------------------------------------------------
# Object binding (\`watch\`) — register REAL Python objects (a \`\`machine.PWM\`\` /
# \`\`I2C\`\` / \`\`ADC\`\` / \`\`Pin\`\`, or YOUR OWN driver) so the IDE can offer the right
# instrument BY TYPE. The library only CLASSIFIES (duck-typing, so it is portable
# across ports and works on code we didn't write) and RELAYS state/commands — it
# never owns the object. \`\`watch\`\` announces each object with \`\`SNK BIND\`\`; the
# IDE maps the kind to an instrument (PWM → Oscilloscope/Servo, ADC → Multimeter,
# …); \`\`update()\`\` then streams state on the EXISTING \`\`SNK\`\` telemetry so those
# panels render it live with no new wiring.
# ---------------------------------------------------------------------------

_watched = {}  # name -> object


def _is_imu(obj):
    """True for a 6-/9-DoF IMU driver, across common method names (ours,
    Pimoroni, generic): \`\`read_accel_gyro\`\` / \`\`read_accelerometer_gyro_data\`\` /
    \`\`read_accel\`\` + \`\`read_gyro\`\`."""
    return (
        hasattr(obj, "read_accel_gyro")
        or hasattr(obj, "read_accelerometer_gyro_data")
        or (hasattr(obj, "read_accel") and hasattr(obj, "read_gyro"))
    )


def _is_env(obj):
    """True for an environmental sensor driver exposing \`\`temperature\`\` +
    \`\`pressure\`\` + \`\`humidity\`\` (e.g. the bundled BME280 driver)."""
    return (
        hasattr(obj, "temperature")
        and hasattr(obj, "pressure")
        and hasattr(obj, "humidity")
    )


def _classify(obj):
    """Best-effort object KIND by duck-typing (methods, most-specific first).

    Returns \`\`env\`\`/\`\`imu\`\`/\`\`servo\`\`/\`\`pwm\`\`/\`\`i2c\`\`/\`\`adc\`\`/\`\`pin\`\` or \`\`None\`\`.
    An environmental sensor (temperature+pressure+humidity, e.g. a BME280) and an
    IMU (accel+gyro reader) are checked first; a Servo-like driver (\`\`angle\`\`)
    before a bare \`\`Pin\`\` (\`\`value\`\`); a \`\`PWM\`\` (\`\`duty_u16\`\`) before an \`\`ADC\`\`
    (\`\`read_u16\`\`). Never raises.
    """
    if _is_env(obj):
        return "env"
    if _is_imu(obj):
        return "imu"
    if hasattr(obj, "angle"):
        return "servo"
    if hasattr(obj, "duty_u16") or hasattr(obj, "duty"):
        return "pwm"
    if hasattr(obj, "scan"):  # a machine.I2C / SoftI2C bus
        return "i2c"
    if hasattr(obj, "read_u16"):
        return "adc"
    if hasattr(obj, "value"):
        return "pin"
    return None


def watch(*args, **kwargs):
    """Register real object(s) to visualise, by name — \`\`SNK BIND <name> <kind>\`\`.

    \`\`watch(pwm=pwm, pot=adc)\`\` or \`\`watch("pwm", pwm)\`\`. The IDE reads the BIND
    descriptor to offer the matching instrument; call :func:\`update\` each loop to
    stream the objects' live state. Works with your OWN objects (only the methods
    matter — see :func:\`_classify\`).
    """
    pairs = dict(kwargs)
    if len(args) == 2 and isinstance(args[0], str):
        pairs[args[0]] = args[1]
    for name, obj in pairs.items():
        _watched[name] = obj
        print("%s BIND %s %s" % (SENTINEL, name, _classify(obj) or "other"))


def unwatch(name):
    """Stop watching \`\`name\`\` (emits \`\`SNK BIND <name> none\`\`)."""
    _watched.pop(name, None)
    print("%s BIND %s none" % (SENTINEL, name))


def _pwm_freq_duty(obj):
    """\`\`(freq_hz, duty 0..1)\`\` for a PWM-like object, best-effort (never raises)."""
    try:
        freq = obj.freq()
    except Exception:
        freq = 0
    try:
        duty = obj.duty_u16() / 65535
    except Exception:
        try:
            duty = obj.duty() / 1023  # legacy 10-bit duty (ESP8266 etc.)
        except Exception:
            duty = 0.0
    return freq, duty


def _imu_euler(obj):
    """\`\`(roll, pitch, yaw)\`\` in degrees from an IMU: roll/pitch are the
    accelerometer tilt (rotation about the board's X / Y axes), yaw the
    magnetometer heading (about Z, \`\`0\`\` when there's no readable magnetometer).

    Yaw uses only a **non-blocking continuous** \`\`read_mag\`\` gated on an explicit
    \`\`mag_supported\`\` flag — single-shot magnetometer drivers (which busy-wait per
    read) are skipped so a tight \`\`update()\`\` loop never stalls. A bad/short mag
    read degrades to \`\`yaw = 0\`\` while still emitting the valid roll/pitch."""
    from math import atan2, sqrt, degrees

    if hasattr(obj, "read_accel"):
        a = obj.read_accel()
    elif hasattr(obj, "read_accel_gyro"):
        a = obj.read_accel_gyro()
    else:
        a = obj.read_accelerometer_gyro_data()
    ax, ay, az = a[0], a[1], a[2]
    roll = degrees(atan2(ay, az))
    pitch = degrees(atan2(-ax, sqrt(ay * ay + az * az)))
    yaw = 0.0
    try:
        if getattr(obj, "mag_supported", False) and hasattr(obj, "read_mag"):
            m = obj.read_mag()
            if m is not None and len(m) >= 2:
                yaw = degrees(atan2(m[1], m[0]))
    except Exception:
        pass
    return roll, pitch, yaw


def update():
    """Emit the live state of every :func:\`watch\`-ed object on the \`\`SNK\`\` stream.

    Call each loop (after \`\`control.poll()\`\`). Reuses the existing telemetry so the
    dock renders watched objects with no extra code: a PWM → \`\`SNK PWM <name>
    <freq> <duty>\`\` (Oscilloscope/Servo); an ADC → \`\`SNK METER <name> <volts>\`\`
    (Multimeter); an IMU → \`\`SNK IMU <name> <roll> <pitch> <yaw>\`\` (3-D attitude),
    with roll/pitch from the accelerometer tilt and yaw from the magnetometer.
    """
    for name, obj in _watched.items():
        kind = _classify(obj)
        if kind == "pwm" or kind == "servo":
            freq, duty = _pwm_freq_duty(obj)
            print("%s PWM %s %s %s" % (SENTINEL, name, freq, duty))
        elif kind == "adc":
            try:
                print("%s METER %s %s V" % (SENTINEL, name, obj.read_u16() / 65535 * 3.3))
            except Exception:
                pass
        elif kind == "imu":
            try:
                roll, pitch, yaw = _imu_euler(obj)
                print("%s IMU %s %s %s %s" % (SENTINEL, name, roll, pitch, yaw))
            except Exception:
                pass
        elif kind == "env":
            # An environmental sensor (#216): one burst read() when available
            # (atomic + cheapest), else the three properties.
            try:
                if hasattr(obj, "read"):
                    t, p, h = obj.read()
                else:
                    t, p, h = obj.temperature, obj.pressure, obj.humidity
                print("%s ENV %s %s %s %s" % (SENTINEL, name, t, p, h))
            except Exception:
                pass


def watch_command(payload, watched=None):
    """Apply one \`\`watch\`\` control command to a bound object.

    \`\`<name> <verb> <args>\`\`: a PWM takes \`\`duty <0..1>\`\` / \`\`freq <hz>\`\`; a
    servo-like object \`\`angle <deg>\`\`; a Pin \`\`value <0|1>\`\`. Defaults to the
    shared :data:\`_watched\` registry. Never raises; returns the verb (or \`\`None\`\`).
    """
    watched = watched if watched is not None else _watched
    if not payload:
        return None
    parts = payload.split()
    if len(parts) < 2:
        return None
    name, verb = parts[0], parts[1]
    args = parts[2:]
    obj = watched.get(name)
    if obj is None:
        return None
    try:
        if verb == "angle" and hasattr(obj, "angle"):
            obj.angle(int(float(args[0])))
        elif verb == "duty" and hasattr(obj, "duty_u16"):
            obj.duty_u16(int(float(args[0]) * 65535))
        elif verb == "freq" and hasattr(obj, "freq"):
            obj.freq(int(float(args[0])))
        elif verb == "value" and hasattr(obj, "value"):
            obj.value(int(float(args[0])))
        else:
            return None
    except (ValueError, IndexError, TypeError):
        return None
    return verb


# Shared, ready-to-use (hardware-less) singletons — attach hardware as needed,
# e.g. \`\`inst.led = inst.Led(pwm=PWM(Pin(15)))\`\`. NOTE: the rangefinder singleton
# is \`\`ranger\`\` (NOT \`\`range\`\` — that would shadow the Python builtin).
buzzer = Buzzer()
led = Led()
ranger = Rangefinder()
display = Display()
servo = Servo()


def servo_on(pin, freq=50):
    """A :class:\`Servo\` attached to GPIO \`\`pin\`\` for the Robot View (#313).

    Each \`\`angle(deg)\`\` emits \`\`SNK SERVO <pin> <deg>\`\` (pin-keyed), so the IDE
    maps this servo onto its bound URDF joint and animates the 3-D robot — even
    headless in the simulator (no \`\`machine\`\` needed). On a real board it also
    drives \`\`PWM(Pin(pin))\`\`. Use one per joint::

        import instruments as inst
        shoulder = inst.servo_on(0)
        elbow = inst.servo_on(1)
        shoulder.angle(90)   # -> SNK SERVO 0 90 -> the joint bound to pin 0 moves
    """
    return Servo(pin=pin, freq=freq)
`,tn='"""snakie — the friendly hardware layer for Snakie sketches.\n\nImport the things you *drive* from here, so your code reads\n``pin -> PWM -> Servo -> joint`` and never clashes with a vendor ``servo``\nmodule (Pimoroni\'s frozen ``servo``, etc.)::\n\n    from snakie import Servo, Buzzer, Led, Pin, PWM\n\n    base = Servo(PWM(Pin(0)), pin=0)   # a servo on GP0; pin= drives the 3-D model\n    base.angle(90)\n\nThese are re-exported from Snakie\'s on-device runtime (``instruments``), which\nkeeps the *measurement* tools (scope / meter / plotter). Same classes, friendlier\nname — ``snakie.Servo`` *is* ``instruments.Servo``. Uploaded to ``/lib/snakie.py``\nalongside ``instruments.py`` by the Board View\'s library installer.\n"""\n\n# Re-export ONLY the hardware/actuator classes + raw IO — the "connect pins to\n# things" layer. Scopes/meters/plotters stay in `instruments` (they\'re not things\n# you wire up, they\'re how you observe the ones you do).\nfrom instruments import Servo, Buzzer, Led, Pin, PWM  # noqa: F401 - re-exported API\n\n__all__ = ["Servo", "Buzzer", "Led", "Pin", "PWM"]\n',an=nn,sn=tn,rn=Object.assign({"../../../../micropython/modules/buzzer.py":$e,"../../../../micropython/modules/hcsr04.py":Qe,"../../../../micropython/modules/mpu6050.py":Ye,"../../../../micropython/modules/neopixel_ws2812.py":Je,"../../../../micropython/modules/rotary.py":Ze,"../../../../micropython/modules/teleop.py":en}),te=Object.fromEntries(Object.entries(rn).map(([i,e])=>[i.split("/").pop()??i,e])),on="https://projects.kevsrobots.com/api/feedback",ln=2e4,pn=4*1024*1024,dn=16e3;function cn(i){const e=/^data:image\/[\w.+-]+;base64,(.+)$/s.exec(i);if(!e)return null;try{const n=atob(e[1]),a=new Uint8Array(n.length);for(let t=0;t<n.length;t++)a[t]=n.charCodeAt(t);return a}catch{return null}}function mn(i){const e="ea7d6e5153feb615af27c725678ab9159ff9d9674e61d0db9b9877083b93e996";return{diagnostics:async()=>({platform:"web",arch:"",osVersion:navigator.userAgent.slice(0,200),electron:"",snakieVersion:i}),feedback:{submitBugReport:async n=>{const a=(n?.title??"").trim(),t=(n?.description??"").trim();if(!a||!t)return{ok:!1,error:"Please add a title and a description."};const s=`_SNAKIE_ ${a}

${t}`.slice(0,dn),l=new FormData;l.append("sentiment","issue"),l.append("message",s),l.append("page_url",window.location.origin||"https://app.snakie.org"),l.append("user_agent",`Snakie/${i} (web) ${navigator.userAgent}`.slice(0,320));const d=(n?.email??"").trim();if(d&&l.append("email",d.slice(0,320)),n?.screenshot){const p=cn(n.screenshot);p&&p.byteLength>0&&p.byteLength<=pn&&l.append("screenshot",new Blob([p],{type:"image/png"}),"screenshot.png")}const h={};h["X-Snakie-Key"]=e;try{const p=await fetch(on,{method:"POST",body:l,headers:h,signal:AbortSignal.timeout(ln)});return p.ok?{ok:!0,status:p.status}:p.status===401||p.status===403?{ok:!1,status:p.status,error:"Couldn't send — the bug service isn't accepting reports from Snakie yet (not authorised). A maintainer needs to provision access."}:p.status===429?{ok:!1,status:429,error:"Too many reports right now — please try again in a minute."}:{ok:!1,status:p.status,error:`The bug service returned HTTP ${p.status}.`}}catch(p){return{ok:!1,error:`Couldn't reach the bug service: ${p instanceof Error?p.message:String(p)}`}}}}}}async function un(){const i=navigator.mediaDevices;if(!i?.getDisplayMedia)return[];let e=null;const n=document.createElement("video");try{e=await i.getDisplayMedia({video:!0,audio:!1,preferCurrentTab:!0,selfBrowserSurface:"include"}),n.srcObject=e,n.muted=!0,await n.play(),n.videoWidth||await new Promise((h,p)=>{n.onloadeddata=()=>h(),n.onerror=()=>p(new Error("no frame")),window.setTimeout(()=>p(new Error("capture timed out")),5e3)}),await new Promise(h=>{const p=n,u=window.setTimeout(h,1500);if(!p.requestVideoFrameCallback)return;let b=4;const _=()=>{--b<=0?(window.clearTimeout(u),h()):p.requestVideoFrameCallback?.(_)};p.requestVideoFrameCallback(_)});const a=Math.min(1,1600/Math.max(1,n.videoWidth)),t=Math.max(2,Math.round(n.videoWidth*a)),s=Math.max(2,Math.round(n.videoHeight*a)),l=document.createElement("canvas");l.width=t,l.height=s;const d=l.getContext("2d");return d?(d.drawImage(n,0,0,t,s),[{title:"Snakie (tab capture)",dataUrl:l.toDataURL("image/png")}]):[]}catch{return[]}finally{n.srcObject=null,e?.getTracks().forEach(a=>a.stop())}}const pe="<<SNAKIE_MIP_START>>",X="<<SNAKIE_MIP_OK>>",q="<<SNAKIE_MIP_ERR>>";function D(i){return"'"+i.replace(/\\/g,"\\\\").replace(/'/g,"\\'")+"'"}function hn(i){const e=[];return i.target&&i.target.trim()&&e.push(`target=${D(i.target.trim())}`),i.index&&i.index.trim()&&e.push(`index=${D(i.index.trim())}`),e}function gn(i,e={}){const n=[D(i),...hn(e)].join(", ");return[`print(${D(pe)})`,"try:","    import mip",`    mip.install(${n})`,`    print(${D(X)})`,"except Exception as __e:",`    print(${D(q)}, repr(__e))`].join(`
`)}const E="/lib";function fn(i){if(te[i])return te[i];for(const[e,n]of Object.entries(le))if(e.endsWith(`/${i}`)||e===i)return n;return null}function ie(i){const e=se.find(n=>n.id===i);if(!e)throw new Error(`Unknown module: ${i}`);if(e.source.kind==="bundled"){const n=fn(e.source.file);if(n)return{id:i,importName:e.importName,mechanism:"writeFile",writeFile:{path:`${E}/${e.source.file}`,contents:n},notes:[]};throw new Error(`${e.source.file} isn't bundled in the web build yet.`)}return{id:i,importName:e.importName,mechanism:"mip",snippet:gn(e.source.spec),mipSpec:e.source.spec,notes:[]}}function yn(){return{catalog:async()=>se,installPlan:async i=>ie(i),probeInstalled:async i=>{if(i.length===0)return[];const e=[];for(const n of i){const a=n.replace(/[^A-Za-z0-9_]/g,"");e.push(be(a).replace(I,`${I} ${a}`))}try{const n=await window.api.device.exec(e.join(`
`)),a=new Set;for(const t of`${n.stdout??""}`.split(/\r?\n/)){const s=t.trim();s.startsWith(`${I} `)&&a.add(s.slice(I.length+1).trim())}return i.filter(t=>a.has(t.replace(/[^A-Za-z0-9_]/g,"")))}catch{return[]}},install:async(i,e)=>{const n=t=>e?.(t);n({id:i,state:"started"});let a;try{a=ie(i)}catch(t){const s=t instanceof Error?t.message:String(t);return n({id:i,state:"error",message:s}),{id:i,ok:!1,log:s,notes:[]}}for(const t of a.notes)n({id:i,state:"note",message:t});if(a.mechanism==="writeFile"&&a.writeFile){n({id:i,state:"running",message:`Writing ${a.writeFile.path}…`});try{return await window.api.device.mkdir(E).catch(()=>{}),await window.api.device.writeFile(a.writeFile.path,a.writeFile.contents),n({id:i,state:"done",message:`Installed ${i}`}),window.api.modules.notifyChanged(),{id:i,ok:!0,log:`Wrote ${a.writeFile.path}`,notes:a.notes}}catch(t){const s=t instanceof Error?t.message:String(t);return n({id:i,state:"error",message:`Failed to install ${i}`}),{id:i,ok:!1,log:s,notes:a.notes}}}n({id:i,state:"running",message:`Installing ${i} with mip…`});try{const t=await window.api.device.exec(a.snippet??""),s=`${t.stdout??""}
${t.stderr??""}`.trim(),l=s.includes(q)||(t.stderr??"").includes("Traceback"),d=s.includes(X)&&!l,h=s.split(/\r?\n/).filter(u=>!u.includes(pe)&&!u.includes(X)).map(u=>u.replace(q,"").trim()).filter(u=>u.length>0).join(`
`).trim();if(d)return n({id:i,state:"done",message:`Installed ${i}`}),window.api.modules.notifyChanged(),{id:i,ok:d,log:h||s,notes:a.notes};const p=await ae(a,n);return p||(n({id:i,state:"error",message:`Failed to install ${i}`}),{id:i,ok:!1,log:h||s,notes:a.notes})}catch(t){const s=await ae(a,n);if(s)return s;const l=t instanceof Error?t.message:String(t);return n({id:i,state:"error",message:`Failed to install ${i}`}),{id:i,ok:!1,log:l,notes:a.notes}}}}}async function ae(i,e){const n=i.mipSpec?we(i.mipSpec):null;if(!n)return null;const a=n.split("/").pop()??`${i.importName}.py`;try{e({id:i.id,state:"running",message:`Board has no mip — fetching ${a} in the browser…`});const t=await fetch(n,{signal:AbortSignal.timeout(2e4)});if(!t.ok)throw new Error(`GitHub returned HTTP ${t.status}`);const s=await t.text();return await window.api.device.mkdir(E).catch(()=>{}),await window.api.device.writeFile(`${E}/${a}`,s),e({id:i.id,state:"done",message:`Installed ${i.id}`}),window.api.modules.notifyChanged(),{id:i.id,ok:!0,log:`Board has no mip/network — fetched ${n} in the browser and wrote ${E}/${a}`,notes:i.notes}}catch(t){const s=t instanceof Error?t.message:String(t);return e({id:i.id,state:"note",message:`Browser fetch fallback failed: ${s}`}),null}}const bn="snakie.board.v1";function de(){const i=new BroadcastChannel(bn),e=new Map;return i.onmessage=n=>{const a=e.get(n.data?.t);if(a)for(const t of[...a])t(n.data)},{post:n=>i.postMessage(n),on:(n,a)=>{let t=e.get(n);return t||e.set(n,t=new Set),t.add(a),()=>t.delete(a)}}}function ce(i){const n=window.api?.robot;if(!n?.save)return;const a=n.save.bind(n);n.save=async(...t)=>{const s=await a(...t);return i.post({t:"robot"}),s},n.onChanged=t=>i.on("robot",()=>t())}function wn(){const i=window;if(!i.api)return;const e=de();let n=null,a=null;const t=new Set,s=new Set,l=p=>{for(const u of[...p])u()};e.on("request",()=>{a&&e.post({t:"source",payload:a})}),e.on("opened",()=>l(t)),e.on("closed",()=>{n=null,l(s)});const d=i.api.board??{};d.open=async()=>{if(n&&!n.closed){n.focus(),l(t);return}if(n=window.open("board.html","snakie-board","popup=yes,width=980,height=720"),!n)throw l(s),new Error("The browser blocked the Board View popup.");l(t)},d.close=()=>{e.post({t:"close"}),n&&!n.closed?n.close():l(s),n=null},d.update=p=>{a=p,e.post({t:"source",payload:p})},d.requestSource=async()=>a,d.onOpened=p=>(t.add(p),()=>t.delete(p)),d.onClosed=p=>(s.add(p),()=>s.delete(p)),d.selectBoard=p=>e.post({t:"select",id:p}),d.onSelectBoard=p=>e.on("select",u=>p(u.id)),i.api.board=d;const h=i.api.instruments??{};h.onOpen=p=>e.on("instruments",u=>p(u.payload)),i.api.instruments=h,ce(e)}function _n(){const i=window;if(!i.api)return;const e=de();e.on("close",()=>window.close()),window.addEventListener("pagehide",()=>e.post({t:"closed"}));const n=i.api.board??{};n.close=()=>window.close(),n.onSource=t=>e.on("source",s=>t(s.payload)),n.requestSource=async()=>(e.post({t:"request"}),null),n.selectBoard=t=>e.post({t:"select",id:t}),n.onSelectBoard=t=>e.on("select",s=>t(s.id)),i.api.board=n;const a=i.api.instruments??{};a.open=t=>e.post({t:"instruments",payload:t}),i.api.instruments=a,ce(e),e.post({t:"opened"})}function Pn(i="main"){const e=window;if(!e.api)return;const n="0.36.0";e.api.appVersion=async()=>n;const a=mn(n);e.api.feedback=a.feedback,e.api.diagnostics=a.diagnostics;const t="snakie:modules-changed",s=e.api.modules??{};Object.assign(s,yn()),s.notifyChanged=()=>{window.dispatchEvent(new CustomEvent(t))},s.onChanged=h=>{const p=()=>h();return window.addEventListener(t,p),()=>window.removeEventListener(t,p)},e.api.modules=s,e.api.captureScreenshot=un,e.api.openExternal=async h=>{window.open(h,"_blank","noopener,noreferrer")},e.api.device=Oe();const l=e.api.instruments??{};l.librarySource=async()=>an,l.umbrellaSource=async()=>sn,e.api.instruments=l;const d=e.api.parts??{};if(Object.assign(d,je()),e.api.parts=d,"showDirectoryPicker"in window||H()){const h=Ke();e.api.fs=h,e.api.robot=He(h)}i==="board"?_n():wn(),console.info('[Snakie] Web backend ready — Connect the "Simulated device (offline)" to run Python; Open Folder to edit local files.')}function vn(i=400){window.setTimeout(()=>{(async()=>{try{const e=window.api.device;(await e.getStatus()).state==="disconnected"&&await e.connect(z)}catch{}})()},i)}export{vn as autoConnectSimulator,Pn as installWebApi};
