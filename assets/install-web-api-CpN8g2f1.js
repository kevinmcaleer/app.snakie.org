import{c as Pe,g as H,s as v,h as Ce,d as De}from"./control-BvEHiv2c.js";import{R as Ae,e as Te,f as Ie,c as V,h as O,b as Me,g as Ee}from"./robot-yaml-Mtc7Amp0.js";import{V as ee,M as de,aP as Le,aQ as N}from"./index-dMk-mja6.js";import{installWebInstrumentWindow as Re,instrumentKeyFromHash as Ne,installWebInstrumentsMain as Ge}from"./web-instruments-CmKWe-1t.js";import"./monaco-BlnWn4Xm.js";class Be{worker=null;onOutput=null;nextId=1;pending=new Map;readyResolve=null;readyReject=null;busy=0;async init(e){this.onOutput=e,await this.spawn()}spawn(){const e=new Worker(new URL("/assets/mp.worker-CWYN_4_1.js",import.meta.url),{type:"module"});this.worker=e,e.onmessage=i=>this.handle(i.data),e.onerror=i=>{const a=new Error(i.message||"MicroPython worker failed to load");for(const s of this.pending.values())s.reject(a);this.pending.clear(),this.busy=0,this.readyReject?.(a),this.readyResolve=null,this.readyReject=null,this.worker===e&&(this.worker=null),e.terminate()};const n=new Promise((i,a)=>{this.readyResolve=i,this.readyReject=a});return e.postMessage({type:"init"}),n}handle(e){if(e.type==="out"){this.onOutput?.(e.bytes);return}if(e.type==="ready"){this.readyResolve?.(),this.readyResolve=null,this.readyReject=null;return}this.busy=Math.max(0,this.busy-1);const n=this.pending.get(e.id);n&&(this.pending.delete(e.id),e.error?n.reject(new Error(e.error)):n.resolve(e.type==="result"?e.value:void 0))}request(e){if(!this.worker)return Promise.reject(new Error("MicroPython worker is not running"));const n=this.nextId++;return this.busy++,new Promise((i,a)=>{this.pending.set(n,{resolve:i,reject:a,kind:e.type}),this.worker.postMessage({...e,id:n})})}feed(e){return this.request({type:"feed",data:e})}runCaptured(e){return this.request({type:"run",code:e})}runStream(e){return this.request({type:"runStream",code:e})}async interrupt(){if(this.busy<=0){await this.feed("").catch(()=>{});return}await this.reboot()}async reboot(){for(const e of this.pending.values())e.kind==="feed"||e.kind==="runStream"?e.resolve(void 0):e.reject(new Error("interrupted"));this.pending.clear(),this.busy=0,this.worker?.terminate(),this.worker=null,this.onOutput?.(new TextEncoder().encode(`\r
[stopped — simulator restarted]\r
`)),await this.spawn()}dispose(){this.worker?.terminate(),this.worker=null,this.onOutput=null,this.pending.clear(),this.busy=0}}const C="SNK",K="<<SNKV>>";function D(t,e=3){return Number(t.toFixed(e)).toString()}function Ve(t){const e=t*.12,n=[];n.push(`${C} SCOPE ch1 ${D(Math.sin(e*2),4)}`),n.push(`${C} SCOPE pwm ${D(.5+.5*Math.sin(e),4)}`),n.push(`${C} METER adc0 ${D(1.65+.4*Math.sin(e*.7))} V`);const i=22+2*Math.sin(e*.3),a=Math.round(50+40*Math.sin(e*.5+1));n.push(`${C} PLOT temp=${D(i,1)} light=${a}`);const s=1009+8*Math.sin(e*.15),r=Math.round(52+12*Math.sin(e*.22+.5));return n.push(`${C} ENV env ${D(i,1)} ${D(s,1)} ${r}`),n.push(`${C} IMU imu ${D(20*Math.sin(e))} ${D(15*Math.sin(e*.8+1))} ${D(t*3%360)}`),n.push(`${C} DIST dist ${Math.round(150+120*Math.sin(e*.6))}`),n.push(`${C} ENC enc ${t}`),n.push(`${C} BTN a ${t%40<3?1:0}`),t%16===0&&n.push(`${C} READY scope meter plot env imu dist enc btn`),n}function Oe(t,e){const n=[],i=new RegExp(`${K.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}(\\d+):`,"g");let a;for(;(a=i.exec(t))!==null;){const s=Number.parseInt(a[1],10);Number.isInteger(s)&&!n.includes(s)&&n.push(s)}return n.map(s=>{const r=Math.round(32768*(1+Math.sin(e*.4+s)));return`${K}${s}:${r}`}).join(`
`)}function ze(t){return t.includes(K)}const We=120,Ue={dialect:"micropython"},z=new TextEncoder,S=t=>`'${t.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/\n/g,"\\n").replace(/\r/g,"\\r")}'`,Fe=t=>{const e=t.lastIndexOf("/"),n=e>0?t.slice(0,e):"";return!n||n==="/"?"":v(["import os",'_snk_cur=""',`for _snk_seg in ${S(n)}.strip("/").split("/"):`,'    _snk_cur+="/"+_snk_seg',"    try:","        os.mkdir(_snk_cur)","    except OSError:","        pass"],"_snk_cur","_snk_seg")},Xe=new Set(["dev","proc","tmp","home"]);function He(){const t=new Set,e=new Set;let n="disconnected",i=null,a=0,s=null;const r=c=>t.forEach(b=>b(c)),d=()=>{if(n!=="connected")return;const c=Ve(a++);c.length>0&&r(z.encode(c.join(`\r
`)+`\r
`))},u=()=>{s||(s=setInterval(d,We))},o=()=>{s&&(clearInterval(s),s=null)},m=()=>{const c={state:n,path:H,baudRate:115200};return n==="connected"&&(c.runtime=Ue),c},y=c=>{n=c;const b=m();e.forEach(p=>p(b))},h=async c=>{if(!i)throw new Error("Not connected");return i.runCaptured(c)};return{listPorts:async()=>[{path:H,friendlyName:Pe}],connect:async()=>{if(n!=="connected"){y("connecting"),i=new Be;try{await i.init(r)}catch(c){r(z.encode(`\r
Simulated device — Python REPL unavailable (${String(c)}).\r
>>> `))}y("connected"),u()}},disconnect:async()=>{o(),i?.dispose(),i=null,n!=="disconnected"&&y("disconnected")},getStatus:async()=>m(),exec:async c=>ze(c)?{stdout:Oe(c,a),stderr:""}:{stdout:await h(c),stderr:""},eval:async c=>h(c),sendData:async c=>{i&&await i.feed(c)},runProgram:async c=>{i&&await i.runStream(c)},sendControl:async()=>{},interrupt:async()=>{i&&await i.interrupt()},softReset:async()=>{i&&await i.feed("")},listDir:async(c="/")=>{const b=v(["import os, json","def _snk_ls(p):","    out=[]","    try: it=os.ilistdir(p)","    except AttributeError: it=[(n,0,0) for n in os.listdir(p)]","    for e in it:","        name=e[0]; typ=e[1] if len(e)>1 else 0",'        full=(p.rstrip("/")+"/"+name) if p else name',"        isdir=(typ & 0x4000)!=0","        try: size=0 if isdir else os.stat(full)[6]","        except OSError: size=0","        out.append([name,isdir,size])","    return out",`print(json.dumps(_snk_ls(${S(c)})))`],"_snk_ls"),p=(await h(b)).trim(),l=p?JSON.parse(p):[],g=c===""||c==="/";return l.filter(([f,w])=>!(g&&w&&Xe.has(f))).map(([f,w,P])=>({name:f,isDir:w,size:P}))},df:async()=>null,readFile:async c=>h(v(["import sys",`with open(${S(c)}) as _snk_f:`,"    sys.stdout.write(_snk_f.read())"],"_snk_f")),readFileLine:async(c,b)=>(await h(v(["_snk_l = ''","try:",`    with open(${S(c)}) as _snk_f:`,"        for _snk_x in _snk_f:",`            if _snk_x.startswith(${S(b)}):`,"                _snk_l = _snk_x","                break","except OSError:","    pass","print(_snk_l)"],"_snk_l","_snk_f","_snk_x"))).trim(),writeFile:async(c,b)=>{const p=Array.from(z.encode(b)).map(g=>g.toString(16).padStart(2,"0")).join(""),l=v([Fe(c),`_snk_d=bytes.fromhex(${S(p)})`,`with open(${S(c)},'wb') as _snk_f:`,"    _snk_f.write(_snk_d)"].filter(Boolean),"_snk_d","_snk_f");await h(l)},remove:async c=>{await h(v(["import os",`_snk_s = [${S(c)}]`,"while _snk_s:","    _snk_p = _snk_s[-1]","    if (os.stat(_snk_p)[0] & 0x4000) != 0:","        _snk_c = os.listdir(_snk_p)","        if _snk_c:","            _snk_s.extend([_snk_p + '/' + _snk_x for _snk_x in _snk_c])","        else:","            os.rmdir(_snk_p); _snk_s.pop()","    else:","        os.remove(_snk_p); _snk_s.pop()"],"_snk_s","_snk_p","_snk_c"))},mkdir:async c=>{await h(`import os
os.mkdir(${S(c)})`)},rename:async(c,b)=>{await h(`import os
os.rename(${S(c)}, ${S(b)})`)},stat:async c=>{const b=v(["import os, json",`_snk_st=os.stat(${S(c)})`,"_snk_isdir=(_snk_st[0] & 0x4000)!=0","print(json.dumps([_snk_isdir, _snk_st[6], _snk_st[8] if len(_snk_st)>8 else None]))"],"_snk_st","_snk_isdir"),[p,l,g]=JSON.parse((await h(b)).trim());return{isDir:p,size:l,mtime:g??void 0}},onData:c=>(t.add(c),()=>t.delete(c)),onStatus:c=>(e.add(c),()=>e.delete(c))}}const Ke="",je="",W="",R="";function k(t){return`'${t.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/\r/g,"\\r").replace(/\n/g,"\\n")}'`}const qe=new TextEncoder,L=new TextDecoder,U=t=>Uint8Array.from(t,e=>e.charCodeAt(0)&255);function $e(t,e){if(e.length===0)return 0;e:for(let n=0;n+e.length<=t.length;n++){for(let i=0;i<e.length;i++)if(t[n+i]!==e[i])continue e;return n}return-1}function Ye(t,e){const n=new Uint8Array(t.length+e.length);return n.set(t),n.set(e,t.length),n}class Qe{constructor(e,n){this.transport=e,this.onConsole=n,e.onData(i=>this.handleData(i))}rxBuffer=new Uint8Array(0);pending=null;streamPending=null;inRawRepl=!1;execActive=!1;opQueue=Promise.resolve();handleData(e){this.rxBuffer=Ye(this.rxBuffer,e),this.pending&&(clearTimeout(this.pending.timer),this.pending.timer=this.armIdleTimer(this.pending.idleMs)),this.streamPending?this.pumpStream():this.tryResolvePending(),this.execActive||this.onConsole(e)}pumpStream(){const e=this.rxBuffer.indexOf(4);if(e===-1){this.rxBuffer.length>0&&(this.onConsole(this.rxBuffer),this.rxBuffer=new Uint8Array(0));return}const n=this.rxBuffer.slice(0,e);n.length>0&&this.onConsole(n),this.rxBuffer=this.rxBuffer.slice(e+1);const i=this.streamPending;this.streamPending=null,i?.resolve()}streamUntilCtrlD(){return this.streamPending?Promise.reject(new Error("A stream is already in progress")):new Promise((e,n)=>{this.streamPending={resolve:e,reject:n},this.pumpStream()})}tryResolvePending(){if(!this.pending)return;const e=$e(this.rxBuffer,this.pending.marker);if(e===-1)return;const n=e+this.pending.marker.length,i=this.rxBuffer.slice(0,n);this.rxBuffer=this.rxBuffer.slice(n);const{resolve:a,timer:s}=this.pending;clearTimeout(s),this.pending=null,a(i)}write(e){return this.transport.write(typeof e=="string"?U(e):e)}armIdleTimer(e){return setTimeout(()=>{const n=this.pending;this.pending=null,n?.reject(new Error(`Device went quiet for ${e}ms waiting for ${JSON.stringify(L.decode(n.marker))}`))},e)}readUntil(e,n=5e3){return this.pending?Promise.reject(new Error("A read is already in progress")):new Promise((i,a)=>{this.pending={marker:U(e),resolve:i,reject:a,timer:this.armIdleTimer(n),idleMs:n},this.tryResolvePending()})}async sendData(e){await this.write(e)}async sendControl(e,n=""){await this.write(Ce(e,n))}async interrupt(){await this.write(W)}async softReset(){await this.write(R)}async enterRawRepl(){this.rxBuffer=new Uint8Array(0),await this.write(W),await this.write(W),await this.write(Ke),await this.readUntil(`raw REPL; CTRL-B to exit\r
>`),this.inRawRepl=!0}async exitRawRepl(){const e=this.execActive;this.execActive=!0;try{await this.write(je),this.inRawRepl=!1,await this.readUntil(">>> ",2e3).catch(()=>{}),this.rxBuffer=new Uint8Array(0)}finally{this.execActive=e}}exec(e,n=1e4){const i=this.opQueue.then(()=>this.execLocked(e,n));return this.opQueue=i.catch(()=>{}),i}async execLocked(e,n){this.execActive=!0;try{const i=!this.inRawRepl;i&&await this.enterRawRepl();try{await this.write(e),await this.write(R);const a=await this.readUntil("OK",n);if(!L.decode(a).includes("OK"))throw new Error('Device did not acknowledge code (no "OK")');const s=await this.readUntil(R,n),r=L.decode(s.subarray(0,s.length-1)),d=await this.readUntil(R,n),u=L.decode(d.subarray(0,d.length-1));return await this.readUntil(">",n),{stdout:r,stderr:u}}finally{i&&await this.exitRawRepl().catch(()=>{})}}finally{this.execActive=!1}}async eval(e,n=1e4){const{stdout:i,stderr:a}=await this.exec(e,n);if(a.trim().length>0)throw new Error(a.trim());return i}runProgram(e){const n=this.opQueue.then(()=>this.runLocked(e));return this.opQueue=n.catch(()=>{}),n}async runLocked(e){this.execActive=!0;try{const n=!this.inRawRepl;n&&await this.enterRawRepl();try{await this.write(e),await this.write(R);const i=await this.readUntil("OK");if(!L.decode(i).includes("OK"))throw new Error('Device did not acknowledge the program (no "OK")');await this.streamUntilCtrlD(),await this.streamUntilCtrlD(),await this.readUntil(">")}finally{n&&(await this.exitRawRepl().catch(()=>{}),this.onConsole(U(`\r
>>> `)))}}finally{this.execActive=!1}}async listDir(e="/"){const n=v(["import os, json","def _snk_ls(p):","    out=[]","    try:","        it=os.ilistdir(p)","    except AttributeError:","        it=[(n,0,0) for n in os.listdir(p)]","    for e in it:","        name=e[0]; typ=e[1] if len(e)>1 else 0",'        full=(p.rstrip("/")+"/"+name) if p else name',"        isdir=(typ & 0x4000)!=0","        try: size=0 if isdir else os.stat(full)[6]","        except OSError: size=0","        out.append([name,isdir,size])","    return out",`print(json.dumps(_snk_ls(${k(e)})))`],"_snk_ls"),i=(await this.eval(n)).trim();return(i?JSON.parse(i):[]).map(([s,r,d])=>({name:s,isDir:r,size:d}))}async readFile(e){return L.decode(await this.readFileBytes(e))}async readFileLine(e,n){const i=v(["_snk_l = ''","try:",`    with open(${k(e)}) as _snk_f:`,"        for _snk_x in _snk_f:",`            if _snk_x.startswith(${k(n)}):`,"                _snk_l = _snk_x","                break","except OSError:","    pass","print(_snk_l)"],"_snk_l","_snk_f","_snk_x");return(await this.eval(i)).trim()}async readFileBytes(e){const n=v(["import sys",`try:
 import ubinascii
except ImportError:
 import binascii as ubinascii`,`with open(${k(e)},'rb') as _snk_f:`,"    while True:","        _snk_b=_snk_f.read(256)","        if not _snk_b: break","        sys.stdout.write(ubinascii.hexlify(_snk_b))"],"_snk_f","_snk_b"),i=(await this.eval(n)).trim(),a=new Uint8Array(i.length/2);for(let s=0;s<a.length;s++)a[s]=parseInt(i.substr(s*2,2),16);return a}async writeFile(e,n,i=256){const a=typeof n=="string"?qe.encode(n):n;await this.eval([`try:
 import ubinascii
except ImportError:
 import binascii as ubinascii`,`_snk_f=open(${k(e)},'wb')`].join(`
`));try{for(let s=0;s<a.length||s===0;s+=i){const r=a.subarray(s,s+i);if(r.length===0&&s>0)break;let d="";for(const u of r)d+=u.toString(16).padStart(2,"0");if(await this.eval(`_snk_f.write(ubinascii.unhexlify(${k(d)}))`),r.length<i)break}}finally{await this.eval(["try: _snk_f.close()","except Exception: pass",De("_snk_f")].join(`
`)).catch(()=>{})}}async mkdir(e){await this.eval(`import os
os.mkdir(${k(e)})`)}async rename(e,n){await this.eval(`import os
os.rename(${k(e)}, ${k(n)})`)}async remove(e){await this.eval(v(["import os",`_snk_s = [${k(e)}]`,"while _snk_s:","    _snk_p = _snk_s[-1]","    if (os.stat(_snk_p)[0] & 0x4000) != 0:","        _snk_c = os.listdir(_snk_p)","        if _snk_c:","            _snk_s.extend([_snk_p + '/' + _snk_x for _snk_x in _snk_c])","        else:","            os.rmdir(_snk_p); _snk_s.pop()","    else:","        os.remove(_snk_p); _snk_s.pop()"],"_snk_s","_snk_p","_snk_c"))}async stat(e){const n=v(["import os, json",`_snk_st=os.stat(${k(e)})`,"_snk_isdir=(_snk_st[0] & 0x4000)!=0","_snk_mtime=_snk_st[8] if len(_snk_st)>8 else None","print(json.dumps([_snk_isdir, _snk_st[6], _snk_mtime]))"],"_snk_st","_snk_isdir","_snk_mtime"),[i,a,s]=JSON.parse((await this.eval(n)).trim());return{isDir:i,size:a,mtime:s??void 0}}}const pe=[{usbVendorId:11914,label:"Raspberry Pi (Pico / RP2040)"},{usbVendorId:12346,label:"Espressif (ESP32-S2/S3, native USB)"},{usbVendorId:9114,label:"Adafruit board"},{usbVendorId:4292,label:"Silicon Labs CP210x bridge (ESP32)"},{usbVendorId:6790,label:"WCH CH340 bridge"},{usbVendorId:1027,label:"FTDI bridge"},{usbVendorId:1659,label:"Prolific PL2303 bridge"}],Je=pe.map(t=>({usbVendorId:t.usbVendorId}));function Ze(t,e){const n=pe.find(s=>s.usbVendorId===t),i=s=>s==null?"????":s.toString(16).padStart(4,"0"),a=`${i(t)}:${i(e)}`;return n?`${n.label} · ${a}`:`USB serial device · ${a}`}const G=()=>navigator.serial??null,ne=()=>G()!==null;class en{constructor(e){this.port=e}reader=null;dataCb=null;closeCb=null;closed=!1;async open(e=115200){await this.port.open({baudRate:e}),this.readLoop()}async readLoop(){for(;this.port.readable&&!this.closed;){const e=this.port.readable.getReader();this.reader=e;try{for(;;){const{value:n,done:i}=await e.read();if(i)break;n&&n.length&&this.dataCb?.(n)}}catch{}finally{e.releaseLock()}}this.closed||this.closeCb?.()}onData(e){this.dataCb=e}onClose(e){this.closeCb=e}async write(e){if(!this.port.writable)throw new Error("Serial port is not writable");const n=this.port.writable.getWriter();try{await n.write(e)}finally{n.releaseLock()}}async setSignals(e){await this.port.setSignals?.(e)}async close(){this.closed=!0;try{await this.reader?.cancel()}catch{}try{await this.port.close()}catch{}}}const B="webserial://",j="webserial://pick",te=new TextEncoder;function nn(){const t=new Set,e=new Set;let n="disconnected",i="",a=null,s=null,r=null,d=null;const u=new Map,o=l=>t.forEach(g=>g(l)),m=(l,g=i)=>{n=l,i=g,l!=="connected"&&(d=null),e.forEach(f=>f(y()))},y=()=>{const l={state:n,path:i,baudRate:115200};return d&&(l.runtime=d),l},h=()=>{if(!s)throw new Error("No board connected");return s},c=()=>{n!=="disconnected"&&(a=null,s=null,r=null,o(te.encode(`\r
[board disconnected — USB unplugged]\r
`)),m("disconnected",""))},b=G();b&&b.addEventListener?.("disconnect",l=>{const g=l.target;r&&g===r&&c()});const p=async(l,g)=>{m("connecting",g),r=l,a=new en(l),a.onClose(c),await a.open(115200),s=new Qe(a,o),m("connected",g),s.eval(Ae).then(f=>{const w=Te(f);if(!w)return;d=w,e.forEach(E=>E(y()));const P=Ie(w);P&&o(te.encode(`\r
${P}\r
Type "help()" for more information.\r
>>> `))}).catch(()=>{})};return{listPorts:async()=>{const l=G();return l?(u.clear(),(await l.getPorts()).map((f,w)=>{const P=`${B}${w}`;u.set(P,f);const{usbVendorId:E,usbProductId:ke}=f.getInfo();return{path:P,friendlyName:Ze(E,ke)}})):[]},connect:async l=>{const g=G();if(!g)throw new Error("Web Serial needs a Chromium-based browser");let f;if(l===j){f=await g.requestPort({filters:Je});const w=u.size;l=`${B}${w}`,u.set(l,f)}else f=u.get(l)??(await g.getPorts())[Number(l.slice(B.length))];if(!f)throw new Error("That serial port is no longer available");await p(f,l)},disconnect:async()=>{await a?.close(),a=null,s=null,r=null,n!=="disconnected"&&m("disconnected","")},getStatus:async()=>y(),exec:async l=>h().exec(l),eval:async l=>h().eval(l),sendData:async l=>h().sendData(l),runProgram:async l=>h().runProgram(l),sendControl:async(l,g)=>h().sendControl(l,g??""),interrupt:async()=>h().interrupt(),softReset:async()=>h().softReset(),listDir:async(l="/")=>h().listDir(l),df:async()=>null,readFile:async l=>h().readFile(l),readFileLine:async(l,g)=>h().readFileLine(l,g),readFileBytes:async l=>h().readFileBytes(l),writeFile:async(l,g)=>h().writeFile(l,g),remove:async l=>h().remove(l),mkdir:async l=>h().mkdir(l),rename:async(l,g)=>h().rename(l,g),stat:async l=>h().stat(l),onData:l=>(t.add(l),()=>t.delete(l)),onStatus:l=>(e.add(l),()=>e.delete(l))}}const _=(t,e,...n)=>t[e](...n);function tn(){const t=He(),e=nn();let n=t;const i=a=>a===j||a.startsWith(B);return{listPorts:async()=>{const a=await _(t,"listPorts"),s=ne()?await _(e,"listPorts"):[],r=ne()?[{path:j,friendlyName:"＋ Connect a USB board…"}]:[];return[...a,...s,...r]},connect:async a=>{const s=i(a)?e:t;n!==s&&await _(n,"disconnect").catch(()=>{}),n=s,await _(s,"connect",a)},disconnect:async()=>{await _(n,"disconnect")},getStatus:async()=>_(n,"getStatus"),exec:async a=>_(n,"exec",a),eval:async a=>_(n,"eval",a),sendData:async a=>_(n,"sendData",a),runProgram:async a=>_(n,"runProgram",a),sendControl:async(a,s)=>_(n,"sendControl",a,s),interrupt:async()=>_(n,"interrupt"),softReset:async()=>_(n,"softReset"),listDir:async(a="/")=>_(n,"listDir",a),df:async()=>_(n,"df"),readFile:async a=>_(n,"readFile",a),readFileLine:async(a,s)=>_(n,"readFileLine",a,s),readFileBytes:async a=>_(n,"readFileBytes",a),writeFile:async(a,s)=>_(n,"writeFile",a,s),remove:async a=>_(n,"remove",a),mkdir:async a=>_(n,"mkdir",a),rename:async(a,s)=>_(n,"rename",a,s),stat:async a=>_(n,"stat",a),onData:a=>{const s=_(t,"onData",a),r=_(e,"onData",a);return()=>{s(),r()}},onStatus:a=>{const s=_(t,"onStatus",a),r=_(e,"onStatus",a);return()=>{s(),r()}}}}function F(t,e){let n=e.startsWith("/")?e.slice(1):e;if(t){if(n===t)return[];n.startsWith(t+"/")&&(n=n.slice(t.length+1))}const i=[];for(const a of n.split("/"))!a||a==="."||(a===".."?i.pop():i.push(a));return i}function X(t,e){return t.endsWith("/")?t+e:`${t}/${e}`}const an="snakie-web",T="kv",J="lastFolderHandle";function Z(){return new Promise((t,e)=>{const n=indexedDB.open(an,1);n.onupgradeneeded=()=>{n.result.objectStoreNames.contains(T)||n.result.createObjectStore(T)},n.onsuccess=()=>t(n.result),n.onerror=()=>e(n.error)})}async function sn(t){try{const e=await Z();await new Promise((n,i)=>{const a=e.transaction(T,"readwrite");a.objectStore(T).put(t,J),a.oncomplete=()=>n(),a.onerror=()=>i(a.error)}),e.close()}catch{}}async function rn(){try{const t=await Z(),e=await new Promise((n,i)=>{const s=t.transaction(T,"readonly").objectStore(T).get(J);s.onsuccess=()=>n(s.result??null),s.onerror=()=>i(s.error)});return t.close(),e??null}catch{return null}}async function on(){try{const t=await Z();await new Promise((e,n)=>{const i=t.transaction(T,"readwrite");i.objectStore(T).delete(J),i.oncomplete=()=>e(),i.onerror=()=>n(i.error)}),t.close()}catch{}}const ln="Projects";function q(){if("showDirectoryPicker"in window)return!1;const t=globalThis.FileSystemFileHandle;return typeof navigator<"u"&&typeof navigator.storage?.getDirectory=="function"&&!!t&&"createWritable"in t.prototype}function dn(){const t=window,e=async()=>{const p=await navigator.storage.getDirectory();return navigator.storage.persist?.().catch(()=>{}),p.getDirectoryHandle(ln,{create:!0})};let n=null,i="";const a=new Map;let s=0;const r=p=>{const l=`loose://${++s}/${p.name}`;return a.set(l,p),l};let d=null;const u=p=>(n=p,i=p.name,d=null,sn(p),i),o=(async()=>{if(q()){try{n=await e(),i=n.name}catch{}return}try{const p=await rn();if(!p)return;(await p.queryPermission?.({mode:"readwrite"})??"granted")==="granted"?(n=p,i=p.name):d=p}catch{}})(),m=async(p,l=!1)=>{if(await o,!n)throw new Error("No folder is open");let g=n;for(const f of F(i,p))g=await g.getDirectoryHandle(f,{create:l});return g},y=async(p,l=!1)=>{if(a.has(p))return a.get(p);if(p.startsWith("loose://"))throw new Error("That file is no longer available — open it again.");if(await o,!n)throw new Error("No folder is open");const g=F(i,p),f=g.pop();if(f===void 0)throw new Error(`Not a file path: ${p}`);let w=n;for(const P of g)w=await w.getDirectoryHandle(P,{create:l});return w.getFileHandle(f,{create:l})},h=async p=>{const g=await(await p.getFile()).arrayBuffer();return new Uint8Array(g)},c=async p=>{if(a.delete(p)||!n)return;const l=F(i,p),g=l.pop();if(g===void 0)return;let f=n;for(const w of l)f=await f.getDirectoryHandle(w);await f.removeEntry(g,{recursive:!0})},b=async(p,l)=>{let g=!0;try{await y(p)}catch{g=!1}if(g){const w=await h(await y(p)),E=await(await y(l,!0)).createWritable();await E.write(w),await E.close();return}const f=await m(p);await m(l,!0);for await(const[w]of f.entries())await b(X(p,w),X(l,w))};return{openFolderDialog:async()=>{if(!t.showDirectoryPicker){if(!q())return null;try{return await o,n=await e(),i=n.name,i}catch{return null}}try{return u(await t.showDirectoryPicker({mode:"readwrite"}))}catch{return null}},reopenFolderName:async()=>(await o,d?.name??null),reopenFolder:async()=>{if(await o,!d)return null;try{const p=await d.requestPermission?.({mode:"readwrite"})??"granted";return p!=="granted"?(p==="denied"&&(d=null,on()),null):u(d)}catch{return null}},openFileDialog:async()=>{if(!t.showOpenFilePicker)return null;try{const[p]=await t.showOpenFilePicker();return r(p)}catch{return null}},saveFileDialog:async p=>{if(!t.showSaveFilePicker)return null;try{const l=await t.showSaveFilePicker({suggestedName:p});return r(l)}catch{return null}},readDir:async p=>{const l=await m(p),g=[];for await(const[f,w]of l.entries())g.push({name:f,path:X(p,f),isDir:w.kind==="directory"});return g.sort((f,w)=>f.isDir===w.isDir?f.name.localeCompare(w.name):f.isDir?-1:1)},readFile:async p=>(await y(p)).getFile().then(l=>l.text()),readFileBytes:async p=>h(await y(p)),writeFile:async(p,l)=>{const f=await(await y(p,!0)).createWritable();await f.write(l),await f.close()},writeFileBytes:async(p,l)=>{const f=await(await y(p,!0)).createWritable();await f.write(l),await f.close()},mkdir:async p=>{await m(p,!0)},rename:async(p,l)=>{if(p!==l){let g=!1;try{const f=await y(l),w=await y(p);g=!await f.isSameEntry?.(w)}catch{try{await m(l),g=!0}catch{g=!1}}if(g)throw new Error(`"${l.split("/").pop()}" already exists.`)}await b(p,l),await c(p)},remove:async p=>c(p),stat:async p=>{try{const l=await(await y(p)).getFile();return{isDir:!1,size:l.size,mtimeMs:l.lastModified}}catch{return await m(p),{isDir:!0,size:0,mtimeMs:0}}}}}const I="snakie.web.robot-yml",ie=()=>({parts:[],connections:[]}),A=t=>typeof t=="string"&&t.trim().length>0,M=t=>`${t.replace(/[/\\]+$/,"")}/robot.yml`,ae=t=>{const e=t.lastIndexOf("/");return e>0?t.slice(0,e):""};function pn(t){const e=new Map,n=(s,r)=>{const u=(e.get(s)??Promise.resolve()).catch(()=>{}).then(()=>t.writeFile(s,r));return e.set(s,u),u},i=new Set,a=new Set;return{load:async s=>{let r;try{r=A(s)?await t.readFile(M(s)):window.localStorage.getItem(I)??""}catch{return ie()}try{return V(r)}catch{try{A(s)?await t.writeFile(`${M(s)}.bak`,r):window.localStorage.setItem(`${I}.bak`,r)}catch{}return ie()}},save:async(s,r)=>{try{const d=O(r);if(A(s)?await n(M(s),d):window.localStorage.setItem(I,d),A(s)){const u=ee(r)?.urdf;if(u)try{const o=s.replace(/[/\\]+$/,""),m=await t.readFile(`${o}/${u}`),y=Me(Ee(m,ee(r)?.servoJointMap));await t.writeFile(`${o}/skeleton.json`,y)}catch{}}return{ok:!0}}catch(d){return{ok:!1,error:d instanceof Error?d.message:String(d)}}},patchModel:async(s,r)=>{try{let d;try{d=A(s)?await t.readFile(M(s)):window.localStorage.getItem(I)??""}catch{return{ok:!0}}let u;try{u=V(d)}catch{return{ok:!0}}let o=!1;const m={...u.robot??{}};if(r.ensureUrdf&&!m.urdf&&(m.urdf=r.ensureUrdf,m.version=m.version??1,o=!0),r.boardLink&&m.boardLink!==r.boardLink&&(m.boardLink=r.boardLink,m.version=m.version??1,o=!0),r.linkMass?.link&&(m.linkMass={...m.linkMass??{},[r.linkMass.link]:{source:r.linkMass.source}},m.version=m.version??1,o=!0),r.clearOrphans?.length&&m.orphanedLinks?.length){const h=m.orphanedLinks.filter(c=>!r.clearOrphans.includes(c));h.length!==m.orphanedLinks.length&&(h.length?m.orphanedLinks=h:delete m.orphanedLinks,o=!0)}let y=u.parts;if(r.addParts?.length){const h=new Set(["board",...y.map(b=>b.id)]),c=r.addParts.filter(b=>b&&b.id&&b.lib&&b.part&&!h.has(b.id));c.length&&(y=[...y,...c],o=!0)}if(o){const h=O({...u,parts:y,robot:Object.keys(m).length?m:void 0});A(s)?await n(M(s),h):window.localStorage.setItem(I,h);for(const c of i)c()}return{ok:!0}}catch(d){return{ok:!1,error:d instanceof Error?d.message:String(d)}}},patchPartLinks:async(s,r)=>{try{const d=(Array.isArray(r)?r:[]).filter(h=>h&&typeof h.partId=="string"&&typeof h.link=="string"&&h.link);if(d.length===0)return{ok:!0};let u;try{u=A(s)?await t.readFile(M(s)):window.localStorage.getItem(I)??""}catch{return{ok:!0}}let o;try{o=V(u)}catch{return{ok:!0}}let m=!1;const y=o.parts.map(h=>{const c=d.find(b=>b.partId===h.id);return!c||h.urdfLink===c.link?h:(m=!0,{...h,urdfLink:c.link})});if(m){const h=O({...o,parts:y});A(s)?await n(M(s),h):window.localStorage.setItem(I,h);for(const c of i)c()}return{ok:!0}}catch(d){return{ok:!1,error:d instanceof Error?d.message:String(d)}}},importMesh:async(s,r)=>{if(!s)return{error:"No robot file to import into"};if(r)return{error:"Copying external meshes isn't available in the browser"};const d=window.showOpenFilePicker;if(!d)return{error:"Mesh import needs a browser with file pickers (Chromium)"};let u;try{const[o]=await d({types:[{description:"Mesh",accept:{"application/octet-stream":[".stl",".dae"]}}]});u=o}catch{return{cancelled:!0}}try{const o=await u.getFile(),m=new Uint8Array(await o.arrayBuffer()),y=`${ae(s)?ae(s)+"/":""}meshes`;await t.mkdir(y);const h=u.name.lastIndexOf("."),c=h>0?u.name.slice(0,h):u.name,b=h>0?u.name.slice(h):"";let p=u.name;for(let l=1;l<1e3;l++)try{await t.stat(`${y}/${p}`),p=`${c}-${l}${b}`}catch{break}return await t.writeFileBytes(`${y}/${p}`,m),{rel:`meshes/${p}`,name:p}}catch(o){return{error:o instanceof Error?o.message:String(o)}}},importPartMesh:async()=>({error:"Parts libraries are desktop-only, so this part’s 3-D model isn’t available here."}),onChanged:s=>(i.add(s),()=>i.delete(s)),notifyUrdfChanged:()=>{for(const s of a)s()},onUrdfChanged:s=>(a.add(s),()=>a.delete(s))}}const cn={"adafruit-feather-esp32s3":new URL("parts/adafruit-feather-esp32s3-image-QJQGAXaH.png",import.meta.url).href,"adafruit-feather-nrf52840":new URL("parts/adafruit-feather-nrf52840-image-Ce3UCtIG.png",import.meta.url).href,"adafruit-feather-rp2040":new URL("parts/adafruit-feather-rp2040-image-Cjx2_KLg.png",import.meta.url).href,"adafruit-itsybitsy-rp2040":new URL("parts/adafruit-itsybitsy-rp2040-image-B5P0G6zc.png",import.meta.url).href,"adafruit-qt-py-rp2040":new URL("parts/adafruit-qt-py-rp2040-image-Bb-CYC5E.png",import.meta.url).href,"arduino-nano-esp32":new URL("parts/arduino-nano-esp32-image-D13aSzIp.jpg",import.meta.url).href,"battery-aa-4":new URL("parts/battery-aa-4-image-D0temdXg.png",import.meta.url).href,"battery-lipo-1s":new URL("parts/battery-lipo-1s-image-BBMp0Wrc.png",import.meta.url).href,"battery-lipo-2s":new URL("parts/battery-lipo-2s-image-WBCVoPKT.png",import.meta.url).href,"esp32-12f":new URL("parts/esp32-12f-image-B0Yv6nHc.jpg",import.meta.url).href,"esp32-devkit":new URL("parts/esp32-devkit-image-Bs4UwRyJ.jpg",import.meta.url).href,"grove-red-led":new URL("parts/grove-red-led-image-CXDHc4yk.png",import.meta.url).href,"hc-sr04":new URL("parts/hc-sr04-image-DWASJdvE.png",import.meta.url).href,"hr-sr04":new URL("parts/hr-sr04-image-C6nsMiYi.jpg",import.meta.url).href,"modulino-buttons":new URL("parts/modulino-buttons-image-Rw6Fw2I6.png",import.meta.url).href,"modulino-buzzer":new URL("parts/modulino-buzzer-image-DAxivf21.jpg",import.meta.url).href,"modulino-distance":new URL("parts/modulino-distance-image-BwiIsgK3.jpg",import.meta.url).href,"modulino-joystick":new URL("parts/modulino-joystick-image-DM-TKtT1.png",import.meta.url).href,"modulino-knob":new URL("parts/modulino-knob-image-Bq3LkEvd.jpg",import.meta.url).href,"modulino-latch-relay":new URL("parts/modulino-latch-relay-image-B4l2aB8p.jpg",import.meta.url).href,"modulino-led-matrix":new URL("parts/modulino-led-matrix-image-sM1lWDJ4.jpg",import.meta.url).href,"modulino-light":new URL("parts/modulino-light-image-HJVQkzPa.png",import.meta.url).href,"modulino-motors":new URL("parts/modulino-motors-image-CnJfbJzB.jpg",import.meta.url).href,"modulino-movement":new URL("parts/modulino-movement-image-Cuz30mgG.jpg",import.meta.url).href,"modulino-pixels":new URL("parts/modulino-pixels-image-DICIx66E.jpg",import.meta.url).href,"modulino-thermo":new URL("parts/modulino-thermo-image-C1bVxFXi.jpg",import.meta.url).href,"modulino-vibro":new URL("parts/modulino-vibro-image-B4-U6m3s.jpg",import.meta.url).href,mx1508:new URL("parts/mx1508-image-h4qQ0X6x.jpg",import.meta.url).href,"n20-motor":new URL("parts/n20-motor-image-DNQImOFn.png",import.meta.url).href,pca9685:new URL("parts/pca9685-image-BoimMfZ4.png",import.meta.url).href,pico:new URL("parts/pico-image-Bn41SWtI.png",import.meta.url).href,"pico-w":new URL("parts/pico-w-image-C9tJDx8M.png",import.meta.url).href,pico2w:new URL("parts/pico2w-image-BME_Rx_b.png",import.meta.url).href,"seeed-xiao-expansion-base":new URL("parts/seeed-xiao-expansion-base-image-B8CeHSnT.png",import.meta.url).href,"seeed-xiao-rp2040":new URL("parts/seeed-xiao-rp2040-image-CAW0bg7K.png",import.meta.url).href,"seeed-xiao-rp2350":new URL("parts/seeed-xiao-rp2350-image-DKi4TJeu.png",import.meta.url).href,servo2040:new URL("parts/servo2040-image-yh-e9vAf.png",import.meta.url).href,sg90:new URL("parts/sg90-image-Bi_IlpbG.png",import.meta.url).href,tiny2350:new URL("parts/tiny2350-image-C4CBOJj9.png",import.meta.url).href},ce=[{id:"adafruit-feather-esp32s3",name:"Adafruit Feather ESP32-S3",description:"ESP32-S3 Feather (8MB Flash) with USB-C, LiPo charging, STEMMA QT + NeoPixel.",manufacturer:"Adafruit",family:"Microcontroller",mcu:"ESP32-S3",partNumber:"5323",tags:["esp32s3","feather","adafruit","wifi","lipo","stemma-qt"],package:"THT",pinSpacing:2.54,voltage:"3.3V",version:"0.1.0",pcbColor:"#181818",aspect:.4453,dimensions:{width:22.9,height:50.8},ledLabel:"13",onboardLeds:[{kind:"neopixel",gpio:33,power:21,x:.7,y:.62}],image:"image.png",imageLayer:{x:0,y:0,w:1,h:1},headers:[{edge:"left",pins:[{name:"RST",type:"other",number:1,shape:"header",rotation:180,x:.1,y:.137},{name:"3V",type:"pwr",number:2,shape:"header",rotation:180,x:.1,y:.188},{name:"3V",type:"pwr",number:3,shape:"header",rotation:180,x:.1,y:.239},{name:"GND",type:"gnd",number:4,shape:"header",rotation:180,x:.1,y:.29},{name:"A0",type:"io",number:5,gpio:18,capabilities:["digital","pwm","adc"],shape:"header",rotation:180,x:.1,y:.341},{name:"A1",type:"io",number:6,gpio:17,capabilities:["digital","pwm","adc"],shape:"header",rotation:180,x:.1,y:.392},{name:"A2",type:"io",number:7,gpio:16,capabilities:["digital","pwm","adc"],shape:"header",rotation:180,x:.1,y:.443},{name:"A3",type:"io",number:8,gpio:15,capabilities:["digital","pwm","adc"],shape:"header",rotation:180,x:.1,y:.494},{name:"A4",type:"io",number:9,gpio:14,capabilities:["digital","pwm","adc"],shape:"header",rotation:180,x:.1,y:.545},{name:"A5",type:"io",number:10,gpio:8,capabilities:["digital","pwm","adc"],shape:"header",rotation:180,x:.1,y:.596},{name:"SCK",type:"io",number:11,gpio:36,capabilities:["digital","pwm","spi"],signals:{spi:"SCK"},shape:"header",rotation:180,x:.1,y:.647},{name:"MO",type:"io",number:12,gpio:35,capabilities:["digital","pwm","spi"],signals:{spi:"TX"},shape:"header",rotation:180,x:.1,y:.698},{name:"MI",type:"io",number:13,gpio:37,capabilities:["digital","pwm","spi"],signals:{spi:"RX"},shape:"header",rotation:180,x:.1,y:.749},{name:"RX",type:"io",number:14,gpio:38,capabilities:["digital","pwm","uart"],signals:{uart:"RX"},shape:"header",rotation:180,x:.1,y:.8},{name:"TX",type:"io",number:15,gpio:39,capabilities:["digital","pwm","uart"],signals:{uart:"TX"},shape:"header",rotation:180,x:.1,y:.851},{name:"DB",type:"other",number:16,shape:"header",rotation:180,x:.1,y:.902}]},{edge:"right",pins:[{name:"BAT",type:"pwr",number:17,shape:"header",rotation:0,x:.892,y:.367},{name:"EN",type:"other",number:18,shape:"header",rotation:0,x:.892,y:.4205},{name:"USB",type:"pwr",number:19,shape:"header",rotation:0,x:.892,y:.474},{name:"D13",type:"io",number:20,gpio:13,capabilities:["digital","pwm"],shape:"header",rotation:0,x:.892,y:.5275},{name:"D12",type:"io",number:21,gpio:12,capabilities:["digital","pwm"],shape:"header",rotation:0,x:.892,y:.581},{name:"D11",type:"io",number:22,gpio:11,capabilities:["digital","pwm"],shape:"header",rotation:0,x:.892,y:.6345},{name:"D10",type:"io",number:23,gpio:10,capabilities:["digital","pwm"],shape:"header",rotation:0,x:.892,y:.688},{name:"D9",type:"io",number:24,gpio:9,capabilities:["digital","pwm"],shape:"header",rotation:0,x:.892,y:.7415},{name:"D6",type:"io",number:25,gpio:6,capabilities:["digital","pwm"],shape:"header",rotation:0,x:.892,y:.795},{name:"D5",type:"io",number:26,gpio:5,capabilities:["digital","pwm"],shape:"header",rotation:0,x:.892,y:.8485},{name:"SCL",type:"io",number:27,gpio:4,capabilities:["digital","pwm","i2c"],signals:{i2c:"SCL"},buses:{i2c:0},shape:"header",rotation:0,x:.892,y:.902},{name:"SDA",type:"io",number:28,gpio:3,capabilities:["digital","pwm","i2c"],signals:{i2c:"SDA"},buses:{i2c:0},shape:"header",rotation:0,x:.892,y:.9555}]}],helpText:`# Adafruit Feather ESP32-S3

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
`},{id:"adafruit-qt-py-rp2040",name:"Adafruit QT Py RP2040",manufacturer:"Adafruit",family:"Microcontroller",package:"THT",pinSpacing:2.54,voltage:"3.3V",version:"0.1.13",pcbColor:"#0f5a2e",aspect:.5,dimensions:{width:17.8,height:21.8},shape:{kind:"rect",cornerRadius:0},headers:[{edge:"left",pins:[{name:"VCC",type:"pwr",number:14,castellated:!0,shape:"castellated",x:.9286866974058485,y:.1858137242934283},{name:"GND",type:"gnd",number:13,castellated:!0,shape:"castellated",x:.9286866974058485,y:.3005318286372166},{name:"GP0",type:"io",gpio:0,capabilities:["digital","pwm","adc","spi","i2c","uart"],signals:{i2c:"SDA",spi:"CSn",uart:"RX",pwm:"B"},buses:{i2c:0,spi:1,uart:0,adc:3},castellated:!0,shape:"castellated",x:.08095220138438868,y:.1858137242934283},{name:"GP1",type:"io",number:2,gpio:1,capabilities:["digital","pwm","adc","spi","i2c","uart"],signals:{i2c:"SCL",spi:"RX",uart:"TX",pwm:"A"},buses:{i2c:0,spi:1,uart:0,adc:2},castellated:!0,shape:"castellated",x:.08095220138438868,y:.3005318286372166},{name:"3V",type:"pwr",number:12,castellated:!0,shape:"castellated",x:.9286866974058485,y:.4152499329810049},{name:"P5",type:"io",number:11,gpio:5,capabilities:["digital","pwm","spi","i2c","uart"],signals:{i2c:"SCL",spi:"TX",uart:"RX",pwm:"B"},buses:{i2c:1,spi:0,uart:0},castellated:!0,shape:"castellated",x:.9286866974058485,y:.5299680373247933},{name:"MI",type:"io",number:10,gpio:6,capabilities:["digital","pwm","spi","i2c","uart"],signals:{i2c:"SDA",spi:"TX",uart:"TX",pwm:"A"},buses:{i2c:0,spi:0,uart:1},castellated:!0,shape:"castellated",x:.9286866974058485,y:.6446861416685815},{name:"SCK",type:"io",number:9,gpio:7,capabilities:["digital","pwm","spi","i2c","uart"],signals:{i2c:"SDA",spi:"SCK",uart:"TX",pwm:"A"},buses:{i2c:1,spi:0,uart:1},castellated:!0,shape:"castellated",x:.9286866974058485,y:.7594042460123698},{name:"P8",type:"io",number:8,gpio:8,capabilities:["digital","pwm","spi","i2c","uart"],signals:{i2c:"SCL",spi:"CSn",uart:"RX",pwm:"B"},buses:{i2c:0,spi:0,uart:1},castellated:!0,shape:"castellated",x:.9286866974058485,y:.8741223503561582},{name:"A2",type:"io",number:3,gpio:9,capabilities:["digital","pwm","adc","spi","i2c","uart"],signals:{i2c:"SCL",spi:"TX",uart:"RX",pwm:"B"},buses:{i2c:1,spi:1,uart:1,adc:1},castellated:!0,shape:"castellated",x:.08095220138438868,y:.4152499329810049},{name:"A3",type:"io",number:4,gpio:10,capabilities:["digital","pwm","adc","spi","i2c","uart"],signals:{i2c:"SDA",spi:"SCK",uart:"TX",pwm:"A"},buses:{i2c:1,spi:1,uart:1,adc:0},castellated:!0,shape:"castellated",x:.08095220138438868,y:.5299680373247933},{name:"SDA",type:"io",number:5,gpio:11,capabilities:["digital","pwm","spi","i2c","uart"],signals:{i2c:"SDA",spi:"RX",uart:"TX",pwm:"A"},buses:{i2c:0,spi:1,uart:1},castellated:!0,shape:"castellated",x:.08095220138438868,y:.6446861416685815},{name:"SCL",type:"io",number:6,gpio:12,capabilities:["digital","pwm","spi","i2c","uart"],signals:{i2c:"SCL",spi:"CSn",uart:"RX",pwm:"B"},buses:{i2c:0,spi:1,uart:1},castellated:!0,shape:"castellated",x:.08095220138438868,y:.7594042460123698},{name:"TX",type:"io",number:7,gpio:7,capabilities:["digital","pwm","spi","i2c","uart"],signals:{i2c:"SDA",spi:"RX",uart:"TX",pwm:"A"},buses:{i2c:0,spi:0,uart:1},castellated:!0,shape:"castellated",x:.08095220138438868,y:.8741223503561582}]}],buttons:[{label:"BOOT",x:.2895309475976272,y:.5767437654383042},{label:"RESET",x:.7040218128877528,y:.8683166055118337}],onboardLeds:[{kind:"neopixel",x:.7503596344296695,y:.7081935658174402,z:1000002,gpio:12,power:11}],connectors:[{z:0,kind:"qwiic",x:.39455975761337936,y:.9150921092313878,pins:[{name:"GND",type:"gnd"},{name:"3V3",type:"pwr"},{name:"SDA",type:"io",capabilities:["i2c"],signals:{i2c:"SDA"}},{name:"SCL",type:"io",capabilities:["i2c"],signals:{i2c:"SCL"}}]}],footprint:"xiao",image:"image.png",imageLayer:{x:-.0002854276002832237,y:-.0006923226749195807,w:1,h:1},rear:{image:"rear.png"},electrical:{model:"regulator",maxCurrentA:.3,inputRail:"VCC",outputRail:"3V",outputV:3.3,dropoutV:.3},layerVisibility:{pcb:!1,image:!0,holes:!0,pins:!0,components:!0}},{id:"arduino-nano-esp32",name:"Arduino Nano ESP32",description:"Arduino Nano ESP32 Microcontroller",manufacturer:"Arduino",family:"Microcontroller",package:"THT",pinSpacing:2.54,voltage:"3.3V",version:"0.1.17",pcbColor:"#047283",aspect:.5,dimensions:{width:18,height:45},headers:[{edge:"left",pins:[{name:"D13",type:"io",number:1,gpio:48,capabilities:["digital","pwm","spi"],signals:{spi:"SCK"},buses:{spi:0},castellated:!0,shape:"castellated",x:.0701372685504218,y:.10718457839068245},{name:"GND",type:"gnd",number:14,castellated:!0,shape:"castellated",x:.0701372685504218,y:.8458928041609562},{name:"A3",type:"io",number:7,gpio:4,capabilities:["digital","pwm","adc"],buses:{adc:3},castellated:!0,shape:"castellated",x:.0701372685504218,y:.4482770051160719},{name:"A2",type:"io",number:6,gpio:3,capabilities:["digital","pwm","adc"],buses:{adc:2},castellated:!0,shape:"castellated",x:.0701372685504218,y:.3913031267638647},{name:"3v3",type:"pwr",number:2,castellated:!0,shape:"castellated",x:.0701372685504218,y:.1640082880653189},{name:"B0",type:"io",number:3,gpio:46,capabilities:["digital"],buses:{adc:1},castellated:!0,shape:"castellated",x:.0701372685504218,y:.22083199773995535},{name:"A0",type:"io",number:4,gpio:1,capabilities:["digital","pwm","adc"],buses:{adc:0},castellated:!0,shape:"castellated",x:.0701372685504218,y:.2776557074145918},{name:"A1",type:"io",number:5,gpio:2,capabilities:["digital","pwm","adc"],buses:{adc:1},castellated:!0,shape:"castellated",x:.0701372685504218,y:.33447941708922824},{name:"A4",type:"io",number:8,gpio:11,capabilities:["digital","pwm","adc"],buses:{adc:0},castellated:!0,shape:"castellated",x:.0701372685504218,y:.5051257429036368},{name:"A5",type:"io",number:9,gpio:12,capabilities:["digital","pwm","adc"],buses:{adc:1},castellated:!0,shape:"castellated",x:.0701372685504218,y:.5619744806912017},{name:"A6",type:"io",number:10,gpio:13,capabilities:["digital","pwm","adc"],buses:{adc:2},castellated:!0,shape:"castellated",x:.0701372685504218,y:.6185979654624104},{name:"A7",type:"io",number:11,gpio:14,capabilities:["digital","pwm","adc"],buses:{adc:3},castellated:!0,shape:"castellated",x:.0701372685504218,y:.6756719562663315},{name:"vBUS",type:"pwr",number:12,castellated:!0,shape:"castellated",x:.0701372685504218,y:.7325206940538964},{name:"B1",type:"io",number:13,gpio:0,capabilities:["digital"],castellated:!0,shape:"castellated",x:.0701372685504218,y:.7890690944863198},{name:"VIN",type:"pwr",number:15,castellated:!0,shape:"castellated",x:.0701372685504218,y:.9030669074165911},{name:"D12",type:"io",number:30,gpio:47,capabilities:["digital","pwm","spi"],signals:{spi:"RX"},buses:{spi:0},castellated:!0,shape:"castellated",x:.9219723869772518,y:.10718457839068245},{name:"D11",type:"io",number:29,gpio:38,capabilities:["digital","pwm","spi"],signals:{spi:"TX"},buses:{spi:0},castellated:!0,shape:"castellated",x:.9219723869772518,y:.1640082880653189},{name:"D10",type:"io",number:28,gpio:21,capabilities:["digital","pwm"],castellated:!0,shape:"castellated",x:.9219723869772518,y:.22088205396581226},{name:"D9",type:"io",number:27,gpio:18,capabilities:["digital","pwm"],castellated:!0,shape:"castellated",x:.9219723869772518,y:.27773079175337717},{name:"D8",type:"io",number:26,gpio:17,capabilities:["digital","pwm"],castellated:!0,shape:"castellated",x:.9219723869772518,y:.33447941708922824},{name:"d7",type:"io",number:25,gpio:10,capabilities:["digital","pwm"],castellated:!0,shape:"castellated",x:.9219723869772518,y:.3913031267638647},{name:"D6",type:"io",number:24,gpio:9,capabilities:["digital","pwm"],castellated:!0,shape:"castellated",x:.9219723869772518,y:.4482770051160719},{name:"D5",type:"io",number:23,gpio:8,capabilities:["digital","pwm"],castellated:!0,shape:"castellated",x:.9219723869772518,y:.5051257429036368},{name:"D4",type:"io",number:22,gpio:7,capabilities:["digital","pwm"],castellated:!0,shape:"castellated",x:.9219723869772518,y:.5619744806912017},{name:"D3",type:"io",number:21,gpio:6,capabilities:["digital","pwm"],castellated:!0,shape:"castellated",x:.9219723869772518,y:.6188232184787665},{name:"D2",type:"io",number:20,gpio:5,capabilities:["digital","pwm"],castellated:!0,shape:"castellated",x:.9219723869772518,y:.6756719562663315},{name:"GND",type:"gnd",number:19,castellated:!0,shape:"castellated",x:.9219723869772518,y:.7325206940538964},{name:"RST",type:"other",number:18,castellated:!0,shape:"castellated",x:.9219723869772518,y:.7893694318414612},{name:"RX0",type:"io",number:17,gpio:44,capabilities:["digital","pwm","uart"],signals:{uart:"RX"},buses:{uart:0},castellated:!0,shape:"castellated",x:.9219723869772518,y:.8462181696290262},{name:"TX1",type:"io",number:16,gpio:43,capabilities:["digital","pwm","uart"],signals:{uart:"TX"},buses:{uart:0},castellated:!0,shape:"castellated",x:.9219723869772518,y:.9030669074165911}]}],mountingHoles:[{x:.919478460290707,y:.05747644099648589,diameter:1},{x:.06754393256205325,y:.963866637575957,diameter:1},{x:.9224658648725736,y:.9621239849032014,diameter:1},{x:.07206051574456813,y:.054602873114143045,diameter:1}],onboardLeds:[{kind:"single",x:.17098079557005874,y:.052397240963022146,z:0,label:"LED_Builtin",gpio:48,color:"#e99d1c"},{kind:"power",x:.8404210006718591,y:.05078656208307335,z:1,label:"Power"},{kind:"rgb",x:.7258217165432974,y:.26460729847716885,z:2,rgb:{r:46,g:0,b:45}}],image:"image.jpg",imageLayer:{x:.014914905323701766,y:.0013840588261876396,w:.9867877960205077,h:.9846070495099651},rear:{image:"rear.webp"},layerVisibility:{pcb:!1,image:!0,holes:!0,pins:!0,components:!0}},{id:"battery-9v",name:"9V Battery (PP3)",description:"A single 9 V PP3 cell — the classic snap-terminal block, for a regulator or a motor supply.",manufacturer:"Generic",family:"Power",tags:["battery","power","9v","pp3","6lr61"],package:"THT",voltage:"9V",version:"0.1.0",pcbColor:"#26292e",aspect:.546,dimensions:{width:26.5,height:48.5},shape:{kind:"rect",cornerRadiusMm:3},mass_g:45,headers:[{edge:"top",pins:[{name:"V+",type:"pwr",number:1,shape:"header",x:.36,y:.08},{name:"GND",type:"gnd",number:2,shape:"header",x:.64,y:.08}]}],electrical:{model:"source",resistanceOhms:1.7,supplyV:9,maxCurrentA:.5,capacityMah:550,terminals:{positive:"V+",negative:"GND"}},helpText:`# 9V Battery (PP3)

The rectangular block with the snap terminals — properly a **PP3** or **6LR61**.
Nine volts from one cell-sized package, which makes it the obvious choice for a
small project and, more often than not, the wrong one.

## What it is good for

Anything that needs a **regulator in front of it** and draws modest current: a
9 V input into a 5 V or 3.3 V regulator, powering a microcontroller and a couple
of sensors. It is compact, it is everywhere, and 9 V gives a linear regulator
comfortable headroom.

## What it is bad for — motors

A PP3 is a stack of six tiny cells, so it has a **high internal resistance**
(roughly 1.7 Ω fresh, and it climbs as the battery ages) and only about
**550 mAh**. Draw half an amp and the terminal voltage sags by nearly a volt
before it reaches your circuit; draw more and it collapses, browning out the
microcontroller mid-instruction.

That sag is why a robot on a PP3 resets every time its motors start. If you are
driving motors or servos, use **AA cells or a LiPo** — both are modelled in this
library, and both hold their voltage under load in a way this cannot.

Snakie models the internal resistance rather than rounding it away, so the
Electronics workspace shows the sag rather than pretending 9 V arrives intact.

## Terminals

| Pin | What |
|---|---|
| V+ | +9 V — the **smaller** stud on the battery, the socket on the clip |
| GND | 0 V — the **larger** stud, the stud on the clip |

The asymmetric snaps mean a standard clip can only go on one way round, which is
the one genuinely good piece of design in the format.

**Do not short the terminals.** They sit a few millimetres apart on the same
face, and a PP3 will happily push enough current through a dropped screwdriver or
a pocketful of keys to get hot. Snap the cap on, or tape the terminals, when it
is out of the project.

## Rough numbers

| | |
|---|---|
| Nominal | 9 V (alkaline; a fresh one reads ~9.5 V) |
| Flat at | ~6 V — below that a 5 V regulator drops out |
| Capacity | ~550 mAh alkaline, less under heavy load |
| Internal resistance | ~1.7 Ω fresh, rising with age |
| Size | 26.5 × 17.5 × 48.5 mm |
| Mass | ~45 g |

Rechargeable NiMH PP3s exist, but they are **8.4 V** nominal and typically only
150–300 mAh — worse on both counts unless you are cycling them daily.
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
`},{id:"battery-coin-cr2032",name:"CR2032 Coin Cell",description:"3 V lithium coin cell — tiny, low-current; good for RTC/keep-alive, not for motors.",manufacturer:"Generic",family:"Power",tags:["battery","coin","cr2032","power","source"],package:"THT",voltage:"3V",version:"0.1.0",pcbColor:"#2a2d33",dimensions:{width:24,height:24},shape:{kind:"rect",cornerRadius:3},headers:[{edge:"right",pins:[{name:"V+",type:"pwr",shape:"header",x:.92,y:.35},{name:"GND",type:"gnd",shape:"header",x:.92,y:.65}]}],electrical:{model:"source",supplyV:3,resistanceOhms:10,maxCurrentA:.02,capacityMah:220,terminals:{positive:"V+",negative:"GND"}},shapes:[{kind:"circle",x:.42,y:.5,r:.34,fill:"#c9ccd1",stroke:"#8a8f96",strokeWidth:1.5}],labels:[{text:"CR2032",x:.42,y:.5,fontSize:8,color:"#20242a"}]},{id:"battery-lipo-1s",name:"LiPo 1S (3.7 V)",description:"Single-cell lithium-polymer battery (~3.7 V nominal) with a JST connector — light, rechargeable.",manufacturer:"Generic",family:"Power",tags:["battery","lipo","power","source"],package:"THT",voltage:"3.7V",version:"0.1.1",pcbColor:"#3a2740",dimensions:{width:46.7,height:61.5},shape:{kind:"rect",cornerRadius:0},headers:[{edge:"right",pins:[{name:"V+",type:"pwr",shape:"header",x:.5599802456822258,y:.0020063557344324745},{name:"GND",type:"gnd",shape:"header",x:.471945368042069,y:.0020063557344324745}]}],labels:[{text:"LiPo 1S",x:.5220558622211033,y:.20426345376407395,fontSize:20,color:"#ffffff"},{text:"3.7V",x:.5220558622211033,y:.27949616376091446,fontSize:20,color:"#ffffff"}],image:"image.png",imageLayer:{x:.01154561451996916,y:-.00036452798282390897,w:1,h:1},electrical:{model:"source",resistanceOhms:.09,supplyV:3.7,maxCurrentA:5,capacityMah:1200,terminals:{positive:"V+",negative:"GND"}},layerVisibility:{pcb:!1,image:!0,holes:!0,pins:!0,components:!0}},{id:"battery-lipo-2s",name:"LiPo 2S (7.4 V)",description:"Two-cell lithium-polymer battery (~7.4 V nominal) — more headroom for motors and servos.",manufacturer:"Generic",family:"Power",tags:["battery","lipo","power","source"],package:"THT",voltage:"7.4V",version:"0.1.1",pcbColor:"#3a2740",dimensions:{width:34,height:104.5},shape:{kind:"rect",cornerRadius:0},headers:[{edge:"right",pins:[{name:"V+",type:"pwr",shape:"header",x:.9423380200343149,y:.0030997826071346712},{name:"GND",type:"gnd",shape:"header",x:.7601560505533712,y:.0030997826071346712}]}],labels:[{text:"LiPo 2S",x:.5037064250695251,y:.08393176808076747,fontSize:20,color:"#ffffff"},{text:"7.4V",x:.5037064250695251,y:.9425604248046875,fontSize:20,color:"#ffffff"}],image:"image.png",imageLayer:{x:0,y:0,w:1,h:1,opacity:1},electrical:{model:"source",resistanceOhms:.12,supplyV:7.4,maxCurrentA:8,capacityMah:1500,terminals:{positive:"V+",negative:"GND"}},layerVisibility:{pcb:!1,image:!0,holes:!0,pins:!0,components:!0}},{id:"bench-psu",name:"Bench Power Supply",description:"An adjustable bench supply — set the output voltage and a current limit. Wire V+ / GND to your circuit.",manufacturer:"Snakie",family:"Power",tags:["power","psu","supply","bench","source"],package:"THT",voltage:"0–30V",version:"0.1.0",pcbColor:"#20242a",dimensions:{width:70,height:40},shape:{kind:"rect",cornerRadius:3},headers:[{edge:"bottom",pins:[{name:"V+",type:"pwr",shape:"header",x:.36,y:.9},{name:"GND",type:"gnd",shape:"header",x:.64,y:.9}]}],electrical:{model:"source",supplyV:5,supplyRange:[0,30],maxCurrentA:3,resistanceOhms:.05,terminals:{positive:"V+",negative:"GND"}},shapes:[{kind:"rect",x:.14,y:.16,w:.72,h:.4,fill:"#0a0d10",stroke:"#3ad07a",strokeWidth:1.4}],labels:[{text:"BENCH PSU",x:.5,y:.72,fontSize:9,color:"#e9edf1"},{text:"0–30V",x:.5,y:.36,fontSize:11,color:"#3ad07a"}]},{id:"bme280",name:"BME280 Breakout",description:"Bosch BME280 temperature / pressure / humidity sensor on an I²C breakout.",manufacturer:"Pimoroni",family:"Sensor",tags:["sensor","i2c","environmental","temperature","pressure","humidity"],package:"THT",pinSpacing:2.54,voltage:"2-6V",partNumber:"BME280",properties:{interface:"I²C (0x76 default, 0x77 via ADDR)",measures:"temperature, pressure, humidity",connectors:'0.1" header + Qw/ST (Qwiic / STEMMA QT)'},version:"0.1.0",pcbColor:"#1b1b1b",aspect:1,dimensions:{width:19,height:19},shape:{kind:"rect",cornerRadius:2},headers:[{edge:"bottom",pins:[{number:1,name:"2-6V",label:"2-6V",type:"pwr",shape:"header",x:.1,y:.88},{number:2,name:"SDA",label:"SDA",type:"io",capabilities:["i2c"],signals:{i2c:"SDA"},shape:"header",x:.3,y:.88},{number:3,name:"SCL",label:"SCL",type:"io",capabilities:["i2c"],signals:{i2c:"SCL"},shape:"header",x:.5,y:.88},{number:4,name:"INT",label:"INT",type:"io",shape:"header",x:.7,y:.88},{number:5,name:"GND",label:"GND",type:"gnd",shape:"header",x:.9,y:.88}]}],shapes:[{kind:"rect",x:.05,y:.06,w:.9,h:.82,fill:"#1b1b1b",stroke:"#3a3a3a",strokeWidth:1,cornerRadius:3,z:0},{kind:"rect",x:.34,y:0,w:.32,h:.07,fill:"#e8e4d8",stroke:"#b8b4a8",strokeWidth:1,cornerRadius:1,z:1},{kind:"rect",x:.4,y:.36,w:.2,h:.2,fill:"#b8bcc2",stroke:"#7a7d82",strokeWidth:1,cornerRadius:1,z:2}],labels:[{text:"BME280",x:.5,y:.22,fontSize:9,color:"#e6e6e6",z:3}],i2cAddresses:[118,119],library:{module:"bme280"},drivers:[{source:"bme280.py",target:"lib/bme280.py",label:"BME280 driver"}],layerVisibility:{pcb:!1,image:!1,holes:!0,pins:!0,components:!0},helpText:`---
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
`},{id:"esp32-devkit",name:"ESP32 DevKit",description:"ESP32-WROOM-32 development board with 2.4GHz Wi-Fi + Bluetooth.",manufacturer:"Espressif",family:"Microcontroller",tags:["esp32","wifi","bluetooth"],package:"THT",pinSpacing:2.54,voltage:"2.3–3.6V",version:"1.0.8",mcu:"ESP32",pcbColor:"#1b2733",aspect:.42,dimensions:{width:28.5,height:52.4},headers:[{edge:"left",pins:[{name:"3V3",type:"pwr",number:1,shape:"round",rotation:180,x:.05528547911377707,y:.19869956567789382},{name:"GND",type:"gnd",number:2,shape:"round",x:.05528547911377707,y:.24806882896759133},{name:"D15",type:"io",number:3,gpio:15,capabilities:["digital","adc"],buses:{adc:3},shape:"round",x:.05528547911377707,y:.29743809225728884},{name:"D2",type:"io",number:4,gpio:2,capabilities:["digital","adc"],buses:{adc:2},shape:"round",x:.05528547911377707,y:.34680735554698633},{name:"D4",type:"io",number:5,gpio:4,capabilities:["digital","adc"],buses:{adc:1},shape:"round",x:.05528547911377707,y:.39617661883668387},{name:"RX2",type:"io",number:6,gpio:16,capabilities:["digital","pwm","uart"],signals:{uart:"RX"},buses:{uart:2,adc:0},shape:"round",x:.05528547911377707,y:.44554588212638135},{name:"TX2",type:"io",number:7,gpio:17,capabilities:["digital","pwm","uart"],signals:{uart:"TX"},buses:{uart:2},shape:"round",x:.05528547911377707,y:.49491514541607884},{name:"D5",type:"io",number:8,gpio:5,capabilities:["digital","pwm","spi"],signals:{spi:"CSn"},buses:{spi:0},shape:"round",x:.05528547911377707,y:.5442844087057763},{name:"D18",type:"io",number:9,gpio:18,capabilities:["digital","pwm","spi"],signals:{spi:"SCK"},buses:{spi:0},shape:"round",x:.05528547911377707,y:.5936536719954739},{name:"D19",type:"io",number:10,gpio:19,capabilities:["digital","pwm","spi"],signals:{spi:"RX"},buses:{spi:0},shape:"round",x:.05528547911377707,y:.6430229352851713},{name:"IO27",type:"io",number:11,gpio:27,capabilities:["digital","pwm","adc"],shape:"round",x:.05528547911377707,y:.6923921985748689},{name:"IO14",type:"io",number:12,gpio:14,capabilities:["digital","pwm","spi"],shape:"round",x:.05528547911377707,y:.7417614618645664},{name:"IO12",type:"io",number:13,gpio:12,capabilities:["digital","pwm","spi"],shape:"round",x:.05528547911377707,y:.7911307251542639},{name:"GND",type:"gnd",number:14,shape:"round",x:.05528547911377707,y:.8404999884439613},{name:"IO13",type:"io",number:15,gpio:13,capabilities:["digital","pwm","spi"],signals:{spi:"TX"},buses:{spi:0},shape:"round",rotation:180,x:.05528547911377707,y:.8898692517336589}]},{edge:"right",pins:[{name:"VIN",type:"pwr",number:30,shape:"round",rotation:0,x:.94,y:.19869956567789382},{name:"GND",type:"gnd",number:29,shape:"round",x:.94,y:.24806882896759133},{name:"D13",type:"io",number:28,gpio:13,capabilities:["digital","pwm","adc"],buses:{adc:4},shape:"round",x:.94,y:.29743809225728884},{name:"D12",type:"io",number:27,gpio:12,capabilities:["digital","pwm","adc"],buses:{adc:5},shape:"round",x:.94,y:.34680735554698633},{name:"D14",type:"io",number:26,gpio:1,capabilities:["digital","adc"],buses:{adc:6},shape:"round",x:.94,y:.39617661883668387},{name:"D27",type:"io",number:25,gpio:27,capabilities:["digital","adc"],buses:{adc:7},shape:"round",x:.94,y:.44554588212638135},{name:"D26",type:"io",number:24,gpio:26,capabilities:["digital","pwm","adc"],buses:{adc:9},shape:"round",x:.94,y:.49491514541607884},{name:"D25",type:"io",number:23,gpio:25,capabilities:["digital","pwm","adc"],buses:{adc:8},shape:"round",x:.94,y:.5442844087057763},{name:"D33",type:"io",number:22,gpio:33,capabilities:["digital","pwm","adc"],buses:{adc:5},shape:"round",x:.94,y:.5936536719954739},{name:"D32",type:"io",number:21,gpio:32,capabilities:["digital","pwm","adc"],buses:{adc:4},shape:"round",x:.94,y:.6430229352851713},{name:"D35",type:"io",number:20,gpio:135,capabilities:["digital","pwm","adc"],buses:{adc:7},shape:"round",x:.94,y:.6923921985748689},{name:"D34",type:"io",number:19,gpio:34,capabilities:["digital","pwm","adc"],buses:{adc:6},shape:"round",x:.94,y:.7417614618645664},{name:"VN",type:"io",number:18,gpio:39,capabilities:["digital","pwm","adc"],buses:{adc:3},shape:"round",x:.94,y:.7911307251542639},{name:"VP",type:"io",number:17,gpio:36,capabilities:["digital","pwm","adc"],buses:{adc:0},shape:"round",x:.94,y:.8404999884439613},{name:"EN",type:"other",number:16,shape:"round",rotation:0,x:.94,y:.8898692517336589}]}],mountingHoles:[{x:.09386489784188348,y:.05629657995792545,diameter:1.5},{x:.919667522418931,y:.05629657995792545,diameter:1.5}],ledLabel:"2",image:"image.jpg",imageLayer:{x:-.0020095022065775847,y:-.00030357641056547036,w:1,h:1},electrical:{model:"regulator",maxCurrentA:.3,terminals:{positive:"VIN",negative:"GND"},inputRail:"VIN",outputRail:"3V3",outputV:3.3,dropoutV:.03},layerVisibility:{pcb:!1,image:!0,holes:!0,pins:!0,components:!0},helpText:`# ESP32 DevKit

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
`},{id:"grove-6axis-lsm6ds3",name:"Grove 6-Axis Accel & Gyro",description:"LSM6DS3 3-axis accelerometer + 3-axis gyroscope on a Grove I²C module.",manufacturer:"Seeed Studio",family:"Sensor",tags:["grove","seeed","imu","accelerometer","gyroscope","i2c","lsm6ds3"],package:"THT",pinSpacing:2,voltage:"3.3-5V",partNumber:"LSM6DS3",properties:{interface:"I²C (0x6A default, 0x6B with SA0 high)",measures:"acceleration (±2/4/8/16 g), angular rate (±125…2000 dps)",whoami:"register 0x0F reads 0x69"},version:"0.1.2",pcbColor:"#1b4d3e",aspect:1,dimensions:{width:20,height:20},shape:{kind:"rect",cornerRadius:2},headers:[],connectors:[{kind:"grove",variant:"i2c",label:"I2C",x:.5,y:.88,pins:[{name:"SCL",type:"io",capabilities:["i2c"],signals:{i2c:"SCL"}},{name:"SDA",type:"io",capabilities:["i2c"],signals:{i2c:"SDA"}},{name:"VCC",type:"pwr"},{name:"GND",type:"gnd"}]}],shapes:[{kind:"rect",x:.04,y:.04,w:.92,h:.92,fill:"#1b4d3e",stroke:"#0f3227",strokeWidth:1,cornerRadius:3,z:0},{kind:"rect",x:.38,y:.32,w:.24,h:.24,fill:"#1c2227",stroke:"#454b52",strokeWidth:1,cornerRadius:1,z:1}],labels:[{text:"LSM6DS3",x:.5,y:.19,fontSize:6,color:"#cfe8dc",z:2}],mountingHoles:[{x:.12,y:.5,diameter:2},{x:.88,y:.5,diameter:2}],i2cAddresses:[106,107],library:{module:"lsm6ds3"},drivers:[{source:"module:lsm6ds3",target:"lib/lsm6ds3.py",label:"LSM6DS3 IMU driver"}],layerVisibility:{pcb:!1,image:!1,holes:!0,pins:!0,components:!0},helpText:`# Grove 6-Axis Accelerometer & Gyroscope

An **LSM6DS3** — 3-axis accelerometer plus 3-axis gyroscope — on a Grove I²C
module. Plug it into any Grove **I²C** port.

## Address

The silk says \`0x6A\`, which is the address with \`SA0\` low. Most units ship with
\`SA0\` pulled **high**, so they answer on **\`0x6B\`**. Check both.

\`WHO_AM_I\` (register \`0x0F\`) returns **\`0x69\`** on a healthy LSM6DS3. If the
device ACKs its address but \`WHO_AM_I\` reads \`0xFF\`, that's a marginal Grove
cable, not a dead sensor — reseat it.

> **Which pins?** The Grove I²C port is \`D4\`/\`D5\` on every XIAO, but the GPIO
> numbers behind those silk names are board-specific — a XIAO **RP2040/RP2350**
> is \`sda=Pin(6), scl=Pin(7)\`, a XIAO **ESP32-S3** is \`sda=Pin(5), scl=Pin(6)\`.
> Get it wrong and nothing answers: there is no error, just an empty \`scan()\`.

\`\`\`python
from machine import Pin, I2C
i2c = I2C(1, sda=Pin(5), scl=Pin(6), freq=400_000)   # XIAO ESP32-S3

addr = next((a for a in (0x6B, 0x6A) if a in i2c.scan()), None)
print("IMU at", hex(addr), "who_am_i", hex(i2c.readfrom_mem(addr, 0x0F, 1)[0]))
\`\`\`

## Reading it

The sensor powers up asleep — you must set an output data rate before either
sensor returns anything but zeros.

\`\`\`python
i2c.writeto_mem(addr, 0x10, b"\\x40")   # CTRL1_XL: accel 104 Hz, +/-2 g
i2c.writeto_mem(addr, 0x11, b"\\x40")   # CTRL2_G:  gyro  104 Hz, 245 dps

def s16(lo, hi):
    v = lo | (hi << 8)
    return v - 65536 if v & 0x8000 else v

d = i2c.readfrom_mem(addr, 0x28, 6)    # OUTX_L_XL .. OUTZ_H_XL
ax, ay, az = (s16(d[i], d[i + 1]) * 0.000061 for i in (0, 2, 4))   # g
g = i2c.readfrom_mem(addr, 0x22, 6)    # OUTX_L_G .. OUTZ_H_G
gx, gy, gz = (s16(g[i], g[i + 1]) * 0.00875 for i in (0, 2, 4))    # dps
\`\`\`

Scale factors are for the ranges set above: **0.061 mg/LSB** at ±2 g and
**8.75 mdps/LSB** at 245 dps. Change the range and the factor changes with it.

## Gyro drift

The gyro has a constant bias — leave the board still and it will still report a
few tenths of a degree per second. Average a few hundred samples at startup while
the robot is stationary and subtract that offset, or any heading you integrate
will wander.

## Mounted on its side?

The tilt maths assumes the module lies **flat, component face up**. A chassis
rarely allows that, and a module on its edge reports gravity on Y instead of Z —
which shows up as a permanent ~90° roll, and sends rotations to the wrong axis of
the IMU panel. Nothing is broken; the sensor is simply rotated.

Tell the driver how it is mounted and every reading arrives in the board's frame:

\`\`\`python
imu = LSM6DS3(i2c, addr=0x6B, axes=('x', 'z', '-y'))   # module on its edge
\`\`\`

### Working the map out

Hold the board still, as mounted, and ask:

\`\`\`python
print(lsm6ds3.axes_for_resting(imu.accel()))     # -> ('x', 'z', '-y')
\`\`\`

Gravity fixes which way is **up**, and that is all it can fix — rotating about
vertical leaves the reading identical, which is the same reason yaw is
unobservable. So a single reading gets roll and pitch upright but has to guess the
remaining quarter-turn: guess wrong and tilting the nose up still reads as roll.

A wrong guess there is what **"roll and pitch are swapped"** looks like: tilt the
nose up and it reads as roll. Four right-handed maps fit any resting reading —
they differ only by that quarter-turn — so don't try the other three by hand.

A second pose settles it. Take one reading level, then one with the robot's
**forward** direction pointing at the floor:

\`\`\`python
from lsm6ds3 import LSM6DS3, axes_from_two

imu = LSM6DS3(i2c, addr=0x6A)          # no axes= — calibration needs the raw frame

input("hold the robot LEVEL, then press Enter")
level = imu.raw_accel()
input("now point its NOSE at the floor, then press Enter")
nose = imu.raw_accel()

print("axes =", axes_from_two(level, nose))
\`\`\`

Use \`raw_accel()\`, not \`accel()\`. A reading that has already been through an
\`axes\` map yields a map relative to that one — it looks like it worked, and is
wrong by exactly the correction already in force.

A mirrored (left-handed) map is refused rather than used: it puts gravity exactly
where you want it, so it looks right on a stationary board, and then turns every
rotation backwards.

## Yaw always reads 0

This is a **6-axis** part — accelerometer + gyroscope, no magnetometer. Roll and
pitch come from where gravity sits, but rotating about the gravity vector doesn't
change gravity, so yaw cannot be measured at all. It is not a calibration problem.
For a real heading you need a 9-axis part (\`icm20948\`, \`bno055\`) or gyro
integration, which drifts.
`},{id:"grove-button",name:"Grove Button",description:"Momentary push-button on a Grove digital module — reads HIGH while pressed.",manufacturer:"Seeed Studio",family:"Input",tags:["grove","seeed","button","switch","digital"],package:"THT",pinSpacing:2,voltage:"3.3-5V",partNumber:"111020000",properties:{interface:"digital (HIGH while pressed)",type:"momentary, normally open"},version:"0.1.0",pcbColor:"#1b4d3e",aspect:1,dimensions:{width:20,height:20},shape:{kind:"rect",cornerRadius:2},headers:[],connectors:[{kind:"grove",variant:"digital",label:"SIG",x:.5,y:.88,pins:[{name:"SIG",type:"io",capabilities:["digital"]},{name:"NC",type:"other"},{name:"VCC",type:"pwr"},{name:"GND",type:"gnd"}]}],buttons:[{x:.5,y:.42,label:"BTN"}],shapes:[{kind:"rect",x:.04,y:.04,w:.92,h:.92,fill:"#1b4d3e",stroke:"#0f3227",strokeWidth:1,cornerRadius:3,z:0}],mountingHoles:[{x:.12,y:.5,diameter:2},{x:.88,y:.5,diameter:2}],layerVisibility:{pcb:!1,image:!1,holes:!0,pins:!0,components:!0}},{id:"grove-buzzer",name:"Grove Buzzer",description:"Piezo buzzer on a Grove digital module — drive it with PWM for tones.",manufacturer:"Seeed Studio",family:"Output",tags:["grove","seeed","buzzer","piezo","sound","pwm"],package:"THT",pinSpacing:2,voltage:"3.3-5V",partNumber:"107020000",properties:{interface:"digital / PWM (drive the pin to sound it)",type:"magnetic buzzer"},version:"0.1.0",pcbColor:"#1b4d3e",aspect:1,dimensions:{width:20,height:20},shape:{kind:"rect",cornerRadius:2},headers:[],connectors:[{kind:"grove",variant:"digital",label:"SIG",x:.5,y:.88,pins:[{name:"SIG",type:"io",capabilities:["digital","pwm"]},{name:"NC",type:"other"},{name:"VCC",type:"pwr"},{name:"GND",type:"gnd"}]}],shapes:[{kind:"rect",x:.04,y:.04,w:.92,h:.92,fill:"#1b4d3e",stroke:"#0f3227",strokeWidth:1,cornerRadius:3,z:0},{kind:"circle",x:.24,y:.18,w:.52,h:.52,fill:"#1a1d21",stroke:"#0b0d10",strokeWidth:1,z:1},{kind:"circle",x:.46,y:.4,w:.08,h:.08,fill:"#4a4f56",stroke:"none",strokeWidth:0,z:2}],mountingHoles:[{x:.12,y:.5,diameter:2},{x:.88,y:.5,diameter:2}],layerVisibility:{pcb:!1,image:!1,holes:!0,pins:!0,components:!0}},{id:"grove-i2c-motor-tb6612",name:"Grove I²C Motor Driver (TB6612FNG)",description:"Dual DC / single stepper motor driver on a Grove I²C module, command-driven via an onboard MCU.",manufacturer:"Seeed Studio",family:"Motor",tags:["grove","seeed","motor","driver","i2c","tb6612"],package:"THT",pinSpacing:2,voltage:"4.5-13.5V",partNumber:"TB6612FNG",properties:{interface:"I²C (0x14 default, settable 0x01–0x7F)",channels:"2 DC motors, or 1 stepper",current:"1.2 A continuous per channel"},version:"0.1.2",pcbColor:"#1b4d3e",aspect:1.333,dimensions:{width:40,height:30},shape:{kind:"rect",cornerRadius:2},headers:[{edge:"top",pins:[{number:1,name:"VM",label:"VM",type:"pwr",shape:"header",x:.12,y:.12},{number:2,name:"GND",label:"GND",type:"gnd",shape:"header",x:.3,y:.12},{number:3,name:"A1",label:"A1",type:"other",shape:"header",x:.55,y:.12},{number:4,name:"A2",label:"A2",type:"other",shape:"header",x:.73,y:.12},{number:5,name:"B1",label:"B1",type:"other",shape:"header",x:.55,y:.88},{number:6,name:"B2",label:"B2",type:"other",shape:"header",x:.73,y:.88}]}],connectors:[{kind:"grove",variant:"i2c",label:"I2C",x:.18,y:.62,pins:[{name:"SCL",type:"io",capabilities:["i2c"],signals:{i2c:"SCL"}},{name:"SDA",type:"io",capabilities:["i2c"],signals:{i2c:"SDA"}},{name:"VCC",type:"pwr"},{name:"GND",type:"gnd"}]}],shapes:[{kind:"rect",x:.03,y:.04,w:.94,h:.92,fill:"#1b4d3e",stroke:"#0f3227",strokeWidth:1,cornerRadius:3,z:0},{kind:"rect",x:.42,y:.38,w:.26,h:.2,fill:"#1c2227",stroke:"#454b52",strokeWidth:1,cornerRadius:1,z:1},{kind:"rect",x:.74,y:.4,w:.17,h:.17,fill:"#1c2227",stroke:"#454b52",strokeWidth:1,cornerRadius:1,z:1},{kind:"rect",x:.06,y:.04,w:.3,h:.16,fill:"#2f6fb3",stroke:"#1d4874",strokeWidth:1,cornerRadius:1,z:1},{kind:"rect",x:.5,y:.04,w:.3,h:.16,fill:"#2f6fb3",stroke:"#1d4874",strokeWidth:1,cornerRadius:1,z:1},{kind:"rect",x:.5,y:.8,w:.3,h:.16,fill:"#2f6fb3",stroke:"#1d4874",strokeWidth:1,cornerRadius:1,z:1}],labels:[{text:"TB6612FNG",x:.55,y:.66,fontSize:6,color:"#cfe8dc",z:2}],i2cAddresses:[20],library:{module:"tb6612"},drivers:[{source:"module:tb6612",target:"lib/tb6612.py",label:"TB6612 motor driver"}],layerVisibility:{pcb:!1,image:!1,holes:!0,pins:!0,components:!0},helpText:`# Grove I²C Motor Driver (TB6612FNG)

Drives **two DC motors** or **one stepper** from a Grove I²C port. A TB6612FNG
H-bridge does the switching; an onboard MCU takes the I²C commands.

## Address

**\`0x14\` as shipped**, but the address is settable anywhere in \`0x01–0x7F\` and is
stored on the module — so a second-hand or reconfigured unit can turn up anywhere
on the bus. If a scan shows an address you can't account for, this is often it.

## It is command-driven, not register-mapped

This is the part that catches people out. You **write command bytes**; you don't
read or write registers. Probing it with a register read returns \`0xFF\` and looks
like a dead device even when it's working perfectly.

| Command | Bytes |
|---|---|
| Wake (not-standby) | \`[0x05, 0x00]\` |
| Standby | \`[0x04, 0x00]\` |
| Run clockwise | \`[0x02, channel, speed]\` |
| Run counter-clockwise | \`[0x03, channel, speed]\` |
| Stop (coast) | \`[0x01, channel]\` |
| Brake | \`[0x00, channel]\` |

\`channel\` is \`0\` for motor A, \`1\` for motor B. \`speed\` is \`0–255\`.

> **Which pins?** The Grove I²C port is \`D4\`/\`D5\` on every XIAO, but the GPIO
> numbers behind those silk names are board-specific — a XIAO **RP2040/RP2350**
> is \`sda=Pin(6), scl=Pin(7)\`, a XIAO **ESP32-S3** is \`sda=Pin(5), scl=Pin(6)\`.
> Get it wrong and nothing answers: there is no error, just an empty \`scan()\`.

\`\`\`python
from machine import Pin, I2C
import time

i2c = I2C(1, sda=Pin(5), scl=Pin(6), freq=100_000)   # XIAO ESP32-S3
MOTOR = 0x14                       # or wherever yours scanned

def motor(ch, speed):              # speed -255..255
    cmd = 0x02 if speed >= 0 else 0x03
    i2c.writeto(MOTOR, bytes([cmd, ch, min(255, abs(speed))]))

i2c.writeto(MOTOR, bytes([0x05, 0x00]))   # wake it first, or nothing moves
motor(0, 200)
time.sleep(1)
i2c.writeto(MOTOR, bytes([0x01, 0]))      # stop
\`\`\`

**Wake it before driving.** The module boots in standby and silently ignores run
commands until it gets \`[0x05, 0x00]\`.

## Power

Motor supply goes to the \`VM\` / \`GND\` screw terminals — **4.5 V to 13.5 V**, and
it must be a supply that can deliver the stall current of both motors. Don't try
to run motors off the Grove port's \`VCC\`: that's logic power, and browning it out
resets the microcontroller mid-drive.

Continuous current is **1.2 A per channel**. Small geared motors (N20 and
similar) are comfortably inside that; anything larger needs a different driver.
`},{id:"grove-led-bar",name:"Grove LED Bar",description:"10-segment LED bargraph driven by an MY9221 over a 2-wire clock/data interface.",manufacturer:"Seeed Studio",family:"Output",tags:["grove","seeed","led","bargraph","my9221","digital"],package:"THT",pinSpacing:2,voltage:"3.3-5V",partNumber:"MY9221",properties:{interface:"2-wire (clock + data), NOT I²C",segments:"10 (green x8, then orange, then red on v2)"},version:"0.1.2",pcbColor:"#1b4d3e",aspect:3.05,dimensions:{width:61,height:20},shape:{kind:"rect",cornerRadius:2},headers:[],connectors:[{kind:"grove",variant:"digital",label:"DCKI/DI",x:.1,y:.5,rotation:90,pins:[{name:"DCKI",type:"io",capabilities:["digital"]},{name:"DI",type:"io",capabilities:["digital"]},{name:"VCC",type:"pwr"},{name:"GND",type:"gnd"}]}],shapes:[{kind:"rect",x:.01,y:.04,w:.98,h:.92,fill:"#1b4d3e",stroke:"#0f3227",strokeWidth:1,cornerRadius:3,z:0},{kind:"rect",x:.21,y:.66,w:.12,h:.22,fill:"#1c2227",stroke:"#454b52",strokeWidth:1,cornerRadius:1,z:1}],labels:[{text:"LED BAR",x:.6,y:.86,fontSize:5,color:"#cfe8dc",z:3}],onboardLeds:[{kind:"single",label:"1",x:.24,y:.36,color:"#3ec46d",sizeMm:2.5},{kind:"single",label:"2",x:.31,y:.36,color:"#3ec46d",sizeMm:2.5},{kind:"single",label:"3",x:.38,y:.36,color:"#3ec46d",sizeMm:2.5},{kind:"single",label:"4",x:.45,y:.36,color:"#3ec46d",sizeMm:2.5},{kind:"single",label:"5",x:.52,y:.36,color:"#3ec46d",sizeMm:2.5},{kind:"single",label:"6",x:.59,y:.36,color:"#3ec46d",sizeMm:2.5},{kind:"single",label:"7",x:.66,y:.36,color:"#3ec46d",sizeMm:2.5},{kind:"single",label:"8",x:.73,y:.36,color:"#3ec46d",sizeMm:2.5},{kind:"single",label:"9",x:.8,y:.36,color:"#e8a33d",sizeMm:2.5},{kind:"single",label:"10",x:.87,y:.36,color:"#e0483d",sizeMm:2.5}],library:{module:"my9221"},drivers:[{source:"module:my9221",target:"lib/my9221.py",label:"MY9221 LED bar driver"}],layerVisibility:{pcb:!1,image:!1,holes:!0,pins:!0,components:!0},helpText:`# Grove LED Bar

Ten LED segments — eight green, then orange, then red — driven by an **MY9221**
LED driver over a 2-wire clock/data interface on a Grove **digital** port.

## Not I²C

Despite having two signal lines, this is **not** an I²C device and will never
appear in an \`i2c.scan()\`. It's a shift-register-style protocol: you clock 16 bits
of command followed by 12 bits per channel, latching at the end.

**Contact 1 is the clock (\`DCKI\`), contact 2 is the data (\`DI\`).** Swapping them
is the usual reason a freshly wired bar lights nothing at all — there's no
acknowledgement to tell you it's backwards.

## Driving it

\`\`\`python
from machine import Pin

class LedBar:
    def __init__(self, clk, data):
        self.clk = Pin(clk, Pin.OUT)
        self.dat = Pin(data, Pin.OUT)
        self._state = 0

    def _send16(self, bits):
        for i in range(15, -1, -1):
            self.dat.value((bits >> i) & 1)
            self.clk.value(not self.clk.value())   # MY9221 clocks on each edge

    def _latch(self):
        self.dat.low()
        for _ in range(4):
            self.dat.high()
            self.dat.low()

    def level(self, n):
        """Light the first n of 10 segments."""
        self._send16(0x0000)                       # command: 8-bit grayscale
        for i in range(12):
            self._send16(0xFF if i < n else 0x00)
        self._latch()

bar = LedBar(clk=26, data=27)
bar.level(7)
\`\`\`

Twelve channels are clocked out even though only ten are populated — the MY9221
drives 12 and the last two go nowhere.

## Using it as a gauge

The colour run is deliberate: eight green, one orange, one red. It reads
naturally as a **level with a warning zone at the top**, so it suits distance,
battery state or a control-loop error far better than it suits a progress bar.
`},{id:"grove-red-led",name:"Grove Red LED",description:"5 mm red LED in a swappable holder on a Grove digital module, with an on-board trimmer for brightness.",manufacturer:"Seeed Studio",family:"Output",tags:["grove","seeed","led","indicator","digital","pwm"],package:"THT",pinSpacing:2,voltage:"3.3-5V",partNumber:"104030005",properties:{interface:"digital (HIGH lights it) — or PWM for brightness",led:"5 mm red, plugged into a holder rather than soldered",brightness:"on-board trimmer (R2) sets the series resistance"},version:"0.1.3",pcbColor:"#1e4a72",aspect:1,dimensions:{width:24,height:20},shape:{kind:"rect",cornerRadiusMm:1.5},mountingHoles:[{x:.07938733418782551,y:.501978515625,diameter:1},{x:.9184126790364583,y:.501978515625,diameter:1}],labels:[{text:"+",x:.05,y:.94,z:3,fontSize:7,color:"#cfe0f0"}],onboardLeds:[{kind:"single",x:.23857162475585936,y:.7822380371093751,z:3000001,color:"#d53f3f",sizeMm:5}],connectors:[{kind:"grove",variant:"digital",label:"J1",x:.505,y:.163,pins:[{name:"SIG",type:"io",capabilities:["digital","pwm"]},{name:"NC",type:"other"},{name:"VCC",type:"pwr"},{name:"GND",type:"gnd"}]}],ledLabel:"LED",image:"image.png",imageLayer:{x:-.00028734842936198324,y:-.0007436523437499565,w:1,h:1},rear:{image:"rear.png"},layerVisibility:{pcb:!1,image:!0,holes:!0,pins:!0,components:!0},headers:[],helpText:`# Grove Red LED

A 5 mm red LED on a Grove **digital** port. Drive the \`SIG\` contact high to light
it — there's nothing to talk to and no driver to install, so it's the quickest
way to get something visible out of a fresh board.

## The trimmer is the first thing to check

\`R2\` is an on-board potentiometer in series with the LED, and it ships part-way
round. If the LED looks dim, or stays dark on a 3.3 V board while it works fine
on 5 V, **turn R2 before you doubt the code** — it's setting the current, and at
one end of its travel there isn't enough left to light anything.

That trimmer is also what lets the module take a wide range of supply voltages
without you soldering a different resistor each time.

## The LED is in a holder, not soldered

It plugs into a two-pin holder, so you can pull the red one out and drop in any
5 mm LED you like — the module is sold as red, green, blue, white and purple and
they are otherwise the same board. The **long leg is the anode** and goes in the
hole nearest the \`+\` on the silk. In backwards, it simply never lights.

## Wiring

| Grove contact | Colour | Board pin |
|---------------|--------|-----------|
| SIG | yellow | any GPIO |
| NC | white | — (not connected) |
| VCC | red | 3V3 or 5V |
| GND | black | GND |

## MicroPython

On and off — \`machine.Pin\` is built in, so there's nothing to install:

\`\`\`python
from machine import Pin
from time import sleep

led = Pin(16, Pin.OUT)

while True:
    led.toggle()
    sleep(0.5)
\`\`\`

Because \`SIG\` is just a GPIO, PWM gives you brightness in software as well as at
the trimmer:

\`\`\`python
from machine import Pin, PWM
from time import sleep_ms

led = PWM(Pin(16))
led.freq(1000)

while True:                       # breathe
    for duty in list(range(0, 65535, 1024)) + list(range(65535, 0, -1024)):
        led.duty_u16(duty)
        sleep_ms(8)
\`\`\`

The trimmer sets the *ceiling*; the duty cycle scales what's underneath it. Wind
R2 up to full first if a fade looks like it stops short of bright.

## Links

- [Product page](https://www.seeedstudio.com/Grove-Red-LED.html) (SKU 104030005)
- [Seeed wiki](https://wiki.seeedstudio.com/Grove-Red_LED/)
`},{id:"grove-ultrasonic-ranger",name:"Grove Ultrasonic Ranger",description:"Ultrasonic distance sensor on a Grove digital module — trigger and echo share ONE pin.",manufacturer:"Seeed Studio",family:"Sensor",tags:["grove","seeed","ultrasonic","distance","range","digital"],package:"THT",pinSpacing:2,voltage:"3.2-5.2V",partNumber:"101020010",properties:{interface:"single-wire digital (trigger and echo on the same pin)",range:"2 cm – 350 cm",angle:"15°"},version:"0.1.3",pcbColor:"#1b4d3e",aspect:2.15,dimensions:{width:43,height:20},shape:{kind:"rect",cornerRadius:.5},headers:[{edge:"left",pins:[{name:"VCC",type:"pwr",group:"grp-h1y6izd",x:.07642377217610677,y:.22590529123942055},{name:"GND",type:"gnd",group:"grp-h1y6izd",x:.07642377217610677,y:.3696359464857313},{name:"P2",type:"io",group:"grp-h1y6izd",gpio:2,capabilities:["digital"],x:.07642377217610677,y:.5133666017320421},{name:"P3",type:"io",group:"grp-h1y6izd",gpio:3,capabilities:["digital"],x:.07642377217610677,y:.6570972569783529}]}],shapes:[{kind:"rect",x:.02,y:.04,z:0,fill:"#1b4d3e",stroke:"#0f3227",strokeWidth:1,w:.96,h:.92,cornerRadius:3},{kind:"circle",x:.36,y:.13,z:1,fill:"#8f9399",stroke:"#5c6066",strokeWidth:1,r:.1},{kind:"circle",x:.68,y:.13,z:1,fill:"#8f9399",stroke:"#5c6066",strokeWidth:1,r:.1}],labels:[{text:"ULTRASONIC",x:.3,y:.88,z:2,fontSize:5,color:"#cfe8dc"}],groups:[{id:"grp-h1y6izd",name:"grove",housing:{kind:"grove",x:.07642377217610677,y:.4415012741088867,rotation:90}}],library:{module:"grove_ultrasonic"},drivers:[{source:"module:grove-ultrasonic",target:"lib/grove_ultrasonic.py",label:"Grove ultrasonic driver"}],layerVisibility:{pcb:!1,image:!1,holes:!0,pins:!0,components:!0},helpText:`# Grove Ultrasonic Ranger

Ultrasonic time-of-flight distance sensor, 2 cm to 350 cm, on a Grove **digital**
port.

## One wire does both jobs

This is the important difference from an HC-SR04: the Grove Ultrasonic Ranger has
a **single \`SIG\` line that is both trigger and echo**. You pulse the pin as an
output, then immediately flip it to an input and time the reply. HC-SR04 code
with separate \`TRIG\` and \`ECHO\` pins will not work here, and the two parts are
not interchangeable.

\`\`\`python
from machine import Pin, time_pulse_us
import time

SIG = 26            # whichever GPIO the Grove digital port lands on

def distance_cm():
    p = Pin(SIG, Pin.OUT)
    p.low();  time.sleep_us(2)
    p.high(); time.sleep_us(10)
    p.low()
    p = Pin(SIG, Pin.IN)                 # same pin, now listening
    us = time_pulse_us(p, 1, 30000)      # 30 ms ~= 5 m of flight time
    return -1 if us < 0 else (us / 29.1) / 2
\`\`\`

\`time_pulse_us\` returns a negative value on timeout — treat that as "nothing in
range" rather than letting it become a bogus distance.

## Making the readings usable

- **Don't poll faster than ~20 Hz.** Echoes from the previous ping are still
  bouncing around; you'll read the last one.
- **Take a median of 3.** Single ultrasonic readings drop out regularly against
  soft or angled surfaces. A median kills the outliers without the lag of an
  average.
- **Soft things are invisible.** Curtains, cushions and cats absorb the ping. A
  clean "no reading" is not the same as "nothing there".
- The beam is a **15° cone**, not a ray — it sees the nearest thing anywhere in
  that cone, which is usually the floor if you mount it pointing slightly down.
`},{id:"hc-sr04",name:"HC SR04",description:"Ultrasonic Range finder",manufacturer:"Generic",family:"Sensor",tags:["ultrasonic"],package:"THT",pinSpacing:2.54,voltage:"3.3V",version:"0.1.3",pcbColor:"#0f5a2e",aspect:.5,dimensions:{width:45.5,height:25.5},shape:{kind:"rect",cornerRadius:0},headers:[{edge:"left",pins:[{name:"VCC",type:"pwr",number:1,shape:"round",x:.4149715423583984,y:.7503878574745328},{name:"GND",type:"gnd",number:4,shape:"round",x:.581638209025065,y:.7503878574745328},{name:"Echo",type:"io",number:3,shape:"round",x:.5260826534695094,y:.7503878574745328},{name:"Trigger",type:"io",number:2,shape:"round",x:.4736985524495443,y:.7503878574745328}]}],mountingHoles:[{x:.02587921142578125,y:.044937560636233706,diameter:1},{x:.02587921142578125,y:.7474125302383324,diameter:1},{x:.9749016316731771,y:.044937560636233706,diameter:1},{x:.9749016316731771,y:.7474125302383324,diameter:1}],shapes:[{kind:"circle",x:.20885139465332034,y:.4025821591046901,fill:"#1c2227",stroke:"#cbd6e5",strokeWidth:6,r:.17,z:1},{kind:"circle",x:.7976315307617187,y:.3995573894027012,fill:"#1c2227",stroke:"#cbd6e5",strokeWidth:6,r:.17,z:2},{kind:"rect",x:0,y:0,fill:"#0a3b70",stroke:"#8a8f96",strokeWidth:0,w:1,h:.79,z:0}],labels:[{text:"HC-SR04",x:.5054370625813797,y:.2813324473262613,fontSize:13,z:3}],image:"image.png",imageLayer:{x:-.18143107732137054,y:-.6675152900795533,w:1.3283409690856933,h:2.3701770232705512},mass_g:8.5,electrical:{model:"consumer",maxCurrentA:.02,currentDrawA:.015,stallCurrentA:.015,terminals:{positive:"VCC",negative:"GND"}},layerVisibility:{pcb:!1,image:!0,holes:!0,pins:!0,components:!1},helpText:`# HC-SR04 Ultrasonic Range Finder

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
`},{id:"modulino-buttons",name:"Modulino Buttons",description:"Three buttons and three LEDs on an I²C Modulino, daisy-chainable over QWIIC.",manufacturer:"Arduino",family:"Input",tags:["modulino","arduino","i2c","qwiic","button","led"],package:"SMD",voltage:"3.3V",partNumber:"ABX00110",properties:{interface:"I²C (0x7C, re-addressable — onboard MCU)",inputs:"3 momentary buttons (A, B, C)",outputs:"3 LEDs, one above each button",chain:"QWIIC socket at each end, same bus in parallel"},version:"0.1.11",pcbColor:"#00979d",aspect:1.617,dimensions:{width:41,height:25.36},shape:{kind:"rect",cornerRadiusMm:4.6},headers:[{edge:"right",pins:[{name:"GND",type:"gnd",number:1,shape:"header",rotation:90,x:.591716338318,y:.949529736075},{name:"3v3",type:"pwr",number:2,shape:"header",rotation:90,x:.529604117459,y:.949529736075},{name:"SDA",type:"io",number:3,capabilities:["i2c"],signals:{i2c:"SDA"},shape:"header",rotation:90,x:.467491896601,y:.949646140865},{name:"SCL",type:"io",number:4,capabilities:["i2c"],signals:{i2c:"SCL"},shape:"header",rotation:90,x:.405379675742,y:.949529736075},{name:"A",type:"io",number:14,capabilities:["digital"],shape:"header",rotation:270,x:.779822918204,y:.047594084474},{name:"GND",type:"gnd",number:13,shape:"header",rotation:270,x:.717951330983,y:.047594084474},{name:"3v3",type:"gnd",number:12,shape:"header",rotation:270,x:.655575668381,y:.047594084474},{name:"PF2",type:"io",number:11,shape:"header",rotation:270,x:.59320000578,y:.047594084474},{name:"SWCLK",type:"io",number:10,shape:"header",rotation:270,x:.529604117459,y:.047594084474},{name:"SWDIO",type:"io",number:9,capabilities:["digital"],shape:"header",rotation:270,x:.467491896601,y:.047594084474},{name:"TX1",type:"io",number:8,capabilities:["uart"],signals:{uart:"TX"},buses:{uart:1},shape:"header",rotation:270,x:.405379675742,y:.047594084474},{name:"RX1",type:"io",number:7,capabilities:["uart"],signals:{uart:"RX"},buses:{uart:1},shape:"header",rotation:270,x:.34345652081896355,y:.047594084474},{name:"B",type:"io",number:6,shape:"header",rotation:270,x:.281157234271,y:.047594084474},{name:"C",type:"io",number:5,capabilities:["digital"],shape:"header",rotation:270,x:.21894603017,y:.047594084474}]}],mountingHoles:[{x:.89024,y:.81546,diameter:1.5},{x:.10976,y:.81546,diameter:1.5},{x:.10976,y:.18454,diameter:1.5},{x:.89024,y:.18454,diameter:1.5}],buttons:[{label:"A",x:.748840637207,y:.501500634997},{label:"B",x:.501258544922,y:.501500634997},{label:"C",x:.24859568278,y:.501500634997}],rails:[{name:"GND",pins:["GND","GND-B"]},{name:"3V3",pins:["3V3","3V3-B"]},{name:"SDA",pins:["SDA","SDA-B"]},{name:"SCL",pins:["SCL","SCL-B"]}],connectors:[{z:0,kind:"qwiic",x:.94512,y:.5,rotation:90,pins:[{name:"GND",type:"gnd"},{name:"3V3",type:"pwr"},{name:"SDA",type:"io",capabilities:["i2c"],signals:{i2c:"SDA"}},{name:"SCL",type:"io",capabilities:["i2c"],signals:{i2c:"SCL"}}]},{z:0,kind:"qwiic",x:.058593378906,y:.505438238038,rotation:270,pins:[{name:"GND-B",type:"gnd"},{name:"3V3-B",type:"pwr"},{name:"SDA-B",type:"io",capabilities:["i2c"],signals:{i2c:"SDA"}},{name:"SCL-B",type:"io",capabilities:["i2c"],signals:{i2c:"SCL"}}]}],image:"image.png",rear:{image:"rear.png"},mesh:"modulino.stl",meshUnits:"mm",mass_g:4.4,i2cAddresses:[62],library:{module:"modulino",docs:"https://docs.arduino.cc/hardware/modulino-buttons/"},drivers:[{source:"module:modulino",target:"lib/modulino",label:"Arduino Modulino library"}],layerVisibility:{pcb:!1,image:!0,holes:!0,pins:!0,components:!0},helpText:`# Modulino Buttons

Three momentary buttons — **A**, **B**, **C** — each with an LED above it, on
Arduino's I²C **Modulino** board. Plug it into any QWIIC/STEMMA-QT port, or chain
it off another Modulino.

## Address

**\`0x7C\`.** There is an MCU on this board rather than a bare sensor chip, so the
address is **re-addressable** — two Buttons modules can share one chain once
you've moved one of them.

## Wiring

A QWIIC socket at **each end**, both on the same bus in parallel. That's the
whole point of the format: one lead from the board to the first module, then
module to module.

| Pin | What |
|---|---|
| GND | ground |
| 3V3 | 3.3 V |
| SDA | I²C data |
| SCL | I²C clock |

Either socket can be the input — they're the same four nets.

## Code

\`\`\`python
from modulino import ModulinoButtons

buttons = ModulinoButtons()
buttons.set_led_status(True, True, True)   # all three LEDs on

while True:
    if buttons.update():                   # True when something changed
        print(buttons.is_pressed(0), buttons.is_pressed(1), buttons.is_pressed(2))
\`\`\`

## On a non-Arduino board, pass the I²C bus yourself

The library works out which pins carry I²C from \`os.uname().machine\`, against a
table of **Arduino** boards. On anything else — a Pico, a Tiny 2350, an ESP32 —
that lookup fails and construction raises:

\`\`\`
RuntimeError: I2C interface couldn't be determined automatically for '<your board>'
\`\`\`

It isn't a wiring fault, and nothing is wrong with the module. Hand it a bus and
it works:

\`\`\`python
from machine import I2C, Pin
from modulino import ModulinoButtons

# Use YOUR board's I²C pins — Snakie shows them on the board's pinout.
i2c = I2C(0, sda=Pin(4), scl=Pin(5))

buttons = ModulinoButtons(i2c_bus=i2c)
\`\`\`

Every Modulino class takes \`i2c_bus\`, so one bus serves a whole chain — build it
once and pass it to each module.

## Install the library

One package covers every Modulino:

\`\`\`python
mip.install("github:arduino/arduino-modulino-mpy")
\`\`\`

Snakie offers this for you when you place a Modulino on the board — and only
once, however many Modulinos your design has.

## Modulino addresses

Every module in the range, so a scan of a chain tells you what's on it:

| Address | Module | Re-addressable? |
|---|---|---|
| \`0x04\` | Latch Relay | yes |
| \`0x29\` | Distance | **no** — VL53L4CD |
| \`0x3C\` | Buzzer | yes |
| \`0x44\` | Thermo | **no** — HS3003 |
| \`0x48\` | Motors | yes |
| \`0x53\` | Light | **no** — LTR-381RGB-01 |
| \`0x58\` | Joystick | yes |
| \`0x6A\` / \`0x6B\` | Movement | **no** — LSM6DSOX |
| \`0x6C\` | Pixels | yes |
| \`0x70\` | Vibro | yes |
| \`0x72\` | LED Matrix | yes |
| \`0x74\` / \`0x76\` | Knob | yes |
| \`0x7C\` | **Buttons** | yes |

The **no** rows have no onboard MCU: the sensor chip answers directly, so its
address is fixed in silicon and two of that module can't share a chain.

## Links

- [Product page](https://docs.arduino.cc/hardware/modulino-buttons/)
- [MicroPython library](https://github.com/arduino/arduino-modulino-mpy)
`},{id:"modulino-buzzer",name:"Modulino Buzzer",description:"Piezo buzzer driven over I²C — tones by frequency and duration.",manufacturer:"Arduino",family:"Output",tags:["modulino","arduino","i2c","qwiic","audio","buzzer","piezo","sound"],package:"SMD",voltage:"3.3V",partNumber:"ABX00108",properties:{interface:"I²C (0x3C, re-addressable — onboard MCU)",buzzer:"Murata PKLCS1212E4001-R1 piezo",mcu:"STM32C011",outputs:"tones by frequency + duration; a NOTES table for melodies",chain:"QWIIC socket at each end, same bus in parallel"},version:"0.1.10",pcbColor:"#00979d",aspect:1.617,dimensions:{width:41,height:25.36},shape:{kind:"rect",cornerRadiusMm:4.6},headers:[{edge:"left",pins:[{name:"PA0",type:"io",number:1,shape:"header",x:.28147101581331124,y:.0480588517855896},{name:"RX1",type:"io",number:2,capabilities:["uart"],signals:{uart:"RX"},buses:{uart:1},shape:"header",x:.34256332397460937,y:.0480588517855896},{name:"TX1",type:"io",number:3,capabilities:["uart"],signals:{uart:"TX"},buses:{uart:1},shape:"header",x:.4070342000325521,y:.04797094728167},{name:"P3",type:"io",number:4,shape:"header",x:.4671391805013021,y:.04797094728167},{name:"SWCLK",type:"io",number:5,shape:"header",x:.5299398295084635,y:.04797094728167},{name:"PF2",type:"io",number:6,capabilities:["digital"],shape:"header",x:.5908061726888021,y:.0480588517855896},{name:"3v3",type:"pwr",number:7,shape:"header",x:.657755126953125,y:.04797094728167},{name:"GND",type:"gnd",number:8,shape:"header",x:.7187506951084213,y:.0480588517855896},{name:"SCL",type:"io",number:12,capabilities:["i2c"],signals:{i2c:"SCL"},shape:"header",x:.4070342000325521,y:.9520164714376006},{name:"SDA",type:"io",number:11,capabilities:["i2c"],signals:{i2c:"SDA"},shape:"header",x:.4671391805013021,y:.9565505018745687},{name:"3v3",type:"pwr",number:10,shape:"header",x:.5299398295084635,y:.9565505018745687},{name:"GND",type:"gnd",number:9,shape:"header",x:.5908061726888021,y:.9590246559568258}]}],mountingHoles:[{x:.10976,y:.18454,diameter:1.5},{x:.89024,y:.18454,diameter:1.5},{x:.89024,y:.81546,diameter:1.5},{x:.10976,y:.81546,diameter:1.5}],rails:[{name:"GND",pins:["GND","GND-B"]},{name:"3V3",pins:["3V3","3V3-B"]},{name:"SDA",pins:["SDA","SDA-B"]},{name:"SCL",pins:["SCL","SCL-B"]}],connectors:[{z:0,kind:"qwiic",x:.05540050272623698,y:.5,rotation:270,pins:[{name:"GND",type:"gnd"},{name:"3V3",type:"pwr"},{name:"SDA",type:"io",capabilities:["i2c"],signals:{i2c:"SDA"}},{name:"SCL",type:"io",capabilities:["i2c"],signals:{i2c:"SCL"}}]},{z:0,kind:"qwiic",x:.9453607836914063,y:.5,rotation:90,pins:[{name:"GND-B",type:"gnd"},{name:"3V3-B",type:"pwr"},{name:"SDA-B",type:"io",capabilities:["i2c"],signals:{i2c:"SDA"}},{name:"SCL-B",type:"io",capabilities:["i2c"],signals:{i2c:"SCL"}}]}],image:"image.jpg",imageLayer:{x:.00024083455403645093,y:-.000401860908002899,w:1,h:1},rear:{image:"rear.jpg"},mesh:"modulino.stl",meshUnits:"mm",mass_g:4.2,i2cAddresses:[30],library:{module:"modulino",docs:"https://docs.arduino.cc/hardware/modulino-buttons/"},drivers:[{source:"module:modulino",target:"lib/modulino",label:"Arduino Modulino library"}],layerVisibility:{pcb:!1,image:!0,holes:!0,pins:!0,components:!0},helpText:`# Modulino Buzzer

A Murata piezo buzzer driven over I²C, with an **STM32C011** doing the timing for
you: ask for a frequency and a duration, and the board plays it.

## Address

**\`0x3C\`**, software-configurable — there's an MCU on this one, so two Buzzers
can share a chain. Worth knowing it collides with the default address of the very
common **SSD1306 / SH1106 OLED**; if a scan shows \`0x3C\` and you have a display
on the bus too, one of them has to move.

## Wiring

A QWIIC socket at **each end**, both on the same bus in parallel.

| Pin | What |
|---|---|
| GND | ground |
| 3V3 | 3.3 V |
| SDA | I²C data |
| SCL | I²C clock |

## Code

\`\`\`python
from modulino import ModulinoBuzzer

buzzer = ModulinoBuzzer()

buzzer.tone(440, 500, blocking=True)   # A4 for half a second
buzzer.no_tone()
\`\`\`

\`blocking=True\` waits for the note to finish; without it the call returns
immediately and your code carries on while the note sounds — which is what you
want inside a robot's control loop, where stopping for half a second means
driving blind for half a second.

### The NOTES table

The driver ships note names, so you can write music instead of frequencies:

\`\`\`python
from modulino import ModulinoBuzzer

buzzer = ModulinoBuzzer()

melody = [
    (ModulinoBuzzer.NOTES["C4"], 200),
    (ModulinoBuzzer.NOTES["E4"], 200),
    (ModulinoBuzzer.NOTES["G4"], 200),
    (ModulinoBuzzer.NOTES["C5"], 400),
]

for note, ms in melody:
    buzzer.tone(note, ms, blocking=True)
buzzer.no_tone()
\`\`\`

A rest is just a gap — \`time.sleep_ms(ms)\` with no tone.

## The Buzzer instrument

Snakie's **Buzzer** panel doesn't drive this board yet. The panel plays through a
\`machine.PWM\` on a GPIO pin (it sets \`freq()\` and \`duty_u16()\` directly); this
Modulino takes its notes over I²C instead, so there's no PWM pin for the panel to
target. A small adapter bridges the two — tracked separately.

Everything above works today from your own code.

## On a non-Arduino board, pass the I²C bus yourself

The library works out which pins carry I²C from \`os.uname().machine\`, against a
table of **Arduino** boards. On anything else — a Pico, a Tiny 2350, an ESP32 —
that lookup fails and construction raises:

\`\`\`
RuntimeError: I2C interface couldn't be determined automatically for '<your board>'
\`\`\`

It isn't a wiring fault, and nothing is wrong with the module. Hand it a bus and
it works:

\`\`\`python
from machine import I2C, Pin
from modulino import ModulinoBuzzer

# Use YOUR board's I²C pins — Snakie shows them on the board's pinout.
i2c = I2C(0, sda=Pin(4), scl=Pin(5))

buzzer = ModulinoBuzzer(i2c_bus=i2c)
\`\`\`

Every Modulino class takes \`i2c_bus\`, so one bus serves a whole chain — build it
once and pass it to each module.

## Install the library

One package covers every Modulino:

\`\`\`python
mip.install("github:arduino/arduino-modulino-mpy")
\`\`\`

Snakie offers this for you when you place a Modulino on the board — and only
once, however many Modulinos your design has.

## Modulino addresses

| Address | Module | Re-addressable? |
|---|---|---|
| \`0x04\` | Latch Relay | yes |
| \`0x29\` | Distance | **no** — VL53L4CD |
| \`0x3C\` | **Buzzer** | yes |
| \`0x44\` | Thermo | **no** — HS3003 |
| \`0x48\` | Motors | yes |
| \`0x53\` | Light | **no** — LTR-381RGB-01 |
| \`0x58\` | Joystick | yes |
| \`0x6A\` / \`0x6B\` | Movement | **no** — LSM6DSOX |
| \`0x6C\` | Pixels | yes |
| \`0x70\` | Vibro | yes |
| \`0x72\` | LED Matrix | yes |
| \`0x74\` / \`0x76\` | Knob | yes |
| \`0x7C\` | Buttons | yes |

## Links

- [Product page](https://docs.arduino.cc/hardware/modulino-buzzer/) (ABX00108)
- [MicroPython library](https://github.com/arduino/arduino-modulino-mpy)
`},{id:"modulino-distance",name:"Modulino Distance",description:"VL53L4CD time-of-flight distance sensor on an I²C Modulino, daisy-chainable over QWIIC.",manufacturer:"Arduino",family:"Sensor",tags:["modulino","arduino","i2c","qwiic","distance","tof","vl53l4cd","sensor"],package:"SMD",voltage:"3.3V",partNumber:"ABX00102",properties:{interface:"I²C (0x29, FIXED — no onboard MCU)",sensor:"VL53L4CDV0DH/1 time-of-flight",measures:"distance to the nearest obstacle, in millimetres",chain:"QWIIC socket at each end, same bus in parallel"},version:"0.1.11",pcbColor:"#00979d",aspect:1.617,dimensions:{width:41,height:25.36},shape:{kind:"rect",cornerRadiusMm:4.6},headers:[{edge:"left",pins:[{name:"GND",type:"gnd",number:1,shape:"header",x:.4061952209472656,y:.04990509305968019},{name:"3v3",type:"pwr",number:2,shape:"header",x:.46689834594726565,y:.05107317863327973},{name:"SDA",type:"io",number:3,capabilities:["i2c"],signals:{i2c:"SDA"},shape:"header",x:.5301728820800782,y:.05107317863327973},{name:"SCL",type:"io",number:4,capabilities:["i2c"],signals:{i2c:"SCL"},shape:"header",x:.592655029296875,y:.04990509305968019},{name:"SCL",type:"io",number:8,capabilities:["i2c"],signals:{i2c:"SCL"},shape:"header",x:.4061952209472656,y:.9511122638369459},{name:"SDA",type:"io",number:7,capabilities:["i2c"],signals:{i2c:"SDA"},shape:"header",x:.46689834594726565,y:.9511122638369459},{name:"3v3",type:"pwr",number:6,shape:"header",x:.5301728820800782,y:.9511122638369459},{name:"GND",type:"gnd",number:5,shape:"header",x:.592655029296875,y:.9511122638369459}]}],mountingHoles:[{x:.10976,y:.18454,diameter:1.5},{x:.89024,y:.18454,diameter:1.5},{x:.89024,y:.81546,diameter:1.5},{x:.10976,y:.81546,diameter:1.5}],rails:[{name:"GND",pins:["GND","GND-B"]},{name:"3V3",pins:["3V3","3V3-B"]},{name:"SDA",pins:["SDA","SDA-B"]},{name:"SCL",pins:["SCL","SCL-B"]}],connectors:[{z:0,kind:"qwiic",x:.05488,y:.5,rotation:270,pins:[{name:"GND",type:"gnd"},{name:"3V3",type:"pwr"},{name:"SDA",type:"io",capabilities:["i2c"],signals:{i2c:"SDA"}},{name:"SCL",type:"io",capabilities:["i2c"],signals:{i2c:"SCL"}}]},{z:0,kind:"qwiic",x:.94512,y:.5,rotation:90,pins:[{name:"GND-B",type:"gnd"},{name:"3V3-B",type:"pwr"},{name:"SDA-B",type:"io",capabilities:["i2c"],signals:{i2c:"SDA"}},{name:"SCL-B",type:"io",capabilities:["i2c"],signals:{i2c:"SCL"}}]}],image:"image.jpg",rear:{image:"rear.jpg"},mesh:"modulino.stl",meshUnits:"mm",mass_g:4.1,i2cAddresses:[41],library:{module:"modulino",docs:"https://docs.arduino.cc/hardware/modulino-buttons/"},drivers:[{source:"module:modulino",target:"lib/modulino",label:"Arduino Modulino library"}],layerVisibility:{pcb:!1,image:!0,holes:!0,pins:!0,components:!0},helpText:`# Modulino Distance

A **VL53L4CD** time-of-flight sensor on Arduino's I²C Modulino board. It bounces
invisible laser light off whatever is in front of it and times the return, which
makes it far tidier than an ultrasonic ranger — no cone of echo, no 40 kHz chirp,
and it works in silence.

## Address — this one is fixed

**\`0x29\`, and it cannot be changed.** There's no MCU on this board: the VL53L4CD
answers for itself, so the address is set in silicon. Two Distance modules
**cannot share a chain**.

That's the difference between the Modulinos with an onboard MCU (Buttons, Buzzer,
Knob, Pixels…) and the four bare-sensor ones (Distance, Thermo, Light, Movement).
If you need two, they go on separate buses — or behind a mux.

## Wiring

A QWIIC socket at **each end**, both on the same bus in parallel — plug the board
into either, and chain the next module off the other.

| Pin | What |
|---|---|
| GND | ground |
| 3V3 | 3.3 V |
| SDA | I²C data |
| SCL | I²C clock |

## Code

\`\`\`python
from modulino import ModulinoDistance

distance = ModulinoDistance()

while True:
    print(distance.distance)     # centimetres, or None when out of range
\`\`\`

\`.distance\` returns \`None\` rather than a number when nothing is in range — check
for it before comparing, or a stray \`None\` will crash the comparison:

\`\`\`python
d = distance.distance
if d is not None and d < 10:
    print("something's close")
\`\`\`

## On a non-Arduino board, pass the I²C bus yourself

The library works out which pins carry I²C from \`os.uname().machine\`, against a
table of **Arduino** boards. On anything else — a Pico, a Tiny 2350, an ESP32 —
that lookup fails and construction raises:

\`\`\`
RuntimeError: I2C interface couldn't be determined automatically for '<your board>'
\`\`\`

It isn't a wiring fault, and nothing is wrong with the module. Hand it a bus and
it works:

\`\`\`python
from machine import I2C, Pin
from modulino import ModulinoDistance

# Use YOUR board's I²C pins — Snakie shows them on the board's pinout.
i2c = I2C(0, sda=Pin(4), scl=Pin(5))

distance = ModulinoDistance(i2c_bus=i2c)
\`\`\`

Every Modulino class takes \`i2c_bus\`, so one bus serves a whole chain — build it
once and pass it to each module.

## Install the library

One package covers every Modulino, and it brings the \`vl53l4cd\` driver with it:

\`\`\`python
mip.install("github:arduino/arduino-modulino-mpy")
\`\`\`

Snakie offers this for you when you place a Modulino on the board — and only
once, however many Modulinos your design has.

## Modulino addresses

| Address | Module | Re-addressable? |
|---|---|---|
| \`0x04\` | Latch Relay | yes |
| \`0x29\` | **Distance** | **no** — VL53L4CD |
| \`0x3C\` | Buzzer | yes |
| \`0x44\` | Thermo | **no** — HS3003 |
| \`0x48\` | Motors | yes |
| \`0x53\` | Light | **no** — LTR-381RGB-01 |
| \`0x58\` | Joystick | yes |
| \`0x6A\` / \`0x6B\` | Movement | **no** — LSM6DSOX |
| \`0x6C\` | Pixels | yes |
| \`0x70\` | Vibro | yes |
| \`0x72\` | LED Matrix | yes |
| \`0x74\` / \`0x76\` | Knob | yes |
| \`0x7C\` | Buttons | yes |

## Links

- [Product page](https://docs.arduino.cc/hardware/modulino-distance/) (ABX00102)
- [MicroPython library](https://github.com/arduino/arduino-modulino-mpy)
`},{id:"modulino-joystick",name:"Modulino Joystick",description:"Two-axis analogue thumbstick with a push-to-click button, on an I²C Modulino, daisy-chainable over QWIIC.",manufacturer:"Arduino",family:"Input",tags:["modulino","arduino","i2c","qwiic","joystick","thumbstick","input"],package:"SMD",voltage:"3.3V",partNumber:"ABX00135",properties:{interface:"I²C (0x2C, re-addressable — onboard MCU)",control:"FJN10K-S1B10KD0N thumbstick, 60° of travel on each axis",button:"integrated centre-click push button",mcu:"STM32C011F4",chain:"QWIIC socket at each end, same bus in parallel"},version:"0.1.8",pcbColor:"#00979d",aspect:1.617,dimensions:{width:41,height:25.36},shape:{kind:"rect",cornerRadiusMm:4.6},headers:[{edge:"left",pins:[{name:"P0",type:"io",side:"rear",number:8,capabilities:["digital"],shape:"header",x:.15259986877441403,y:.05133038949275363},{name:"P1",type:"io",side:"rear",number:7,capabilities:["digital"],shape:"header",x:.21434663560655381,y:.05133038949275363},{name:"P2",type:"io",side:"rear",number:6,capabilities:["digital"],shape:"header",x:.27633418613009986,y:.05133038949275363},{name:"P3",type:"io",side:"rear",number:5,capabilities:["digital"],shape:"header",x:.33832173665364584,y:.05133038949275363},{name:"P4",type:"io",side:"rear",number:4,capabilities:["digital"],shape:"header",x:.6557549529003398,y:.045929534067749515},{name:"P5",type:"io",side:"rear",number:3,capabilities:["digital"],shape:"header",x:.718714831161745,y:.045929534067749515},{name:"P6",type:"io",side:"rear",number:2,capabilities:["digital"],shape:"header",x:.7783808454908584,y:.045929534067749515},{name:"P7",type:"io",side:"rear",number:1,capabilities:["digital"],shape:"header",x:.8396937917861177,y:.045929534067749515},{name:"GND",type:"gnd",side:"rear",number:9,shape:"header",x:.4040035502115885,y:.9538787233656727},{name:"3v3",type:"pwr",side:"rear",number:10,shape:"header",x:.46686184946695974,y:.9538787233656727},{name:"SDA",type:"io",side:"rear",number:11,capabilities:["i2c"],signals:{i2c:"SDA"},shape:"header",x:.5291062774658203,y:.9538787233656727},{name:"SCL",type:"io",side:"rear",number:12,capabilities:["i2c"],signals:{i2c:"SCL"},shape:"header",x:.5906076151529948,y:.9538787233656727}]}],mountingHoles:[{x:.10976,y:.18365108840864838,diameter:1.5},{x:.8952662196858724,y:.18365108840864838,diameter:1.5},{x:.8952662196858724,y:.8171493916935115,diameter:1.5},{x:.10976,y:.8171493916935115,diameter:1.5}],rails:[{name:"GND",pins:["GND","GND-B"]},{name:"3V3",pins:["3V3","3V3-B"]},{name:"SDA",pins:["SDA","SDA-B"]},{name:"SCL",pins:["SCL","SCL-B"]}],connectors:[{z:0,kind:"qwiic",x:.05183,y:.5,rotation:270,pins:[{name:"GND",type:"gnd"},{name:"3V3",type:"pwr"},{name:"SDA",type:"io",capabilities:["i2c"],signals:{i2c:"SDA"}},{name:"SCL",type:"io",capabilities:["i2c"],signals:{i2c:"SCL"}}]},{z:0,kind:"qwiic",x:.94817,y:.5,rotation:90,pins:[{name:"GND-B",type:"gnd"},{name:"3V3-B",type:"pwr"},{name:"SDA-B",type:"io",capabilities:["i2c"],signals:{i2c:"SDA"}},{name:"SCL-B",type:"io",capabilities:["i2c"],signals:{i2c:"SCL"}}]}],image:"image.png",imageLayer:{x:-.0009118471484550472,y:-.07105605641459822,w:1,h:1.1243073548045464},rear:{image:"rear.jpg"},mesh:"modulino.stl",meshUnits:"mm",mass_g:4.4,i2cAddresses:[44],library:{module:"modulino",docs:"https://docs.arduino.cc/hardware/modulino-joystick/"},drivers:[{source:"module:modulino",target:"lib/modulino",label:"Arduino Modulino library"}],layerVisibility:{pcb:!0,image:!0,holes:!0,pins:!0,components:!0},helpText:`# Modulino Joystick

A two-axis analogue thumbstick with a push-to-click button, read over I²C. An
**STM32C011F4** samples both axes and the button for you, so you get numbers
rather than an ADC to babysit.

## Address — \`0x2C\`

There's an MCU on this one, so the address is **software-configurable** — which
is how you run two Joysticks on one chain.

Mind the shift if you go reading Arduino's own material: the library declares the
module's *pinstrap* as \`0x58\`, and the firmware answers on **half** that. \`0x2C\`
is what a bus scan reports, and it's what this part declares.

## Wiring

A QWIIC socket at **each end**, both on the same bus in parallel — plug into
either and chain the next module off the other.

| Pin | What |
|---|---|
| GND | ground |
| 3V3 | 3.3 V |
| SDA | I²C data |
| SCL | I²C clock |

## Code

Nothing updates until you call \`.update()\` — it does the I²C read and returns
\`True\` when something actually moved, so it doubles as your change test:

\`\`\`python
from modulino import ModulinoJoystick

joystick = ModulinoJoystick()

while True:
    if joystick.update():
        print(joystick.x, joystick.y, joystick.button_pressed)
\`\`\`

| Member | What |
|---|---|
| \`.update()\` | reads the board; \`True\` if the position or button changed |
| \`.x\` / \`.y\` | position, centred on **0** (roughly −128…+127) |
| \`.button_pressed\` | \`True\` while the stick is clicked in |
| \`.deadzone_threshold\` | counts around centre that snap to 0 — default \`10\` |
| \`.long_press_duration\` | milliseconds that count as a long press — default \`1000\` |

The axes are **not** properties that fetch: \`.x\` and \`.y\` hand back what the last
\`.update()\` read. Call it in your loop or the stick appears stuck.

### Buttons by callback

If you'd rather not poll for the click, hand it a function. The callbacks still
fire from inside \`.update()\`, so it must keep being called:

\`\`\`python
from modulino import ModulinoJoystick

joystick = ModulinoJoystick()
joystick.on_button_press = lambda: print("pressed")
joystick.on_button_release = lambda: print("released")
joystick.on_button_long_press = lambda: print("held")

while True:
    joystick.update()
\`\`\`

### The deadzone

A thumbstick never quite returns to centre, so anything within
\`.deadzone_threshold\` counts of the middle is forced to exactly 0. Widen it if a
worn stick creeps; narrow it for finer control:

\`\`\`python
from modulino import ModulinoJoystick

joystick = ModulinoJoystick()

joystick.deadzone_threshold = 20
\`\`\`

## On a non-Arduino board, pass the I²C bus yourself

The library works out which pins carry I²C from \`os.uname().machine\`, against a
table of **Arduino** boards. On anything else — a Pico, a Tiny 2350, an ESP32 —
that lookup fails and construction raises:

\`\`\`
RuntimeError: I2C interface couldn't be determined automatically for '<your board>'
\`\`\`

It isn't a wiring fault, and nothing is wrong with the module. Hand it a bus and
it works:

\`\`\`python
from machine import I2C, Pin
from modulino import ModulinoJoystick

# Use YOUR board's I²C pins — Snakie shows them on the board's pinout.
i2c = I2C(0, sda=Pin(4), scl=Pin(5))

joystick = ModulinoJoystick(i2c_bus=i2c)
\`\`\`

Every Modulino class takes \`i2c_bus\`, so one bus serves a whole chain — build it
once and pass it to each module.

## Install the library

One package covers every Modulino:

\`\`\`python
mip.install("github:arduino/arduino-modulino-mpy")
\`\`\`

Snakie offers this for you when you place a Modulino on the board — and only
once, however many Modulinos your design has.

## Modulino addresses

As they appear **in a bus scan**:

| Address | Module | Re-addressable? |
|---|---|---|
| \`0x02\` | Latch Relay | yes |
| \`0x1E\` | Buzzer | yes |
| \`0x24\` | Motors | yes |
| \`0x29\` | Distance | **no** — VL53L4CD |
| \`0x2C\` | **Joystick** | yes |
| \`0x36\` | Pixels | yes |
| \`0x38\` | Vibro | yes |
| \`0x39\` | LED Matrix | yes |
| \`0x3A\` / \`0x3B\` | Knob | yes |
| \`0x3E\` | Buttons | yes |
| \`0x44\` | Thermo | **no** — HS3003 |
| \`0x53\` | Light | **no** — LTR-381RGB-01 |
| \`0x6A\` / \`0x6B\` | Movement | solder jumper only |

## Links

- [Product page](https://docs.arduino.cc/hardware/modulino-joystick/) (ABX00135)
- [MicroPython library](https://github.com/arduino/arduino-modulino-mpy)
`},{id:"modulino-knob",name:"Modulino Knob",description:"Rotary encoder with a push switch — endless rotation counted in steps — on an I²C Modulino, daisy-chainable over QWIIC.",manufacturer:"Arduino",family:"Input",tags:["modulino","arduino","i2c","qwiic","encoder","rotary-encoder","knob","input"],package:"SMD",voltage:"3.3V",partNumber:"ABX00107",properties:{interface:"I²C (0x3A or 0x3B, re-addressable — onboard MCU)",control:"PEC11J-9215F-S0015 quadrature encoder, continuous 360° rotation",button:"integrated push switch",mcu:"STM32C011F4",chain:"QWIIC socket at each end, same bus in parallel"},version:"0.1.8",pcbColor:"#00979d",aspect:1.617,dimensions:{width:41,height:25.36},shape:{kind:"rect",cornerRadiusMm:4.6},headers:[{edge:"left",pins:[{name:"SCL",type:"io",number:14,capabilities:["i2c"],signals:{i2c:"SCL"},shape:"header",x:.4086267598470052,y:.9508609671447305},{name:"SDA",type:"io",number:13,capabilities:["i2c"],signals:{i2c:"SDA"},shape:"header",x:.4702624772095547,y:.9508609671447305},{name:"3v3",type:"pwr",number:12,shape:"header",x:.5322508600635422,y:.9508609671447305},{name:"GND",type:"gnd",number:11,shape:"header",x:.5944435889719646,y:.9508609671447305},{name:"SWDIO",type:"io",number:5,capabilities:["digital"],shape:"header",x:.4702624772095547,y:.044845890883471254},{name:"SWCLK",type:"io",number:6,capabilities:["digital"],shape:"header",x:.5322508600635422,y:.044845890883471254},{name:"PF2",type:"io",number:7,capabilities:["digital"],shape:"header",x:.5942392429175297,y:.044845890883471254},{name:"3v3",type:"pwr",number:8,shape:"header",x:.6562276257715172,y:.044845890883471254},{name:"GND",type:"gnd",number:9,shape:"header",x:.7182160086255047,y:.044845890883471254},{name:"PA2",type:"io",number:10,capabilities:["digital"],shape:"header",x:.7802043914794922,y:.044845890883471254},{name:"TX1",type:"io",number:4,capabilities:["uart"],signals:{uart:"TX"},buses:{uart:1},shape:"header",x:.4082740943555672,y:.044845890883471254},{name:"RX1",type:"io",number:3,capabilities:["uart"],signals:{uart:"RX"},buses:{uart:1},shape:"header",x:.3462857115015797,y:.044845890883471254},{name:"PA0",type:"io",number:2,capabilities:["digital"],shape:"header",x:.2842973286475922,y:.044845890883471254},{name:"PA1",type:"io",number:1,shape:"header",x:.22230894579360475,y:.044845890883471254}]}],mountingHoles:[{x:.11280527282714845,y:.18454,diameter:1.5},{x:.895779042154948,y:.18454,diameter:1.5},{x:.895779042154948,y:.81546,diameter:1.5},{x:.11280527282714845,y:.81546,diameter:1.5}],rails:[{name:"GND",pins:["GND","GND-B"]},{name:"3V3",pins:["3V3","3V3-B"]},{name:"SDA",pins:["SDA","SDA-B"]},{name:"SCL",pins:["SCL","SCL-B"]}],connectors:[{z:0,kind:"qwiic",x:.05183,y:.5,rotation:270,pins:[{name:"GND",type:"gnd"},{name:"3V3",type:"pwr"},{name:"SDA",type:"io",capabilities:["i2c"],signals:{i2c:"SDA"}},{name:"SCL",type:"io",capabilities:["i2c"],signals:{i2c:"SCL"}}]},{z:0,kind:"qwiic",x:.94817,y:.5,rotation:90,pins:[{name:"GND-B",type:"gnd"},{name:"3V3-B",type:"pwr"},{name:"SDA-B",type:"io",capabilities:["i2c"],signals:{i2c:"SDA"}},{name:"SCL-B",type:"io",capabilities:["i2c"],signals:{i2c:"SCL"}}]}],image:"image.jpg",imageLayer:{x:-.0004893493652343706,y:.00038927962727342,w:1,h:1},rear:{image:"rear.jpg",imageLayer:{x:7046763102214193e-20,y:-.0002431507240961278,w:1,h:1}},mesh:"modulino.stl",meshUnits:"mm",mass_g:8.5,i2cAddresses:[58,59],library:{module:"modulino",docs:"https://docs.arduino.cc/hardware/modulino-knob/"},drivers:[{source:"module:modulino",target:"lib/modulino",label:"Arduino Modulino library"}],layerVisibility:{pcb:!0,image:!0,holes:!0,pins:!0,components:!0},helpText:`# Modulino Knob

A **PEC11J** rotary encoder with a push switch, counted for you by an onboard
**STM32C011F4**. It turns forever in either direction — there are no end stops,
just a running count of steps — and the shaft clicks in as a button.

## Address — \`0x3A\` or \`0x3B\`

There's an MCU on this one, so the address is **software-configurable**. It also
ships with **two** defaults rather than one, which is the neat bit: buy two Knobs
and they'll sit at \`0x3A\` and \`0x3B\` and coexist on one chain with nothing to
configure. The library tries both in turn, so you don't normally say which.

Mind the shift if you go reading Arduino's own material: the library declares the
*pinstraps* as \`0x74\` / \`0x76\`, and the firmware answers on **half** those.
\`0x3A\` / \`0x3B\` is what a bus scan reports.

## Wiring

A QWIIC socket at **each end**, both on the same bus in parallel — plug into
either and chain the next module off the other.

| Pin | What |
|---|---|
| GND | ground |
| 3V3 | 3.3 V |
| SDA | I²C data |
| SCL | I²C clock |

## Code

Nothing updates until you call \`.update()\` — it does the I²C read and returns
\`True\` when the count or the button changed:

\`\`\`python
from modulino import ModulinoKnob

knob = ModulinoKnob()
knob.value = 0

while True:
    if knob.update():
        print(knob.value, knob.pressed)
\`\`\`

| Member | What |
|---|---|
| \`.update()\` | reads the board; \`True\` if the value or button changed |
| \`.value\` | step count — **read *and* write**, so you can seed or zero it |
| \`.pressed\` | \`True\` while the shaft is pressed in |
| \`.range\` | \`(min, max)\` to clamp the count; unset means free-running |
| \`.reset()\` | back to 0 |

### Clamp it to something useful

Left alone the count runs from −32768 to 32767, which is rarely what you want.
Give it a range and the driver clamps for you — so a knob can *be* a volume
control rather than feed one:

\`\`\`python
from modulino import ModulinoKnob

knob = ModulinoKnob()
knob.range = (0, 100)
knob.value = 50
\`\`\`

### By callback

The rotation callbacks are handed **both** the number of steps moved and the new
value, so a fast spin moves further than a slow one. They fire from inside
\`.update()\`, so it must keep being called:

\`\`\`python
from modulino import ModulinoKnob

knob = ModulinoKnob()

knob.on_rotate_clockwise = lambda steps, value: print("cw", steps, value)
knob.on_rotate_counter_clockwise = lambda steps, value: print("ccw", steps, value)
knob.on_press = lambda: print("pressed")
knob.on_release = lambda: print("released")

while True:
    knob.update()
\`\`\`

Note \`on_press\` / \`on_release\` take **no** arguments, unlike the rotation pair.

## On a non-Arduino board, pass the I²C bus yourself

The library works out which pins carry I²C from \`os.uname().machine\`, against a
table of **Arduino** boards. On anything else — a Pico, a Tiny 2350, an ESP32 —
that lookup fails and construction raises:

\`\`\`
RuntimeError: I2C interface couldn't be determined automatically for '<your board>'
\`\`\`

It isn't a wiring fault, and nothing is wrong with the module. Hand it a bus and
it works:

\`\`\`python
from machine import I2C, Pin
from modulino import ModulinoKnob

# Use YOUR board's I²C pins — Snakie shows them on the board's pinout.
i2c = I2C(0, sda=Pin(4), scl=Pin(5))

knob = ModulinoKnob(i2c_bus=i2c)
\`\`\`

Every Modulino class takes \`i2c_bus\`, so one bus serves a whole chain — build it
once and pass it to each module.

## Install the library

One package covers every Modulino:

\`\`\`python
mip.install("github:arduino/arduino-modulino-mpy")
\`\`\`

Snakie offers this for you when you place a Modulino on the board — and only
once, however many Modulinos your design has.

## Modulino addresses

As they appear **in a bus scan**:

| Address | Module | Re-addressable? |
|---|---|---|
| \`0x02\` | Latch Relay | yes |
| \`0x1E\` | Buzzer | yes |
| \`0x24\` | Motors | yes |
| \`0x29\` | Distance | **no** — VL53L4CD |
| \`0x2C\` | Joystick | yes |
| \`0x36\` | Pixels | yes |
| \`0x38\` | Vibro | yes |
| \`0x39\` | LED Matrix | yes |
| \`0x3A\` / \`0x3B\` | **Knob** | yes |
| \`0x3E\` | Buttons | yes |
| \`0x44\` | Thermo | **no** — HS3003 |
| \`0x53\` | Light | **no** — LTR-381RGB-01 |
| \`0x6A\` / \`0x6B\` | Movement | solder jumper only |

## Links

- [Product page](https://docs.arduino.cc/hardware/modulino-knob/) (ABX00107)
- [MicroPython library](https://github.com/arduino/arduino-modulino-mpy)
`},{id:"modulino-latch-relay",name:"Modulino Latch Relay",description:"Bistable latching relay that holds its state with no coil current — DC loads only, 30 V max — on an I²C Modulino.",manufacturer:"Arduino",family:"Output",tags:["modulino","arduino","i2c","qwiic","relay","latching","bistable","output"],package:"SMD",voltage:"3.3V",partNumber:"ABX00138",properties:{interface:"I²C (0x02, re-addressable — onboard MCU)",relay:"HFE60/3-1HT-L2 bistable latching, dual SET/RESET coil",switching:"DC loads only, 30 V DC maximum — NOT safe for AC",coil:"3 V nominal, ~100 mA for 50 ms while it flips, 0 mA once latched",mcu:"STM32C011F4",chain:"QWIIC socket at each end, same bus in parallel"},version:"0.1.6",pcbColor:"#00979d",aspect:1.617,dimensions:{width:41,height:25.36},shape:{kind:"rect",cornerRadiusMm:4.6},headers:[{edge:"left",pins:[{name:"PA4",type:"io",number:10,shape:"header",x:.2162824633836008,y:.9521546188338447},{name:"SWDIO",type:"io",number:9,capabilities:["digital"],shape:"header",x:.27856951423214604,y:.9521546188338447},{name:"SWCLK",type:"io",number:8,capabilities:["digital"],shape:"header",x:.3408565650806913,y:.9521546188338447},{name:"SCL",type:"io",number:7,capabilities:["i2c"],signals:{i2c:"SCL"},shape:"header",x:.4031436159292365,y:.9521546188338447},{name:"SDA",type:"io",number:6,capabilities:["i2c"],signals:{i2c:"SDA"},shape:"header",x:.4654306667777817,y:.9521546188338447},{name:"3v3",type:"pwr",number:5,shape:"header",x:.527717717626327,y:.9521546188338447},{name:"GND",type:"gnd",number:4,shape:"header",x:.5900047684748722,y:.9521546188338447},{name:"PF2",type:"io",number:3,capabilities:["digital"],shape:"header",x:.6522918193234174,y:.9521546188338447},{name:"PA1",type:"io",number:2,capabilities:["digital"],shape:"header",x:.7145788701719626,y:.9521546188338447},{name:"PA0",type:"io",number:1,capabilities:["digital"],shape:"header",x:.7768659210205079,y:.9521546188338447}]}],mountingHoles:[{x:.10338205505371094,y:.18454,diameter:1.5},{x:.89024,y:.18454,diameter:1.5},{x:.89024,y:.81546,diameter:1.5},{x:.10338205505371094,y:.81546,diameter:1.5}],rails:[{name:"GND",pins:["GND","GND-B"]},{name:"3V3",pins:["3V3","3V3-B"]},{name:"SDA",pins:["SDA","SDA-B"]},{name:"SCL",pins:["SCL","SCL-B"]}],connectors:[{z:0,kind:"qwiic",x:.05183,y:.5,rotation:270,pins:[{name:"GND",type:"gnd"},{name:"3V3",type:"pwr"},{name:"SDA",type:"io",capabilities:["i2c"],signals:{i2c:"SDA"}},{name:"SCL",type:"io",capabilities:["i2c"],signals:{i2c:"SCL"}}]},{z:0,kind:"qwiic",x:.94817,y:.5,rotation:90,pins:[{name:"GND-B",type:"gnd"},{name:"3V3-B",type:"pwr"},{name:"SDA-B",type:"io",capabilities:["i2c"],signals:{i2c:"SDA"}},{name:"SCL-B",type:"io",capabilities:["i2c"],signals:{i2c:"SCL"}}]},{z:1,kind:"terminal",x:.4906000773111979,y:.17848931802936158,pins:[{name:"T1",type:"pwr"},{name:"T2",type:"pwr"}]}],image:"image.jpg",rear:{image:"rear.jpg"},mesh:"modulino.stl",meshUnits:"mm",mass_g:4.4,i2cAddresses:[2],library:{module:"modulino",docs:"https://docs.arduino.cc/hardware/modulino-latch/"},drivers:[{source:"module:modulino",target:"lib/modulino",label:"Arduino Modulino library"}],layerVisibility:{pcb:!0,image:!0,holes:!0,pins:!0,components:!0},helpText:`# Modulino Latch Relay

A **bistable latching relay** — an HFE60/3-1HT-L2 with two coils. A pulse on the
SET coil closes it, a pulse on the RESET coil opens it, and in between it draws
**no coil current at all**. Cut the power and it stays exactly where you left it,
which is the whole point of the thing: a normal relay drops out when the board
reboots, this one doesn't.

## Safety — DC only, 30 V maximum

**This board is NOT safe for switching AC loads.** Arduino's datasheet says so in
capitals, and it means mains too. It is a **DC-only** relay.

| | |
|---|---|
| Maximum switching voltage | **30 V DC** |
| AC loads | **not rated — do not** |
| Coil | 3 V nominal; ~100 mA for 50 ms while it flips, 0 mA once latched |

Because the state survives a power cut, a load left switched **on** stays on
while your board is off, reflashing, or crashed. Design for that: it's the
feature, but it's also the failure mode.

## Address — \`0x02\`

There's an MCU on this one, so the address is **software-configurable** — which
is how you run two Latch Relays on one chain.

\`0x02\` sits inside the range I²C reserves (\`0x00\`–\`0x07\`), so it's worth saying
plainly that this is not a typo. Arduino's own address-changer utility documents
the rule as *"default address is half pinstrap"* and names pinstrap \`0x04\` as the
Latch Relay, giving \`0x02\`; a scan of a real one on the Arduino forum reported
exactly that. Snakie's I²C-detect will still flag \`0x02\` as a reserved address —
that warning is correct in general, and this board is the exception.

Arduino's **datasheet** for this module instead prints \`0x2A\` / \`0x15\` in its
address table. That contradicts the library, the store page and the observed
scan, and the same datasheet table is demonstrably wrong for several other
Modulinos, so it hasn't been followed here.

## Wiring

A QWIIC socket at **each end**, both on the same bus in parallel — plug into
either and chain the next module off the other. The switched load goes to the
relay's own screw terminals, not to these.

| Pin | What |
|---|---|
| GND | ground |
| 3V3 | 3.3 V |
| SDA | I²C data |
| SCL | I²C clock |

## Code

\`\`\`python
from modulino import ModulinoLatchRelay
from time import sleep_ms

relay = ModulinoLatchRelay()

relay.on()
sleep_ms(150)      # let the contacts settle before reading back
print(relay.is_on)
relay.off()
\`\`\`

| Member | What |
|---|---|
| \`.on()\` | pulse the SET coil — contacts close |
| \`.off()\` | pulse the RESET coil — contacts open |
| \`.is_on\` | \`True\`, \`False\`, or **\`None\`** |

### That \`None\`

\`.is_on\` returns \`None\` when the board can't tell you — it has been powered up
but not commanded, so the relay is sitting in whatever position it was left in
and the firmware has no record of which. It is a real answer, not an error:

\`\`\`python
state = relay.is_on
if state is None:
    print("unknown — latched from before the power cut")
\`\`\`

Give it ~150 ms after \`.on()\` / \`.off()\` before reading back; the contacts are
mechanical and the read beats them otherwise.

## On a non-Arduino board, pass the I²C bus yourself

The library works out which pins carry I²C from \`os.uname().machine\`, against a
table of **Arduino** boards. On anything else — a Pico, a Tiny 2350, an ESP32 —
that lookup fails and construction raises:

\`\`\`
RuntimeError: I2C interface couldn't be determined automatically for '<your board>'
\`\`\`

It isn't a wiring fault, and nothing is wrong with the module. Hand it a bus and
it works:

\`\`\`python
from machine import I2C, Pin
from modulino import ModulinoLatchRelay

# Use YOUR board's I²C pins — Snakie shows them on the board's pinout.
i2c = I2C(0, sda=Pin(4), scl=Pin(5))

relay = ModulinoLatchRelay(i2c_bus=i2c)
\`\`\`

Every Modulino class takes \`i2c_bus\`, so one bus serves a whole chain — build it
once and pass it to each module.

## Install the library

One package covers every Modulino:

\`\`\`python
mip.install("github:arduino/arduino-modulino-mpy")
\`\`\`

Snakie offers this for you when you place a Modulino on the board — and only
once, however many Modulinos your design has.

## Modulino addresses

As they appear **in a bus scan**:

| Address | Module | Re-addressable? |
|---|---|---|
| \`0x02\` | **Latch Relay** | yes |
| \`0x1E\` | Buzzer | yes |
| \`0x24\` | Motors | yes |
| \`0x29\` | Distance | **no** — VL53L4CD |
| \`0x2C\` | Joystick | yes |
| \`0x36\` | Pixels | yes |
| \`0x38\` | Vibro | yes |
| \`0x39\` | LED Matrix | yes |
| \`0x3A\` / \`0x3B\` | Knob | yes |
| \`0x3E\` | Buttons | yes |
| \`0x44\` | Thermo | **no** — HS3003 |
| \`0x53\` | Light | **no** — LTR-381RGB-01 |
| \`0x6A\` / \`0x6B\` | Movement | solder jumper only |

## Links

- [Product page](https://docs.arduino.cc/hardware/modulino-latch/) (ABX00138)
- [MicroPython library](https://github.com/arduino/arduino-modulino-mpy)
`},{id:"modulino-led-matrix",name:"Modulino LED Matrix",description:"8x12 charlieplexed LED matrix, 96 blue LEDs, I2C",manufacturer:"Arduino",partNumber:"ABX00152",family:"Output",tags:["led","modulino","arduino","matrix"],package:"SMD",pinSpacing:2.54,voltage:"3.3V",version:"0.1.10",pcbColor:"#0f5a2e",aspect:1.617,dimensions:{width:41,height:25.36},shape:{kind:"rect",cornerRadiusMm:4.6},headers:[{edge:"left",pins:[{name:"3v3",type:"pwr",number:2,shape:"header",x:.5301658715142143,y:.9491622862197885},{name:"GND",type:"gnd",number:1,shape:"header",x:.5921974436442057,y:.9491622862197885},{name:"SCL",type:"io",number:4,capabilities:["i2c"],signals:{i2c:"SCL"},shape:"header",x:.40610272725423174,y:.9491622862197885},{name:"SDA",type:"io",number:3,capabilities:["i2c"],signals:{i2c:"SDA"},shape:"header",x:.4681342993842231,y:.9491622862197885},{name:"GND",type:"gnd",number:5,shape:"header",x:.34334019978841146,y:.04643559307450278},{name:"SWDIO",type:"io",number:6,shape:"header",x:.40610272725423174,y:.04643559307450278},{name:"SWCLK",type:"io",number:7,shape:"header",x:.4681342993842231,y:.04332621757364836},{name:"PF2",type:"io",number:8,shape:"header",x:.5301658715142143,y:.04332621757364836},{name:"3v3",type:"pwr",number:9,shape:"header",x:.5921974436442057,y:.04332621757364836},{name:"P9",type:"gnd",number:10,shape:"header",x:.6549763958135321,y:.04643559307450278}]}],mountingHoles:[{x:.10483909606933593,y:.17556969513647555,diameter:1.5},{x:.8898472086588541,y:.17556969513647555,diameter:1.5},{x:.8898472086588541,y:.8181304758932203,diameter:1.5},{x:.10483909606933593,y:.8181304758932203,diameter:1.5}],connectors:[{z:0,kind:"qwiic",x:.05423502604166669,y:.4995403516474725,rotation:270,pins:[{name:"GND",type:"gnd"},{name:"3V3",type:"pwr"},{name:"SDA",type:"io",capabilities:["i2c"],signals:{i2c:"SDA"}},{name:"SCL",type:"io",capabilities:["i2c"],signals:{i2c:"SCL"}}]},{z:1,kind:"qwiic",x:.9409485371907552,y:.4991887777487167,rotation:90,pins:[{name:"GND-B",type:"gnd"},{name:"3V3-B",type:"pwr"},{name:"SDA-B",type:"io",capabilities:["i2c"],signals:{i2c:"SDA"}},{name:"SCL-B",type:"io",capabilities:["i2c"],signals:{i2c:"SCL"}}]}],rails:[{name:"GND",pins:["GND","GND-B"]},{name:"3V3",pins:["3V3","3V3-B"]},{name:"SDA",pins:["SDA","SDA-B"]},{name:"SCL",pins:["SCL","SCL-B"]}],i2cAddresses:[57],display:{width:12,height:8,colour:"gray4"},mass_g:4.4,mesh:"modulino.stl",meshUnits:"mm",drivers:[{source:"module:modulino",target:"lib/modulino",label:"Arduino Modulino library"}],library:{module:"modulino",docs:"https://docs.arduino.cc/hardware/modulino-ledmatrix/"},image:"image.jpg",rear:{image:"rear.jpg"},layerVisibility:{pcb:!0,image:!0,holes:!0,pins:!0,components:!0},helpText:`# Modulino LED Matrix

**96 blue LEDs in an 8 × 12 grid**, charlieplexed and driven by an onboard
STM32C011, so the whole thing hangs off two I²C wires. You draw into a
framebuffer with the same calls you'd use on an OLED — pixels, lines, shapes,
scrolling text — then push the frame to the board.

## The one thing that catches everyone: \`show()\`

Every drawing call writes to a buffer **in the Pico's memory**, not to the
board. Nothing lights up until you push it:

\`\`\`python
from modulino import ModulinoLEDMatrix

matrix = ModulinoLEDMatrix()

matrix.set_pixel(3, 4)
matrix.show()          # <- without this, nothing happens
\`\`\`

If your matrix stays dark and the code looks right, this is almost always why.
The calls chain, so \`matrix.clear().show()\` is the usual way to blank it.

## Address — \`0x39\`, and it *can* move

This module has its own MCU, so the address is software-settable if you need two
on one chain.

**Careful reading the docs:** the MicroPython library lists this module as
\`0x72\`, but that's the **8-bit** form — the firmware answers on \`0x72 >> 1\` =
**\`0x39\`**, which is what an I²C scan reports and what Arduino's store quotes.
Every Modulino *with* an MCU works this way. The four bare-sensor ones
(Distance, Thermo, Light, Movement) have no MCU and use their sensor's real
7-bit address unshifted.

## Wiring

A QWIIC socket at **each end**, both on the same bus in parallel — plug into
either and chain the next module off the other.

| Pin | What |
|---|---|
| GND | ground |
| 3V3 | 3.3 V |
| SDA | I²C data |
| SCL | I²C clock |

## Code

\`\`\`python
from modulino import ModulinoLEDMatrix

matrix = ModulinoLEDMatrix()
matrix.clear().show()

# On a non-Arduino board, or if construction reports it can't find the module on
# the bus, hand it both the bus and the address — see below.

matrix.set_pixel(0, 0)          # x 0-11, y 0-7
matrix.text(0, 0, "Hi")
matrix.show()
\`\`\`

Drawing calls mirror MicroPython's \`FrameBuffer\`:

| Call | Does |
|---|---|
| \`set_pixel(x, y)\` / \`clear_pixel(x, y)\` | one LED |
| \`line(x1, y1, x2, y2)\` | a line |
| \`rect(x, y, w, h)\` / \`ellipse(x, y, w, h)\` | shapes |
| \`text(x, y, "…")\` | 8×8 font — about 1½ characters fit |
| \`scroll(dx, dy)\` | shift the buffer |
| \`fill(colour)\` / \`clear()\` | all on / all off |
| \`show()\` | **push the buffer to the board** |

### Scrolling a message

The panel is only 12 columns wide, so anything longer than a character or two
has to scroll.

### Why \`scroll()\` doesn't do this

There is a \`scroll(dx, dy)\`, and it is the obvious thing to reach for. It won't
work, for three reasons that stack up:

- **The text isn't there to scroll.** \`text()\` draws into the 12 × 8 buffer with
  an 8 × 8 font, so only the first character and a half ever become pixels. The
  rest of the string is clipped as it is drawn — it is not held off-screen
  waiting to slide in. Scrolling cannot reveal what was never rendered.
- **It doesn't wrap.** Content pushed past an edge is gone, not brought round the
  other side. So even the character and a half you have simply leaves.
- **The vacated area isn't cleared.** MicroPython's own \`framebuf\` docs warn that
  scroll "may leave a footprint of the previous colours" — the space behind the
  shift is undefined rather than blank, which is why a naive scroll loop smears.

\`scroll()\` is a **buffer** operation, for animating something already drawn in
full: nudging a sprite, a bouncing dot, shifting a 12 × 8 image. The name invites
the misreading, because "scroll" on a display usually means scrolling a document.

None of this is specific to the Modulino — it is how \`framebuf\` behaves
everywhere, including on an SSD1306. A 128-wide OLED just hides it for longer;
twelve columns make it bite immediately.

So a marquee redraws each frame, at a moving negative offset. Every frame draws
the **whole** string from a shifted origin, so the panel's clipping window lands
on a different slice of it — and letters genuinely arrive from the right because
they are re-rendered, not shuffled along:

\`\`\`python
from time import sleep_ms

message = "HELLO"
WIDTH = 12                       # the panel is 12 columns wide

# Start at -WIDTH so the first frame draws the text just off the RIGHT edge, and
# run until it has fully left on the left. Starting at 0 would open with the
# message already sitting on the panel, which is not what a marquee should do.
for step in range(-WIDTH, len(message) * 8):
    matrix.clear()
    matrix.text(-step, 0, message)
    matrix.show()
    sleep_ms(80)
\`\`\`

### Grayscale

Ask for it at construction and each pixel takes a brightness of 0–15 instead of
on/off. The frame buffer grows from 12 bytes to 48, so it's a little slower to
push:

\`\`\`python
matrix = ModulinoLEDMatrix(use_grayscale=True)
matrix.set_pixel(5, 3, 8)    # half brightness
matrix.show()
\`\`\`

### Animations

\`Animation\` takes \`(frame_bytes, duration_ms)\` pairs; \`FPSAnimation\` takes plain
frames at a fixed rate:

\`\`\`python
from modulino import ModulinoLEDMatrix, Animation

frames = [
    (b'\\x00\\x00\\x00\\x00\\x10\\x00\\x00\\x00\\x00\\x00\\x00\\x00', 66),
    (b'\\x00\\x00\\x00\\x20\\x10\\x00\\x00\\x00\\x00\\x00\\x00\\x00', 40),
]
Animation(matrix, frames).play(loop=True)
\`\`\`

A monochrome frame is 12 bytes; a grayscale one is 48.

## On a non-Arduino board, pass the I²C bus yourself

The library works out which pins carry I²C from \`os.uname().machine\`, against a
table of **Arduino** boards. On anything else — a Pico, a Tiny 2350, an ESP32 —
that lookup fails and construction raises:

\`\`\`
RuntimeError: I2C interface couldn't be determined automatically for '<your board>'
\`\`\`

It isn't a wiring fault, and nothing is wrong with the module. Hand it a bus and
it works:

\`\`\`python
from machine import I2C, Pin
from modulino import ModulinoLEDMatrix

# Use YOUR board's I²C pins — Snakie shows them on the board's pinout.
i2c = I2C(0, sda=Pin(4), scl=Pin(5))

# Naming the address skips the library's auto-discovery, which does not find
# every board. Snakie has this number on the part's details page.
matrix = ModulinoLEDMatrix(i2c_bus=i2c, address=0x39)
\`\`\`

Every Modulino class takes \`i2c_bus\`, so one bus serves a whole chain — build it
once and pass it to each module.

## Install the library

One package covers every Modulino:

\`\`\`python
mip.install("github:arduino/arduino-modulino-mpy")
\`\`\`

Snakie offers this for you when you place a Modulino on the board — and only
once, however many Modulinos your design has.

## Modulino addresses

As they appear **in a bus scan**:

| Address | Module | Re-addressable? |
|---|---|---|
| \`0x02\` | Latch Relay | yes |
| \`0x1E\` | Buzzer | yes |
| \`0x24\` | Motors | yes |
| \`0x29\` | Distance | **no** — VL53L4CD |
| \`0x2C\` | Joystick | yes |
| \`0x36\` | Pixels | yes |
| \`0x38\` | Vibro | yes |
| \`0x39\` | **LED Matrix** | yes |
| \`0x3A\` / \`0x3B\` | Knob | yes |
| \`0x3E\` | Buttons | yes |
| \`0x44\` | Thermo | **no** — HS3003 |
| \`0x53\` | Light | **no** — LTR-381RGB-01 |
| \`0x6A\` / \`0x6B\` | Movement | **no** — LSM6DSOX |

## Links

- [Product page](https://docs.arduino.cc/hardware/modulino-ledmatrix/) (ABX00152)
- [MicroPython library](https://github.com/arduino/arduino-modulino-mpy)
`},{id:"modulino-light",name:"Modulino Light",description:"LTR-381RGB-01 ambient light, colour and IR sensor on an I²C Modulino.",manufacturer:"Arduino",family:"Sensor",tags:["modulino","arduino","i2c","qwiic","light","colour","ambient","ltr-381rgb","sensor"],package:"SMD",voltage:"3.3V",partNumber:"ABX00111",properties:{interface:"I²C (0x53, FIXED — no onboard MCU)",sensor:"LTR-381RGB-01 ambient light + colour",measures:"lux, red/green/blue, colour temperature (K), infrared",chain:"QWIIC socket at each end, same bus in parallel"},version:"0.1.12",pcbColor:"#00979d",aspect:1.617,dimensions:{width:41,height:25.36},shape:{kind:"rect",cornerRadiusMm:4.6},headers:[{edge:"right",pins:[{name:"GND",type:"gnd",number:1,shape:"header",rotation:90,x:.593804779053,y:.95009490694},{name:"3v3",type:"pwr",number:2,shape:"header",rotation:90,x:.533101654053,y:.948926821367},{name:"SDA",type:"io",number:3,capabilities:["i2c"],signals:{i2c:"SDA"},shape:"header",rotation:90,x:.46982711792,y:.948926821367},{name:"SCL",type:"io",number:4,capabilities:["i2c"],signals:{i2c:"SCL"},shape:"header",rotation:90,x:.407344970703,y:.95009490694},{name:"GND",type:"gnd",number:8,shape:"header",rotation:270,x:.593804779053,y:.048887736163},{name:"GND",type:"gnd",number:7,shape:"header",rotation:270,x:.533101654053,y:.048887736163},{name:"3v3",type:"pwr",number:6,shape:"header",rotation:270,x:.46982711792,y:.048887736163},{name:"GND",type:"gnd",number:5,shape:"header",rotation:270,x:.407344970703,y:.048887736163}]}],mountingHoles:[{x:.89024,y:.81546,diameter:1.5},{x:.10976,y:.81546,diameter:1.5},{x:.10976,y:.18454,diameter:1.5},{x:.89024,y:.18454,diameter:1.5}],rails:[{name:"GND",pins:["GND","GND-B"]},{name:"3V3",pins:["3V3","3V3-B"]},{name:"SDA",pins:["SDA","SDA-B"]},{name:"SCL",pins:["SCL","SCL-B"]}],connectors:[{z:0,kind:"qwiic",x:.94512,y:.5,rotation:90,pins:[{name:"GND",type:"gnd"},{name:"3V3",type:"pwr"},{name:"SDA",type:"io",capabilities:["i2c"],signals:{i2c:"SDA"}},{name:"SCL",type:"io",capabilities:["i2c"],signals:{i2c:"SCL"}}]},{z:0,kind:"qwiic",x:.05488,y:.5,rotation:270,pins:[{name:"GND-B",type:"gnd"},{name:"3V3-B",type:"pwr"},{name:"SDA-B",type:"io",capabilities:["i2c"],signals:{i2c:"SDA"}},{name:"SCL-B",type:"io",capabilities:["i2c"],signals:{i2c:"SCL"}}]}],image:"image.png",rear:{image:"rear.png"},mesh:"modulino.stl",meshUnits:"mm",mass_g:4.4,i2cAddresses:[83],library:{module:"modulino",docs:"https://docs.arduino.cc/hardware/modulino-buttons/"},drivers:[{source:"module:modulino",target:"lib/modulino",label:"Arduino Modulino library"}],layerVisibility:{pcb:!1,image:!0,holes:!0,pins:!0,components:!0},helpText:`# Modulino Light

An **LTR-381RGB-01** on Arduino's I²C Modulino board: ambient light in lux, red,
green and blue channels, a colour temperature in kelvin, and infrared — so it
can tell you how bright a room is *and* what colour the light in it is.

## Address — this one is fixed

**\`0x53\`, and it cannot be changed.** There's no MCU on this board: the
LTR-381RGB-01 answers for itself, so the address is set in silicon. Two Light
modules **cannot share a chain**.

That's the split across the range: the modules with an onboard MCU (Buttons,
Buzzer, Knob, Pixels, Motors…) can be re-addressed; the four bare-sensor ones
(Light, Distance, Thermo, Movement) can't.

## Wiring

A QWIIC socket at **each end**, both on the same bus in parallel — plug into
either and chain the next module off the other.

| Pin | What |
|---|---|
| GND | ground |
| 3V3 | 3.3 V |
| SDA | I²C data |
| SCL | I²C clock |

## Code

\`\`\`python
from modulino import ModulinoLight

light = ModulinoLight()

print(light.lux)                      # ambient brightness
print(light.r, light.g, light.b)      # colour channels
print(light.colour_temperature)       # kelvin
print(light.ir)                       # infrared
\`\`\`

Reach the chip directly for gain and integration time when the defaults don't
suit — a dim room or a fast-moving robot both want tuning:

\`\`\`python
from modulino import ModulinoLight

light = ModulinoLight()

light.sensor          # the underlying LTR-381RGB-01 driver
\`\`\`

## On a non-Arduino board, pass the I²C bus yourself

The library works out which pins carry I²C from \`os.uname().machine\`, against a
table of **Arduino** boards. On anything else — a Pico, a Tiny 2350, an ESP32 —
that lookup fails and construction raises:

\`\`\`
RuntimeError: I2C interface couldn't be determined automatically for '<your board>'
\`\`\`

It isn't a wiring fault, and nothing is wrong with the module. Hand it a bus and
it works:

\`\`\`python
from machine import I2C, Pin
from modulino import ModulinoLight

# Use YOUR board's I²C pins — Snakie shows them on the board's pinout.
i2c = I2C(0, sda=Pin(4), scl=Pin(5))

light = ModulinoLight(i2c_bus=i2c)
\`\`\`

Every Modulino class takes \`i2c_bus\`, so one bus serves a whole chain — build it
once and pass it to each module.

## Install the library

One package covers every Modulino, and this one needs a second: the Modulino
package's \`deps\` pull in \`github:arduino/micropython-ltr-381rgb-01\`, and \`mip\`
installs it for you.

\`\`\`python
mip.install("github:arduino/arduino-modulino-mpy")
\`\`\`

Snakie offers this when you place a Modulino on the board — once, however many
Modulinos your design has. **If the extra dependency doesn't arrive, this module
won't import**: check the board has a network connection when installing, since
mip fetches the deps at install time.

## Modulino addresses

| Address | Module | Re-addressable? |
|---|---|---|
| \`0x04\` | Latch Relay | yes |
| \`0x29\` | Distance | **no** — VL53L4CD |
| \`0x3C\` | Buzzer | yes |
| \`0x44\` | Thermo | **no** — HS3003 |
| \`0x48\` | Motors | yes |
| \`0x53\` | **Light** | **no** — LTR-381RGB-01 |
| \`0x58\` | Joystick | yes |
| \`0x6A\` / \`0x6B\` | Movement | **no** — LSM6DSOX |
| \`0x6C\` | Pixels | yes |
| \`0x70\` | Vibro | yes |
| \`0x72\` | LED Matrix | yes |
| \`0x74\` / \`0x76\` | Knob | yes |
| \`0x7C\` | Buttons | yes |

## Links

- [Product page](https://docs.arduino.cc/hardware/modulino-light/) (ABX00111)
- [MicroPython library](https://github.com/arduino/arduino-modulino-mpy)
`},{id:"modulino-motors",name:"Modulino Motors",description:"Dual H-bridge motor driver on an I²C Modulino — two DC motors, or one stepper.",manufacturer:"Arduino",family:"Motor",tags:["modulino","arduino","i2c","qwiic","motor","h-bridge","stepper","max22211"],package:"SMD",voltage:"3.3V",partNumber:"ABX00114",properties:{interface:"I²C (0x48, re-addressable — onboard MCU)",driver:"MAX22211 dual H-bridge",outputs:"2 brushed DC motors, 1 bipolar stepper, or solenoids/valves",current:"up to 3.8 A per channel",supply:"separate 5–24 V motor supply; logic stays 3.3 V",sensing:"per-channel current measurement"},version:"0.1.9",pcbColor:"#00979d",aspect:1.617,dimensions:{width:41,height:25.36},shape:{kind:"rect",cornerRadius:.22,cornerRadiusMm:4.6},headers:[{edge:"bottom",pins:[{name:"VIN",type:"pwr",number:4,shape:"header",x:.530688985189,y:.950169996388},{name:"GND",type:"gnd",number:3,shape:"header",x:.60033976237,y:.950169996388},{name:"A1",type:"other",number:9,shape:"header",x:.215284474691,y:.136603040404},{name:"A2",type:"other",number:10,shape:"header",x:.283895568848,y:.136603040404},{name:"B1",type:"other",number:11,shape:"header",x:.343759765625,y:.136603040404},{name:"B2",type:"other",number:12,shape:"header",x:.405014444987,y:.136615703916},{name:"P6",type:"io",number:2,capabilities:["digital"],shape:"header",x:.657203572591,y:.950169996388},{name:"SDA",type:"io",number:5,capabilities:["i2c"],signals:{i2c:"SDA"},shape:"header",x:.470720469157,y:.950169996388},{name:"SCL",type:"io",number:6,capabilities:["i2c"],signals:{i2c:"SCL"},shape:"header",x:.405014444987,y:.950169996388},{name:"SWCLK",type:"io",number:7,shape:"header",x:.343759765625,y:.950169996388},{name:"SWDIO",type:"io",number:8,shape:"header",x:.283895568848,y:.950169996388},{name:"VM",type:"pwr",number:1,shape:"header",x:.717562934028,y:.950169996388},{name:"VCC",type:"pwr",number:16,shape:"header",x:.790713348389,y:.136615703916},{name:"VM",type:"io",number:15,capabilities:["digital"],shape:"header",x:.727255486382,y:.136226259827},{name:"GND",type:"gnd",number:14,shape:"header",x:.663797624376,y:.136226259827},{name:"GND",type:"gnd",number:13,shape:"header",x:.60033976237,y:.136603040404}]}],mountingHoles:[{x:.89024,y:.81546,diameter:1.5},{x:.10976,y:.81546,diameter:1.5},{x:.10976,y:.18454,diameter:1.5},{x:.89024,y:.18454,diameter:1.5}],rails:[{name:"GND",pins:["GND","GND-B"]},{name:"3V3",pins:["3V3","3V3-B"]},{name:"SDA",pins:["SDA","SDA-B"]},{name:"SCL",pins:["SCL","SCL-B"]}],connectors:[{z:0,kind:"qwiic",x:.94512,y:.499259020126,rotation:90,pins:[{name:"GND",type:"gnd"},{name:"3V3",type:"pwr"},{name:"SDA",type:"io",capabilities:["i2c"],signals:{i2c:"SDA"}},{name:"SCL",type:"io",capabilities:["i2c"],signals:{i2c:"SCL"}}]},{z:0,kind:"qwiic",x:.05488,y:.5,rotation:270,pins:[{name:"GND-B",type:"gnd"},{name:"3V3-B",type:"pwr"},{name:"SDA-B",type:"io",capabilities:["i2c"],signals:{i2c:"SDA"}},{name:"SCL-B",type:"io",capabilities:["i2c"],signals:{i2c:"SCL"}}]}],image:"image.jpg",rear:{image:"rear.jpg"},mesh:"modulino.stl",meshUnits:"mm",mass_g:4.4,i2cAddresses:[36],library:{module:"modulino",docs:"https://docs.arduino.cc/hardware/modulino-motors/"},drivers:[{source:"module:modulino",target:"lib/modulino",label:"Arduino Modulino library"}],layerVisibility:{pcb:!1,image:!0,holes:!0,pins:!0,components:!0},helpText:`# Modulino Motors

A **MAX22211 dual H-bridge** on Arduino's I²C Modulino board: two brushed DC
motors, one bipolar stepper, or a couple of solenoids — up to **3.8 A per
channel**, with current sensing on both.

## Address

**\`0x48\`.** There's an MCU on this board rather than a bare driver chip, so the
address is **re-addressable** and two Motors modules can share a chain.

Worth knowing: \`0x48\` is also the default for the very common **ADS1115/ADS1015
ADC** and **TMP102**. If a scan shows \`0x48\` and you have one of those on the
bus too, one of them has to move.

## Power — this one needs its own supply

Logic runs at 3.3 V over QWIIC, but the motors do **not**: give \`VIN\` a separate
**5–24 V** supply sized for your motors. The two positive rails stay isolated;
the grounds are common, which is why \`GND\` on the screw terminal is the same net
as QWIIC ground in the Board View.

> Don't try to run motors off the QWIIC 3V3 — it can't source it, and a stalled
> motor pulling 3.8 A through a QWIIC cable is a fire, not a brownout.

| Terminal | What |
|---|---|
| VIN / GND | motor supply, 5–24 V |
| A1 / A2 | motor A |
| B1 / B2 | motor B |

For a **stepper**, one coil goes to A1/A2 and the other to B1/B2.

## Code

\`\`\`python
from modulino import ModulinoMotors

motors = ModulinoMotors()

motors.speed_a = 60          # 0–100 %
motors.speed_b = 60
motors.invert_b = True       # opposite side of a rover drives backwards

print(motors.sensed_current)  # (mA, mA) — a stalled motor shows up here

motors.stop()                 # brake
motors.release()              # coast
\`\`\`

As a stepper:

\`\`\`python
from modulino import ModulinoMotors

motors = ModulinoMotors()

motors.stepper_mode_enabled = True
motors.steps_per_revolution = 200
motors.move_stepper_rpm(400, rpm=60)   # two turns at 60 rpm
\`\`\`

## The Motor instrument

Snakie's **Motor** panel doesn't drive this board yet. The panel speaks signed
powers (\`-1.0\`…\`1.0\`) to a driver exposing \`drive(a, b)\` / \`stop_all()\` /
\`brake()\` / \`standby()\`, which is the bundled \`tb6612\` module's shape;
\`ModulinoMotors\` instead exposes unsigned \`speed_a\`/\`speed_b\` (0–100) plus
\`invert_a\`/\`invert_b\`. A small adapter bridges the two — tracked separately.

Everything above works today from your own code.

## On a non-Arduino board, pass the I²C bus yourself

The library works out which pins carry I²C from \`os.uname().machine\`, against a
table of **Arduino** boards. On anything else — a Pico, a Tiny 2350, an ESP32 —
that lookup fails and construction raises:

\`\`\`
RuntimeError: I2C interface couldn't be determined automatically for '<your board>'
\`\`\`

It isn't a wiring fault, and nothing is wrong with the module. Hand it a bus and
it works:

\`\`\`python
from machine import I2C, Pin
from modulino import ModulinoMotors

# Use YOUR board's I²C pins — Snakie shows them on the board's pinout.
i2c = I2C(0, sda=Pin(4), scl=Pin(5))

motors = ModulinoMotors(i2c_bus=i2c)
\`\`\`

Every Modulino class takes \`i2c_bus\`, so one bus serves a whole chain — build it
once and pass it to each module.

## Install the library

One package covers every Modulino:

\`\`\`python
mip.install("github:arduino/arduino-modulino-mpy")
\`\`\`

Snakie offers this for you when you place a Modulino on the board — and only
once, however many Modulinos your design has.

## Modulino addresses

| Address | Module | Re-addressable? |
|---|---|---|
| \`0x04\` | Latch Relay | yes |
| \`0x29\` | Distance | **no** — VL53L4CD |
| \`0x3C\` | Buzzer | yes |
| \`0x44\` | Thermo | **no** — HS3003 |
| \`0x48\` | **Motors** | yes |
| \`0x53\` | Light | **no** — LTR-381RGB-01 |
| \`0x58\` | Joystick | yes |
| \`0x6A\` / \`0x6B\` | Movement | **no** — LSM6DSOX |
| \`0x6C\` | Pixels | yes |
| \`0x70\` | Vibro | yes |
| \`0x72\` | LED Matrix | yes |
| \`0x74\` / \`0x76\` | Knob | yes |
| \`0x7C\` | Buttons | yes |

The **no** rows have no onboard MCU: the sensor chip answers directly, so its
address is fixed in silicon and two of that module can't share a chain.

## Links

- [Product page](https://docs.arduino.cc/hardware/modulino-motors/) (ABX00114)
- [MicroPython library](https://github.com/arduino/arduino-modulino-mpy)
`},{id:"modulino-movement",name:"Modulino Movement",description:"LSM6DSOX 6-axis IMU — accelerometer + gyroscope — on an I²C Modulino, daisy-chainable over QWIIC.",manufacturer:"Arduino",family:"Sensor",tags:["modulino","arduino","i2c","qwiic","imu","accelerometer","gyroscope","lsm6dsox","sensor"],package:"SMD",voltage:"3.3V",partNumber:"ABX00101",properties:{interface:"I²C (0x6A or 0x6B, set by a solder jumper — no onboard MCU)",sensor:"LSM6DSOXTR 6-axis IMU",measures:"linear acceleration (g) and angular velocity (dps), each on X/Y/Z",chain:"QWIIC socket at each end, same bus in parallel"},version:"0.1.2",pcbColor:"#00979d",aspect:1.617,dimensions:{width:41,height:25.36},shape:{kind:"rect",cornerRadiusMm:4.6},headers:[{edge:"left",pins:[{name:"GND",type:"gnd",number:1,shape:"header",x:.7196906951060892,y:.04990509305968019},{name:"3v3",type:"pwr",number:2,shape:"header",x:.7807201038788757,y:.04990509305968019},{name:"SDx",type:"io",number:3,capabilities:["i2c"],signals:{i2c:"SDA"},shape:"header",x:.40644876191924023,y:.0495031499210843},{name:"SCx",type:"io",number:4,signals:{i2c:"SCL"},shape:"header",x:.46689834594726565,y:.04990509305968019},{name:"SCL",type:"io",number:8,capabilities:["i2c"],signals:{i2c:"SCL"},shape:"header",x:.4061952209472656,y:.9511122638369459},{name:"SDA",type:"io",number:7,capabilities:["i2c"],signals:{i2c:"SDA"},shape:"header",x:.46689834594726565,y:.9511122638369459},{name:"3v3",type:"pwr",number:6,shape:"header",x:.5301728820800782,y:.9511122638369459},{name:"GND",type:"gnd",number:5,shape:"header",x:.592655029296875,y:.9511122638369459},{name:"INT",type:"io",side:"rear",gpio:8,capabilities:["digital"],shape:"header",x:.344926011064748,y:.04743085674683003},{name:"INT2",type:"io",side:"rear",gpio:9,capabilities:["digital"],shape:"header",x:.40644876191924023,y:.04743085674683003},{name:"SDO",type:"io",side:"rear",gpio:10,capabilities:["digital"],shape:"header",x:.46689834594726565,y:.04990509305968019},{name:"CS",type:"io",side:"rear",gpio:11,capabilities:["digital"],shape:"header",x:.6568434050670267,y:.0495031499210843},{name:"SD0/SA0",type:"io",side:"rear",gpio:12,capabilities:["digital"],shape:"header",x:.7196906951060892,y:.05167601111058056},{name:"OCSAUX",type:"io",side:"rear",gpio:13,capabilities:["digital"],shape:"header",x:.7807201038788757,y:.05167601111058056}]}],mountingHoles:[{x:.10309460489908853,y:.18454,diameter:1.5},{x:.89024,y:.18454,diameter:1.5},{x:.89024,y:.81546,diameter:1.5},{x:.10309460489908853,y:.81546,diameter:1.5}],rails:[{name:"GND",pins:["GND","GND-B"]},{name:"3V3",pins:["3V3","3V3-B"]},{name:"SDA",pins:["SDA","SDA-B"]},{name:"SCL",pins:["SCL","SCL-B"]}],connectors:[{z:0,kind:"qwiic",x:.05488,y:.5,rotation:270,pins:[{name:"GND",type:"gnd"},{name:"3V3",type:"pwr"},{name:"SDA",type:"io",capabilities:["i2c"],signals:{i2c:"SDA"}},{name:"SCL",type:"io",capabilities:["i2c"],signals:{i2c:"SCL"}}]},{z:0,kind:"qwiic",x:.94512,y:.5,rotation:90,pins:[{name:"GND-B",type:"gnd"},{name:"3V3-B",type:"pwr"},{name:"SDA-B",type:"io",capabilities:["i2c"],signals:{i2c:"SDA"}},{name:"SCL-B",type:"io",capabilities:["i2c"],signals:{i2c:"SCL"}}]}],image:"image.jpg",rear:{image:"rear.jpg",imageLayer:{x:-.000248616536458357,y:.0003893618578665048,w:1,h:1}},mesh:"modulino.stl",meshUnits:"mm",mass_g:3.9,i2cAddresses:[106,107],library:{module:"modulino",docs:"https://docs.arduino.cc/hardware/modulino-buttons/"},drivers:[{source:"module:modulino",target:"lib/modulino",label:"Arduino Modulino library"}],layerVisibility:{pcb:!1,image:!0,holes:!0,pins:!0,components:!0},helpText:`# Modulino Movement

An **LSM6DSOX** six-axis IMU on Arduino's I²C Modulino board: a three-axis
accelerometer and a three-axis gyroscope in one chip. It tells you which way is
down, how fast the board is turning, and — with a bit of arithmetic — pitch and
roll.

## Address — \`0x6A\` or \`0x6B\`

There's no MCU on this board; the LSM6DSOX answers for itself, so the address is
set in silicon rather than in software. A **solder jumper** on the board picks
between the two, which is how you get two Movement modules on one chain — but it
means moving one is a soldering iron job, not a line of code.

The library tries both addresses in turn, so you don't normally have to say which
you have.

## Wiring

A QWIIC socket at **each end**, both on the same bus in parallel — plug into
either and chain the next module off the other.

| Pin | What |
|---|---|
| GND | ground |
| 3V3 | 3.3 V |
| SDA | I²C data |
| SCL | I²C clock |

## Code

\`\`\`python
from modulino import ModulinoMovement

movement = ModulinoMovement()

while True:
    print(movement.acceleration)      # g, as .x / .y / .z
    print(movement.angular_velocity)  # degrees per second
\`\`\`

Both properties return a named tuple, so you can pull one axis out or unpack all
three:

\`\`\`python
a = movement.acceleration
print(a.z)

x, y, z = movement.angular_velocity
\`\`\`

| Property | Returns |
|---|---|
| \`.acceleration\` | linear acceleration in **g**, X/Y/Z |
| \`.angular_velocity\` | rotation rate in **degrees per second**, X/Y/Z |
| \`.acceleration_magnitude\` | length of the acceleration vector — ≈ 1.0 at rest |
| \`.angular_velocity_magnitude\` | length of the rotation vector — ≈ 0 at rest |

### Is it level?

At rest the only acceleration is gravity, so \`.acceleration_magnitude\` reads
about **1.0 g**. That makes it an easy sanity check that the board is talking
sense before you trust anything else it says:

\`\`\`python
from time import sleep

while True:
    a = movement.acceleration
    if abs(a.z - 1.0) < 0.05:
        print("flat")
    sleep(0.2)
\`\`\`

Note the gyroscope measures **rate of turn**, not angle — hold the board still at
45° and it reads zero. Getting an angle out means integrating over time, and the
error accumulates; fusing it with the accelerometer is the usual answer.

## On a non-Arduino board, pass the I²C bus yourself

The library works out which pins carry I²C from \`os.uname().machine\`, against a
table of **Arduino** boards. On anything else — a Pico, a Tiny 2350, an ESP32 —
that lookup fails and construction raises:

\`\`\`
RuntimeError: I2C interface couldn't be determined automatically for '<your board>'
\`\`\`

It isn't a wiring fault, and nothing is wrong with the module. Hand it a bus and
it works:

\`\`\`python
from machine import I2C, Pin
from modulino import ModulinoMovement

# Use YOUR board's I²C pins — Snakie shows them on the board's pinout.
i2c = I2C(0, sda=Pin(4), scl=Pin(5))

movement = ModulinoMovement(i2c_bus=i2c)
\`\`\`

Every Modulino class takes \`i2c_bus\`, so one bus serves a whole chain — build it
once and pass it to each module.

## Install the library

One package covers every Modulino, and it brings the \`lsm6dsox\` driver with it:

\`\`\`python
mip.install("github:arduino/arduino-modulino-mpy")
\`\`\`

Snakie offers this for you when you place a Modulino on the board — and only
once, however many Modulinos your design has.

## Modulino addresses

As they appear **in a bus scan**:

| Address | Module | Re-addressable? |
|---|---|---|
| \`0x02\` | Latch Relay | yes |
| \`0x1E\` | Buzzer | yes |
| \`0x24\` | Motors | yes |
| \`0x29\` | Distance | **no** — VL53L4CD |
| \`0x2C\` | Joystick | yes |
| \`0x36\` | Pixels | yes |
| \`0x38\` | Vibro | yes |
| \`0x39\` | LED Matrix | yes |
| \`0x3A\` / \`0x3B\` | Knob | yes |
| \`0x3E\` | Buttons | yes |
| \`0x44\` | Thermo | **no** — HS3003 |
| \`0x53\` | Light | **no** — LTR-381RGB-01 |
| \`0x6A\` / \`0x6B\` | **Movement** | solder jumper only |

## Links

- [Product page](https://docs.arduino.cc/hardware/modulino-movement/) (ABX00101)
- [MicroPython library](https://github.com/arduino/arduino-modulino-mpy)
`},{id:"modulino-pixels",name:"Modulino Pixels",description:"Eight addressable RGB LEDs in a row, per-LED colour and brightness, on an I²C Modulino, daisy-chainable over QWIIC.",manufacturer:"Arduino",family:"Output",tags:["modulino","arduino","i2c","qwiic","addressable-led","rgb","led","output"],package:"SMD",voltage:"3.3V",partNumber:"ABX00109",properties:{interface:"I²C (0x36, re-addressable — onboard MCU)",leds:"8 × LC8822-2020 addressable RGB, 2.0 mm square",control:"per-LED colour and 0–100 brightness, applied on show()",mcu:"STM32C011F4",chain:"QWIIC socket at each end, same bus in parallel"},version:"0.1.14",pcbColor:"#00979d",aspect:1.617,dimensions:{width:41,height:25.36},shape:{kind:"rect",cornerRadiusMm:4.6},headers:[{edge:"left",pins:[{name:"GND",type:"gnd",side:"rear",number:10,shape:"header",x:.2237909444173177,y:.05216997028274617},{name:"GND",type:"gnd",side:"rear",number:9,shape:"header",x:.28551470721209493,y:.05216997028274617},{name:"3v3",type:"pwr",side:"rear",number:8,shape:"header",x:.3475292294937621,y:.05216997028274617},{name:"PF2",type:"io",side:"rear",number:7,capabilities:["digital"],shape:"header",x:.41004730224609376,y:.05216997028274617},{name:"SWCLK",type:"io",side:"rear",number:6,shape:"header",x:.4718341657850477,y:.05216997028274617},{name:"SWDIO",type:"io",side:"rear",number:5,shape:"header",x:.5324097583912037,y:.05216997028274617},{name:"TX1",type:"io",side:"rear",number:4,capabilities:["uart"],signals:{uart:"TX"},buses:{uart:1},shape:"header",x:.5954078928629557,y:.05216997028274617},{name:"RX1",type:"io",side:"rear",number:3,capabilities:["uart"],signals:{uart:"RX"},buses:{uart:1},shape:"header",x:.6558572839807582,y:.05216997028274617},{name:"D0",type:"io",side:"rear",number:2,capabilities:["digital"],shape:"header",x:.7175810467755354,y:.05216997028274617},{name:"C0",type:"io",side:"rear",number:1,capabilities:["digital"],shape:"header",x:.7793048095703126,y:.05216997028274617},{name:"GND",type:"gnd",side:"rear",number:11,shape:"header",x:.41004730224609376,y:.9499496671554293},{name:"3v3",type:"pwr",side:"rear",number:12,shape:"header",x:.4718341657850477,y:.9499496671554293},{name:"SDA",type:"io",side:"rear",number:13,capabilities:["i2c"],signals:{i2c:"SDA"},shape:"header",x:.5324097583912037,y:.9499496671554293},{name:"SCL",type:"io",side:"rear",number:14,capabilities:["i2c"],signals:{i2c:"SCL"},shape:"header",x:.5954078928629557,y:.9499496671554293}]}],mountingHoles:[{x:.10976,y:.18454,diameter:1.5},{x:.89024,y:.18454,diameter:1.5},{x:.89024,y:.81546,diameter:1.5},{x:.10976,y:.81546,diameter:1.5}],rails:[{name:"GND",pins:["GND","GND-B"]},{name:"3V3",pins:["3V3","3V3-B"]},{name:"SDA",pins:["SDA","SDA-B"]},{name:"SCL",pins:["SCL","SCL-B"]}],onboardLeds:[{kind:"neopixel",x:.235,y:.5,label:"1",sizeMm:2},{kind:"neopixel",x:.3107,y:.5,label:"2",sizeMm:2},{kind:"neopixel",x:.3864,y:.5,label:"3",sizeMm:2},{kind:"neopixel",x:.4621,y:.5,label:"4",sizeMm:2},{kind:"neopixel",x:.5379,y:.5,label:"5",sizeMm:2},{kind:"neopixel",x:.6136,y:.5,label:"6",sizeMm:2},{kind:"neopixel",x:.6893,y:.5,label:"7",sizeMm:2},{kind:"neopixel",x:.765,y:.5,label:"8",sizeMm:2}],connectors:[{z:0,kind:"qwiic",x:.05183,y:.5,rotation:270,pins:[{name:"GND",type:"gnd"},{name:"3V3",type:"pwr"},{name:"SDA",type:"io",capabilities:["i2c"],signals:{i2c:"SDA"}},{name:"SCL",type:"io",capabilities:["i2c"],signals:{i2c:"SCL"}}]},{z:0,kind:"qwiic",x:.94817,y:.5,rotation:90,pins:[{name:"GND-B",type:"gnd"},{name:"3V3-B",type:"pwr"},{name:"SDA-B",type:"io",capabilities:["i2c"],signals:{i2c:"SDA"}},{name:"SCL-B",type:"io",capabilities:["i2c"],signals:{i2c:"SCL"}}]}],image:"image.jpg",imageLayer:{x:-.00028734842936198324,y:0,w:1,h:1},rear:{image:"rear.jpg"},mesh:"modulino.stl",meshUnits:"mm",mass_g:4.4,i2cAddresses:[54],library:{module:"modulino",docs:"https://docs.arduino.cc/hardware/modulino-pixels/"},drivers:[{source:"module:modulino",target:"lib/modulino",label:"Arduino Modulino library"}],layerVisibility:{pcb:!0,image:!0,holes:!0,pins:!0,components:!0},helpText:`# Modulino Pixels

Eight **LC8822-2020** addressable RGB LEDs in a row, each with its own colour and
its own brightness. An onboard **STM32C011F4** drives them, so there's no strict
bit-banged timing to get right — you send colours over I²C.

## Address — \`0x36\`

There's an MCU on this one, so the address is **software-configurable** — which
is how you run two Pixels strips on one chain.

Mind the shift if you go reading Arduino's own material: the library declares the
module's *pinstrap* as \`0x6C\`, and the firmware answers on **half** that. \`0x36\`
is what a bus scan reports.

## Wiring

A QWIIC socket at **each end**, both on the same bus in parallel — plug into
either and chain the next module off the other.

| Pin | What |
|---|---|
| GND | ground |
| 3V3 | 3.3 V |
| SDA | I²C data |
| SCL | I²C clock |

Eight LEDs at full white is roughly **80 mA** off the QWIIC 3V3 rail. That's fine
on its own; it's worth remembering when this is the fourth module on a chain.

## Code

Every setter only stages a change. **Nothing lights up until \`.show()\`** — that's
the one thing that catches people out:

\`\`\`python
from modulino import ModulinoPixels, ModulinoColor

pixels = ModulinoPixels()

pixels.set_all_color(ModulinoColor.BLUE, 50)
pixels.show()
\`\`\`

| Call | What |
|---|---|
| \`.set_rgb(i, r, g, b, brightness)\` | one LED, 0–255 each, brightness 0–100 |
| \`.set_color(i, color, brightness)\` | one LED from a \`ModulinoColor\` |
| \`.set_range_rgb(from, to, r, g, b, brightness)\` | an inclusive span |
| \`.set_all_rgb(r, g, b, brightness)\` / \`.set_all_color(…)\` | all eight |
| \`.set_brightness(i, b)\` / \`.set_all_brightness(b)\` | brightness alone |
| \`.clear(i)\` / \`.clear_range(from, to)\` / \`.clear_all()\` | off |
| \`.show()\` | push the staged frame to the LEDs |

\`ModulinoColor\` ships \`RED\`, \`GREEN\`, \`BLUE\`, \`YELLOW\`, \`CYAN\`, \`MAGENTA\` and
\`WHITE\`, and you can build your own with \`ModulinoColor(r, g, b)\`.

### Index them like a list

The setters return the object, so they chain; and \`pixels[i] = …\` works with a
3- or 4-tuple (the fourth being brightness), or \`None\` to clear one:

\`\`\`python
from modulino import ModulinoPixels

pixels = ModulinoPixels()

pixels[0] = (255, 0, 0)        # red, full brightness
pixels[1] = (0, 255, 0, 25)    # green, dimmed
pixels[2] = None               # off
pixels.show()
\`\`\`

### A moving dot

Brightness is separate from colour, which makes a fading trail easy — set the
colour once, then walk the brightness along:

\`\`\`python
from modulino import ModulinoPixels, ModulinoColor
from time import sleep

pixels = ModulinoPixels()

while True:
    for i in range(8):
        pixels.clear_all()
        pixels.set_color(i, ModulinoColor.CYAN, 60)
        pixels.show()
        sleep(0.08)
\`\`\`

Indices are **0–7**; anything outside raises \`ValueError\` rather than silently
doing nothing.

## On a non-Arduino board, pass the I²C bus yourself

The library works out which pins carry I²C from \`os.uname().machine\`, against a
table of **Arduino** boards. On anything else — a Pico, a Tiny 2350, an ESP32 —
that lookup fails and construction raises:

\`\`\`
RuntimeError: I2C interface couldn't be determined automatically for '<your board>'
\`\`\`

It isn't a wiring fault, and nothing is wrong with the module. Hand it a bus and
it works:

\`\`\`python
from machine import I2C, Pin
from modulino import ModulinoPixels

# Use YOUR board's I²C pins — Snakie shows them on the board's pinout.
i2c = I2C(0, sda=Pin(4), scl=Pin(5))

pixels = ModulinoPixels(i2c_bus=i2c)
\`\`\`

Every Modulino class takes \`i2c_bus\`, so one bus serves a whole chain — build it
once and pass it to each module.

## Install the library

One package covers every Modulino:

\`\`\`python
mip.install("github:arduino/arduino-modulino-mpy")
\`\`\`

Snakie offers this for you when you place a Modulino on the board — and only
once, however many Modulinos your design has.

## Modulino addresses

As they appear **in a bus scan**:

| Address | Module | Re-addressable? |
|---|---|---|
| \`0x02\` | Latch Relay | yes |
| \`0x1E\` | Buzzer | yes |
| \`0x24\` | Motors | yes |
| \`0x29\` | Distance | **no** — VL53L4CD |
| \`0x2C\` | Joystick | yes |
| \`0x36\` | **Pixels** | yes |
| \`0x38\` | Vibro | yes |
| \`0x39\` | LED Matrix | yes |
| \`0x3A\` / \`0x3B\` | Knob | yes |
| \`0x3E\` | Buttons | yes |
| \`0x44\` | Thermo | **no** — HS3003 |
| \`0x53\` | Light | **no** — LTR-381RGB-01 |
| \`0x6A\` / \`0x6B\` | Movement | solder jumper only |

## Links

- [Product page](https://docs.arduino.cc/hardware/modulino-pixels/) (ABX00109)
- [MicroPython library](https://github.com/arduino/arduino-modulino-mpy)
`},{id:"modulino-thermo",name:"Modulino Thermo",description:"HS3003 temperature and relative-humidity sensor on an I²C Modulino, daisy-chainable over QWIIC.",manufacturer:"Arduino",family:"Sensor",tags:["modulino","arduino","i2c","qwiic","temperature","humidity","env","hs3003","sensor"],package:"SMD",voltage:"3.3V",partNumber:"ABX00103",properties:{interface:"I²C (0x44, fixed in silicon — no onboard MCU)",sensor:"Renesas HS3003 temperature + relative humidity",measures:"−40 °C to +125 °C, 0–100 % RH, 14-bit each",accuracy:"±0.25 °C, ±2.8 % RH",chain:"QWIIC socket at each end, same bus in parallel"},version:"0.1.2",pcbColor:"#00979d",aspect:1.617,dimensions:{width:41,height:25.36},shape:{kind:"rect",cornerRadiusMm:4.6},headers:[{edge:"left",pins:[{name:"SCL",type:"io",number:1,gpio:0,capabilities:["i2c"],signals:{i2c:"SCL"},shape:"header",x:.4083082834879558,y:.951690015983381},{name:"SDA",type:"io",number:2,capabilities:["i2c"],signals:{i2c:"SDA"},shape:"header",x:.4702770657009549,y:.951690015983381},{name:"3v3",type:"pwr",number:3,shape:"header",x:.532245847913954,y:.951690015983381},{name:"GND",type:"gnd",shape:"header",x:.5941137186686198,y:.951690015983381}]}],mountingHoles:[{x:.10976,y:.18454,diameter:1.5},{x:.89024,y:.18454,diameter:1.5},{x:.89024,y:.81546,diameter:1.5},{x:.10976,y:.81546,diameter:1.5}],rails:[{name:"GND",pins:["GND","GND-B"]},{name:"3V3",pins:["3V3","3V3-B"]},{name:"SDA",pins:["SDA","SDA-B"]},{name:"SCL",pins:["SCL","SCL-B"]}],connectors:[{z:0,kind:"qwiic",x:.05183,y:.5,rotation:270,pins:[{name:"GND",type:"gnd"},{name:"3V3",type:"pwr"},{name:"SDA",type:"io",capabilities:["i2c"],signals:{i2c:"SDA"}},{name:"SCL",type:"io",capabilities:["i2c"],signals:{i2c:"SCL"}}]},{z:0,kind:"qwiic",x:.94817,y:.5,rotation:90,pins:[{name:"GND-B",type:"gnd"},{name:"3V3-B",type:"pwr"},{name:"SDA-B",type:"io",capabilities:["i2c"],signals:{i2c:"SDA"}},{name:"SCL-B",type:"io",capabilities:["i2c"],signals:{i2c:"SCL"}}]}],image:"image.jpg",imageLayer:{x:.0002330525716145726,y:0,w:1,h:1},rear:{image:"rear.jpg"},mesh:"modulino.stl",meshUnits:"mm",mass_g:3.6,i2cAddresses:[68],library:{module:"modulino",docs:"https://docs.arduino.cc/hardware/modulino-thermo/"},drivers:[{source:"module:modulino",target:"lib/modulino",label:"Arduino Modulino library"}],layerVisibility:{pcb:!0,image:!0,holes:!0,pins:!0,components:!0},helpText:`# Modulino Thermo

A Renesas **HS3003** temperature and relative-humidity sensor. It reads
−40 °C to +125 °C and 0–100 % RH, at ±0.25 °C and ±2.8 % RH, 14 bits each.

## Address — \`0x44\`, and it can't move

There's **no MCU** on this board; the HS3003 answers for itself, so the address
is fixed by the silicon. Unlike the modules with an MCU, it can't be changed in
software *or* by a solder jumper — which means **you can never have two Thermos
on one bus**. Two rooms means two buses (or a Modulino Hub).

Because it's the bare sensor, the address is also **not** shifted: \`0x44\` is what
the library asks for and \`0x44\` is what a scan reports.

## Wiring

A QWIIC socket at **each end**, both on the same bus in parallel — plug into
either and chain the next module off the other.

| Pin | What |
|---|---|
| GND | ground |
| 3V3 | 3.3 V |
| SDA | I²C data |
| SCL | I²C clock |

## Code

\`\`\`python
from modulino import ModulinoThermo

thermo = ModulinoThermo()

print(thermo.temperature)        # °C
print(thermo.relative_humidity)  # % RH
\`\`\`

| Property | Returns |
|---|---|
| \`.temperature\` | degrees Celsius |
| \`.relative_humidity\` | percent RH |
| \`.measurements\` | both at once, as a \`Measurement\` named tuple |

### Read both in one go

\`.temperature\` and \`.relative_humidity\` each trigger a **fresh** sensor read, so
asking for both separately costs two conversions and can hand you two readings
taken microseconds apart. \`.measurements\` gets them from one:

\`\`\`python
from modulino import ModulinoThermo

thermo = ModulinoThermo()

m = thermo.measurements
print(m.temperature, m.relative_humidity)

t, rh = thermo.measurements     # it unpacks, too
\`\`\`

### Handle \`None\`

If a conversion is still in flight the sensor reports stale data, and the driver
turns that into **\`None\`** rather than a wrong number. Check before you format,
or a \`:.1f\` will blow up on you:

\`\`\`python
from modulino import ModulinoThermo
from time import sleep

thermo = ModulinoThermo()

while True:
    t, rh = thermo.measurements
    if t is not None:
        print(f"{t:.1f} °C, {rh:.1f} %")
    sleep(2)
\`\`\`

The sensor self-heats slightly if you hammer it; a couple of seconds between
reads is plenty for room air, which moves slowly anyway.

## On a non-Arduino board, pass the I²C bus yourself

The library works out which pins carry I²C from \`os.uname().machine\`, against a
table of **Arduino** boards. On anything else — a Pico, a Tiny 2350, an ESP32 —
that lookup fails and construction raises:

\`\`\`
RuntimeError: I2C interface couldn't be determined automatically for '<your board>'
\`\`\`

It isn't a wiring fault, and nothing is wrong with the module. Hand it a bus and
it works:

\`\`\`python
from machine import I2C, Pin
from modulino import ModulinoThermo

# Use YOUR board's I²C pins — Snakie shows them on the board's pinout.
i2c = I2C(0, sda=Pin(4), scl=Pin(5))

thermo = ModulinoThermo(i2c_bus=i2c)
\`\`\`

Every Modulino class takes \`i2c_bus\`, so one bus serves a whole chain — build it
once and pass it to each module.

## Install the library

One package covers every Modulino, and it pulls in the \`micropython_hs3003\`
driver this board needs as a dependency:

\`\`\`python
mip.install("github:arduino/arduino-modulino-mpy")
\`\`\`

Snakie offers this for you when you place a Modulino on the board — and only
once, however many Modulinos your design has.

## Modulino addresses

As they appear **in a bus scan**:

| Address | Module | Re-addressable? |
|---|---|---|
| \`0x02\` | Latch Relay | yes |
| \`0x1E\` | Buzzer | yes |
| \`0x24\` | Motors | yes |
| \`0x29\` | Distance | **no** — VL53L4CD |
| \`0x2C\` | Joystick | yes |
| \`0x36\` | Pixels | yes |
| \`0x38\` | Vibro | yes |
| \`0x39\` | LED Matrix | yes |
| \`0x3A\` / \`0x3B\` | Knob | yes |
| \`0x3E\` | Buttons | yes |
| \`0x44\` | **Thermo** | **no** — HS3003 |
| \`0x53\` | Light | **no** — LTR-381RGB-01 |
| \`0x6A\` / \`0x6B\` | Movement | solder jumper only |

Note \`0x44\` is a busy address — plenty of unrelated breakouts use it, so a scan
hit there isn't proof it's this board.

## Links

- [Product page](https://docs.arduino.cc/hardware/modulino-thermo/) (ABX00103)
- [MicroPython library](https://github.com/arduino/arduino-modulino-mpy)
`},{id:"modulino-vibro",name:"Modulino Vibro",description:"Vibration motor for haptic feedback, driven over I²C by duration and power level, on a daisy-chainable Modulino.",manufacturer:"Arduino",family:"Output",tags:["modulino","arduino","i2c","qwiic","haptic","vibration","motor","output"],package:"SMD",voltage:"3.3V",partNumber:"ABX00130",properties:{interface:"I²C (0x38, re-addressable — onboard MCU)",motor:"VZ43FM1B8230001L vibration motor, 12,000 rpm rated",current:"67 mA typical, 85 mA maximum while running",control:"duration in milliseconds plus a PowerLevel intensity",mcu:"STM32C011F4",chain:"QWIIC socket at each end, same bus in parallel"},version:"0.1.2",pcbColor:"#00979d",aspect:1.617,dimensions:{width:41,height:25.36},shape:{kind:"rect",cornerRadiusMm:4.6},headers:[{edge:"left",pins:[{name:"SCL",type:"io",number:14,capabilities:["i2c"],signals:{i2c:"SCL"},shape:"header",x:.4076634724934896,y:.9515518685871369},{name:"SDA",type:"io",number:12,capabilities:["i2c"],signals:{i2c:"SDA"},shape:"header",x:.4685789659288195,y:.9515518685871369},{name:"3v3",type:"pwr",number:12,shape:"header",x:.5294944593641493,y:.9515518685871369},{name:"GND",type:"gnd",number:11,shape:"header",x:.5904099527994792,y:.9515518685871369},{name:"PA0",type:"io",number:1,capabilities:["digital"],shape:"header",x:.2793975830078125,y:.047769975712372056},{name:"RX1",type:"io",number:2,capabilities:["uart"],signals:{uart:"RX"},buses:{uart:1},shape:"header",x:.3417987496512277,y:.047769975712372056},{name:"TX1",type:"io",number:3,capabilities:["uart"],signals:{uart:"TX"},buses:{uart:1},shape:"header",x:.4046814836774554,y:.047769975712372056},{name:"SWDIO",type:"io",number:4,capabilities:["digital"],shape:"header",x:.4673234340122768,y:.047769975712372056},{name:"SWCLK",type:"io",number:5,capabilities:["digital"],shape:"header",x:.5299653843470982,y:.047769975712372056},{name:"PF2",type:"io",number:6,capabilities:["digital"],shape:"header",x:.5926073346819196,y:.047769975712372056},{name:"3v3",type:"pwr",number:9,shape:"header",x:.6552492850167411,y:.047769975712372056},{name:"GND",type:"gnd",number:10,shape:"header",x:.7178912353515625,y:.047769975712372056}]}],mountingHoles:[{x:.10642732788085937,y:.18454,diameter:1.5},{x:.89024,y:.18454,diameter:1.5},{x:.89024,y:.81546,diameter:1.5},{x:.10642732788085937,y:.81546,diameter:1.5}],rails:[{name:"GND",pins:["GND","GND-B"]},{name:"3V3",pins:["3V3","3V3-B"]},{name:"SDA",pins:["SDA","SDA-B"]},{name:"SCL",pins:["SCL","SCL-B"]}],connectors:[{z:0,kind:"qwiic",x:.05183,y:.5,rotation:270,pins:[{name:"GND",type:"gnd"},{name:"3V3",type:"pwr"},{name:"SDA",type:"io",capabilities:["i2c"],signals:{i2c:"SDA"}},{name:"SCL",type:"io",capabilities:["i2c"],signals:{i2c:"SCL"}}]},{z:0,kind:"qwiic",x:.94817,y:.5,rotation:90,pins:[{name:"GND-B",type:"gnd"},{name:"3V3-B",type:"pwr"},{name:"SDA-B",type:"io",capabilities:["i2c"],signals:{i2c:"SDA"}},{name:"SCL-B",type:"io",capabilities:["i2c"],signals:{i2c:"SCL"}}]}],image:"image.jpg",imageLayer:{x:-.00024861653645832926,y:0,w:1,h:1},rear:{image:"rear.jpg"},mesh:"modulino.stl",meshUnits:"mm",mass_g:4.4,i2cAddresses:[56],library:{module:"modulino",docs:"https://docs.arduino.cc/hardware/modulino-vibro/"},drivers:[{source:"module:modulino",target:"lib/modulino",label:"Arduino Modulino library"}],layerVisibility:{pcb:!0,image:!0,holes:!0,pins:!0,components:!0},helpText:`# Modulino Vibro

A **VZ43FM1B8230001L** vibration motor for haptic feedback, driven over I²C by an
onboard **STM32C011F4**. You give it a duration and an intensity; the board runs
the motor and stops it on time without your code waiting around.

## Address — \`0x38\`

There's an MCU on this one, so the address is **software-configurable** — which
is how you run two Vibros on one chain.

Mind the shift if you go reading Arduino's own material: the library declares the
module's *pinstrap* as \`0x70\`, and the firmware answers on **half** that. \`0x38\`
is what a bus scan reports — and note that clashes with the common
**AHT10 / AHT20** temperature-humidity breakout, so if a scan shows \`0x38\` and
you have one of those on the bus, one of them has to move.

## Wiring

A QWIIC socket at **each end**, both on the same bus in parallel — plug into
either and chain the next module off the other.

| Pin | What |
|---|---|
| GND | ground |
| 3V3 | 3.3 V |
| SDA | I²C data |
| SCL | I²C clock |

The motor draws **67 mA typical, 85 mA maximum** while running, on top of the
MCU's ~3.4 mA. That's the biggest single draw on a QWIIC chain — worth checking
your 3V3 supply if the bus misbehaves only while it's buzzing.

## Code

\`\`\`python
from modulino import ModulinoVibro

vibro = ModulinoVibro()

vibro.on(500)      # buzz for half a second, then stop by itself
\`\`\`

| Call | What |
|---|---|
| \`.on(length_ms, power, blocking)\` | run the motor |
| \`.off()\` | stop it now |

\`.on()\` **returns immediately** by default — the board's own timer stops the
motor after \`length_ms\`, so your loop carries on. Pass \`blocking=True\` if you
want the call to wait it out instead.

Called with no arguments at all, \`.on()\` runs for 65535 ms — effectively "until
told otherwise".

### Intensity

The \`power\` argument takes a \`PowerLevel\` constant rather than a raw number:

\`\`\`python
from modulino import ModulinoVibro, PowerLevel

vibro = ModulinoVibro()

vibro.on(200, PowerLevel.GENTLE)
\`\`\`

| Constant | Value |
|---|---|
| \`PowerLevel.STOP\` | 0 |
| \`PowerLevel.GENTLE\` | 25 |
| \`PowerLevel.MODERATE\` | 35 |
| \`PowerLevel.MEDIUM\` | 45 — the default |
| \`PowerLevel.INTENSE\` | 55 |
| \`PowerLevel.POWERFUL\` | 65 |
| \`PowerLevel.MAXIMUM\` | 75 |

### A double tap

Short bursts read as distinct events; long ones read as an alarm. Because
\`.on()\` doesn't block, a pattern needs its own timing:

\`\`\`python
from modulino import ModulinoVibro, PowerLevel
from time import sleep_ms

vibro = ModulinoVibro()

for _ in range(2):
    vibro.on(80, PowerLevel.INTENSE)
    sleep_ms(180)
\`\`\`

## On a non-Arduino board, pass the I²C bus yourself

The library works out which pins carry I²C from \`os.uname().machine\`, against a
table of **Arduino** boards. On anything else — a Pico, a Tiny 2350, an ESP32 —
that lookup fails and construction raises:

\`\`\`
RuntimeError: I2C interface couldn't be determined automatically for '<your board>'
\`\`\`

It isn't a wiring fault, and nothing is wrong with the module. Hand it a bus and
it works:

\`\`\`python
from machine import I2C, Pin
from modulino import ModulinoVibro

# Use YOUR board's I²C pins — Snakie shows them on the board's pinout.
i2c = I2C(0, sda=Pin(4), scl=Pin(5))

vibro = ModulinoVibro(i2c_bus=i2c)
\`\`\`

Every Modulino class takes \`i2c_bus\`, so one bus serves a whole chain — build it
once and pass it to each module.

## Install the library

One package covers every Modulino:

\`\`\`python
mip.install("github:arduino/arduino-modulino-mpy")
\`\`\`

Snakie offers this for you when you place a Modulino on the board — and only
once, however many Modulinos your design has.

## Modulino addresses

As they appear **in a bus scan**:

| Address | Module | Re-addressable? |
|---|---|---|
| \`0x02\` | Latch Relay | yes |
| \`0x1E\` | Buzzer | yes |
| \`0x24\` | Motors | yes |
| \`0x29\` | Distance | **no** — VL53L4CD |
| \`0x2C\` | Joystick | yes |
| \`0x36\` | Pixels | yes |
| \`0x38\` | **Vibro** | yes |
| \`0x39\` | LED Matrix | yes |
| \`0x3A\` / \`0x3B\` | Knob | yes |
| \`0x3E\` | Buttons | yes |
| \`0x44\` | Thermo | **no** — HS3003 |
| \`0x53\` | Light | **no** — LTR-381RGB-01 |
| \`0x6A\` / \`0x6B\` | Movement | solder jumper only |

## Links

- [Product page](https://docs.arduino.cc/hardware/modulino-vibro/) (ABX00130)
- [MicroPython library](https://github.com/arduino/arduino-modulino-mpy)
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
`},{id:"mx1508",name:"MX1508",family:"Breakout",package:"THT",pinSpacing:2.54,voltage:"3.3V",version:"0.1.3",pcbColor:"#b33e42",aspect:.5,dimensions:{width:24.5,height:21},shape:{kind:"rect",cornerRadius:0},headers:[{edge:"left",pins:[{name:"VCC",type:"pwr",shape:"round",x:.0969480895996094,y:.10008971320258248},{name:"GND",type:"gnd",shape:"round",x:.09532127380371093,y:.2604330698649089},{name:"IN1",type:"io",gpio:0,capabilities:["digital","pwm"],shape:"round",x:.23064493815104167,y:.5150479973687067},{name:"IN2",type:"io",gpio:1,capabilities:["digital","pwm"],shape:"round",x:.23064493815104167,y:.6400479973687067},{name:"IN3",type:"io",gpio:4,capabilities:["digital","pwm"],shape:"round",rotation:180,x:.23064493815104167,y:.7807955339219836},{name:"IN4",type:"io",gpio:5,capabilities:["digital"],shape:"round",rotation:180,x:.23064493815104167,y:.9057955339219836},{name:"OUT1",type:"io",gpio:6,capabilities:["digital"],shape:"round",x:.8296396891276043,y:.5150479973687067},{name:"OUT2",type:"io",gpio:7,capabilities:["digital"],shape:"round",x:.8296396891276043,y:.6400479973687067},{name:"OUT3",type:"io",gpio:8,capabilities:["digital"],shape:"round",x:.8296396891276043,y:.7807955339219836},{name:"OUT4",type:"io",gpio:9,capabilities:["digital"],shape:"round",rotation:0,x:.8296396891276043,y:.9057955339219836}]}],mountingHoles:[{x:.10914685567220052,y:.3961333889431423,diameter:1.2}],shapes:[{kind:"rect",x:.46435175577799487,y:.4775364091661241,fill:"#1c2227",stroke:"#8a8f96",strokeWidth:0,w:.16,h:.47},{kind:"circle",x:.37448577880859374,y:.22480242411295565,label:"100 16V VT",fill:"#b6b6be",stroke:"#ffffff",strokeWidth:1,r:.13,labelFontSize:15,labelAlign:"left",labelWrap:!0,labelColor:"#000000"},{kind:"circle",x:.6737740071614585,y:.22480242411295565,fill:"#b6b6be",stroke:"#ffffff",strokeWidth:1,r:.13}],image:"image.jpg",imageLayer:{x:-.03228909810384106,y:-.03272606743706563,w:1.0659733835856118,h:1.0659733835856118},electrical:{model:"consumer",maxCurrentA:2.5,currentDrawA:.4,stallCurrentA:3,terminals:{positive:"VCC",negative:"GND"}},layerVisibility:{pcb:!0,image:!0,holes:!0,pins:!0,components:!0},helpText:`# MX1508 Dual H-Bridge Motor Driver

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
`},{id:"n20-motor",name:"N20 Motor",manufacturer:"Generic",family:"Motor",package:"THT",pinSpacing:2.54,voltage:"6V",version:"0.1.8",pcbColor:"#0f5a2e",aspect:.5,dimensions:{width:12,height:35},shape:{kind:"rect",cornerRadius:0},headers:[{edge:"left",pins:[{name:"VCC",type:"pwr",x:.7482312886855182,y:.9504546221564798},{name:"GND",type:"gnd",x:.2615317468082204,y:.9488681568818934}]}],shapes:[{kind:"rect",x:.11703055363075404,y:.5353271753647749,fill:"#667279",stroke:"#8a8f96",strokeWidth:0,w:.7776204000734817,h:.3725875585219438,z:0,cornerRadius:0},{kind:"rect",x:.11703055363075404,y:.2740695100672105,fill:"#897131",stroke:"#8a8f96",strokeWidth:0,w:.7688154848884132,h:.021959434958065294,z:1,cornerRadius:0},{kind:"rect",x:.39403553981407013,y:.013959000336001282,fill:"#84837f",stroke:"#8a8f96",strokeWidth:0,w:.2,h:.26,z:2,cornerRadius:0},{kind:"rect",x:.10584603851916734,y:.9075299072265623,fill:"#1c2227",stroke:"#8a8f96",strokeWidth:0,w:.78,h:.028429188447840148,z:3},{kind:"rect",x:.3240355398140701,y:.9359590956744025,fill:"#1c2227",stroke:"#8a8f96",strokeWidth:0,w:.34,h:.03,z:4},{kind:"rect",x:.1281247105317958,y:.29544462316176473,fill:"#897131",stroke:"#8a8f96",strokeWidth:0,w:.2668140725528492,h:.2398825522030102,z:5,cornerRadius:0},{kind:"rect",x:.11465095370423561,y:.515095376407399,fill:"#897131",stroke:"#8a8f96",strokeWidth:0,w:.78,h:.020231798957375924,z:6,cornerRadius:0}],image:"image.png",electrical:{model:"consumer",maxCurrentA:.32,currentDrawA:.06,stallCurrentA:.32,terminals:{positive:"VCC",negative:"GND"}},layerVisibility:{pcb:!1,image:!0,holes:!0,pins:!0,components:!1},helpText:`# N20 Motor

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
`},{id:"pca9685",name:"PCA9685",description:"Servo and LED Driver board",manufacturer:"Generic",family:"Breakout",tags:["i2c","led","servo"],package:"THT",pinSpacing:2.54,voltage:"3.3V",version:"0.1.10",pcbColor:"#0f5a2e",aspect:.5,dimensions:{width:65,height:25},shape:{kind:"rect",cornerRadius:0},headers:[{edge:"left",pins:[{name:"V+",type:"pwr",group:"grp-w9ocjpe",number:6,shape:"octagonal",x:.09031791751054134,y:.738557493456828},{name:"GND",type:"gnd",group:"grp-w9ocjpe",number:1,shape:"octagonal",x:.09031791751054134,y:.24419973306030288},{name:"SDA",type:"io",group:"grp-w9ocjpe",number:4,gpio:0,shape:"octagonal",x:.09031791751054134,y:.5338844040625511},{name:"SCL",type:"io",group:"grp-w9ocjpe",number:3,capabilities:["digital"],shape:"octagonal",x:.09031791751054134,y:.43881837292902653},{name:"OE",type:"io",group:"grp-w9ocjpe",number:1,shape:"octagonal",x:.09031791751054134,y:.33738512853617364},{name:"VCC",type:"pwr",group:"grp-w9ocjpe",number:5,shape:"octagonal",x:.09031791751054134,y:.6367135503319805},{name:"S1",type:"io",group:"servo-1",capabilities:["digital","pwm"],signals:{pwm:"A"},shape:"octagonal",rotation:90,x:.16032190958658848,y:.7295051981608072},{name:"V1",type:"pwr",group:"servo-1",shape:"octagonal",x:.16032190958658848,y:.8295051981608071},{name:"G1",type:"gnd",group:"servo-1",shape:"octagonal",x:.16032190958658848,y:.9295051981608071},{name:"S2",type:"io",group:"servo-2",capabilities:["digital","pwm"],signals:{pwm:"A"},shape:"octagonal",rotation:90,x:.19878344804812695,y:.7295051981608072},{name:"V2",type:"pwr",group:"servo-2",shape:"octagonal",x:.19878344804812695,y:.8295051981608071},{name:"G2",type:"gnd",group:"servo-2",shape:"octagonal",x:.19878344804812695,y:.9295051981608071},{name:"S3",type:"io",group:"servo-3",capabilities:["digital","pwm"],signals:{pwm:"A"},shape:"octagonal",rotation:90,x:.23724498650966544,y:.7295051981608072},{name:"V3",type:"pwr",group:"servo-3",shape:"octagonal",x:.23724498650966544,y:.8295051981608071},{name:"G3",type:"gnd",group:"servo-3",shape:"octagonal",x:.23724498650966544,y:.9295051981608071},{name:"S4",type:"io",group:"servo-4",capabilities:["digital","pwm"],signals:{pwm:"A"},shape:"octagonal",rotation:90,x:.2813817263872195,y:.7295051981608072},{name:"V4",type:"pwr",group:"servo-4",shape:"octagonal",x:.2813817263872195,y:.8295051981608071},{name:"G4",type:"gnd",group:"servo-4",shape:"octagonal",x:.2813817263872195,y:.9295051981608071},{name:"S5",type:"io",group:"servo-5",capabilities:["digital","pwm"],signals:{pwm:"A"},shape:"octagonal",rotation:90,x:.3608583068847656,y:.7324003906249998},{name:"V5",type:"pwr",group:"servo-5",shape:"octagonal",x:.3608583068847656,y:.8324003906249998},{name:"G5",type:"gnd",group:"servo-5",shape:"octagonal",x:.3608583068847656,y:.9324003906249998},{name:"S6",type:"io",group:"servo-6",capabilities:["digital","pwm"],signals:{pwm:"A"},shape:"octagonal",rotation:90,x:.39931984534630405,y:.7324003906249998},{name:"V6",type:"pwr",group:"servo-6",shape:"octagonal",x:.39931984534630405,y:.8324003906249998},{name:"G6",type:"gnd",group:"servo-6",shape:"octagonal",x:.39931984534630405,y:.9324003906249998},{name:"S7",type:"io",group:"servo-7",capabilities:["digital","pwm"],signals:{pwm:"A"},shape:"octagonal",rotation:90,x:.43778138380784254,y:.7324003906249998},{name:"V7",type:"pwr",group:"servo-7",shape:"octagonal",x:.43778138380784254,y:.8324003906249998},{name:"G7",type:"gnd",group:"servo-7",shape:"octagonal",x:.43778138380784254,y:.9324003906249998},{name:"S8",type:"io",group:"servo-8",capabilities:["digital","pwm"],signals:{pwm:"A"},shape:"octagonal",rotation:90,x:.47624292226938103,y:.7324003906249998},{name:"V8",type:"pwr",group:"servo-8",shape:"octagonal",x:.47624292226938103,y:.8324003906249998},{name:"G8",type:"gnd",group:"servo-8",shape:"octagonal",x:.47624292226938103,y:.9324003906249998},{name:"S9",type:"io",group:"servo-9",capabilities:["digital","pwm"],signals:{pwm:"A"},shape:"octagonal",rotation:90,x:.5918541463216146,y:.7298086954752603},{name:"V9",type:"pwr",group:"servo-9",shape:"octagonal",x:.5918541463216146,y:.8298086954752603},{name:"G9",type:"gnd",group:"servo-9",shape:"octagonal",x:.5918541463216146,y:.9298086954752602},{name:"S10",type:"io",group:"servo-10",capabilities:["digital","pwm"],signals:{pwm:"A"},shape:"octagonal",rotation:90,x:.630315684783153,y:.7298086954752603},{name:"V10",type:"pwr",group:"servo-10",shape:"octagonal",x:.630315684783153,y:.8298086954752603},{name:"G10",type:"gnd",group:"servo-10",shape:"octagonal",x:.630315684783153,y:.9298086954752602},{name:"S11",type:"io",group:"servo-11",capabilities:["digital","pwm"],signals:{pwm:"A"},shape:"octagonal",rotation:90,x:.6687772232446916,y:.7298086954752603},{name:"V11",type:"pwr",group:"servo-11",shape:"octagonal",x:.6687772232446916,y:.8298086954752603},{name:"G11",type:"gnd",group:"servo-11",shape:"octagonal",x:.6687772232446916,y:.9298086954752602},{name:"S12",type:"io",group:"servo-12",capabilities:["digital","pwm"],signals:{pwm:"A"},shape:"octagonal",rotation:90,x:.70723876170623,y:.7298086954752603},{name:"V12",type:"pwr",group:"servo-12",shape:"octagonal",x:.70723876170623,y:.8298086954752603},{name:"G12",type:"gnd",group:"servo-12",shape:"octagonal",x:.70723876170623,y:.9298086954752602},{name:"S13",type:"io",group:"servo-13",capabilities:["digital","pwm"],signals:{pwm:"A"},shape:"octagonal",rotation:90,x:.7777625528971354,y:.7298086954752603},{name:"V13",type:"pwr",group:"servo-13",shape:"octagonal",x:.7777625528971354,y:.8298086954752603},{name:"G13",type:"gnd",group:"servo-13",shape:"octagonal",x:.7777625528971354,y:.9298086954752602},{name:"S14",type:"io",group:"servo-14",capabilities:["digital","pwm"],signals:{pwm:"A"},shape:"octagonal",rotation:90,x:.8162240913586738,y:.7298086954752603},{name:"V14",type:"pwr",group:"servo-14",shape:"octagonal",x:.8162240913586738,y:.8298086954752603},{name:"G14",type:"gnd",group:"servo-14",shape:"octagonal",x:.8162240913586738,y:.9298086954752602},{name:"S15",type:"io",group:"servo-15",capabilities:["digital","pwm"],signals:{pwm:"A"},shape:"octagonal",rotation:90,x:.8546856298202123,y:.7298086954752603},{name:"V15",type:"pwr",group:"servo-15",shape:"octagonal",x:.8546856298202123,y:.8298086954752603},{name:"G15",type:"gnd",group:"servo-15",shape:"octagonal",x:.8546856298202123,y:.9298086954752602},{name:"S16",type:"io",group:"servo-16",capabilities:["digital","pwm"],signals:{pwm:"A"},shape:"octagonal",rotation:90,x:.8931471682817508,y:.7298086954752603},{name:"V16",type:"pwr",group:"servo-16",shape:"octagonal",x:.8931471682817508,y:.8298086954752603},{name:"G16",type:"gnd",group:"servo-16",shape:"octagonal",x:.8931471682817508,y:.9298086954752602}]}],groups:[{id:"servo-1",name:"Servo 1",parent:"grp-knl1vut",housing:{kind:"dupont",x:.16280029296875,y:.8443308105468749,rotation:90}},{id:"servo-2",name:"Servo 2",parent:"grp-knl1vut",housing:{kind:"dupont",x:.20126183143028847,y:.8443308105468749,rotation:90}},{id:"servo-3",name:"Servo 3",parent:"grp-knl1vut",housing:{kind:"dupont",x:.23972336989182694,y:.8443308105468749,rotation:90}},{id:"servo-4",name:"Servo 4",parent:"grp-knl1vut",housing:{kind:"dupont",x:.2781849083533654,y:.8443308105468749,rotation:90}},{id:"servo-5",name:"Servo 5",parent:"grp-kmcnq5j",housing:{kind:"dupont",x:.3608583068847656,y:.8324003906249998,rotation:90}},{id:"servo-6",name:"Servo 6",parent:"grp-kmcnq5j",housing:{kind:"dupont",x:.39931984534630405,y:.8324003906249998,rotation:90}},{id:"servo-7",name:"Servo 7",parent:"grp-kmcnq5j",housing:{kind:"dupont",x:.43778138380784254,y:.8324003906249998,rotation:90}},{id:"servo-8",name:"Servo 8",parent:"grp-kmcnq5j",housing:{kind:"dupont",x:.47624292226938103,y:.8324003906249998,rotation:90}},{id:"servo-9",name:"Servo 9",parent:"grp-aglio8y",housing:{kind:"dupont",x:.5783575439453125,y:.8300189615885415,rotation:90}},{id:"servo-10",name:"Servo 10",parent:"grp-aglio8y",housing:{kind:"dupont",x:.6168190824068509,y:.8300189615885415,rotation:90}},{id:"servo-11",name:"Servo 11",parent:"grp-aglio8y",housing:{kind:"dupont",x:.6552806208683895,y:.8300189615885415,rotation:90}},{id:"servo-12",name:"Servo 12",parent:"grp-aglio8y",housing:{kind:"dupont",x:.6937421593299279,y:.8300189615885415,rotation:90}},{id:"servo-13",name:"Servo 13",parent:"grp-ttow5j4",housing:{kind:"dupont",x:.7777625528971354,y:.8298086954752603,rotation:90}},{id:"servo-14",name:"Servo 14",parent:"grp-ttow5j4",housing:{kind:"dupont",x:.8162240913586738,y:.8298086954752603,rotation:90}},{id:"servo-15",name:"Servo 15",parent:"grp-ttow5j4",housing:{kind:"dupont",x:.8546856298202123,y:.8298086954752603,rotation:90}},{id:"servo-16",name:"Servo 16",parent:"grp-ttow5j4",housing:{kind:"dupont",x:.8931471682817508,y:.8298086954752603,rotation:90}},{id:"grp-aglio8y"},{id:"grp-ttow5j4"},{id:"grp-kmcnq5j"},{id:"grp-knl1vut",parent:"grp-0bk0ajq"},{id:"grp-0bk0ajq"},{id:"grp-w9ocjpe"}],connectors:[{z:0,kind:"terminal",x:.5394592220587224,y:.17180067378986258,pins:[{name:"V+",type:"pwr"},{name:"GND",type:"gnd"}]}],image:"image.png",imageLayer:{x:-.027718060811360745,y:-.02911828198390576,w:1.029302838643392,h:1.0284366651466372},layerVisibility:{pcb:!1,image:!0,holes:!0,pins:!0,components:!0},rails:[{name:"V+",pins:["V+","V1","V2","V3","V4","V5","V6","V7","V8","V9","V10","V11","V12","V13","V14","V15","V16"]},{name:"GND",pins:["GND","G1","G2","G3","G4","G5","G6","G7","G8","G9","G10","G11","G12","G13","G14","G15","G16"]}]},{id:"pico",mass_g:3,name:"Raspberry Pi Pico",description:"RP2040 microcontroller board (40-pin, same header layout as the Pico W / 2 W).",manufacturer:"Raspberry Pi",family:"Microcontroller",tags:["rp2040","pico"],package:"THT",pinSpacing:2.54,voltage:"1.8–5.5V",partNumber:"SC0915",version:"1.0.2",mcu:"RP2040",pcbColor:"#0f5a2e",aspect:.4098,dimensions:{width:21,height:51},ledLabel:"25",image:"image.png",imageLayer:{x:0,y:0,w:1,h:1},electrical:{model:"regulator",inputRail:"VSYS",outputRail:"3V3",outputV:3.3,dropoutV:.3,maxCurrentA:.3},headers:[{edge:"left",pins:[{name:"GP0",type:"io",number:1,gpio:0,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:0},shape:"castellated",rotation:180,x:.058,y:.052},{name:"GP1",type:"io",number:2,gpio:1,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:0},shape:"castellated",rotation:180,x:.058,y:.099},{name:"GND",type:"gnd",number:3,shape:"castellated",rotation:180,x:.058,y:.146},{name:"GP2",type:"io",number:4,gpio:2,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:0},shape:"castellated",rotation:180,x:.058,y:.193},{name:"GP3",type:"io",number:5,gpio:3,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:0},shape:"castellated",rotation:180,x:.058,y:.24},{name:"GP4",type:"io",number:6,gpio:4,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:0},shape:"castellated",rotation:180,x:.058,y:.287},{name:"GP5",type:"io",number:7,gpio:5,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:0},shape:"castellated",rotation:180,x:.058,y:.334},{name:"GND",type:"gnd",number:8,shape:"castellated",rotation:180,x:.058,y:.381},{name:"GP6",type:"io",number:9,gpio:6,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:0},shape:"castellated",rotation:180,x:.058,y:.428},{name:"GP7",type:"io",number:10,gpio:7,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:0},shape:"castellated",rotation:180,x:.058,y:.475},{name:"GP8",type:"io",number:11,gpio:8,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:1},shape:"castellated",rotation:180,x:.058,y:.522},{name:"GP9",type:"io",number:12,gpio:9,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:1},shape:"castellated",rotation:180,x:.058,y:.569},{name:"GND",type:"gnd",number:13,shape:"castellated",rotation:180,x:.058,y:.616},{name:"GP10",type:"io",number:14,gpio:10,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:1},shape:"castellated",rotation:180,x:.058,y:.663},{name:"GP11",type:"io",number:15,gpio:11,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:1},shape:"castellated",rotation:180,x:.058,y:.71},{name:"GP12",type:"io",number:16,gpio:12,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:1},shape:"castellated",rotation:180,x:.058,y:.757},{name:"GP13",type:"io",number:17,gpio:13,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:1},shape:"castellated",rotation:180,x:.058,y:.804},{name:"GND",type:"gnd",number:18,shape:"castellated",rotation:180,x:.058,y:.851},{name:"GP14",type:"io",number:19,gpio:14,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:1},shape:"castellated",rotation:180,x:.058,y:.898},{name:"GP15",type:"io",number:20,gpio:15,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:1},shape:"castellated",rotation:180,x:.058,y:.945}]},{edge:"right",pins:[{name:"VBUS",type:"pwr",number:40,shape:"castellated",rotation:0,x:.942,y:.052},{name:"VSYS",type:"pwr",number:39,shape:"castellated",rotation:0,x:.942,y:.099},{name:"GND",type:"gnd",number:38,shape:"castellated",rotation:0,x:.942,y:.146},{name:"3V3_EN",type:"other",number:37,shape:"castellated",rotation:0,x:.942,y:.193},{name:"3V3",type:"pwr",number:36,shape:"castellated",rotation:0,x:.942,y:.24},{name:"ADC_VREF",type:"other",number:35,shape:"castellated",rotation:0,x:.942,y:.287},{name:"GP28",type:"io",number:34,gpio:28,capabilities:["digital","pwm","i2c","spi","adc"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:1,adc:2},shape:"castellated",rotation:0,x:.942,y:.334},{name:"GND",type:"gnd",number:33,shape:"castellated",rotation:0,x:.942,y:.381},{name:"GP27",type:"io",number:32,gpio:27,capabilities:["digital","pwm","i2c","spi","adc"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:1,adc:1},shape:"castellated",rotation:0,x:.942,y:.428},{name:"GP26",type:"io",number:31,gpio:26,capabilities:["digital","pwm","i2c","spi","adc"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:1,adc:0},shape:"castellated",rotation:0,x:.942,y:.475},{name:"RUN",type:"other",number:30,shape:"castellated",rotation:0,x:.942,y:.522},{name:"GP22",type:"io",number:29,gpio:22,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:0},shape:"castellated",rotation:0,x:.942,y:.569},{name:"GND",type:"gnd",number:28,shape:"castellated",rotation:0,x:.942,y:.616},{name:"GP21",type:"io",number:27,gpio:21,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:0},shape:"castellated",rotation:0,x:.942,y:.663},{name:"GP20",type:"io",number:26,gpio:20,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:0},shape:"castellated",rotation:0,x:.942,y:.71},{name:"GP19",type:"io",number:25,gpio:19,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"TX"},buses:{i2c:1,spi:0},shape:"castellated",rotation:0,x:.942,y:.757},{name:"GP18",type:"io",number:24,gpio:18,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"SCK"},buses:{i2c:1,spi:0},shape:"castellated",rotation:0,x:.942,y:.804},{name:"GND",type:"gnd",number:23,shape:"castellated",rotation:0,x:.942,y:.851},{name:"GP17",type:"io",number:22,gpio:17,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"B",i2c:"SCL",spi:"CSn"},buses:{i2c:0,spi:0},shape:"castellated",rotation:0,x:.942,y:.898},{name:"GP16",type:"io",number:21,gpio:16,capabilities:["digital","pwm","i2c","spi"],signals:{pwm:"A",i2c:"SDA",spi:"RX"},buses:{i2c:0,spi:0},shape:"castellated",rotation:0,x:.942,y:.945}]}],helpText:`# Raspberry Pi Pico

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
`},{id:"pico-carrier-base",name:"Pico Carrier Base",description:"A generic carrier a Raspberry Pi Pico plugs into — its 40-pin socket is broken out as a footprint you can wire to.",family:"Microcontroller",pcbColor:"#0f5a2e",dimensions:{width:55,height:80},shape:{kind:"rect",cornerRadius:.04},headers:[{edge:"left",pins:[{name:"GP0",type:"io",locked:!0,number:1,gpio:0,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"RX",pwm:"A"},buses:{i2c:0,spi:0},shape:"round",x:.34715705455433243,y:.22107806816101078,derived:"mount-1"},{name:"GP1",type:"io",locked:!0,number:2,gpio:1,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SCL",spi:"CSn",pwm:"B"},buses:{i2c:0,spi:0},shape:"round",x:.34715705455433243,y:.25053056816101077,derived:"mount-1"},{name:"GND",type:"gnd",locked:!0,number:3,shape:"round",x:.34715705455433243,y:.27998306816101076,derived:"mount-1"},{name:"GP2",type:"io",locked:!0,number:4,gpio:2,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"SCK",pwm:"A"},buses:{i2c:1,spi:0},shape:"round",x:.34715705455433243,y:.30943556816101075,derived:"mount-1"},{name:"GP3",type:"io",locked:!0,number:5,gpio:3,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SCL",spi:"TX",pwm:"B"},buses:{i2c:1,spi:0},shape:"round",x:.34715705455433243,y:.3388880681610108,derived:"mount-1"},{name:"GP4",type:"io",locked:!0,number:6,gpio:4,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"RX",pwm:"A"},buses:{i2c:0,spi:0},shape:"round",x:.34715705455433243,y:.36840431816101077,derived:"mount-1"},{name:"GP5",type:"io",locked:!0,number:7,gpio:5,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SCL",spi:"CSn",pwm:"B"},buses:{i2c:0,spi:0},shape:"round",x:.34715705455433243,y:.39785681816101076,derived:"mount-1"},{name:"GND",type:"gnd",locked:!0,number:8,shape:"round",x:.34715705455433243,y:.42730931816101075,derived:"mount-1"},{name:"GP6",type:"io",locked:!0,number:9,gpio:6,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"SCK",pwm:"A"},buses:{i2c:1,spi:0},shape:"round",x:.34715705455433243,y:.45676181816101075,derived:"mount-1"},{name:"GP7",type:"io",locked:!0,number:10,gpio:7,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SCL",spi:"TX",pwm:"B"},buses:{i2c:1,spi:0},shape:"round",x:.34715705455433243,y:.48621431816101074,derived:"mount-1"},{name:"GP8",type:"io",locked:!0,number:11,gpio:8,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"RX",pwm:"A"},buses:{i2c:0,spi:1},shape:"round",x:.34715705455433243,y:.5156668181610108,derived:"mount-1"},{name:"GP9",type:"io",locked:!0,number:12,gpio:9,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SCL",spi:"CSn",pwm:"B"},buses:{i2c:0,spi:1},shape:"round",x:.34715705455433243,y:.5451193181610107,derived:"mount-1"},{name:"GND",type:"gnd",locked:!0,number:13,shape:"round",x:.34715705455433243,y:.5745718181610107,derived:"mount-1"},{name:"GP10",type:"io",locked:!0,number:14,gpio:10,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"SCK",pwm:"A"},buses:{i2c:1,spi:1},shape:"round",x:.34715705455433243,y:.6040243181610108,derived:"mount-1"},{name:"GP11",type:"io",locked:!0,number:15,gpio:11,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SCL",spi:"TX",pwm:"B"},buses:{i2c:1,spi:1},shape:"round",x:.34715705455433243,y:.6334768181610108,derived:"mount-1"},{name:"GP12",type:"io",locked:!0,number:16,gpio:12,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"RX",pwm:"A"},buses:{i2c:0,spi:1},shape:"round",x:.34715705455433243,y:.6629930681610108,derived:"mount-1"},{name:"GP13",type:"io",locked:!0,number:17,gpio:13,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SCL",spi:"CSn",pwm:"B"},buses:{i2c:0,spi:1},shape:"round",x:.34715705455433243,y:.6924455681610108,derived:"mount-1"},{name:"GND",type:"gnd",locked:!0,number:18,shape:"round",x:.34715705455433243,y:.7218980681610108,derived:"mount-1"},{name:"GP14",type:"io",locked:!0,number:19,gpio:14,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"SCK",pwm:"A"},buses:{i2c:1,spi:1},shape:"round",x:.34715705455433243,y:.7513505681610108,derived:"mount-1"},{name:"GP15",type:"io",locked:!0,number:20,gpio:15,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SCL",spi:"TX",pwm:"B"},buses:{i2c:1,spi:1},shape:"round",x:.34715705455433243,y:.7808030681610106,derived:"mount-1"},{name:"VBUS",type:"pwr",locked:!0,number:40,shape:"round",x:.6538935546875,y:.22107806816101078,derived:"mount-1"},{name:"VSYS",type:"pwr",locked:!0,number:39,shape:"round",x:.6538935546875,y:.25053056816101077,derived:"mount-1"},{name:"GND",type:"gnd",locked:!0,number:38,shape:"round",x:.6538935546875,y:.27998306816101076,derived:"mount-1"},{name:"3V3_EN",type:"other",locked:!0,number:37,shape:"round",x:.6538935546875,y:.30943556816101075,derived:"mount-1"},{name:"3V3",type:"pwr",locked:!0,number:36,shape:"round",x:.6538935546875,y:.3388880681610108,derived:"mount-1"},{name:"ADC_VREF",type:"other",locked:!0,number:35,shape:"round",x:.6538935546875,y:.36840431816101077,derived:"mount-1"},{name:"GP28",type:"io",locked:!0,number:34,gpio:28,capabilities:["digital","pwm","adc","spi","i2c"],signals:{i2c:"SDA",spi:"RX",pwm:"A"},buses:{i2c:0,spi:1,adc:2},shape:"round",x:.6538935546875,y:.39785681816101076,derived:"mount-1"},{name:"GND",type:"gnd",locked:!0,number:33,shape:"round",x:.6538935546875,y:.42730931816101075,derived:"mount-1"},{name:"GP27",type:"io",locked:!0,number:32,gpio:27,capabilities:["digital","pwm","adc","spi","i2c"],signals:{i2c:"SCL",spi:"TX",pwm:"B"},buses:{i2c:1,spi:1,adc:1},shape:"round",x:.6538935546875,y:.45676181816101075,derived:"mount-1"},{name:"GP26",type:"io",locked:!0,number:31,gpio:26,capabilities:["digital","pwm","adc","spi","i2c"],signals:{i2c:"SDA",spi:"SCK",pwm:"A"},buses:{i2c:1,spi:1,adc:0},shape:"round",x:.6538935546875,y:.48621431816101074,derived:"mount-1"},{name:"RUN",type:"other",locked:!0,number:30,shape:"round",x:.6538935546875,y:.5156668181610108,derived:"mount-1"},{name:"GP22",type:"io",locked:!0,number:29,gpio:22,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"SCK",pwm:"A"},buses:{i2c:1,spi:0},shape:"round",x:.6538935546875,y:.5451193181610107,derived:"mount-1"},{name:"GND",type:"gnd",locked:!0,number:28,shape:"round",x:.6538935546875,y:.5745718181610107,derived:"mount-1"},{name:"GP21",type:"io",locked:!0,number:27,gpio:21,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SCL",spi:"CSn",pwm:"B"},buses:{i2c:0,spi:0},shape:"round",x:.6538935546875,y:.6040243181610108,derived:"mount-1"},{name:"GP20",type:"io",locked:!0,number:26,gpio:20,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"RX",pwm:"A"},buses:{i2c:0,spi:0},shape:"round",x:.6538935546875,y:.6334768181610108,derived:"mount-1"},{name:"GP19",type:"io",locked:!0,number:25,gpio:19,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SCL",spi:"TX",pwm:"B"},buses:{i2c:1,spi:0},shape:"round",x:.6538935546875,y:.6629930681610108,derived:"mount-1"},{name:"GP18",type:"io",locked:!0,number:24,gpio:18,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"SCK",pwm:"A"},buses:{i2c:1,spi:0},shape:"round",x:.6538935546875,y:.6924455681610108,derived:"mount-1"},{name:"GND",type:"gnd",locked:!0,number:23,shape:"round",x:.6538935546875,y:.7218980681610108,derived:"mount-1"},{name:"GP17",type:"io",locked:!0,number:22,gpio:17,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SCL",spi:"CSn",pwm:"B"},buses:{i2c:0,spi:0},shape:"round",x:.6538935546875,y:.7513505681610108,derived:"mount-1"},{name:"GP16",type:"io",locked:!0,number:21,gpio:16,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"RX",pwm:"A"},buses:{i2c:0,spi:0},shape:"round",x:.6538935546875,y:.7808030681610106,derived:"mount-1"}]}],mounts:[{id:"mount-1",footprint:"pico",ref:{lib:"snakie-standard",part:"pico2w"},label:"Raspberry Pi Pico 2 W",x:.5,y:.5}]},{id:"pico-w",name:"Raspberry Pi Pico W",description:"RP2040 microcontroller board with CYW43439 2.4GHz wireless (Wi-Fi / BLE).",manufacturer:"Raspberry Pi",family:"Microcontroller",tags:["rp2040","wifi","pico"],package:"THT",pinSpacing:2.54,voltage:"1.8–5.5V",partNumber:"SC0918",version:"1.0.3",mcu:"RP2040",pcbColor:"#0f5a2e",aspect:.406,dimensions:{width:21,height:51},headers:[{edge:"left",pins:[{name:"GP0",type:"io",number:1,gpio:0,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"RX",pwm:"A"},buses:{i2c:0,spi:0},shape:"castellated",rotation:180,x:.058,y:.052},{name:"GP1",type:"io",number:2,gpio:1,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SCL",spi:"CSn",pwm:"B"},buses:{i2c:0,spi:0},shape:"castellated",rotation:180,x:.058,y:.099},{name:"GND",type:"gnd",number:3,shape:"castellated",rotation:180,x:.058,y:.146},{name:"GP2",type:"io",number:4,gpio:2,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"SCK",pwm:"A"},buses:{i2c:1,spi:0},shape:"castellated",rotation:180,x:.058,y:.193},{name:"GP3",type:"io",number:5,gpio:3,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SCL",spi:"TX",pwm:"B"},buses:{i2c:1,spi:0},shape:"castellated",rotation:180,x:.058,y:.24},{name:"GP4",type:"io",number:6,gpio:4,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"RX",pwm:"A"},buses:{i2c:0,spi:0},shape:"castellated",rotation:180,x:.058,y:.287},{name:"GP5",type:"io",number:7,gpio:5,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SCL",spi:"CSn",pwm:"B"},buses:{i2c:0,spi:0},shape:"castellated",rotation:180,x:.058,y:.334},{name:"GND",type:"gnd",number:8,shape:"castellated",rotation:180,x:.058,y:.381},{name:"GP6",type:"io",number:9,gpio:6,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"SCK",pwm:"A"},buses:{i2c:1,spi:0},shape:"castellated",rotation:180,x:.058,y:.428},{name:"GP7",type:"io",number:10,gpio:7,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SCL",spi:"TX",pwm:"B"},buses:{i2c:1,spi:0},shape:"castellated",rotation:180,x:.058,y:.475},{name:"GP8",type:"io",number:11,gpio:8,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"RX",pwm:"A"},buses:{i2c:0,spi:1},shape:"castellated",rotation:180,x:.058,y:.522},{name:"GP9",type:"io",number:12,gpio:9,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SCL",spi:"CSn",pwm:"B"},buses:{i2c:0,spi:1},shape:"castellated",rotation:180,x:.058,y:.569},{name:"GND",type:"gnd",number:13,shape:"castellated",rotation:180,x:.058,y:.616},{name:"GP10",type:"io",number:14,gpio:10,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"SCK",pwm:"A"},buses:{i2c:1,spi:1},shape:"castellated",rotation:180,x:.058,y:.663},{name:"GP11",type:"io",number:15,gpio:11,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SCL",spi:"TX",pwm:"B"},buses:{i2c:1,spi:1},shape:"castellated",rotation:180,x:.058,y:.71},{name:"GP12",type:"io",number:16,gpio:12,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"RX",pwm:"A"},buses:{i2c:0,spi:1},shape:"castellated",rotation:180,x:.058,y:.757},{name:"GP13",type:"io",number:17,gpio:13,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SCL",spi:"CSn",pwm:"B"},buses:{i2c:0,spi:1},shape:"castellated",rotation:180,x:.058,y:.804},{name:"GND",type:"gnd",number:18,shape:"castellated",rotation:180,x:.058,y:.851},{name:"GP14",type:"io",number:19,gpio:14,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"SCK",pwm:"A"},buses:{i2c:1,spi:1},shape:"castellated",rotation:180,x:.058,y:.898},{name:"GP15",type:"io",number:20,gpio:15,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SCL",spi:"TX",pwm:"B"},buses:{i2c:1,spi:1},shape:"castellated",rotation:180,x:.058,y:.945}]},{edge:"right",pins:[{name:"VBUS",type:"pwr",number:40,shape:"castellated",rotation:0,x:.942,y:.052},{name:"VSYS",type:"pwr",number:39,shape:"castellated",rotation:0,x:.942,y:.099},{name:"GND",type:"gnd",number:38,shape:"castellated",rotation:0,x:.942,y:.146},{name:"3V3_EN",type:"other",number:37,shape:"castellated",rotation:0,x:.942,y:.193},{name:"3V3",type:"pwr",number:36,shape:"castellated",rotation:0,x:.942,y:.24},{name:"ADC_VREF",type:"other",number:35,shape:"castellated",rotation:0,x:.942,y:.287},{name:"GP28",type:"io",number:34,gpio:28,capabilities:["digital","pwm","adc","spi","i2c"],signals:{i2c:"SDA",spi:"RX",pwm:"A"},buses:{i2c:0,spi:1,adc:2},shape:"castellated",rotation:0,x:.942,y:.334},{name:"GND",type:"gnd",number:33,shape:"castellated",rotation:0,x:.942,y:.381},{name:"GP27",type:"io",number:32,gpio:27,capabilities:["digital","pwm","adc","spi","i2c"],signals:{i2c:"SCL",spi:"TX",pwm:"B"},buses:{i2c:1,spi:1,adc:1},shape:"castellated",rotation:0,x:.942,y:.428},{name:"GP26",type:"io",number:31,gpio:26,capabilities:["digital","pwm","adc","spi","i2c"],signals:{i2c:"SDA",spi:"SCK",pwm:"A"},buses:{i2c:1,spi:1,adc:0},shape:"castellated",rotation:0,x:.942,y:.475},{name:"RUN",type:"other",number:30,shape:"castellated",rotation:0,x:.942,y:.522},{name:"GP22",type:"io",number:29,gpio:22,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"SCK",pwm:"A"},buses:{i2c:1,spi:0},shape:"castellated",rotation:0,x:.942,y:.569},{name:"GND",type:"gnd",number:28,shape:"castellated",rotation:0,x:.942,y:.616},{name:"GP21",type:"io",number:27,gpio:21,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SCL",spi:"CSn",pwm:"B"},buses:{i2c:0,spi:0},shape:"castellated",rotation:0,x:.942,y:.663},{name:"GP20",type:"io",number:26,gpio:20,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"RX",pwm:"A"},buses:{i2c:0,spi:0},shape:"castellated",rotation:0,x:.942,y:.71},{name:"GP19",type:"io",number:25,gpio:19,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SCL",spi:"TX",pwm:"B"},buses:{i2c:1,spi:0},shape:"castellated",rotation:0,x:.942,y:.757},{name:"GP18",type:"io",number:24,gpio:18,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"SCK",pwm:"A"},buses:{i2c:1,spi:0},shape:"castellated",rotation:0,x:.942,y:.804},{name:"GND",type:"gnd",number:23,shape:"castellated",rotation:0,x:.942,y:.851},{name:"GP17",type:"io",number:22,gpio:17,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SCL",spi:"CSn",pwm:"B"},buses:{i2c:0,spi:0},shape:"castellated",rotation:0,x:.942,y:.898},{name:"GP16",type:"io",number:21,gpio:16,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"RX",pwm:"A"},buses:{i2c:0,spi:0},shape:"castellated",rotation:0,x:.942,y:.945}]}],ledLabel:"LED",image:"image.png",imageLayer:{x:0,y:0,w:1,h:1},layerVisibility:{pcb:!1,image:!0,holes:!0,pins:!0,components:!0},helpText:`# Raspberry Pi Pico W

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
`},{id:"pico2w",name:"Raspberry Pi Pico 2 W",description:"RP2350 microcontroller board with CYW43439 2.4GHz wireless (Wi-Fi / BLE).",manufacturer:"Raspberry Pi",family:"Microcontroller",tags:["rp2350","wifi","pico"],package:"THT",pinSpacing:2.54,voltage:"1.8–5.5V",partNumber:"SC1634",version:"1.0.7",mcu:"RP2350",pcbColor:"#0f5a2e",aspect:.3943,dimensions:{width:21,height:51},headers:[{edge:"left",pins:[{name:"GP0",type:"io",number:1,gpio:0,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"RX",pwm:"A"},buses:{i2c:0,spi:0},shape:"castellated",rotation:180,x:.09969704764229911,y:.062475401036879596},{name:"GP1",type:"io",number:2,gpio:1,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SCL",spi:"CSn",pwm:"B"},buses:{i2c:0,spi:0},shape:"castellated",rotation:180,x:.09969704764229911,y:.1086754010368796},{name:"GND",type:"gnd",number:3,shape:"castellated",rotation:180,x:.09969704764229911,y:.1548754010368796},{name:"GP2",type:"io",number:4,gpio:2,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"SCK",pwm:"A"},buses:{i2c:1,spi:0},shape:"castellated",rotation:180,x:.09969704764229911,y:.2010754010368796},{name:"GP3",type:"io",number:5,gpio:3,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SCL",spi:"TX",pwm:"B"},buses:{i2c:1,spi:0},shape:"castellated",rotation:180,x:.09969704764229911,y:.2472754010368796},{name:"GP4",type:"io",number:6,gpio:4,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"RX",pwm:"A"},buses:{i2c:0,spi:0},shape:"castellated",rotation:180,x:.09969704764229911,y:.2935754010368796},{name:"GP5",type:"io",number:7,gpio:5,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SCL",spi:"CSn",pwm:"B"},buses:{i2c:0,spi:0},shape:"castellated",rotation:180,x:.09969704764229911,y:.3397754010368796},{name:"GND",type:"gnd",number:8,shape:"castellated",rotation:180,x:.09969704764229911,y:.3859754010368796},{name:"GP6",type:"io",number:9,gpio:6,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"SCK",pwm:"A"},buses:{i2c:1,spi:0},shape:"castellated",rotation:180,x:.09969704764229911,y:.43217540103687957},{name:"GP7",type:"io",number:10,gpio:7,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SCL",spi:"TX",pwm:"B"},buses:{i2c:1,spi:0},shape:"castellated",rotation:180,x:.09969704764229911,y:.4783754010368796},{name:"GP8",type:"io",number:11,gpio:8,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"RX",pwm:"A"},buses:{i2c:0,spi:1},shape:"castellated",rotation:180,x:.09969704764229911,y:.5245754010368796},{name:"GP9",type:"io",number:12,gpio:9,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SCL",spi:"CSn",pwm:"B"},buses:{i2c:0,spi:1},shape:"castellated",rotation:180,x:.09969704764229911,y:.5707754010368795},{name:"GND",type:"gnd",number:13,shape:"castellated",rotation:180,x:.09969704764229911,y:.6169754010368795},{name:"GP10",type:"io",number:14,gpio:10,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"SCK",pwm:"A"},buses:{i2c:1,spi:1},shape:"castellated",rotation:180,x:.09969704764229911,y:.6631754010368796},{name:"GP11",type:"io",number:15,gpio:11,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SCL",spi:"TX",pwm:"B"},buses:{i2c:1,spi:1},shape:"castellated",rotation:180,x:.09969704764229911,y:.7093754010368796},{name:"GP12",type:"io",number:16,gpio:12,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"RX",pwm:"A"},buses:{i2c:0,spi:1},shape:"castellated",rotation:180,x:.09969704764229911,y:.7556754010368796},{name:"GP13",type:"io",number:17,gpio:13,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SCL",spi:"CSn",pwm:"B"},buses:{i2c:0,spi:1},shape:"castellated",rotation:180,x:.09969704764229911,y:.8018754010368796},{name:"GND",type:"gnd",number:18,shape:"castellated",rotation:180,x:.09969704764229911,y:.8480754010368796},{name:"GP14",type:"io",number:19,gpio:14,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"SCK",pwm:"A"},buses:{i2c:1,spi:1},shape:"castellated",rotation:180,x:.09969704764229911,y:.8942754010368796},{name:"GP15",type:"io",number:20,gpio:15,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SCL",spi:"TX",pwm:"B"},buses:{i2c:1,spi:1},shape:"castellated",rotation:180,x:.09969704764229911,y:.9404754010368794}]},{edge:"right",pins:[{name:"VBUS",type:"pwr",number:40,shape:"castellated",rotation:0,x:.9030545479910713,y:.062475401036879596},{name:"VSYS",type:"pwr",number:39,shape:"castellated",rotation:0,x:.9030545479910713,y:.1086754010368796},{name:"GND",type:"gnd",number:38,shape:"castellated",rotation:0,x:.9030545479910713,y:.1548754010368796},{name:"3V3_EN",type:"other",number:37,shape:"castellated",rotation:0,x:.9030545479910713,y:.2010754010368796},{name:"3V3",type:"pwr",number:36,shape:"castellated",rotation:0,x:.9030545479910713,y:.2472754010368796},{name:"ADC_VREF",type:"other",number:35,shape:"castellated",rotation:0,x:.9030545479910713,y:.2935754010368796},{name:"GP28",type:"io",number:34,gpio:28,capabilities:["digital","pwm","adc","spi","i2c"],signals:{i2c:"SDA",spi:"RX",pwm:"A"},buses:{i2c:0,spi:1,adc:2},shape:"castellated",rotation:0,x:.9030545479910713,y:.3397754010368796},{name:"GND",type:"gnd",number:33,shape:"castellated",rotation:0,x:.9030545479910713,y:.3859754010368796},{name:"GP27",type:"io",number:32,gpio:27,capabilities:["digital","pwm","adc","spi","i2c"],signals:{i2c:"SCL",spi:"TX",pwm:"B"},buses:{i2c:1,spi:1,adc:1},shape:"castellated",rotation:0,x:.9030545479910713,y:.43217540103687957},{name:"GP26",type:"io",number:31,gpio:26,capabilities:["digital","pwm","adc","spi","i2c"],signals:{i2c:"SDA",spi:"SCK",pwm:"A"},buses:{i2c:1,spi:1,adc:0},shape:"castellated",rotation:0,x:.9030545479910713,y:.4783754010368796},{name:"RUN",type:"other",number:30,shape:"castellated",rotation:0,x:.9030545479910713,y:.5245754010368796},{name:"GP22",type:"io",number:29,gpio:22,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"SCK",pwm:"A"},buses:{i2c:1,spi:0},shape:"castellated",rotation:0,x:.9030545479910713,y:.5707754010368795},{name:"GND",type:"gnd",number:28,shape:"castellated",rotation:0,x:.9030545479910713,y:.6169754010368795},{name:"GP21",type:"io",number:27,gpio:21,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SCL",spi:"CSn",pwm:"B"},buses:{i2c:0,spi:0},shape:"castellated",rotation:0,x:.9030545479910713,y:.6631754010368796},{name:"GP20",type:"io",number:26,gpio:20,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"RX",pwm:"A"},buses:{i2c:0,spi:0},shape:"castellated",rotation:0,x:.9030545479910713,y:.7093754010368796},{name:"GP19",type:"io",number:25,gpio:19,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SCL",spi:"TX",pwm:"B"},buses:{i2c:1,spi:0},shape:"castellated",rotation:0,x:.9030545479910713,y:.7556754010368796},{name:"GP18",type:"io",number:24,gpio:18,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"SCK",pwm:"A"},buses:{i2c:1,spi:0},shape:"castellated",rotation:0,x:.9030545479910713,y:.8018754010368796},{name:"GND",type:"gnd",number:23,shape:"castellated",rotation:0,x:.9030545479910713,y:.8480754010368796},{name:"GP17",type:"io",number:22,gpio:17,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SCL",spi:"CSn",pwm:"B"},buses:{i2c:0,spi:0},shape:"castellated",rotation:0,x:.9030545479910713,y:.8942754010368796},{name:"GP16",type:"io",number:21,gpio:16,capabilities:["digital","pwm","spi","i2c"],signals:{i2c:"SDA",spi:"RX",pwm:"A"},buses:{i2c:0,spi:0},shape:"castellated",rotation:0,x:.9030545479910713,y:.9404754010368794}]}],ledLabel:"LED",image:"image.png",imageLayer:{x:.038349914550781294,y:.010895316277623301,w:.9309969220842635,h:.9567124380906831},electrical:{model:"regulator",maxCurrentA:.3,inputRail:"VSYS",outputRail:"3V3",outputV:3.3,dropoutV:.3},layerVisibility:{pcb:!1,image:!0,holes:!0,pins:!0,components:!0},helpText:`# Raspberry Pi Pico 2 W

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
`},{id:"seeed-xiao-expansion-base",name:"Seeed XIAO Expansion Base",description:"Carrier board for the XIAO family — OLED, RTC, buzzer, SD slot and four Grove ports. A XIAO plugs into the socket on top.",manufacturer:"Seeed Studio",family:"Carrier",tags:["xiao","seeed","carrier","expansion","grove","oled"],package:"THT",pinSpacing:2.54,voltage:"3.3V",partNumber:"103030356",properties:{display:'0.96" SSD1306 OLED, I²C 0x3C',rtc:"PCF8563, I²C 0x51, CR1220 backup",grove:"2x I²C, 1x UART, 1x analog/digital",storage:"microSD (SPI, CS on D2)"},version:"0.1.19",pcbColor:"#1b4d3e",aspect:1.365,dimensions:{width:58,height:42.5},shape:{kind:"rect",cornerRadius:0},headers:[{edge:"left",pins:[{name:"TX6",type:"io",group:"grp-0f21cxf",gpio:6,capabilities:["digital","uart"],signals:{uart:"TX"},rotation:0,x:.9369244384765626,y:.4482262103510838},{name:"5v",type:"pwr",group:"grp-0f21cxf",rotation:0,x:.9369244384765626,y:.49764884320427394},{name:"GND",type:"gnd",group:"grp-0f21cxf",rotation:180,x:.89090584941294,y:.5543363216624541},{name:"RX07",type:"io",group:"grp-0f21cxf",gpio:7,capabilities:["digital","uart"],signals:{uart:"RX"},rotation:0,x:.9369244384765626,y:.3886679825128293},{name:"3v3",type:"pwr",group:"grp-0f21cxf",rotation:180,x:.89090584941294,y:.49764884320427394},{name:"GND",type:"gnd",group:"grp-0f21cxf",rotation:0,x:.9369244384765626,y:.5543363216624541},{name:"SWDIO",type:"other",group:"grp-0f21cxf",rotation:180,x:.89090584941294,y:.4482262103510838},{name:"SWCLK",type:"other",group:"grp-0f21cxf",rotation:180,x:.89090584941294,y:.3886679825128293},{name:"BAT+",type:"pwr",label:"B+",shape:"pogo",x:.035059,y:.436203},{name:"BAT-",type:"gnd",label:"B-",shape:"pogo",x:.035059,y:.519968},{name:"GND",type:"gnd",x:.8799811808268229,y:.6970861912147671},{name:"5V",type:"pwr",x:.8799811808268229,y:.7455997194776347},{name:"SCL",type:"io",group:"grp-sr33gak",capabilities:["i2c"],signals:{i2c:"SCL"},x:.6395083661751281,y:.11081541779548931},{name:"SDA",type:"io",group:"grp-sr33gak",capabilities:["digital","i2c"],signals:{i2c:"SDA"},x:.6713615593130969,y:.11081541779548931},{name:"VCC",type:"pwr",group:"grp-sr33gak",x:.7086321043139839,y:.11081541779548931},{name:"GND",type:"gnd",group:"grp-sr33gak",x:.7505139479648129,y:.11081541779548931},{name:"GPIO0",type:"io",group:"grp-sr33gak-copy-3",gpio:0,capabilities:["digital","pwm"],signals:{i2c:"SCL"},rotation:90,x:.5462715394157396,y:.914719370528234},{name:"N/A",type:"other",group:"grp-sr33gak-copy-3",rotation:90,x:.5144183462777707,y:.914719370528234},{name:"VCC",type:"pwr",group:"grp-sr33gak-copy-3",rotation:90,x:.4771478012768837,y:.914719370528234},{name:"GND",type:"gnd",group:"grp-sr33gak-copy-3",rotation:90,x:.43526595762605474,y:.914719370528234},{name:"RX7",type:"io",group:"grp-sr33gak-copy-3-copy-4",gpio:7,capabilities:["digital","pwm","i2c","uart"],signals:{i2c:"SCL",uart:"RX"},buses:{i2c:0,uart:0},rotation:90,x:.7478195658898286,y:.9147965236081677},{name:"TX6",type:"io",group:"grp-sr33gak-copy-3-copy-4",gpio:6,capabilities:["digital","pwm","i2c","uart"],signals:{i2c:"SDA",uart:"TX"},buses:{i2c:0,uart:0},rotation:90,x:.7159663727518597,y:.9147965236081677},{name:"VCC",type:"pwr",group:"grp-sr33gak-copy-3-copy-4",rotation:90,x:.6786958277509727,y:.9147965236081677},{name:"GND",type:"gnd",group:"grp-sr33gak-copy-3-copy-4",rotation:90,x:.6368139841001437,y:.9147965236081677}]},{edge:"left",pins:[{name:"D0",type:"io",locked:!0,number:1,gpio:26,capabilities:["digital","pwm","adc"],signals:{pwm:"A"},buses:{adc:0},shape:"round",x:.07149010029018933,y:.634778167372771,derived:"mount-1"},{name:"D1",type:"io",locked:!0,number:2,gpio:27,capabilities:["digital","pwm","adc"],signals:{pwm:"B"},buses:{adc:1},shape:"round",x:.11218116354861002,y:.634778167372771,derived:"mount-1"},{name:"D2",type:"io",locked:!0,number:3,gpio:28,capabilities:["digital","pwm","adc"],signals:{pwm:"A"},buses:{adc:2},shape:"round",x:.15182057718646383,y:.634778167372771,derived:"mount-1"},{name:"D3",type:"io",locked:!0,number:4,gpio:29,capabilities:["digital","pwm","adc"],signals:{pwm:"B"},buses:{adc:3},shape:"round",x:.191086080209004,y:.634778167372771,derived:"mount-1"},{name:"D4",type:"io",locked:!0,number:5,gpio:6,capabilities:["digital","pwm","i2c"],signals:{i2c:"SDA",pwm:"A"},buses:{i2c:1},shape:"round",x:.23008041628887813,y:.634778167372771,derived:"mount-1"},{name:"D5",type:"io",locked:!0,number:6,gpio:7,capabilities:["digital","pwm","i2c"],signals:{i2c:"SCL",pwm:"B"},buses:{i2c:1},shape:"round",x:.270300359222864,y:.634778167372771,derived:"mount-1"},{name:"D6",type:"io",locked:!0,number:7,gpio:0,capabilities:["digital","pwm","uart"],signals:{uart:"TX",pwm:"A"},buses:{uart:0},shape:"round",x:.30790395740007936,y:.6347781673727708,derived:"mount-1"},{name:"5V",type:"pwr",locked:!0,number:8,shape:"round",x:.07167496763838632,y:.3114766864993727,derived:"mount-1"},{name:"GND",type:"gnd",locked:!0,number:9,shape:"round",x:.11218116354861002,y:.3114766864993727,derived:"mount-1"},{name:"3V3",type:"pwr",locked:!0,number:10,shape:"round",x:.15182057718646372,y:.3114766864993727,derived:"mount-1"},{name:"D10",type:"io",locked:!0,number:11,gpio:3,capabilities:["digital","pwm","spi"],signals:{spi:"TX",pwm:"B"},buses:{spi:0},shape:"round",x:.19108608020900394,y:.3114766864993727,derived:"mount-1"},{name:"D9",type:"io",locked:!0,number:12,gpio:4,capabilities:["digital","pwm","spi"],signals:{spi:"RX",pwm:"A"},buses:{spi:0},shape:"round",x:.23008041628887813,y:.3114766864993727,derived:"mount-1"},{name:"D8",type:"io",locked:!0,number:13,gpio:2,capabilities:["digital","pwm","spi"],signals:{spi:"SCK",pwm:"A"},buses:{spi:0},shape:"round",x:.270300359222864,y:.3114766864993727,derived:"mount-1"},{name:"D7",type:"io",locked:!0,number:14,gpio:1,capabilities:["digital","pwm","spi","uart"],signals:{spi:"CSn",uart:"RX",pwm:"B"},buses:{spi:0,uart:0},shape:"round",x:.30790395740007936,y:.31147668649937255,derived:"mount-1"}]}],mountingHoles:[{x:.06976427714029948,y:.10291208304610905,diameter:1.5},{x:.9345549519856771,y:.10291208304610905,diameter:1.5},{x:.9345549519856771,y:.9031413023705576,diameter:1.5},{x:.06976427714029948,y:.9031413023705576,diameter:1.5}],groups:[{id:"grp-0f21cxf",name:"Edge connector"},{id:"grp-sr33gak",housing:{kind:"grove",x:.6913569423529278,y:.20731914528300358}},{id:"grp-sr33gak-copy-3",housing:{kind:"grove",x:.7313569423529278,y:.24731914528300358}},{id:"grp-sr33gak-copy-3-copy-4",housing:{kind:"grove",x:.7713569423529278,y:.28731914528300356}}],connectors:[{z:0,kind:"grove",variant:"i2c",x:.49144683837890624,y:.1077782485064338,pins:[{name:"SCL",type:"io",capabilities:["i2c"],signals:{i2c:"SCL"}},{name:"SDA",type:"io",capabilities:["i2c"],signals:{i2c:"SDA"}},{name:"VCC",type:"pwr"},{name:"GND",type:"gnd"}]}],mounts:[{id:"mount-1",footprint:"xiao",ref:{lib:"snakie-standard",part:"seeed-xiao-rp2350"},label:"Seeed Studio XIAO RP2350",x:.17445560075618602,y:.4780852094570392,rotation:270}],image:"image.png",imageLayer:{x:-9040832519531528e-20,y:-.00020834171070771568,w:1,h:1},display:{width:128,height:64,colour:"mono"},suggests:[{module:"ssd1306",unlocks:'the 0.96" OLED'},{module:"pcf8563",unlocks:"the PCF8563 real-time clock"},{module:"buzzer",unlocks:"tones and RTTTL melodies on the buzzer"},{module:"sdcard",unlocks:"the microSD slot"}],layerVisibility:{pcb:!1,image:!0,holes:!0,pins:!0,components:!0},helpText:"# Seeed XIAO Expansion Base\n\nA carrier for the XIAO family: plug a XIAO into the socket and you get an OLED,\na real-time clock, a buzzer, a user button, a microSD slot and four Grove ports\nwith no soldering.\n\n**58 × 42.5 mm.** The board is a *carrier*, not a microcontroller — it has no MCU\nof its own. Drop a XIAO into the socket and the seated board's pins become this\nboard's pins (`D4` on the XIAO **is** `D4` here), which is how the Grove ports\nbelow resolve to real GPIOs.\n\n## What's on it\n\n| Peripheral | Connection |\n|---|---|\n| 0.96\" OLED (SSD1306) | I²C, address `0x3C` |\n| RTC (PCF8563) | I²C, address `0x51`, CR1220 backup cell |\n| Passive buzzer | `A3` (= `D3`) |\n| User button | `D1` |\n| microSD | SPI, CS on `D2` (SCK `D8`, MISO `D9`, MOSI `D10`) |\n| Grove I²C ×2 | SCL `D5`, SDA `D4` |\n| Grove UART ×1 | RX `D7`, TX `D6` |\n| Grove analog/digital ×1 | `D0`, `D1` |\n\nThere is **no motor driver on this board** — that's a separate Grove module.\n\n## Drivers you need\n\nOnly two of the onboard peripherals need anything installed. The part's **Works\nwith** list in the Parts panel installs each one on its own — nothing is pushed at\nyou, because most projects use only some of this board.\n\n| Peripheral | Driver |\n|---|---|\n| OLED | **already works** — `inst.display` has a built-in SSD1306, or install `ssd1306` for the full driver |\n| Buzzer | **already works** — `inst.buzzer`, or install `buzzer` for RTTTL melodies |\n| User button | **nothing to install** — it's a `Pin` |\n| RTC | install **`pcf8563`** |\n| microSD | install **`sdcard`** |\n\nThe RTC is worth a warning: the PCF8563's seconds register shares its top bit with\na **voltage-low flag**, so a clock whose backup cell has gone flat doesn't run\nslow — it reports nonsense. Check `rtc.unset()` before trusting a reading.\n\n## Pin gotchas\n\nThree collisions are worth knowing before you wire anything up:\n\n- **The buzzer sits on `A3`, and on the XIAO RP2350 `A3`/`D3` is also the battery\n  voltage sense (GPIO 29).** You can't beep and read the battery on the same\n  pin. Seeed put a cuttable trace under the buzzer if you need `A3` back.\n- **The user button is on `D1`, which is also the second pin of the Grove\n  analog/digital port.** Plug a module into that port and it fights the button.\n- `A3` and `D3` are the same physical GPIO — the two silk names refer to one pin.\n\n## GPIO numbers\n\nThe Grove ports on this part are labelled with the **RP2040/RP2350 XIAO** GPIO\nmapping, which is the same for both:\n\n| Silk | GPIO | | Silk | GPIO |\n|---|---|---|---|---|\n| `D0` | GP26 | | `D6` | GP0 |\n| `D1` | GP27 | | `D7` | GP1 |\n| `D2` | GP28 | | `D8` | GP2 |\n| `D3` | GP29 | | `D9` | GP4 |\n| `D4` | GP6 (SDA) | | `D10` | GP3 |\n| `D5` | GP7 (SCL) | | | |\n\n### A XIAO with a different MCU has different numbers\n\nThe silk names stay the same when you seat a different XIAO; the GPIOs behind\nthem do not. This is the single commonest way to get a dead bus on this board,\nbecause the port you plugged into is right and the code is addressing something\nelse entirely. On a **XIAO ESP32-S3**:\n\n| Silk | GPIO | | Silk | GPIO |\n|---|---|---|---|---|\n| `D0` | 1 | | `D6` | 43 (TX) |\n| `D1` | 2 | | `D7` | 44 (RX) |\n| `D2` | 3 | | `D8` | 7 (SCK) |\n| `D3` | 4 | | `D9` | 8 (MISO) |\n| `D4` | **5** (SDA) | | `D10` | 9 (MOSI) |\n| `D5` | **6** (SCL) | | | |\n\nSo the I²C bus everything hangs off — OLED, RTC and both Grove I²C ports — is\n**GP6/GP7 on an RP2040/RP2350** and **GPIO5/GPIO6 on an ESP32-S3**:\n\n```python\nfrom machine import Pin, I2C\n\n# i2c = I2C(1, sda=Pin(6), scl=Pin(7), freq=400_000)   # XIAO RP2040 / RP2350\ni2c = I2C(1, sda=Pin(5), scl=Pin(6), freq=400_000)     # XIAO ESP32-S3\nprint([hex(a) for a in i2c.scan()])   # 0x3c OLED, 0x51 RTC, + your modules\n```\n\n**That scan is the board's own self-test.** The OLED (`0x3c`) and RTC (`0x51`)\nare soldered to this bus, so they answer whatever you have plugged in. See both\nand your pins are right — anything still missing is the module or the port. See\nnothing at all and you are on the wrong pins for the XIAO you seated.\n\nTwo of the four Grove ports are I²C; the others are UART (`D6`/`D7`) and\nanalog/digital (`D0`/`D1`). A module in one of those will never show in a scan.\n\n## Silk layout\n\nThe component positions here are representative rather than a copy of the\nartwork: the four Grove ports are drawn along the bottom edge for legibility.\nThe **pin assignments are the real ones**, which is what matters for wiring.\n"},{id:"seeed-xiao-rp2040",name:"Seeed Studio XIAO RP2040",description:"RP2040 dual Cortex-M0+ @133MHz — XIAO form factor",manufacturer:"Seeed Studio",family:"Microcontroller",tags:["rp2040","xiao","seeed","microcontroller"],package:"SMD",pinSpacing:2.54,voltage:"3.3V",version:"0.1.4",footprint:"xiao",mcu:"RP2040",pcbColor:"#177a48",aspect:.848,dimensions:{width:17.8,height:21},shape:{kind:"rect",cornerRadius:0},headers:[{edge:"left",pins:[{name:"D0",type:"io",number:1,gpio:26,capabilities:["digital","pwm","adc"],signals:{pwm:"A"},buses:{adc:0},castellated:!0,shape:"castellated",rotation:180,x:.09,y:.17343754039091222},{name:"D1",type:"io",number:2,gpio:27,capabilities:["digital","pwm","adc"],signals:{pwm:"B"},buses:{adc:1},castellated:!0,shape:"castellated",rotation:180,x:.09,y:.2885095521515491},{name:"D2",type:"io",number:3,gpio:28,capabilities:["digital","pwm","adc"],signals:{pwm:"A"},buses:{adc:2},castellated:!0,shape:"castellated",rotation:180,x:.09,y:.40358156391218597},{name:"D3",type:"io",number:4,gpio:29,capabilities:["digital","pwm","adc"],signals:{pwm:"B"},buses:{adc:3},castellated:!0,shape:"castellated",rotation:180,x:.09,y:.5186535756728229},{name:"D4",type:"io",number:5,gpio:6,capabilities:["digital","pwm","i2c"],signals:{i2c:"SDA",pwm:"A"},buses:{i2c:1},castellated:!0,shape:"castellated",rotation:180,x:.09,y:.6337255874334597},{name:"D5",type:"io",number:6,gpio:7,capabilities:["digital","pwm","i2c"],signals:{i2c:"SCL",pwm:"B"},buses:{i2c:1},castellated:!0,shape:"castellated",rotation:180,x:.09,y:.7487975991940966},{name:"D6",type:"io",number:7,gpio:0,capabilities:["digital","pwm","uart"],signals:{uart:"TX",pwm:"A"},buses:{uart:0},castellated:!0,shape:"castellated",rotation:180,x:.09,y:.8638696109547335}]},{edge:"right",pins:[{name:"5V",type:"pwr",number:8,castellated:!0,shape:"castellated",rotation:0,x:.91,y:.17343754039091222},{name:"GND",type:"gnd",number:9,castellated:!0,shape:"castellated",rotation:0,x:.91,y:.2885095521515491},{name:"3V3",type:"pwr",number:10,castellated:!0,shape:"castellated",rotation:0,x:.91,y:.40358156391218597},{name:"D10",type:"io",number:11,gpio:3,capabilities:["digital","pwm","spi"],signals:{spi:"TX",pwm:"B"},buses:{spi:0},castellated:!0,shape:"castellated",rotation:0,x:.91,y:.5186535756728229},{name:"D9",type:"io",number:12,gpio:4,capabilities:["digital","pwm","spi"],signals:{spi:"RX",pwm:"A"},buses:{spi:0},castellated:!0,shape:"castellated",rotation:0,x:.91,y:.6337255874334597},{name:"D8",type:"io",number:13,gpio:2,capabilities:["digital","pwm","spi"],signals:{spi:"SCK",pwm:"A"},buses:{spi:0},castellated:!0,shape:"castellated",rotation:0,x:.91,y:.7487975991940966},{name:"D7",type:"io",number:14,gpio:1,capabilities:["digital","pwm","spi","uart"],signals:{spi:"CSn",uart:"RX",pwm:"B"},buses:{spi:0,uart:0},castellated:!0,shape:"castellated",rotation:0,x:.91,y:.8638696109547335}]}],ledLabel:"25",image:"image.png",imageLayer:{x:-.02132224154172946,y:-.07242718864889708,w:1.0349044951081512,h:1.125746111900978},electrical:{model:"consumer",maxCurrentA:.045,currentDrawA:.045,stallCurrentA:.045,terminals:{positive:"5V",negative:"GND"}},layerVisibility:{pcb:!1,image:!0,holes:!0,pins:!0,components:!0}},{id:"seeed-xiao-rp2350",name:"Seeed Studio XIAO RP2350",description:"RP2350 dual Cortex-M33 @150MHz — XIAO form factor",manufacturer:"Seeed Studio",family:"Microcontroller",tags:["rp2350","xiao","seeed","microcontroller"],package:"SMD",pinSpacing:2.54,voltage:"3.3V",version:"0.1.4",footprint:"xiao",mcu:"RP2350",pcbColor:"#101216",aspect:.848,dimensions:{width:17.8,height:21},shape:{kind:"rect",cornerRadius:0},headers:[{edge:"left",pins:[{name:"D0",type:"io",number:1,gpio:26,capabilities:["digital","pwm","adc"],signals:{pwm:"A"},buses:{adc:0},castellated:!0,shape:"castellated",rotation:180,x:.12587355553828086,y:.215619093951057},{name:"D1",type:"io",number:2,gpio:27,capabilities:["digital","pwm","adc"],signals:{pwm:"B"},buses:{adc:1},castellated:!0,shape:"castellated",rotation:180,x:.12587355553828086,y:.32800393533145683},{name:"D2",type:"io",number:3,gpio:28,capabilities:["digital","pwm","adc"],signals:{pwm:"A"},buses:{adc:2},castellated:!0,shape:"castellated",rotation:180,x:.12587355553828086,y:.43748422061695774},{name:"D3",type:"io",number:4,gpio:29,capabilities:["digital","pwm","adc"],signals:{pwm:"B"},buses:{adc:3},castellated:!0,shape:"castellated",rotation:180,x:.12587355553828086,y:.5459318003934972},{name:"D4",type:"io",number:5,gpio:6,capabilities:["digital","pwm","i2c"],signals:{i2c:"SDA",pwm:"A"},buses:{i2c:1},castellated:!0,shape:"castellated",rotation:180,x:.12587355553828086,y:.6536304428998162},{name:"D5",type:"io",number:6,gpio:7,capabilities:["digital","pwm","i2c"],signals:{i2c:"SCL",pwm:"B"},buses:{i2c:1},castellated:!0,shape:"castellated",rotation:180,x:.12587355553828086,y:.7647140948127298},{name:"D6",type:"io",number:7,gpio:0,capabilities:["digital","pwm","uart"],signals:{uart:"TX",pwm:"A"},buses:{uart:0},castellated:!0,shape:"castellated",rotation:180,x:.12587355553828086,y:.8685716516831342},{name:"BAT+",type:"pwr",shape:"smd",side:"rear",label:"B+",x:.4,y:.115},{name:"BAT-",type:"gnd",shape:"smd",side:"rear",label:"B-",x:.6,y:.115}]},{edge:"right",pins:[{name:"5V",type:"pwr",number:8,castellated:!0,shape:"castellated",rotation:0,x:.897801248634878,y:.21612967996036306},{name:"GND",type:"gnd",number:9,castellated:!0,shape:"castellated",rotation:0,x:.897801248634878,y:.32800393533145683},{name:"3V3",type:"pwr",number:10,castellated:!0,shape:"castellated",rotation:0,x:.897801248634878,y:.43748422061695774},{name:"D10",type:"io",number:11,gpio:3,capabilities:["digital","pwm","spi"],signals:{spi:"TX",pwm:"B"},buses:{spi:0},castellated:!0,shape:"castellated",rotation:0,x:.897801248634878,y:.5459318003934972},{name:"D9",type:"io",number:12,gpio:4,capabilities:["digital","pwm","spi"],signals:{spi:"RX",pwm:"A"},buses:{spi:0},castellated:!0,shape:"castellated",rotation:0,x:.897801248634878,y:.6536304428998162},{name:"D8",type:"io",number:13,gpio:2,capabilities:["digital","pwm","spi"],signals:{spi:"SCK",pwm:"A"},buses:{spi:0},castellated:!0,shape:"castellated",rotation:0,x:.897801248634878,y:.7647140948127298},{name:"D7",type:"io",number:14,gpio:1,capabilities:["digital","pwm","spi","uart"],signals:{spi:"CSn",uart:"RX",pwm:"B"},buses:{spi:0,uart:0},castellated:!0,shape:"castellated",rotation:0,x:.897801248634878,y:.8685716516831342}]}],shapes:[{kind:"rect",x:.3,y:.02,label:"USB-C",fill:"#b8bcc4",stroke:"#8a8f96",strokeWidth:1,w:.4,h:.11},{kind:"rect",x:.182273969631359,y:.35850769042968766,label:"RP2350",fill:"#1c2227",stroke:"#8a8f96",strokeWidth:1,w:.635452060737282,h:.546341256534352}],onboardLeds:[{kind:"neopixel",x:.8170988104316627,y:.14613188799689797,gpio:22},{kind:"single",x:.2142065140244509,y:.13346391565659466}],ledLabel:"25",image:"image.png",imageLayer:{x:-.6344096863892246,y:-.24575128695544057,w:2.3168637369613494,h:1.4728633756397151},layerVisibility:{pcb:!1,image:!0,holes:!0,pins:!0,components:!1}},{id:"servo2040",name:"Pimoroni Servo 2040",description:"RP2040 18-channel servo controller with current sensing, 6 sensor inputs and a Qw/ST connector",manufacturer:"Pimoroni",family:"Microcontroller",tags:["rp2040","servo","motor","robotics","pimoroni"],pinSpacing:2.54,voltage:"3.3V",partNumber:"PIM613",version:"0.1.24",mcu:"RP2040",pcbColor:"#12181f",aspect:1.476,dimensions:{width:62.2,height:42},shape:{kind:"rect",cornerRadius:0},headers:[{edge:"left",pins:[{name:"S5",type:"io",number:5,gpio:4,capabilities:["digital","pwm"],signals:{pwm:"A"},rotation:270,x:.2860378881628041,y:.14747292378722665,group:"grp-7q4b7cy"},{name:"S6",type:"io",number:6,gpio:5,capabilities:["digital","pwm"],signals:{pwm:"B"},rotation:270,x:.32578898519710425,y:.14764106872567648,group:"grp-g1t15fs"},{name:"S4",type:"io",number:4,gpio:3,capabilities:["digital","pwm"],signals:{pwm:"B"},rotation:270,x:.24881737463748532,y:.14747292378722665,group:"grp-idk0mpn"},{name:"S3",type:"io",number:3,gpio:2,capabilities:["digital","pwm"],signals:{pwm:"A"},rotation:270,x:.21427769529379595,y:.14786943859325988,group:"grp-x8zl6s2"},{name:"S2",type:"io",number:2,gpio:1,capabilities:["digital","pwm"],signals:{pwm:"B"},rotation:270,x:.17388334181265375,y:.14784847928702924,group:"grp-pynihf8"},{name:"S1",type:"io",number:1,gpio:0,capabilities:["digital","pwm"],signals:{pwm:"A"},rotation:270,x:.13511306302516146,y:.14782044289833954,group:"grp-wa5n0k2"},{name:"S7",type:"io",number:7,gpio:6,capabilities:["digital","pwm"],signals:{pwm:"A"},rotation:270,x:.3954155132361286,y:.14764106872567648,group:"grp-ethxa0b"},{name:"S8",type:"io",number:8,gpio:7,capabilities:["digital","pwm"],signals:{pwm:"B"},rotation:270,x:.4336502073103842,y:.14747292378722665,group:"grp-9p2t4l2"},{name:"S9",type:"io",number:9,gpio:8,capabilities:["digital","pwm"],signals:{pwm:"A"},rotation:270,x:.47176757178120937,y:.14747292378722665,group:"grp-m4gq5id"},{name:"5V",type:"pwr",shape:"round",x:.24356443405151368,y:.9726497510274251},{name:"GND",type:"gnd",shape:"round",x:.28153549007415773,y:.9662265428373548},{name:"3v3",type:"pwr",shape:"round",x:.3195485800806682,y:.9724979743675962},{name:"SDA",type:"io",gpio:20,capabilities:["digital","i2c"],signals:{i2c:"SDA"},shape:"round",x:.3577452885437013,y:.966508804830158},{name:"SCL",type:"io",gpio:21,capabilities:["digital","i2c"],signals:{i2c:"SCL"},shape:"round",x:.395532842839559,y:.9724979743675962},{name:"GND",type:"gnd",shape:"round",x:.4711612942728679,y:.9741392739407346},{name:"SWCLK",type:"other",shape:"round",x:.6246033474627444,y:.972402364856426},{name:"SWDIO",type:"other",shape:"round",x:.6628859827720641,y:.96785859395447},{name:"GND",type:"gnd",shape:"round",x:.7001735364499408,y:.9730737310388485},{name:"GND",type:"gnd",shape:"round",x:.7762116056897481,y:.9741392739407346},{name:"GND",type:"gnd",shape:"round",x:.8534770007095337,y:.9722116888164082},{name:"RST",type:"other",shape:"round",x:.7382632370915732,y:.9674784025211562},{name:"BOOT",type:"other",shape:"round",x:.8146339777852376,y:.9685386077003028},{name:"V5",type:"pwr",rotation:90,x:.2860378881628041,y:.08562790337024585,group:"grp-7q4b7cy"},{name:"G5",type:"gnd",rotation:0,x:.2860378881628041,y:.023782882953265055,group:"grp-7q4b7cy"},{name:"V6",type:"pwr",rotation:90,x:.32553167778379455,y:.08562790337024585,group:"grp-g1t15fs"},{name:"G6",type:"gnd",rotation:90,x:.32578898519710425,y:.023782882953265055,group:"grp-g1t15fs"},{name:"V4",type:"pwr",rotation:90,x:.24881737463748532,y:.08562790337024585,group:"grp-idk0mpn"},{name:"G4",type:"gnd",rotation:90,x:.24870006981327417,y:.023782882953265055,group:"grp-idk0mpn"},{name:"V3",type:"pwr",rotation:90,x:.21427769529379595,y:.08730457376369569,group:"grp-x8zl6s2"},{name:"G3",type:"gnd",rotation:90,x:.21427769529379595,y:.024870210436082136,group:"grp-x8zl6s2"},{name:"V2",type:"pwr",rotation:90,x:.1740006466368649,y:.08600345887004844,group:"grp-pynihf8"},{name:"G2",type:"gnd",rotation:90,x:.1740006466368649,y:.024158438453067647,group:"grp-pynihf8"},{name:"V1",type:"pwr",rotation:90,x:.13511306302516146,y:.08597542248135874,group:"grp-wa5n0k2"},{name:"G1",type:"gnd",rotation:90,x:.13511306302516146,y:.024130402064377943,group:"grp-wa5n0k2"},{name:"V7",type:"pwr",x:.3954155132361286,y:.08579604830869568,group:"grp-ethxa0b"},{name:"G7",type:"gnd",x:.3954155132361286,y:.023951027891714882,group:"grp-ethxa0b"},{name:"V8",type:"pwr",x:.4336502073103842,y:.08562790337024585,group:"grp-9p2t4l2"},{name:"G8",type:"gnd",x:.4336502073103842,y:.023782882953265055,group:"grp-9p2t4l2"},{name:"V9",type:"pwr",x:.47176757178120937,y:.08562790337024585,group:"grp-m4gq5id"},{name:"G9",type:"gnd",x:.47176757178120937,y:.023782882953265055,group:"grp-m4gq5id"},{name:"GND",type:"gnd",shape:"round",x:.8947658355686482,y:.3620081817349676},{name:"5V",type:"pwr",shape:"round",x:.8947658355686482,y:.28028806759650954},{name:"GP26",type:"io",gpio:26,capabilities:["digital","adc"],buses:{adc:0},rotation:0,x:.8582754965276573,y:.7689979436440734,group:"sensor-1"},{name:"V1",type:"pwr",rotation:0,x:.8979955646192026,y:.7672499574546955,group:"sensor-1"},{name:"G1",type:"gnd",rotation:0,x:.9374373123982478,y:.7672499574546955,group:"sensor-1"},{name:"GP27",type:"io",gpio:27,capabilities:["digital","adc"],buses:{adc:1},rotation:0,x:.8583737328014182,y:.7069666501194981,group:"sensor-2"},{name:"V2",type:"pwr",rotation:0,x:.897981700523955,y:.7068006651390794,group:"sensor-2"},{name:"G2",type:"gnd",rotation:0,x:.9378138689845087,y:.7063884106844818,group:"sensor-2"},{name:"GP28",type:"io",gpio:28,capabilities:["digital","adc"],buses:{adc:2},rotation:0,x:.8584798459785951,y:.6453746828651016,group:"sensor-3"},{name:"V3",type:"pwr",rotation:0,x:.8981999140701403,y:.6453746828651016,group:"sensor-3"},{name:"G3",type:"gnd",rotation:0,x:.9379199821616856,y:.6453746828651016,group:"sensor-3"},{name:"GP29",type:"io",gpio:29,capabilities:["adc"],buses:{adc:6},rotation:0,x:.8594355550695281,y:.5842154079387196,group:"sensor-4"},{name:"V4",type:"pwr",rotation:0,x:.8991556231610733,y:.5842154079387196,group:"sensor-4"},{name:"G4",type:"gnd",rotation:0,x:.9388756912526186,y:.5842154079387196,group:"sensor-4"},{name:"GP27",type:"io",gpio:27,capabilities:["adc"],buses:{adc:1},rotation:0,x:.8600479550348125,y:.4617533158034195,group:"sensor-5"},{name:"V5",type:"pwr",rotation:0,x:.8997680231263577,y:.4617533158034195,group:"sensor-5"},{name:"G5",type:"gnd",rotation:0,x:.9396324586664829,y:.4617533158034195,group:"sensor-5"},{name:"GP26",type:"io",gpio:26,capabilities:["adc"],buses:{adc:0},rotation:0,x:.8577872841595492,y:.5229125604018314,group:"sensor-6"},{name:"V6",type:"pwr",rotation:0,x:.8975073522510945,y:.5229125604018314,group:"sensor-6"},{name:"G6",type:"gnd",rotation:0,x:.9372274203426397,y:.5229125604018314,group:"sensor-6"}]},{edge:"right",pins:[{name:"S10",type:"io",number:10,gpio:9,capabilities:["digital","pwm"],signals:{pwm:"B"},rotation:270,x:.5094907193149059,y:.14747292378722665,group:"grp-vcspefm"},{name:"S11",type:"io",number:11,gpio:10,capabilities:["digital","pwm"],signals:{pwm:"A"},rotation:270,x:.5480023007228598,y:.14747292378722665,group:"grp-6h8zflg"},{name:"S12",type:"io",number:12,gpio:11,capabilities:["digital","pwm"],signals:{pwm:"B"},rotation:270,x:.586119665193685,y:.14747292378722665,group:"grp-gyp6zey"},{name:"S13",type:"io",number:13,gpio:12,capabilities:["digital","pwm"],signals:{pwm:"A"},rotation:270,x:.6573770904541015,y:.14747292378722665,group:"grp-q6kmqg8"},{name:"S14",type:"io",number:14,gpio:13,capabilities:["digital","pwm"],signals:{pwm:"B"},rotation:270,x:.6956894969459534,y:.1476956790377033,group:"grp-yqf71i4"},{name:"S15",type:"io",number:15,gpio:14,capabilities:["digital","pwm"],signals:{pwm:"A"},rotation:270,x:.733967107040914,y:.14767905101452544,group:"grp-ftk6lrf"},{name:"S16",type:"io",number:16,gpio:15,capabilities:["digital","pwm"],signals:{pwm:"B"},rotation:270,x:.7722941047498068,y:.14747292378722665,group:"grp-tuh1i9p"},{name:"S17",type:"io",number:17,gpio:16,capabilities:["digital","pwm"],signals:{pwm:"A"},rotation:270,x:.810522327230835,y:.14747292378722665,group:"grp-wz4ltnc"},{name:"S18",type:"io",number:18,gpio:17,capabilities:["digital","pwm"],signals:{pwm:"B"},rotation:270,x:.8490797424316406,y:.14747292378722665,group:"grp-ngrz33p"},{name:"V10",type:"pwr",x:.5094907193149059,y:.08562790337024585,group:"grp-vcspefm"},{name:"G10",type:"gnd",x:.5102791531891633,y:.023782882953265055,group:"grp-vcspefm"},{name:"V11",type:"pwr",x:.5480023007228598,y:.08562790337024585,group:"grp-6h8zflg"},{name:"G11",type:"gnd",x:.5480023007228598,y:.023782882953265055,group:"grp-6h8zflg"},{name:"V12",type:"pwr",x:.586119665193685,y:.08562790337024585,group:"grp-gyp6zey"},{name:"G12",type:"gnd",x:.586119665193685,y:.023782882953265055,group:"grp-gyp6zey"},{name:"V13",type:"pwr",rotation:90,x:.6574466832478841,y:.08562790337024585,group:"grp-q6kmqg8"},{name:"G13",type:"gnd",rotation:90,x:.6574466832478841,y:.023676486202466755,group:"grp-q6kmqg8"},{name:"V14",type:"pwr",rotation:90,x:.6956894969459534,y:.08583403059754464,group:"grp-yqf71i4"},{name:"G14",type:"gnd",rotation:90,x:.6956894969459534,y:.023676486202466755,group:"grp-yqf71i4"},{name:"V15",type:"pwr",rotation:90,x:.733967107040914,y:.08573096698389525,group:"grp-ftk6lrf"},{name:"G15",type:"gnd",rotation:90,x:.733967107040914,y:.023782882953265055,group:"grp-ftk6lrf"},{name:"V16",type:"pwr",rotation:90,x:.7721953295219421,y:.08573096698389525,group:"grp-tuh1i9p"},{name:"G16",type:"gnd",rotation:90,x:.7721953295219421,y:.02367981933961566,group:"grp-tuh1i9p"},{name:"V17",type:"pwr",rotation:90,x:.810522327230835,y:.08562790337024585,group:"grp-wz4ltnc"},{name:"G17",type:"gnd",rotation:90,x:.810522327230835,y:.023782882953265055,group:"grp-wz4ltnc"},{name:"V18",type:"pwr",rotation:90,x:.8490797424316406,y:.08562790337024585,group:"grp-ngrz33p"},{name:"G18",type:"gnd",rotation:90,x:.8485201322199505,y:.023782882953265055,group:"grp-ngrz33p"}]},{edge:"bottom",pins:[{name:"INT",type:"io",gpio:19,capabilities:["digital"],shape:"header",rotation:90,x:.4337205251057943,y:.9673287116156684},{name:"USER",type:"io",number:20,gpio:23,capabilities:["digital"],shape:"header",rotation:180,x:.057563883463541694,y:.7813607497442335},{name:"A0",type:"io",gpio:26,capabilities:["digital","pwm","adc"],signals:{pwm:"A"},buses:{adc:0},shape:"header",rotation:90,x:.5097764450038295,y:.9676767554006643},{name:"A1",type:"io",gpio:27,capabilities:["digital","pwm","adc"],signals:{pwm:"B"},buses:{adc:1},shape:"header",rotation:90,x:.5481055814799453,y:.9731164308587106},{name:"A2",type:"io",gpio:28,capabilities:["digital","pwm","adc"],signals:{pwm:"A"},buses:{adc:2},shape:"header",rotation:90,x:.586119665193685,y:.966355692100192}]}],mountingHoles:[{x:.06566599527994792,y:.06234221951923672,diameter:1},{x:.9134111531575521,y:.061916632516043506,diameter:1},{x:.9134111531575521,y:.9424985501728361,diameter:1},{x:.06566599527994792,y:.9424985501728361,diameter:1}],groups:[{id:"sensor-4",name:"Sensor 4",housing:{kind:"dupont",x:.899156,y:.584215,rotation:90}},{id:"sensor-5",name:"Sensor 5",housing:{kind:"dupont",x:.899816,y:.461753,rotation:90}},{id:"sensor-6",name:"Sensor 6",housing:{kind:"dupont",x:.897507,y:.522913,rotation:90}},{id:"grp-ethxa0b",name:"S7",housing:{kind:"dupont",x:.395416,y:.085796,rotation:90}},{id:"grp-9p2t4l2",name:"S8",housing:{kind:"dupont",x:.43365,y:.085628,rotation:90}},{id:"grp-m4gq5id",name:"S9",housing:{kind:"dupont",x:.471768,y:.085628,rotation:90}},{id:"grp-vcspefm",name:"S10",housing:{kind:"dupont",x:.509754,y:.085628,rotation:90}},{id:"grp-6h8zflg",name:"S11",housing:{kind:"dupont",x:.548002,y:.085628,rotation:90}},{id:"grp-gyp6zey",name:"S12",housing:{kind:"dupont",x:.58612,y:.085628,rotation:90}},{id:"grp-ngrz33p",name:"S18",housing:{kind:"dupont",x:.848893,y:.085628,rotation:90}},{id:"grp-wz4ltnc",name:"S17",housing:{kind:"dupont",x:.810522,y:.085628,rotation:90}},{id:"grp-tuh1i9p",name:"S16",housing:{kind:"dupont",x:.772228,y:.085628,rotation:90}},{id:"grp-ftk6lrf",name:"S15",housing:{kind:"dupont",x:.733967,y:.085731,rotation:90}},{id:"grp-yqf71i4",name:"S14",housing:{kind:"dupont",x:.695689,y:.085735,rotation:90}},{id:"grp-q6kmqg8",name:"S13",housing:{kind:"dupont",x:.657423,y:.085592,rotation:90}},{id:"grp-wa5n0k2",name:"s1",parent:"grp-dezaf9e",housing:{kind:"dupont",x:.135113,y:.085975,rotation:90}},{id:"grp-pynihf8",name:"S2",parent:"grp-dezaf9e",housing:{kind:"dupont",x:.173962,y:.086003,rotation:90}},{id:"grp-x8zl6s2",name:"S3",parent:"grp-dezaf9e",housing:{kind:"dupont",x:.214278,y:.086681,rotation:90}},{id:"grp-idk0mpn",name:"S4",parent:"grp-dezaf9e",housing:{kind:"dupont",x:.248778,y:.085628,rotation:90}},{id:"grp-7q4b7cy",name:"S5",parent:"grp-dezaf9e",housing:{kind:"dupont",x:.286038,y:.085628,rotation:90}},{id:"grp-g1t15fs",name:"S6",parent:"grp-dezaf9e",housing:{kind:"dupont",x:.325703,y:.085684,rotation:90}},{id:"sensor-1",name:"Sensor 1",housing:{kind:"dupont",x:.897903,y:.767833,rotation:90}},{id:"grp-dezaf9e",name:"Servo Block 1"},{id:"sensor-2",name:"Sensor 2",housing:{kind:"dupont",x:.898056,y:.706719,rotation:90}},{id:"sensor-3",name:"Sensor 3",housing:{kind:"dupont",x:.8982,y:.645375,rotation:90}}],onboardLeds:[{kind:"neopixel",x:.7472065635101834,y:.7575462557328969,gpio:18}],connectors:[{kind:"qwiic",label:"QW/ST",x:.16262144037993023,y:.9435839538350882,labelOffset:{x:-.06288587977653823,y:.10732821328078623},pins:[{name:"GND",type:"gnd"},{name:"3V3",type:"pwr"},{name:"SDA",type:"io",gpio:20,capabilities:["i2c"],signals:{i2c:"SDA"},buses:{i2c:0}},{name:"SCL",type:"io",gpio:21,capabilities:["i2c"],signals:{i2c:"SCL"},buses:{i2c:0}}]}],image:"image.png",imageLayer:{x:.00555134894892384,y:-.002499220962038945,w:.9510153198242184,h:1.0098463564435756,opacity:1},electrical:{model:"regulator",maxCurrentA:.3,inputRail:"5V",outputRail:"3v3",outputV:3.3,dropoutV:.3},library:{module:"servo",docs:"https://github.com/pimoroni/pimoroni-pico/tree/main/micropython/examples/servo2040"},layerVisibility:{pcb:!1,image:!0,holes:!0,pins:!0,components:!0},rails:[{name:"Servo V+",pins:["V1","V1","V2","V2","V3","V3","V4","V4","V5","V5","V6","V6","V7","V8","V9","V10","V11","V12","V13","V14","V15","V16","V17","V18"]},{name:"GND",pins:["GND","G1","G1","G2","G2","G3","G3","G4","G4","G5","G5","G6","G6","G7","G8","G9","G10","G11","G12","G13","G14","G15","G16","G17","G18"]}],helpText:`# Pimoroni Servo 2040 (RP2040)

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

## Why 18 servos need PIO, not hardware PWM

Each servo pin shows a **PWM A** or **PWM B** badge in the Part Editor. That's
accurate — it's the hardware PWM channel the GPIO muxes to — but it is *not* 18
independent channels, and the reason matters if you ever drive these pins
yourself.

The RP2040 has **8 PWM slices**, each with an A and a B channel, and every
channel is shared by two GPIOs:

| Channel | GPIOs | Servos |
|---|---|---|
| PWM0 A | GP0, **GP16** | 1 and **17** |
| PWM0 B | GP1, **GP17** | 2 and **18** |
| PWM1 A … PWM7 B | GP2 … GP15 | 3 … 16 |

So **servo 17 shares a PWM channel with servo 1**, and **servo 18 with servo 2**.
Drive them with \`machine.PWM\` and the pair can't hold different angles — the
second one you set drags the first with it, because they're the same counter and
the same compare register.

That's the whole reason the board's own driver uses the RP2040's **PIO** instead:
\`ServoCluster\` builds the pulse train in a state machine, so all 18 really are
independent. If you're hand-rolling with \`machine.PWM\`, either stay under 16
servos avoiding the GP0/GP16 and GP1/GP17 pairs, or use \`ServoCluster\`.

\`\`\`python
from servo import ServoCluster, servo2040

# All 18, genuinely independent — PIO, not the PWM blocks.
cluster = ServoCluster(pio=0, sm=0, pins=list(range(servo2040.SERVO_1, servo2040.SERVO_18 + 1)))
cluster.enable_all()
cluster.to_percent(0, 100)   # servo 1 hard over
cluster.to_percent(16, 0)    # servo 17 the other way — no interaction
\`\`\`

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
`},{id:"sg90",name:"SG90 Micro Servo",description:"9g hobby micro servo, ~180° range, 50 Hz PWM control.",manufacturer:"TowerPro",family:"Motor",tags:["servo","pwm","motor"],package:"THT",pinSpacing:2.54,voltage:"4.8–6V",partNumber:"SG90",properties:{torque:"1.8 kg·cm @4.8V",speed:"0.1 s/60°",rotation:"180°",signal:"50 Hz PWM (1–2 ms)"},version:"0.1.7",pcbColor:"#2b6cb0",aspect:.38,dimensions:{width:12.2,height:32.2},shape:{kind:"rect",cornerRadius:0},headers:[{edge:"left",pins:[{name:"Signal",type:"io",group:"servo-1",capabilities:["pwm"],signals:{pwm:"A"},shape:"octagonal",rotation:90,x:.2781314659981702,y:.7982772136705493},{name:"VCC",type:"pwr",group:"servo-1",shape:"octagonal",rotation:90,x:.48115794771317666,y:.7982772136705493},{name:"GND",type:"gnd",group:"servo-1",shape:"octagonal",rotation:90,x:.6841844294281828,y:.7982772136705493}]}],mountingHoles:[{x:.5114881664485802,y:.07762830397661995,diameter:1.5},{x:.4571048990394937,y:.9242361629710477,diameter:1.5}],shapes:[{kind:"rect",x:.16,y:.15,z:0,fill:"#2b6cb0",stroke:"#1a4a80",strokeWidth:1,w:.68,h:.58,cornerRadius:3},{kind:"rect",x:.02,y:.1,z:1,fill:"#2b6cb0",stroke:"#1a4a80",strokeWidth:1,w:.96,h:.06,cornerRadius:2},{kind:"rect",x:.02,y:.72,z:2,fill:"#2b6cb0",stroke:"#1a4a80",strokeWidth:1,w:.96,h:.06,cornerRadius:2},{kind:"circle",x:.5,y:.31,z:3,fill:"#f2f2f2",stroke:"#b9bec6",strokeWidth:1,r:.15},{kind:"circle",x:.5,y:.31,z:4,fill:"#3a3f44",stroke:"#8a8f96",strokeWidth:1,r:.045},{kind:"rect",x:0,y:.412,z:5,fill:"#e8862b",stroke:"#8a8f96",strokeWidth:1,w:.16,h:.016},{kind:"rect",x:0,y:.492,z:6,fill:"#c0392b",stroke:"#8a8f96",strokeWidth:1,w:.16,h:.016},{kind:"rect",x:0,y:.572,z:7,fill:"#5a3a22",stroke:"#8a8f96",strokeWidth:1,w:.16,h:.016}],labels:[{text:"SG90",x:.5,y:.55,z:8,fontSize:10,color:"#ffffff"}],image:"image.png",mesh:"model.stl",meshUnits:"mm",mass_g:9,electrical:{model:"consumer",maxCurrentA:.65,currentDrawA:.1,stallCurrentA:.65,terminals:{positive:"VCC",negative:"GND"}},library:{module:"servo"},drivers:[{source:"servo.py",target:"lib/servo.py",label:"Servo driver"}],layerVisibility:{pcb:!1,image:!0,holes:!0,pins:!0,components:!1},groups:[{id:"servo-1",name:"Servo lead",housing:{kind:"dupont",x:.481158,y:.798277}}],helpText:`---
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
`},{id:"tiny2350",name:"Pimoroni Tiny 2350",description:"RP2350A in a tiny castellated board with an RGB LED + USB-C",manufacturer:"Pimoroni",family:"Microcontroller",package:"SMD",pinSpacing:2.54,voltage:"3.3V",partNumber:"PIM721",version:"0.1.12",mcu:"RP2350",pcbColor:"#15171a",aspect:.786,dimensions:{width:18,height:22.9},shape:{kind:"rect",cornerRadius:.08},headers:[{edge:"left",pins:[{name:"5V",type:"pwr",number:1,castellated:!0,shape:"castellated",rotation:180,x:.1440379948086209,y:.207},{name:"GND",type:"gnd",number:2,castellated:!0,shape:"castellated",rotation:180,x:.1440379948086209,y:.3027142857142857},{name:"3V3",type:"pwr",number:3,castellated:!0,shape:"castellated",rotation:180,x:.1440379948086209,y:.39842857142857147},{name:"A3",type:"io",number:4,gpio:29,capabilities:["digital","pwm","adc","spi","i2c","uart"],signals:{i2c:"SCL",spi:"CSn",uart:"RX",pwm:"B"},buses:{i2c:0,spi:1,uart:0,adc:3},castellated:!0,shape:"castellated",rotation:180,x:.1440379948086209,y:.4941428571428571},{name:"A2",type:"io",number:5,gpio:28,capabilities:["digital","pwm","adc","spi","i2c","uart"],signals:{i2c:"SDA",spi:"RX",uart:"TX",pwm:"A"},buses:{i2c:0,spi:1,uart:0,adc:2},castellated:!0,shape:"castellated",rotation:180,x:.1440379948086209,y:.5898571428571429},{name:"A1",type:"io",number:6,gpio:27,capabilities:["digital","pwm","adc","spi","i2c","uart"],signals:{i2c:"SCL",spi:"TX",uart:"RX",pwm:"B"},buses:{i2c:1,spi:1,uart:1,adc:1},castellated:!0,shape:"castellated",rotation:180,x:.1440379948086209,y:.6855714285714286},{name:"A0",type:"io",number:7,gpio:26,capabilities:["digital","pwm","adc","spi","i2c","uart"],signals:{i2c:"SDA",spi:"SCK",uart:"TX",pwm:"A"},buses:{i2c:1,spi:1,uart:1,adc:0},castellated:!0,shape:"castellated",rotation:180,x:.1440379948086209,y:.7812857142857143},{name:"GND",type:"gnd",number:8,castellated:!0,shape:"castellated",rotation:180,x:.1440379948086209,y:.877}]},{edge:"right",pins:[{name:"GP0",type:"io",number:9,gpio:0,capabilities:["digital","pwm","spi","i2c","uart"],signals:{i2c:"SDA",spi:"RX",uart:"TX",pwm:"A"},buses:{i2c:0,spi:0,uart:0},castellated:!0,shape:"castellated",rotation:0,x:.8715978315764783,y:.207},{name:"GP1",type:"io",number:10,gpio:1,capabilities:["digital","pwm","spi","i2c","uart"],signals:{i2c:"SCL",spi:"CSn",uart:"RX",pwm:"B"},buses:{i2c:0,spi:0,uart:0},castellated:!0,shape:"castellated",rotation:0,x:.8715978315764783,y:.3027142857142857},{name:"GP2",type:"io",number:11,gpio:2,capabilities:["digital","pwm","spi","i2c","uart"],signals:{i2c:"SDA",spi:"SCK",uart:"TX",pwm:"A"},buses:{i2c:1,spi:0,uart:0},castellated:!0,shape:"castellated",rotation:0,x:.8715978315764783,y:.39842857142857147},{name:"GP3",type:"io",number:12,gpio:3,capabilities:["digital","pwm","spi","i2c","uart"],signals:{i2c:"SCL",spi:"TX",uart:"RX",pwm:"B"},buses:{i2c:1,spi:0,uart:0},castellated:!0,shape:"castellated",rotation:0,x:.8715978315764783,y:.4941428571428571},{name:"GP4",type:"io",number:13,gpio:4,capabilities:["digital","pwm","spi","i2c","uart"],signals:{i2c:"SDA",spi:"RX",uart:"TX",pwm:"A"},buses:{i2c:0,spi:0,uart:1},castellated:!0,shape:"castellated",rotation:0,x:.8715978315764783,y:.5898571428571429},{name:"GP5",type:"io",number:14,gpio:5,capabilities:["digital","pwm","spi","i2c","uart"],signals:{i2c:"SCL",spi:"CSn",uart:"RX",pwm:"B"},buses:{i2c:0,spi:0,uart:1},castellated:!0,shape:"castellated",rotation:0,x:.8715978315764783,y:.6855714285714286},{name:"GP6",type:"io",number:15,gpio:6,capabilities:["digital","pwm","spi","i2c","uart"],signals:{i2c:"SDA",spi:"SCK",uart:"TX",pwm:"A"},buses:{i2c:1,spi:0,uart:1},castellated:!0,shape:"castellated",rotation:0,x:.8715978315764783,y:.7812857142857143},{name:"GP7",type:"io",number:16,gpio:7,capabilities:["digital","pwm","spi","i2c","uart"],signals:{i2c:"SCL",spi:"TX",uart:"TX",pwm:"B"},buses:{i2c:1,spi:0,uart:0},castellated:!0,shape:"castellated",rotation:0,x:.8715978315764783,y:.877},{name:"GND",type:"gnd",group:"conn-1",number:20,x:.411502461900898,y:.8552174736471737},{name:"3V3",type:"pwr",group:"conn-1",number:19,x:.47816912856756466,y:.8552174736471737},{name:"SDA",type:"io",group:"conn-1",number:18,gpio:12,capabilities:["pwm","spi","i2c","uart"],signals:{i2c:"SDA",spi:"RX",uart:"TX",pwm:"A"},buses:{i2c:0,spi:0,uart:0},x:.5448357952342313,y:.8552174736471737},{name:"SCL",type:"io",group:"conn-1",number:17,gpio:13,capabilities:["digital","pwm","spi","i2c","uart"],signals:{i2c:"SCL",spi:"CSn",uart:"RX",pwm:"B"},buses:{i2c:0,spi:1,uart:0},x:.611502461900898,y:.8552174736471737}]}],groups:[{id:"conn-1",name:"QWIIC",housing:{kind:"qwiic",x:.5109181435279596,y:.8554505740894991}}],image:"image.png",imageLayer:{x:0,y:.00021250107709099367,w:1,h:1},layerVisibility:{pcb:!1,image:!0,holes:!0,pins:!0,components:!0},helpText:`# Pimoroni Tiny 2350

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
`}];for(const t of ce){const e=cn[t.id];e&&(t.imageData=e)}const $={"bme280/bme280.py":`"""BME280 temperature / pressure / humidity driver for MicroPython.

A pure-MicroPython I²C driver for the Bosch BME280 combined humidity, pressure
and temperature sensor (as broken out on the Pimoroni BME280 Breakout). It reads
the factory trimming (calibration) parameters and applies the Bosch compensation
formulas from the BME280 datasheet — Bosch Sensortec, document BST-BME280-DS002 —
to return calibrated readings.

    from machine import I2C, Pin
    from bme280 import BME280

    # Example pins — check your board. On a XIAO the Grove I2C port is D4/D5,
    # which is Pin(6)/Pin(7) on an RP2040/RP2350 and Pin(5)/Pin(6) on an ESP32-S3.
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
`},mn=[{id:"snakie-standard",name:"Standard Parts",description:"The canonical Snakie parts — microcontrollers, sensors, ICs, power and more — kept up to date from github.com/kevinmcaleer/snakie-parts.",author:"Snakie",homepage:"https://github.com/kevinmcaleer/snakie-parts",version:"1.12.0",source:"registry",parts:ce}];function un(){const t=mn;return{listLibraries:async()=>t,readDriverSource:async(e,n,i)=>{const a=$[`${n}/${i}`];return a!=null?{ok:!0,contents:a}:{ok:!1,error:`No bundled driver "${i}" for ${n}.`}},listPartFiles:async(e,n)=>Object.keys($).filter(i=>i.startsWith(`${n}/`)).map(i=>i.slice(n.length+1)).sort(),checkUpdates:async()=>[],cachedUpdates:async()=>[],partsFolder:async()=>"",bundledStatus:async()=>[],resetToBundled:async()=>({ok:!1,error:"Parts are read-only on the web."}),importMesh:async()=>({ok:!1,error:"Linking a 3-D model needs the desktop app — parts are read-only on the web."})}}const hn=`# SPDX-License-Identifier: MIT
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

# Driver version. Bump this on ANY change to this file — the IDE compares it
# against the copy installed on the board and offers an update when they differ
# (#707; a legacy copy with no \`__version__\` reads as out-of-date). Keep the
# \`__version__ = "X.Y.Z"\` literal form so the IDE can parse it without importing.
__version__ = "1.0.0"

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
`,gn=`# SPDX-License-Identifier: MIT
"""Grove Ultrasonic Ranger driver (Snakie module #120).

A small, self-contained MIT-licensed driver for Seeed's **Grove Ultrasonic
Ranger**, another driver behind the dock **Range** instrument (#112).

Unlike the HC-SR04 (see \`hcsr04.py\`), this module has **one signal wire that is
both trigger and echo**. The pin is driven as an output to send the burst, then
immediately flipped to an input to time the return. That single-pin dance is the
whole difference, and it is why the HC-SR04 driver cannot be pointed at one:
\`HCSR04(trigger=p, echo=p)\` fights itself over the pin direction.

Usage on a board::

    from grove_ultrasonic import GroveUltrasonic
    import instruments as inst

    sensor = GroveUltrasonic(0)          # a single Grove digital pin
    while True:
        inst.distance(sensor.distance_mm())   # -> Range instrument

The conversion (\`echo_to_distance_mm\`) is pure, so it can be unit-tested under
CPython without hardware.
"""

# Driver version. Bump this on ANY change to this file — the IDE compares it
# against the copy installed on the board and offers an update when they differ
# (#707; a legacy copy with no \`__version__\` reads as out-of-date). Keep the
# \`__version__ = "X.Y.Z"\` literal form so the IDE can parse it without importing.
__version__ = "1.0.0"

# Speed of sound ~= 343 m/s = 0.343 mm/us. The echo covers the round trip (out
# and back), so distance = (pulse_us * 0.343) / 2.
_MM_PER_US = 0.343

#: ~30 ms bounds the wait at roughly 5 m, past this sensor's useful range.
DEFAULT_TIMEOUT_US = 30000


def echo_to_distance_mm(pulse_us):
    """Convert a measured echo pulse width (microseconds) to a distance in mm.

    A negative \`pulse_us\` (the timeout sentinel from \`machine.time_pulse_us\`)
    yields \`\`-1\`\` to signal "out of range / no echo" rather than a bogus value.
    Pure — no hardware needed, so the IDE can unit-test it.
    """
    if pulse_us is None or pulse_us < 0:
        return -1
    return (pulse_us * _MM_PER_US) / 2


class GroveUltrasonic:
    """Driver for a Grove Ultrasonic Ranger on a single digital pin.

    \`pin\` is a pin number (or a \`machine.Pin\` object — its direction is
    reconfigured on every reading, which is inherent to the one-wire design).
    """

    def __init__(self, pin, echo_timeout_us=DEFAULT_TIMEOUT_US):
        # Imported lazily so this module imports cleanly under CPython for tests.
        from machine import Pin

        self._timeout = echo_timeout_us
        # Keep the pin NUMBER: the direction is re-set per reading, so we
        # re-make the Pin each time rather than hold one fixed mode.
        self._pin = pin.id() if hasattr(pin, "id") else pin

    def _pulse_us(self):
        from machine import Pin, time_pulse_us
        import time

        # Trigger: a clean low, then a 10 us high burst, on the pin as OUTPUT.
        trig = Pin(self._pin, Pin.OUT)
        trig.value(0)
        time.sleep_us(2)
        trig.value(1)
        time.sleep_us(10)
        trig.value(0)
        # Now hand the SAME pin over to the echo measurement as an input.
        echo = Pin(self._pin, Pin.IN)
        try:
            return time_pulse_us(echo, 1, self._timeout)
        except OSError:
            return -1

    def distance_mm(self):
        """Measure and return the distance in millimetres (\`\`-1\`\` if no echo)."""
        return echo_to_distance_mm(self._pulse_us())

    def distance_cm(self):
        """Measure and return the distance in centimetres (\`\`-1\`\` if no echo)."""
        mm = self.distance_mm()
        return -1 if mm < 0 else mm / 10
`,yn=`# SPDX-License-Identifier: MIT
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

# Driver version. Bump this on ANY change to this file — the IDE compares it
# against the copy installed on the board and offers an update when they differ
# (#707; a legacy copy with no \`__version__\` reads as out-of-date). Keep the
# \`__version__ = "X.Y.Z"\` literal form so the IDE can parse it without importing.
__version__ = "1.0.0"

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
`,fn=`# SPDX-License-Identifier: MIT
"""LSM6DS3 6-axis IMU driver (Snakie module #120).

A small, self-contained MIT-licensed register driver for the ST LSM6DS3 (3-axis
accelerometer + 3-axis gyroscope over I²C) — the sensor on Seeed's **Grove 6-Axis
Accelerometer & Gyroscope**. This is a driver behind the dock **IMU** instrument
(#111), alongside the MPU-6050.

Why not the existing \`lsm6ds\` catalog entry: that one installs a **LSM6DSOX**
driver, a different part whose \`\`WHO_AM_I\`\` is \`\`0x6C\`\`. An LSM6DS3 answers
\`\`0x69\`\` and would be rejected by it.

Usage on a board::

    from machine import I2C, Pin
    from lsm6ds3 import LSM6DS3
    import instruments as inst

    # The Grove I2C port is D4/D5 on every XIAO, but the GPIO NUMBERS behind
    # those silk names differ by board:
    #     XIAO RP2040 / RP2350   sda=Pin(6),  scl=Pin(7)
    #     XIAO ESP32-S3          sda=Pin(5),  scl=Pin(6)
    imu = LSM6DS3(I2C(1, sda=Pin(5), scl=Pin(6)), addr=0x6B)   # XIAO ESP32-S3
    while True:
        ax, ay, az = imu.accel()          # g
        gx, gy, gz = imu.gyro()           # degrees/second
        inst.imu(*imu.euler_estimate())   # -> IMU instrument

Mounting
--------
The tilt maths assumes the module lies flat with **Z up**. A chassis rarely
allows that, and a module on its edge reports gravity on Y — which shows up as a
permanent ~90 deg roll and sends rotations to the wrong axis. Pass \`\`axes\`\` to
say how it is mounted:

    imu = LSM6DS3(i2c, addr=0x6B, axes=('x', 'z', '-y'))   # module on its edge

\`axes_for_resting(imu.accel())\` works the map out for you from one reading of a
stationary board.

Addressing
----------
The chip's own default is \`\`0x6A\`\` (SA0 low). **Seeed's Grove module ships SA0
high, so it answers on 0x6B** — pass \`\`addr=0x6B\`\` for that board. \`b0_scan.py\`
style bus census is the reliable way to tell.

The register decode (\`raw_to_g\`, \`raw_to_dps\`) and the config-byte builders
(\`ctrl1_xl\`, \`ctrl2_g\`) are pure, so they can be unit-tested under CPython
without an I²C bus — which is where a wrong full-scale bit pattern would
otherwise hide, silently mis-scaling every reading.
"""

# Driver version. Bump this on ANY change to this file — the IDE compares it
# against the copy installed on the board and offers an update when they differ
# (#707; a legacy copy with no \`__version__\` reads as out-of-date). Keep the
# \`__version__ = "X.Y.Z"\` literal form so the IDE can parse it without importing.
__version__ = "1.0.0"

import math

# --- Register map (the subset needed for accel + gyro) -----------------------
_WHO_AM_I = 0x0F
_CTRL1_XL = 0x10  # accelerometer: ODR | full-scale | anti-alias bandwidth
_CTRL2_G = 0x11  # gyroscope: ODR | full-scale
_CTRL3_C = 0x12  # BDU / IF_INC / SW_RESET
_OUT_TEMP_L = 0x20
_OUTX_L_G = 0x22  # gyro block, 6 bytes
_OUTX_L_XL = 0x28  # accel block, 6 bytes

#: Both addresses the part can take: SA0 low, SA0 high. Seeed's Grove 6-Axis
#: ships SA0 HIGH, so it answers on 0x6B rather than the chip's 0x6A default.
ADDRESSES = (0x6A, 0x6B)

_DEFAULT_ADDR = 0x6A  # SA0 low. Seeed's Grove module is 0x6B (SA0 high).

# \`WHO_AM_I\` answers we accept: the LSM6DS3 proper, and the LSM6DS3TR-C variant
# that is register-compatible for everything this driver touches.
WHO_AM_I_VALUES = (0x69, 0x6A)

# CTRL3_C: BDU (don't tear a sample across a read) + IF_INC (auto-increment the
# register pointer, so a 6-byte block read works).
_CTRL3_BDU = 0x40
_CTRL3_IF_INC = 0x04
_CTRL3_SW_RESET = 0x01

# --- Full-scale encodings ----------------------------------------------------
# NOTE the accelerometer's ordering: ±16 g sits at 0b01, NOT at the end. Getting
# this "obviously" sequential would silently mis-scale 4/8/16 g. Verified against
# the LSM6DS3 register map.
_FS_XL = {2: 0x00, 16: 0x04, 4: 0x08, 8: 0x0C}
_FS_G = {245: 0x00, 500: 0x04, 1000: 0x08, 2000: 0x0C}
_FS_125_BIT = 0x02  # CTRL2_G: the 125 dps range is its own enable bit

# Output data rates → the ODR nibble shared by CTRL1_XL and CTRL2_G.
_ODR = {
    0: 0x00,  # power-down
    13: 0x10,
    26: 0x20,
    52: 0x30,
    104: 0x40,
    208: 0x50,
    416: 0x60,
    833: 0x70,
    1660: 0x80,
}

# Sensitivities, in mg and mdps per LSB (datasheet; they scale with full scale).
_ACCEL_MG_PER_LSB = {2: 0.061, 4: 0.122, 8: 0.244, 16: 0.488}
_GYRO_MDPS_PER_LSB = {125: 4.375, 245: 8.75, 500: 17.5, 1000: 35.0, 2000: 70.0}


def _twos16(lo, hi):
    """Combine two bytes (LITTLE-endian, as the LSM6DS3 emits them) into a
    signed 16-bit int. Pure.

    Note the byte order differs from the MPU-6050, which is big-endian — reading
    this device with that decode gives plausible-looking nonsense.
    """
    val = (hi << 8) | lo
    return val - 65536 if val >= 32768 else val


def raw_to_g(lo, hi, g_range=2):
    """Decode an accelerometer axis (two raw bytes, low first) to g. Pure."""
    return _twos16(lo, hi) * _ACCEL_MG_PER_LSB[g_range] / 1000.0


def raw_to_dps(lo, hi, dps_range=245):
    """Decode a gyroscope axis (two raw bytes, low first) to degrees/second. Pure."""
    return _twos16(lo, hi) * _GYRO_MDPS_PER_LSB[dps_range] / 1000.0


def ctrl1_xl(odr_hz=104, g_range=2):
    """Build the CTRL1_XL byte for an accelerometer rate + full scale. Pure."""
    if odr_hz not in _ODR:
        raise ValueError("unsupported accel ODR: %r" % (odr_hz,))
    if g_range not in _FS_XL:
        raise ValueError("unsupported accel range: %r g" % (g_range,))
    return _ODR[odr_hz] | _FS_XL[g_range]


def ctrl2_g(odr_hz=104, dps_range=245):
    """Build the CTRL2_G byte for a gyroscope rate + full scale. Pure.

    \`\`125\`\` dps is not part of the FS_G field — it has its own enable bit, and
    the FS_G bits must read 0 alongside it.
    """
    if odr_hz not in _ODR:
        raise ValueError("unsupported gyro ODR: %r" % (odr_hz,))
    if dps_range == 125:
        return _ODR[odr_hz] | _FS_125_BIT
    if dps_range not in _FS_G:
        raise ValueError("unsupported gyro range: %r dps" % (dps_range,))
    return _ODR[odr_hz] | _FS_G[dps_range]


# --- Axis mapping (mounting orientation) -------------------------------------
# A sensor is almost never mounted the way a driver assumes. The tilt maths here
# takes Z as "up", but a chassis usually dictates the orientation, and a module
# stood on its edge reports gravity on Y — which reads as a permanent ~90 deg roll
# and sends every rotation to the wrong axis of the display.
#
# Rather than make every sketch re-derive it, the driver remaps ONCE at the source
# so \`accel\`, \`gyro\` and \`euler_estimate\` are all in the board's frame.

_AXIS_NAMES = ("x", "y", "z")


def parse_axes(spec):
    """Parse an axis map into \`\`[(source_index, sign), ...]\`\` for output X, Y, Z.

    \`spec\` names which SENSOR axis supplies each output axis, optionally negated:
    \`\`('x', 'z', '-y')\`\` means output Z is the negated sensor Y. Accepts a string
    (\`\`"x z -y"\`\` or \`\`"x,z,-y"\`\`) or any 3-sequence. \`\`None\`\` means no remapping.

    Raises \`ValueError\` on anything that isn't a clean right-handed map — see
    :func:\`axes_determinant\` for why a mirrored one is refused rather than used.
    """
    if spec is None:
        return None
    parts = spec.replace(",", " ").split() if isinstance(spec, str) else list(spec)
    if len(parts) != 3:
        raise ValueError("axes needs three entries, e.g. ('x','z','-y')")
    out = []
    for p in parts:
        p = str(p).strip().lower()
        sign = 1
        if p[:1] == "-":
            sign, p = -1, p[1:]
        elif p[:1] == "+":
            p = p[1:]
        if p not in _AXIS_NAMES:
            raise ValueError("axis %r is not one of x/y/z" % (p,))
        out.append((_AXIS_NAMES.index(p), sign))
    if len(set(i for i, _ in out)) != 3:
        raise ValueError("axes must use x, y and z exactly once (got %r)" % (spec,))
    if axes_determinant(out) != 1:
        raise ValueError(
            "axes %r is mirrored (left-handed) — negate one entry. A mirrored map "
            "reads plausibly at rest and then turns every rotation the wrong way, "
            "which is far harder to spot than an error here." % (spec,)
        )
    return out


def axes_determinant(mapped):
    """Determinant of a parsed axis map: \`\`+1\`\` right-handed, \`\`-1\`\` mirrored. Pure.

    Worth checking explicitly. A left-handed map still puts gravity where you want
    it, so it looks correct on a stationary board — but it inverts the SENSE of
    rotation, so roll runs backwards and no amount of staring at a resting reading
    reveals it.
    """
    m = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    for row, (i, sign) in enumerate(mapped):
        m[row][i] = sign
    return (
        m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1])
        - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0])
        + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])
    )


def apply_axes(mapped, v):
    """Apply a parsed axis map to an \`\`(x, y, z)\`\` reading. Pure; \`None\` = identity."""
    if not mapped:
        return v
    return tuple(v[i] * sign for i, sign in mapped)


def axes_for_resting(reading):
    """Suggest an axis map from ONE accelerometer sample of a board sitting still.

    Hold the board the way it will be mounted, take a reading, and this returns the
    \`axes\` that puts gravity back on +Z where the tilt maths expects it — turning
    "work out your axis map" into one call.

    Only the vertical axis is determined by gravity: any rotation ABOUT vertical
    leaves the reading identical, which is the same reason yaw is unobservable
    without a magnetometer. So of the several valid answers this returns the one
    that disturbs X and Y least, and it is a starting point, not a survey.

    A wrong guess at that quarter-turn is what "roll and pitch are swapped" looks
    like — tilting the nose up reads as roll. Use :func:\`axes_from_two\` to settle
    it rather than trying the other three by hand.

    Pass a reading from :meth:\`LSM6DS3.raw_accel\` (or a driver with no \`axes\` set):
    an already-mapped reading yields a map relative to the one in force.
    """
    d, up_sign = _dominant(reading)
    rest = [i for i in range(3) if i != d]
    for sign in (1, -1):
        cand = [(rest[0], 1), (rest[1], sign), (d, up_sign)]
        if axes_determinant(cand) == 1:
            return tuple(
                ("-" if s < 0 else "") + _AXIS_NAMES[i] for i, s in cand
            )
    raise ValueError("could not build a right-handed map from %r" % (reading,))


#: Cross product of two signed unit basis vectors: \`\`(a, b) -> (index, sign)\`\`.
_CROSS = {
    (0, 1): (2, 1), (1, 2): (0, 1), (2, 0): (1, 1),
    (1, 0): (2, -1), (2, 1): (0, -1), (0, 2): (1, -1),
}


def axes_from_two(level, nose_down):
    """The full axis map from TWO resting readings — the complete calibration.

    Gravity gives you the vertical direction and nothing else. That fixes roll and
    pitch, but leaves the rotation ABOUT vertical free, which is precisely the
    ambiguity :func:\`axes_for_resting\` has to guess at: get it wrong by 90 deg and
    tilting the nose up still shows as roll. A second pose collapses it.

      1. \`level\`     — the board sitting as it is mounted, still.
      2. \`nose_down\` — the same board with its FORWARD direction pointing at the
         floor.

    In pose 2 gravity lies along the robot's forward axis, so it names that axis
    the way pose 1 names the vertical one. Between them the frame is fully
    determined, and the third axis follows from the right-hand rule rather than
    from another measurement.

    Returns an \`axes\` tuple for the constructor. Raises \`ValueError\` if the two
    poses aren't distinct enough to be telling us different things.

    Both readings must come from :meth:\`LSM6DS3.raw_accel\` (or a driver with no
    \`axes\` set) — an already-mapped reading derives a map relative to the one in
    force, which looks like it worked and is wrong by exactly the correction
    already applied.
    """
    iz, sz = _dominant(level)
    ix, sx = _dominant(nose_down)
    # Pose 2 has the nose pointing DOWN, so the axis reading +1g there is the
    # nose's opposite.
    sx = -sx
    if iz == ix:
        raise ValueError(
            "both readings put gravity on the same axis — pose 2 should have the "
            "board's FORWARD direction pointing at the floor, about 90 deg from pose 1"
        )
    iy, cross_sign = _CROSS[(iz, ix)]
    sy = sz * sx * cross_sign
    out = [(ix, sx), (iy, sy), (iz, sz)]
    return tuple(("-" if s < 0 else "") + _AXIS_NAMES[i] for i, s in out)


def _dominant(reading):
    """\`\`(index, sign)\`\` of the axis carrying gravity in a resting reading. Pure."""
    mags = (abs(reading[0]), abs(reading[1]), abs(reading[2]))
    d = mags.index(max(mags))
    return d, (-1 if reading[d] < 0 else 1)


def accel_to_euler(ax, ay, az):
    """Estimate (roll, pitch) in degrees from an accelerometer vector (g).

    Yaw is unobservable from gravity alone, so it is returned as \`\`0.0\`\`. Pure —
    feeds the dock IMU instrument's 3-D attitude view without a fusion step.
    """
    roll = math.degrees(math.atan2(ay, az)) if (ay or az) else 0.0
    pitch = math.degrees(math.atan2(-ax, math.sqrt(ay * ay + az * az)))
    return roll, pitch, 0.0


class LSM6DS3:
    """Driver for an LSM6DS3 6-axis IMU on an I²C bus.

    \`g_range\` is 2/4/8/16 (g) and \`dps_range\` is 125/245/500/1000/2000 — both
    also select the conversion factor, so a reading is always in real units.

    \`axes\` describes how the module is MOUNTED — see :func:\`parse_axes\`. Leave it
    out for a board lying flat with its component face up; set it once when the
    chassis dictates otherwise, and every reading arrives in the board's frame.
    """

    def __init__(
        self, i2c, addr=_DEFAULT_ADDR, odr_hz=104, g_range=2, dps_range=245, check=True, axes=None
    ):
        self._i2c = i2c
        self._addr = addr
        self._g_range = g_range
        self._dps_range = dps_range
        # Mounting orientation. Validated HERE, at construction, so a bad map is a
        # clear error at the line that set it rather than silently wrong readings
        # for the life of the program.
        self._axes = parse_axes(axes)
        # IDENTIFY before configuring. Blind-writing the three control registers
        # turns a wrong address, the wrong bus, or a half-seated Grove lead into a
        # bare \`OSError: [Errno 5] EIO\` from whichever write happened to go first,
        # which tells you nothing about which of those it was.
        #
        # Pass \`check=False\` to skip, e.g. for a register-compatible variant whose
        # WHO_AM_I isn't one we know.
        if check:
            try:
                who = i2c.readfrom_mem(addr, _WHO_AM_I, 1)[0]
            except OSError:
                # Before blaming the wiring, look at the OTHER address this part
                # can take. The chip's default is 0x6A (SA0 low) but Seeed's Grove
                # module ships SA0 HIGH, so \`LSM6DS3(i2c)\` on that board misses by
                # one address — a confusing failure with an obvious cause.
                other = ADDRESSES[1] if addr == ADDRESSES[0] else ADDRESSES[0]
                sibling = None
                try:
                    sibling = i2c.readfrom_mem(other, _WHO_AM_I, 1)[0]
                except OSError:
                    pass
                if sibling in WHO_AM_I_VALUES:
                    raise OSError(
                        "no LSM6DS3 at 0x%02x, but one answered at 0x%02x — "
                        "pass addr=0x%02x. (Seeed's Grove 6-Axis ships SA0 high.)"
                        % (addr, other, other)
                    )
                if sibling is not None:
                    # Readable but wrong: say WHAT it read. Reporting only "nothing
                    # at 0x6a" hides the far more useful fact that the other address
                    # replied with rubbish, which is a different fault entirely.
                    raise OSError(
                        "no LSM6DS3 at 0x%02x. A device at 0x%02x replied but its "
                        "WHO_AM_I is 0x%02x, not %s — 0xff means it is ACKing without "
                        "driving data, which is a power or connection fault on that "
                        "module rather than the wrong address."
                        % (addr, other, sibling, " or ".join("0x%02x" % v for v in WHO_AM_I_VALUES))
                    )
                raise OSError(
                    "no reply from an I2C device at 0x%02x. Check the bus pins and "
                    "reseat the lead, then run i2c.scan() to see what is really there. "
                    "A device that shows up in scan() but fails here is usually a "
                    "half-seated Grove connector." % addr
                )
            if who not in WHO_AM_I_VALUES:
                raise RuntimeError(
                    "the device at 0x%02x is not an LSM6DS3: WHO_AM_I read 0x%02x, "
                    "expected %s. (0xff usually means a marginal lead rather than the "
                    "wrong chip.)"
                    % (addr, who, " or ".join("0x%02x" % v for v in WHO_AM_I_VALUES))
                )
        # Block-data-update + register auto-increment, so a 6-byte burst read is
        # coherent and actually advances.
        self._i2c.writeto_mem(addr, _CTRL3_C, bytes([_CTRL3_BDU | _CTRL3_IF_INC]))
        self._i2c.writeto_mem(addr, _CTRL1_XL, bytes([ctrl1_xl(odr_hz, g_range)]))
        self._i2c.writeto_mem(addr, _CTRL2_G, bytes([ctrl2_g(odr_hz, dps_range)]))

    def whoami(self):
        """Read \`\`WHO_AM_I\`\`. An LSM6DS3 answers \`\`0x69\`\`."""
        return self._i2c.readfrom_mem(self._addr, _WHO_AM_I, 1)[0]

    def present(self):
        """True when the device on this address identifies as an LSM6DS3."""
        try:
            return self.whoami() in WHO_AM_I_VALUES
        except OSError:
            return False

    def accel(self):
        """Return the (x, y, z) acceleration in g, in the BOARD's frame."""
        return apply_axes(self._axes, self.raw_accel())

    def raw_accel(self):
        """Acceleration in the SENSOR's own frame, ignoring any \`axes\` map.

        What the calibration helpers need. Feeding them :meth:\`accel\` from a driver
        that ALREADY has a map would derive a map relative to that one — it would
        look like it worked and be wrong by exactly the correction already applied.
        """
        b = self._i2c.readfrom_mem(self._addr, _OUTX_L_XL, 6)
        r = self._g_range
        return (
            raw_to_g(b[0], b[1], r),
            raw_to_g(b[2], b[3], r),
            raw_to_g(b[4], b[5], r),
        )

    def gyro(self):
        """Return the (x, y, z) angular rate in degrees/second, in the BOARD's frame.

        Remapped with the same \`axes\` as :meth:\`accel\` — they MUST agree, or a
        fusion step would be blending two different coordinate frames.
        """
        b = self._i2c.readfrom_mem(self._addr, _OUTX_L_G, 6)
        r = self._dps_range
        return apply_axes(
            self._axes,
            (
                raw_to_dps(b[0], b[1], r),
                raw_to_dps(b[2], b[3], r),
                raw_to_dps(b[4], b[5], r),
            ),
        )

    def temperature(self):
        """Return the die temperature in °C (25 °C at zero, 256 LSB/°C)."""
        b = self._i2c.readfrom_mem(self._addr, _OUT_TEMP_L, 2)
        return 25.0 + _twos16(b[0], b[1]) / 256.0

    def euler_estimate(self):
        """Return an accel-only (roll, pitch, yaw=0) attitude estimate in degrees."""
        return accel_to_euler(*self.accel())

    def reset(self):
        """Software-reset the device (it clears the bit when done)."""
        self._i2c.writeto_mem(self._addr, _CTRL3_C, bytes([_CTRL3_SW_RESET]))
`,bn=`# SPDX-License-Identifier: MIT
"""MPU-6050 6-axis IMU driver (Snakie module #120).

A small, self-contained MIT-licensed register driver for the InvenSense MPU-6050
(3-axis accelerometer + 3-axis gyroscope over I²C). This is the driver behind the
dock **IMU** instrument (#111).

Usage on a board::

    from machine import I2C, Pin
    from mpu6050 import MPU6050
    import instruments as inst

    # Example pins — check your board. On a XIAO the Grove I2C port is D4/D5,
    # which is Pin(6)/Pin(7) on an RP2040/RP2350 and Pin(5)/Pin(6) on an ESP32-S3.
    imu = MPU6050(I2C(0, sda=Pin(0), scl=Pin(1)))
    while True:
        ax, ay, az = imu.accel()
        inst.imu(*imu.euler_estimate())   # -> IMU instrument

The raw register decode (\`raw_to_g\`, \`raw_to_dps\`) and the accel→euler estimate
(\`accel_to_euler\`) are split out so they can be unit-tested under CPython without
an I²C bus.
"""

# Driver version. Bump this on ANY change to this file — the IDE compares it
# against the copy installed on the board and offers an update when they differ
# (#707; a legacy copy with no \`__version__\` reads as out-of-date). Keep the
# \`__version__ = "X.Y.Z"\` literal form so the IDE can parse it without importing.
__version__ = "1.0.0"

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
`,wn=`# SPDX-License-Identifier: MIT
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

# Driver version. Bump this on ANY change to this file — the IDE compares it
# against the copy installed on the board and offers an update when they differ
# (#707; a legacy copy with no \`__version__\` reads as out-of-date). Keep the
# \`__version__ = "X.Y.Z"\` literal form so the IDE can parse it without importing.
__version__ = "1.0.0"


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
`,_n=`# SPDX-License-Identifier: MIT
"""PCF8563 real-time clock driver (Snakie module #120).

A small, self-contained MIT-licensed register driver for the NXP PCF8563 — the RTC
on Seeed's **XIAO Expansion Base** (and most cheap I²C clock breakouts), at address
\`\`0x51\`\`.

Usage on a board::

    from machine import I2C, Pin
    from pcf8563 import PCF8563

    # D4/D5 on a XIAO — the GPIOs behind those names are board-specific:
    #     RP2040 / RP2350   sda=Pin(6), scl=Pin(7)
    #     ESP32-S3          sda=Pin(5), scl=Pin(6)
    rtc = PCF8563(I2C(1, sda=Pin(5), scl=Pin(6)))   # XIAO ESP32-S3
    if rtc.unset():
        rtc.datetime((2026, 7, 30, 9, 30, 0, 3))   # Y, M, D, h, m, s, weekday
    print(rtc.datetime())

Every field is **BCD** with status bits sharing the same byte, so each one has to
be masked before decoding — the mask is not cosmetic. In particular the seconds
register's top bit is the **VL (voltage-low) flag**, not part of the seconds: read
it unmasked and you get times like ":83". :meth:\`unset\` exposes that flag, because
a PCF8563 whose backup cell has been flat is not slow — it is *lying*, and the only
honest answer is to re-set it.

The BCD conversions are pure, so they can be unit-tested under CPython without an
I²C bus.
"""

# Driver version. Bump this on ANY change to this file — the IDE compares it
# against the copy installed on the board and offers an update when they differ
# (#707; a legacy copy with no \`__version__\` reads as out-of-date). Keep the
# \`__version__ = "X.Y.Z"\` literal form so the IDE can parse it without importing.
__version__ = "1.0.0"

_DEFAULT_ADDR = 0x51

# Register map. The time block is 7 consecutive registers from 0x02.
_CTRL1 = 0x00
_CTRL2 = 0x01
_VL_SECONDS = 0x02

#: Per-register masks for the time block, in read order. Each register carries
#: status/padding bits alongside its BCD value and MUST be masked:
#:   0x02 seconds  bit 7  = VL (voltage-low) flag
#:   0x04 hours    bits 5-0 only
#:   0x05 days     bits 5-0 only
#:   0x06 weekday  bits 2-0 only
#:   0x07 months   bit 7  = century
_TIME_MASKS = (0x7F, 0x7F, 0x3F, 0x3F, 0x07, 0x1F, 0xFF)

#: The century the year register counts from (it holds 00..99).
CENTURY = 2000


def from_bcd(value):
    """Decode a packed BCD byte to an int (\`\`0x59\`\` → \`\`59\`\`). Pure."""
    return (value >> 4) * 10 + (value & 0x0F)


def to_bcd(value):
    """Encode an int 0..99 as a packed BCD byte (\`\`59\`\` → \`\`0x59\`\`). Pure."""
    v = int(value)
    if not 0 <= v <= 99:
        raise ValueError("BCD range is 0..99, got %r" % (value,))
    return ((v // 10) << 4) | (v % 10)


def decode_time(raw):
    """Decode the 7-byte time block to \`\`(year, month, day, hour, minute, second,
    weekday, unset)\`\`. Pure.

    \`raw\` is registers \`\`0x02\`\`..\`\`0x08\`\` as read. \`\`unset\`\` is the VL flag: the
    clock lost power and the time is not trustworthy.
    """
    if raw is None or len(raw) < 7:
        raise ValueError("need 7 bytes of PCF8563 time registers")
    masked = [raw[i] & _TIME_MASKS[i] for i in range(7)]
    return (
        CENTURY + from_bcd(masked[6]),
        from_bcd(masked[5]),
        from_bcd(masked[3]),
        from_bcd(masked[2]),
        from_bcd(masked[1]),
        from_bcd(masked[0]),
        masked[4],
        bool(raw[0] & 0x80),
    )


def encode_time(year, month, day, hour, minute, second, weekday=0):
    """Encode a time into the 7 bytes written to \`\`0x02\`\`..\`\`0x08\`\`. Pure.

    Writing seconds also clears the VL flag (its bit is left at 0), which is what
    marks the clock as trustworthy again.
    """
    return bytes(
        [
            to_bcd(second),  # bit 7 = 0 clears VL
            to_bcd(minute),
            to_bcd(hour),
            to_bcd(day),
            int(weekday) & 0x07,
            to_bcd(month),  # bit 7 (century) left clear
            to_bcd(int(year) - CENTURY),
        ]
    )


class PCF8563:
    """Driver for a PCF8563 real-time clock on an I²C bus."""

    def __init__(self, i2c, addr=_DEFAULT_ADDR):
        self._i2c = i2c
        self._addr = addr

    def _read_block(self):
        return self._i2c.readfrom_mem(self._addr, _VL_SECONDS, 7)

    def datetime(self, value=None):
        """Get or set the time.

        With no argument, returns \`\`(year, month, day, hour, minute, second,
        weekday)\`\`. Pass that same tuple to SET the clock (\`\`weekday\`\` optional).
        """
        if value is None:
            y, mo, d, h, mi, s, wd, _unset = decode_time(self._read_block())
            return (y, mo, d, h, mi, s, wd)
        y, mo, d, h, mi, s = value[:6]
        wd = value[6] if len(value) > 6 else 0
        self._i2c.writeto_mem(self._addr, _VL_SECONDS, encode_time(y, mo, d, h, mi, s, wd))
        return self.datetime()

    def unset(self):
        """True when the VL flag is set — the clock lost power, so the time is junk.

        Check this before trusting a reading. A flat backup cell does not make the
        clock slow, it makes it wrong.
        """
        return bool(self._read_block()[0] & 0x80)

    def start(self):
        """Start the clock (clear the STOP bit in Control_status_1)."""
        self._i2c.writeto_mem(self._addr, _CTRL1, b"\\x00")

    def stop(self):
        """Stop the clock (set the STOP bit) — the registers hold their values."""
        self._i2c.writeto_mem(self._addr, _CTRL1, b"\\x20")

    def clear_alarms(self):
        """Clear the alarm/timer interrupt flags in Control_status_2."""
        self._i2c.writeto_mem(self._addr, _CTRL2, b"\\x00")

    def isoformat(self):
        """The current time as \`\`YYYY-MM-DD HH:MM:SS\`\` — handy for a log line."""
        y, mo, d, h, mi, s = self.datetime()[:6]
        return "%04d-%02d-%02d %02d:%02d:%02d" % (y, mo, d, h, mi, s)
`,xn=`# SPDX-License-Identifier: MIT
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

# Driver version. Bump this on ANY change to this file — the IDE compares it
# against the copy installed on the board and offers an update when they differ
# (#707; a legacy copy with no \`__version__\` reads as out-of-date). Keep the
# \`__version__ = "X.Y.Z"\` literal form so the IDE can parse it without importing.
__version__ = "1.0.0"

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
`,Sn=`# SPDX-License-Identifier: MIT
"""Grove I²C Motor Driver (TB6612FNG) driver (Snakie module #120).

A small, self-contained MIT-licensed driver for Seeed's **Grove - I²C Motor
Driver (TB6612FNG)** — two DC motor channels commanded over I²C.

Careful, there are two different Grove motor drivers:

* This one (SKU 105020001) has an on-board MCU, ships on **0x14**, and takes
  single-byte *commands* (\`\`[cmd, channel, speed]\`\`).
* The older **Grove I²C Motor Driver V1.x** is a different board on **0x0F**
  with a different protocol (\`\`0x82\`\` speed-set, \`\`0xAA\`\` direction-set). This
  driver will not drive it.

Usage on a board::

    from machine import I2C, Pin
    from tb6612 import GroveMotorDriver, CH_A, CH_B

    # D4/D5 on a XIAO — the GPIOs behind those names are board-specific:
    #     RP2040 / RP2350   sda=Pin(6), scl=Pin(7)
    #     ESP32-S3          sda=Pin(5), scl=Pin(6)
    m = GroveMotorDriver(I2C(1, sda=Pin(5), scl=Pin(6)))   # XIAO ESP32-S3
    m.wake()                # leave standby before anything will turn
    m.run(CH_A, 200)        # forward, 0..255
    m.run(CH_B, -200)       # reverse
    m.brake(CH_A)           # short the windings (active stop)
    m.stop(CH_B)            # coast

Both motors off is \`stop\`/\`brake\` per channel; \`standby()\` disables the H-bridge
outputs entirely and is the safe state to leave the robot in.

The frame builders (\`run_frame\`, \`brake_frame\`, …) are pure and return the exact
bytes put on the wire, so the command encoding is unit-testable under CPython
without an I²C bus.
"""

# Driver version. Bump this on ANY change to this file — the IDE compares it
# against the copy installed on the board and offers an update when they differ
# (#707; a legacy copy with no \`__version__\` reads as out-of-date). Keep the
# \`__version__ = "X.Y.Z"\` literal form so the IDE can parse it without importing.
__version__ = "1.0.0"

# --- Protocol ----------------------------------------------------------------
# Commands, verified against Seeed's Grove_Motor_Driver_TB6612FNG library.
# Every frame is [command, arg...] written to the device address.
_CMD_BRAKE = 0x00
_CMD_STOP = 0x01
_CMD_CW = 0x02
_CMD_CCW = 0x03
_CMD_STANDBY = 0x04
_CMD_NOT_STANDBY = 0x05
_CMD_SET_ADDR = 0x11

DEFAULT_ADDR = 0x14

#: Motor channel ids, as the board numbers them.
CH_A = 0
CH_B = 1

#: Max magnitude of a speed value (8-bit PWM).
MAX_SPEED = 255


def run_frame(channel, speed):
    """Bytes for "drive \`channel\` at \`speed\`". Pure.

    \`speed\` is -255..255; the sign picks the direction command (\`\`0x02\`\` CW /
    \`\`0x03\`\` CCW) and the magnitude is sent as the PWM value. Out-of-range
    speeds are clamped rather than rejected, matching the vendor library.
    """
    if speed > MAX_SPEED:
        speed = MAX_SPEED
    elif speed < -MAX_SPEED:
        speed = -MAX_SPEED
    cmd = _CMD_CW if speed >= 0 else _CMD_CCW
    return bytes([cmd, channel, abs(speed)])


def power_to_speed(power):
    """Map a signed power in [-1.0, 1.0] to a -255..255 speed. Pure.

    This is the seam with \`teleop.arcade_mix\`, which speaks in normalised wheel
    powers — so a gamepad can drive this board without either module knowing
    about the other's units.
    """
    if power > 1.0:
        power = 1.0
    elif power < -1.0:
        power = -1.0
    return int(round(power * MAX_SPEED))


def brake_frame(channel):
    """Bytes for "brake \`channel\`" — an active stop, windings shorted. Pure."""
    return bytes([_CMD_BRAKE, channel])


def stop_frame(channel):
    """Bytes for "stop \`channel\`" — outputs released, the motor coasts. Pure."""
    return bytes([_CMD_STOP, channel])


def standby_frame(on=True):
    """Bytes for entering (\`on\`) or leaving standby. Pure."""
    return bytes([_CMD_STANDBY if on else _CMD_NOT_STANDBY, 0x00])


def set_addr_frame(addr):
    """Bytes for permanently re-addressing the board. Pure.

    Valid addresses are \`\`0x01\`\`..\`\`0x7F\`\`; the change persists across power
    cycles, so the board will no longer answer on its old address.
    """
    if not 0x00 < addr < 0x80:
        raise ValueError("I2C address out of range: 0x%02x" % addr)
    return bytes([_CMD_SET_ADDR, addr])


class GroveMotorDriver:
    """Driver for a Grove I²C Motor Driver (TB6612FNG) on an I²C bus."""

    def __init__(self, i2c, addr=DEFAULT_ADDR):
        self._i2c = i2c
        self._addr = addr

    @property
    def addr(self):
        """The I²C address this instance is talking to."""
        return self._addr

    def _send(self, frame):
        from time import sleep_ms

        self._i2c.writeto(self._addr, frame)
        # The board's firmware needs a moment between commands; the vendor
        # library delays 1 ms after every one.
        sleep_ms(1)

    def run(self, channel, speed):
        """Drive \`channel\` (\`CH_A\`/\`CH_B\`) at \`speed\`, -255..255."""
        self._send(run_frame(channel, speed))

    def brake(self, channel):
        """Actively brake \`channel\` (shorts the windings)."""
        self._send(brake_frame(channel))

    def stop(self, channel):
        """Release \`channel\`'s outputs so the motor coasts."""
        self._send(stop_frame(channel))

    def stop_all(self):
        """Coast both motors — the usual "end of move" state."""
        self.stop(CH_A)
        self.stop(CH_B)

    def drive(self, left_power, right_power):
        """Apply signed powers in [-1, 1] to channel A (left) and B (right).

        Pairs directly with \`teleop.arcade_mix\`::

            drive.drive(*arcade_mix(lx, ly))
        """
        self.run(CH_A, power_to_speed(left_power))
        self.run(CH_B, power_to_speed(right_power))

    def standby(self):
        """Disable both H-bridges. The safe state to leave the robot in."""
        self._send(standby_frame(True))

    def wake(self):
        """Leave standby. Nothing will turn until this has been called."""
        self._send(standby_frame(False))

    def set_address(self, addr):
        """PERMANENTLY re-address the board (persists across power cycles)."""
        from time import sleep_ms

        self._i2c.writeto(self._addr, set_addr_frame(addr))
        self._addr = addr
        sleep_ms(100)
`,vn=`# SPDX-License-Identifier: MIT
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

# Driver version. Bump this on ANY change to this file — the IDE compares it
# against the copy installed on the board and offers an update when they differ
# (#707; a legacy copy with no \`__version__\` reads as out-of-date). Keep the
# \`__version__ = "X.Y.Z"\` literal form so the IDE can parse it without importing.
__version__ = "1.0.0"


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
`,kn=`"""Snakie Instruments — the on-device robotics telemetry + control toolkit.

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
__version__ = "0.10.0"

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
    cross-block pair or an unknown pin yields \`\`None\`\` (the IDE warns and the driver
    raises a guided error). Pure + side-effect-free for unit tests.
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


def _pins_str(xs):
    """\`0/4/8\` — a compact pin list for the guided pin-pair error messages."""
    return "/".join(str(x) for x in xs)


def _bad_i2c_pair_msg(sda, scl):
    """A guided error for an SDA/SCL pair that isn't on one I²C block — names the
    valid pins of each bus so the user can pick a matching pair (issue: XIAO I²C1)."""
    return (
        "SDA GP%s / SCL GP%s aren't a valid I2C pair. On the RP2040/RP2350 each pin "
        "is fixed to one bus: I2C0 = SDA(%s)+SCL(%s); I2C1 = SDA(%s)+SCL(%s). Use two "
        "pins from the same bus (the XIAO's onboard screen is SDA GP6 + SCL GP7 on I2C1)."
        % (sda, scl, _pins_str(_I2C0_SDA), _pins_str(_I2C0_SCL),
           _pins_str(_I2C1_SDA), _pins_str(_I2C1_SCL))
    )


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
    driver raises a guided error). Pure + side-effect-free for unit tests.
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


def _bad_spi_pair_msg(sck, mosi):
    """A guided error for an SCK/MOSI pair that isn't on one SPI block."""
    return (
        "SCK GP%s / MOSI GP%s aren't a valid SPI pair. On the RP2040/RP2350 each pin "
        "is fixed to one bus: SPI0 = SCK(%s)+MOSI(%s); SPI1 = SCK(%s)+MOSI(%s). Use two "
        "pins from the same bus."
        % (sck, mosi, _pins_str(_SPI0_SCK), _pins_str(_SPI0_TX),
           _pins_str(_SPI1_SCK), _pins_str(_SPI1_TX))
    )


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
    from the pins (via :func:\`_i2c_block_for_pins\`; a cross-bus pair raises a guided
    error), builds \`\`I2C(block, sda=Pin(sda), scl=Pin(scl))\`\`, then a
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

        Derives the I²C block from the pins; a cross-bus pair raises a guided
        \`\`ValueError\`\` naming the valid pins (on hardware only — inert under CPython).
        Prefers an installed \`\`ssd1306\`\` driver, falling back to the bundled
        :class:\`_SSD1306\`. Guards every hardware import so it is inert under
        CPython (the panel is left unbuilt; \`\`text\`\` still echoes telemetry).
        """
        self._addr = "0x%02X" % int(addr) if isinstance(addr, int) else str(addr)
        block = _i2c_block_for_pins(sda, scl)
        try:
            from machine import Pin, I2C
        except ImportError:
            return  # no hardware (CPython) — inert; text() still echoes telemetry
        if block is None:
            # A cross-bus pair (e.g. SDA on I²C1, SCL on I²C0) — the hardware would
            # raise a cryptic "bad SDA pin". Fail with a guided message instead.
            raise ValueError(_bad_i2c_pair_msg(sda, scl))
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

        Derives the SPI block from \`\`sck\`\`/\`\`mosi\`\` (a cross-bus pair raises a guided
        error), builds \`\`SPI(block, sck=Pin(sck), mosi=Pin(mosi))\`\` at 30 MHz, then
        the bundled :class:\`_ST7789\` on \`\`dc\`\`/\`\`rst\`\`/\`\`cs\`\` at \`\`w\`\`×\`\`h\`\`. \`\`cs\`\`
        may be \`\`None\`\` / \`\`< 0\`\` (tied low, no CS pin). The echo label becomes
        \`\`st7789\`\` so the IDE's mirror tags the source. Guards every hardware import
        (inert under CPython — the panel stays unbuilt; \`\`text\`\` still echoes
        telemetry); a buffer too big for RAM falls back to telemetry-only.
        """
        self._addr = "st7789"  # single-token label for the SNK SCR echo
        block = _spi_block_for_pins(sck, mosi)
        cs_pin = None if cs is None or int(cs) < 0 else int(cs)
        try:
            from machine import Pin, SPI
        except ImportError:
            self._oled = None
            return  # no hardware (CPython) — inert; text() still echoes telemetry
        if block is None:
            self._oled = None  # cross-bus SCK/MOSI — guide instead of a cryptic error
            raise ValueError(_bad_spi_pair_msg(sck, mosi))
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
        # \`accel()\` — the naming BOTH bundled drivers use (\`lsm6ds3\`, \`mpu6050\`).
        # Without this neither could be \`watch\`ed as an IMU: they fell through
        # every branch of \`_classify\` and bound as nothing at all.
        or hasattr(obj, "accel")
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
    elif hasattr(obj, "read_accelerometer_gyro_data"):
        a = obj.read_accelerometer_gyro_data()
    else:
        # The bundled drivers' naming (\`lsm6ds3\`, \`mpu6050\`). Checked LAST so an
        # existing driver's behaviour is untouched.
        a = obj.accel()
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


class Motor:
    """Drive a two-channel DC motor driver from \`\`motor\`\` control commands.

    Deliberately knows NOTHING about a particular driver chip. Pass any object
    exposing \`\`drive(a, b)\`\` / \`\`brake(ch)\`\` / \`\`stop(ch)\`\` / \`\`standby()\`\` /
    \`\`wake()\`\` — the bundled \`\`tb6612\`\` module's \`\`GroveMotorDriver\`\` has exactly
    that shape, but a hand-rolled PWM H-bridge wrapper works just as well. With no
    driver every call is a no-op (still importable + testable under CPython), so
    the IDE panel can be exercised with nothing attached.

    Powers are signed and normalised, \`\`-1.0\`\`..\`\`1.0\`\` — the same unit
    \`\`teleop.arcade_mix\`\` emits, so a gamepad and this panel speak the same
    language and the scaling to PWM counts stays the driver's business.

    Each change emits \`\`SNK MOTOR <a> <b>\`\`, so the IDE panel shows what the board
    actually applied rather than only what it asked for.
    """

    def __init__(self, driver=None):
        self.driver = driver
        self.a = 0.0
        self.b = 0.0
        self.standby_on = False

    def _report(self):
        print("%s MOTOR %s %s" % (SENTINEL, self.a, self.b))

    def _clamp(self, v):
        v = float(v)
        return -1.0 if v < -1.0 else 1.0 if v > 1.0 else v

    def drive(self, a, b):
        """Apply signed powers to channel A and B."""
        self.a = self._clamp(a)
        self.b = self._clamp(b)
        if self.driver is not None:
            self.driver.drive(self.a, self.b)
        self._report()
        return self.a, self.b

    def channel(self, ch, power):
        """Set ONE channel (\`\`'a'\`\`/\`\`'b'\`\`), leaving the other where it is."""
        if ch == "a":
            return self.drive(power, self.b)
        if ch == "b":
            return self.drive(self.a, power)
        return None

    def stop(self):
        """Release both channels — the motors coast to a halt."""
        self.a = self.b = 0.0
        if self.driver is not None:
            self.driver.stop_all()
        self._report()

    def brake(self):
        """Actively brake both channels (windings shorted)."""
        self.a = self.b = 0.0
        if self.driver is not None:
            # \`CH_A\`/\`CH_B\` are 0/1 in every driver we ship; pass the ints so this
            # stays independent of the driver module's constants.
            self.driver.brake(0)
            self.driver.brake(1)
        self._report()

    def standby(self, on=True):
        """Disable (\`\`on\`\`) or re-enable the driver's outputs.

        Entering standby zeroes the remembered powers too: the outputs really are
        off, and reporting a stale non-zero power would make the panel lie.
        """
        self.standby_on = bool(on)
        if on:
            self.a = self.b = 0.0
        if self.driver is not None:
            if on:
                self.driver.standby()
            else:
                self.driver.wake()
        self._report()


def motor_command(payload, motor=None):
    """Drive \`\`motor\`\` (a :class:\`Motor\`) from one \`\`motor\`\` control payload.

      * \`\`run <a> <b>\`\`   → \`\`motor.drive(a, b)\`\`
      * \`\`a <power>\`\`     → \`\`motor.channel('a', power)\`\`
      * \`\`b <power>\`\`     → \`\`motor.channel('b', power)\`\`
      * \`\`stop\`\`          → \`\`motor.stop()\`\` (coast)
      * \`\`brake\`\`         → \`\`motor.brake()\`\`
      * \`\`standby <0|1>\`\` → \`\`motor.standby(bool)\`\`

    Defaults to the shared :data:\`motor\` singleton. Never raises on a malformed
    payload; returns the verb handled (or \`\`None\`\`), so it is easy to unit-test.
    """
    mot = motor if motor is not None else globals().get("motor")
    if mot is None or not payload:
        return None
    payload = payload.strip()
    sp = payload.find(" ")
    if sp == -1:
        verb, args = payload, ""
    else:
        verb, args = payload[:sp], payload[sp + 1:].strip()
    try:
        if verb == "run":
            parts = args.split()
            mot.drive(float(parts[0]), float(parts[1]))
        elif verb in ("a", "b"):
            mot.channel(verb, float(args.split()[0]))
        elif verb == "stop":
            mot.stop()
        elif verb == "brake":
            mot.brake()
        elif verb == "standby":
            mot.standby(args.split()[0] not in ("0", "off", "false"))
        else:
            return None
    except (ValueError, IndexError, TypeError):
        return None
    return verb


#: The shared motor singleton \`motor_command\` drives by default. Defined here
#: rather than with the other singletons above because :class:\`Motor\` is declared
#: after them.
motor = Motor()


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
`,Pn='"""snakie — the friendly hardware layer for Snakie sketches.\n\nImport the things you *drive* from here, so your code reads\n``pin -> PWM -> Servo -> joint`` and never clashes with a vendor ``servo``\nmodule (Pimoroni\'s frozen ``servo``, etc.)::\n\n    from snakie import Servo, Buzzer, Led, Pin, PWM\n\n    base = Servo(PWM(Pin(0)), pin=0)   # a servo on GP0; pin= drives the 3-D model\n    base.angle(90)\n\nThese are re-exported from Snakie\'s on-device runtime (``instruments``), which\nkeeps the *measurement* tools (scope / meter / plotter). Same classes, friendlier\nname — ``snakie.Servo`` *is* ``instruments.Servo``. Uploaded to ``/lib/snakie.py``\nalongside ``instruments.py`` by the Board View\'s library installer.\n"""\n\n# Re-export ONLY the hardware/actuator classes + raw IO — the "connect pins to\n# things" layer. Scopes/meters/plotters stay in `instruments` (they\'re not things\n# you wire up, they\'re how you observe the ones you do).\nfrom instruments import Servo, Buzzer, Led, Pin, PWM  # noqa: F401 - re-exported API\n\n__all__ = ["Servo", "Buzzer", "Led", "Pin", "PWM"]\n',Cn=kn,Dn=Pn,An=Object.assign({"../../../../micropython/modules/buzzer.py":hn,"../../../../micropython/modules/grove_ultrasonic.py":gn,"../../../../micropython/modules/hcsr04.py":yn,"../../../../micropython/modules/lsm6ds3.py":fn,"../../../../micropython/modules/mpu6050.py":bn,"../../../../micropython/modules/neopixel_ws2812.py":wn,"../../../../micropython/modules/pcf8563.py":_n,"../../../../micropython/modules/rotary.py":xn,"../../../../micropython/modules/tb6612.py":Sn,"../../../../micropython/modules/teleop.py":vn}),se=Object.fromEntries(Object.entries(An).map(([t,e])=>[t.split("/").pop()??t,e])),Tn="https://projects.kevsrobots.com/api/feedback",In=2e4,Mn=4*1024*1024,En=16e3;function Ln(t){const e=/^data:image\/[\w.+-]+;base64,(.+)$/s.exec(t);if(!e)return null;try{const n=atob(e[1]),i=new Uint8Array(n.length);for(let a=0;a<n.length;a++)i[a]=n.charCodeAt(a);return i}catch{return null}}function Rn(t){const e="ea7d6e5153feb615af27c725678ab9159ff9d9674e61d0db9b9877083b93e996";return{diagnostics:async()=>({platform:"web",arch:"",osVersion:navigator.userAgent.slice(0,200),electron:"",snakieVersion:t}),feedback:{submitBugReport:async n=>{const i=(n?.title??"").trim(),a=(n?.description??"").trim();if(!i||!a)return{ok:!1,error:"Please add a title and a description."};const s=`_SNAKIE_ ${i}

${a}`.slice(0,En),r=new FormData;r.append("sentiment","issue"),r.append("message",s),r.append("page_url",window.location.origin||"https://app.snakie.org"),r.append("user_agent",`Snakie/${t} (web) ${navigator.userAgent}`.slice(0,320));const d=(n?.email??"").trim();if(d&&r.append("email",d.slice(0,320)),n?.screenshot){const o=Ln(n.screenshot);o&&o.byteLength>0&&o.byteLength<=Mn&&r.append("screenshot",new Blob([o],{type:"image/png"}),"screenshot.png")}const u={};u["X-Snakie-Key"]=e;try{const o=await fetch(Tn,{method:"POST",body:r,headers:u,signal:AbortSignal.timeout(In)});return o.ok?{ok:!0,status:o.status}:o.status===401||o.status===403?{ok:!1,status:o.status,error:"Couldn't send — the bug service isn't accepting reports from Snakie yet (not authorised). A maintainer needs to provision access."}:o.status===429?{ok:!1,status:429,error:"Too many reports right now — please try again in a minute."}:{ok:!1,status:o.status,error:`The bug service returned HTTP ${o.status}.`}}catch(o){return{ok:!1,error:`Couldn't reach the bug service: ${o instanceof Error?o.message:String(o)}`}}}}}}async function Nn(){const t=navigator.mediaDevices;if(!t?.getDisplayMedia)return[];let e=null;const n=document.createElement("video");try{e=await t.getDisplayMedia({video:!0,audio:!1,preferCurrentTab:!0,selfBrowserSurface:"include"}),n.srcObject=e,n.muted=!0,await n.play(),n.videoWidth||await new Promise((u,o)=>{n.onloadeddata=()=>u(),n.onerror=()=>o(new Error("no frame")),window.setTimeout(()=>o(new Error("capture timed out")),5e3)}),await new Promise(u=>{const o=n,m=window.setTimeout(u,1500);if(!o.requestVideoFrameCallback)return;let y=4;const h=()=>{--y<=0?(window.clearTimeout(m),u()):o.requestVideoFrameCallback?.(h)};o.requestVideoFrameCallback(h)});const i=Math.min(1,1600/Math.max(1,n.videoWidth)),a=Math.max(2,Math.round(n.videoWidth*i)),s=Math.max(2,Math.round(n.videoHeight*i)),r=document.createElement("canvas");r.width=a,r.height=s;const d=r.getContext("2d");return d?(d.drawImage(n,0,0,a,s),[{title:"Snakie (tab capture)",dataUrl:r.toDataURL("image/png")}]):[]}catch{return[]}finally{n.srcObject=null,e?.getTracks().forEach(i=>i.stop())}}const Gn="https://micropython.org/pi/v2",me="/lib";class x extends Error{kind;url;constructor(e,n,i){super(n),this.name="MipResolveError",this.kind=e,this.url=i}}const Bn=64,Vn=4;function ue(t){return/^(https?:\/\/|github:|gitlab:)/i.test(t.trim())}function On(t){const e=t.trim();if(!/^(github|gitlab):/i.test(e))return{spec:e};const n=e.lastIndexOf("@");if(n<=0)return{spec:e};const i=e.slice(n+1).trim();return i?{spec:e.slice(0,n),ref:i}:{spec:e.slice(0,n)}}function Y(t,e="HEAD"){const n=t.trim();if(/^https?:\/\//i.test(n))return n;const i=/^(github|gitlab):(.+)$/i.exec(n);if(!i)return null;const a=i[2].split("/").filter(o=>o!=="");if(a.length<2)return null;const[s,r,...d]=a,u=e||"HEAD";return i[1].toLowerCase()==="gitlab"?`https://gitlab.com/${s}/${r}/-/raw/${u}/${d.join("/")}`:`https://raw.githubusercontent.com/${s}/${r}/${u}/${d.join("/")}`}function zn(t,e){const n=e.trim().replace(/\\/g,"/");if(!n||n.startsWith("/"))throw new x("malformed",`package names an unusable path: ${e}`);const i=n.split("/").filter(s=>s!==""&&s!==".");if(i.length===0||i.some(s=>s===".."))throw new x("malformed",`package names an unusable path: ${e}`);return`${t.replace(/\/+$/,"")}/${i.join("/")}`}function Wn(t){const n=String(t??"").trim().replace(/\\/g,"/").split("/").filter(i=>i!==""&&i!==".");if(n.some(i=>i===".."))throw new x("malformed",`unusable install directory: ${t}`);return n.length===0?"/":`/${n.join("/")}`}function Un(t){const e=[],n=new Set;for(const i of t){const a=i.split("/").filter(r=>r!=="");let s="";for(const r of a.slice(0,-1))s=`${s}/${r}`,n.has(s)||(n.add(s),e.push(s))}return e}async function Q(t,e,n,i){const a=zn(t.target,n);if(t.seenPaths.has(a))return;if(t.files.length>=t.maxFiles)throw new x("too-big",`the package installs more than ${t.maxFiles} files`);if(/\.mpy$/i.test(i))throw new x("unsupported","the package ships pre-compiled .mpy bytecode, which Snakie can only install with mip on the board",i);const s=await t.fetchText(i);t.seenPaths.add(a),t.files.push({path:a,contents:s,url:i,package:e})}async function re(t,e,n,i,a){const s=Y(e,n||"HEAD");if(!s)throw new x("malformed",`not a resolvable package spec: ${e}`);if(t.seenPackages.has(s))return;t.seenPackages.add(s);const r=await t.fetchText(s);let d;try{d=JSON.parse(r)}catch{throw new x("malformed","the package index returned something that is not JSON",s)}if(!d||typeof d!="object")throw new x("malformed","the package description is not a JSON object",s);const u=s.slice(0,s.lastIndexOf("/"));for(const o of d.hashes??[]){if(!Array.isArray(o)||o.length<2)continue;const[m,y]=o;await Q(t,a,m,`${t.index}/file/${String(y).slice(0,2)}/${y}`)}for(const o of d.urls??[]){if(!Array.isArray(o)||o.length<2)continue;const[m,y]=o,h=ue(y)?y:`${u}/${y}`,c=Y(h,n||"HEAD");if(!c)throw new x("malformed",`package names an unfetchable url: ${y}`,s);await Q(t,a,m,c)}for(const o of d.deps??[]){const[m,y]=Array.isArray(o)?o:[o,void 0];m&&await he(t,String(m),y,i+1)}}async function he(t,e,n,i){if(i>t.maxDepth)throw new x("too-big",`its dependencies nest more than ${t.maxDepth} levels deep`);const{spec:a,ref:s}=On(e);if(!a)throw new x("malformed","empty package spec");const r=s??n;if(t.packages.push(a),ue(a)){if(/\.(py|mpy)$/i.test(a)){const o=Y(a,r||"HEAD");if(!o)throw new x("malformed",`not a resolvable spec: ${a}`);const m=a.split("/").pop()??"";await Q(t,a,m,o);return}const u=/\.json$/i.test(a)?a:`${a.replace(/\/+$/,"")}/package.json`;await re(t,u,r,i,a);return}const d=r||"latest";await re(t,`${t.index}/package/py/${a}/${d}.json`,r,i,a)}async function ge(t,e){const n={fetchText:e.fetchText,index:(e.index??Gn).replace(/\/+$/,""),target:Wn(e.target??me),maxFiles:e.maxFiles??Bn,maxDepth:e.maxDepth??Vn,files:[],packages:[],seenPackages:new Set,seenPaths:new Set};if(await he(n,t,e.version,0),n.files.length===0)throw new x("malformed","the package description lists no files");return{files:n.files,packages:n.packages,target:n.target}}function Fn(t=2e4){return async e=>{let n;try{n=await fetch(e,{signal:AbortSignal.timeout(t)})}catch(i){const a=i instanceof Error?i.message:String(i);throw new x("network",`couldn't reach ${e} (${a})`,e)}if(n.status===404)throw new x("not-found",`${e} does not exist (HTTP 404)`,e);if(!n.ok)throw new x("network",`${e} answered HTTP ${n.status}`,e);try{return await n.text()}catch(i){const a=i instanceof Error?i.message:String(i);throw new x("network",`the download of ${e} broke off (${a})`,e)}}}const Xn="Snakie downloads a package on your computer and copies the files to the board, because the board has no internet connection of its own";function Hn(t){switch(t){case"network":return"Check your internet connection (and any proxy or firewall) and try again.";case"not-found":return"That address does not exist, so the package has moved or been renamed upstream — please report it so the catalog can be corrected.";case"unsupported":return"Install it by copying the files into the library folder yourself with the Files panel.";case"too-big":return"Copy the files into the library folder yourself with the Files panel, or install a smaller package.";case"malformed":default:return"Snakie couldn't read the package description; copy the files into the library folder yourself with the Files panel."}}function ye(t){const{name:e,spec:n,kind:i,detail:a}=t;return(`Couldn't install ${e}: ${Xn} — but downloading ${n} failed: ${a}. `+Hn(i)).replace(/\s+/g," ")}function Kn(t){const{name:e,path:n,detail:i}=t,a=n?`writing ${n} to the board`:"writing to the board";return`Couldn't install ${e}: the files downloaded to your computer, but ${a} failed: ${i}.`.replace(/\s+/g," ")}function fe(t){const{name:e,spec:n,fileCount:i,target:a,dependencies:s=[]}=t,r=i===1?"1 file":`${i} files`,d=s.length>0?` with ${s.length===1?"its dependency":"its dependencies"} ${s.join(", ")}`:"";return`Downloaded ${e} (${n})${d} on your computer — ${r} into ${a}.`}const be=["https://projects.kevsrobots.com","https://raw.githubusercontent.com","https://micropython.org","https://pypi.org"];function jn(t){let e;try{e=new URL(t).origin}catch{return!1}return be.includes(e)}function qn(t){let e;try{e=new URL(t).host}catch{e=t}return`a web page may only download from ${be.map(i=>new URL(i).host).join(", ")}, and ${e} is not one of them (the browser blocks the rest) — install this one from the Snakie desktop app`}function we(t){const e=Fn(t);return async n=>{if(!jn(n))throw new x("unsupported",qn(n),n);return e(n)}}async function _e(t,e,n,i=()=>{}){if(e.length===0)return{ok:!1,log:`Couldn't install ${t}: nothing was resolved to write.`};let a="";try{for(const r of Un(e.map(d=>d.path)))await n.mkdir(r).catch(()=>{});let s=0;for(const r of e)a=r.path,i(`Writing ${++s}/${e.length} — ${r.path}…`),await n.writeFile(r.path,r.contents);return{ok:!0,log:`Wrote ${e.map(r=>r.path).join(", ")}`}}catch(s){return{ok:!1,log:Kn({name:t,path:a||void 0,detail:s instanceof Error?s.message:String(s)})}}}const oe="/lib";function $n(t){if(se[t])return se[t];for(const[e,n]of Object.entries($))if(e.endsWith(`/${t}`)||e===t)return n;return null}async function le(t){const e=de.find(i=>i.id===t);if(!e)throw new Error(`Unknown module: ${t}`);if(e.source.kind==="bundled"){const i=$n(e.source.file);if(i)return{id:t,importName:e.importName,files:[{path:`${oe}/${e.source.file}`,contents:i}],notes:[]};throw new Error(`${e.source.file} isn't bundled in the web build yet.`)}if(e.source.kind==="bundle")throw new Error(`Couldn't install ${e.name}: CircuitPython libraries come from the Adafruit CircuitPython Library Bundle, which is published as GitHub release downloads that a web page is not allowed to read. Install it from the Snakie desktop app, or copy the library into /lib yourself with the Files panel.`);const n=e.source.spec;try{const i=await ge(n,{fetchText:we(),target:oe});return{id:t,importName:e.importName,files:i.files.map(a=>({path:a.path,contents:a.contents})),spec:n,notes:[fe({name:e.name,spec:n,fileCount:i.files.length,target:i.target,dependencies:i.packages.slice(1)})]}}catch(i){throw new Error(ye({name:e.name,spec:n,kind:i instanceof x?i.kind:"network",detail:i instanceof Error?i.message:String(i)}))}}function Yn(){return{catalog:async()=>de,installPlan:t=>le(t),probeInstalled:async t=>{if(t.length===0)return[];const e=[];for(const n of t){const i=n.replace(/[^A-Za-z0-9_]/g,"");e.push(Le(i).replace(N,`${N} ${i}`))}try{const n=await window.api.device.exec(e.join(`
`)),i=new Set;for(const a of`${n.stdout??""}`.split(/\r?\n/)){const s=a.trim();s.startsWith(`${N} `)&&i.add(s.slice(N.length+1).trim())}return t.filter(a=>i.has(a.replace(/[^A-Za-z0-9_]/g,"")))}catch{return[]}},install:async(t,e)=>{const n=s=>e?.(s);n({id:t,state:"started"}),n({id:t,state:"running",message:`Resolving ${t}…`});let i;try{i=await le(t)}catch(s){const r=s instanceof Error?s.message:String(s);return n({id:t,state:"error",message:`Failed to install ${t}`}),{id:t,ok:!1,log:r,notes:[]}}for(const s of i.notes)n({id:t,state:"note",message:s});const a=await _e(t,i.files,window.api.device,s=>n({id:t,state:"running",message:s}));return n({id:t,state:a.ok?"done":"error",message:a.ok?`Installed ${t}`:`Failed to install ${t}`}),a.ok&&window.api.modules.notifyChanged(),{id:t,ok:a.ok,log:a.log,notes:i.notes}}}}const xe=[{name:"urequests",description:"Lightweight HTTP requests client (micropython-lib).",source:"curated"},{name:"umqtt.simple",description:"Minimal MQTT client for IoT messaging (micropython-lib).",source:"curated"},{name:"umqtt.robust",description:"MQTT client with automatic reconnection (micropython-lib).",source:"curated"},{name:"microdot",description:"Tiny async web framework for microcontrollers.",source:"curated"},{name:"neopixel",description:"Driver for WS2812 / NeoPixel addressable LEDs.",source:"curated"},{name:"ssd1306",description:"Driver for SSD1306 OLED displays (I2C/SPI).",source:"curated"},{name:"bme280",description:"Driver for Bosch BME280 temperature/humidity/pressure sensors.",source:"curated"},{name:"dht",description:"Driver for DHT11 / DHT22 temperature & humidity sensors.",source:"curated"},{name:"logging",description:"CPython-style logging facility (micropython-lib).",source:"curated"},{name:"aioble",description:"Async Bluetooth Low Energy helper library (micropython-lib).",source:"curated"},{name:"datetime",description:"Subset of CPython datetime for MicroPython (micropython-lib).",source:"curated"},{name:"base64",description:"Base16/64 encodings (micropython-lib).",source:"curated"}],Qn=6e3;async function Jn(t){const e=new AbortController,n=setTimeout(()=>e.abort(),Qn);try{const i=await fetch(`https://pypi.org/pypi/${encodeURIComponent(t)}/json`,{signal:e.signal,headers:{Accept:"application/json"}});if(!i.ok)return null;const s=(await i.json()).info;return s?.name?{name:s.name,description:s.summary??"",version:s.version,source:"pypi"}:null}catch{return null}finally{clearTimeout(n)}}function Zn(t){const n=t.trim().toLowerCase(),i=new Set;return n&&(i.add(n),n.startsWith("micropython-")||i.add(`micropython-${n}`)),[...i]}async function et(t){const e=t.trim().toLowerCase();if(!e)return[];const n=[],i=new Set;for(const s of xe)(s.name.toLowerCase().includes(e)||s.description.toLowerCase().includes(e))&&(n.push(s),i.add(s.name.toLowerCase()));const a=await Promise.all(Zn(t).map(s=>Jn(s)));for(const s of a)s&&!i.has(s.name.toLowerCase())&&(n.push(s),i.add(s.name.toLowerCase()));return n}function nt(t={}){const e=t.target?.trim();return e&&e.length>0?e:me}function tt(t={}){const e=[];return t.mpy&&e.push(".mpy conversion is not available in this build (no bundled mpy-cross). Packages are installed as source .py; many ports compile to bytecode on import."),t.overwrite===!1&&e.push("Installing replaces files of the same name; there is no no-overwrite mode, so existing files may still be replaced."),t.index&&t.index.trim()&&e.push(`Using custom package index: ${t.index.trim()}`),e}function it(){return{topPackages:async()=>xe,search:t=>et(t??""),install:async(t,e,n)=>{const i=o=>n?.(o),a=e??{},s=nt(a);i({name:t,state:"started"}),i({name:t,state:"running",message:`Downloading ${t}…`});let r;const d=tt(a);try{const o=await ge(t,{fetchText:we(),target:s,index:a.index?.trim()||void 0});r=o.files.map(m=>({path:m.path,contents:m.contents})),d.push(fe({name:t,spec:t,fileCount:o.files.length,target:o.target,dependencies:o.packages.slice(1)}))}catch(o){return i({name:t,state:"error",message:`Failed to install ${t}`}),{name:t,ok:!1,log:ye({name:t,spec:t,kind:o instanceof x?o.kind:"network",detail:o instanceof Error?o.message:String(o)}),notes:d}}for(const o of d)i({name:t,state:"note",message:o});const u=await _e(t,r,window.api.device,o=>i({name:t,state:"running",message:o}));return i({name:t,state:u.ok?"done":"error",message:u.ok?`Installed ${t}`:`Failed to install ${t}`}),u.ok&&window.api.modules.notifyChanged(),{name:t,ok:u.ok,log:u.log,notes:d}}}}const at="snakie.board.v1";function Se(){const t=new BroadcastChannel(at),e=new Map;return t.onmessage=n=>{const i=e.get(n.data?.t);if(i)for(const a of[...i])a(n.data)},{post:n=>t.postMessage(n),on:(n,i)=>{let a=e.get(n);return a||e.set(n,a=new Set),a.add(i),()=>a.delete(i)}}}function ve(t){const n=window.api?.robot;if(!n?.save)return;const i=new Set,a=n.save.bind(n);n.save=async(...s)=>{const r=await a(...s);t.post({t:"robot"});for(const d of i)try{d()}catch{}return r},n.onChanged=s=>{i.add(s);const r=t.on("robot",()=>s());return()=>{i.delete(s),r()}}}function st(){const t=window;if(!t.api)return;const e=Se();let n=null,i=null;const a=new Set,s=new Set,r=o=>{for(const m of[...o])m()};e.on("request",()=>{i&&e.post({t:"source",payload:i})}),e.on("opened",()=>r(a)),e.on("closed",()=>{n=null,r(s)});const d=t.api.board??{};d.open=async()=>{if(n&&!n.closed){n.focus(),r(a);return}if(n=window.open("board.html","snakie-board","popup=yes,width=980,height=720"),!n)throw r(s),new Error("The browser blocked the Board View popup.");r(a)},d.close=()=>{e.post({t:"close"}),n&&!n.closed?n.close():r(s),n=null},d.update=o=>{i=o,e.post({t:"source",payload:o})},d.requestSource=async()=>i,d.onOpened=o=>(a.add(o),()=>a.delete(o)),d.onClosed=o=>(s.add(o),()=>s.delete(o)),d.selectBoard=o=>e.post({t:"select",id:o}),d.onSelectBoard=o=>e.on("select",m=>o(m.id)),t.api.board=d;const u=t.api.instruments??{};u.onOpen=o=>e.on("instruments",m=>o(m.payload)),t.api.instruments=u,ve(e)}function rt(){const t=window;if(!t.api)return;const e=Se();e.on("close",()=>window.close()),window.addEventListener("pagehide",()=>e.post({t:"closed"}));const n=t.api.board??{};n.close=()=>window.close(),n.onSource=a=>e.on("source",s=>a(s.payload)),n.requestSource=async()=>(e.post({t:"request"}),null),n.selectBoard=a=>e.post({t:"select",id:a}),n.onSelectBoard=a=>e.on("select",s=>a(s.id)),t.api.board=n;const i=t.api.instruments??{};i.open=a=>e.post({t:"instruments",payload:a}),t.api.instruments=i,ve(e),e.post({t:"opened"})}function mt(t="main"){const e=window;if(!e.api)return!1;if(t==="instrument")return Re(Ne(window.location.hash));const n="0.45.0";e.api.appVersion=async()=>n;const i=Rn(n);e.api.feedback=i.feedback,e.api.diagnostics=i.diagnostics;const a="snakie:modules-changed",s=e.api.modules??{};Object.assign(s,Yn()),s.notifyChanged=()=>{window.dispatchEvent(new CustomEvent(a))},s.onChanged=o=>{const m=()=>o();return window.addEventListener(a,m),()=>window.removeEventListener(a,m)},e.api.modules=s;const r=e.api.packages??{};Object.assign(r,it()),e.api.packages=r,e.api.captureScreenshot=Nn,e.api.openExternal=async o=>{window.open(o,"_blank","noopener,noreferrer")},e.api.device=tn();const d=e.api.instruments??{};d.librarySource=async()=>Cn,d.umbrellaSource=async()=>Dn,e.api.instruments=d;const u=e.api.parts??{};if(Object.assign(u,un()),e.api.parts=u,"showDirectoryPicker"in window||q()){const o=dn();e.api.fs=o,e.api.robot=pn(o)}return t==="board"?rt():(st(),Ge()),console.info('[Snakie] Web backend ready — Connect the "Simulated device (offline)" to run Python; Open Folder to edit local files.'),!0}function ut(t=400){window.setTimeout(()=>{(async()=>{try{const e=window.api.device;(await e.getStatus()).state==="disconnected"&&await e.connect(H)}catch{}})()},t)}export{ut as autoConnectSimulator,mt as installWebApi};
